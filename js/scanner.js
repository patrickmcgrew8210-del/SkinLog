/* ══════════════════════════════════════════════
   SCANNER — barcode scan → Open Beauty Facts lookup. Camera permission
   → continuous decode → lookup, then hands off to js/analyzer.js: a
   found product opens the analyzer's scored detail view directly, a
   miss (not-found or a lookup error) opens its search/manual-entry
   flow — this file owns only the camera/decode/lookup pipeline.
══════════════════════════════════════════════ */

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
