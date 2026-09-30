import { createHash, randomBytes } from 'node:crypto';

const SECRET_KEYS = new Set(
    [
        'privateKey',
        'secretKey',
        'password',
        'secret',
        'token',
        'apiKey',
        'accessToken',
        'refreshToken',
        'trojanPassword',
        'ssPassword',
        'vlessUuid',
        'shortUuid',
        'subscriptionUrl',
    ].map((key) => key.toLowerCase()),
);

export const SECRET_PRODUCERS = new Set(['keygen_generate_key', 'system_get_x25519_keypairs']);

export const REDACTED_NOTE =
    'Secrets were replaced with placeholders like "[redacted by rwmcp #id]". The values in the panel ' +
    'are unchanged. To keep a secret when writing, pass its placeholder back unchanged as the whole ' +
    'field value and rwmcp substitutes the real value.';

export const REDACTED_MARK = '[redacted by rwmcp';
const PLACEHOLDER = /^\[redacted by rwmcp #([A-Za-z0-9_-]{12})\]$/;
const MAX_SECRETS = 100_000;

const LINK_USERINFO = /\b([a-z][a-z0-9+.-]*:\/\/)([^\s@/"'?#]+)@/gi;
const LINK_PAYLOAD = /\b((?:vmess|ss):\/\/)([A-Za-z0-9+/=_-]{16,})(?=$|[#\s"'])/gi;

const salt = randomBytes(16);
const byId = new Map<string, string>();
const byValue = new Map<string, string>();
const restored = new Set<string>();

function placeholder(secret: string): string {
    let id = byValue.get(secret);
    if (!id) {
        id = createHash('sha256').update(salt).update(secret).digest('base64url').slice(0, 12);
        if (byId.size >= MAX_SECRETS) {
            const [oldestId, oldestValue] = byId.entries().next().value!;
            byId.delete(oldestId);
            byValue.delete(oldestValue);
        }
        byId.set(id, secret);
        byValue.set(secret, id);
    }
    return `${REDACTED_MARK} #${id}]`;
}

function redactString(value: string): string {
    if (byValue.has(value)) return placeholder(value);
    for (const secret of restored) {
        for (const form of new Set([secret, encodeURIComponent(secret)])) {
            if (value.includes(form)) value = value.split(form).join(placeholder(secret));
        }
    }
    return value
        .replace(
            LINK_USERINFO,
            (_match, scheme: string, credentials: string) => `${scheme}${placeholder(credentials)}@`,
        )
        .replace(LINK_PAYLOAD, (_match, scheme: string, payload: string) => scheme + placeholder(payload));
}

export function redactSecrets(value: unknown): unknown {
    if (typeof value === 'string') return redactString(value);
    if (Array.isArray(value)) return value.map(redactSecrets);
    if (value && typeof value === 'object') {
        const out: Record<string, unknown> = {};
        for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
            out[key] =
                SECRET_KEYS.has(key.toLowerCase()) && typeof item === 'string' && item.length > 0
                    ? placeholder(item)
                    : redactSecrets(item);
        }
        return out;
    }
    return value;
}

export function restoreSecrets(value: unknown): unknown {
    if (typeof value === 'string') {
        if (!value.includes(REDACTED_MARK)) return value;
        const id = PLACEHOLDER.exec(value)?.[1];
        const secret = id === undefined ? undefined : byId.get(id);
        if (secret !== undefined) {
            restored.add(secret);
            return secret;
        }
        throw new Error(
            id === undefined
                ? 'A redacted placeholder can only be passed as the whole field value, not inside other text.'
                : `Unknown placeholder ${value}. rwmcp may have restarted: ` +
                      'read the object again and use the new placeholder.',
        );
    }
    if (Array.isArray(value)) return value.map(restoreSecrets);
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([key, item]) => [
                key,
                restoreSecrets(item),
            ]),
        );
    }
    return value;
}
