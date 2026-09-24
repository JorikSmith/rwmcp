import { createServer, type Server } from 'node:http';
import { ADMIN_PORT } from './config.js';
import { log, type OAuthServer } from './oauth.js';
import type { Store } from './store.js';

export async function startAdminServer(oauth: OAuthServer, store: Store): Promise<Server> {
    const server = createServer(async (request, response) => {
        const reply = (status: number, body: unknown) => {
            response.writeHead(status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(body));
        };
        try {
            let body: Record<string, unknown> = {};
            if (request.method === 'POST') {
                const chunks: Buffer[] = [];
                for await (const chunk of request) chunks.push(chunk as Buffer);
                body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
            }
            const route = `${request.method} ${request.url}`;

            if (route === 'GET /pending') {
                return reply(
                    200,
                    oauth.listPending().map((item) => ({
                        code: item.code,
                        client: item.clientName,
                        redirect: new URL(item.redirectUri).host,
                        ip: item.ip,
                        age: Math.round((Date.now() - item.createdAt) / 1000),
                    })),
                );
            }
            if (route === 'POST /approve' || route === 'POST /deny') {
                const pending = oauth.decide(
                    String(body.code ?? ''),
                    route === 'POST /approve',
                    body.readOnly === true,
                );
                if (!pending) return reply(404, { error: 'No pending request with this code' });
                return reply(200, {
                    client: pending.clientName,
                    redirect: new URL(pending.redirectUri).host,
                    readOnly: pending.decision?.readOnly,
                });
            }
            if (route === 'GET /grants') {
                return reply(
                    200,
                    store.grants().map((grant) => ({
                        id: grant.id,
                        client: grant.clientName,
                        readOnly: grant.readOnly,
                        createdAt: grant.createdAt,
                        lastUsedAt: grant.lastUsedAt,
                    })),
                );
            }
            if (route === 'POST /revoke') {
                const ids =
                    body.all === true ? store.grants().map((grant) => grant.id) : [String(body.id ?? '')];
                let revoked = 0;
                for (const id of ids) if (await store.deleteGrant(id)) revoked += 1;
                if (revoked) log('grant_revoked', { count: revoked, by: 'admin' });
                return reply(revoked || body.all ? 200 : 404, { revoked });
            }
            reply(404, { error: 'Not found' });
        } catch (error) {
            reply(500, { error: error instanceof Error ? error.message : String(error) });
        }
    });
    await new Promise<void>((resolve, reject) => {
        server.once('error', reject);
        server.listen(ADMIN_PORT, '127.0.0.1', () => resolve());
    });
    return server;
}

async function call(method: 'GET' | 'POST', path: string, body?: unknown) {
    let response: Response;
    try {
        response = await fetch(`http://127.0.0.1:${ADMIN_PORT}${path}`, {
            method,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new Error('rwmcp is not running in this container');
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
    return data;
}

function date(ms: number): string {
    return new Date(ms).toISOString().replace('T', ' ').slice(0, 16);
}

export async function runAdminCommand(args: string[]): Promise<boolean> {
    const [command, ...rest] = args;
    const flags = new Set(rest.filter((arg) => arg.startsWith('--')));
    const [value] = rest.filter((arg) => !arg.startsWith('--'));

    switch (command) {
        case 'pending': {
            const items = await call('GET', '/pending');
            if (!items.length) console.log('No pending requests.');
            for (const item of items) {
                console.log(`${item.code}  ${item.client}  -> ${item.redirect}  from ${item.ip}, ${item.age}s ago`);
            }
            return true;
        }
        case 'approve':
        case 'deny': {
            if (!value) throw new Error(`Usage: rwmcp ${command} <code>`);
            const result = await call('POST', `/${command}`, {
                code: value,
                readOnly: flags.has('--read-only'),
            });
            console.log(
                command === 'approve'
                    ? `Approved ${result.client} (${result.redirect})${result.readOnly ? ', read only' : ''}.`
                    : `Denied ${result.client} (${result.redirect}).`,
            );
            return true;
        }
        case 'list': {
            const grants = await call('GET', '/grants');
            if (!grants.length) console.log('No connected clients.');
            for (const grant of grants) {
                console.log(
                    `${grant.id}  ${grant.client}${grant.readOnly ? ' (read only)' : ''}  connected ${date(grant.createdAt)}, last used ${date(grant.lastUsedAt)}`,
                );
            }
            return true;
        }
        case 'revoke': {
            if (!value && !flags.has('--all')) throw new Error('Usage: rwmcp revoke <id> | --all');
            const result = await call('POST', '/revoke', flags.has('--all') ? { all: true } : { id: value });
            console.log(`Revoked ${result.revoked} connection(s).`);
            return true;
        }
        default:
            return false;
    }
}
