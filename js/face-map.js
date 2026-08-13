/* ══════════════════════════════════════════════
   FACE MAP — tappable breakout-area diagram on the Log screen
══════════════════════════════════════════════ */

function toggleBreakoutArea(el) {
  const region = el.dataset.region;
  const willActivate = !el.classList.contains('active-region');
  document.querySelectorAll(`.face-region[data-region="${region}"]`)
    .forEach(e => e.classList.toggle('active-region', willActivate));
  renderBreakoutAreaSummary();
}
function removeBreakoutArea(region) {
  document.querySelectorAll(`.face-region[data-region="${region}"]`)
    .forEach(e => e.classList.remove('active-region'));
  renderBreakoutAreaSummary();
}
function getActiveBreakoutAreas() {
  return [...new Set([...document.querySelectorAll('.face-region.active-region')].map(e => e.dataset.region))];
}
function setBreakoutAreas(areas) {
  const active = new Set(areas || []);
  document.querySelectorAll('.face-region').forEach(e => e.classList.toggle('active-region', active.has(e.dataset.region)));
  renderBreakoutAreaSummary();
}
function renderBreakoutAreaSummary() {
  const el = document.getElementById('breakout-areas-summary');
  if (!el) return;
  const areas = getActiveBreakoutAreas();
  if (!areas.length) {
    el.innerHTML = '<span class="text-[11px] text-bark-muted">Tap the diagram to mark areas</span>';
    return;
  }
  el.innerHTML = areas.map(a => `
    <span class="area-chip">
      ${escapeHtml(FACE_REGION_LABELS[a])}
      <button type="button" onclick="removeBreakoutArea('${a}')" aria-label="Remove ${escapeHtml(FACE_REGION_LABELS[a])}">✕</button>
    </span>
  `).join('');
}

