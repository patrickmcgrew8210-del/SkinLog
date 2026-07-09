/* ══════════════════════════════════════════════
   UTILS — generic helpers with no localStorage/DOM-feature coupling
══════════════════════════════════════════════ */

/** Escapes HTML-significant characters before text goes into innerHTML.
 *  Every field a user can type (name, notes, triggers) must pass through
 *  this before being interpolated into a template string. */
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/** Local-timezone YYYY-MM-DD key, stable for matching/sorting/dedup
 *  (unlike toLocaleDateString(), which is a display string). */
function isoDate(d) {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Lightweight toast — replaces silent failures / native alert() for
 *  transient confirmations and errors. */
function showToast(message, type = 'info') {
  document.getElementById('sl-toast')?.remove();
  const palette = {
    success: { bg: '#eef5ed', border: '#8fa88a', color: '#3f5c3c' },
    error:   { bg: '#fdf2f2', border: '#c77c74', color: '#943f3a' },
    info:    { bg: '#faf7f4', border: '#d4908a', color: '#7a6055' },
  };
  const c = palette[type] || palette.info;
  const el = document.createElement('div');
  el.id = 'sl-toast';
  el.setAttribute('role', 'status');
  el.style.cssText = `
    position:fixed; left:50%; bottom:88px; transform:translateX(-50%) translateY(12px);
    z-index:600; max-width:calc(100% - 40px); background:${c.bg}; border:1.5px solid ${c.border};
    color:${c.color}; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
    padding:12px 18px; border-radius:14px; box-shadow:0 8px 24px rgba(58,46,40,0.16);
    opacity:0; transition:opacity 0.25s ease, transform 0.25s ease; text-align:center;`;
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => {
    el.style.opacity = '0'; el.style.transform = 'translateX(-50%) translateY(12px)';
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

/** Generic inline confirm dialog — the app avoids native confirm()/alert(),
 *  so destructive actions (delete entry, restore backup) route through this. */
function showConfirmDialog({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false, onConfirm }) {
  document.getElementById('sl-confirm-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'sl-confirm-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '250';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:340px;width:calc(100% - 40px);margin:0 auto;padding:24px;box-shadow:0 12px 40px rgba(58,46,40,0.2);animation:lbSlideUp 0.25s cubic-bezier(.34,1.1,.64,1) both;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 8px;">${escapeHtml(title)}</h3>
      <p style="font-size:13px;color:#7a6055;line-height:1.55;margin:0 0 20px;">${message}</p>
      <div style="display:flex;gap:10px;">
        <button id="sl-confirm-cancel" style="flex:1;padding:12px;border-radius:14px;border:1.5px solid #f0e8e6;background:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#7a6055;">${escapeHtml(cancelLabel)}</button>
        <button id="sl-confirm-ok" style="flex:1;padding:12px;border-radius:14px;border:none;background:${danger ? 'linear-gradient(110deg,#943f3a,#c77c74)' : 'linear-gradient(110deg,#b5706a,#d4908a)'};font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">${escapeHtml(confirmLabel)}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  const close = () => { overlay.remove(); document.body.style.overflow = ''; };
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.getElementById('sl-confirm-cancel').onclick = close;
  document.getElementById('sl-confirm-ok').onclick = () => { close(); onConfirm && onConfirm(); };
}

function avg(arr) {
  if (!arr.length) return 0;
  return (arr.reduce((a,b) => a+b, 0) / arr.length).toFixed(1);
}

function trendArrow(vals) {
  if (vals.length < 2) return { arrow:'—', color:'#9e8a80', label:'Insufficient data' };
  const first = vals.slice(0, Math.ceil(vals.length/2));
  const last  = vals.slice(Math.floor(vals.length/2));
  const delta = avg(last) - avg(first);
  if (delta < -0.3) return { arrow:'↓', color:'#607a5c', label:'Improving' };
  if (delta >  0.3) return { arrow:'↑', color:'#943f3a', label:'Worsening' };
  return { arrow:'→', color:'#b5706a', label:'Stable' };
}
function severityColor(v) {
  v = parseInt(v);
  const map = { 1:'#8fa88a', 2:'#d4908a', 3:'#c77c74', 4:'#a85450', 5:'#943f3a' };
  return map[v] || '#d4908a';
}
function severityBg(v) {
  v = parseInt(v);
  const map = { 1:'#dde8db', 2:'#f2e0de', 3:'#f2e0de', 4:'#f2e0de', 5:'#f2e0de' };
  return map[v] || '#f2e0de';
}

/* seedDemoData removed — app starts as a clean blank slate */

