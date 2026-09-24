export type Lang = 'ru' | 'en';

const TEXT = {
    ru: {
        approve: 'Подтвердите вход',
        wants: 'просит доступ к панели Remnawave',
        expires: 'Действует ещё',
        expired: 'Время вышло. Начните подключение заново.',
        denied: 'Доступ отклонён.',
        error: 'Ошибка',
    },
    en: {
        approve: 'Approve sign-in',
        wants: 'is requesting access to the Remnawave panel',
        expires: 'Expires in',
        expired: 'The request has expired. Start connecting again.',
        denied: 'Access denied.',
        error: 'Error',
    },
} as const;

export function pickLang(acceptLanguage: string | undefined): Lang {
    return /^\s*ru\b/i.test(acceptLanguage ?? '') ? 'ru' : 'en';
}

function escape(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function layout(lang: Lang, title: string, body: string, nonce?: string, script?: string): string {
    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escape(title)}</title>
<style>
* { box-sizing: border-box; margin:0; }
body { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px; background:#111; color:#e8e8e8; font:14px/1.45 system-ui,sans-serif; }
main { width:100%; max-width:420px; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:8px; padding:28px 32px; }
h1 { font-size:18px; margin-bottom:8px; }
p { margin-bottom:12px; }
.muted { color:#888; font-size:12px; }
pre { margin:12px 0; padding:10px 12px; border-radius:4px; background:#111; border:1px solid #2a2a2a; font:13px/1.4 ui-monospace,monospace; white-space:pre-wrap; word-break:break-all; user-select:all; }
@media (prefers-color-scheme: light) {
  body { background:#f5f5f5; color:#111; }
  main { background:#fff; border-color:#ddd; }
  .muted { color:#666; }
  pre { background:#f5f5f5; border-color:#ddd; }
}
</style>
</head>
<body><main>${body}</main>${script && nonce ? `<script nonce="${nonce}">${script}</script>` : ''}</body>
</html>`;
}

export interface ApprovalPageOptions {
    lang: Lang;
    clientName: string;
    redirectHost: string;
    code: string;
    requestId: string;
    expiresAt: number;
    command: string;
    nonce: string;
}

export function approvalPage(options: ApprovalPageOptions): string {
    const text = TEXT[options.lang];
    const statusUrl = `/authorize/status?request=${encodeURIComponent(options.requestId)}`;
    const fullCmd = `rwmcp approve ${options.code}`;
    const script = `
const expiresAt = ${options.expiresAt};
const timer = document.getElementById('timer');
function tick() {
  const left = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
  timer.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
}
async function poll() {
  try {
    const response = await fetch(${JSON.stringify(statusUrl)}, { cache: 'no-store' });
    const data = await response.json();
    if (data.redirect) { location.replace(data.redirect); return; }
    if (data.status === 'expired') { timer.parentElement.textContent = ${JSON.stringify(text.expired)}; return; }
  } catch {}
  setTimeout(poll, 2000);
}
tick(); setInterval(tick, 1000); poll();`;

    return layout(
        options.lang,
        text.approve,
        `<h1>${text.approve}</h1>
<p><strong>${escape(options.clientName)}</strong> ${text.wants}</p>
<pre>${escape(fullCmd)}</pre>
<p class="muted">${text.expires} <span id="timer"></span></p>
<noscript><meta http-equiv="refresh" content="3;url=${escape(statusUrl)}&amp;html=1"></noscript>`,
        options.nonce,
        script,
    );
}

export function messagePage(lang: Lang, key: 'expired' | 'denied' | 'error', detail?: string): string {
    const text = TEXT[lang];
    const title = key === 'error' ? text.error : text[key];
    return layout(
        lang,
        title,
        `<h1>${escape(title)}</h1>${detail ? `<p class="muted">${escape(detail)}</p>` : ''}`,
    );
}
