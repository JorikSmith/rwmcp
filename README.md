# rwmcp

[Русский](README.ru.md) [English](README.md)

MCP server for the [Remnawave](https://github.com/remnawave/panel) panel.

Works with Remnawave 3.x.x

## Install

You need a subdomain for MCP and an API token from the Remnawave panel

```bash
mkdir -p /opt/rwmcp && cd /opt/rwmcp && curl -o docker-compose.yml https://raw.githubusercontent.com/JorikSmith/rwmcp/main/docker-compose.yml && curl -o .env https://raw.githubusercontent.com/JorikSmith/rwmcp/main/.env.example && curl -o /usr/local/bin/rwmcp https://raw.githubusercontent.com/JorikSmith/rwmcp/main/bin/rwmcp && chmod +x /usr/local/bin/rwmcp
```

```env
REMNAWAVE_BASE_URL=http://remnawave:3000
REMNAWAVE_API_TOKEN=token_from_panel
PUBLIC_URL=https://mcp.example.com
```

Start:

```bash
docker compose up -d
```


# Proxy

## Caddy

`/opt/remnawave/caddy/Caddyfile`:

```caddy
https://mcp.example.com {
    reverse_proxy * http://rwmcp:3100
}
```

## Nginx

Certificate:

```bash
acme.sh --issue --standalone -d 'mcp.example.com' --server letsencrypt --key-file /opt/remnawave/nginx/mcp_privkey.key --fullchain-file /opt/remnawave/nginx/mcp_fullchain.pem --alpn --tlsport 8443 --reloadcmd "docker exec remnawave-nginx nginx -s reload"
```

`/opt/remnawave/nginx/docker-compose.yml`, under `volumes` of `remnawave-nginx`:

```yaml
            - ./mcp_fullchain.pem:/etc/nginx/ssl/mcp_fullchain.pem:ro
            - ./mcp_privkey.key:/etc/nginx/ssl/mcp_privkey.key:ro
```

`/opt/remnawave/nginx/nginx.conf`:

```nginx
server {
    server_name mcp.example.com;
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    ssl_certificate "/etc/nginx/ssl/mcp_fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/mcp_privkey.key";

    resolver 127.0.0.11 valid=30s;
    set $rwmcp http://rwmcp:3100;

    location / {
        proxy_pass $rwmcp;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_read_timeout 1h;
    }
}
```

```bash
cd /opt/remnawave/nginx && docker compose up -d --force-recreate
```

## Connecting

Claude Code:

```bash
claude mcp add --transport http remnawave https://mcp.example.com/mcp
```

`/mcp` >remnawave


Codex:

`~/.codex/config.toml`:

```toml
[mcp_servers.remnawave]
url = "https://mcp.example.com/mcp"
```

`codex mcp login remnawave`

## Commands

```bash
rwmcp pending        # waiting for approval
rwmcp approve <code> # approve
rwmcp deny <code>    # reject
rwmcp list           # connected clients
rwmcp revoke <id>    # disconnect by id
rwmcp revoke --all   # disconnect everyone
```

All sign-in attempts are logged to `docker logs rwmcp`

## Advanced settings

```env
READ_ONLY=true           # read-only for every client
REDACT_SECRETS=false     # don't hide node private keys and user passwords
REMNAWAVE_API_KEY=...    # if the panel is behind Caddy with a key
REMNAWAVE_COOKIE=...     # if the panel is behind nginx with a secret cookie
TRUST_PROXY=1            # number of proxies in front of rwmcp
```
All clients act with the permissions of the `REMNAWAVE_API_TOKEN` token

## Updating

```bash
cd /opt/rwmcp && docker compose pull && docker compose up -d
```

Manual update of new panel methods: `npm run openapi:update`
