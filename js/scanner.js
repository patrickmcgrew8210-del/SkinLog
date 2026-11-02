/* ══════════════════════════════════════════════
   SCANNER — barcode scan → Open Beauty Facts lookup. Camera permission
   → continuous decode → lookup, then hands off to js/analyzer.js: a
   found product opens the analyzer's scored detail view directly, a
   miss (not-found or a lookup error) opens its search/manual-entry
   flow — this file owns only the camera/decode/lookup pipeline.

   STATUS: barcode lookup is temporarily disabled (Open Beauty Facts
   coverage/reliability wasn't good enough to ship). The entry point in
   the account popup now opens openScannerComingSoon() below instead of
   openScannerModal() — nothing past this comment block is called from
   the UI right now, but it's left fully intact (camera permission,
   BarcodeDetector/ZXing decode, the lookup-product Edge Function call)
   so re-enabling later is a one-line change back to openScannerModal().
══════════════════════════════════════════════ */

/** Entry point from the account popup while barcode lookup is
 *  disabled. A small centered overlay (same pattern as the skin-profile
 *  editor in js/analyzer.js) — never touches the camera, never calls
 *  the lookup Edge Function. Routes "find it another way" straight into
 *  the analyzer's search/manual-entry flow, which is always available. */
function closeScannerComingSoon() {
  document.getElementById('sl-scanner-soon-overlay')?.remove();
}
function openScannerComingSoon() {
  closeScannerComingSoon();
  const overlay = document.createElement('div');
  overlay.id = 'sl-scanner-soon-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '270';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:320px;width:calc(100% - 40px);margin:0 auto;padding:28px 24px;text-align:center;box-shadow:0 12px 40px rgba(58,46,40,0.2);">
      <div style="width:56px;height:56px;border-radius:18px;background:linear-gradient(135deg,#f2e0de,#d4908a);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7V5a2 2 0 012-2h2M3 17v2a2 2 0 002 2h2M21 7V5a2 2 0 00-2-2h-2M21 17v2a2 2 0 01-2 2h-2M7 8v8M11 8v8M14 8v8M17 8v8"/></svg>
      </div>
      <p style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#b5706a;background:#f2e0de;display:inline-block;padding:4px 10px;border-radius:999px;margin-bottom:10px;">Coming Soon</p>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 8px;">Barcode scanning is on its way</h3>
      <p style="font-size:13px;color:#7a6055;line-height:1.5;margin:0 0 20px;">We're still working on making barcode product lookup reliable enough to ship. For now, you can search our product catalog or enter a product's ingredients by hand — both get you the same personalized compatibility score.</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button id="sl-scanner-soon-analyze" style="width:100%;padding:12px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">Search or enter a product</button>
        <button id="sl-scanner-soon-close" style="width:100%;padding:12px;border-radius:14px;border:1.5px solid #f0e8e6;background:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#7a6055;">Maybe later</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeScannerComingSoon(); });
  document.getElementById('sl-scanner-soon-close').onclick = closeScannerComingSoon;
  document.getElementById('sl-scanner-soon-analyze').onclick = () => {
    closeScannerComingSoon();
    openAnalyzerModal('search');
  };
}

const SCAN_BARCODE_FORMATS = ['ean_13', 'ean_8', 'upc_a', 'upc_e'];
const SCAN_POLL_INTERVAL_MS = 300;

let _scanStream = null;    // raw getUserMedia stream — set on the native BarcodeDetector path only
let _scanControls = null;  // ZXing controls object (fallback path) — its .stop() releases the stream itself
let _scanPollTimer = null; // setInterval id for the BarcodeDetector poll loop
let _scanResolved = false; // guards against acting on a decode twice, or after the modal's been closed

