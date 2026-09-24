import { randomBytes, randomInt } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Config } from './config.js';
import { approvalPage, messagePage, pickLang } from './pages.js';
import { pkceChallenge, randomId, safeEqual, type Client, type Grant, type Store } from './store.js';

const REQUEST_TTL_MS = 5 * 60_000;
const CODE_TTL_MS = 60_000;
const ACCESS_TOKEN_TTL_SEC = 3600;
const REFRESH_TOKEN_TTL_MS = 30 * 86_400_000;
const REFRESH_GRACE_MS = 60_000;
const MAX_PENDING = 50;
const MAX_BODY_BYTES = 64 * 1024;

export const APPROVE_COMMAND = 'rwmcp approve';

export interface PendingRequest {
    id: string;
    code: string;
    clientId: string;
    clientName: string;
    redirectUri: string;
    state?: string;
    codeChallenge: string;
    ip: string;
    createdAt: number;
    expiresAt: number;
    decision?: { approved: boolean; readOnly: boolean };
    authCode?: string;
}

interface IssuedCode {
    clientId: string;
    clientName: string;
    redirectUri: string;
    codeChallenge: string;
    readOnly: boolean;
    expiresAt: number;
}

class OAuthError extends Error {
    constructor(
        readonly code: string,
        message: string,
        readonly status = 400,
    ) {
        super(message);
    }
}

export function log(event: string, fields: Record<string, unknown> = {}): void {
    process.stderr.write(`${JSON.stringify({ time: new Date().toISOString(), event, ...fields })}\n`);
}

function isLoopback(uri: URL): boolean {
    return (
        uri.protocol === 'http:' &&
        ['localhost', '127.0.0.1', '[::1]'].includes(uri.hostname)
    );
}

function parseUrl(value: string): URL | undefined {
    try {
        return new URL(value);
    } catch {
        return undefined;
    }
}

function redirectAllowed(client: Client, redirectUri: string): boolean {
    const requested = parseUrl(redirectUri);
    if (!requested) return false;
    return client.redirectUris.some((registered) => {
        if (registered === redirectUri) return true;
        const known = parseUrl(registered);
        return (
            known !== undefined &&
            isLoopback(known) &&
            isLoopback(requested) &&
            known.hostname === requested.hostname &&
            known.pathname === requested.pathname
        );
    });
}

export function clientIp(request: IncomingMessage, trustProxy: number): string {
    const header = request.headers['x-forwarded-for'];
    const chain = (Array.isArray(header) ? header.join(',') : (header ?? ''))
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    if (trustProxy > 0 && chain.length >= trustProxy) return chain[chain.length - trustProxy];
    return request.socket.remoteAddress ?? 'unknown';
}

async function readBody(request: IncomingMessage): Promise<string> {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const chunk of request) {
        size += (chunk as Buffer).length;
        if (size > MAX_BODY_BYTES) throw new OAuthError('invalid_request', 'Body too large', 413);
        chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks).toString('utf8');
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
    response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify(body));
}

