/* ══════════════════════════════════════════════
   ANALYZER — searchable product selector, manual entry, and the
   explainable compatibility-score detail view. Ties together
   js/catalog.js (data), js/ingredient-rules.js + js/scoring.js
   (scoring), js/skin-profile.js (preferences), and the existing My
   Products system in js/products.js.

   Three views inside one modal, swapped by innerHTML:
     'search' — catalog search/filter, entry point into manual entry
     'manual' — brand/name + pasted ingredient list, with validation
     'detail' — name/brand, editable ingredient list, data-quality
                badges, the 0-100 score with its full explanation, and
                Add to My Products / Save changes.
══════════════════════════════════════════════ */

const MAX_MANUAL_INGREDIENTS_LENGTH = 4000; // generous — a real label rarely exceeds a few hundred characters per ingredient x ~30 ingredients

let _analyzerState = {
  view: 'search',
  searchQuery: '',
  searchCategory: 'all',
  currentProduct: null,   // the product draft currently shown in 'detail' (not yet necessarily saved)
  editingProductId: null, // set when currentProduct corresponds to an existing My Products entry being re-viewed/edited
  isEditingIngredients: false,
};

function openAnalyzerModal(initialView, seedProduct) {
  _analyzerState = {
    view: initialView || 'search',
    searchQuery: '',
    searchCategory: 'all',
    currentProduct: seedProduct || null,
    editingProductId: (seedProduct && seedProduct.__existingProductId) || null,
    isEditingIngredients: false,
  };
  document.getElementById('analyzer-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderAnalyzerModal();
}

function closeAnalyzerModal() {
  document.getElementById('analyzer-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleAnalyzerModalBackdrop(e) {
  if (e.target === document.getElementById('analyzer-modal')) closeAnalyzerModal();
}

function renderAnalyzerModal() {
  const body = document.getElementById('analyzer-modal-body');
  if (!body) return;
  if (_analyzerState.view === 'manual') body.innerHTML = renderManualEntryView();
  else if (_analyzerState.view === 'detail') body.innerHTML = renderDetailView();
  else body.innerHTML = renderSearchView();
}

/* ── Search / browse view ── */
function renderSearchView() {
  const results = searchCatalog(_analyzerState.searchQuery, _analyzerState.searchCategory);
  const chips = ['all', ...CATALOG_CATEGORIES].map(cat => {
    const label = cat === 'all' ? 'All' : CATALOG_CATEGORY_LABELS[cat];
    const active = _analyzerState.searchCategory === cat;
    return `<button type="button" onclick="setAnalyzerCategory('${cat}')"
      class="text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${active ? 'bg-blush-mid text-white' : 'bg-white text-bark-muted border border-blush-light'}">
      ${escapeHtml(label)}</button>`;
  }).join('');

  const rows = results.map(p => `
    <button type="button" onclick="selectCatalogProduct('${p.id}')" class="w-full text-left card rounded-2xl p-3 flex items-center justify-between gap-2">
      <div>
        <p class="text-sm font-semibold text-bark">${escapeHtml(p.name)}</p>
        <p class="text-[11px] text-bark-muted mt-0.5">${escapeHtml(p.brand)} · ${escapeHtml(CATALOG_CATEGORY_LABELS[p.catalogCategory])}</p>
      </div>
      <span class="text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-amber-50 text-amber-800 flex-shrink-0">Unverified</span>
    </button>`).join('');

  const emptyState = `
    <div class="flex flex-col items-center justify-center py-6 gap-2 text-center">
      <span class="text-2xl">🔍</span>
      <p class="text-sm font-semibold text-bark">No matching products in the starter catalog</p>
      <p class="text-xs text-bark-muted" style="max-width:260px;">This catalog is small on purpose — enter the product manually instead.</p>
    </div>`;

  return `
    <input id="analyzer-search-input" type="text" placeholder="Search brand or product name…" value="${escapeHtml(_analyzerState.searchQuery)}"
      oninput="handleAnalyzerSearchInput(this.value)"
      style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#fff;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:10px;" />
    <div class="flex gap-2 overflow-x-auto pb-1 mb-3" style="scrollbar-width:none;">${chips}</div>
    <div class="space-y-2 mb-4">${results.length ? rows : emptyState}</div>
    <button type="button" onclick="openManualEntryView()"
      style="width:100%;text-align:left;padding:12px 14px;border-radius:12px;border:1.5px dashed rgba(212,144,138,0.4);background:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#b5706a;">
      + Can't find it? Enter it manually
    </button>`;
}

function handleAnalyzerSearchInput(value) {
  _analyzerState.searchQuery = value;
  const resultsHost = document.getElementById('analyzer-search-input')?.parentElement;
  renderAnalyzerModal();
  // Restore focus/cursor — a full re-render otherwise steals it on every keystroke.
  const input = document.getElementById('analyzer-search-input');
  if (input) { input.focus(); input.selectionStart = input.selectionEnd = input.value.length; }
}

function setAnalyzerCategory(cat) {
  _analyzerState.searchCategory = cat;
  renderAnalyzerModal();
}

function openManualEntryView() {
  _analyzerState.view = 'manual';
  renderAnalyzerModal();
}

/* ── Manual entry view ── */
function renderManualEntryView() {
  return `
    <button type="button" onclick="_analyzerState.view='search'; renderAnalyzerModal();" class="text-[11px] font-bold text-bark-muted underline underline-offset-2 mb-3">← Back to search</button>
    <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Brand</label>
    <input id="analyzer-manual-brand" type="text" maxlength="60" placeholder="e.g. CeraVe"
      style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:14px;outline:none;margin-bottom:10px;" />
    <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Product name</label>
    <input id="analyzer-manual-name" type="text" maxlength="80" placeholder="e.g. Moisturizing Cream"
      style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:14px;outline:none;margin-bottom:10px;" />
    <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Category</label>
    <select id="analyzer-manual-category" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:14px;outline:none;margin-bottom:10px;">
      ${CATALOG_CATEGORIES.map(c => `<option value="${c}">${escapeHtml(CATALOG_CATEGORY_LABELS[c])}</option>`).join('')}
    </select>
    <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Ingredient list <span style="font-weight:500;text-transform:none;">(paste from packaging, comma-separated — optional)</span></label>
    <textarea id="analyzer-manual-ingredients" rows="5" placeholder="Water, Glycerin, Niacinamide, …"
      style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:13px;outline:none;margin-bottom:6px;resize:vertical;"></textarea>
    <p class="text-[10px] text-bark-muted mb-3">Without an ingredient list you can still save the product — there just won't be a compatibility score until one's added.</p>
    <p id="analyzer-manual-error" style="display:none;color:#943f3a;font-size:12px;font-weight:600;margin:0 0 10px;padding:8px 12px;background:#fdf2f2;border-radius:10px;"></p>
    <button type="button" onclick="submitManualEntry()"
      style="width:100%;padding:12px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">
      Continue
    </button>`;
}

function parseIngredientList(raw) {
  return String(raw || '')
    .split(/[,\n]/)
    .map(s => s.trim())
    .filter(Boolean);
}

function submitManualEntry() {
  const errorEl = document.getElementById('analyzer-manual-error');
  const showError = (msg) => { errorEl.textContent = msg; errorEl.style.display = 'block'; };

  const brand = document.getElementById('analyzer-manual-brand').value.trim();
  const name = document.getElementById('analyzer-manual-name').value.trim();
  const category = document.getElementById('analyzer-manual-category').value;
  const rawIngredients = document.getElementById('analyzer-manual-ingredients').value;

  if (!name) return showError('Please enter a product name.');
  if (rawIngredients.length > MAX_MANUAL_INGREDIENTS_LENGTH) return showError('That ingredient list looks too long to be a real label — please check it.');

  const ingredients = parseIngredientList(rawIngredients);
  const product = {
    brand: brand || null,
    name,
    catalogCategory: category,
    ingredients: ingredients.length ? ingredients : null,
    ingredientsComplete: false, // user-pasted text is never assumed to be the complete label
    verified: false,
    dataSource: 'manual',
    dataSourceNote: 'Entered manually by you from the product packaging — not independently verified.',
    catalogId: null,
    barcode: null,
  };
  _analyzerState.currentProduct = product;
  _analyzerState.editingProductId = null;
  _analyzerState.view = 'detail';
  _analyzerState.isEditingIngredients = false;
  renderAnalyzerModal();
}

/* ── Catalog selection → detail view ── */
function selectCatalogProduct(catalogId) {
  const entry = getCatalogProduct(catalogId);
  if (!entry) return;
  _analyzerState.currentProduct = {
    brand: entry.brand, name: entry.name, catalogCategory: entry.catalogCategory,
    ingredients: entry.ingredients.slice(), ingredientsComplete: entry.ingredientsComplete,
    verified: entry.verified, dataSource: entry.dataSource, dataSourceNote: entry.dataSourceNote,
    catalogId: entry.id, barcode: null, catalogNote: entry.note || null,
    corroboration: entry.corroboration || null, knownIssues: entry.knownIssues || [],
  };
  _analyzerState.editingProductId = null;
  _analyzerState.view = 'detail';
  _analyzerState.isEditingIngredients = false;
  renderAnalyzerModal();
}

/** Entry point from a scanner result (found, with or without
 *  ingredients) — see scanner.js's renderScanResult(). */
function openAnalyzerFromScan(scanResult) {
  const product = {
    brand: scanResult.brand || null, name: scanResult.name || 'Unnamed product',
    catalogCategory: 'other',
    ingredients: scanResult.ingredientsAvailable ? parseIngredientList(scanResult.ingredientsText) : null,
    ingredientsComplete: scanResult.ingredientsAvailable, // Open Beauty Facts' own full text, not a representative subset
    verified: false, // crowd-sourced, not independently re-checked by this app
    dataSource: 'scanned', dataSourceNote: 'Looked up via barcode from Open Beauty Facts — a crowd-sourced database, not independently re-verified by this app.',
    catalogId: null, barcode: scanResult.barcode || null,
  };
  openAnalyzerModal('detail', product);
}

/* ── Detail / scoring view ── */
function getOtherActiveIngredientLists(excludeProductId) {
  const current = getCurrentProducts();
  const activeIds = Object.values(current).filter(Boolean);
  return getProducts()
    .filter(p => activeIds.includes(p.id) && p.id !== excludeProductId && Array.isArray(p.ingredients))
    .map(p => p.ingredients);
}

function dataQualityBadge(product) {
  if (product.verified) return `<span class="text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-sage-light text-sage-dark">Verified</span>`;
  const label = { manual: 'User-entered', user_edited: 'User-edited', scanned: 'Unverified (scanned)', catalog_unverified: 'Unverified (catalog)' }[product.dataSource] || 'Unverified';
  return `<span class="text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-amber-50 text-amber-800">${escapeHtml(label)}</span>`;
}

function scoreBarColor(score) {
  if (score >= 70) return '#607a5c';
  if (score >= 40) return '#b5706a';
  return '#943f3a';
}
function confidenceBadgeStyle(confidence) {
  return { high: 'background:#dde8db;color:#3f5c3c', medium: 'background:#f2e0de;color:#b5706a', low: 'background:#f0e8e6;color:#9e8a80' }[confidence] || '';
}

function renderDetailView() {
  const product = _analyzerState.currentProduct;
  if (!product) return renderSearchView();

  const profile = getSkinProfile();
  const result = computeCompatibilityScore(product, profile, getOtherActiveIngredientLists(_analyzerState.editingProductId));

  const backBtn = _analyzerState.editingProductId
    ? '' // reopened from My Products — no "back to search", just Close
    : `<button type="button" onclick="_analyzerState.view='search'; renderAnalyzerModal();" class="text-[11px] font-bold text-bark-muted underline underline-offset-2 mb-3">← Back to search</button>`;

  const ingredientsBlock = _analyzerState.isEditingIngredients
    ? `<textarea id="analyzer-detail-ingredients-edit" rows="5"
        style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:12px;outline:none;margin-top:6px;resize:vertical;">${escapeHtml((product.ingredients || []).join(', '))}</textarea>
       <div class="flex gap-2 mt-2">
         <button type="button" onclick="saveEditedIngredients()" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Save & rescore</button>
         <button type="button" onclick="_analyzerState.isEditingIngredients=false; renderAnalyzerModal();" class="text-[11px] font-bold text-bark-muted underline underline-offset-2">Cancel</button>
       </div>`
    : `<p class="text-xs text-bark-muted mt-1">${product.ingredients && product.ingredients.length ? escapeHtml(product.ingredients.join(', ')) : 'No ingredient list yet.'}</p>
       <button type="button" onclick="_analyzerState.isEditingIngredients=true; renderAnalyzerModal();" class="text-[11px] font-bold text-sage-dark underline underline-offset-2 mt-1">Edit ingredients</button>`;

  let scoreBlock;
  if (result.insufficient) {
    scoreBlock = `
      <div class="rounded-2xl p-4 text-center" style="background:#faf7f4;">
        <p class="text-sm font-semibold text-bark">Not enough data for a score</p>
        <p class="text-xs text-bark-muted mt-1">${escapeHtml(result.reason)} Add an ingredient list above to get one.</p>
      </div>`;
  } else {
    const positivesHtml = result.positives.length
      ? `<div class="mt-3"><p class="text-[10px] font-bold uppercase tracking-wide text-sage-dark">May support your goals</p>
          ${result.positives.map(p => `<p class="text-xs text-bark-muted mt-1">• <strong>${escapeHtml(p.ingredient)}</strong> — ${escapeHtml(p.explanation)}</p>`).join('')}</div>` : '';
    const flaggedHtml = result.flagged.length
      ? `<div class="mt-3"><p class="text-[10px] font-bold uppercase tracking-wide text-blush-dark">Flagged for your sensitivities</p>
          ${result.flagged.map(f => `<p class="text-xs text-bark-muted mt-1">• <strong>${escapeHtml(f.ingredient)}</strong> — ${escapeHtml(f.reason)}${f.affectsScore === false ? ' <em>(already at the maximum penalty for this score)</em>' : ''}</p>`).join('')}</div>` : '';
    const tradeoffsHtml = result.tradeoffs.length
      ? `<div class="mt-3"><p class="text-[10px] font-bold uppercase tracking-wide text-bark-muted">Possible trade-offs</p>
          ${result.tradeoffs.map(t => `<p class="text-xs text-bark-muted mt-1">• <strong>${escapeHtml(t.ingredient)}</strong> — ${escapeHtml(t.explanation)}${t.affectsScore === false ? ' <em>(already at the maximum penalty for this score)</em>' : ''}</p>`).join('')}</div>` : '';
    const unknownHtml = result.unknownIngredients.length
      ? `<div class="mt-3"><p class="text-[10px] font-bold uppercase tracking-wide text-bark-muted">Unknown to this app</p>
          <p class="text-xs text-bark-muted mt-1">${escapeHtml(result.unknownIngredients.join(', '))} — not in our reference table, not scored either way.</p></div>` : '';
    const routineOverlapHtml = result.routineOverlap
      ? `<div class="mt-3 p-2.5 rounded-xl" style="background:#fef3c7;"><p class="text-xs" style="color:#92400e;">⚠ ${escapeHtml(result.routineOverlap.explanation)}</p></div>` : '';

    scoreBlock = `
      <div class="rounded-2xl p-4" style="background:#faf7f4;">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold" style="color:${scoreBarColor(result.score)};">${result.score}<span class="text-sm text-bark-muted font-normal">/100</span></p>
            <p class="text-[10px] text-bark-muted">Compatibility estimate</p>
          </div>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full" style="${confidenceBadgeStyle(result.confidence)}">${result.confidence.toUpperCase()} CONFIDENCE</span>
        </div>
        <div class="w-full h-2 rounded-full bg-white mt-3 overflow-hidden"><div class="h-full rounded-full" style="width:${result.score}%;background:${scoreBarColor(result.score)};"></div></div>
        <p class="text-[11px] text-bark-muted mt-3 italic">${escapeHtml(result.explanation)}</p>
        ${positivesHtml}${flaggedHtml}${tradeoffsHtml}${routineOverlapHtml}${unknownHtml}
      </div>`;
  }

  const saveBtn = _analyzerState.editingProductId
    ? `<button type="button" onclick="saveAnalyzerChangesToExistingProduct()" style="width:100%;padding:13px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-weight:700;font-size:13px;color:#fff;margin-top:14px;">Save changes</button>`
    : `<button type="button" onclick="addCurrentProductToMyProducts()" style="width:100%;padding:13px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-weight:700;font-size:13px;color:#fff;margin-top:14px;">Add to My Products</button>`;

  return `
    ${backBtn}
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="text-base font-semibold text-bark">${escapeHtml(product.name)}</p>
        <p class="text-xs text-bark-muted mt-0.5">${product.brand ? escapeHtml(product.brand) + ' · ' : ''}${escapeHtml(CATALOG_CATEGORY_LABELS[product.catalogCategory] || 'Other')}</p>
      </div>
      ${dataQualityBadge(product)}
    </div>
    ${product.catalogNote ? `<p class="text-[11px] text-bark-muted mt-1 italic">${escapeHtml(product.catalogNote)}</p>` : ''}
    ${product.corroboration ? `<p class="text-[10px] mt-1.5 px-2 py-1 rounded-lg inline-block" style="background:#f0e8e6;color:#7a6055;">Cross-checked against secondary sources ${escapeHtml(product.corroboration.checkedDate)} (${escapeHtml(product.corroboration.confidence)} confidence) — still not independently verified against an official source.</p>` : ''}
    ${(product.knownIssues || []).length ? product.knownIssues.map(issue => `<p class="text-[11px] mt-1.5 px-2.5 py-1.5 rounded-lg" style="background:#fef3c7;color:#92400e;">⚠ ${escapeHtml(issue)}</p>`).join('') : ''}
    <div class="mt-3">
      <p class="text-[10px] font-bold uppercase tracking-wide text-bark-muted">Ingredients</p>
      ${ingredientsBlock}
    </div>
    <div class="mt-4">${scoreBlock}</div>
    <button type="button" onclick="openSkinProfileEditor()" class="text-[11px] font-bold text-sage-dark underline underline-offset-2 mt-3 inline-block">Edit your skin profile</button>
    ${saveBtn}`;
}

function saveEditedIngredients() {
  const raw = document.getElementById('analyzer-detail-ingredients-edit').value;
  if (raw.length > MAX_MANUAL_INGREDIENTS_LENGTH) { showToast("That ingredient list looks too long — please check it.", 'error'); return; }
  const ingredients = parseIngredientList(raw);
  _analyzerState.currentProduct.ingredients = ingredients.length ? ingredients : null;
  _analyzerState.currentProduct.ingredientsComplete = false;
  _analyzerState.currentProduct.verified = false;
  _analyzerState.currentProduct.dataSource = 'user_edited';
  _analyzerState.currentProduct.dataSourceNote = 'Edited by you — not independently verified.';
  _analyzerState.isEditingIngredients = false;
  renderAnalyzerModal();
}

/** Finds an existing My Products entry that's plausibly the same
 *  product — by catalog id, by barcode, or by case-insensitive
 *  brand+name match — so re-adding something already tracked offers
 *  to update it instead of creating a duplicate. */
function findDuplicateProduct(draft) {
  const products = getProducts();
  if (draft.catalogId) {
    const m = products.find(p => p.catalogId === draft.catalogId && !p.archived);
    if (m) return m;
  }
  if (draft.barcode) {
    const m = products.find(p => p.barcode === draft.barcode && !p.archived);
    if (m) return m;
  }
  const nameKey = `${(draft.brand || '').toLowerCase()}|${draft.name.toLowerCase()}`;
  return products.find(p => !p.archived && `${(p.brand || '').toLowerCase()}|${p.name.toLowerCase()}` === nameKey) || null;
}

function buildProductRecordFromDraft(draft, existingId) {
  const profile = getSkinProfile();
  const result = computeCompatibilityScore(draft, profile, getOtherActiveIngredientLists(existingId));
  return {
    id: existingId || uid(),
    name: draft.name,
    category: catalogCategoryToRoutineCategory(draft.catalogCategory),
    startDate: isoDate(new Date()),
    archived: false,
    brand: draft.brand || null,
    barcode: draft.barcode || null,
    catalogId: draft.catalogId || null,
    ingredients: draft.ingredients || null,
    ingredientsComplete: !!draft.ingredientsComplete,
    verified: !!draft.verified,
    dataSource: draft.dataSource || 'manual',
    dataSourceNote: draft.dataSourceNote || '',
    corroboration: draft.corroboration || null,
    knownIssues: draft.knownIssues || [],
    lastAnalysis: result.insufficient ? null : { score: result.score, confidence: result.confidence, computedAt: new Date().toISOString() },
  };
}

function addCurrentProductToMyProducts() {
  const draft = _analyzerState.currentProduct;
  const dup = findDuplicateProduct(draft);
  if (dup) {
    showConfirmDialog({
      title: 'Already in My Products',
      message: `<strong>${escapeHtml(dup.name)}</strong> looks like it's already tracked. Update its ingredient data with what's shown here instead of adding a duplicate?`,
      confirmLabel: 'Update it',
      onConfirm: () => {
        const products = getProducts();
        const idx = products.findIndex(p => p.id === dup.id);
        const updated = buildProductRecordFromDraft(draft, dup.id);
        products[idx] = { ...products[idx], ...updated, startDate: products[idx].startDate }; // keep the original "started using on" date
        if (!saveProducts(products)) return;
        closeAnalyzerModal();
        showToast('Product updated', 'success');
      },
    });
    return;
  }

  const products = getProducts();
  products.push(buildProductRecordFromDraft(draft, null));
  if (!saveProducts(products)) return;
  closeAnalyzerModal();
  showToast('Added to My Products', 'success');
  if (typeof openProductsModal === 'function') openProductsModal();
}

function saveAnalyzerChangesToExistingProduct() {
  const draft = _analyzerState.currentProduct;
  const products = getProducts();
  const idx = products.findIndex(p => p.id === _analyzerState.editingProductId);
  if (idx < 0) return;
  const updated = buildProductRecordFromDraft(draft, _analyzerState.editingProductId);
  products[idx] = { ...products[idx], ...updated, startDate: products[idx].startDate, archived: products[idx].archived };
  if (!saveProducts(products)) return;
  closeAnalyzerModal();
  showToast('Analysis updated', 'success');
  if (typeof openProductsModal === 'function') openProductsModal();
}

/** Entry point from My Products — reopens a saved product's ingredient
 *  data and a freshly-recomputed score (not a stale cached one, since
 *  the user's profile or routine may have changed since it was saved). */
function reopenSavedAnalysis(productId) {
  const product = getProducts().find(p => p.id === productId);
  if (!product) return;
  const draft = {
    brand: product.brand || null, name: product.name,
    catalogCategory: Object.keys({ cleanser: 1, moisturizer: 1, sunscreen: 1, acneTreatment: 1, serum: 1, toner: 1, other: 1 })
      .find(c => catalogCategoryToRoutineCategory(c) === product.category) || 'other',
    ingredients: product.ingredients || null, ingredientsComplete: !!product.ingredientsComplete,
    verified: !!product.verified, dataSource: product.dataSource || 'manual', dataSourceNote: product.dataSourceNote || '',
    catalogId: product.catalogId || null, barcode: product.barcode || null,
    corroboration: product.corroboration || null, knownIssues: product.knownIssues || [],
  };
  openAnalyzerModal('detail', { ...draft, __existingProductId: productId });
}

/* ── Skin profile mini-editor (centered popup, same pattern as promptAddProduct) ── */
function closeSkinProfileEditor() {
  document.getElementById('sl-skin-profile-overlay')?.remove();
}
function openSkinProfileEditor() {
  closeSkinProfileEditor();
  const profile = getSkinProfile();
  const overlay = document.createElement('div');
  overlay.id = 'sl-skin-profile-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '270';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:340px;width:calc(100% - 40px);margin:0 auto;padding:24px;max-height:85vh;overflow-y:auto;box-shadow:0 12px 40px rgba(58,46,40,0.2);">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 4px;">Your skin profile</h3>
      <p style="font-size:12px;color:#9e8a80;margin:0 0 14px;">Optional — used only to personalize the compatibility score. Never sent anywhere external.</p>

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Goals</label>
      <div style="margin-bottom:12px;">
        ${SKIN_GOALS.map(g => `
          <label style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:13px;color:#3a2e28;">
            <input type="checkbox" class="sl-skin-goal-cb" value="${g}" ${profile.goals.includes(g) ? 'checked' : ''} />
            ${escapeHtml(SKIN_GOAL_LABELS[g])}
          </label>`).join('')}
      </div>

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Skin type <span style="font-weight:500;text-transform:none;">(optional)</span></label>
      <select id="sl-skin-type-select" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:14px;outline:none;margin-bottom:12px;">
        <option value="">Not set</option>
        ${SKIN_TYPES.map(t => `<option value="${t}" ${profile.skinType === t ? 'selected' : ''}>${escapeHtml(SKIN_TYPE_LABELS[t])}</option>`).join('')}
      </select>

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Sensitivities / ingredients to avoid <span style="font-weight:500;text-transform:none;">(comma-separated)</span></label>
      <textarea id="sl-skin-sensitivities" rows="2" maxlength="500" placeholder="e.g. fragrance, lanolin"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-size:13px;outline:none;margin-bottom:16px;resize:vertical;">${escapeHtml(profile.sensitivities.join(', '))}</textarea>

      <div style="display:flex;gap:10px;">
        <button id="sl-skin-profile-cancel" style="flex:1;padding:12px;border-radius:14px;border:1.5px solid #f0e8e6;background:#fff;font-weight:700;font-size:13px;color:#7a6055;">Cancel</button>
        <button id="sl-skin-profile-save" style="flex:1;padding:12px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-weight:700;font-size:13px;color:#fff;">Save</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSkinProfileEditor(); });
  document.getElementById('sl-skin-profile-cancel').onclick = closeSkinProfileEditor;
  document.getElementById('sl-skin-profile-save').onclick = () => {
    const goals = Array.from(document.querySelectorAll('.sl-skin-goal-cb:checked')).map(cb => cb.value);
    const skinType = document.getElementById('sl-skin-type-select').value || null;
    const sensitivities = parseIngredientList(document.getElementById('sl-skin-sensitivities').value);
    if (!saveSkinProfile({ goals, skinType, sensitivities })) return;
    closeSkinProfileEditor();
    showToast('Skin profile saved', 'success');
    if (_analyzerState.view === 'detail') renderAnalyzerModal(); // rescore immediately against the new profile
  };
}
