/* ══════════════════════════════════════════════
   APP INIT — DOMContentLoaded bootstrap, global keydown handler
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Apply stored username to display nodes
  setUserName(userName);

  // Set log screen date label
  const now   = new Date();
  const label = document.getElementById('log-date-label');
  if (label) label.textContent = now.toLocaleDateString('en-US', { month:'short', day:'numeric' });

  // Init sliders and routine bar to zero
  updateSlider('breakout', 1);
  updateSlider('redness',  1);
  updateRoutineProgress();
  syncCycleFieldVisibility();

  // Hydrate dashboard with real data
  hydrateDashboard();

  // Show auth wall if not signed in
  if (!localStorage.getItem('skinlog-authed')) {
    showAuthScreen();
  }
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