function sendHtml(response: ServerResponse, status: number, html: string, nonce?: string): void {
    response.writeHead(status, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Content-Security-Policy': `default-src 'none'; style-src 'unsafe-inline'; connect-src 'self'; ${
            nonce ? `script-src 'nonce-${nonce}'; ` : ''
        }frame-ancestors 'none'; base-uri 'none'`,
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
    });
    response.end(html);
}

function withParams(uri: string, params: Record<string, string | undefined>): string {
    const target = new URL(uri);
    for (const [name, value] of Object.entries(params)) {
        if (value !== undefined) target.searchParams.set(name, value);
    }
    return target.toString();
}

export class OAuthServer {
    private readonly pending = new Map<string, PendingRequest>();
    private readonly codes = new Map<string, IssuedCode>();

    constructor(
        private readonly config: Config,
        private readonly store: Store,
    ) {}

    get resourceMetadataUrl(): string {
        return `${this.config.publicUrl}/.well-known/oauth-protected-resource`;
    }

    async handle(request: IncomingMessage, response: ServerResponse, url: URL): Promise<boolean> {
        const method = request.method ?? 'GET';
        const path = url.pathname;
        try {
            if (method === 'GET' && path.startsWith('/.well-known/oauth-protected-resource')) {
                sendJson(response, 200, {
                    resource: `${this.config.publicUrl}/mcp`,
                    authorization_servers: [this.config.publicUrl],
                    bearer_methods_supported: ['header'],
                    scopes_supported: ['read', 'write'],
                });
            } else if (
                method === 'GET' &&
                (path.startsWith('/.well-known/oauth-authorization-server') ||
                    path.startsWith('/.well-known/openid-configuration'))
            ) {
                sendJson(response, 200, this.metadata());
            } else if (method === 'GET' && path === '/authorize') {
                this.authorize(request, response, url);
            } else if (method === 'GET' && path === '/authorize/status') {
                this.status(request, response, url);
            } else if (method === 'POST' && path === '/token') {
                await this.token(request, response);
            } else if (method === 'POST' && path === '/register') {
                await this.register(request, response);
            } else if (method === 'POST' && path === '/revoke') {
                await this.revoke(request, response);
            } else {
                return false;
            }
        } catch (error) {
            if (!(error instanceof OAuthError)) throw error;
            sendJson(response, error.status, { error: error.code, error_description: error.message });
        }
        return true;
    }

    private metadata() {
        const base = this.config.publicUrl;
        return {
            issuer: base,
            authorization_endpoint: `${base}/authorize`,
            token_endpoint: `${base}/token`,
            registration_endpoint: `${base}/register`,
            revocation_endpoint: `${base}/revoke`,
            response_types_supported: ['code'],
            grant_types_supported: ['authorization_code', 'refresh_token'],
            code_challenge_methods_supported: ['S256'],
            token_endpoint_auth_methods_supported: ['none', 'client_secret_post', 'client_secret_basic'],
            scopes_supported: ['read', 'write'],
        };
    }

    private async register(request: IncomingMessage, response: ServerResponse): Promise<void> {
        let metadata: Record<string, unknown>;
        try {
            metadata = JSON.parse(await readBody(request));
        } catch (error) {
            if (error instanceof OAuthError) throw error;
            throw new OAuthError('invalid_client_metadata', 'Body must be JSON');
        }

        const uris = metadata.redirect_uris;
        if (!Array.isArray(uris) || uris.length === 0 || uris.length > 10) {
            throw new OAuthError('invalid_redirect_uri', 'redirect_uris must be a non-empty list');
        }
        for (const value of uris) {
            const parsed = typeof value === 'string' ? parseUrl(value) : undefined;
            if (!parsed || parsed.hash || (parsed.protocol !== 'https:' && !isLoopback(parsed))) {
                throw new OAuthError('invalid_redirect_uri', `Not allowed: ${String(value)}`);
            }
        }

        const authMethod =
            typeof metadata.token_endpoint_auth_method === 'string'
                ? metadata.token_endpoint_auth_method
                : 'client_secret_basic';
        if (!['none', 'client_secret_basic', 'client_secret_post'].includes(authMethod)) {
            throw new OAuthError('invalid_client_metadata', `Unsupported ${authMethod}`);
        }

        const rawName = typeof metadata.client_name === 'string' ? metadata.client_name : '';
        const name = rawName.replace(/[\u0000-\u001f]/g, '').trim().slice(0, 60) || 'MCP client';
        const secret = authMethod === 'none' ? undefined : randomId('rwcs_');
        const client: Client = {
            id: randomId('rwc_', 16),
            name,
            redirectUris: uris as string[],
            createdAt: Date.now(),
            ...(secret ? { secretHash: this.store.hash(secret) } : {}),
        };
        await this.store.addClient(client);
        log('client_registered', { client: client.id, name });

        sendJson(response, 201, {
            client_id: client.id,
            ...(secret ? { client_secret: secret, client_secret_expires_at: 0 } : {}),
            client_id_issued_at: Math.floor(client.createdAt / 1000),
            client_name: name,
            redirect_uris: client.redirectUris,
            grant_types: ['authorization_code', 'refresh_token'],
            response_types: ['code'],
            token_endpoint_auth_method: authMethod,
        });
    }

    private authenticateClient(request: IncomingMessage, form: URLSearchParams): Client {
        let id = form.get('client_id') ?? '';
        let secret = form.get('client_secret') ?? undefined;
        const header = request.headers.authorization;
        if (header?.startsWith('Basic ')) {
            const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
            const separator = decoded.indexOf(':');
            if (separator > 0) {
                id = decodeURIComponent(decoded.slice(0, separator));
                secret = decodeURIComponent(decoded.slice(separator + 1));
            }
        }
        const client = this.store.getClient(id);
        if (!client) throw new OAuthError('invalid_client', 'Unknown client', 401);
        if (client.secretHash && (!secret || !safeEqual(this.store.hash(secret), client.secretHash))) {
            throw new OAuthError('invalid_client', 'Client authentication failed', 401);
        }
        return client;
    }

    private authorize(request: IncomingMessage, response: ServerResponse, url: URL): void {
        const lang = pickLang(request.headers['accept-language']);
        const params = url.searchParams;
        const client = this.store.getClient(params.get('client_id') ?? '');
        const redirectUri =
            params.get('redirect_uri') ??
            (client?.redirectUris.length === 1 ? client.redirectUris[0] : '');

        if (!client) {
            sendHtml(response, 400, messagePage(lang, 'error', 'Unknown client_id'));
            return;
        }
        if (!redirectUri || !redirectAllowed(client, redirectUri)) {
            sendHtml(response, 400, messagePage(lang, 'error', `redirect_uri is not registered: ${redirectUri}`));
            return;
        }

        const state = params.get('state') ?? undefined;
        const fail = (error: string) => {
            response.writeHead(302, {
                Location: withParams(redirectUri, { error, state, iss: this.config.publicUrl }),
            });
            response.end();
        };
        if (params.get('response_type') !== 'code') return fail('unsupported_response_type');
        const codeChallenge = params.get('code_challenge') ?? '';
        if (!codeChallenge || params.get('code_challenge_method') !== 'S256') {
            return fail('invalid_request');
        }

        this.prune();
        if (this.pending.size >= MAX_PENDING) return fail('temporarily_unavailable');

        const now = Date.now();
        const pending: PendingRequest = {
            id: randomId(),
            code: this.newCode(),
            clientId: client.id,
            clientName: client.name,
            redirectUri,
            state,
            codeChallenge,
            ip: clientIp(request, this.config.trustProxy),
            createdAt: now,
            expiresAt: now + REQUEST_TTL_MS,
        };
        this.pending.set(pending.id, pending);
        log('approval_requested', {
            code: pending.code,
            client: client.name,
            redirect: new URL(redirectUri).host,
            ip: pending.ip,
            hint: `${APPROVE_COMMAND} ${pending.code}`,
        });

        this.renderApproval(response, lang, pending);
    }

    private renderApproval(response: ServerResponse, lang: 'ru' | 'en', pending: PendingRequest): void {
        const nonce = randomBytes(16).toString('base64');
        sendHtml(
            response,
            200,
            approvalPage({
                lang,
                clientName: pending.clientName,
                redirectHost: new URL(pending.redirectUri).host,
                code: pending.code,
                requestId: pending.id,
                expiresAt: pending.expiresAt,
                command: APPROVE_COMMAND,
                nonce,
            }),
            nonce,
        );
    }

    private newCode(): string {
        const used = new Set([...this.pending.values()].map((item) => item.code));
        let code: string;
        do code = String(randomInt(1000, 10000));
        while (used.has(code));
        return code;
    }

    private prune(): void {
        const now = Date.now();
        for (const [id, item] of this.pending) if (item.expiresAt <= now) this.pending.delete(id);
        for (const [code, item] of this.codes) if (item.expiresAt <= now) this.codes.delete(code);
    }

    private status(request: IncomingMessage, response: ServerResponse, url: URL): void {
        const lang = pickLang(request.headers['accept-language']);
        const html = url.searchParams.has('html');
        this.prune();
        const pending = this.pending.get(url.searchParams.get('request') ?? '');

        let redirect: string | undefined;
        if (pending?.decision) {
            this.pending.delete(pending.id);
            if (pending.decision.approved) {
                const authCode = randomId('rwac_');
                this.codes.set(authCode, {
                    clientId: pending.clientId,
                    clientName: pending.clientName,
                    redirectUri: pending.redirectUri,
                    codeChallenge: pending.codeChallenge,
                    readOnly: pending.decision.readOnly,
                    expiresAt: Date.now() + CODE_TTL_MS,
                });
                redirect = withParams(pending.redirectUri, {
                    code: authCode,
                    state: pending.state,
                    iss: this.config.publicUrl,
                });
            } else {
                redirect = withParams(pending.redirectUri, {
                    error: 'access_denied',
                    state: pending.state,
                    iss: this.config.publicUrl,
                });
            }
        }

        if (html) {
            if (redirect) {
                response.writeHead(302, { Location: redirect, 'Cache-Control': 'no-store' });
                response.end();
            } else if (pending) {
                this.renderApproval(response, lang, pending);
            } else {
                sendHtml(response, 410, messagePage(lang, 'expired'));
            }
            return;
        }
        if (redirect) sendJson(response, 200, { status: 'done', redirect });
        else sendJson(response, pending ? 200 : 410, { status: pending ? 'pending' : 'expired' });
    }

    listPending(): PendingRequest[] {
        this.prune();
        return [...this.pending.values()].filter((item) => !item.decision);
    }

    decide(code: string, approved: boolean, readOnly: boolean): PendingRequest | undefined {
        const pending = this.listPending().find((item) => item.code === code);
        if (!pending) return undefined;
        pending.decision = { approved, readOnly: readOnly || this.config.readOnly };
        log(approved ? 'approval_granted' : 'approval_denied', {
            code,
            client: pending.clientName,
            read_only: pending.decision.readOnly,
        });
        return pending;
    }

    private async token(request: IncomingMessage, response: ServerResponse): Promise<void> {
        const form = new URLSearchParams(await readBody(request));
        const client = this.authenticateClient(request, form);
        const grantType = form.get('grant_type');
        let grant: Grant;
        if (grantType === 'authorization_code') grant = await this.exchangeCode(client, form);
        else if (grantType === 'refresh_token') grant = await this.refresh(client, form);
        else throw new OAuthError('unsupported_grant_type', `Unsupported grant_type: ${grantType}`);

        const refreshToken = randomId('rwrt_');
        const now = Date.now();
        if (grant.refreshHash) {
            grant.previousRefreshHash = grant.refreshHash;
            grant.previousRefreshValidUntil = now + REFRESH_GRACE_MS;
        }
        grant.refreshHash = this.store.hash(refreshToken);
        grant.refreshExpiresAt = now + REFRESH_TOKEN_TTL_MS;
        grant.lastUsedAt = now;
        await this.store.putGrant(grant);

        sendJson(response, 200, {
            access_token: this.store.signAccessToken(grant.id, ACCESS_TOKEN_TTL_SEC),
            token_type: 'Bearer',
            expires_in: ACCESS_TOKEN_TTL_SEC,
            refresh_token: refreshToken,
            scope: grant.readOnly ? 'read' : 'read write',
        });
    }

    private async exchangeCode(client: Client, form: URLSearchParams): Promise<Grant> {
        const code = form.get('code') ?? '';
        const issued = this.codes.get(code);
        this.codes.delete(code);
        if (!issued || issued.expiresAt <= Date.now() || issued.clientId !== client.id) {
            throw new OAuthError('invalid_grant', 'Authorization code is invalid or expired');
        }
        const redirectUri = form.get('redirect_uri');
        if (redirectUri && redirectUri !== issued.redirectUri) {
            throw new OAuthError('invalid_grant', 'redirect_uri does not match');
        }
        const verifier = form.get('code_verifier') ?? '';
        if (!verifier || !safeEqual(pkceChallenge(verifier), issued.codeChallenge)) {
            throw new OAuthError('invalid_grant', 'PKCE verification failed');
        }
        return {
            id: randomId('', 12),
            clientId: client.id,
            clientName: issued.clientName,
            readOnly: issued.readOnly,
            createdAt: Date.now(),
            lastUsedAt: Date.now(),
            refreshHash: '',
            refreshExpiresAt: 0,
        };
    }

    private async refresh(client: Client, form: URLSearchParams): Promise<Grant> {
        const grant = this.store.findGrantByRefreshToken(form.get('refresh_token') ?? '');
        if (!grant || grant.clientId !== client.id) {
            throw new OAuthError('invalid_grant', 'Refresh token is invalid or expired');
        }
        return grant;
    }

    private async revoke(request: IncomingMessage, response: ServerResponse): Promise<void> {
        const form = new URLSearchParams(await readBody(request));
        const client = this.authenticateClient(request, form);
        const token = form.get('token') ?? '';
        const grant = this.store.verifyAccessToken(token) ?? this.store.findGrantByRefreshToken(token);
        if (grant && grant.clientId === client.id) {
            await this.store.deleteGrant(grant.id);
            log('grant_revoked', { grant: grant.id, by: 'client' });
        }
        response.writeHead(200, { 'Cache-Control': 'no-store' });
        response.end();
    }

    authenticate(header: string | undefined): Grant | undefined {
        if (!header?.startsWith('Bearer ')) return undefined;
        const grant = this.store.verifyAccessToken(header.slice(7).trim());
        if (grant) this.store.touchGrant(grant);
        return grant;
    }
}
