# rwmcp

[Русский](README.ru.md) [English](README.md)

MCP сервер для панели [Remnawave](https://github.com/remnawave/panel).

Работает с Remnawave 3.x.x

## Установка

Понадобится поддомен под MCP и API токен из панели Remnawave

```bash
mkdir -p /opt/rwmcp && cd /opt/rwmcp && curl -o docker-compose.yml https://raw.githubusercontent.com/JorikSmith/rwmcp/main/docker-compose.yml && curl -o .env https://raw.githubusercontent.com/JorikSmith/rwmcp/main/.env.example && curl -o /usr/local/bin/rwmcp https://raw.githubusercontent.com/JorikSmith/rwmcp/main/bin/rwmcp && chmod +x /usr/local/bin/rwmcp
```

```env
REMNAWAVE_BASE_URL=http://remnawave:3000
REMNAWAVE_API_TOKEN=токен_из_панели
PUBLIC_URL=https://mcp.example.com
```

Запуск:

```bash
docker compose up -d
```


# Прокси

## Caddy

`/opt/remnawave/caddy/Caddyfile`:

```caddy
https://mcp.example.com {
    reverse_proxy * http://rwmcp:3100
}
```

## Nginx

Сертификат:

```bash
acme.sh --issue --standalone -d 'mcp.example.com' --server letsencrypt --key-file /opt/remnawave/nginx/mcp_privkey.key --fullchain-file /opt/remnawave/nginx/mcp_fullchain.pem --alpn --tlsport 8443 --reloadcmd "docker exec remnawave-nginx nginx -s reload"
```

`/opt/remnawave/nginx/docker-compose.yml`, в `volumes` у `remnawave-nginx`:

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

## Подключение

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

## Команды

```bash
rwmcp pending        # ждут подтверждения
rwmcp approve <code> # принять
rwmcp deny <code>    # отклонить
rwmcp list           # подключённые клиенты
rwmcp revoke <id>    # отключить по id
rwmcp revoke --all   # отключить всех
```

Все попытки входа пишутся в `docker logs rwmcp`

## Продвинутые настройки

```env
READ_ONLY=true           # всем клиентам только чтение
REDACT_SECRETS=false     # не прятать приватные ключи нод и пароли пользователей
REMNAWAVE_API_KEY=...    # если панель закрыта через Caddy с ключом
REMNAWAVE_COOKIE=...     # если панель закрыта через nginx с secret cookie
TRUST_PROXY=1            # сколько прокси перед rwmcp
```
Все клиенты работают с правами токена из `REMNAWAVE_API_TOKEN`

## Обновление

```bash
cd /opt/rwmcp && docker compose pull && docker compose up -d
```

Ручное обновление новых методов из панели `npm run openapi:update`