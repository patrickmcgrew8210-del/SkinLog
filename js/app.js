/* ══════════════════════════════════════════════
   APP INIT — DOMContentLoaded bootstrap, global keydown handler
══════════════════════════════════════════════ */

/** Loads this user's cloud data, gates on biometric unlock if enabled on
 *  this device, sets the display name, and reveals the app. */
async function _bootSignedInUser(user) {
  await loadCloudData(user.id);
  _currentProvider = (user.app_metadata && user.app_metadata.provider) || 'email';
  const displayName = _cloudCache.display_name
    || (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name))
    || (user.email ? user.email.split('@')[0] : 'there');

  if (isBiometricLockEnabled()) {
    await presentBiometricLockScreen();
  }
  dismissAuthScreen(displayName);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Set log screen date label
  const now   = new Date();
  const label = document.getElementById('log-date-label');
  if (label) label.textContent = now.toLocaleDateString('en-US', { month:'short', day:'numeric' });

  // Init sliders and routine bar to zero
  updateSlider('breakout', 1);
  updateSlider('redness',  1);
  updateRoutineProgress();
  syncCycleFieldVisibility();

  // Hydrate dashboard with whatever's in the (still-empty) local cache
  // so the screen isn't blank while the auth/session check resolves.
  hydrateDashboard();

  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    await _bootSignedInUser(session.user);
  } else {
    showAuthScreen();
  }

  // Catches the redirect back from Google OAuth (and any other async
  // sign-in). Guarded so it doesn't re-run for the session already
  // handled above.
  sb.auth.onAuthStateChange(async (event, newSession) => {
    if (event === 'SIGNED_IN' && !_cloudCache && newSession) {
      await _bootSignedInUser(newSession.user);
    }
  });
});

// Also close lightbox / export modal / products modal / popups / confirm dialog on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePhotoLightbox();
    closeExportModal();
    closeProductsModal();
    closeProductPicker();
    closeAddProductPopup();
    closeCompareModal();
    closeComparePicker();
    const confirmOverlay = document.getElementById('sl-confirm-overlay');
    if (confirmOverlay) { confirmOverlay.remove(); document.body.style.overflow = ''; }
  }
});

// Register service worker for offline/installable support (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
