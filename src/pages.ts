export type Lang = 'ru' | 'en';

export const FAVICON_PNG = Buffer.from(
    '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',
    'base64',
);

const FAVICON = `data:image/png;base64,${FAVICON_PNG.toString('base64')}`;

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
<link rel="icon" href="${FAVICON}">
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
