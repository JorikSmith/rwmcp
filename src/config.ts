export interface Config {
    baseUrl: string;
    apiToken: string;
    publicUrl: string;
    panelHeaders: Record<string, string>;
    readOnly: boolean;
    redactSecrets: boolean;
    dataDir: string;
    trustProxy: number;
    port: number;
}

type Env = Record<string, string | undefined>;

export const ADMIN_PORT = 3101;

function required(env: Env, name: string): string {
    const value = env[name]?.trim();
    if (!value) throw new Error(`${name} is not set`);
    return value;
}

function url(env: Env, name: string): string {
    const value = required(env, name);
    try {
        const parsed = new URL(value);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error();
    } catch {
        throw new Error(`${name} must be an http(s) URL, got: ${value}`);
    }
    return value.replace(/\/+$/, '');
}

function flag(env: Env, name: string, fallback: boolean): boolean {
    const value = env[name]?.trim();
    if (!value) return fallback;
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error(`${name} must be true or false`);
}

function integer(env: Env, name: string, fallback: number): number {
    const raw = env[name]?.trim();
    const value = raw ? Number(raw) : fallback;
    if (!Number.isInteger(value) || value < 0) throw new Error(`${name} must be a whole number`);
    return value;
}

export function loadConfig(env: Env = process.env): Config {
    const panelHeaders: Record<string, string> = {};
    if (env.REMNAWAVE_API_KEY) panelHeaders['X-Api-Key'] = env.REMNAWAVE_API_KEY;
    if (env.REMNAWAVE_COOKIE) panelHeaders.Cookie = env.REMNAWAVE_COOKIE;
    if (env.CF_ACCESS_CLIENT_ID) panelHeaders['CF-Access-Client-Id'] = env.CF_ACCESS_CLIENT_ID;
    if (env.CF_ACCESS_CLIENT_SECRET) {
        panelHeaders['CF-Access-Client-Secret'] = env.CF_ACCESS_CLIENT_SECRET;
    }

    const port = integer(env, 'PORT', 3100);
    if (port < 1 || port > 65535 || port === ADMIN_PORT) {
        throw new Error(`PORT must be between 1 and 65535 and not ${ADMIN_PORT}`);
    }

    return {
        baseUrl: url(env, 'REMNAWAVE_BASE_URL'),
        apiToken: required(env, 'REMNAWAVE_API_TOKEN'),
        publicUrl: url(env, 'PUBLIC_URL'),
        panelHeaders,
        readOnly: flag(env, 'READ_ONLY', false),
        redactSecrets: flag(env, 'REDACT_SECRETS', true),
        dataDir: env.DATA_DIR?.trim() || '/data',
        trustProxy: integer(env, 'TRUST_PROXY', 1),
        port,
    };
}
