/* ══════════════════════════════════════════════
   AUTH — sign-in screen, account popup, sign out
══════════════════════════════════════════════ */

/* ── USERNAME ── */
let userName = '';
let _currentProvider = 'email';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Updates the display name in the cloud cache and refreshes every DOM node that shows it. */
function setUserName(name) {
  name = (name || '').trim();
  if (!name) return;
  userName = name;
  if (_cloudCache) {
    _cloudCache.display_name = name;
    persistCloudData();
  }

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
  var pf = document.getElementById('auth-password-field');
  var er = document.getElementById('auth-field-error');
  if (nf) nf.value = '';
  if (ef) ef.value = '';
  if (pf) pf.value = '';
  if (er) er.style.display = 'none';
  // Bind input enter-key + focus styling once
  [nf, ef, pf].forEach(function(field) {
    if (!field || field._bound) return;
    field._bound = true;
    field.addEventListener('keydown', function(e) { if (e.key === 'Enter') completeAuth(); });
    field.addEventListener('focus', function() { field.style.borderColor='#d4908a'; field.style.boxShadow='0 0 0 3px rgba(212,144,138,0.12)'; });
    field.addEventListener('blur',  function() { field.style.borderColor='#f0e8e6'; field.style.boxShadow='none'; });
  });
} // end showAuthScreen

/* ── Auth step helpers — zero native dialogs ── */
let _authProvider = 'email';
let _authMode = 'signup'; // 'signup' | 'signin'
const PROVIDER_META = {
  google: { label: 'Google' },
  email:  { label: 'Email' },
};

function showNameStep(provider) {
  _authProvider = provider;
  document.getElementById('auth-step-providers').style.display = 'none';
  document.getElementById('auth-step-name').style.display = 'block';
  setAuthMode('signup');
  document.getElementById('auth-name-field').value = '';
  document.getElementById('auth-email-field').value = '';
  document.getElementById('auth-password-field').value = '';
  document.getElementById('auth-field-error').style.display = 'none';
  setTimeout(() => document.getElementById('auth-name-field').focus(), 120);
}

function backToProviders() {
  document.getElementById('auth-step-name').style.display = 'none';
  document.getElementById('auth-step-providers').style.display = 'block';
}

/** Switches the email step between "create account" and "sign in" presentation. */
function setAuthMode(mode) {
  _authMode = mode;
  const nameField = document.getElementById('auth-name-field');
  const btn       = document.getElementById('auth-submit-btn');
  const toggle    = document.getElementById('auth-mode-toggle');
  const heading   = document.getElementById('auth-step-heading');
  const sub       = document.getElementById('auth-step-subheading');
  const errEl     = document.getElementById('auth-field-error');

  if (mode === 'signup') {
    if (nameField) nameField.style.display = 'block';
    if (btn) btn.textContent = 'Create Account ✦';
    if (toggle) toggle.textContent = 'Already have an account? Sign in';
    if (heading) heading.textContent = "Let's get started";
    if (sub) sub.textContent = 'Create your account to sync across devices.';
  } else {
    if (nameField) nameField.style.display = 'none';
    if (btn) btn.textContent = 'Sign In';
    if (toggle) toggle.textContent = 'New here? Create an account';
    if (heading) heading.textContent = 'Welcome back';
    if (sub) sub.textContent = 'Sign in to your SkinLog account.';
  }
  if (errEl) errEl.style.display = 'none';
}
function toggleAuthMode() {
  setAuthMode(_authMode === 'signup' ? 'signin' : 'signup');
}

function friendlyAuthError(error) {
  const msg = (error && error.message) || '';
  if (/invalid login credentials/i.test(msg)) return 'Incorrect email or password.';
  if (/already registered/i.test(msg)) return 'An account with that email already exists — try signing in instead.';
  if (/password.*at least/i.test(msg)) return 'Password must be at least 6 characters.';
  if (/rate limit/i.test(msg)) return 'Too many attempts — wait a moment and try again.';
  return msg || 'Something went wrong. Please try again.';
}

