/**
 * workspaceService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles workspace persistence (localStorage), compilation of HTML/CSS/JS
 * into a sandboxed Blob URL, ZIP export, and shareable link generation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import JSZip from 'jszip';

const STORAGE_KEY = 'easy-code-workspace';

/* ─── Persistence ──────────────────────────────────────────────────────── */

/** Save workspace object to localStorage */
export function saveWorkspace(workspace) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
}

/** Load workspace from localStorage (returns null if empty) */
export function loadWorkspace() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    console.error('Failed to parse saved workspace');
    return null;
  }
}

/* ─── Compilation ──────────────────────────────────────────────────────── */

/**
 * Compile the user's HTML + CSS + JS into a full standalone HTML document,
 * wrapped inside a Blob URL that can be loaded in an iframe.
 * @param {{ html: string, css: string, js: string }} workspace
 * @returns {string} blob URL
 */
export function compileToBlob({ html, css, js }) {
  const consoleOverride = `
    <script>
      (function() {
        const _log = console.log;
        const _warn = console.warn;
        const _error = console.error;

        function sendLog(type, args) {
          const message = Array.from(args).map(arg => {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg); } catch { return String(arg); }
            }
            return String(arg);
          }).join(' ');
          window.parent.postMessage({ type: 'CONSOLE_LOG', logType: type, message }, '*');
        }

        console.log   = function() { sendLog('log',   arguments); _log.apply(console, arguments);   };
        console.warn  = function() { sendLog('warn',  arguments); _warn.apply(console, arguments);  };
        console.error = function() { sendLog('error', arguments); _error.apply(console, arguments); };

        window.addEventListener('error', function(e) {
          sendLog('error', [e.message + ' (line ' + e.lineno + ')']);
        });
      })();
    </script>
  `;

  const fonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  `;

  const source = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${fonts}
  ${consoleOverride}
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try { ${js} } catch (err) { console.error(err.message); }
  </script>
</body>
</html>`;

  const blob = new Blob([source], { type: 'text/html' });
  return URL.createObjectURL(blob);
}

/* ─── ZIP Export ────────────────────────────────────────────────────────── */

/**
 * Package workspace code into a downloadable .zip file.
 * @param {{ html: string, css: string, js: string, templateId: string }} workspace
 */
export async function exportAsZip(workspace) {
  const zip = new JSZip();

  const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Easy Code Playground Export</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  ${workspace.html}
  <script src="script.js"></script>
</body>
</html>`;

  zip.file('index.html', htmlOutput);
  zip.file('style.css', workspace.css);
  zip.file('script.js', workspace.js);

  const content = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = `easy-code-project-${workspace.templateId}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}

/* ─── Shareable Link ───────────────────────────────────────────────────── */

/**
 * Encode the current workspace into a base64 hash URL and copy to clipboard.
 * @param {{ html: string, css: string, js: string, templateId: string }} workspace
 * @returns {string} the share URL
 */
export function generateShareLink(workspace) {
  const payload = {
    html: workspace.html,
    css: workspace.css,
    js: workspace.js,
    templateId: workspace.templateId,
  };
  const encoded = btoa(JSON.stringify(payload));
  const shareUrl = `${window.location.origin}${window.location.pathname}#code/${encoded}`;
  navigator.clipboard.writeText(shareUrl);
  return shareUrl;
}

/**
 * Try to decode a shared workspace from the current URL hash.
 * @returns {{ html: string, css: string, js: string, templateId: string } | null}
 */
export function decodeShareHash() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#code/')) return null;
  try {
    const decoded = JSON.parse(atob(hash.substring(6)));
    if (decoded.html !== undefined && decoded.css !== undefined && decoded.js !== undefined) {
      window.history.replaceState(null, '', window.location.pathname);
      return decoded;
    }
  } catch (e) {
    console.error('Failed to decode shared project from hash', e);
  }
  return null;
}
