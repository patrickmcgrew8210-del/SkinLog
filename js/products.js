/* ══════════════════════════════════════════════
   PRODUCTS — product tracking: chips, pickers, My Products modal
══════════════════════════════════════════════ */

/** Whether an entry counts as "using" a product — a single id match for
 *  the 4 fixed categories, or array membership for the free-form 'other'
 *  category (which can have several products active on the same day). */
function productUsedInEntry(entry, product) {
  if (product.category === 'other') return (entry.products?.other || []).includes(product.id);
  return entry.products?.[product.category] === product.id;
}

/** Correlational (not causal) before/after comparison for a product:
 *  avg severity on days it was used vs. avg severity before its start
 *  date. Requires at least 3 entries on each side to avoid drawing a
 *  conclusion from a couple of noisy data points. */
function computeProductImpact(product) {
  const logs = getLogs();
  const during = logs.filter(l => productUsedInEntry(l, product));
  const before = logs.filter(l => l.dateKey < product.startDate);
  if (during.length < 3 || before.length < 3) return { insufficient: true };
  return {
    insufficient: false,
    duringBreakout: avg(during.map(l => parseInt(l.breakout))),
    duringRedness:  avg(during.map(l => parseInt(l.redness))),
    beforeBreakout: avg(before.map(l => parseInt(l.breakout))),
    beforeRedness:  avg(before.map(l => parseInt(l.redness))),
  };
}

function renderProductChip(category) {
  const label = document.getElementById(`product-chip-label-${category}`);
  const chip = document.querySelector(`.product-chip[data-category="${category}"]`);
  if (!label || !chip) return;
  const id = _formProducts[category];
  const product = id ? getProducts().find(p => p.id === id) : null;
  label.textContent = product ? product.name : 'No product tagged';
  chip.classList.toggle('has-product', !!product);
}
function renderAllProductChips() {
  ['cleanser', 'treatment', 'moisturizer', 'spf'].forEach(renderProductChip);
}

function toggleOtherProduct(productId) {
  const idx = _formProducts.other.indexOf(productId);
  if (idx >= 0) _formProducts.other.splice(idx, 1); else _formProducts.other.push(productId);
  renderOtherProductPills();
}
function renderOtherProductPills() {
  const wrap = document.getElementById('other-products-wrap');
  if (!wrap) return;
  const products = getProducts().filter(p => p.category === 'other' && !p.archived);
  wrap.innerHTML = products.map(p => `
    <button type="button" class="other-product-pill ${_formProducts.other.includes(p.id) ? 'active' : ''}" onclick="toggleOtherProduct('${p.id}')">${escapeHtml(p.name)}</button>
  `).join('') + `
    <button type="button" class="other-product-pill other-product-pill-add" onclick="promptAddProduct('other', function(p){ _formProducts.other.push(p.id); renderOtherProductPills(); })">+ Add</button>
  `;
}

