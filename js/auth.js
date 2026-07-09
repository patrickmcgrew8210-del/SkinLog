/* ══════════════════════════════════════════════
   AUTH — sign-in screen, account popup, sign out
══════════════════════════════════════════════ */

/* ── USERNAME ── */
let userName = localStorage.getItem('skinlog-username') || '';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Write name to localStorage and refresh every DOM element that shows it */
function setUserName(name) {
  name = (name || '').trim();
  if (!name) return;
  userName = name;
  localStorage.setItem('skinlog-username', name);

  const el = document.getElementById('display-username');
  if (el) el.textContent = name + ' ✦';

  const av = document.getElementById('display-avatar-initial');
  if (av) av.textContent = name.charAt(0).toUpperCase();

  const gr = document.getElementById('display-greeting');
  if (gr) gr.textContent = getGreeting();
}

function showAuthScreen() {
  var s = document.getElementById('auth-screen');
  if (!s) return;
  s.style.display = 'flex';
  s.style.animation = 'lbFadeIn 0.3s ease both';
  // Reset to step 1
  var p = document.getElementById('auth-step-providers');
  var n = document.getElementById('auth-step-name');
  if (p) p.style.display = 'block';
  if (n) n.style.display = 'none';
  var nf = document.getElementById('auth-name-field');
  var ef = document.getElementById('auth-email-field');
  var er = document.getElementById('auth-field-error');
  if (nf) nf.value = '';
  if (ef) { ef.value = ''; ef.style.display = 'none'; }
  if (er) er.style.display = 'none';
  // Bind input enter-key
  if (nf && !nf._bound) {
    nf._bound = true;
    nf.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter') return;
      var emailField = document.getElementById('auth-email-field');
      if (emailField && emailField.style.display !== 'none') emailField.focus();
      else completeAuth();
    });
    nf.addEventListener('focus', function() { nf.style.borderColor='#d4908a'; nf.style.boxShadow='0 0 0 3px rgba(212,144,138,0.12)'; });
    nf.addEventListener('blur',  function() { nf.style.borderColor='#f0e8e6'; nf.style.boxShadow='none'; });
  }
  if (ef && !ef._bound) {
    ef._bound = true;
    ef.addEventListener('keydown', function(e) { if (e.key === 'Enter') completeAuth(); });
    ef.addEventListener('focus', function() { ef.style.borderColor='#d4908a'; ef.style.boxShadow='0 0 0 3px rgba(212,144,138,0.12)'; });
    ef.addEventListener('blur',  function() { ef.style.borderColor='#f0e8e6'; ef.style.boxShadow='none'; });
  }
} // end showAuthScreen

