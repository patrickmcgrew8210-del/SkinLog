/* ══════════════════════════════════════════════
   NAV — view switching
══════════════════════════════════════════════ */

function setNav(viewId, btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
  if (viewId !== 'log') {
    const target = document.querySelector(`[data-view="${viewId}"]`);
    if (target) target.classList.add('active-nav');
  } else {
    btn && btn.classList.add('active-nav');
    setTimeout(() => btn && btn.classList.remove('active-nav'), 300);
  }

  VIEWS.forEach(id => {
    const el = document.getElementById(`view-${id}`);
    if (!el) return;
    if (id === viewId) {
      el.classList.remove('hidden-view');
      el.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (id === 'history')   renderHistory();
      if (id === 'dashboard') hydrateDashboard();
      if (id === 'trends')    renderTrends();
    } else {
      el.classList.remove('active-view');
      el.classList.add('hidden-view');
    }
  });
}

