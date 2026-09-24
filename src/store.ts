import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { chmod, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface Client {
    id: string;
    name: string;
    redirectUris: string[];
    secretHash?: string;
    createdAt: number;
}

export interface Grant {
    id: string;
    clientId: string;
    clientName: string;
    readOnly: boolean;
    createdAt: number;
    lastUsedAt: number;
    refreshHash: string;
    refreshExpiresAt: number;
    previousRefreshHash?: string;
    previousRefreshValidUntil?: number;
}

interface State {
    version: 1;
    secret: string;
    clients: Record<string, Client>;
    grants: Record<string, Grant>;
}

const MAX_CLIENTS = 500;

export function randomId(prefix = '', bytes = 32): string {
    return prefix + randomBytes(bytes).toString('base64url');
}

export function safeEqual(left: string, right: string): boolean {
    const a = Buffer.from(left);
    const b = Buffer.from(right);
    return a.length === b.length && timingSafeEqual(a, b);
}

export function pkceChallenge(verifier: string): string {
    return createHash('sha256').update(verifier).digest('base64url');
}

export class Store {
    private state!: State;
    private key!: Buffer;
    private writing: Promise<void> = Promise.resolve();
    private readonly file: string;

    constructor(dir: string) {
        this.file = join(dir, 'state.json');
    }

    async load(): Promise<void> {
        await mkdir(join(this.file, '..'), { recursive: true, mode: 0o700 });
        try {
            this.state = JSON.parse(await readFile(this.file, 'utf8'));
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
            this.state = { version: 1, secret: randomId(), clients: {}, grants: {} };
            await this.save();
        }
        this.key = Buffer.from(this.state.secret, 'base64url');
        const now = Date.now();
        for (const grant of this.grants()) {
            if (grant.refreshExpiresAt <= now) delete this.state.grants[grant.id];
        }
    }

    private save(): Promise<void> {
        const data = JSON.stringify(this.state, null, 2);
        this.writing = this.writing.then(async () => {
            const temporary = `${this.file}.tmp`;
            await writeFile(temporary, data, { mode: 0o600 });
            await chmod(temporary, 0o600);
            await rename(temporary, this.file);
        });
        return this.writing;
    }

    hash(value: string): string {
        return createHmac('sha256', this.key).update(value).digest('hex');
    }

    signAccessToken(grantId: string, ttlSec: number): string {
        const body = Buffer.from(
            JSON.stringify({ g: grantId, exp: Math.floor(Date.now() / 1000) + ttlSec }),
        ).toString('base64url');
        return `rwat_${body}.${createHmac('sha256', this.key).update(body).digest('base64url')}`;
    }

    verifyAccessToken(token: string): Grant | undefined {
        if (!token.startsWith('rwat_')) return undefined;
        const [body, signature] = token.slice(5).split('.');
        if (!body || !signature) return undefined;
        const expected = createHmac('sha256', this.key).update(body).digest('base64url');
        if (!safeEqual(signature, expected)) return undefined;
        try {
            const { g, exp } = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
            if (typeof exp !== 'number' || exp * 1000 <= Date.now()) return undefined;
            return this.state.grants[g];
        } catch {
            return undefined;
        }
    }

    getClient(id: string): Client | undefined {
        return this.state.clients[id];
    }

    async addClient(client: Client): Promise<void> {
        const clients = Object.values(this.state.clients);
        if (clients.length >= MAX_CLIENTS) {
            const used = new Set(this.grants().map((grant) => grant.clientId));
            const stale = clients
                .filter((item) => !used.has(item.id))
                .sort((a, b) => a.createdAt - b.createdAt)[0];
            if (!stale) throw new Error('Client limit reached');
            delete this.state.clients[stale.id];
        }
        this.state.clients[client.id] = client;
        await this.save();
    }

    grants(): Grant[] {
        return Object.values(this.state.grants);
    }

    getGrant(id: string): Grant | undefined {
        return this.state.grants[id];
    }

    findGrantByRefreshToken(token: string): Grant | undefined {
        const hash = this.hash(token);
        const now = Date.now();
        return this.grants().find(
            (grant) =>
                grant.refreshExpiresAt > now &&
                (grant.refreshHash === hash ||
                    (grant.previousRefreshHash === hash &&
                        (grant.previousRefreshValidUntil ?? 0) > now)),
        );
    }

    async putGrant(grant: Grant): Promise<void> {
        this.state.grants[grant.id] = grant;
        await this.save();
    }

    touchGrant(grant: Grant): void {
        const now = Date.now();
        if (now - grant.lastUsedAt < 60_000) return;
        grant.lastUsedAt = now;
        void this.save();
    }

    async deleteGrant(id: string): Promise<boolean> {
        if (!this.state.grants[id]) return false;
        delete this.state.grants[id];
        await this.save();
        return true;
    }
}