function openScannerModal() {
  _scanResolved = false;
  document.getElementById('scanner-result-body').classList.add('hidden');
  document.getElementById('scanner-result-body').innerHTML = '';
  document.getElementById('scanner-status').classList.remove('hidden');
  document.getElementById('scanner-video-wrap').classList.remove('hidden');
  document.getElementById('scanner-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderScannerState('requesting');
  startScanner();
}

function closeScannerModal() {
  stopScanner();
  document.getElementById('scanner-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleScannerModalBackdrop(e) {
  if (e.target === document.getElementById('scanner-modal')) closeScannerModal();
}

/** Releases the camera. Must run on every way out of the modal (close
 *  button, Escape, backdrop tap, a successful decode) — skipping this on
 *  any path would leave the camera light on after the modal is gone. */
function stopScanner() {
  clearInterval(_scanPollTimer);
  _scanPollTimer = null;
  if (_scanControls) { _scanControls.stop(); _scanControls = null; }
  if (_scanStream) { _scanStream.getTracks().forEach(t => t.stop()); _scanStream = null; }
}

const SCANNER_STATE_MESSAGES = {
  requesting: 'Requesting camera access…',
  scanning: 'Point your camera at a barcode',
  'permission-denied': "Camera access is off. Manual entry is coming in a future update — for now, check your browser's site settings to allow the camera.",
  'no-camera': 'No camera was found on this device.',
  unsupported: "Barcode scanning isn't supported in this browser.",
  looking_up: 'Looking up this product…',
  error: 'Something went wrong starting the camera.',
};

function renderScannerState(state) {
  const el = document.getElementById('scanner-status');
  if (!el) return;
  el.textContent = SCANNER_STATE_MESSAGES[state] || '';
  el.dataset.state = state;
  const showVideo = state === 'scanning' || state === 'requesting';
  document.getElementById('scanner-video-wrap')?.classList.toggle('hidden', !showVideo);
}

async function startScanner() {
  if (!navigator.mediaDevices?.getUserMedia) {
    renderScannerState('unsupported');
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      renderScannerState('permission-denied');
    } else if (err.name === 'NotFoundError' || err.name === 'OverconstrainedError') {
      renderScannerState('no-camera');
    } else {
      renderScannerState('error');
    }
    return;
  }

  const video = document.getElementById('scanner-video');
  renderScannerState('scanning');

  if ('BarcodeDetector' in window) {
    _scanStream = stream;
    video.srcObject = stream;
    try { await video.play(); } catch { /* autoplay can reject if the tab lost focus mid-request; the poll loop below just won't find anything until it's visible again */ }

    let detector;
    try {
      detector = new BarcodeDetector({ formats: SCAN_BARCODE_FORMATS });
    } catch {
      detector = new BarcodeDetector(); // this implementation doesn't support format filtering — fall back to its defaults
    }

    _scanPollTimer = setInterval(async () => {
      if (_scanResolved) return;
      try {
        const codes = await detector.detect(video);
        if (codes.length > 0) handleScanHit(codes[0].rawValue);
      } catch {
        // Expected between frames (e.g. video not yet ready) — not fatal.
      }
    }, SCAN_POLL_INTERVAL_MS);
  } else if (window.ZXingBrowser) {
    const reader = new ZXingBrowser.BrowserMultiFormatReader();
    try {
      _scanControls = await reader.decodeFromStream(stream, video, (result) => {
        if (result && !_scanResolved) handleScanHit(result.getText());
      });
    } catch {
      renderScannerState('error');
    }
  } else {
    // Neither the native API nor the bundled fallback is available.
    stream.getTracks().forEach(t => t.stop());
    renderScannerState('unsupported');
  }
}

function handleScanHit(barcode) {
  if (_scanResolved) return;
  _scanResolved = true;
  stopScanner();
  renderScannerState('looking_up');
  lookUpBarcode(barcode);
}

async function lookUpBarcode(barcode) {
  try {
    const { data, error } = await sb.functions.invoke('lookup-product', { body: { barcode } });
    if (error) { renderScanResult({ error: true }); return; }
    renderScanResult(data);
  } catch {
    renderScanResult({ error: true });
  }
}

/** A found product routes straight into the analyzer's detail/score
 *  view — a dead-end "here's the raw data, scan again" screen isn't
 *  useful on its own. A miss (not-found or a lookup error) routes into
 *  the analyzer's search/manual-entry flow instead of stopping here:
 *  a missing barcode match must never be a dead end. */
function renderScanResult(result) {
  if (result.found) {
    closeScannerModal();
    openAnalyzerFromScan(result);
    return;
  }

  const body = document.getElementById('scanner-result-body');
  if (!body) return;

  if (result.error) {
    body.innerHTML = `
      <p class="text-sm font-semibold text-bark">Couldn't reach the product database.</p>
      <p class="text-xs text-bark-muted mt-1">Check your connection and try again — or search/enter the product manually instead.</p>
      <div class="flex gap-3 mt-3">
        <button type="button" onclick="retryScan()" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Try again</button>
        <button type="button" onclick="closeScannerModal(); openAnalyzerModal('search');" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Search or enter manually</button>
      </div>`;
  } else {
    body.innerHTML = `
      <p class="text-sm font-semibold text-bark">We don't have this product yet.</p>
      <p class="text-xs text-bark-muted mt-1">Barcode ${escapeHtml(result.barcode || '')} isn't in Open Beauty Facts. You can still search a small starter catalog or enter it manually.</p>
      <div class="flex gap-3 mt-3">
        <button type="button" onclick="retryScan()" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Scan again</button>
        <button type="button" onclick="closeScannerModal(); openAnalyzerModal('search');" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Search or enter manually</button>
      </div>`;
  }
  document.getElementById('scanner-status').classList.add('hidden');
  document.getElementById('scanner-video-wrap').classList.add('hidden');
  body.classList.remove('hidden');
}

function retryScan() {
  _scanResolved = false;
  document.getElementById('scanner-result-body').classList.add('hidden');
  document.getElementById('scanner-status').classList.remove('hidden');
  document.getElementById('scanner-video-wrap').classList.remove('hidden');
  renderScannerState('requesting');
  startScanner();
}
