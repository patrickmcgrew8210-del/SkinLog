/* ══════════════════════════════════════════════
   PHOTOS — compression, upload, lightbox
══════════════════════════════════════════════ */

/** All entries with a progress photo, oldest → newest — the single
 *  source of truth for both the History compare CTA and the compare
 *  modal's date picker. */
function getPhotoEntries() {
  return getLogs().filter(l => l.photo).sort((a, b) => a.dateKey.localeCompare(b.dateKey));
}

let _pendingPhotoDataUrl   = null;  // newly-compressed data URL ready for saveLog()
let _photoExplicitlyCleared = false; // user tapped the × on an existing photo
let _editingOriginalPhoto  = null;  // photo carried over from the entry being edited
/**
 * compressPhoto(file, onDone)
 * Reads a File, draws it on #photo-compress-canvas at ≤400px wide,
 * exports as JPEG/0.6, and calls onDone(dataUrl|null).
 */
function compressPhoto(file, onDone) {
  if (!file) { onDone(null); return; }
  const reader = new FileReader();
  reader.onerror = () => onDone(null);
  reader.onload  = function(ev) {
    const sourceImg = new Image();
    sourceImg.onerror = () => onDone(null);
    sourceImg.onload  = function() {
      const canvas = document.getElementById('photo-compress-canvas');
      let w = sourceImg.naturalWidth  || sourceImg.width;
      let h = sourceImg.naturalHeight || sourceImg.height;

      // Downscale proportionally if wider than PHOTO_MAX_W
      if (w > PHOTO_MAX_W) {
        h = Math.round(h * PHOTO_MAX_W / w);
        w = PHOTO_MAX_W;
      }

      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);

      // Respect EXIF orientation on iOS by using CSS image-orientation:
      // drawImage always uses the raw bitmap, so we just draw straight.
      ctx.drawImage(sourceImg, 0, 0, w, h);

      const compressed = canvas.toDataURL('image/jpeg', PHOTO_QUALITY);

      // Safety: if canvas tainted or toDataURL fails, compressed will be
      // the empty-image string; treat that as null.
      onDone(compressed.length > 200 ? compressed : null);
    };
    sourceImg.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

/** Called when user picks/takes a photo on the Log screen */
function handlePhotoSelect(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  // Show a subtle loading shimmer on the upload zone while compressing
  const zone  = document.getElementById('photo-upload-zone');
  const wrap  = document.getElementById('photo-preview-wrap');
  zone.style.opacity = '0.5';

  compressPhoto(file, function(dataUrl) {
    zone.style.opacity = '';

    if (!dataUrl) {
      // Compression failed — silently skip photo (entry will save without it)
      clearPhoto();
      return;
    }

    _pendingPhotoDataUrl = dataUrl;

    // Reveal thumbnail preview
    const img   = document.getElementById('photo-preview-img');
    const badge = document.getElementById('photo-preview-date');
    img.src           = dataUrl;
    badge.textContent = new Date().toLocaleDateString('en-US',
      { month:'short', day:'numeric', year:'numeric' });
    zone.classList.add('hidden');
    wrap.classList.remove('hidden');
  });
}

/** Resets photo state — called by × button (marks photo removed) and on form reset */
function clearPhoto() {
  _pendingPhotoDataUrl = null;
  _photoExplicitlyCleared = true;
  const input = document.getElementById('log-photo-input');
  if (input) input.value = '';
  const img = document.getElementById('photo-preview-img');
  if (img) img.src = '';
  document.getElementById('photo-preview-wrap')?.classList.add('hidden');
  document.getElementById('photo-upload-zone')?.classList.remove('hidden');

  // Release canvas memory
  const canvas = document.getElementById('photo-compress-canvas');
  if (canvas) { canvas.width = 1; canvas.height = 1; }
}

/** Resolves what photo value the current form represents:
 *  a newly picked file, an explicit removal, or (when editing) the
 *  original photo carried over untouched. */
function resolveFormPhoto(onDone) {
  const file = document.getElementById('log-photo-input').files?.[0];
  if (_pendingPhotoDataUrl) { onDone(_pendingPhotoDataUrl); return; }
  if (file) { compressPhoto(file, onDone); return; }
  if (_photoExplicitlyCleared) { onDone(null); return; }
  onDone(_editingOriginalPhoto || null);
}

function openPhotoLightbox(src, dateLabel) {
  const lb  = document.getElementById('photo-lightbox');
  const img = document.getElementById('lightbox-photo-img');
  const cap = document.getElementById('lightbox-caption');
  img.src         = src;
  cap.textContent = `Progress photo · ${dateLabel}`;
  lb.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closePhotoLightbox() {
  document.getElementById('photo-lightbox').classList.add('hidden');
  document.getElementById('lightbox-photo-img').src = ''; // free memory
  document.body.style.overflow = '';
}