function closeProductPicker() {
  document.getElementById('sl-product-picker-overlay')?.remove();
  document.body.style.overflow = '';
}
function openProductPicker(category) {
  closeProductPicker();
  const products = getProducts().filter(p => p.category === category && !p.archived);
  const overlay = document.createElement('div');
  overlay.id = 'sl-product-picker-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '250';
  overlay.style.alignItems = 'center';
  const rowStyle = 'width:100%;text-align:left;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#fff;font-family:\'DM Sans\',sans-serif;font-size:13px;font-weight:600;color:#3a2e28;margin-bottom:8px;display:block;';
  const rows = products.map(p => `<button type="button" data-product-id="${p.id}" style="${rowStyle}">${escapeHtml(p.name)}</button>`).join('');
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:340px;width:calc(100% - 40px);margin:0 auto;padding:24px;max-height:70vh;overflow-y:auto;box-shadow:0 12px 40px rgba(58,46,40,0.2);animation:lbSlideUp 0.25s cubic-bezier(.34,1.1,.64,1) both;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 14px;">${escapeHtml(PRODUCT_CATEGORY_LABELS[category])} product</h3>
      <button type="button" data-product-id="" style="${rowStyle}color:#9e8a80;background:#faf7f4;">None</button>
      ${rows}
      <button type="button" id="sl-product-picker-add" style="width:100%;text-align:left;padding:12px 14px;border-radius:12px;border:1.5px dashed rgba(212,144,138,0.4);background:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#b5706a;">+ Add product</button>
    </div>`;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', e => { if (e.target === overlay) closeProductPicker(); });
  overlay.querySelectorAll('[data-product-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.productId || null;
      _formProducts[category] = id;
      const map = getCurrentProducts();
      map[category] = id;
      saveCurrentProducts(map);
      renderProductChip(category);
      closeProductPicker();
    });
  });
  document.getElementById('sl-product-picker-add').addEventListener('click', () => {
    closeProductPicker();
    promptAddProduct(category, (product) => {
      _formProducts[category] = product.id;
      const map = getCurrentProducts();
      map[category] = product.id;
      saveCurrentProducts(map);
      renderProductChip(category);
    });
  });
}

function closeAddProductPopup() {
  document.getElementById('sl-add-product-overlay')?.remove();
  document.body.style.overflow = '';
}
function promptAddProduct(category, onCreated) {
  closeAddProductPopup();
  const overlay = document.createElement('div');
  overlay.id = 'sl-add-product-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '260';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:340px;width:calc(100% - 40px);margin:0 auto;padding:24px;box-shadow:0 12px 40px rgba(58,46,40,0.2);animation:lbSlideUp 0.25s cubic-bezier(.34,1.1,.64,1) both;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 4px;">Add ${escapeHtml(PRODUCT_CATEGORY_LABELS[category])} product</h3>
      <p style="font-size:12px;color:#9e8a80;margin:0 0 14px;">Track it here to see how your skin trends since you started.</p>
      <input id="sl-add-product-name" type="text" maxlength="60" placeholder="Product name…"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:10px;" />
      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Started using on</label>
      <input id="sl-add-product-date" type="date" value="${isoDate(new Date())}"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:16px;" />
      <p id="sl-add-product-error" style="display:none;color:#943f3a;font-size:12px;font-weight:600;margin:0 0 10px;padding:8px 12px;background:#fdf2f2;border-radius:10px;">Please enter a product name.</p>
      <div style="display:flex;gap:10px;">
        <button id="sl-add-product-cancel" style="flex:1;padding:12px;border-radius:14px;border:1.5px solid #f0e8e6;background:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#7a6055;">Cancel</button>
        <button id="sl-add-product-save" style="flex:1;padding:12px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">Add</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAddProductPopup(); });
  document.getElementById('sl-add-product-cancel').onclick = closeAddProductPopup;
  const nameField = document.getElementById('sl-add-product-name');
  setTimeout(() => nameField.focus(), 80);
  document.getElementById('sl-add-product-save').onclick = () => {
    const name = nameField.value.trim();
    if (!name) { document.getElementById('sl-add-product-error').style.display = 'block'; nameField.focus(); return; }
    const startDate = document.getElementById('sl-add-product-date').value || isoDate(new Date());
    const product = { id: uid(), name, category, startDate, archived: false };
    const products = getProducts();
    products.push(product);
    if (!saveProducts(products)) return;
    closeAddProductPopup();
    onCreated(product);
  };
}

function renderProductRow(product, current) {
  const isCurrent = current[product.category] === product.id;
  const impact = computeProductImpact(product);
  const isUsed = getLogs().some(l => productUsedInEntry(l, product));
  let impactHtml;
  if (impact.insufficient) {
    impactHtml = `<p class="text-[11px] text-bark-muted mt-1">Not enough data yet — need at least 3 entries before and 3 while using.</p>`;
  } else {
    impactHtml = `
      <p class="text-[11px] text-bark-muted mt-1">
        Avg breakout while using: <strong style="color:#3a2e28">${impact.duringBreakout}</strong> (was ${impact.beforeBreakout} before) ·
        Avg redness: <strong style="color:#3a2e28">${impact.duringRedness}</strong> (was ${impact.beforeRedness} before)
      </p>
      <p class="text-[10px] text-bark-muted mt-0.5" style="font-style:italic;">Correlation only — not a cause-and-effect conclusion.</p>`;
  }

  const actionBtn = product.archived
    ? `<button onclick="unarchiveProduct('${product.id}')" class="text-[11px] font-bold text-sage-dark underline underline-offset-2 flex-shrink-0">Unarchive</button>`
    : `<button onclick="deleteOrArchiveProduct('${product.id}')" class="text-[11px] font-bold text-blush-dark underline underline-offset-2 flex-shrink-0">${isUsed ? 'Archive' : 'Delete'}</button>`;

  return `
    <div class="card rounded-2xl p-3.5 ${product.archived ? 'opacity-60' : ''}">
      <div class="flex items-start justify-between gap-2">
        <div>
          <p class="text-sm font-semibold text-bark">${escapeHtml(product.name)}</p>
          <p class="text-[10px] text-bark-muted mt-0.5">Since ${escapeHtml(product.startDate)}${product.archived ? ' · Archived' : ''}</p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          ${isCurrent && !product.archived ? `<span class="text-[10px] font-bold px-2 py-1 rounded-full bg-sage-light text-sage-dark">In Use</span>` : ''}
          ${actionBtn}
        </div>
      </div>
      ${impactHtml}
    </div>`;
}

function openProductsModal() {
  const body = document.getElementById('products-modal-body');
  const products = getProducts();
  const current = getCurrentProducts();

  const sections = PRODUCT_CATEGORIES.map(category => {
    const inCategory = products.filter(p => p.category === category);
    if (inCategory.length === 0) return '';
    return `
      <section>
        <p class="report-section-title" style="font-size:14px;">${escapeHtml(PRODUCT_CATEGORY_LABELS[category])}</p>
        <div class="space-y-2">${inCategory.map(p => renderProductRow(p, current)).join('')}</div>
      </section>`;
  }).join('');

  body.innerHTML = sections.trim() ? sections : `
    <div class="flex flex-col items-center justify-center py-8 gap-3 text-center">
      <span class="text-2xl">🧴</span>
      <p class="text-sm font-semibold text-bark">No products tracked yet</p>
      <p class="text-xs text-bark-muted" style="max-width:240px;">Tag a product under any routine step (or Other Products) on the Log screen to start tracking it here.</p>
    </div>`;

  document.getElementById('products-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductsModal() {
  document.getElementById('products-modal').classList.add('hidden');
  document.body.style.overflow = '';
}
function handleProductsModalBackdrop(e) {
  if (e.target === document.getElementById('products-modal')) closeProductsModal();
}

function deleteOrArchiveProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (!product) return;
  const isUsed = getLogs().some(l => productUsedInEntry(l, product));

  if (!isUsed) {
    showConfirmDialog({
      title: 'Delete this product?',
      message: `<strong>${escapeHtml(product.name)}</strong> has no entries tagged with it, so this fully removes it. This can’t be undone.`,
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        if (!saveProducts(products.filter(p => p.id !== id))) return;
        openProductsModal();
        showToast('Product deleted', 'info');
      },
    });
    return;
  }

  product.archived = true;
  if (!saveProducts(products)) return;
  const current = getCurrentProducts();
  if (current[product.category] === id) {
    current[product.category] = null;
    saveCurrentProducts(current);
  }
  openProductsModal();
  showToast('Product archived', 'info');
}

function unarchiveProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (!product) return;
  product.archived = false;
  if (!saveProducts(products)) return;
  openProductsModal();
  showToast('Product unarchived', 'success');
}

let _formProducts = { cleanser: null, treatment: null, moisturizer: null, spf: null, other: [] };
