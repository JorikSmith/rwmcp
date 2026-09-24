#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'openapi/remnawave.openapi.json');
const outputPath = resolve(root, 'src/operations.generated.ts');
const httpMethods = ['get', 'post', 'put', 'patch', 'delete'];

const EXCLUDED_TAGS = new Set([
    'Auth Controller',
    'Passkeys Controller',
    'API Tokens Controller',
    '[Public] Subscription Controller',
]);

const source = await readFile(sourcePath, 'utf8');
const document = JSON.parse(source);
const apiVersion = document.info?.version;
if (!/^3\./.test(apiVersion ?? '')) {
    throw new Error(`Expected a Remnawave 3.x OpenAPI document, got ${apiVersion ?? 'unknown'}`);
}

function normalizePath(path) {
    return path
        .replace(/\{[^}]+\}/g, '{}')
        .replace(/:[A-Za-z0-9_]+/g, '{}')
        .replace(/\/+$/, '');
}

function contractKinds() {
    const require = createRequire(import.meta.url);
    const contract = require('@remnawave/backend-contract');
    const kinds = new Map();
    for (const [name, command] of Object.entries(contract)) {
        if (!name.endsWith('Command') || !command?.endpointDetails || !command.TSQ_url) continue;
        const { REQUEST_METHOD, SCOPE_KIND } = command.endpointDetails;
        if (SCOPE_KIND !== 'read' && SCOPE_KIND !== 'write') continue;
        kinds.set(`${REQUEST_METHOD.toUpperCase()} ${normalizePath(command.TSQ_url)}`, SCOPE_KIND);
    }
    return kinds;
}

function toolName(operationId) {
    const [controller, action] = operationId.split('_');
    const snake = (value) =>
        value
            .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/[^A-Za-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '')
            .toLowerCase();
    const prefix = snake(controller.replace(/Controller$/, ''));
    return action ? `${prefix}_${snake(action)}` : prefix;
}

function parameters(pathItem, operation) {
    const merged = new Map();
    for (const parameter of [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]) {
        if (parameter.$ref) throw new Error(`Referenced parameters are not supported`);
        if (parameter.in !== 'path' && parameter.in !== 'query') continue;
        const style = parameter.style ?? (parameter.in === 'path' ? 'simple' : 'form');
        merged.set(`${parameter.in}:${parameter.name}`, {
            name: parameter.name,
            in: parameter.in,
            required: parameter.in === 'path' || parameter.required === true,
            style,
            explode: parameter.explode ?? style === 'form',
            ...(parameter.description ? { description: parameter.description } : {}),
            ...(parameter.schema ? { schema: parameter.schema } : {}),
        });
    }
    return [...merged.values()].sort((a, b) =>
        `${a.in}:${a.name}`.localeCompare(`${b.in}:${b.name}`),
    );
}

function jsonBody(requestBody) {
    if (!requestBody) return undefined;
    if (requestBody.$ref) throw new Error('Referenced request bodies are not supported');
    const entry = Object.entries(requestBody.content ?? {}).find(([type]) =>
        /\/json(?:;|$)|\+json(?:;|$)/i.test(type),
    );
    if (!entry) return undefined;
    return {
        required: requestBody.required === true,
        ...(requestBody.description ? { description: requestBody.description } : {}),
        ...(entry[1].schema ? { schema: entry[1].schema } : {}),
    };
}

function collectRefs(value, names) {
    if (Array.isArray(value)) value.forEach((item) => collectRefs(item, names));
    else if (value && typeof value === 'object') {
        if (typeof value.$ref === 'string' && value.$ref.startsWith('#/components/schemas/')) {
            names.add(value.$ref.slice('#/components/schemas/'.length));
        }
        Object.values(value).forEach((item) => collectRefs(item, names));
    }
    return names;
}

const kinds = contractKinds();
const operations = [];
const kindFallbacks = [];

for (const path of Object.keys(document.paths ?? {}).sort()) {
    const pathItem = document.paths[path];
    for (const method of httpMethods) {
        const operation = pathItem[method];
        if (!operation) continue;
        if ((operation.tags ?? []).some((tag) => EXCLUDED_TAGS.has(tag))) continue;
        if (!operation.operationId) throw new Error(`${method} ${path} has no operationId`);

        const upper = method.toUpperCase();
        let kind = kinds.get(`${upper} ${normalizePath(path)}`);
        if (!kind) {
            kind = upper === 'GET' ? 'read' : 'write';
            kindFallbacks.push(`${upper} ${path} -> ${kind}`);
        }

        const body = jsonBody(operation.requestBody);
        operations.push({
            name: toolName(operation.operationId),
            operationId: operation.operationId,
            method: upper,
            path,
            kind,
            ...(operation.summary ? { summary: operation.summary } : {}),
            ...(operation.description ? { description: operation.description.trim() } : {}),
            parameters: parameters(pathItem, operation),
            ...(body ? { requestBody: body } : {}),
        });
    }
}

const seen = new Set();
for (const { name } of operations) {
    if (seen.has(name)) throw new Error(`Tool name collision: ${name}`);
    seen.add(name);
}

const componentNames = new Set();
for (const operation of operations) {
    collectRefs(operation.requestBody?.schema, componentNames);
    for (const parameter of operation.parameters) collectRefs(parameter.schema, componentNames);
}
for (const name of componentNames) {
    const schema = document.components?.schemas?.[name];
    if (!schema) throw new Error(`Unknown component schema: ${name}`);
    collectRefs(schema, componentNames);
}
const components = Object.fromEntries(
    [...componentNames].sort().map((name) => [name, document.components.schemas[name]]),
);

const output = `import type { OperationDescriptor } from './operations.js';

export const API_VERSION = ${JSON.stringify(apiVersion)};

export const COMPONENT_SCHEMAS: Readonly<Record<string, unknown>> = ${JSON.stringify(components, null, 2)};

export const OPERATIONS: readonly OperationDescriptor[] = ${JSON.stringify(operations, null, 2)};
`;

await writeFile(outputPath, output);
const reads = operations.filter((operation) => operation.kind === 'read').length;
console.log(
    `Remnawave API ${apiVersion}: ${operations.length} operations (${reads} read, ${operations.length - reads} write).`,
);
if (kindFallbacks.length) {
    console.log(`Kind taken from HTTP method for ${kindFallbacks.length} operation(s):`);
    for (const line of kindFallbacks) console.log(`  ${line}`);
}