/* ── Auth step helpers — zero native dialogs ── */
let _authProvider = '';
const PROVIDER_META = {
  google:   { label:'Google',   bg:'#fff',    border:'#e8e0dd', color:'#3a2e28', icon:'<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.5 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.6 0-14.2 4.6-17.7 11.7z"/><path fill="#FBBC05" d="M24 44c5.9 0 11-2 14.7-5.4l-6.8-5.6C29.9 35.1 27.1 36 24 36c-6.1 0-11.2-4.1-13-9.6l-6.9 5.3C7.7 39.6 15.3 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.8-2.8 5-5.3 6.5l6.8 5.6C41.6 37 44 30.9 44 24c0-1.3-.2-2.7-.5-4z"/></svg>' },
  apple:    { label:'Apple',    bg:'#1c1c1e', border:'#1c1c1e', color:'#fff',    icon:'<svg width="14" height="17" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 383.8 7.9 280.7 7.9 182.6c0-31.5 6.4-62.4 20.1-91.4 26.7-61.6 90.7-101.8 162.8-101.8 64.9 0 110.3 45.1 147.9 45.1 35.5 0 91.4-47.7 162.8-47.7 26.4 0 108.2 2.6 166.3 80.2zm-244.8-188.2c31.5-37.6 54.5-89.8 54.5-142 0-7.1-.6-14.3-1.9-20.1-51.5 2-113.7 34.4-149.4 73.2-28.9 32.1-55.7 84.3-55.7 137.2 0 7.7 1.3 15.5 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.4 0 105.1-30.9 136.9-67.7z"/></svg>' },
  facebook: { label:'Facebook', bg:'#1877F2', border:'#1877F2', color:'#fff',    icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  email:    { label:'Email',    bg:'#faf7f4', border:'#f0e8e6', color:'#3a2e28', icon:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#b5706a" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' },
};

function showNameStep(provider) {
  _authProvider = provider;
  const meta = PROVIDER_META[provider];

  document.getElementById('auth-step-providers').style.display = 'none';
  document.getElementById('auth-step-name').style.display = 'block';

  const badge = document.getElementById('auth-provider-badge');
  badge.style.background = meta.bg;
  badge.style.borderColor = meta.border;
  badge.innerHTML = `${meta.icon}<span style="font-size:13px;font-weight:700;color:${meta.color};">Signing in with ${meta.label}</span>`;

  const emailField = document.getElementById('auth-email-field');
  emailField.style.display = provider === 'email' ? 'block' : 'none';

  document.getElementById('auth-field-error').style.display = 'none';
  document.getElementById('auth-name-field').value = '';
  if (provider === 'email') document.getElementById('auth-email-field').value = '';
  setTimeout(() => document.getElementById('auth-name-field').focus(), 120);
}

function backToProviders() {
  document.getElementById('auth-step-name').style.display = 'none';
  document.getElementById('auth-step-providers').style.display = 'block';
}

function completeAuth() {
  const name  = (document.getElementById('auth-name-field')?.value || '').trim();
  const email = (document.getElementById('auth-email-field')?.value || '').trim();
  const errEl = document.getElementById('auth-field-error');
  if (!name || (_authProvider === 'email' && !email)) {
    errEl.style.display = 'block';
    if (!name) document.getElementById('auth-name-field').focus();
    else       document.getElementById('auth-email-field').focus();
    return;
  }
  errEl.style.display = 'none';
  if (email) localStorage.setItem('skinlog-email', email);
  localStorage.setItem('skinlog-provider', _authProvider);
  dismissAuthScreen(name);
}

function dismissAuthScreen(name) {
  setUserName(name);
  localStorage.setItem('skinlog-authed', '1');
  hydrateDashboard();
  var el = document.getElementById('auth-screen');
  if (el) {
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = '0';
    setTimeout(function() {
      el.style.display = 'none';
      el.style.opacity = '1';
      el.style.transition = '';
    }, 320);
  }
}

/** Avatar tap — inline account popup, no native confirm() */
function promptRename() {
  const existing = document.getElementById('account-popup');
  if (existing) { existing.remove(); return; }

  const provider = localStorage.getItem('skinlog-provider') || 'email';
  const meta = PROVIDER_META[provider] || PROVIDER_META.email;
  const initial = userName ? userName.charAt(0).toUpperCase() : '?';

  const popup = document.createElement('div');
  popup.id = 'account-popup';
  popup.style.cssText = `
    position:fixed;top:72px;right:16px;z-index:400;
    background:#fff;border-radius:20px;
    box-shadow:0 8px 32px rgba(58,46,40,0.16);
    border:1px solid #f0e8e6;width:220px;padding:16px;
    font-family:'DM Sans',sans-serif;
    animation:lbFadeIn 0.18s ease both;`;
  popup.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0e8e6;">
      <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#f2e0de,#d4908a);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;color:#fff;flex-shrink:0;">${escapeHtml(initial)}</div>
      <div style="overflow:hidden;">
        <p style="margin:0;font-size:14px;font-weight:700;color:#3a2e28;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(userName)}</p>
        <p style="margin:0;font-size:11px;color:#9e8a80;">via ${escapeHtml(meta.label)}</p>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0e8e6;">
      <button onclick="openProductsModal(); document.getElementById('account-popup')?.remove();" style="width:100%;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#7a6055;">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>
        My Products
      </button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0e8e6;">
      <button id="cycle-toggle-btn" onclick="toggleCycleTracking()" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#7a6055;">
        <span style="display:flex;align-items:center;gap:8px;">🩸 Cycle Day Tracking</span>
        <span id="cycle-toggle-state" style="font-size:11px;font-weight:700;color:${isCycleTrackingEnabled() ? '#607a5c' : '#9e8a80'};">${isCycleTrackingEnabled() ? 'ON' : 'OFF'}</span>
      </button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0e8e6;">
      <button onclick="exportBackup()" style="width:100%;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#7a6055;">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M7 10l5 5 5-5M12 15V3"/></svg>
        Export Backup
      </button>
      <button onclick="triggerRestoreBackup()" style="width:100%;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#7a6055;">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M17 8l-5-5-5 5M12 3v12"/></svg>
        Restore Backup
      </button>
    </div>
    <button onclick="signOut()" style="width:100%;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#faf7f4;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#943f3a;" >
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      Sign out
    </button>`;

  document.body.appendChild(popup);
  setTimeout(() => {
    function dismiss(e) { if (!popup.contains(e.target)) { popup.remove(); document.removeEventListener('touchstart',dismiss); document.removeEventListener('click',dismiss); } }
    document.addEventListener('touchstart', dismiss);
    document.addEventListener('click', dismiss);
  }, 50);
}

function signOut() {
  ['skinlog-authed','skinlog-username','skinlog-email','skinlog-provider'].forEach(k => localStorage.removeItem(k));
  location.reload();
}
