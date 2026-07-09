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
  el.textContent = areas.length ? areas.map(a => FACE_REGION_LABELS[a]).join(' · ') : 'Tap the diagram to mark areas';
}

