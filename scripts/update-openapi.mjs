#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const url = process.argv[2] ?? 'https://cdn.docs.rw/docs/openapi.json';

const response = await fetch(url);
if (!response.ok) throw new Error(`GET ${url} returned ${response.status}`);
const text = await response.text();
const document = JSON.parse(text);

await writeFile(resolve(root, 'openapi/remnawave.openapi.json'), text);
console.log(`Saved Remnawave API ${document.info?.version} from ${url}`);

await import('./generate-operations.mjs');