async function completeAuth() {
  const name     = (document.getElementById('auth-name-field')?.value || '').trim();
  const email    = (document.getElementById('auth-email-field')?.value || '').trim();
  const password = (document.getElementById('auth-password-field')?.value || '').trim();
  const errEl    = document.getElementById('auth-field-error');
  const btn      = document.getElementById('auth-submit-btn');

  const missingName = _authMode === 'signup' && !name;
  if (missingName || !email || !password) {
    errEl.textContent = missingName ? 'Please enter your name to continue.' : 'Please enter your email and password.';
    errEl.style.display = 'block';
    return;
  }
  if (_authMode === 'signup' && password.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const result = _authMode === 'signup'
    ? await signUpWithEmail(email, password, name)
    : await signInWithEmail(email, password);

  btn.disabled = false;
  btn.style.opacity = '1';

  if (result.error) {
    errEl.textContent = friendlyAuthError(result.error);
    errEl.style.display = 'block';
    return;
  }
  if (result.needsConfirmation) {
    showToast('Check your email to confirm your account, then sign in.', 'success');
    setAuthMode('signin');
    return;
  }
  _currentProvider = 'email';
  const displayName = _authMode === 'signup' ? name : (_cloudCache.display_name || email.split('@')[0]);
  dismissAuthScreen(displayName);
}

function dismissAuthScreen(name) {
  setUserName(name);
  syncCycleFieldVisibility();
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

  const meta = PROVIDER_META[_currentProvider] || PROVIDER_META.email;
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
      <button id="reminder-toggle-btn" onclick="toggleDailyReminder()" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#7a6055;">
        <span style="display:flex;align-items:center;gap:8px;">🔔 Daily Reminder</span>
        <span id="reminder-toggle-state" style="font-size:11px;font-weight:700;color:${getReminderHour() != null ? '#607a5c' : '#9e8a80'};">${formatReminderState()}</span>
      </button>
      <div id="reminder-time-picker" style="display:none;gap:6px;">
        <button onclick="setReminderTime(8)" style="flex:1;padding:8px 4px;border-radius:10px;border:1.5px solid #f2e0de;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;color:#7a6055;">8 AM</button>
        <button onclick="setReminderTime(14)" style="flex:1;padding:8px 4px;border-radius:10px;border:1.5px solid #f2e0de;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;color:#7a6055;">2 PM</button>
        <button onclick="setReminderTime(19)" style="flex:1;padding:8px 4px;border-radius:10px;border:1.5px solid #f2e0de;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;color:#7a6055;">7 PM</button>
        <button onclick="setReminderTime(21)" style="flex:1;padding:8px 4px;border-radius:10px;border:1.5px solid #f2e0de;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;color:#7a6055;">9 PM</button>
      </div>
      <button id="biometric-toggle-row" onclick="toggleBiometricLock()" style="display:none;width:100%;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#7a6055;">
        <span style="display:flex;align-items:center;gap:8px;">🔒 Face ID / Fingerprint Lock</span>
        <span id="biometric-toggle-state" style="font-size:11px;font-weight:700;color:#9e8a80;">OFF</span>
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
    <button onclick="signOut()" style="width:100%;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1.5px solid #f2e0de;background:#faf7f4;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#943f3a;margin-bottom:8px;" >
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      Sign out
    </button>
    <button onclick="confirmDeleteAccount()" style="width:100%;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:none;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#c4b0a8;">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>
      Delete account
    </button>
    <p style="text-align:center;font-size:10px;color:#c4b0a8;margin:10px 0 0;">
      <a href="privacy.html" target="_blank" rel="noopener" style="color:#c4b0a8;">Privacy</a>
      &nbsp;·&nbsp;
      <a href="terms.html" target="_blank" rel="noopener" style="color:#c4b0a8;">Terms</a>
    </p>`;

  document.body.appendChild(popup);
  refreshBiometricToggleVisibility();
  setTimeout(() => {
    function dismiss(e) { if (!popup.contains(e.target)) { popup.remove(); document.removeEventListener('touchstart',dismiss); document.removeEventListener('click',dismiss); } }
    document.addEventListener('touchstart', dismiss);
    document.addEventListener('click', dismiss);
  }, 50);
}

async function signOut() {
  await doCloudSignOut();
  location.reload();
}

function confirmDeleteAccount() {
  document.getElementById('account-popup')?.remove();
  showConfirmDialog({
    title: 'Delete your account?',
    message: 'This permanently deletes your account and every entry, photo, and product you\'ve logged. This can\'t be undone.',
    confirmLabel: 'Delete Everything',
    danger: true,
    onConfirm: async () => {
      const result = await deleteAccount();
      if (result.error) {
        showToast('Could not delete your account — please try again.', 'error');
        return;
      }
      location.reload();
    },
  });
}
