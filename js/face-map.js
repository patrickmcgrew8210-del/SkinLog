/* ══════════════════════════════════════════════
   FACE MAP — tappable breakout-area diagram on the Log screen
══════════════════════════════════════════════ */

const CONFETTI_COLORS = ['#d4908a', '#8fa88a', '#e8b8b2', '#c9dcc6', '#f2c9a0', '#b5706a'];

function spawnConfetti(region) {
  const svg = document.getElementById('face-map');
  const target = svg && svg.querySelector(`.face-region[data-region="${region}"]`);
  if (!svg || !target || typeof target.getBBox !== 'function') return;
  const box = target.getBBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const ns = 'http://www.w3.org/2000/svg';
  const count = 8;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 16 + Math.random() * 16;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);
    dot.setAttribute('r', 1.5 + Math.random() * 1.5);
    dot.setAttribute('fill', CONFETTI_COLORS[i % CONFETTI_COLORS.length]);
    dot.classList.add('confetti-bit');
    dot.style.setProperty('--dx', `${dx}px`);
    dot.style.setProperty('--dy', `${dy}px`);
    svg.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
    setTimeout(() => dot.remove(), 900);
  }
}

function toggleBreakoutArea(el) {
  const region = el.dataset.region;
  const willActivate = !el.classList.contains('active-region');
  document.querySelectorAll(`.face-region[data-region="${region}"]`)
    .forEach(e => e.classList.toggle('active-region', willActivate));
  if (willActivate) spawnConfetti(region);
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

