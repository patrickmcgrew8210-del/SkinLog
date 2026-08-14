/* ══════════════════════════════════════════════
   BIOMETRIC LOCK — Face ID / Touch ID / fingerprint re-entry gate.
   This is a local, per-device convenience lock on top of an already
   valid Supabase session — not a replacement for real authentication.
   The credential itself is never sent anywhere; the OS biometric
   sensor is the actual gate.
══════════════════════════════════════════════ */

const BIOMETRIC_ENABLED_KEY = 'skinlog-biometric-enabled';
const BIOMETRIC_CREDENTIAL_KEY = 'skinlog-biometric-credential-id';

function isBiometricLockEnabled() {
  return localStorage.getItem(BIOMETRIC_ENABLED_KEY) === '1';
}

async function isBiometricAvailable() {
  if (!window.PublicKeyCredential || !PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) return false;
  try { return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(); }
  catch (e) { return false; }
}

function randomChallenge() {
  return crypto.getRandomValues(new Uint8Array(32));
}

/** Registers a platform (Face ID / Touch ID / fingerprint) credential for this device. */
async function enableBiometricLock() {
  try {
    const userId = crypto.getRandomValues(new Uint8Array(16));
    const cred = await navigator.credentials.create({
      publicKey: {
        challenge: randomChallenge(),
        rp: { name: 'SkinLog' },
        user: { id: userId, name: userName || 'SkinLog user', displayName: userName || 'SkinLog user' },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
        authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required' },
        timeout: 60000,
      },
    });
    if (!cred) return { error: { message: 'Could not set up biometric unlock.' } };
    const credentialId = btoa(String.fromCharCode(...new Uint8Array(cred.rawId)));
    localStorage.setItem(BIOMETRIC_CREDENTIAL_KEY, credentialId);
    localStorage.setItem(BIOMETRIC_ENABLED_KEY, '1');
    return {};
  } catch (e) {
    return { error: { message: e.name === 'NotAllowedError' ? 'Cancelled.' : (e.message || 'Could not set up biometric unlock.') } };
  }
}

function disableBiometricLock() {
  localStorage.removeItem(BIOMETRIC_ENABLED_KEY);
  localStorage.removeItem(BIOMETRIC_CREDENTIAL_KEY);
}

/** Prompts Face ID / Touch ID / fingerprint. Resolves true on success. */
async function verifyBiometricUnlock() {
  const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_KEY);
  if (!credentialId) return false;
  try {
    const rawId = Uint8Array.from(atob(credentialId), (c) => c.charCodeAt(0));
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: randomChallenge(),
        allowCredentials: [{ id: rawId, type: 'public-key' }],
        userVerification: 'required',
        timeout: 60000,
      },
    });
    return !!assertion;
  } catch (e) {
    return false;
  }
}

/** Shows the full-screen lock overlay and resolves once unlocked (or the
 *  user signs out instead, in which case the page reloads and this never
 *  resolves). */
function presentBiometricLockScreen() {
  return new Promise((resolve) => {
    const screen = document.getElementById('biometric-lock-screen');
    const statusEl = document.getElementById('biometric-lock-status');
    const unlockBtn = document.getElementById('biometric-unlock-btn');
    if (!screen || !unlockBtn) { resolve(true); return; }

    screen.style.display = 'flex';

    async function attempt() {
      statusEl.textContent = '';
      unlockBtn.disabled = true;
      const ok = await verifyBiometricUnlock();
      unlockBtn.disabled = false;
      if (ok) {
        screen.style.display = 'none';
        resolve(true);
      } else {
        statusEl.textContent = "Couldn't verify — try again.";
      }
    }

    unlockBtn.onclick = attempt;
    document.getElementById('biometric-signout-btn').onclick = async () => {
      await doCloudSignOut();
      location.reload();
    };
    attempt();
  });
}

/* ── Account-popup wiring ── */
async function refreshBiometricToggleVisibility() {
  const row = document.getElementById('biometric-toggle-row');
  if (!row) return;
  const available = await isBiometricAvailable();
  row.style.display = available ? 'flex' : 'none';
  const state = document.getElementById('biometric-toggle-state');
  if (state) {
    state.textContent = isBiometricLockEnabled() ? 'ON' : 'OFF';
    state.style.color = isBiometricLockEnabled() ? '#607a5c' : '#9e8a80';
  }
}

async function toggleBiometricLock() {
  const state = document.getElementById('biometric-toggle-state');
  if (isBiometricLockEnabled()) {
    disableBiometricLock();
    if (state) { state.textContent = 'OFF'; state.style.color = '#9e8a80'; }
    showToast('Biometric lock off', 'success');
    return;
  }
  const result = await enableBiometricLock();
  if (result.error) {
    showToast(result.error.message, 'error');
    return;
  }
  if (state) { state.textContent = 'ON'; state.style.color = '#607a5c'; }
  showToast('Biometric lock on', 'success');
}
