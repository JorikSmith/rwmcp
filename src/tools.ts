import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z, type ZodTypeAny } from 'zod';
import type { OperationDescriptor, ParameterDescriptor } from './operations.js';
import type { OperationInput, PanelClient } from './panel.js';
import {
    REDACTED_MARK,
    REDACTED_NOTE,
    SECRET_PRODUCERS,
    redactSecrets,
    restoreSecrets,
} from './redact.js';
import { openApiSchema, type ComponentSchemas } from './schema.js';

export interface ToolOptions {
    readOnly: boolean;
    redactSecrets: boolean;
}

const ADDITIVE = /(^|_)(create|clone|add)(_|$)/;

function isNumeric(schema: unknown): boolean {
    const type = (schema as { type?: unknown } | undefined)?.type;
    return type === 'number' || type === 'integer';
}

function parameterObject(
    parameters: readonly ParameterDescriptor[],
    label: string,
    components: ComponentSchemas,
): ZodTypeAny {
    const fields: Record<string, ZodTypeAny> = {};
    for (const parameter of parameters) {
        let schema = openApiSchema(parameter.schema, components);
        if (isNumeric(parameter.schema)) {
            schema = z.preprocess(
                (value) =>
                    typeof value === 'string' && value.trim() && !Number.isNaN(Number(value))
                        ? Number(value)
                        : value,
                schema,
            );
        }
        if (parameter.description) schema = schema.describe(parameter.description);
        fields[parameter.name] = parameter.required ? schema : schema.optional();
    }
    const object = z.object(fields);
    return parameters.some((parameter) => parameter.required)
        ? object.describe(label)
        : object.optional().describe(label);
}

export function inputShape(
    operation: OperationDescriptor,
    components: ComponentSchemas,
): Record<string, ZodTypeAny> {
    const shape: Record<string, ZodTypeAny> = {};
    const path = operation.parameters.filter((parameter) => parameter.in === 'path');
    const query = operation.parameters.filter((parameter) => parameter.in === 'query');
    if (path.length) shape.path = parameterObject(path, 'Path parameters', components);
    if (query.length) shape.query = parameterObject(query, 'Query parameters', components);
    if (operation.requestBody) {
        let body = openApiSchema(operation.requestBody.schema, components);
        if (operation.requestBody.description) {
            body = body.describe(operation.requestBody.description);
        }
        shape.body = operation.requestBody.required ? body : body.optional();
    }
    return shape;
}

function description(operation: OperationDescriptor): string {
    const parts = [operation.summary ?? 'Remnawave API operation'];
    if (operation.description && operation.description !== operation.summary) {
        parts.push(operation.description);
    }
    parts.push(`${operation.method} ${operation.path}`);
    return parts.join('\n\n');
}

function text(value: string, isError = false, note?: string) {
    const content = [{ type: 'text' as const, text: value }];
    if (note) content.push({ type: 'text' as const, text: note });
    return { content, ...(isError ? { isError } : {}) };
}

export function isDestructive(operation: OperationDescriptor): boolean {
    return (
        operation.kind === 'write' &&
        (operation.method === 'DELETE' || !ADDITIVE.test(operation.name))
    );
}

export function registerTools(
    server: McpServer,
    client: PanelClient,
    operations: readonly OperationDescriptor[],
    components: ComponentSchemas,
    options: ToolOptions,
): number {
    let count = 0;
    for (const operation of operations) {
        if (options.readOnly && operation.kind !== 'read') continue;
        const redact = options.redactSecrets && !SECRET_PRODUCERS.has(operation.name);

        server.registerTool(
            operation.name,
            {
                description: description(operation),
                inputSchema: inputShape(operation, components),
                annotations: {
                    title: operation.summary,
                    readOnlyHint: operation.kind === 'read',
                    destructiveHint: isDestructive(operation),
                    openWorldHint: false,
                },
            },
            async (input: OperationInput) => {
                try {
                    const request = options.redactSecrets
                        ? (restoreSecrets(input) as OperationInput)
                        : input;
                    const result = await client.invoke(operation, request);
                    if (result === undefined) return text('Success (no content).');
                    const payload = redact ? redactSecrets(result) : result;
                    const output = JSON.stringify(payload, null, 2);
                    return text(
                        output,
                        false,
                        redact && output.includes(REDACTED_MARK) ? REDACTED_NOTE : undefined,
                    );
                } catch (error) {
                    return text(
                        `Error: ${error instanceof Error ? error.message : 'Remnawave API request failed'}`,
                        true,
                    );
                }
            },
        );
        count += 1;
    }
    return count;
}
