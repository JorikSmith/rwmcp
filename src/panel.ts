import type { Config } from './config.js';
import type { OperationDescriptor, ParameterDescriptor } from './operations.js';

export interface OperationInput {
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    body?: unknown;
}

const TIMEOUT_MS = 30_000;

function errorMessage(body: unknown, status: number, statusText: string): string {
    if (typeof body === 'object' && body !== null) {
        const candidate = body as { message?: unknown; error?: unknown; errorCode?: unknown };
        const message =
            typeof candidate.message === 'string'
                ? candidate.message
                : typeof candidate.error === 'string'
                  ? candidate.error
                  : undefined;
        const code = typeof candidate.errorCode === 'string' ? ` (${candidate.errorCode})` : '';
        if (message) return `HTTP ${status}: ${message}${code}`;
    }
    return `HTTP ${status}${statusText ? ` ${statusText}` : ''}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function valueToString(value: unknown): string {
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
        return String(value);
    }
    return JSON.stringify(value);
}

function panelHeaders(config: Config): Record<string, string> {
    return {
        ...config.panelHeaders,
        Authorization: `Bearer ${config.apiToken}`,
        Accept: 'application/json',
        'X-Forwarded-For': '127.0.0.1',
        'X-Forwarded-Proto': 'https',
    };
}

export async function checkPanel(config: Config): Promise<'ok' | 'bad_token' | 'unreachable'> {
    try {
        const response = await fetch(`${config.baseUrl}/api/system/metadata`, {
            headers: panelHeaders(config),
            signal: AbortSignal.timeout(10_000),
        });
        await response.body?.cancel().catch(() => undefined);
        if (response.ok || response.status === 403) return 'ok';
        if (response.status === 401) return 'bad_token';
        return 'unreachable';
    } catch {
        return 'unreachable';
    }
}

export class PanelClient {
    constructor(private readonly config: Config) {}

    async invoke(operation: OperationDescriptor, input: OperationInput = {}): Promise<unknown> {
        const url = new URL(
            this.config.baseUrl + this.interpolatePath(operation, input.path ?? {}),
        );
        this.appendQuery(
            url.searchParams,
            operation.parameters.filter((parameter) => parameter.in === 'query'),
            input.query ?? {},
        );

        const headers = panelHeaders(this.config);
        if (input.body !== undefined) headers['Content-Type'] = 'application/json';

        let response: Response;
        try {
            response = await fetch(url, {
                method: operation.method,
                headers,
                body: input.body === undefined ? undefined : JSON.stringify(input.body),
                signal: AbortSignal.timeout(TIMEOUT_MS),
            });
        } catch (error) {
            if (error instanceof Error && error.name === 'TimeoutError') {
                throw new Error(`Remnawave API did not respond in ${TIMEOUT_MS / 1000}s`);
            }
            throw new Error('Remnawave API is unreachable');
        }

        const text = await response.text();
        let body: unknown = undefined;
        if (text.trim()) {
            try {
                body = JSON.parse(text);
            } catch {
                body = text;
            }
        }

        if (!response.ok) {
            const safeBody = typeof body === 'string' ? undefined : body;
            throw new Error(
                this.redact(errorMessage(safeBody, response.status, response.statusText)),
            );
        }
        return body;
    }

    private interpolatePath(
        operation: OperationDescriptor,
        input: Record<string, unknown>,
    ): string {
        return operation.path.replace(/\{([^}]+)\}/g, (_match, name: string) => {
            const value = input[name];
            if (value === undefined || value === null) {
                throw new Error(`Missing required path parameter: ${name}`);
            }
            return encodeURIComponent(valueToString(value));
        });
    }

    private appendQuery(
        search: URLSearchParams,
        parameters: readonly ParameterDescriptor[],
        input: Record<string, unknown>,
    ): void {
        for (const parameter of parameters) {
            const value = input[parameter.name];
            if (value === undefined || value === null) {
                if (parameter.required) {
                    throw new Error(`Missing required query parameter: ${parameter.name}`);
                }
                continue;
            }
            if (parameter.style === 'deepObject') {
                if (!isRecord(value)) {
                    throw new Error(`Query parameter ${parameter.name} must be an object`);
                }
                for (const [key, nested] of Object.entries(value)) {
                    if (nested === undefined || nested === null) continue;
                    for (const item of Array.isArray(nested) ? nested : [nested]) {
                        search.append(`${parameter.name}[${key}]`, valueToString(item));
                    }
                }
                continue;
            }
            if (Array.isArray(value)) {
                if (parameter.explode) {
                    value.forEach((item) => search.append(parameter.name, valueToString(item)));
                } else {
                    search.append(parameter.name, value.map(valueToString).join(','));
                }
                continue;
            }
            search.append(parameter.name, valueToString(value));
        }
    }

    private redact(message: string): string {
        const secrets = [this.config.apiToken, ...Object.values(this.config.panelHeaders)];
        let result = message;
        for (const secret of secrets) if (secret) result = result.split(secret).join('[REDACTED]');
        return result.replace(/Bearer\s+[^\s,;]+/gi, 'Bearer [REDACTED]');
    }
}
