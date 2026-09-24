import { randomUUID } from 'node:crypto';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { Config } from './config.js';
import { log, type OAuthServer } from './oauth.js';
import { API_VERSION, COMPONENT_SCHEMAS, OPERATIONS } from './operations.generated.js';
import { PanelClient } from './panel.js';
import type { Grant } from './store.js';
import { registerTools } from './tools.js';
import { VERSION } from './version.js';

const MAX_SESSIONS = 100;
const SESSION_IDLE_MS = 60 * 60_000;
const MAX_BODY_BYTES = 4 * 1024 * 1024;

interface Session {
    server: McpServer;
    transport: StreamableHTTPServerTransport;
    grantId: string;
    lastActivityAt: number;
}

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
        'Authorization, Content-Type, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID',
    'Access-Control-Expose-Headers': 'Mcp-Session-Id, WWW-Authenticate',
};

function sendJson(response: ServerResponse, status: number, body: unknown): void {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(body));
}

function header(request: IncomingMessage, name: string): string | undefined {
    const value = request.headers[name];
    return Array.isArray(value) ? value[0] : value;
}

function createMcpServer(config: Config, panel: PanelClient, grant: Grant): McpServer {
    const readOnly = config.readOnly || grant.readOnly;
    const server = new McpServer(
        { name: 'rwmcp', version: VERSION },
        {
            instructions:
                `Tools for the Remnawave panel API ${API_VERSION}. Each tool is one API endpoint. ` +
                'A 403 error means the panel API token has no scope for that endpoint.' +
                (readOnly ? ' This connection is read-only.' : ''),
        },
    );
    registerTools(server, panel, OPERATIONS, COMPONENT_SCHEMAS, {
        readOnly,
        redactSecrets: config.redactSecrets,
    });
    return server;
}

export async function startHttpServer(config: Config, oauth: OAuthServer): Promise<Server> {
    const panel = new PanelClient(config);
    const sessions = new Map<string, Session>();

    const closeSession = (session: Session) => {
        if (session.transport.sessionId) sessions.delete(session.transport.sessionId);
        void session.server.close().catch(() => undefined);
    };
    const cleanup = setInterval(() => {
        const now = Date.now();
        for (const session of sessions.values()) {
            if (now - session.lastActivityAt > SESSION_IDLE_MS) closeSession(session);
        }
    }, 60_000);
    cleanup.unref();

    const handleMcp = async (request: IncomingMessage, response: ServerResponse) => {
        const authorization = header(request, 'authorization');
        const grant = oauth.authenticate(authorization);
        if (!grant) {
            response.setHeader(
                'WWW-Authenticate',
                `Bearer resource_metadata="${oauth.resourceMetadataUrl}"${authorization ? ', error="invalid_token"' : ''}`,
            );
            sendJson(response, 401, { error: 'unauthorized' });
            return;
        }
        if (Number(header(request, 'content-length') ?? 0) > MAX_BODY_BYTES) {
            sendJson(response, 413, { error: 'Request body is too large' });
            return;
        }

        const sessionId = header(request, 'mcp-session-id');
        if (sessionId) {
            const session = sessions.get(sessionId);
            if (!session || session.grantId !== grant.id) {
                sendJson(response, 404, { error: 'Unknown MCP session' });
                return;
            }
            session.lastActivityAt = Date.now();
            await session.transport.handleRequest(request, response);
            return;
        }

        if (sessions.size >= MAX_SESSIONS) {
            const oldest = [...sessions.values()].sort((a, b) => a.lastActivityAt - b.lastActivityAt)[0];
            closeSession(oldest);
        }

        const server = createMcpServer(config, panel, grant);
        const session: Session = {
            server,
            transport: new StreamableHTTPServerTransport({
                sessionIdGenerator: randomUUID,
                enableJsonResponse: true,
                onsessioninitialized: (id) => {
                    sessions.set(id, session);
                },
            }),
            grantId: grant.id,
            lastActivityAt: Date.now(),
        };
        session.transport.onclose = () => {
            if (session.transport.sessionId) sessions.delete(session.transport.sessionId);
        };
        await server.connect(session.transport);
        await session.transport.handleRequest(request, response);
        if (!session.transport.sessionId) void server.close().catch(() => undefined);
    };

    const httpServer = createServer(async (request, response) => {
        const url = new URL(request.url ?? '/', 'http://localhost');
        try {
            if (request.method === 'OPTIONS') {
                response.writeHead(204, CORS_HEADERS);
                response.end();
                return;
            }
            for (const [name, value] of Object.entries(CORS_HEADERS)) response.setHeader(name, value);

            if (url.pathname === '/healthz') return sendJson(response, 200, { status: 'ok' });
            if (url.pathname === '/mcp') return await handleMcp(request, response);
            if (await oauth.handle(request, response, url)) return;
            sendJson(response, 404, { error: 'Not found' });
        } catch (error) {
            log('request_failed', {
                path: url.pathname,
                error: error instanceof Error ? error.message : String(error),
            });
            if (!response.headersSent) sendJson(response, 500, { error: 'Internal error' });
            else response.end();
        }
    });
    httpServer.on('close', () => {
        clearInterval(cleanup);
        for (const session of [...sessions.values()]) closeSession(session);
    });

    await new Promise<void>((resolve, reject) => {
        httpServer.once('error', reject);
        httpServer.listen(config.port, '0.0.0.0', () => resolve());
    });
    return httpServer;
}
