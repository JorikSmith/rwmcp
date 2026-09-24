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
    ].map((key) => key.toLowerCase()),
);

export const SECRET_PRODUCERS = new Set(['keygen_generate_key', 'system_get_x25519_keypairs']);

export const REDACTED = '[redacted by rwmcp]';

export function redactSecrets(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(redactSecrets);
    if (value && typeof value === 'object') {
        const out: Record<string, unknown> = {};
        for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
            out[key] =
                SECRET_KEYS.has(key.toLowerCase()) && typeof item === 'string' && item.length > 0
                    ? REDACTED
                    : redactSecrets(item);
        }
        return out;
    }
    return value;
}
