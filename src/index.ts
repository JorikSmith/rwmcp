import { runAdminCommand, startAdminServer } from './admin.js';
import { loadConfig } from './config.js';
import { startHttpServer } from './http.js';
import { OAuthServer, log } from './oauth.js';
import { API_VERSION, OPERATIONS } from './operations.generated.js';
import { checkPanel } from './panel.js';
import { Store } from './store.js';
import { VERSION } from './version.js';

const HELP = `rwmcp ${VERSION}, MCP server for the Remnawave panel API ${API_VERSION}

  rwmcp                         start the server
  rwmcp pending                 show sign-ins waiting for approval
  rwmcp approve <code>          approve a sign-in (add --read-only to limit it)
  rwmcp deny <code>             reject a sign-in
  rwmcp list                    show connected clients
  rwmcp revoke <id> | --all     disconnect a client
`;

async function serve(): Promise<void> {
    let config;
    try {
        config = loadConfig();
    } catch (error) {
        process.stderr.write(`Configuration error: ${(error as Error).message}\n`);
        process.exit(1);
    }

    const store = new Store(config.dataDir);
    await store.load();
    const oauth = new OAuthServer(config, store);
    const server = await startHttpServer(config, oauth);
    const admin = await startAdminServer(oauth, store);

    log('started', {
        version: VERSION,
        api: API_VERSION,
        tools: OPERATIONS.length,
        url: `${config.publicUrl}/mcp`,
        read_only: config.readOnly,
    });

    const panel = await checkPanel(config);
    if (panel === 'bad_token') log('warning', { message: 'The panel rejected REMNAWAVE_API_TOKEN' });
    if (panel === 'unreachable') {
        log('warning', { message: `Panel is not reachable at ${config.baseUrl}` });
    }

    const shutdown = () => {
        admin.close();
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(0), 5_000).unref();
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    await serve();
} else if (['help', '--help', '-h'].includes(args[0])) {
    process.stdout.write(HELP);
} else if (['version', '--version', '-v'].includes(args[0])) {
    console.log(VERSION);
} else {
    try {
        if (!(await runAdminCommand(args))) {
            process.stderr.write(`Unknown command: ${args[0]}\n\n${HELP}`);
            process.exit(2);
        }
    } catch (error) {
        process.stderr.write(`${(error as Error).message}\n`);
        process.exit(1);
    }
}
