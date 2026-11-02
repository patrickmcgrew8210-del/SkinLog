/* ══════════════════════════════════════════════
   CATALOG DATA — generated data file, not hand-edited in the normal
   course of things. See js/catalog.js for the search/filter/category
   logic that consumes this array, and DATA-VERIFICATION-REPORT.md for
   how this data was compiled.

   DATA QUALITY — READ BEFORE TRUSTING THIS FILE:
   Every entry's ingredient list (where present) came from WebSearch
   cross-checking secondary sources (retailer ingredient-data pages,
   ingredient-database aggregators, and in some cases a manufacturer's
   own product page) — never invented, never estimated to fill a gap.
   Nothing here is "verified": that would require independently
   reading an official manufacturer source directly, which this app
   has not done for any entry. An entry with ingredients:null is a
   genuine, real product this research could not find a usable
   ingredient list for within the time/search budget available — it's
   included so it's still findable by name (per the product
   requirement that an unverified-formula product should still appear
   in search, clearly labeled, rather than be silently omitted), not
   padding. Every entry's knownIssues field records specific,
   discrepancies, regional/reformulation caveats, or coverage gaps
   found during research — nothing was smoothed over.
══════════════════════════════════════════════ */

const PRODUCT_CATALOG = [
  {
    "id": "cat-cerave-hydrating-facial-cleanser",
    "brand": "CeraVe",
    "name": "Hydrating Facial Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Cetearyl Alcohol",
      "PEG-40 Stearate",
      "Stearyl Alcohol",
      "Potassium Phosphate",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP",
      "Carbomer",
      "Glyceryl Stearate",
      "Behentrimonium Methosulfate",
      "Sodium Lauroyl Lactylate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/hydrating-facial-cleanser/us",
      "https://giantfoodstores.com/groceries/product/cerave-hydrating-facial-cleanser-normal-to-dry-skin-pump-hyaluronic-acid-12-oz-btl/189575",
      "https://foodlion.com/groceries/product/cerave-hydrating-facial-cleanser-normal-to-dry-skin-pump-hyaluronic-acid-12-oz-btl/189575"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Skinsort's US listing and two US grocery-retailer ingredient panels (Giant Food, Food Lion) independently report the same first 13 ingredients in the same order."
    },
    "knownIssues": [
      "A Sweden-region Skinsort listing shows different trailing ingredients (phenoxyethanol, disodium EDTA, cetyl alcohol, polysorbate 20, ethylhexylglycerin), suggesting non-US formulas differ.",
      "List beyond the first ~13 ingredients not confirmed for the US version."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-foaming-facial-cleanser",
    "brand": "CeraVe",
    "name": "Foaming Facial Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Coco-Betaine",
      "Propylene Glycol",
      "Sodium Cocoyl Glycinate",
      "PEG-120 Methyl Glucose Dioleate",
      "Sodium Chloride",
      "Acrylates Copolymer",
      "Citric Acid",
      "Capryloyl Glycine",
      "Caprylyl Glycol",
      "Sodium Hydroxide",
      "Niacinamide",
      "Disodium EDTA",
      "Sodium Hyaluronate",
      "Sodium Lauroyl Lactylate",
      "Ceramide NP",
      "Phenoxyethanol",
      "Ceramide AP",
      "Phytosphingosine",
      "Cholesterol",
      "Xanthan Gum",
      "Carbomer",
      "Ethylhexylglycerin",
      "Ceramide EOP"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/foaming-facial-cleanser-eu",
      "https://skinsort.com/products/cerave/foaming-cleanser-eu",
      "https://incidecoder.com/products/cerave-foaming-facial-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Two Skinsort EU-region pages give complementary head and tail segments of an EU-formula list; a clean single US-formula list could not be located, and retailer searches (CVS/Target/Walgreens) returned no US ingredient panel for this exact SKU."
    },
    "knownIssues": [
      "Regional formulas vary substantially: Ukraine and India Skinsort listings show different surfactant systems (sodium cocoyl glycinate/sodium lauroyl sarcosinate variants) than this EU list.",
      "US-specific formula not confirmed; this list is best-effort from EU sources and may not match the US SKU exactly."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-renewing-sa-cleanser",
    "brand": "CeraVe",
    "name": "Renewing SA Cleanser",
    "catalogCategory": "exfoliant",
    "tags": [
      "for-dry-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Cocamidopropyl Hydroxysultaine",
      "Glycerin",
      "Sodium Lauroyl Sarcosinate",
      "Niacinamide",
      "Gluconolactone",
      "PEG-150 Pentaerythrityl Tetrastearate",
      "Sodium Methyl Cocoyl Taurate",
      "Zea Mays (Corn) Oil",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP",
      "Carbomer",
      "Sodium Chloride",
      "Salicylic Acid",
      "Sodium Benzoate",
      "Sodium Lauroyl Lactylate",
      "Cholesterol",
      "Phenoxyethanol",
      "Disodium EDTA",
      "Tetrasodium EDTA",
      "Hydrolyzed Hyaluronic Acid",
      "Phytosphingosine",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.hannaford.com/groceries/health-beauty/skin-care/facial-cleansers-washes/cerave-renewing-sa-cleanser-for-normal-skin-pump-salicylic-acid-8-oz-btl.html",
      "https://martinsfoods.com/groceries/health-beauty/skin-care/facial-cleansers-washes/cerave-renewing-sa-cleanser-for-normal-skin-pump-salicylic-acid-8-oz-btl.html",
      "https://www.cvs.com/shop/ingredients/cerave-renewing-sa-cleanser-16-oz-prodid-1140127"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Head of list from Hannaford's US retailer ingredient panel, tail of list from Martin's Foods US retailer ingredient panel (same retail chain group); active ingredient (salicylic acid) and key actives (niacinamide, hyaluronic acid, ceramides) confirmed by a separate CVS ingredients page."
    },
    "knownIssues": [
      "Martin's Foods listing also includes 'Cholecalciferol' (vitamin D3) and 'Calcium Gluconate', which are unusual for this product type and may indicate a mismatched or merged listing; included here with caution.",
      "An INCIDecoder page notes the SKU it tracked is discontinued, so current retail formula may have changed."
    ],
    "note": "Active ingredient confirmed as Salicylic Acid 2% per CVS product ingredients page.",
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-acne-foaming-cream-cleanser",
    "brand": "CeraVe",
    "name": "Acne Foaming Cream Cleanser",
    "catalogCategory": "acneTreatment",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Benzoyl Peroxide 4%",
      "Glycerin",
      "Propylene Glycol",
      "Cocamidopropyl Hydroxysultaine",
      "Diethylhexyl Sodium Sulfosuccinate",
      "Phytosphingosine",
      "Ethylhexylglycerin",
      "Benzoic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinvisor.vercel.app/en/products/cerave-acne-foaming-cream-cleanser",
      "https://www.heb.com/product-detail/product/3026514",
      "https://www.ulta.com/p/acne-foaming-cream-cleanser-pimprod2012167"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Benzoyl peroxide 4% as the active is confirmed by both HEB's retail listing and Skinvisor's ingredient breakdown; remaining inactive ingredients come from a single source (Skinvisor) and are unconfirmed elsewhere."
    },
    "knownIssues": [
      "A separate, similarly named CeraVe 'Acne Foaming Cream Wash' product was found with Benzoyl Peroxide 10% instead of 4% -- these are different SKUs/strengths and should not be conflated.",
      "Full ~27-28 ingredient list not confirmed; only partial inactive ingredients found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-blemish-control-cleanser",
    "brand": "CeraVe",
    "name": "Blemish Control Cleanser",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Sodium Lauroyl Sarcosinate",
      "Cocamidopropyl Hydroxysultaine",
      "Glycerin",
      "Niacinamide",
      "Salicylic Acid",
      "Gluconolactone",
      "Phytosphingosine",
      "Xanthan Gum",
      "Benzoic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ocado.com/products/cerave-blemish-control-cleanser/698247011",
      "https://www.cerave.eg/en/skincare/cleansers/blemish-control-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only a truncated partial INCI list was found (UK/EU retailer Ocado), supplemented by scattered ingredient mentions on other regional product pages; no second independent full-list source was found."
    },
    "knownIssues": [
      "Active ingredient confirmed as Salicylic Acid 2% by multiple EU/UK retailers (Superdrug, Cult Beauty), but this appears to primarily be sold outside the US (UK/EU/Middle East retailers); US availability not confirmed.",
      "List is cut off mid-formula; ceramide names and remaining ingredients not found."
    ],
    "note": "Product formulated with hectorite clay for oil absorption per retailer marketing copy; this functional claim could not be tied to a specific INCI name.",
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-hydrating-cleanser-bar",
    "brand": "CeraVe",
    "name": "Hydrating Cleanser Bar",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Sodium Cocoyl Isethionate",
      "Stearic Acid",
      "Xanthan Gum",
      "Ethylene Brassylate",
      "Cetyl Alcohol",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/hydrating-cleanser-bar",
      "https://incidecoder.com/products/cerave-hydrating-cleanser-bar",
      "https://skinsignal.com/products/cerave-hydrating-cleanser-bar"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Skinsort/Skinsignal report the head of the list (cleansing agents) and INCIDecoder reports the tail (viscosity/fragrance/preservative), but the middle of the ~31-33 ingredient list (including ceramide and hyaluronic acid naming) was not captured."
    },
    "knownIssues": [
      "Sources disagree on total ingredient count (31 vs 33), suggesting slightly different formulas or package sizes were indexed.",
      "Middle portion of ingredient list (where ceramides/HA likely appear) not found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-hydrating-micellar-water",
    "brand": "CeraVe",
    "name": "Hydrating Micellar Water",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Hexylene Glycol",
      "Poloxamer 184",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP",
      "Carbomer",
      "Niacinamide",
      "Triethyl Citrate",
      "Sodium Lauroyl Lactylate",
      "Cholesterol",
      "Disodium Cocoamphodiacetate",
      "Disodium EDTA"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cerave.ca/en-ca/skincare/cleansers/hydrating-micellar-water",
      "https://skinsort.com/products/cerave/micellar-cleansing-water"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "List sourced from CeraVe Canada's own product page (via search snippet) but truncated after 14 items; Skinsort's separate listing for an older/different regional version gives a different ingredient count, indicating formula has likely changed over time."
    },
    "knownIssues": [
      "Older Skinsort listing (different product page) reports 19-24 ingredients with some different items (propanediol, PEG-6 caprylic/capric glycerides), suggesting this product has been reformulated or varies by region/year.",
      "List truncated after 14 of an unknown total number of ingredients."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-moisturizing-cream",
    "brand": "CeraVe",
    "name": "Moisturizing Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Cetearyl Alcohol",
      "Caprylic/Capric Triglyceride",
      "Cetyl Alcohol",
      "Ceramide NP",
      "Ceramide AP",
      "Phytosphingosine",
      "Cholesterol",
      "Sodium Hyaluronate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/moisturizing-cream",
      "https://www.livestrong.com/article/136079-role-jojoba-oil-healing/",
      "https://www.skincarisma.com/products/cerave-moisturising-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Core emollient/ceramide ingredients cross-checked across Skinsort and an older third-party article; preservative system differs between the two, likely reflecting a reformulation over time."
    },
    "knownIssues": [
      "Older source (Livestrong) says the cream contains methylparaben/propylparaben; newer Skinsort listings describe current CeraVe creams as paraben-free with phenoxyethanol/ethylhexylglycerin instead -- likely a reformulation, not resolved to a single timeline here.",
      "Sources disagree on total ingredient count (23-27)."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-pm-facial-moisturizing-lotion",
    "brand": "CeraVe",
    "name": "PM Facial Moisturizing Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Caprylic/Capric Triglyceride",
      "Cholesterol",
      "Phenoxyethanol",
      "Disodium EDTA",
      "Dipotassium Phosphate",
      "Caprylyl Glycol",
      "Phytosphingosine",
      "Xanthan Gum",
      "Polyglyceryl-3 Diisostearate",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/pm-facial-moisturizing-lotion",
      "https://skinvisor.vercel.app/en/products/cerave-pm-facial-moisturizing-lotion"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Skinsort's US listing and Skinvisor agree water/glycerin/caprylic-capric triglyceride lead the formula, but sources disagree on total count (22-24) and the middle of the list (where ceramides/niacinamide/hyaluronic acid are presumably named) was not returned."
    },
    "knownIssues": [
      "Marketing consistently describes 'three essential ceramides', niacinamide, and hyaluronic acid, but the specific INCI names for these were not confirmed in the search results used, so they are omitted rather than assumed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-am-facial-moisturizing-lotion-spf-30",
    "brand": "CeraVe",
    "name": "AM Facial Moisturizing Lotion SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Aluminum Starch Octenylsuccinate",
      "Disodium EDTA",
      "Propylparaben",
      "Hydroxyethylcellulose",
      "Hydrolyzed Hyaluronic Acid",
      "Phytosphingosine",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/am-facial-moisturising-lotion-spf30/us",
      "https://www.cerave.ca/en-ca/skincare/moisturizers"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Sources conflict significantly on the active sunscreen filters by region (zinc oxide reported for the Canadian version vs. homosalate/menthyl anthranilate reported on one Skinsort comparison page for another region), so no single active-ingredient set could be confidently corroborated."
    },
    "knownIssues": [
      "Strong regional disagreement on sunscreen actives: Canadian retailer describes a mineral (zinc oxide) filter, while a Skinsort comparison page lists homosalate 10%/menthyl anthranilate 5% chemical filters -- these cannot both be the same regional formula and the US-specific active ingredients were not confirmed.",
      "Inactive ingredient list is from a single regional (Argentina) retailer and may not reflect the US formula.",
      "Ingredient count cited as 30 or 37 depending on source."
    ],
    "note": "Treat active sunscreen filters as unconfirmed for the US market version; verify against current US packaging.",
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-daily-moisturizing-lotion",
    "brand": "CeraVe",
    "name": "Daily Moisturizing Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Caprylic/Capric Triglyceride",
      "Cetearyl Alcohol",
      "Cetyl Alcohol",
      "Dimethicone",
      "Phenoxyethanol",
      "Polysorbate 20",
      "Ceteareth-20",
      "Behentrimonium Methosulfate",
      "Polyglyceryl-3 Diisostearate",
      "Sodium Lauroyl Lactylate",
      "Ethylhexylglycerin",
      "Potassium Phosphate",
      "Disodium EDTA",
      "Dipotassium Phosphate",
      "Ceramide NP",
      "Ceramide AP",
      "Phytosphingosine",
      "Cholesterol",
      "Xanthan Gum",
      "Carbomer",
      "Sodium Hyaluronate",
      "Tocopherol",
      "Ceramide EOP"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/daily-moisturizing-lotion-for-normal-to-dry-skin/france",
      "https://foodlion.com/groceries/health-beauty/bath-body/body-lotion/cerave-daily-moisturizing-lotion-normal-to-dry-skin-pump-lightweight-12-oz-btl.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Full 25-item list sourced from Skinsort's French regional listing; a separate US Food Lion retail listing confirms the presence of parabens not in the French list, flagged as a likely US-vs-EU formula difference."
    },
    "knownIssues": [
      "This list is from a French/EU regional Skinsort page; a US Food Lion listing for the 12oz pump mentions methylparaben/propylparaben which do not appear in this list, suggesting the US formula may differ (or the French formula was reformulated to remove parabens more recently than the US one)."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-ultra-light-moisturizing-lotion-spf-30",
    "brand": "CeraVe",
    "name": "Ultra-Light Moisturizing Lotion SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [
      "fragrance-free",
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Avobenzone 3%",
      "Homosalate 10%",
      "Octisalate 5%",
      "Octocrylene 2.7%",
      "Sodium Hyaluronate",
      "Cholesterol",
      "Phenoxyethanol",
      "Disodium EDTA",
      "Hydroxyacetophenone",
      "Citric Acid",
      "Phytosphingosine",
      "Xanthan Gum",
      "T-Butyl Alcohol",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/cerave-ultra-light-moisturizing-lotion-for-face-broad-spectrum-spf-30-1-7-oz-prodid-1710298",
      "https://www.hannaford.com/groceries/cerave-ultra-light-moisturizing-lotion-with-sunscreen-broad-spectrum-spf-30-175-oz-box.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active sunscreen percentages agree exactly between CVS's and Hannaford's US ingredient panels; a ShopRite listing gives a conflicting Octisalate percentage, noted below."
    },
    "knownIssues": [
      "A ShopRite listing reports Octisalate at 10% rather than 5%; the 5% figure is more widely corroborated (CVS + Hannaford) and was kept, but this may indicate a formula change between package sizes/years.",
      "CVS listing reportedly includes 26 total ingredients including ceramides and carbomer by name, but the full ordered list beyond what's shown here was not captured."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-skin-renewing-vitamin-c-serum",
    "brand": "CeraVe",
    "name": "Skin Renewing Vitamin C Serum",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Ascorbic Acid",
      "Glycerin",
      "Dimethicone",
      "Tocopheryl Acetate",
      "Isopropyl Myristate",
      "Alcohol Denat.",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/renewing-vitamin-c-face-serum-with-hyaluronic-acid",
      "https://www.skincarisma.com/products/cerave/skin-renewing-vitamin-c-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Skinsort and Skincarisma agree on the first several ingredients (water, ascorbic acid, glycerin, dimethicone) but disagree on total count (25 vs 26) and most of the remaining list was not captured."
    },
    "knownIssues": [
      "Only roughly 8 of ~25-26 total ingredients confirmed.",
      "Ceramide and vitamin B5/panthenol INCI names mentioned in marketing not confirmed in the ingredient data found."
    ],
    "note": "Active ingredient: 10% L-ascorbic acid (Vitamin C) per brand marketing copy repeated across retailers.",
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-resurfacing-retinol-serum",
    "brand": "CeraVe",
    "name": "Resurfacing Retinol Serum",
    "catalogCategory": "retinoid",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Propanediol",
      "Dimethicone",
      "Cetearyl Ethylhexanoate",
      "Niacinamide",
      "Ammonium Polyacryloyldimethyl Taurate",
      "Dipotassium Glycyrrhizate",
      "Hydrogenated Lecithin",
      "Potassium Phosphate",
      "Ceramide NP",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://sianwholesale.com/cerave-resurfacing-retinol-serum-30ml-3337875829007.html",
      "https://skinsort.com/products/cerave/resurfacing-retinol-serum",
      "https://incidecoder.com/products/cerave-resurfacing-retinol-serum-with-ceramides-niacinamide"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Partial head-of-list from one retailer (Sian Wholesale) cross-referenced against Skinsort/INCIDecoder, which confirm water is first and ethylhexylglycerin is the preservative, but neither independent source gave the full ~33-item list."
    },
    "knownIssues": [
      "Retinol concentration is not disclosed by the manufacturer; third-party estimates of 0.1-0.3% are unverified guesses, not included as fact.",
      "Only about 11 of ~33 total ingredients confirmed; licorice root extract and encapsulated retinol delivery system named in marketing but exact INCI forms uncertain beyond dipotassium glycyrrhizate."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-skin-renewing-nightly-exfoliating-treatment",
    "brand": "CeraVe",
    "name": "Skin Renewing Nightly Exfoliating Treatment",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Glycerin",
      "Isopropyl Myristate",
      "Triethyl Citrate",
      "Citric Acid",
      "Lactic Acid",
      "Phenoxyethanol",
      "Xanthan Gum",
      "Phytosphingosine",
      "Benzoic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/skin-renewing-nightly-exfoliating-treatment",
      "https://www.dermstore.com/cerave-renewing-nightly-exfoliating-anti-aging-treatment-serum-1.7-oz/13906965.html",
      "https://www.ulta.com/p/skin-renewing-nightly-exfoliating-treatment-pimprod2028610"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Ulta and Skinsort both name xanthan gum, phytosphingosine and benzoic acid as functional ingredients; Dermstore confirms the active exfoliant blend, but the full ~29-item ordered list was not captured from any single source."
    },
    "knownIssues": [
      "Only roughly 9 of ~29 total ingredients confirmed; water (almost certainly the first ingredient) was not explicitly re-confirmed in this search pass though it is near-universal for this product type, so it is left out rather than assumed."
    ],
    "note": "Active exfoliants: 5% AHA blend of glycolic acid and lactic acid, per Dermstore product description.",
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-eye-repair-cream",
    "brand": "CeraVe",
    "name": "Eye Repair Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Phytosphingosine",
      "Xanthan Gum",
      "Butylene Glycol",
      "Ethylhexylglycerin",
      "Chrysanthellum Indicum Extract",
      "Niacinamide",
      "Ceramide NP"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ulta.com/p/eye-repair-cream-dark-circles-puffiness-all-skin-types-xlsImpprod6480077",
      "https://skinsort.com/products/cerave/eye-repair-cream/usa",
      "https://www.skincarisma.com/products/cerave/cerave-eye-repair-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Ulta's US product page and Skincarisma both name niacinamide and ceramide NP as part of the formula, but the full ~39-41 ingredient ordered list (which varies by region per Skinsort's France/Australia/US pages) was not captured in full."
    },
    "knownIssues": [
      "Total ingredient count reported inconsistently (39-41) across sources, and France/Australia regional lists differ from the US-tagged list, so cross-region contamination is possible.",
      "Only a handful of ingredients confirmed out of ~40."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-skin-renewing-day-cream-spf-30",
    "brand": "CeraVe",
    "name": "Skin Renewing Day Cream SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Octinoxate 7.5%",
      "Zinc Oxide 10.5%"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cerave.ca/en-ca/skincare/moisturizers/skin-renewing-day-cream",
      "https://well.ca/products/cerave-skin-renewing-day-cream-spf_293868.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active sunscreen filter percentages corroborated between CeraVe Canada's own product page and a Canadian retailer (well.ca); no inactive-ingredient list could be confirmed, and the US formula may differ from the Canadian one."
    },
    "knownIssues": [
      "These active percentages are from the Canadian version; the product is also described (in US retail copy) as containing 'encapsulated retinol' which is not reflected in this active-ingredient list, suggesting the US formula/marketing differs from the Canadian OTC-monograph sunscreen formula.",
      "No inactive ingredients confirmed; total count cited as ~45 by one aggregator but not itemized."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-renewing-sa-lotion",
    "brand": "CeraVe",
    "name": "Renewing SA Lotion",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Paraffinum Liquidum",
      "Behentrimonium Methosulfate",
      "Cetearyl Alcohol",
      "Cetyl Alcohol",
      "Ammonium Lactate",
      "Glyceryl Stearate",
      "Cholesterol",
      "Phytosphingosine",
      "Sodium Hyaluronate",
      "Sodium Lauroyl Lactylate",
      "Disodium EDTA",
      "Triethanolamine",
      "Methylparaben",
      "Propylparaben",
      "Carbomer",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/renewing-sa-lotion",
      "https://skinsort.com/products/cerave/renewing-sa-lotion/canada?view=list",
      "https://www.dermstore.com/p/cerave-sa-renewing-lotion-8-fl.-oz./12901641/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Active ingredient (salicylic acid 3%) corroborated across multiple retailers; the inactive list combines the head of one Skinsort page with the tail of a separate Canadian Skinsort page, which may not actually be the same formula."
    },
    "knownIssues": [
      "Skincarisma tags the product 'Paraben-Free' while its own ingredient list includes methylparaben and propylparaben -- an internal contradiction in that source.",
      "US and Canadian versions may differ; this list is not confirmed as US-specific.",
      "Total ingredient count cited as ~26."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-hydrating-mineral-sunscreen-spf-30-face-sheer-tint",
    "brand": "CeraVe",
    "name": "Hydrating Mineral Sunscreen SPF 30 Face Sheer Tint",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Titanium Dioxide 5.5%",
      "Zinc Oxide 10%",
      "Water",
      "C12-15 Alkyl Benzoate",
      "Isohexadecane",
      "Iron Oxides"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.hannaford.com/groceries/health-beauty/skin-care/cerave-hydrating-mineral-sunscreen-face-sheer-tint-broad-spectrum-spf-30-17-oz-box.html",
      "https://www.heb.com/product-detail/cerave-hydrating-mineral-sunscreen-deep-sheer-tint-broad-spectrum-spf-30/14613511"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active mineral filter percentages for the Sheer Tint variant agree between Hannaford and HEB US retailer listings; the untinted version of this product reportedly uses different percentages (6%/5%), so these are not interchangeable."
    },
    "knownIssues": [
      "An untinted 'Hydrating Mineral Sunscreen SPF 30 Face' variant exists with different active percentages (Titanium Dioxide 6%, Zinc Oxide 5%) -- do not conflate with the Sheer Tint version recorded here.",
      "Full inactive ingredient list beyond the tint-related items not confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-100-mineral-sunscreen-spf-50-body-lotion",
    "brand": "CeraVe",
    "name": "100% Mineral Sunscreen SPF 50 Body Lotion",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "body"
    ],
    "region": "US",
    "ingredients": [
      "Titanium Dioxide 9%",
      "Zinc Oxide 7%",
      "Water",
      "Glycerin",
      "Dimethicone",
      "Styrene/Acrylates Copolymer",
      "Propanediol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.heb.com/product-detail/cerave-hydrating-sunscreen-body-spf-50/2751514",
      "https://togo.foodlion.com/store/food-lion/products/19537677-cerave-sunscreen-hydrating-5-oz"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active mineral filter percentages confirmed by an HEB US retailer listing; a matching percentage pair was also found for the related face version (Hannaford), supporting the figures, while inactive ingredients come from a single, truncated Food Lion listing."
    },
    "knownIssues": [
      "Active percentage confirmation (9%/7%) is explicit for this body product from only one retailer (HEB); the matching Hannaford figures were for the face SPF 50 product, used only as supporting (not direct) corroboration.",
      "Inactive ingredient list is a truncated partial from one source only."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-acne-control-gel",
    "brand": "CeraVe",
    "name": "Acne Control Gel",
    "catalogCategory": "acneTreatment",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Sodium Hydroxide",
      "Glycolic Acid",
      "Lactic Acid",
      "Niacinamide",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP",
      "Carbomer",
      "Cetearyl Alcohol",
      "Chlorphenesin",
      "Disodium EDTA",
      "Hydroxypropyl Guar",
      "Caprylyl Glycol",
      "Xanthan Gum",
      "Phytosphingosine",
      "Benzoic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.heb.com/product-detail/cerave-acne-control-gel/5255504",
      "https://skinsort.com/products/cerave/acne-control-gel",
      "https://www.wegmans.com/shop/product/954732-Acne-Control-Gel-with-AHA-BHA"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active ingredient (salicylic acid 2%) and AHA/BHA combination with ceramides/niacinamide corroborated across HEB, Wegmans and CeraVe's own product description; this entry merges a head-segment list and a tail-segment list from two different sources that may not belong to the exact same formula version."
    },
    "knownIssues": [
      "The two partial inactive-ingredient lists found did not come from the same source and were merged on a best-effort basis; actual ingredient order/completeness is unconfirmed.",
      "CeraVe states its ingredient lists are 'updated regularly' -- check current packaging."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-baby-moisturizing-lotion",
    "brand": "CeraVe",
    "name": "Baby Moisturizing Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "baby-kids",
      "fragrance-free",
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Cetearyl Alcohol",
      "Caprylic/Capric Triglyceride",
      "Dimethicone",
      "Tocopheryl Acetate",
      "Polysorbate 60",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.heb.com/product-detail/cerave-baby-moisturizing-lotion-8-oz/5558001",
      "https://ulta.com/p/baby-moisturizing-lotion-lightweight-moisturizer-sensitive-skin-eczema-prone-skin-pimprod2048030"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A single ingredient-tracking source gives the first several ingredients; Ulta and CeraVe's own marketing corroborate the presence of ceramides, niacinamide, hyaluronic acid and vitamin E by name but not their exact INCI listing or order."
    },
    "knownIssues": [
      "Only a handful of roughly 30 total ingredients confirmed.",
      "Fragrance-free, paraben-free, dye-free and phthalate-free claims are from marketing copy, not an itemized ingredient list."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-healing-ointment",
    "brand": "CeraVe",
    "name": "Healing Ointment",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Petrolatum 46.5%",
      "Dimethicone",
      "Panthenol",
      "Pantolactone",
      "Phytosphingosine",
      "Xanthan Gum",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/cerave-healing-ointment-46-5-petrolatum-skin-protectant-3-oz-prodid-204425",
      "https://www.cerave.ca/en-ca/skincare/ointment/healing-ointment",
      "https://skinsort.com/products/cerave/healing-ointment-old-formulation"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active ingredient (petrolatum 46.5%) is confirmed as a skin-protectant drug fact by CVS's official ingredients page and matches CeraVe's own branding; supporting ingredients (dimethicone, panthenol) are named in CeraVe Canada's marketing copy, but the full INCI order was not confirmed."
    },
    "knownIssues": [
      "Third-party trackers disagree on total ingredient count (18 vs 22) and appear to be tracking different formula versions ('old formulation' vs current), so some listed items (pantolactone, phytosphingosine, xanthan gum, ethylhexylglycerin) may belong to a superseded formula."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-hydrating-hyaluronic-acid-serum",
    "brand": "CeraVe",
    "name": "Hydrating Hyaluronic Acid Serum",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Cetearyl Ethylhexanoate",
      "Dimethicone",
      "Ammonium Polyacryloyldimethyl Taurate",
      "Sodium Hyaluronate",
      "Panthenol",
      "Ceramide NP"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/hydrating-hyaluronic-acid-face-serum",
      "https://skinsort.com/products/cerave/hydrating-hyaluronic-acid-serum/us"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Two Skinsort regional listings agree on the first 5-6 ingredients (water, glycerin, cetearyl ethylhexanoate, dimethicone) but diverge afterward (one lists ammonium polyacryloyldimethyl taurate/ceramide NP, another lists cetearyl alcohol/polyacrylate crosspolymer-6 instead), suggesting regional reformulation."
    },
    "knownIssues": [
      "A longer 24-ingredient Skinsort listing was explicitly flagged by the search results as possibly belonging to a different, similarly-named CeraVe serum, so it was excluded from this entry.",
      "Only the first several ingredients could be corroborated; the full list is unconfirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-sa-body-wash-for-rough-bumpy-skin",
    "brand": "CeraVe",
    "name": "SA Body Wash for Rough & Bumpy Skin",
    "catalogCategory": "exfoliant",
    "tags": [
      "body",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Cocamidopropyl Hydroxysultaine",
      "Glycerin",
      "Ceramide NP",
      "Ceramide EOP",
      "Phytosphingosine",
      "Cholesterol",
      "Sodium Hyaluronate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/sa-body-wash-for-rough-and-bumpy-skin-old-iMPKM0k",
      "https://www.dermstore.com/p/cerave-sa-body-wash-with-salicylic-acid-10-oz/13906952/?rctxt=fbt"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only one aggregator (Skinsort) provided a partial ordered ingredient list (8 of ~21 items); Dermstore and CeraVe's own marketing corroborate the key actives (salicylic acid, ceramides, hyaluronic acid, niacinamide) by name but not the full INCI order."
    },
    "knownIssues": [
      "Salicylic acid concentration not found/confirmed in this pass.",
      "Roughly 13 of 21 total listed ingredients remain unconfirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-itch-relief-moisturizing-lotion",
    "brand": "CeraVe",
    "name": "Itch Relief Moisturizing Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Pramoxine Hydrochloride 1%",
      "Water",
      "Isopropyl Myristate",
      "Glycerin",
      "Niacinamide",
      "Dimethicone",
      "Allantoin",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cerave.ca/en-ca/skincare/moisturizers/itch-relief-moisturizing-lotion",
      "https://www.hannaford.com/groceries/health-beauty/first-aid/skin-remedies/cerave-itch-relief-moisturizing-lotion-pump-dry-skin-8-oz-btl.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Active ingredient (pramoxine hydrochloride 1%) corroborated between CeraVe Canada's product page and a US grocery retailer (Hannaford); the Hannaford listing's inactive ingredients were used, though a separate Skinsort listing and a Walmart listing for a related cream version both show additional/different items."
    },
    "knownIssues": [
      "Skinsort lists additional ingredients (polyglyceryl-3 diisostearate, ethylhexylglycerin) not present in the Hannaford list used here.",
      "A related 'Itch Relief Moisturizing Cream' product has a reportedly different inactive ingredient list; do not conflate the lotion and cream versions."
    ],
    "note": "National Eczema Association accepted, per retailer marketing copy.",
    "verifiedDate": null
  },
  {
    "id": "cat-cerave-baby-wash-shampoo",
    "brand": "CeraVe",
    "name": "Baby Wash & Shampoo",
    "catalogCategory": "cleanser",
    "tags": [
      "baby-kids",
      "fragrance-free",
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Coco-Betaine",
      "Disodium Cocoyl Glutamate",
      "Phytosphingosine",
      "Xanthan Gum",
      "Benzoic Acid",
      "Sodium Hyaluronate",
      "Cholesterol",
      "Disodium EDTA",
      "Tocopheryl Acetate",
      "Capryloyl Glycine",
      "Caprylyl Glycol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cerave/baby-wash-and-shampoo",
      "https://beautymasterlist.com/products/cerave/baby-wash-shampoo/",
      "https://www.ulta.com/p/baby-wash-shampoo-pimprod2048031"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Skinsort and Beautymasterlist agree on most of a 12-item partial list (out of a reported 23 total), with Ulta corroborating the soap-free/tear-free/paraben-free/dye-free/phthalate-free marketing claims; one source adds 'lactylate' which the others do not list."
    },
    "knownIssues": [
      "Full 23-ingredient list not confirmed; roughly half the formula is missing from this entry.",
      "One source includes an ingredient ('lactylate') not present in the other two, unresolved discrepancy."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-gentle-skin-cleanser",
    "brand": "Cetaphil",
    "name": "Gentle Skin Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Cetyl Alcohol",
      "Propylene Glycol",
      "Sodium Cocoyl Isethionate",
      "Glycerin",
      "Niacinamide",
      "Panthenol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://dermfnd.org/p/cetaphil-gentle-skin-cleanser/",
      "https://www.skincarisma.com/products/cetaphil/gentle-skin-cleanser/ingredient_list",
      "https://chemistscorner.com/?p=15890"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "DermFND and Skincarisma both report the current reformulated version has about 10 ingredients (down from an older ~18-20 ingredient paraben-containing formula described by Chemist's Corner), and both newer sources agree niacinamide and panthenol were added, but neither gave a complete ordered list in the search snippets."
    },
    "knownIssues": [
      "This product has been reformulated: an older US/UK formula contained sodium lauryl sulfate and three parabens (methylparaben, propylparaben, butylparaben) per Chemist's Corner and a UK pharmacy listing; the current formula (recorded here) reportedly removed all parabens and SLS and added niacinamide/panthenol. Which formula is on shelves may vary by remaining old stock/region.",
      "Full current 10-ingredient list not confirmed; only 7 items found by name."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-daily-facial-cleanser",
    "brand": "Cetaphil",
    "name": "Daily Facial Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin",
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Cocamidopropyl Betaine",
      "Disodium Laureth Sulfosuccinate",
      "Sodium Cocoamphoacetate",
      "Panthenol",
      "Niacinamide",
      "Pantolactone",
      "Acrylates/C10-30 Alkyl Acrylate Crosspolymer",
      "Sodium Benzoate",
      "Fragrance",
      "Sodium Chloride",
      "Citric Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/cetaphil-daily-facial-cleanser-for-sensitive-combination-to-oily-skin-16-oz-prodid-1016716",
      "https://skinsort.com/products/cetaphil/daily-facial-cleanser/us?view=list"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "CVS's official US ingredient panel for the 16oz bottle lists exactly 13 ingredients, matching Skinsort's independently reported US ingredient count of 13 for the same product."
    },
    "knownIssues": [
      "CVS's listing names the fragrance ingredient as 'masking fragrance' even though a separate fragrance-free variant of this cleanser also exists -- this entry is for the standard (non-fragrance-free) version.",
      "Regional versions (e.g. Italy, India per Skinsort) report different ingredient counts (18), so this list is US-specific only."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-oily-skin-cleanser",
    "brand": "Cetaphil",
    "name": "Oily Skin Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Sodium Chloride",
      "Citric Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.skincarisma.com/products/cetaphil/oily-skin-cleanser/ingredient_list",
      "https://incidecoder.com/products/cetaphil-oily-skin-cleanser-2"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only a handful of the reported 18 total ingredients were visible in the search snippets from Skincarisma and INCIDecoder; most of the formula is unconfirmed."
    },
    "knownIssues": [
      "This search could not confirm whether the standard US 'Oily Skin Cleanser' contains salicylic acid -- it appears to be a surfactant-based cleanser without an acid exfoliant, distinct from Cetaphil's separately-named salicylic-acid products (Gentle Exfoliating SA Cleanser, Gentle Salicylic Acid Cleanser, Gentle Clear Clarifying Acne Cream Cleanser).",
      "Only 4 of ~18 ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-gentle-exfoliating-sa-cleanser",
    "brand": "Cetaphil",
    "name": "Gentle Exfoliating SA Cleanser",
    "catalogCategory": "exfoliant",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Confirmed as a real, currently-sold Cetaphil SKU (sold at ShopRite and other US retailers) containing salicylic acid, but no usable ingredient list was found via available sources during this research pass.",
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-gentle-cleansing-bar",
    "brand": "Cetaphil",
    "name": "Gentle Cleansing Bar",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "body"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Stearic Acid",
      "Sodium Tallowate",
      "Sodium Cocoate",
      "Sodium Stearate",
      "Sodium Isethionate",
      "Sodium Cocoyl Isethionate",
      "Sodium Palm Kernelate",
      "Pentasodium Pentetate",
      "Tetrasodium Etidronate",
      "Parfum",
      "Petrolatum",
      "Sodium Ferrocyanide",
      "Sodium Isostearoyl Lactylate",
      "Sucrose Cocoate",
      "Titanium Dioxide"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cetaphil.ca/product/cetaphil-gentle-cleansing-bar",
      "https://skinsort.com/products/cetaphil/gentle-cleansing-bar",
      "https://www.acne.org/reviews/gentle-cleansing-bar-reviews-7"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "This list merges Cetaphil Canada's own (likely alphabetically-ordered) ingredient listing with a separately-reported Skinsort list; both independently include sodium isethionate, pentasodium pentetate and tetrasodium etidronate, supporting the overlap, but the merge means the true single-formula order/completeness is not confirmed."
    },
    "knownIssues": [
      "Merged from two differently-ordered regional sources (Canada official page + Skinsort/Acne.org US-style listing); treat the combined list as approximate, not a verified single-formula panel.",
      "Contains fragrance (Parfum), despite some retailer marketing describing the line as gentle/mild rather than explicitly fragrance-free."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-pro-oil-removing-foam-wash",
    "brand": "Cetaphil",
    "name": "PRO Oil Removing Foam Wash",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Zinc Coceth Sulfate",
      "Glycerin",
      "PEG-75",
      "Dipotassium Glycyrrhizate",
      "Zinc Gluconate",
      "PEG-200 Hydrogenated Glyceryl Palmate",
      "PEG-40 Hydrogenated Castor Oil",
      "PEG-7 Glyceryl Cocoate",
      "Sodium Benzoate",
      "Fragrance",
      "Disodium EDTA"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinpluspharmacy.com.au/a/s/products/cetaphil-pro-derma-control-oil-removing-foam-wash-236ml",
      "https://www.skincarisma.com/products/cetaphil/oil-removing-foam-wash",
      "https://skinsignal.com/products/cetaphil-pro-dermacontrol-oil-removing-foam-wash"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An Australian retailer's full 12-item ingredient list matches the independently-reported 12-ingredient total count from both Skincarisma and Skinsignal, suggesting this is a genuinely complete panel, though it is for the Australian/'PRO Derma Control' regional naming rather than confirmed US packaging."
    },
    "knownIssues": [
      "Sold under slightly different names by region (PRO Oil Removing Foam Wash in the US vs PRO Derma Control Oil Removing Foam Wash in Australia) -- assumed to be the same formula based on matching ingredient counts, but this is not certain.",
      "Product is marketed by some retailers as fragrance-free despite listing 'Fragrance' (masking fragrance) as an ingredient; a Target Q&A flagged this same contradiction with no official resolution found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-moisturizing-lotion",
    "brand": "Cetaphil",
    "name": "Moisturizing Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Hydrogenated Polyisobutene",
      "Cetearyl Alcohol",
      "Persea Gratissima (Avocado) Oil",
      "Acrylates/C10-30 Alkyl Acrylate Crosspolymer",
      "Benzyl Alcohol",
      "Caprylyl Glycol",
      "Ceteareth-20",
      "Citric Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.mypharmacy.co.uk/cetaphil-moisturising-lotion",
      "https://lookfantastic.se/cetaphil-moisturising-lotion-473ml/13810033.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A UK pharmacy ingredient listing and a Scandinavian retailer's marketing both describe the same avocado-oil-based formula, but the list is truncated and a separate Greek retailer listing shows a different oil (macadamia) and additional ingredients, suggesting regional variation."
    },
    "knownIssues": [
      "A Greece-market listing substitutes macadamia oil for avocado oil and adds dimethicone/benzaldehyde/tocopheryl acetate -- likely a different regional formula version, not merged into this entry.",
      "List is cut off after 10 items; a Canadian Skinsort listing reports 16 total ingredients including niacinamide and vitamin E not confirmed here.",
      "US-specific formula not separately confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-moisturizing-cream",
    "brand": "Cetaphil",
    "name": "Moisturizing Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Petrolatum",
      "Dicaprylyl Ether",
      "Dimethicone",
      "Glyceryl Stearate",
      "Cetyl Alcohol",
      "Helianthus Annuus (Sunflower) Seed Oil",
      "PEG-30 Stearate",
      "Panthenol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cetaphil/moisturising-cream-old-formulation",
      "https://www.hannaford.com/groceries/product/cetaphil-moisturizing-cream-16-oz-jar/320647"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A Skinsort listing (flagged by the site itself as an 'old formulation') gives the first 10 ingredients; a US grocery retailer (Hannaford) confirms the product is currently sold in a 16oz jar but its own ingredient panel was not captured in the search snippet."
    },
    "knownIssues": [
      "Skinsort explicitly labels this ingredient list as an 'old formulation'; the current retail formula may differ, possibly resembling the separately-tracked 'Moisturizing Cream Ultimate with Prebiotic Aloe' line instead.",
      "Only 10 of an unknown total number of ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-moisturizing-cream-ultimate-with-prebiotic-aloe",
    "brand": "Cetaphil",
    "name": "Moisturizing Cream Ultimate with Prebiotic Aloe",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Phenoxyethanol",
      "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
      "Propylene Glycol",
      "Carbomer",
      "Aloe Barbadensis Leaf Juice Powder",
      "Tocopherol",
      "BHT"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cetaphil/moisturizing-cream-ultimate-with-prebiotic-aloe",
      "https://www.amcal.com.au/shop/product/mmc-o100004749/cetaphil-moisturising-cream-550g/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Skinsort reports 21 total ingredients for this specific prebiotic-aloe line and names several by category; an Australian retailer's marketing corroborates the sweet almond oil and vitamin E content, but the full ordered list was not captured."
    },
    "knownIssues": [
      "Only 7 of 21 total ingredients confirmed.",
      "Water (almost certainly present as the base) was not explicitly re-confirmed in this search pass and is omitted rather than assumed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cetaphil-rich-hydrating-night-cream",
    "brand": "Cetaphil",
    "name": "Rich Hydrating Night Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Hydrogenated Polydecene",
      "Caprylic/Capric Triglyceride",
      "Dimethicone",
      "Glycerin",
      "Butylene Glycol",
      "Cetearyl Olivate",
      "Sorbitan Olivate",
      "Cyclopentasiloxane",
      "Marrubium Vulgare Extract",
      "Hydrolyzed Hyaluronic Acid",
      "Olea Europaea (Olive) Fruit Oil"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://hannaford.com/groceries/health-beauty/skin-care/facial-moisturizer/cetaphil-rich-hydrating-night-cream-17-oz-pkg.html",
      "https://giantfoodstores.com/groceries/health-beauty/skin-care/facial-moisturizer/cetaphil-rich-hydrating-night-cream-17-oz-pkg.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Head of the ingredient list (12 items) corroborated directly from a US grocery retailer's (Hannaford) product panel for the 1.7oz package; a sibling retailer (Giant Food, same parent company) lists the identical product but its own ingredient text was not captured separately."
    },
    "knownIssues": [
      "List is truncated after 12 items; total count unknown.",
      "A separate claim that a related 'Rich Night Cream' product contains AHA, retinoid and vitamin C (35 ingredients total) could not be corroborated and may reflect confusion with a different Cetaphil product -- not included here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-toleriane-hydrating-gentle-cleanser",
    "brand": "La Roche-Posay",
    "name": "Toleriane Hydrating Gentle Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Niacinamide",
      "Glycerin",
      "Propylene Glycol",
      "Ceramide NP",
      "Polysorbate 60",
      "Ammonium Polyacryloyldimethyl Taurate",
      "Panthenol",
      "Pentylene Glycol",
      "Trisodium Ethylenediamine Disuccinate",
      "Ethylhexylglycerin",
      "Tocopherol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/la-roche-posay/toleriane-hydrating-gentle-cleanser-5721ec71-0783-4a2d-b900-79559d021355/us",
      "https://incidecoder.com/products/la-roche-posay-toleriane-hydrating-gentle-cleanser",
      "https://www.skincarisma.com/products/la-roche-posay/toleriane-hydrating-gentle-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Cross-checked across Skinsort (US and EU listings), INCIDecoder, and Skincarisma; none gave a single complete ordered list."
    },
    "knownIssues": [
      "Sources disagree on total ingredient count (13-19) and on whether US vs EU formula differs slightly; no site reproduced a complete ordered INCI list in search snippets."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-toleriane-double-repair-face-moisturizer",
    "brand": "La Roche-Posay",
    "name": "Toleriane Double Repair Face Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Squalane",
      "Glycerin",
      "Niacinamide",
      "Ceramide-3 (La Roche-Posay listing calls out Prebiotic Thermal Water, Ceramide-3, Niacinamide, Glycerin as key actives)"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/la-roche-posay-toleriane-double-repair-face-moisturizer-prebiotic-skincare",
      "https://skinsort.com/products/la-roche-posay/toleriane-double-repair-face-moisturizer",
      "https://www.cvs.com/shop/ingredients/la-roche-posay-toleriane-double-repair-face-moisturizer-uv-broad-spectrum-spf-30-prodid-609116"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Cross-checked CVS ingredient listing, Skinsort and INCIDecoder; only water, squalane and the headline actives were consistently placed, no full ordered list found."
    },
    "knownIssues": [
      "This is the base (non-SPF) formula. A separate SPF 30 version and a 'Matte' version for oily/combination skin exist and contain different ingredients (the SPF version adds avobenzone/homosalate/octisalate/octocrylene) - do not merge those formulas with this entry.",
      "Ingredient count reported inconsistently across sources (17-24)."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-effaclar-purifying-foaming-gel",
    "brand": "La Roche-Posay",
    "name": "Effaclar Purifying Foaming Gel",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Sodium Laureth Sulfate",
      "PEG-8",
      "Coco-Betaine",
      "Hexylene Glycol",
      "Sodium Chloride",
      "PEG-120 Methyl Glucose Dioleate",
      "Zinc PCA",
      "Sodium Hydroxide",
      "Citric Acid",
      "Sodium Benzoate",
      "Phenoxyethanol",
      "Caprylyl Glycol",
      "Parfum (Fragrance)"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsignal.com/products/la-roche-posay-effaclar-purifying-foaming-gel",
      "https://incidecoder.com/products/la-roche-posay-effaclar-purifying-foaming-gel",
      "https://www.skincarisma.com/products/la-roche-posay/la-roche-posay-effaclar-purifying-foaming-gel/ingredient_list"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "One source presented a full INCI formula for the 200ml version; a second source (Skinsort, for the +M regional variant) listed ~20 ingredients including several not in the first list."
    },
    "knownIssues": [
      "A '+M' regional/reformulated variant (listed on Skinsort) adds ingredients such as Punica Granatum Pericarp Extract, Trisodium Ethylenediamine Disuccinate, Maltodextrin, Pentylene Glycol and Tocopherol not present in the shorter list; unclear which is the current US formula."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-effaclar-duo-dual-action-acne-treatment",
    "brand": "La Roche-Posay",
    "name": "Effaclar Duo Dual Action Acne Treatment",
    "catalogCategory": "acneTreatment",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Benzoyl Peroxide (5.5%)",
      "Water",
      "Isostearyl Alcohol",
      "Glycerin",
      "Pentylene Glycol",
      "Silica",
      "Carbomer",
      "Capryloyl Salicylic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.skincarisma.com/products/la-roche-posay/la-roche-posay-effaclar-duo-dual-action-acne-treatment",
      "https://incidecoder.com/products/la-roche-posay-effaclar-duo-m-anti-breakout-corrective-gel-moisturiser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only one lower-quality aggregator presented an ordered partial list; a Skincarisma page for the generic Effaclar Duo (unclear if same SKU) separately named benzoyl peroxide and capryloyl salicylic acid as actives, partially corroborating."
    },
    "knownIssues": [
      "The 'Dual Action' US acne-treatment SKU (benzoyl peroxide based) is a different formula from the EU 'Effaclar Duo(+)' moisturizer line (adapalene/LHA based, no benzoyl peroxide); search results frequently conflate the two.",
      "Full ordered ingredient list not found from a high-confidence source."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-anthelios-melt-in-milk-sunscreen-spf-60",
    "brand": "La Roche-Posay",
    "name": "Anthelios Melt-In Milk Sunscreen SPF 60",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone 3%",
      "Homosalate 10%",
      "Octisalate 5%",
      "Octocrylene 7%",
      "Water",
      "Styrene/Acrylates Copolymer",
      "Dimethicone",
      "Polymethylsilsesquioxane",
      "Glycerin",
      "Alcohol Denat.",
      "Caprylyl Methicone",
      "Trisiloxane"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/la-roche-posay-anthelios-melt-in-milk-sunscreen-lotion-spf-60-prodid-1016921",
      "https://theskincarelibrary.com/collections/vitamin-e/products/la-roche-posay-anthelios-melt-in-milk-sunscreen-150ml",
      "https://skinsort.com/products/la-roche-posay/anthelios-melt-in-milk-sunscreen-spf-60"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "CVS and Skin Care Library both report the same active filter set (avobenzone/homosalate/octisalate/octocrylene) for the US version; inactive list only partially overlaps between sources."
    },
    "knownIssues": [
      "This is the US chemical-filter formula; La Roche-Posay EU Anthelios formulas commonly use different/additional UV filters (e.g. Mexoryl, Tinosorb) not legal in the US - treat any EU-labeled version as a separate formula.",
      "One low-quality OTC label aggregator listed oxybenzone as an active, which conflicts with retailer claims the product is oxybenzone-free; likely a data error on that one source."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-anthelios-ultra-light-sunscreen-fluid-spf-60",
    "brand": "La Roche-Posay",
    "name": "Anthelios Ultra Light Sunscreen Fluid SPF 60",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone (Butyl Methoxydibenzoylmethane) 3%",
      "Alcohol Denat.",
      "EDTA",
      "Cassia Alata Leaf Extract",
      "Propylene Carbonate",
      "Sodium Dodecylbenzenesulfonate",
      "Tocopherol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/la-roche-posay-anthelios-ultra-light-sunscreen-fluid-spf-60",
      "https://ulta.com/p/anthelios-light-fluid-face-sunscreen-spf-60-xlsImpprod3840055",
      "https://www.cvs.com/shop/ingredients/la-roche-posay-anthelios-60-face-ultra-light-sunscreen-fluid-1-7-oz-prodid-1016928"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "INCIDecoder and a Beauty Master List style aggregator agree avobenzone 3% is present; Ulta's product page gave only a short unordered fragment of the inactive list, no full list found."
    },
    "knownIssues": [
      "Sources disagree on total ingredient count (29 vs 32).",
      "One OTC label aggregator result referenced oxybenzone/octinoxate, but that appears to describe a different Anthelios Ultra Light spray SKU, not this fluid - excluded from this entry.",
      "One retailer listed SPF as '50+' rather than 60, possibly a mislabeled product page."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-cicaplast-baume-b5",
    "brand": "La Roche-Posay",
    "name": "Cicaplast Baume B5",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Hydrogenated Polyisobutene",
      "Dimethicone",
      "Glycerin",
      "Butyrospermum Parkii (Shea) Butter",
      "Panthenol",
      "Aluminum Starch Octenylsuccinate",
      "Butylene Glycol",
      "Propanediol",
      "Cetyl Alcohol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://well.ca/products/la-roche-posay-cicaplast-baume-b5_281446.html?cat=5239",
      "https://skinsort.com/products/la-roche-posay/cicaplast-baume-b5-old-VGsY3P0",
      "https://incidecoder.com/products/la-roche-posay-cicaplast-baume-b5-7"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A Canadian retailer listing and an older Skinsort listing broadly agree on the first ten ingredients; full list not found in either."
    },
    "knownIssues": [
      "Product has several versions (original B5, reformulated 'B5+', and an SPF50 variant) with different ingredients; this entry reflects the base balm, not B5+ or the SPF variant.",
      "Retailer/marketing copy cites 5% panthenol and madecassoside as actives, but 'madecassoside' did not appear in the retailer INCI fragment found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-toleriane-ultra-fluide",
    "brand": "La Roche-Posay",
    "name": "Toleriane Ultra Fluide",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Glycerin",
      "Squalane",
      "Propanediol",
      "Butylene Glycol",
      "Butyrospermum Parkii (Shea) Butter",
      "Pentylene Glycol",
      "Dimethicone",
      "Polymethylsilsesquioxane",
      "Polysorbate 20",
      "Glyceryl Acrylate/Acrylic Acid Copolymer",
      "Dimethiconol",
      "Octenylsuccinate Starch",
      "Ammonium Polyacryloyldimethyl Taurate",
      "Disodium EDTA",
      "Acetyl Dipeptide-1 Cetyl Ester"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/la-roche-posay/toleriane-ultra-fluide",
      "https://www.cosmeticsandtoiletries.com/formulating/function/antiirritant/Read-the-Label-Toleriane-Ultra-Fluid-480865261.html",
      "https://incidecoder.com/products/la-roche-posay-toleriane-ultra-light"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Skinsort (16 ingredients) and a Cosmetics & Toiletries 'Read the Label' industry article (citing the brand's own site) overlap substantially on ordering and content; merged here but order not independently re-verified from packaging."
    },
    "knownIssues": [
      "Marketed as fragrance-free/preservative-minimal; this was not independently confirmed from the INCI list alone."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-hyalu-b5-serum",
    "brand": "La Roche-Posay",
    "name": "Hyalu B5 Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Alcohol Denat.",
      "Propylene Glycol",
      "Panthenol",
      "Pentylene Glycol",
      "Dimethicone",
      "Madecassoside",
      "Sodium Hyaluronate",
      "Hydrolyzed Hyaluronic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.nowafarmacja.pl/la-roche-posay-hyalu-b5-serum-ujedrniajaco-regenerujace-30-ml",
      "https://well.ca/products/la-roche-posay-hyalu-b5-serum_314744.html?cat=4354",
      "https://incidecoder.com/products/la-roche-posay-hyalu-b5-suractivated-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A Polish pharmacy retailer listing and a Canadian retailer listing for the 'Concentrate' name both open with water/glycerin/alcohol denat./panthenol and name sodium hyaluronate later; neither list is complete."
    },
    "knownIssues": [
      "The 'Hyalu B5' line includes several distinct SKUs (standard serum, 'Pure Hyaluronic Acid Serum', 'Eye Serum') with different ingredient lists; results sometimes conflated these - this entry is for the standard 30/50ml face serum only."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-pure-vitamin-c10-serum",
    "brand": "La Roche-Posay",
    "name": "Pure Vitamin C10 Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Ascorbic Acid (Vitamin C, 10%)",
      "Cyclohexasiloxane",
      "Glycerin",
      "Caprylyl Glycol",
      "Disodium EDTA",
      "BHT",
      "Laureth-7",
      "Parfum (Fragrance)"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/la-roche-posay/10-pure-vitamin-c-serum",
      "https://beautymasterlist.com/products/la-roche-posay/10-pure-vitamin-c-serum/",
      "https://whatsinmyjar.com/product/la-roche-posay-pure-vitamin-c10-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Skinsort and Beauty Master List agree on the same ingredient-list tail (caprylyl glycol, disodium EDTA, BHT, laureth-7, parfum) out of a reported 29 total ingredients; the middle portion of the list was not captured."
    },
    "knownIssues": [
      "Marketing copy also mentions salicylic acid and hyaluronic acid as actives, and a proprietary 'Neurosensine' ingredient, which may appear under an unidentified INCI name not captured here.",
      "Contains fragrance per the ingredient list despite some marketing framing as suitable for sensitive skin."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-lipikar-balm-ap",
    "brand": "La Roche-Posay",
    "name": "Lipikar Balm AP+",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "body"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Shea Butter (Butyrospermum Parkii)",
      "Glycerin",
      "Niacinamide",
      "Cyclohexasiloxane",
      "Mineral Oil",
      "Cetearyl Alcohol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://thefrenchcosmeticsclub.com/products/la-roche-posay-lipikar-ap-relipidizing-anti-irritation-body-balm-200ml",
      "https://skinsort.com/products/la-roche-posay/lipikar-balm-ap-intense-repair-moisturizing-body-face-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A French retailer's product page and Skinsort both open the INCI list with the same first seven ingredients (water, shea butter, glycerin, niacinamide, cyclohexasiloxane, mineral oil, cetearyl alcohol); full list (reported as ~23 ingredients) not found."
    },
    "knownIssues": [
      "Search results frequently returned the related but distinct 'Lipikar Baume AP+M' product (a reformulated/different-market SKU with ~26 ingredients including dimethicone, xanthan gum, tocopherol) - not merged into this entry since it may be a different formula."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-effaclar-adapalene-gel-0-1",
    "brand": "La Roche-Posay",
    "name": "Effaclar Adapalene Gel 0.1%",
    "catalogCategory": "retinoid",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Adapalene USP 0.1%",
      "Carbomer Homopolymer",
      "Edetate Disodium",
      "Methylparaben",
      "Poloxamer 182",
      "Propylene Glycol",
      "Purified Water",
      "Sodium Hydroxide"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/la-roche-posay-effaclar-adapalene-gel-0-1-topical-retinoid-acne-treatment-prodid-348025",
      "https://store.mayoclinic.com/la-roche-posay-effaclar-adapalene-gel-01-acne-treatment-45-grams.html",
      "https://skinsort.com/products/la-roche-posay/effaclar-adapalene-gel-0-1-topical-retinoid-for-acne"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "CVS and Mayo Clinic Store's OTC drug-facts ingredient panels independently list the identical 8-ingredient formula (1 active + 7 inactive); Skinsort's ingredient count (8) matches."
    },
    "knownIssues": [
      "One Skinsignal page variant listed an unrelated ingredient ('magnesium carboxymethyl beta-glucan') as second in the list, which looks like a data error and was excluded."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-anthelios-mineral-sunscreen-spf-50-gentle-lotion",
    "brand": "La Roche-Posay",
    "name": "Anthelios Mineral Sunscreen SPF 50 (Gentle Lotion)",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Titanium Dioxide 5%",
      "Zinc Oxide 15%",
      "Water",
      "C12-15 Alkyl Benzoate",
      "Isohexadecane",
      "Isononyl Isononanoate",
      "Dicaprylyl Ether",
      "PEG-30 Dipolyhydroxystearate",
      "Polyglyceryl-4 Isostearate",
      "Dicaprylyl Carbonate",
      "Maltodextrin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://pasteurpharmacy.com/products/la-roche-posay-anthelios-50-mineral-sunscreen-gentle-lotion-4oz",
      "https://www.cvs.com/shop/ingredients/la-roche-posay-anthelios-body-and-face-mineral-sunscreen-lotion-spf-50-prodid-2220538",
      "https://skinsort.com/products/la-roche-posay/anthelios-spf-50-gentle-lotion-mineral-sunscreen"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A retailer listing for the 'Gentle Lotion' SKU (5% TiO2 / 15% ZnO) was cross-referenced against CVS's ingredients page for the same body-and-face mineral lotion; list is cut off before completion in both."
    },
    "knownIssues": [
      "La Roche-Posay sells multiple distinct Anthelios Mineral SPF 50 SKUs (Ultra-Light Fluid with 6% TiO2/5% ZnO, Tinted Ultra-Fluid with ~11% TiO2, and the Gentle Lotion with 5% TiO2/15% ZnO) with different active concentrations and inactive ingredients; this entry is specifically the 'Gentle Lotion' body-and-face version - do not treat as interchangeable with the tinted or ultra-light fluid SKUs."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-toleriane-sensitive-prebiotic-moisturizer-fluide",
    "brand": "La Roche-Posay",
    "name": "Toleriane Sensitive Prebiotic Moisturizer (Fluide)",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycerin",
      "Squalane",
      "Dimethicone",
      "Corn Starch",
      "Niacinamide"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinvisor.vercel.app/en/products/la-roche-posay-toleriane-sensitive",
      "https://incidecoder.com/products/la-roche-posay-toleriane-sensitive-prebiotic-moisturiser",
      "https://skinsignal.com/products/la-roche-posay-toleriane-sensitive-prebiotic-moisturiser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "An Australian retailer-sourced ingredient fragment and Skinvisor's listing (sourced from Open Beauty Facts) agree on the opening ingredients (water, glycerin, squalane, dimethicone, corn starch, niacinamide); full list not found."
    },
    "knownIssues": [
      "There is a separate 'Riche' (richer cream) variant with a different opening ingredient list (isocetyl stearate, coco-caprylate/caprate, shea butter) for drier skin - not merged with this (lighter 'Fluide') entry.",
      "Sources disagree on ingredient count (17 vs 23)."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-effaclar-mat",
    "brand": "La Roche-Posay",
    "name": "Effaclar Mat",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycerin",
      "Dimethicone",
      "Isocetyl Stearate",
      "Alcohol Denat.",
      "Silica",
      "Capryloyl Salicylic Acid",
      "Salicylic Acid",
      "Parfum (Fragrance)"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://lasante.net/espace-para/beaute-et-soins/beaute-soins-visage/acne-et-imperfections/la-roche-posay-effaclar-mat-40-ml.html",
      "https://www.ferwer.com/product/18180",
      "https://skinsort.com/products/la-roche-posay/effaclar-mat-daily-face-moisturizer-for-oily-skin"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A French retailer page and a second retailer (Ferwer) both open the INCI formula in the same order (water, glycerin, dimethicone, isocetyl stearate, alcohol denat...) and both reference the 'Sebulyse' sebum-regulating complex and LHA (capryloyl salicylic acid)."
    },
    "knownIssues": [
      "Contains fragrance per the retailer list despite being marketed for reactive/oily skin.",
      "Full tail of the ingredient list (preservatives, minor actives) not captured from either source."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-redermic-r-face-treatment",
    "brand": "La Roche-Posay",
    "name": "Redermic R (Face Treatment)",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Isostearyl Neopentanoate",
      "Glycerin",
      "Propylene Glycol",
      "Retinyl Palmitate",
      "Tocopherol",
      "Phenoxyethanol",
      "Parfum (Fragrance)"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.nowafarmacja.pl/la-roche-redermic-r-krem-30-ml",
      "https://incidecoder.com/products/la-roche-posay-redermic-retinol",
      "https://dermfnd.org/p/la-roche-posay-redermic-r-retinol-cream/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only a single Polish pharmacy retailer listing provided an ordered partial ingredient list for the standard face cream; other sources covered related but distinct SKUs in the Redermic R line."
    },
    "knownIssues": [
      "Retailer marketing copy conflicts on retinoid strength: one source says '0.3% retinol', another says '0.1% pure retinol' - and the retailer ingredient list actually names Retinyl Palmitate (a retinol ester), not free retinol, so the strength claims may not match the actual INCI form.",
      "Separate Redermic R Eye Cream and Redermic R Intensive Concentrate SKUs exist with materially different ingredient lists (containing sodium hyaluronate, retinol, retinyl linoleate, adenosine) - not merged into this entry."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-rosaliac-ar-intense",
    "brand": "La Roche-Posay",
    "name": "Rosaliac AR Intense",
    "catalogCategory": "serum",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycerin",
      "Isostearyl Neopentanoate",
      "Butylene Glycol",
      "Pentylene Glycol",
      "Polysorbate 20",
      "Tambourissa Trichophylla Leaf Extract",
      "Glyceryl Acrylate/Acrylic Acid Copolymer",
      "Dimethicone",
      "Dimethiconol",
      "Disodium EDTA",
      "Acetyl Dipeptide-1 Cetyl Ester"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://thefrenchcosmeticsclub.com/collections/all/products/la-roche-posay-rosaliac-ar-intense-40ml",
      "https://medipharm.ie/products/la-roche-posay-rosaliac-ar-intense-anti-redness-intensive-care-40ml",
      "https://whatsinmyjar.com/product/la-roche-posay-rosaliac-ar-intense-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A French retailer's partial INCI list and an Irish pharmacy's ingredient fragment both start with the same first 6-7 ingredients; neither source completed the list."
    },
    "knownIssues": [
      "Skinsort lists this product as discontinued in at least one region, so current availability should be double-checked against La Roche-Posay's current catalog.",
      "Marketing names 'Ambophenol' and 'Neurosensine' as key actives, which are proprietary complex names, not INCI terms, and could not be matched to specific listed ingredients."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-effaclar-clarifying-solution-acne-toner",
    "brand": "La Roche-Posay",
    "name": "Effaclar Clarifying Solution (Acne Toner)",
    "catalogCategory": "toner",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Alcohol Denat.",
      "Propanediol",
      "Glycolic Acid",
      "Sodium Hydroxide",
      "Capryloyl Glycine",
      "Phenoxyethanol",
      "Benzyl Alcohol",
      "PPG-26-Buteth-26",
      "PEG-40 Hydrogenated Castor Oil",
      "Menthol",
      "Tremella Fuciformis Polysaccharide",
      "Butylene Glycol",
      "Salicylic Acid (0.5%)"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/la-roche-posay-effaclar-clarifying-solution/11429030.html?rctxt=fbt",
      "https://heb.com/product-detail/la-roche-posay-effaclar-clarifying-solution/8153550",
      "https://skinsort.com/products/la-roche-posay/effaclar-face-toner-clarifying-solution-with-medicated-formula"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Dermstore's listing (the most complete found) and HEB's active-ingredient listing (0.5% salicylic acid) agree; Skinsort's independent ingredient breakdown additionally names salicylic acid, Ophiopogon Japonicus Root Extract and Scutellaria Baicalensis Root Extract not present in the Dermstore list."
    },
    "knownIssues": [
      "Ingredient counts differ across sources (16 vs 18), and Skinsort's extra botanical extracts were not corroborated elsewhere, so may belong to a different regional formula - excluded from the main list above pending confirmation."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-lipikar-wash-ap",
    "brand": "La Roche-Posay",
    "name": "Lipikar Wash AP+",
    "catalogCategory": "cleanser",
    "tags": [
      "for-dry-skin",
      "body",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Sodium Laureth Sulfate",
      "Coco-Betaine",
      "Polysorbate 20",
      "Citric Acid",
      "Niacinamide",
      "Shea Butter (Butyrospermum Parkii)",
      "Glycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/la-roche-posay-lipikar-wash-ap-body-face-wash-pump-for-extra-dry-skin-13-5-oz-prodid-645663",
      "https://www.skincarisma.com/products/lipikar-wash-ap-gentle-foaming-moisturizing-wash",
      "https://skinsort.com/products/la-roche-posay/lipikar-syndet-ap-ultra-gentle-cream-wash"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "CVS's active/inactive split for the 13.5oz pump SKU names niacinamide, shea butter and glycerin as actives alongside sodium laureth sulfate and coco-betaine as cleansing agents, partially corroborated by a related Skincarisma listing (~21 ingredients) under a similar name."
    },
    "knownIssues": [
      "Multiple similarly-named Lipikar wash SKUs exist (Wash AP+, Syndet AP+ Cream Wash, AP+ Gentle Foaming Cleansing Oil) that may have different formulas; search results sometimes conflated these.",
      "Full ordered ingredient list not found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-anthelios-clear-skin-oil-free-sunscreen-spf-60-dry-touch",
    "brand": "La Roche-Posay",
    "name": "Anthelios Clear Skin Oil-Free Sunscreen SPF 60 (Dry Touch)",
    "catalogCategory": "sunscreen",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Avobenzone",
      "Octocrylene",
      "Homosalate",
      "Octisalate",
      "Silica",
      "Perlite",
      "Maltodextrin",
      "Stearyl Alcohol",
      "T-Butyl Alcohol",
      "Caprylic/Capric Triglyceride"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/p/la-roche-posay-anthelios-clear-skin-dry-touch-sunscreen-spf-60/11290652/",
      "https://ulta.com/p/anthelios-clear-skin-dry-touch-sunscreen-spf-60-xlsImpprod13791275",
      "https://hellopharmacist.com/ndc/49967-0048-02"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Multiple retailer OTC drug-facts panels (a pharmacy listing with filter concentrations, and Dermstore/Ulta product pages) consistently name the same four UV filters (avobenzone, octocrylene, homosalate, octisalate); the full inactive ingredient list was only partially captured from Ulta."
    },
    "knownIssues": [
      "Sold under two near-identical names in the US market ('Clear Skin Oil Free' and 'Clear Skin Dry Touch') for what appears to be the same 1.7oz SPF 60 SKU - treated as one product here, but this should be confirmed against current packaging if the two names ever diverge."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-la-roche-posay-cicaplast-gel-b5",
    "brand": "La Roche-Posay",
    "name": "Cicaplast Gel B5",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Panthenol (5%)",
      "Madecassoside",
      "Dimethicone",
      "Zinc Gluconate",
      "Copper Gluconate",
      "Manganese Gluconate",
      "Sodium Hyaluronate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.nowafarmacja.pl/la-roche-posay-cicaplast-gel-b5-zel-regenerujacy-40ml-10-2026",
      "https://www.benu.ch/en/la-roche-posay-cicapst-gel-b5-40-ml",
      "https://incidecoder.com/products/la-roche-posay-cicaplast-gel-b5"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A Polish pharmacy listing gave the longest ordered ingredient list found; a Swiss pharmacy (Benu.ch) independently corroborated the 5% panthenol concentration. A third source (Leki.pl) gave a much shorter, apparently incomplete, conflicting list."
    },
    "knownIssues": [
      "This is the water-gel formula distinct from the balm-textured 'Cicaplast Baume B5' - the two are sometimes confused in retail listings.",
      "Leki.pl's short ingredient list (caprylyl glycol, citric acid, polysorbate 20, tocopherol) does not match the Polish listing and may reflect an incomplete scrape rather than a true formula difference."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-hydro-boost-water-gel",
    "brand": "Neutrogena",
    "name": "Hydro Boost Water Gel",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Dimethicone",
      "Cetearyl Olivate",
      "Sorbitan Olivate",
      "Alanine",
      "Glycine",
      "Threonine",
      "Serine",
      "Arginine",
      "Proline",
      "Dimethicone/Vinyl Dimethicone Crosspolymer",
      "Phenoxyethanol",
      "Polyacrylamide",
      "Dimethiconol",
      "Laureth-7",
      "Sodium Hyaluronate",
      "Ethylhexylglycerin",
      "C12-14 Pareth-12",
      "Sodium Hydroxide",
      "Tocopherol",
      "Parfum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/neutrogena-hydro-boost-water-gel",
      "https://skinsort.com/products/neutrogena/hydro-boost-water-gel",
      "https://www.neutrogena.com/skin/skin-cleansers/hydro-boost-hydrating-cleansing-gel/6811047.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Compared an older ~19-ingredient formula listing against a newer ~38-ingredient listing on Skinsort/INCIDecoder; both agree on water/glycerin/dimethicone as the base but the amino-acid complex and several minor ingredients only appear in the newer version."
    },
    "knownIssues": [
      "This is a flagship product that has been reformulated at least once; sources disagree on ingredient count (19 vs 38), so the version here may not match a specific bottle's exact current packaging.",
      "A separate 'Hydro Boost Hyaluronic Acid Water Gel' and 'Hydro Boost Cleansing Gel' are differently-named, differently-formulated products that search results sometimes conflate with this one."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-oil-free-acne-wash",
    "brand": "Neutrogena",
    "name": "Oil-Free Acne Wash",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Salicylic Acid 2%",
      "Water",
      "Sodium C14-16 Olefin Sulfonate",
      "Cocamidopropyl Betaine",
      "Sodium Chloride",
      "Sorbitan Laurate",
      "Citric Acid",
      "Disodium EDTA",
      "C12-15 Alkyl Lactate",
      "Benzalkonium Chloride",
      "Fragrance",
      "Cocamidopropyl PG-Dimonium Chloride Phosphate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://shoprite.com/sm/pickup/rsid/511/product/neutrogena-oilfree-acne-wash-6-fl-oz-id-00070501017104",
      "https://skinsort.com/products/neutrogena/oil-free-acne-wash-with-salicylic-acid",
      "https://markowaapteka.com/store/medications-without-a-prescription-otc/skin-problems-otc/neutrogena-oil-free-acne-wash-6-oz-detail"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "ShopRite's OTC drug-facts ingredient panel and a European pharmacy listing both independently confirm salicylic acid 2% as the active and largely overlap on the surfactant system (sodium C14-16 olefin sulfonate, cocamidopropyl betaine)."
    },
    "knownIssues": [
      "A separate 'Sensitive Skin' variant has a shorter, different inactive ingredient list (water, sodium methyl cocoyl taurate, modified potato starch) - not merged into this entry.",
      "The Pink Grapefruit scented variant may differ in fragrance/colorant ingredients from the plain version listed here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-ultra-sheer-dry-touch-sunscreen-spf-55",
    "brand": "Neutrogena",
    "name": "Ultra Sheer Dry-Touch Sunscreen SPF 55",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone 3%",
      "Homosalate 10%",
      "Octisalate 5%",
      "Octocrylene 10%",
      "Water",
      "Styrene/Acrylates Copolymer",
      "Silica",
      "Dimethicone",
      "Potassium Cetyl Phosphate",
      "Benzyl Alcohol",
      "Beeswax",
      "Caprylyl Methicone",
      "Glyceryl Stearate",
      "PEG-100 Stearate",
      "Cetyl Dimethicone",
      "Caprylyl Glycol",
      "Ethylhexylglycerin",
      "BHT",
      "Trideceth-6",
      "Jojoba Esters"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.neutrogena.com/products/sun/ultra-sheer-dry-touch-sunscreen-broad-spectrum-spf-55/6868790.html",
      "https://hannaford.com/groceries/health-beauty/skin-care/sun-care/neutrogena-ultra-sheer-dry-touch-sunscreen-lotion-water-resistant-spf-55-3-oz-sqz.html",
      "https://www.skincarisma.com/products/neutrogena/ultra-sheer-dry-touch-sunscreen-broad-spectrum-spf-55"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The manufacturer's own product page and a grocery retailer's Drug Facts panel independently agree on the same four active filters at the same concentrations; inactive list combined from two retailer fragments (32 ingredients reported total, not all captured)."
    },
    "knownIssues": [
      "One lower-quality aggregator (acne.org) reported different actives including oxybenzone, conflicting with Neutrogena's oxybenzone-free marketing claim - treated as unreliable and excluded."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-rapid-wrinkle-repair-retinol-cream",
    "brand": "Neutrogena",
    "name": "Rapid Wrinkle Repair Retinol Cream",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Water",
      "Pentaerythrityl Tetraethylhexanoate",
      "Glycerin",
      "Dimethicone",
      "PPG-15 Stearyl Ether",
      "BHT",
      "Sodium Hyaluronate",
      "Disodium EDTA",
      "Laureth-7",
      "Sodium Hydroxide",
      "Ascorbic Acid",
      "Retinol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/neutrogena-rapid-wrinkle-repair-retinol-face-cream-trial-size-0-5-oz-prodid-400008",
      "https://skinsort.com/products/neutrogena/rapid-wrinkle-repair-hyaluronic-acid-retinol-cream-old-Kclkkyc",
      "https://www.skincarisma.com/products/rapid-wrinkle-retinol-regenerating-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "CVS's trial-size ingredient panel and Skinsort's listing agree on the opening ingredients (water, pentaerythrityl tetraethylhexanoate, glycerin) and both place retinol/ascorbic acid in the formula; Skincarisma independently corroborates retinol (~0.025%) plus a hyaluronic acid/glucose-complex booster."
    },
    "knownIssues": [
      "Neutrogena sells this under several near-identical names (Regenerating Cream, Retinol Pro+ Night Cream, Fragrance-Free version, Eye Cream) that may have different full formulas - this entry reflects the standard face cream/trial size only.",
      "One lower-quality aggregator (DermFND) claimed a 'myrtle leaf extract' booster not corroborated by any other source - excluded."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-on-the-spot-acne-treatment",
    "brand": "Neutrogena",
    "name": "On-The-Spot Acne Treatment",
    "catalogCategory": "spotTreatment",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Benzoyl Peroxide 2.5%",
      "Water",
      "Carbomer Homopolymer Type B",
      "Ethylhexylglycerin",
      "Sodium Hydroxide",
      "Chlorphenesin",
      "Disodium EDTA",
      "Laureth-4",
      "Hydroxypropyl Methylcellulose"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://giantfoodstores.com/groceries/health-beauty/skin-care/neutrogena-on-the-spot-acne-treatment-vanishing-formula-maximum-strength-0-75-oz-pkg.html",
      "https://beautymasterlist.com/products/neutrogena/on-the-spot-acne-treatment",
      "https://skinsort.com/products/neutrogena/on-the-spot-acne-treatment"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Two independent retailer/aggregator sources (a grocery chain's Drug Facts panel and Beauty Master List) agree on the same 9-ingredient 'Vanishing Formula' list with benzoyl peroxide 2.5% as the sole active."
    },
    "knownIssues": [
      "Skinsort separately listed a different formula (bentonite, caprylic/capric triglyceride, propylparaben) under the same product name, and reports 16 ingredients vs. the 9 found elsewhere - likely reflects an older/different regional formula; not merged into the main list above."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-ultra-gentle-daily-cleanser",
    "brand": "Neutrogena",
    "name": "Ultra Gentle Daily Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Caprylyl Glycol",
      "Potassium Sorbate",
      "Sodium Hydroxide",
      "Citric Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/neutrogena-ultra-gentle-daily-cleanser",
      "https://well.ca/products/neutrogena-ultra-gentle-daily_298181.html?cat=5131",
      "https://www.neutrogena.ca/face/cleansers-scrubs/neutrogena-ultra-gentle-daily-cleanser-fragrance-free"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Partial agreement across INCIDecoder, a Canadian retailer, and the Neutrogena Canada site on water/glycerin/caprylyl glycol as base ingredients; the main surfactant (described as an amphoteric, sarcosinate-type cleanser) was not named by INCI in any source."
    },
    "knownIssues": [
      "Several near-identical SKUs exist (Foaming Formula, Fragrance-Free, For Sensitive Skin) with reportedly different ingredient counts (12-14); this entry may not match a specific bottle exactly.",
      "The primary surfactant could not be identified by INCI name from any source found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-hydro-boost-hyaluronic-acid-serum",
    "brand": "Neutrogena",
    "name": "Hydro Boost Hyaluronic Acid Serum",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Butylene Glycol",
      "Pentylene Glycol",
      "Hydrolyzed Hyaluronic Acid",
      "Sodium Hyaluronate",
      "Panthenol",
      "Trehalose",
      "1,2-Hexanediol",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/neutrogena-hydro-boost-purified-hyaluronic-acid-serum-prodid-172904",
      "https://skinsort.com/products/neutrogena/hydro-boost-hyaluronic-acid-serum/germany",
      "https://www.neutrogena.ca/face/moisturizer-hydration-serum/neutrogena-hydro-boost-hyaluronic-acid-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Marketing copy from Neutrogena Canada names hyaluronic acid, glycerin and vitamin B5 (panthenol) as key ingredients; a German-market Skinsort listing gives a fuller ingredient order that is consistent with but not confirmed as identical to the US formula."
    },
    "knownIssues": [
      "The German-market listing used for most of this ingredient order is a different regional formula from the US product - flagged as the closest available match, not a confirmed US list.",
      "A separate 'Hydro Boost Drops' fragrance-free version has a reportedly different, shorter ingredient fragment (xylitol, hydrolyzed hyaluronic acid, carrageenan, agar) - not merged into this entry."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-sheer-zinc-dry-touch-sunscreen-spf-50",
    "brand": "Neutrogena",
    "name": "Sheer Zinc Dry-Touch Sunscreen SPF 50",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Zinc Oxide 21.6%",
      "Water",
      "C12-15 Alkyl Benzoate",
      "Caprylyl Glycol",
      "Ethyl Methicone",
      "Sodium Chloride",
      "Phenoxyethanol",
      "Cetyl Dimethicone/Bis-Vinyldimethicone Crosspolymer",
      "Chlorphenesin",
      "Phenylethyl Alcohol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://otclabels.com/lib/otc/otc-meds/neutrogena-sheer-zinc-dry-touch-sunscreen-broad-spectrum-spf50/",
      "https://www.neutrogena.com/products/sun/sheer-zinc-dry-touch-sunscreen-broad-spectrum-spf-50/6811080.html",
      "https://incidecoder.com/products/neutrogena-sheer-zinc-dry-touch-sunscreen-broad-spectrum-spf-50"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An OTC drug-label aggregator and Neutrogena's own product page agree that zinc oxide 21.6% is the sole active ingredient; the inactive list comes from the OTC label source and was not independently cross-checked for completeness."
    },
    "knownIssues": [
      "Neutrogena's face-specific 'for sensitive skin' version lists a much shorter inactive set (only phenoxyethanol and chlorphenesin besides zinc oxide) per the brand's own face-product page, suggesting the face and body versions are different formulas - this entry reflects the general/body-style listing from the OTC label source."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-hydro-boost-gel-cream",
    "brand": "Neutrogena",
    "name": "Hydro Boost Gel Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Zinc Gluconate",
      "Copper Gluconate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/neutrogena-hydro-boost-nourishing-gel-cream",
      "https://www.ocado.com/products/neutrogena-hydro-boost-hydrating-gel-cream-moisturiser/357884011",
      "https://www.skincarisma.com/products/neutrogena/hydro-boost-gel-cream/ingredient_list"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only a short, cut-off ingredient fragment (water, zinc gluconate, copper gluconate) was found from INCIDecoder; Skincarisma's ingredient-list page did not return usable content in search snippets."
    },
    "knownIssues": [
      "Multiple near-identical Hydro Boost gel cream SKUs exist (standard, Extra-Dry, Body, hand, and a 50ml regional face version with different colorant/fragrance additions) with reportedly different formulas; this entry is marked incomplete given how little of the ordered list could be confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-deep-clean-facial-cleanser",
    "brand": "Neutrogena",
    "name": "Deep Clean Facial Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Sodium Laureth Sulfate",
      "Lauryl Glucoside",
      "Parfum (Fragrance)",
      "CI 19140",
      "CI 17200"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.neutrogena-me.com/face-care-products/face-cleansers-wash-and-scrubs/deep-clean-facial-cleanser",
      "https://incidecoder.com/products/neutrogena-deep-clean-facial-cleanser",
      "https://www.skincarisma.com/products/neutrogena/deep-clean-facial-cleanser-for-normal-to-oily-skin"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Neutrogena's own (Middle East market) product page gave an ordered ingredient list; INCIDecoder's US-market listing under the same product name gave a materially different formula (different surfactant, added Yellow 5/Red 40), suggesting regional differences."
    },
    "knownIssues": [
      "Regional formulas appear to differ substantially: the Middle East listing has no colorants named beyond CI 19140/17200, while the US INCIDecoder listing adds FD&C Yellow 5 and Red 40 - these may not be the same product; US buyers should treat this entry as uncertain.",
      "The Deep Clean line includes several different cleanser textures (gel, foaming scrub, purifying clay) with separate formulas not reflected here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-rapid-clear-stubborn-acne-spot-gel",
    "brand": "Neutrogena",
    "name": "Rapid Clear Stubborn Acne Spot Gel",
    "catalogCategory": "spotTreatment",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Benzoyl Peroxide 10%",
      "Water",
      "Carbomer",
      "Hydroxypropyl Methylcellulose",
      "Benzyl Alcohol",
      "Disodium EDTA",
      "Laureth-4",
      "Citric Acid",
      "Sodium Hydroxide"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.Neutrogena.com/products/skincare/rapid-clear-stubborn-acne-spot-gel/6802461.html",
      "https://delivery.riteaid.com/store/rite-aid/products/2692531-neutrogena-rapid-clear-stubborn-acne-spot-gel-1-oz",
      "https://skinsort.com/products/neutrogena/rapid-clear-stubborn-acne-spot-gel-with-5-benzoyl-peroxide/canada"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Neutrogena's own US product page and a Rite Aid retailer listing agree on benzoyl peroxide 10% as the active and the same inactive ingredient set; a Canadian-market Skinsort listing instead gives 5% benzoyl peroxide, consistent with a known US/Canada strength difference."
    },
    "knownIssues": [
      "US product is 10% benzoyl peroxide; the Canadian-market version of the same name is 5% - these are different regional strengths, noted here rather than merged as identical."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-hydro-boost-eye-gel-cream",
    "brand": "Neutrogena",
    "name": "Hydro Boost Eye Gel-Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Water",
      "Dimethicone",
      "Glycerin",
      "Cetearyl Olivate",
      "Sorbitan Olivate",
      "Polyacrylamide",
      "Dimethicone/Vinyl Dimethicone Crosspolymer",
      "Synthetic Beeswax",
      "Phenoxyethanol",
      "Chlorphenesin",
      "Laureth-7",
      "Sodium Hyaluronate",
      "Ethylhexylglycerin",
      "Sodium Hydroxide",
      "C12-14 Pareth-12"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ulta.com/p/hydro-boost-eye-gel-cream-xlsImpprod12041839",
      "https://skinsort.com/products/neutrogena/hydro-boost-eye-gel-cream/us",
      "https://www.neutrogena-me.com/face-care-products/eye-treatment/hydro-boost-eye-refreshing-gel-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Ulta's US product listing and a US-market Skinsort page overlap substantially on the ~20-ingredient formula (water, dimethicone, glycerin, cetearyl olivate...); a Middle East Neutrogena page for a differently-named 'Refreshing' eye gel cream gave a different, non-overlapping partial list and was not merged in."
    },
    "knownIssues": [
      "An unverified Ulta customer review claimed the eye product has the exact same formula as the face Hydro Boost Water Gel; this is an unconfirmed user claim, not an independent source, and was not relied upon.",
      "A German-market Skinsort listing reports 39 ingredients including urea and vitamin E, substantially more than the US listing - likely a different regional formula."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-norwegian-formula-hand-cream-fragrance-free",
    "brand": "Neutrogena",
    "name": "Norwegian Formula Hand Cream (Fragrance-Free)",
    "catalogCategory": "other",
    "tags": [
      "fragrance-free",
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Water",
      "Glycerin",
      "Cetearyl Alcohol",
      "Sodium Cetearyl Sulfate",
      "Phenoxyethanol",
      "Stearic Acid",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://stopandshop.com/groceries/health-beauty/bath-body/neutrogena-norwegian-formula-fragrance-free-hand-cream-2-oz-box.html",
      "https://hannaford.com/groceries/health-beauty/bath-body/neutrogena-norwegian-formula-fragrance-free-hand-cream-2-oz-box.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Two separate US grocery-retailer product pages (Stop & Shop and Hannaford) independently list the identical 7-ingredient formula for the 2oz fragrance-free box."
    },
    "knownIssues": [
      "This brand sells several other Norwegian Formula hand/foot creams (scented concentrated cream, Hand and Nail Cream, Fast Absorbing Cream) with different, longer ingredient lists (containing petrolatum, dimethicone, fragrance, parabens in some versions) - not merged into this fragrance-free entry."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-clear-face-liquid-lotion-sunscreen-spf-30-oil-free",
    "brand": "Neutrogena",
    "name": "Clear Face Liquid-Lotion Sunscreen SPF 30 (Oil-Free)",
    "catalogCategory": "sunscreen",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Avobenzone 2.5%",
      "Homosalate 8%",
      "Octisalate 5%",
      "Octocrylene 8%",
      "Water",
      "Silica",
      "Cetyl Dimethicone",
      "Styrene/Acrylates Copolymer",
      "C12-15 Alkyl Benzoate",
      "Ethylhexylglycerin",
      "Steareth-100",
      "Polyester-7",
      "Chlorphenesin",
      "Steareth-2",
      "Ethylhexyl Stearate",
      "Disodium EDTA",
      "Propylene Glycol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://giantfoodstores.com/groceries/health-beauty/skin-care/sun-care/neutrogena-clear-face-sunscreen-liquid-lotion-oil-free-spf-30-3-oz-sqz.html",
      "https://beautymasterlist.com/products/neutrogena/clear-face-liquid-lotion-sunscreen-broad-spectrum-spf-30/",
      "https://stopandshop.com/groceries/health-beauty/skin-care/sun-care/neutrogena-clear-face-sunscreen-liquid-lotion-oil-free-spf-30-3-oz-sqz.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Three grocery retailer Drug Facts panels (Giant Food, Stop & Shop, and independently Beauty Master List) agree on the same four active filters and concentrations; the inactive list was assembled from overlapping retailer fragments."
    },
    "knownIssues": [
      "A related but distinct 'Break-Out Free' / 'Ultra Sheer Clear Face' Skinsort listing gives different active concentrations (octocrylene 3%, ethylhexyl salicylate 4%, benzophenone-3 4%, homosalate 5%) - likely an older or different formula, not merged into this entry."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-makeup-remover-cleansing-towelettes-original",
    "brand": "Neutrogena",
    "name": "Makeup Remover Cleansing Towelettes (Original)",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "Search results only returned ingredient lists for differently-named variants (Night Calming, Hydro Boost, Ultra-Soft, Fragrance-Free) that disagreed with each other and could not be confirmed as the standard/original towelette formula."
    ],
    "note": "Formula not confidently matched to a specific current SKU via available sources during this research pass; see knownIssues. Several named variants exist with reportedly different, non-overlapping ingredient lists.",
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-body-clear-body-wash",
    "brand": "Neutrogena",
    "name": "Body Clear Body Wash",
    "catalogCategory": "cleanser",
    "tags": [
      "body",
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Salicylic Acid 2%",
      "Water",
      "Sodium C14-16 Olefin Sulfonate",
      "Cocamidopropyl Betaine",
      "Disodium Cocoamphodiacetate",
      "Glycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://beautymasterlist.com/products/neutrogena/body-clear-body-wash",
      "https://otclabels.com/lib/otc/otc-meds/neutrogena-body-clear-body-wash/",
      "https://www.skincarisma.com/products/neutrogena/neutrogena-body-clear-body-wash"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An OTC drug-facts label aggregator and Beauty Master List's ingredient listing agree salicylic acid 2% is the active and both open the inactive list with the same surfactant sequence."
    },
    "knownIssues": [
      "A Skinsort listing for a differently-scented variant lists triclosan as an ingredient while the OTC label's version does not - this looks like either a discontinued/reformulated older version or a data error; not included in the main list above.",
      "Pink Grapefruit scented variant may differ in fragrance/colorant content from this plain listing."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-stubborn-marks-pm-treatment-retinol-sa",
    "brand": "Neutrogena",
    "name": "Stubborn Marks PM Treatment (Retinol SA)",
    "catalogCategory": "spotTreatment",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "Only a partial, unverified third-party aggregator list (water, pentaerythrityl tetraethylhexanoate, dimethicone, plus claimed vitamin C/hyaluronic acid) was found, and it conflicts with Neutrogena's own marketing, which names Retinol SA as the sole highlighted active and does not mention vitamin C."
    ],
    "note": "Neutrogena's own page did not publish a full ingredient list and directed shoppers to check the carton; the one third-party list found was not corroborated by a second independent source, so it is omitted here as unreliable. Formula not confidently found via available sources during this research pass.",
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-healthy-skin-anti-wrinkle-cream-spf-15",
    "brand": "Neutrogena",
    "name": "Healthy Skin Anti-Wrinkle Cream SPF 15",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone",
      "Ensulizole 1%",
      "Octinoxate 6%",
      "Retinol",
      "Panthenol",
      "Dimethicone"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/neutrogena-healthy-skin-anti-wrinkle-night-cream",
      "https://www.acne.org/reviews/healthy-skin-anti-wrinkle-cream-spf-15-reviews-944",
      "https://www.skincarisma.com/products/neutrogena/neutrogena-canada-anti-wrinkle-cream-original-formula"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "An acne.org community-sourced label listing (ensulizole 1%, octinoxate 6%) and INCIDecoder's identification of avobenzone for the SPF 15 version only partially overlap; neither source gave a complete ordered inactive ingredient list."
    },
    "knownIssues": [
      "The 'Night Cream' (no SPF) and 'SPF 15' day versions are different formulas; this entry attempts to describe the SPF 15 day cream but the active-filter set reported (avobenzone AND ensulizole AND octinoxate) is unusually large for one product and was not confirmed by a single unified source - may reflect conflation of two different sources/products.",
      "A Canadian 'Original Formula' listing (22 ingredients) was not merged in as it may be a different regional formula."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-bright-boost-gel-cream",
    "brand": "Neutrogena",
    "name": "Bright Boost Gel Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Dimethicone",
      "Glycerin",
      "Mandelic Acid 3%",
      "Acetyl Glucosamine 2%",
      "Gluconolactone 2%",
      "Parfum (Fragrance)",
      "CI 77891",
      "CI 16035"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.neutrogena-me.com/face/bright-boost-gel-cream",
      "https://kenvuepro.com/en-za/brands/neutrogena/products/neutrogena-bright-boost-gel-cream",
      "https://www.skincarisma.com/products/neutrogena/bright-boost-gel-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A Middle East Neutrogena product page and a Kenvue regional professional page agree on the three named actives (mandelic acid 3%, acetyl glucosamine 2%, gluconolactone 2%); a South African retailer fragment independently corroborates water/dimethicone/glycerin/mandelic acid/acetyl glucosamine as present."
    },
    "knownIssues": [
      "One lower-quality aggregator (DermFND) claimed Neutrogena has discontinued the entire Bright Boost line, while multiple retailers still listed it as available - current US availability should be verified.",
      "Full ordered ingredient list not confirmed from a single source; assembled from overlapping regional fragments."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-neutrogena-oil-free-moisture-combination-skin",
    "brand": "Neutrogena",
    "name": "Oil-Free Moisture (Combination Skin)",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Tocopherol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/neutrogena-oil-free-moisture-combination-skin-moisturiser",
      "https://skinsignal.com/products/neutrogena-oil-free-moisture-combination-skin-moisturiser",
      "https://skinsort.com/products/neutrogena/oil-free-moisture-spf-15"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only minimal fragments were recovered: INCIDecoder names water as the solvent and Skinsignal separately confirms tocopherol is present as an antioxidant in an 18-ingredient formula; no fuller ordered list was found."
    },
    "knownIssues": [
      "Multiple named variants exist (Combination Skin, Sensitive Skin, with SPF 15) with reportedly different ingredient counts (18-21) and, for the SPF version, different active sunscreen filters (octinoxate/octisalate/oxybenzone per one source) - this entry is for the base combination-skin moisturizer without SPF."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-ultra-calming-hydrating-gel-cleanser",
    "brand": "Aveeno",
    "name": "Ultra-Calming Hydrating Gel Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Chrysanthemum Parthenium (Feverfew) Flower/Leaf/Stem Juice"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/aveeno/ultra-calming-hydrating-gel-cleanser-for-face",
      "https://aveeno.com/products/discontinued-products/ultra-calming-hydrating-gel-cleanser",
      "https://incidecoder.com/products/aveeno-ultra-calming-hydrating-gel-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only one named ingredient (feverfew extract) was corroborated across Skinsort and INCIDecoder out of a reported 18-ingredient formula; Aveeno's own site confirms the product is fragrance-free and soap-free but lists it under 'discontinued products'."
    },
    "knownIssues": [
      "Data is extremely thin - only one of ~18 reported ingredients could be confirmed by name.",
      "Aveeno's own US site lists this product under 'discontinued products', so current availability is uncertain."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-positively-radiant-daily-moisturizer-spf-30",
    "brand": "Aveeno",
    "name": "Positively Radiant Daily Moisturizer SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone",
      "Homosalate",
      "Octisalate",
      "Octocrylene"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://otclabels.com/lib/otc/otc-meds/aveeno-positively-radiant-daily-moisturizer-sunscreen-broad-spectrum-spf-30/",
      "https://www.acne.org/reviews/positively-radiant-daily-moisturizer-spf-30-reviews-410/3",
      "https://skinsort.com/products/aveeno/positively-radiant-sheer-daily-face-moisturizer-spf-30"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "An OTC drug-label aggregator confirms the same four active UV filters named by Aveeno's own branding; a dated (c. 2010) consumer-submitted ingredient list separately gave different percentages and included oxybenzone, which conflicts with current oxybenzone-free marketing and was treated as an outdated/unreliable formula."
    },
    "knownIssues": [
      "Concentrations for the four active filters could not be confirmed from a reliable current source - the only percentages found (avobenzone 3%, homosalate 12%, octisalate 5%, octocrylene 1.7%, oxybenzone 3%) come from an old, likely outdated listing and were excluded.",
      "Full inactive ingredient list not found; a related 'Sheer' variant reportedly has 26 ingredients but is a distinct product."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-clear-complexion-daily-moisturizer",
    "brand": "Aveeno",
    "name": "Clear Complexion Daily Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Salicylic Acid 0.5%",
      "Cetearyl Glucoside",
      "Arachidyl Glucoside",
      "C13-14 Isoparaffin",
      "Ethylene/Acrylic Acid Copolymer",
      "Fragrance",
      "Laureth-7",
      "Disodium EDTA",
      "BHT",
      "Sodium Hydroxide",
      "Citric Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://stopandshop.com/groceries/health-beauty/skin-care/facial-moisturizer/aveeno-clear-complexion-daily-moisturizer-with-salicylic-acid-40-oz-btl.html",
      "https://www.aveeno.ca/amp/products/clear-complexion-daily-moisturizer",
      "https://otclabels.com/lib/otc/otc-meds/aveeno-clear-complexion-daily-moisturizer/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A US retailer's OTC Drug Facts panel and an independent OTC label aggregator both list the identical salicylic acid 0.5% active and the same inactive ingredient sequence for this non-SPF daily moisturizer."
    },
    "knownIssues": [
      "This is the base (non-SPF) salicylic-acid moisturizer; a separate 'Clear Complexion Sheer Daily Moisturizer SPF' product exists with a different formula including avobenzone/homosalate - not merged into this entry and not independently confirmed via search before the search budget ran out."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-calm-restore-oat-gel-moisturizer",
    "brand": "Aveeno",
    "name": "Calm + Restore Oat Gel Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Dimethicone",
      "Cetearyl Olivate",
      "Avena Sativa (Oat) Kernel Flour",
      "Sorbitan Olivate",
      "Polyacrylamide",
      "Synthetic Beeswax",
      "Phenoxyethanol",
      "Dimethiconol",
      "Carbomer",
      "Laureth-7",
      "Chrysanthemum Parthenium (Feverfew) Flower/Leaf/Stem Juice",
      "Ethylhexylglycerin",
      "Sodium Hydroxide",
      "Avena Sativa (Oat) Kernel Extract",
      "Centella Asiatica Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.aveeno.ca/amp/hcp/products/calm-restore-oat-gel-moisturizer-48g",
      "https://skinsort.com/products/aveeno/calm-restore-oat-gel-moisturizer",
      "https://incidecoder.com/products/aveeno-calm-restore-oat-gel-moisturiser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Aveeno's own Canadian HCP product page and a US-market Skinsort listing overlap substantially on core ingredients (dimethiconol/carbomer/laureth-7/feverfew juice on one side, water/glycerin/dimethicone/cetearyl olivate/oat kernel flour on the other); combined list may not reflect exact single-market order."
    },
    "knownIssues": [
      "A UK-market Skinsort listing gives a third, only partially-overlapping ingredient set; a separate but similarly-named 'Calm+Restore Daily Gel Moisturizer' (per INCIDecoder) is reportedly a longer, different formula with shea butter and candelilla wax - not merged into this entry."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-daily-moisturizing-lotion-fragrance-free",
    "brand": "Aveeno",
    "name": "Daily Moisturizing Lotion (Fragrance Free)",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Dimethicone 1.2%",
      "Water",
      "Glycerin",
      "Petrolatum",
      "Distearyldimonium Chloride",
      "Isopropyl Palmitate",
      "Cetyl Alcohol",
      "Avena Sativa (Oat) Kernel Flour",
      "Benzyl Alcohol",
      "Sodium Chloride"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.aveeno.ca/amp/products/daily-moisturizing-lotion",
      "https://www.albertsons.com/shop/product-details.970117898.html",
      "https://skinsort.com/products/aveeno/daily-moisturizing-lotion"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Aveeno's Canadian product page and a US retailer (Albertsons) OTC-style ingredient listing substantially agree on the core formula (dimethicone as active skin-protectant at 1.2%, water, glycerin, petrolatum, oat kernel flour)."
    },
    "knownIssues": [
      "There are several similarly-named Aveeno lotions (Daily Moisturising Body Lotion, Sheer Hydration, Calming Relief) with reportedly different formulas; this entry reflects the classic fragrance-free Daily Moisturizing Lotion only."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-baby-daily-moisture-lotion",
    "brand": "Aveeno",
    "name": "Baby Daily Moisture Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "baby-kids"
    ],
    "region": "US",
    "ingredients": [
      "Dimethicone 1.2%",
      "Water",
      "Glycerin",
      "Distearyldimonium Chloride",
      "Petrolatum",
      "Isopropyl Palmitate",
      "Cetyl Alcohol",
      "Avena Sativa (Oat) Kernel Flour",
      "Benzyl Alcohol",
      "Sodium Chloride",
      "Allantoin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://stopandshop.com/groceries/product/aveeno-baby-daily-moisture-fragrance-free-natural-oatmeal-lotion-8-oz-sqz/129128",
      "https://skinsort.com/products/aveeno/baby-daily-moisture-lotion",
      "https://incidecoder.com/products/aveeno-baby-daily-moisture-lotion"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A US grocery retailer's OTC-style ingredient/label listing was the main source; the ingredient set closely parallels the adult Daily Moisturizing Lotion formula (same active and several shared inactives), lending indirect corroboration."
    },
    "knownIssues": [
      "A Canadian retailer and an Indian pharmacy site each listed different formulations under similar names (one centered on cocamidopropyl betaine/sodium lauroamphoacetate, suggesting a cleansing product, not a lotion) - excluded as likely different regional SKUs."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-skin-relief-moisturizing-lotion-fragrance-free",
    "brand": "Aveeno",
    "name": "Skin Relief Moisturizing Lotion (Fragrance Free)",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "body",
      "fragrance-free",
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Steareth-20",
      "Sodium Chloride",
      "Tocopherol",
      "Potassium Sorbate",
      "Avena Sativa (Oat) Kernel Extract",
      "Butyrospermum Parkii (Shea) Butter",
      "Caprylyl Glycol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.tesco.com/shop/en-GB/products/266253293",
      "https://skinsort.com/products/aveeno/skin-relief-moisturising-lotion/uk/preview",
      "https://skinsignal.com/products/aveeno-skin-relief-moisturising-lotion-for-sensitive-skin"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A UK retailer (Tesco) listing and a UK-market Skinsort page both name steareth-20 and tocopherol among the ~16 reported ingredients; a related Skinsignal page for the 'Sensitive Skin' variant independently names oat kernel extract/oil and petrolatum."
    },
    "knownIssues": [
      "Only a partial ingredient set (far short of the reported 16 total) could be confirmed; full ordered INCI list not found.",
      "Marketed as free of dyes, fragrances, parabens and sulfates, consistent with no fragrance ingredient appearing in any source checked."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-clear-complexion-foaming-cleanser",
    "brand": "Aveeno",
    "name": "Clear Complexion Foaming Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": [
      "Salicylic Acid 0.5%",
      "Water",
      "Cocamidopropyl Betaine",
      "Sodium C14-16 Olefin Sulfonate",
      "Glycerin",
      "Sorbitol",
      "Disodium Lauroamphodiacetate",
      "Polysorbate 20",
      "PEG-6 Caprylic/Capric Glycerides",
      "Sodium Benzoate",
      "Parfum (Fragrance)",
      "Citric Acid",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cvs.com/shop/ingredients/aveeno-clear-complexion-foaming-facial-cleanser-oil-free-6-oz-prodid-1020081",
      "https://www.aveeno.ca/amp/products/clear-complexion-foaming-cleanser",
      "https://giantfoodstores.com/groceries/health-beauty/skin-care/aveeno-clear-complexion-foaming-cleanser-salicylic-acid-acne-treatment-6-oz-btl.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "CVS's US ingredient panel, a Giant Food Drug Facts listing, and Aveeno's own Canadian site independently agree salicylic acid 0.5% is the active ingredient, and the Canadian site's partial INCI order was used for the inactive list (cut off before completion)."
    },
    "knownIssues": [
      "The Canadian-site ingredient order was used to fill in the inactive list since no complete US-specific ordered list was found; minor formula differences between US and Canadian versions cannot be ruled out.",
      "Contains fragrance despite being an acne-focused cleanser."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-positively-radiant-maxglow-no-mess-hydrating-sleep-mask",
    "brand": "Aveeno",
    "name": "Positively Radiant MaxGlow No-Mess Hydrating Sleep Mask",
    "catalogCategory": "other",
    "tags": [],
    "region": null,
    "ingredients": [
      "Fruit Water",
      "Disodium EDTA",
      "Caprylyl Glycol",
      "1,2-Hexanediol",
      "Cyclotetrasiloxane",
      "Lemon Peel Extract",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://well.ca/fr/produits/aveeno-positively-radiant-maxglow_163871.html?cat=5114",
      "https://skinsort.com/products/aveeno/positively-radiant-maxglow-no-mess-hydrating-sleep-mask",
      "https://www.skincarisma.com/products/aveeno/positively-radiant-maxglow-no-mess-hydrating-sleep-mask/ingredient_list"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only one retailer (Well.ca) gave a partial ordered ingredient fragment out of a reported 24-ingredient formula (Skinsort and Skincarisma both cite 24 ingredients but did not return the names in search results)."
    },
    "knownIssues": [
      "The retailer source (Well.ca) marks this product as discontinued; current US availability should be verified.",
      "Full ordered ingredient list not found - only 7 of ~24 reported ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-absolutely-ageless-daily-facial-moisturizer-spf-30",
    "brand": "Aveeno",
    "name": "Absolutely Ageless Daily Facial Moisturizer SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone",
      "Octocrylene"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/aveeno-absolutely-ageless-daily-moisturizer-spf-30",
      "https://www.aveeno.com/products/discontinued-products/absolutely-ageless-daily-moisturizer-spf-30",
      "https://skinsort.com/products/aveeno/absolutely-ageless-daily-facial-moisturizer-with-broad-spectrum-spf-30-sunscreen"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "INCIDecoder identifies avobenzone as a UV filter and a Skinsort comparison page separately references octocrylene among shared ingredients for this product line, but a full active or inactive ingredient list was not found."
    },
    "knownIssues": [
      "Aveeno's own US site lists the 1.7oz version of this product under 'discontinued products' - current retail availability is uncertain.",
      "Skinsort reports 33 total ingredients (also citing vitamin C and vitamin E as key components) but the full list was not returned in search results."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-protect-hydrate-sunscreen-lotion-spf-30",
    "brand": "Aveeno",
    "name": "Protect + Hydrate Sunscreen Lotion SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone 1.5%",
      "Homosalate 5%",
      "Octisalate 4%",
      "Octocrylene 6%"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://hannaford.com/groceries/health-beauty/skin-care/sun-care/aveeno-protect-hydrate-sunscreen-spf-30-3-oz-sqz.html",
      "https://heb.com/product-detail/aveeno-protect-hydrate-sunscreen-spf-30/4485527",
      "https://www.aveeno.ca/amp/products/protect-hydrate-lotion-sunscreen-spf-30"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Three independent sources (Hannaford and H-E-B retailer listings, and Aveeno's own Canadian product page) all give the identical four active filters at the identical concentrations."
    },
    "knownIssues": [
      "No inactive/full INCI ingredient list was found from any source - only the active sunscreen filters could be confirmed.",
      "A separate, differently-named 'Protect + Soothe Face Mineral Sunscreen SPF 30' is a mineral (zinc oxide/titanium dioxide) formula, not to be confused with this chemical-filter product."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-baby-eczema-therapy-moisturizing-cream-fragrance-free",
    "brand": "Aveeno",
    "name": "Baby Eczema Therapy Moisturizing Cream (Fragrance Free)",
    "catalogCategory": "moisturizer",
    "tags": [
      "baby-kids",
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Colloidal Oatmeal 1%",
      "Water",
      "Glycerin",
      "Panthenol",
      "Petrolatum",
      "Dimethicone",
      "Ceramide NP",
      "Avena Sativa (Oat) Kernel Oil",
      "Avena Sativa (Oat) Kernel Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.aveeno.com/amp/products/baby-eczema-therapy-moisturizing-cream",
      "https://giantfoodstores.com/groceries/baby/baby-bath-skin-care/aveeno-baby-eczema-therapy-fragrance-free-moisturizing-cream-73-oz-sqz.html",
      "https://skinsort.com/products/aveeno/baby-eczema-therapy-moisturizing-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Aveeno's own US product page and a grocery retailer's Drug Facts listing for the fragrance-free version both independently confirm colloidal oatmeal 1% as the sole active and largely agree on the same core inactive ingredients."
    },
    "knownIssues": [
      "Skinsort's independent count (~15 ingredients) includes sodium chloride, not explicitly named by the brand's own page or the retailer listing - minor list completeness discrepancy noted but not resolved."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-positively-mineral-sensitive-skin-sunscreen-spf-50",
    "brand": "Aveeno",
    "name": "Positively Mineral Sensitive Skin Sunscreen SPF 50",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Zinc Oxide 21.6%",
      "Water",
      "C12-15 Alkyl Benzoate",
      "Styrene/Acrylates Copolymer",
      "Octyldodecyl Citrate Crosspolymer",
      "Phenyl Trimethicone",
      "Cetyl PEG/PPG-10/1 Dimethicone",
      "Dimethicone",
      "Glycerin",
      "Chrysanthemum Parthenium (Feverfew) Flower/Leaf/Stem Juice"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.albertsons.com/shop/product-details.960494446.177.html",
      "https://skinsort.com/products/aveeno/positively-mineral-sensitive-skin-sunscreen-spf-50",
      "https://whatsinmyjar.com/product/aveeno-positively-mineral-sensitive-skin-spf-40-sunscreen-face-milk-with-zinc-oxide-titanium-dioxide-invisible-oil-free-liquid-facial-sunscreen-usniao-201024"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A US retailer listing and Skinsort both confirm zinc oxide 21.6% as the sole active; the inactive ingredients were assembled from overlapping fragments across two sources and are not confirmed complete."
    },
    "knownIssues": [
      "Aveeno's own site marks this product as 'DISCONTINUED' - current retail availability should be verified.",
      "A separately-named product ('Positively Mineral...SPF 40...with Zinc Oxide, Titanium Dioxide') suggests there may be a related dual-mineral-filter version with a different active combination - not merged into this entry."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-eczema-therapy-daily-moisturizing-cream",
    "brand": "Aveeno",
    "name": "Eczema Therapy Daily Moisturizing Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": [
      "Colloidal Oatmeal 1%",
      "Water",
      "Glycerin",
      "Panthenol",
      "Distearyldimonium Chloride",
      "Petrolatum",
      "Isopropyl Palmitate",
      "Cetyl Alcohol",
      "Dimethicone",
      "Avena Sativa (Oat) Kernel Oil",
      "Avena Sativa (Oat) Kernel Extract",
      "Steareth-20",
      "Benzalkonium Chloride",
      "Ceramide"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://giantfoodstores.com/groceries/product/aveeno-eczema-therapy-daily-moisturizing-cream-w-colloidal-oatmeal-7-3-oz-sqz/194779",
      "https://www.shoprite.com/product/aveeno-eczema-therapy-daily-moisturizing-cream-5-oz-id-00381371151059",
      "https://skinsort.com/compare/aveeno-daily-moisturizing-lotion-vs-aveeno-eczema-therapy-daily-moisturizing-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A Giant Food Drug Facts listing gives colloidal oatmeal 1% as active with a full inactive list; this closely parallels the related Baby Eczema Therapy Cream formula, providing indirect cross-corroboration of plausibility, though it is not itself a second independent full-list source."
    },
    "knownIssues": [
      "Ingredient counts differ slightly by source (14 vs 15 per different Skinsort comparison pages); 5oz and 7.3oz sizes may have minor formula differences per one retailer's caveat."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-aveeno-smart-essentials-daily-nourishing-moisturizer-spf-30",
    "brand": "Aveeno",
    "name": "Smart Essentials Daily Nourishing Moisturizer SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone",
      "Homosalate",
      "Octisalate",
      "Octocrylene",
      "Oxybenzone"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.pharmacompass.com/ndc-58232-0755-1",
      "https://www.skincarisma.com/products/aveeno/aveeno-smart-essentials-daily-nourishing-moisturizer-spf-30",
      "https://portalpharmacy.ke/aveeno-smart-essential-daily-nourishing-moisturiser-with-spf30-2-50-oz"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A pharmacy/NDC regulatory listing names five active UV filters including oxybenzone; Skincarisma separately confirms the product (38 total ingredients reported) contains fragrance, but no inactive ingredient list was found from either source."
    },
    "knownIssues": [
      "This formula includes oxybenzone, unlike several newer Aveeno sunscreens marketed as oxybenzone-free - this may reflect an older-generation SPF formula; current packaging should be checked.",
      "Full inactive ingredient list (33 of 38 reported ingredients) not found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-advanced-repair-lotion",
    "brand": "Eucerin",
    "name": "Advanced Repair Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-advanced-repair-cream",
    "brand": "Eucerin",
    "name": "Advanced Repair Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-daily-hydration-body-lotion-spf-15",
    "brand": "Eucerin",
    "name": "Daily Hydration Body Lotion SPF 15",
    "catalogCategory": "sunscreen",
    "tags": [
      "body"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-eczema-relief-body-cream",
    "brand": "Eucerin",
    "name": "Eczema Relief Body Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-roughness-relief-lotion",
    "brand": "Eucerin",
    "name": "Roughness Relief Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-original-healing-soothing-repair-creme",
    "brand": "Eucerin",
    "name": "Original Healing Soothing Repair Creme",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-skin-calming-itch-relief-treatment",
    "brand": "Eucerin",
    "name": "Skin Calming Itch Relief Treatment",
    "catalogCategory": "other",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-redness-relief-daily-perfecting-lotion",
    "brand": "Eucerin",
    "name": "Redness Relief Daily Perfecting Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-q10-anti-wrinkle-sensitive-skin-creme",
    "brand": "Eucerin",
    "name": "Q10 Anti-Wrinkle Sensitive Skin Creme",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-hyaluron-filler-day-cream",
    "brand": "Eucerin",
    "name": "Hyaluron-Filler Day Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": "EU",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-sun-oil-control-gel-cream-spf-50",
    "brand": "Eucerin",
    "name": "Sun Oil Control Gel-Cream SPF 50",
    "catalogCategory": "sunscreen",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-sun-sensitive-protect-sunscreen-lotion-spf-50",
    "brand": "Eucerin",
    "name": "Sun Sensitive Protect Sunscreen Lotion SPF 50",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-baby-eczema-relief-body-creme",
    "brand": "Eucerin",
    "name": "Baby Eczema Relief Body Creme",
    "catalogCategory": "moisturizer",
    "tags": [
      "baby-kids",
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-advanced-repair-foot-creme",
    "brand": "Eucerin",
    "name": "Advanced Repair Foot Creme",
    "catalogCategory": "other",
    "tags": [
      "for-dry-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-urearepair-plus-lotion-10-urea",
    "brand": "Eucerin",
    "name": "UreaRepair PLUS Lotion (10% Urea)",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin"
    ],
    "region": "EU",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-ph5-wash-lotion",
    "brand": "Eucerin",
    "name": "pH5 Wash Lotion",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": "EU",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-even-brighter-clinical-serum",
    "brand": "Eucerin",
    "name": "Even Brighter Clinical Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-eucerin-aquaporin-active-moisturizer",
    "brand": "Eucerin",
    "name": "AQUAporin Active Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": "EU",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "No research performed for this product - WebSearch session budget was exhausted before Eucerin research began."
    ],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's session budget was exhausted before this brand could be researched, so no search was performed for this product at all (not even a partial/low-confidence result). Listed as a stub because it is a real, well-known, currently-or-recently-sold Eucerin SKU, so it remains useful for users to find by name and enter ingredients manually.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-niacinamide-10-zinc-1",
    "brand": "The Ordinary",
    "name": "Niacinamide 10% + Zinc 1%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Niacinamide",
      "Pentylene Glycol",
      "Zinc PCA",
      "Dimethyl Isosorbide",
      "Tamarindus Indica Seed Gum",
      "Xanthan Gum",
      "Isoceteth-20",
      "Ethoxydiglycol",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4859.pdf",
      "https://incidecoder.com/products/the-ordinary-niacinamide-10-zinc-1-8",
      "https://www.skincarisma.com/products/the-ordinary/niacinamide-10-zinc-1"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Full 11-item INCI list matched consistently across a UK retailer ingredient data sheet (Next) and multiple ingredient-analysis aggregators."
    },
    "knownIssues": [],
    "note": "Label-stated actives: Niacinamide 10%, Zinc PCA (as zinc salt) 1%.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-hyaluronic-acid-2-b5",
    "brand": "The Ordinary",
    "name": "Hyaluronic Acid 2% + B5",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Sodium Hyaluronate",
      "Propanediol",
      "Pentylene Glycol",
      "Hydrolyzed Hyaluronic Acid",
      "Sodium Hyaluronate Crosspolymer",
      "Panthenol",
      "Trisodium Ethylenediamine Disuccinate",
      "Citric Acid",
      "Ethoxydiglycol",
      "Caprylyl Glycol",
      "Hexylene Glycol",
      "Ethylhexylglycerin",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4759.pdf",
      "https://www.gcimagazine.com/ingredients/launches-claims/article/21835566/read-the-label-the-ordinary-hyaluronic-acid-2-b5",
      "https://skinsort.com/products/the-ordinary/hyaluronic-acid-2-b5"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Opening and closing portions of the INCI list were cross-checked across a UK retailer data sheet, a trade-press ingredient breakdown, and an aggregator; the middle of the list (multiple HA molecular weights) was not fully captured by any single source."
    },
    "knownIssues": [
      "Sources show a truncated opening list (Next PDF) and a separate preservative/antioxidant tail (GCI Magazine); an older Skinsort listing shows some differing minor ingredients (e.g. Sodium Citrate, P-Anisic Acid, Tocopherol) suggesting a possible prior formula version."
    ],
    "note": "Label actives: Hyaluronic Acid complex 2%, Vitamin B5 (Panthenol).",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-granactive-retinoid-2-in-squalane",
    "brand": "The Ordinary",
    "name": "Granactive Retinoid 2% in Squalane",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": [
      "Squalane",
      "C12-15 Alkyl Benzoate",
      "Bisabolol",
      "Dimethyl Isosorbide",
      "Hydroxypinacolone Retinoate",
      "Solanum Lycopersicum (Tomato) Fruit Extract",
      "Simmondsia Chinensis (Jojoba) Seed Oil"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://thegroomingclinic.com/products/the-ordinary-granactive-retinoid-2-in-squalane-30ml",
      "https://secretskin.co.za/products/the-ordinary-granactive-retinoid-2-in-squalane-30ml"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Full ingredient list matched identically across two independent retailer product pages."
    },
    "knownIssues": [
      "One aggregator (Skinsort) flags this product as discontinued/superseded; it may have been replaced in the current range by newer Granactive Retinoid formats, so current availability is uncertain."
    ],
    "note": "Granactive Retinoid is the brand name for Hydroxypinacolone Retinoate, a retinoic acid ester, at 2% concentration in a squalane base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-aha-30-bha-2-peeling-solution",
    "brand": "The Ordinary",
    "name": "AHA 30% + BHA 2% Peeling Solution",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Glycolic Acid",
      "Aqua (Water)",
      "Lactic Acid",
      "Tartaric Acid",
      "Citric Acid",
      "Salicylic Acid",
      "Sodium Hyaluronate Crosspolymer",
      "Panthenol",
      "Daucus Carota Sativa (Carrot) Root Extract",
      "Tasmannia Lanceolata Fruit/Leaf Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/the-ordinary/aha-30-bha-2-peeling-solution",
      "https://incidecoder.com/products/the-ordinary-aha-30-bha-2-peeling-solution"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Core acid blend and order (glycolic acid first, water second) corroborated across a marketplace listing and an aggregator; full 13-item list not captured in full."
    },
    "knownIssues": [
      "INCIDecoder's listing for an older version is marked discontinued, with a separate 'current version' page noted but not retrieved; formula may have changed."
    ],
    "note": "Label actives: 30% AHA blend (mostly glycolic acid) + 2% salicylic acid (BHA); a 10-minute rinse-off peel.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-ascorbyl-glucoside-solution-12",
    "brand": "The Ordinary",
    "name": "Ascorbyl Glucoside Solution 12%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Ascorbyl Glucoside",
      "Propanediol",
      "Triethanolamine",
      "Aminomethyl Propanol",
      "Isoceteth-20",
      "Xanthan Gum",
      "Dimethyl Isosorbide",
      "Ethoxydiglycol",
      "Trisodium Ethylenediamine Disuccinate",
      "1,2-Hexanediol",
      "Caprylyl Glycol"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://well.ca/products/the-ordinary-ascorbyl-glucoside_129152.html",
      "https://www.skincarisma.com/products/the-ordinary/ascorbyl-glucoside-solution-12"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "12-item list from a retailer (Well.ca) matches the ingredient count reported by an aggregator (Skincarisma), though a third source (VeriMom) shows a slightly different partial order."
    },
    "knownIssues": [
      "A third source lists only 11 ingredients with a different lead order; minor discrepancy in ordering not fully resolved."
    ],
    "note": "Stable, water-soluble vitamin C derivative at 12%.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-azelaic-acid-suspension-10",
    "brand": "The Ordinary",
    "name": "Azelaic Acid Suspension 10%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Isodecyl Neopentanoate",
      "Dimethicone",
      "Azelaic Acid",
      "Dimethicone/Bis-Isobutyl PPG-20 Crosspolymer",
      "Dimethyl Isosorbide",
      "Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer",
      "Polysilicone-11",
      "Isohexadecane",
      "Tocopherol",
      "Trisodium Ethylenediamine Disuccinate",
      "Isoceteth-20",
      "Polysorbate 60",
      "Triethanolamine",
      "Ethoxydiglycol",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.beautybay.com/skincare/theordinary/azelaicacidsuspension10/",
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4914.pdf",
      "https://skinsort.com/products/the-ordinary/azelaic-acid-suspension-10"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Opening sequence matched identically across a UK retailer data sheet and Beauty Bay; tail-end preservatives/emulsifiers corroborated by an aggregator reporting the same 17-item count."
    },
    "knownIssues": [],
    "note": "Label active: Azelaic Acid 10%, suspended (not dissolved) in a silicone base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-lactic-acid-10-ha-2",
    "brand": "The Ordinary",
    "name": "Lactic Acid 10% + HA 2%",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Lactic Acid",
      "Glycerin",
      "Pentylene Glycol",
      "Propanediol",
      "Sodium Hydroxide",
      "Sodium Hyaluronate Crosspolymer",
      "Tasmannia Lanceolata Fruit/Leaf Extract",
      "Hydroxyethylcellulose",
      "Isoceteth-20",
      "Trisodium Ethylenediamine Disuccinate",
      "Ethylhexylglycerin",
      "1,2-Hexanediol",
      "Caprylyl Glycol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ozhairandbeauty.com/products/the-ordinary-lactic-acid-10-ha-2-30ml",
      "https://dermfnd.org/p/the-ordinary-lactic-acid-10-ha/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Opening portion of INCI (through Trisodium Ethylenediamine Disuccinate) corroborated by a retailer listing; preservative tail added from a separate retailer's key-ingredients section; full list not independently reconfirmed end-to-end."
    },
    "knownIssues": [
      "Retailer listing was truncated mid-list; ingredient counts reported elsewhere (15-19) are inconsistent."
    ],
    "note": "A superficial-peeling exfoliating serum; label actives Lactic Acid 10% + Hyaluronic Acid 2%.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-glycolic-acid-7-toning-solution",
    "brand": "The Ordinary",
    "name": "Glycolic Acid 7% Toning Solution",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycolic Acid",
      "Rosa Damascena Flower Water",
      "Centaurea Cyanus Flower Water",
      "Aloe Barbadensis Leaf Water",
      "Propanediol",
      "Glycerin",
      "Triethanolamine",
      "Aminomethyl Propanol",
      "Panax Ginseng Root Extract",
      "Tasmannia Lanceolata Fruit/Leaf Extract",
      "Polysorbate 20",
      "Gellan Gum",
      "Trisodium Ethylenediamine Disuccinate",
      "Sodium Chloride",
      "Hexylene Glycol",
      "Potassium Sorbate",
      "Sodium Benzoate",
      "1,2-Hexanediol",
      "Caprylyl Glycol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.beautybay.com/p/the-ordinary/glycolic-acid-7-toning-solution/",
      "https://www.cloud10beauty.com/en-pl/products/the-ordinary-glycolic-acid-7-toning-solution",
      "https://skinsort.com/products/the-ordinary/glycolic-acid-7-toning-solution"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only roughly 20 of a reported 42 total ingredients were retrievable, split across two retailer pages; most of the full INCI panel (e.g. remaining botanical extracts) could not be confirmed."
    },
    "knownIssues": [
      "Two aggregators report a 42-ingredient total INCI; only about half were found via available sources, so this list is a partial subset, not the complete panel."
    ],
    "note": "Label active: Glycolic Acid 7%; marketed as a toning/exfoliating solution with a botanical-water base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-salicylic-acid-2-solution",
    "brand": "The Ordinary",
    "name": "Salicylic Acid 2% Solution",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Saccharide Isomerate",
      "Cocamidopropyl Dimethylamine",
      "Salicylic Acid",
      "Hydroxyethylcellulose",
      "Polysorbate 20",
      "Citric Acid",
      "Sodium Citrate",
      "Sodium Hydroxide",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://new.verimom.com/products/the-ordinary-2-salicylic-acid-solution-2022",
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4782.pdf",
      "https://www.skincarisma.com/products/the-ordinary/salicylic-acid-2-solution"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "An 11-item list dated 2022 corroborated in part by a UK retailer data sheet showing the same emulsifiers/preservatives; a separate aggregator reports a different 14-ingredient count."
    },
    "knownIssues": [
      "Multiple sources disagree on ingredient count (11 vs 14) and a UK retailer's partial list appears to omit salicylic acid from the visible portion, suggesting this product may have been reformulated at some point; the version recorded here is the one most consistently reported (2022 listing)."
    ],
    "note": "Label active: Salicylic Acid 2%, described by brand as alcohol-free, fragrance-free.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-buffet",
    "brand": "The Ordinary",
    "name": "\"Buffet\"",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycerin",
      "Lactococcus Ferment Lysate",
      "Acetyl Hexapeptide-8"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://new.verimom.com/products/the-ordinary-the-ordinary-buffet-supersize-serum-60ml",
      "https://skinsort.com/products/the-ordinary/buffet"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Top 4 ingredients corroborated across two secondary sources reporting 45-51 total ingredients; the bulk of the long peptide/amino-acid/HA complex ingredient list was not captured."
    },
    "knownIssues": [
      "Sources report differing total ingredient counts (45 vs 51) between a standard-size and supersize listing, and reference a related product now called 'Buffet' + Copper Peptides 1%, so there is ambiguity about which exact formula/version is current."
    ],
    "note": "Multi-technology peptide serum; marketed as an anti-aging 'serum of serums' combining peptides, HA, and amino acids.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-retinol-0-5-in-squalane",
    "brand": "The Ordinary",
    "name": "Retinol 0.5% in Squalane",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": [
      "Squalane",
      "Caprylic/Capric Triglyceride",
      "Retinol",
      "Solanum Lycopersicum (Tomato) Fruit Extract",
      "Simmondsia Chinensis (Jojoba) Seed Oil",
      "BHT"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://thegroomingclinic.com/en-be/products/the-ordinary-retinol-0-5-in-squalane-30ml",
      "https://www.beautybay.com/p/the-ordinary/retinol-05-in-squalane/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Identical 6-item ingredient list matched across two independent retailer product pages."
    },
    "knownIssues": [],
    "note": "Label active: Retinol 0.5% in a squalane oil base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-vitamin-c-suspension-23-ha-spheres-2",
    "brand": "The Ordinary",
    "name": "Vitamin C Suspension 23% + HA Spheres 2%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Ascorbic Acid",
      "Sodium Hyaluronate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skincarisma.com/products/vitamin-c-suspension-23-ha-spheres-2",
      "https://cloud10beauty.com/products/the-ordinary-vitamin-c-suspension-23-ha-spheres-2"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the two named actives (ascorbic acid, sodium hyaluronate spheres) were confirmed by name; the full ordered INCI panel and oil-base carrier ingredients were not retrievable from available sources."
    },
    "knownIssues": [
      "Full INCI list not found; this is a water-free oil-suspension formula so the carrier/base ingredients are unknown."
    ],
    "note": "Label actives: 23% pure L-ascorbic acid powder suspended with 2% hyaluronic acid spheres in an anhydrous (oil) base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-mandelic-acid-10-ha",
    "brand": "The Ordinary",
    "name": "Mandelic Acid 10% + HA",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Propanediol",
      "Aqua (Water)",
      "Mandelic Acid",
      "Sodium Hyaluronate Crosspolymer"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://beautymasterlist.com/products/the-ordinary/mandelic-acid-10-ha",
      "https://dermfnd.org/p/the-ordinary-mandelic-acid-10-ha/",
      "https://www.skincarisma.com/products/the-ordinary/mandelic-acid-10-ha"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the first 3-4 of a reported 13 ingredients were retrievable, corroborated across two sources; the remaining ~9 ingredients were not found."
    },
    "knownIssues": [
      "Full 13-item INCI list not located via available sources."
    ],
    "note": "Label actives: Mandelic Acid 10% + crosslinked Hyaluronic Acid; marketed as a gentler AHA exfoliant.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-resveratrol-3-ferulic-acid-3",
    "brand": "The Ordinary",
    "name": "Resveratrol 3% + Ferulic Acid 3%",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Propanediol",
      "Resveratrol",
      "Ferulic Acid"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.beautybay.com/p/the-ordinary/resveratrol-3-ferulic-acid-3",
      "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-resveratrol-3-ferulic-acid-3.html",
      "https://incidecoder.com/products/the-ordinary-resveratrol-3-ferulic-acid-3"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Simple 3-ingredient water-free formula consistently reported identically by Beauty Bay, Adore Beauty, Sephora, and Well.ca."
    },
    "knownIssues": [
      "One Kenyan retailer listing (Portal Pharmacy) includes Aqua as an ingredient, contradicting the brand's water-free claim; likely a listing error."
    ],
    "note": "Water-free antioxidant serum; label actives Resveratrol 3% + Ferulic Acid 3%.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-argireline-solution-10",
    "brand": "The Ordinary",
    "name": "Argireline Solution 10%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Propanediol",
      "Acetyl Hexapeptide-8",
      "Trisodium Ethylenediamine Disuccinate",
      "Gellan Gum",
      "Sodium Chloride",
      "Isoceteth-20",
      "Potassium Sorbate",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://new.verimom.com/products/the-ordinary-argireline-solution-10",
      "https://beautymasterlist.com/products/the-ordinary/argireline-solution-10/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "10-11 item list matched across two sources, with one minor solvent-naming discrepancy (Dimethyl Isosorbide vs Ethoxydiglycol) in a third source."
    },
    "knownIssues": [
      "A third retailer (The Grooming Clinic) lists Ethoxydiglycol in place of Dimethyl Isosorbide at one position; two of three sources agree on Dimethyl Isosorbide."
    ],
    "note": "Label active is marketed as 'Argireline' (commonly Acetyl Hexapeptide-3) but INCI on retailer listings reads Acetyl Hexapeptide-8; naming discrepancy unresolved.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-caffeine-solution-5-egcg",
    "brand": "The Ordinary",
    "name": "Caffeine Solution 5% + EGCG",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Caffeine",
      "Propanediol",
      "Glycerin",
      "Maltodextrin",
      "Epigallocatechin Gallate",
      "Sodium Hyaluronate",
      "Glycine Soja (Soybean) Seed Extract",
      "Urea",
      "Tocophersolan",
      "Hydroxyethylcellulose",
      "Poloxamer 235",
      "Poloxamer 338",
      "Xanthan Gum",
      "Lactic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.beautybay.com/p/the-ordinary/caffeine-solution-5-egcg",
      "https://new.verimom.com/products/the-ordinary-caffeine-solution-5-egcg",
      "https://skinsort.com/products/the-ordinary/caffeine-solution-5-egcg"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Core actives (water, caffeine, glycerin, maltodextrin, EGCG) agreed on across three sources, but total ingredient counts reported range from 14 to 27, with differing minor ingredients and preservatives."
    },
    "knownIssues": [
      "Significant disagreement between sources on total ingredient count (Beauty Bay ~15, VeriMom 27, Skinsort 25) and on EGCG's exact INCI form (Epigallocatechin Gallate vs. Epigallocatechin Gallatyl Glucoside); this eye-area serum formula may have been reformulated."
    ],
    "note": "Marketed as an eye-contour serum; label actives Caffeine 5% + EGCG (green tea extract component).",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-squalane-cleanser",
    "brand": "The Ordinary",
    "name": "Squalane Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Squalane",
      "Aqua (Water)",
      "Coco-Caprylate/Caprate",
      "Glycerin",
      "Sucrose Stearate",
      "Ethyl Macadamiate",
      "Caprylic/Capric Triglyceride",
      "Sucrose Laurate",
      "Hydrogenated Starch Hydrolysate",
      "Sucrose Dilaurate",
      "Sucrose Trilaurate",
      "Polyacrylate",
      "Isoceteth-20",
      "Sodium Polyacrylate",
      "Tocopherol",
      "Trisodium Ethylenediamine Disuccinate",
      "Malic Acid",
      "Ethylhexylglycerin",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://blog.myer.com.au/p/the-ordinary-squalane-cleanser-50ml",
      "https://skinsort.com/products/the-ordinary/squalane-cleanser",
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4865.pdf"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Opening sequence (squalane, water, coco-caprylate/caprate, glycerin) confirmed by a UK retailer data sheet; fuller ingredient list compiled from a Myer listing plus a Skinsort tail, totaling fewer than the ~20 ingredients an aggregator reports, so some middle ingredients may be missing."
    },
    "knownIssues": [
      "Skincarisma reports 20 total ingredients; the compiled list here may be missing one or two minor ingredients."
    ],
    "note": "An oil-based, balm-to-oil facial cleanser built on a squalane/sucrose-ester base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-100-plant-derived-squalane",
    "brand": "The Ordinary",
    "name": "100% Plant-Derived Squalane",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Squalane"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsignal.com/products/the-ordinary-100-plant-derived-squalane",
      "https://incidecoder.com/products/the-ordinary-100-plant-derived-squalane",
      "https://skinsort.com/products/the-ordinary/100-plant-derived-squalane"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Single-ingredient formula (squalane only) confirmed identically across three independent aggregators."
    },
    "knownIssues": [
      "Sourcing of the squalane (sugarcane vs. olive-derived) is described inconsistently across retailer FAQs; doesn't affect the INCI name itself."
    ],
    "note": "A 100% squalane facial oil, plant-derived (brand states sugarcane-derived).",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-natural-moisturizing-factors-ha",
    "brand": "The Ordinary",
    "name": "Natural Moisturizing Factors + HA",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Caprylic/Capric Triglyceride",
      "Cetyl Alcohol",
      "Propanediol",
      "Stearyl Alcohol",
      "Glycerin",
      "Sodium Hyaluronate",
      "Arginine",
      "Aspartic Acid",
      "Glycine",
      "Alanine",
      "Serine",
      "Valine",
      "Isoleucine",
      "Proline",
      "Threonine",
      "Sodium PCA",
      "Sodium Lactate",
      "Histidine",
      "Phenylalanine",
      "Citric Acid",
      "Trisodium Ethylenediamine Disuccinate",
      "Pentylene Glycol",
      "Triethanolamine",
      "Sodium Hydroxide",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4861.pdf",
      "https://www.gopicky.com/discussion/134257/the-ordinary-natural-moisturizing-factors-ha",
      "https://shopee.sg/THE-ORDINARY-Natural-Moisturizing-Factors-HA-30ml-100ml-i.172185419.2764812902"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Opening amino-acid/NMF sequence and preservative tail corroborated across a UK retailer data sheet, a community ingredient breakdown, and a marketplace listing; roughly 27 of a reported 45-46 total ingredients compiled."
    },
    "knownIssues": [
      "Aggregators report 45-46 total ingredients; about 19-20 are not accounted for here. One aggregator claims 'urea' is present, which is not corroborated by the other sources."
    ],
    "note": "A moisturizer built around skin's Natural Moisturizing Factors (amino acids, sodium PCA) plus hyaluronic acid.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-alpha-arbutin-2-ha",
    "brand": "The Ordinary",
    "name": "Alpha Arbutin 2% + HA",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Alpha-Arbutin",
      "Hydrolyzed Sodium Hyaluronate",
      "Ethoxydiglycol",
      "Lactic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/the-ordinary-alpha-arbutin-2-ha-2",
      "https://skinsort.com/products/the-ordinary/alpha-arbutin-2-ha"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only 5 of a reported 12 total ingredients were individually confirmed by name (water, alpha-arbutin, hydrolyzed sodium hyaluronate, ethoxydiglycol, lactic acid) across two aggregators; the remaining ~7 were not retrievable."
    },
    "knownIssues": [
      "Full ordered 12-item INCI list not located via available sources."
    ],
    "note": "Label actives: Alpha Arbutin 2% (a tyrosinase-inhibiting brightening agent) + Hyaluronic Acid.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-mineral-uv-filters-spf-30-with-antioxidants",
    "brand": "The Ordinary",
    "name": "Mineral UV Filters SPF 30 with Antioxidants",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Cyclopentasiloxane",
      "Glycerin",
      "Zinc Oxide"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/the-ordinary/mineral-uv-filters-spf-30-with-antioxidants",
      "https://www.refinery29.com/en-gb/2018/06/202977/the-ordinary-suncare-spf",
      "https://www.beautybay.com/p/the-ordinary/mineral-uv-filters-spf-30-with-antioxidants"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the opening few ingredients and the zinc-oxide mineral filter were confirmed across sources reporting a 62-ingredient total; most of the formula (including antioxidant complex) was not retrievable."
    },
    "knownIssues": [
      "Listed as discontinued by multiple retailers (Skinsort, Well.ca); treated here as a recently-discontinued product per research scope. Full 62-ingredient INCI not found."
    ],
    "note": "A 100% mineral (zinc oxide-based) SPF 30 sunscreen with antioxidants; recently discontinued/delisted at several retailers.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-glucoside-foaming-cleanser",
    "brand": "The Ordinary",
    "name": "Glucoside Foaming Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Decyl Glucoside",
      "Coco Glucoside",
      "Xanthan Gum",
      "Tocopherol",
      "Phytic Acid",
      "Benzyl Alcohol",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4783.pdf",
      "https://sephora.com/product/the-ordinary-glucoside-foaming-cleanser-P505274",
      "https://skinsort.com/products/the-ordinary/glucoside-foaming-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Full 8-item INCI list matched identically across a UK retailer data sheet, Sephora's listing, and an aggregator."
    },
    "knownIssues": [],
    "note": "A gentle, sulfate-free foaming gel cleanser; described by an aggregator as fungal-acne (malassezia) safe.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-retinal-0-2-emulsion",
    "brand": "The Ordinary",
    "name": "Retinal 0.2% Emulsion",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Coco-Caprylate/Caprate",
      "Propanediol",
      "Pentylene Glycol",
      "Hydroxyapatite",
      "Retinal",
      "Cetylhydroxyproline Palmitamide",
      "4-T-Butylcyclohexanol",
      "Hydroxyphenyl Propamidobenzoic Acid",
      "Ergothioneine",
      "Biosaccharide Gum-1",
      "Isoceteth-20",
      "Polysorbate 60",
      "Ascorbyl Palmitate",
      "Tocopherol",
      "Lactic Acid",
      "Sodium Lactate",
      "Sodium Hydroxide",
      "Ethylhexylglycerin",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.brownthomas.com/beauty/skincare/serums-treatments/retinal-0.2-emulsion/2000758164.html",
      "https://skinsort.com/products/the-ordinary/retinal-0-2-emulsion",
      "https://ozhairandbeauty.com/products/the-ordinary-retinal-0-2-emulsion-15ml"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Opening and closing portions of the INCI (together about 20 of a reported 32 ingredients) corroborated across a retailer (Brown Thomas) and two aggregators (Skinsort, Ozhair); the middle of the list was not fully captured."
    },
    "knownIssues": [
      "About 12 of a reported 32 total ingredients are missing from this compiled list."
    ],
    "note": "Label active: Retinaldehyde (Retinal) 0.2%, a stronger-acting retinoid than retinol, in an emulsion base.",
    "verifiedDate": null
  },
  {
    "id": "cat-the-ordinary-multi-peptide-ha-serum",
    "brand": "The Ordinary",
    "name": "Multi-Peptide + HA Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycerin",
      "Lactococcus Ferment Lysate",
      "Acetyl Hexapeptide-8",
      "Pentapeptide-18",
      "Palmitoyl Tripeptide-1",
      "Sodium Hyaluronate",
      "Trisodium Ethylenediamine Disuccinate",
      "Ethoxydiglycol",
      "Sodium Benzoate",
      "Caprylyl Glycol",
      "Ethylhexylglycerin",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4896.pdf",
      "https://xcdn.next.co.uk/pdfs/ingredients/AF4819.pdf",
      "https://cloud10beauty.com/products/the-ordinary-buffet"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Opening peptide sequence and closing preservative system corroborated across two UK retailer data sheets; a reported total of 51 ingredients means most of the full list (additional peptides/amino acids) was not retrievable."
    },
    "knownIssues": [
      "This product appears to be the current retail name for the serum previously sold as 'Buffet' (The Ordinary's own Japan product page and a Cloud10 Beauty listing both equate 'Multi-Peptide + HA Serum' with 'Buffet'); listed here as a separate entry since it is the currently-marketed name, but may represent the same formula rather than a distinct product. A separate peptide, Palmitoyl Tripeptide-38, is named by one aggregator but not corroborated elsewhere."
    ],
    "note": "Likely the rebranded/current-naming version of the discontinued 'Buffet' serum; multi-peptide + hyaluronic acid anti-aging serum.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-skin-perfecting-2-bha-liquid-exfoliant",
    "brand": "Paula's Choice",
    "name": "Skin Perfecting 2% BHA Liquid Exfoliant",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": [
      "Water (Aqua)",
      "Methylpropanediol",
      "Butylene Glycol",
      "Salicylic Acid",
      "Polysorbate 20",
      "Camellia Oleifera (Green Tea) Leaf Extract",
      "Sodium Hydroxide",
      "Tetrasodium EDTA"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/paula-s-choice-skin-perfecting-2-bha-liquid-exfoliant-118ml/11174178.html",
      "https://skinsignal.com/products/paulas-choice-skin-perfecting-2-bha-liquid-exfoliant",
      "https://incidecoder.com/products/paulas-choice-skin-perfecting-2-bha-liquid-exfoliant"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "high",
      "summary": "Full 8-item US-formula INCI list matched exactly between Dermstore's retailer listing and an aggregator (Skinsignal) reporting the same 8-ingredient count."
    },
    "knownIssues": [
      "An EU version is reported to have 9 ingredients (one more than the US formula); the EU-specific ingredient was not identified."
    ],
    "note": "Label active: Salicylic Acid (BHA) 2%. This is the flagship Paula's Choice exfoliant, the US formula.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-skin-perfecting-8-aha-gel-exfoliant",
    "brand": "Paula's Choice",
    "name": "Skin Perfecting 8% AHA Gel Exfoliant",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Glycolic Acid",
      "Water (Aqua)",
      "Panthenol",
      "Sodium Hydroxide",
      "Hydroxyethylcellulose",
      "Polyquaternium-10",
      "Phenoxyethanol",
      "Sodium Benzoate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.paulaschoice.com.au/products/skin-perfecting-8-aha-gel-exfoliant",
      "https://dermfnd.org/p/paulas-choice-8-aha-gel-exfoliant/",
      "https://www.skincarisma.com/products/paula-s-choice/skin-perfecting-8-aha-gel-exfoliant"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "About 8 of a reported 15 ingredients corroborated across the brand's Australian regional site, an aggregator, and a secondary ingredient-education site; roughly 7 ingredients remain unconfirmed."
    },
    "knownIssues": [
      "Full 15-ingredient list not located; some sources' snippets could not confirm whether butylene glycol is part of this specific product vs. a related one."
    ],
    "note": "Label active: Glycolic Acid (AHA) 8%, gel-textured leave-on exfoliant.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-calm-redness-relief-cleanser-normal-to-oily-skin",
    "brand": "Paula's Choice",
    "name": "CALM Redness Relief Cleanser (Normal to Oily Skin)",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Butylene Glycol",
      "Disodium Cocoamphodiacetate",
      "Coco-Glucoside",
      "Allantoin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://irosacea.org/store/product/78-paulas-choice-calm-redness-relief-cleanser-with-aloe-for-normal-to-oily-skin/",
      "https://incidecoder.com/products/paulas-choice-calm-redness-relief-cleanser-for-normal-to-oily-skin",
      "https://skinsort.com/products/paula-s-choice/calm-redness-relief-cleanser-for-normal-to-oily-skin"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A handful of ingredients (water, butylene glycol, mild surfactants, allantoin) corroborated across a rosacea patient-resource site and brief aggregator mentions; sources report 19-26 total ingredients, so most of the formula is unconfirmed."
    },
    "knownIssues": [
      "Sources give conflicting total ingredient counts (19 vs 24-26) possibly reflecting different sub-variants (Normal to Oily vs Normal to Dry) or formula updates; full list not located."
    ],
    "note": "Fragrance-free, gentle cleanser formulated for rosacea-prone/sensitive, redness-prone skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-calm-redness-relief-moisturizer-normal-to-oily-skin",
    "brand": "Paula's Choice",
    "name": "CALM Redness Relief Moisturizer (Normal to Oily Skin)",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free",
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Sodium Hyaluronate",
      "Glycyrrhiza Glabra (Licorice) Root Extract",
      "Allantoin",
      "Avena Sativa (Oat) Kernel Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/paulas-choice-calm-redness-moisturizer",
      "https://skinsort.com/products/paula-s-choice/calm-redness-relief-moisturizer-for-normal-to-oily-skin",
      "https://dermfnd.org/p/paulas-choice-calm-redness-relief-moisturizer/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Key soothing actives (sodium hyaluronate, licorice root, allantoin, oat kernel extract) named across an aggregator and a review site; the ordered full INCI list (reported at 26-40 ingredients depending on variant) was not retrievable."
    },
    "knownIssues": [
      "Sold in Normal to Oily and Normal to Dry variants with differing ingredient counts (26 vs 40 reported); full list not located for either."
    ],
    "note": "Fragrance-free moisturizer from the CALM line for redness-prone/sensitive skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-clinical-1-retinol-treatment",
    "brand": "Paula's Choice",
    "name": "Clinical 1% Retinol Treatment",
    "catalogCategory": "retinoid",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Retinol",
      "Arachidyl Alcohol",
      "Sclerotium Gum",
      "Carbomer",
      "Palmitoyl Tetrapeptide-7",
      "Palmitoyl Hexapeptide-12",
      "Palmitoyl Tripeptide-1",
      "Avena Sativa (Oat) Kernel Extract",
      "Glycyrrhiza Glabra (Licorice) Root Extract",
      "Phenoxyethanol",
      "Benzoic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/p/paula-s-choice-clinical-1-retinol-treatment-30ml/11174243/",
      "https://www.cloud10beauty.com/nl-be/products/paula-s-choice-clinical-1-retinol-treatment",
      "https://skinskoolbeauty.com/product/paulas-choice/clinical-1-retinol-treatment-4c813917"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A retailer listing, a European retailer's key-ingredients note, and a skincare-education site together named about 11 of a reported 53 total ingredients; the great majority of the formula is unconfirmed."
    },
    "knownIssues": [
      "Only a small fraction (~11 of 53) of the reported ingredient panel was retrievable via available sources; this entry is significantly incomplete."
    ],
    "note": "Label active: Retinol 1%, formulated with peptides and soothing botanical extracts (oat kernel, licorice root).",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-10-niacinamide-booster",
    "brand": "Paula's Choice",
    "name": "10% Niacinamide Booster",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Niacinamide",
      "Acetyl Glucosamine",
      "Ascorbyl Glucoside",
      "Butylene Glycol",
      "Phospholipids",
      "Sodium Hyaluronate",
      "Xanthan Gum",
      "Disodium EDTA",
      "Ethylhexylglycerin",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/paula-s-choice-resist-10-niacinamide-booster-20ml/11316245.html",
      "https://www.gcimagazine.com/brands-products/skin-care/news/21855532/paulas-choice-introduced-a-niacinamide-boost",
      "https://www.skincarisma.com/products/paula-s-choice/10-niacinamide-booster-4b090606-80a1-4213-ba82-a52249190a7f"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "11 of a reported 25 ingredients corroborated across a retailer listing and a trade-press ingredient note; remaining ~14 minor ingredients not retrievable."
    },
    "knownIssues": [
      "Full 25-ingredient panel not located; also sold/labeled under a 'RESIST' sub-branding in some listings for the same product."
    ],
    "note": "Label active: Niacinamide (Vitamin B3) 10%, a concentrated 'booster' meant to be mixed into other products or used alone.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-10-azelaic-acid-booster",
    "brand": "Paula's Choice",
    "name": "10% Azelaic Acid Booster",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Azelaic Acid",
      "C12-15 Alkyl Benzoate",
      "Caprylic/Capric Triglyceride",
      "Methyl Glucose Sesquistearate",
      "Glycerin",
      "Cetearyl Alcohol",
      "Glyceryl Stearate",
      "Dimethicone",
      "Salicylic Acid",
      "Adenosine",
      "Allantoin",
      "Bisabolol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://dermfnd.org/p/paulas-choice-azelaic-acid-booster/",
      "https://dermfnd.org/p/paula-s-choice-10-azelaic-acid-booster/",
      "https://www.niche-beauty.com/en-pl/products/paulas-choice-10-azelaic-acid-booster/479-058"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "About 13 of a reported 21 ingredients corroborated across two educational/ingredient-breakdown sources and a European retailer, with overlapping opening sequence (water, azelaic acid, C12-15 alkyl benzoate); ~8 remaining ingredients not located."
    },
    "knownIssues": [
      "Full 21-ingredient list not located via available sources."
    ],
    "note": "Label actives: Azelaic Acid 10% + Salicylic Acid 0.5%.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-c15-super-booster",
    "brand": "Paula's Choice",
    "name": "C15 Super Booster",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Ascorbic Acid",
      "Butylene Glycol",
      "Ethoxydiglycol",
      "Glycerin",
      "PPG-26-Buteth-26",
      "PEG-40 Hydrogenated Castor Oil",
      "Pentylene Glycol",
      "Phenoxyethanol",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosmeterie.com/paulas-choice/c15-super-booster",
      "https://incidecoder.com/products/paulas-choice-c15-super-booster-updated-formula",
      "https://skinsort.com/products/paula-s-choice/c15-super-booster"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A near-complete list for what appears to be an earlier formula was found via one EU retailer (Cosmeterie); a separate source confirms the product has since been reformulated ('updated formula'), with only a few ingredients of the current version (sodium hydroxide, citric acid, ergothioneine, phenoxyethanol) confirmed."
    },
    "knownIssues": [
      "The brand explicitly reformulated this product; the list recorded here is the older/original formula most consistently reported, and may not match current bottles. Current ('updated') formula ingredients are only partially known."
    ],
    "note": "Label active: 15% L-ascorbic acid (vitamin C). Reformulated at least once; treat ingredient list as potentially outdated.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-resist-daily-pore-refining-treatment-with-2-bha",
    "brand": "Paula's Choice",
    "name": "RESIST Daily Pore-Refining Treatment With 2% BHA",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Salicylic Acid",
      "Disodium EDTA"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.paulaschoice.com.au/products/resist-daily-pore-refining-treatment-with-2-bha",
      "https://www.skincarisma.com/products/paula-s-choice/daily-pore-refining-treatment-with-2-bha",
      "https://whatsinmyjar.com/product/paulas-choice-resist-daily-pore-refining-treatment-with-2-bha"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the headline active (salicylic acid 2%) and one chelating agent were confirmed across sources reporting a 28-ingredient EU formula; the great majority of the formula was not retrievable."
    },
    "knownIssues": [
      "Product is sometimes marketed as 'Advanced Pore-Refining Treatment' in comparison listings but the brand's own regional site names it 'Daily Pore-Refining Treatment With 2% BHA'; a related 4% BHA version also exists. Full ingredient list not found."
    ],
    "note": "Label active: Salicylic Acid (BHA) 2%, also contains peptides, hyaluronic acid and antioxidants per brand description.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-resist-super-antioxidant-concentrate-serum",
    "brand": "Paula's Choice",
    "name": "RESIST Super Antioxidant Concentrate Serum",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Elaeis Guineensis (Palm) Oil",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.paulaschoice.com.au/products/resist-super-antioxidant-serum",
      "https://skinsort.com/products/paula-s-choice/resist-super-antioxidant-serum",
      "https://www.cosmeterie.com/paulas-choice/resist-super-antioxidant-concentrate-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only two ingredients could be confirmed by name from available sources, against a reported total of 25; essentially most of the formula is unconfirmed."
    },
    "knownIssues": [
      "Very little of the INCI panel was retrievable; a related 'Ultra-Light' variant (reported 28 ingredients, now discontinued) may be confused with this one in some retailer listings."
    ],
    "note": "Brand describes it as containing a broad range of plant- and vitamin-derived antioxidants; exact actives/percentages not independently confirmed.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-clear-extra-strength-daily-skin-clearing-treatment-with-5-benzoyl-peroxide",
    "brand": "Paula's Choice",
    "name": "CLEAR Extra Strength Daily Skin Clearing Treatment With 5% Benzoyl Peroxide",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Benzoyl Peroxide",
      "Water (Aqua)",
      "Glycerin",
      "Propanediol",
      "Sodium Hyaluronate",
      "Bisabolol",
      "Carbomer",
      "Ammonium Acryloyldimethyltaurate/VP Copolymer",
      "Xanthan Gum",
      "Sodium Hydroxide",
      "Phenoxyethanol",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://beautymasterlist.com/products/paula-s-choice/extra-strength-daily-skin-clearing-treatment-with-5-benzoyl-peroxide",
      "https://skinsignal.com/products/paulas-choice-clear-extra-strength-daily-skin-clearing-treatment-with-5-benzoyl-peroxide",
      "https://www.dermstore.com/p/paula-s-choice-clear-extra-strength-daily-skin-clearing-treatment/11289041"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A 12-item ingredient list from one aggregator (Beauty Master List) corroborated by a Dermstore retailer description naming the same soothing agents; a separate aggregator reports a 14-ingredient total, suggesting 1-2 ingredients may be missing."
    },
    "knownIssues": [
      "Dermstore's listing mentions allantoin as a soothing ingredient, which does not appear in the Beauty Master List version (which lists bisabolol instead); possible discrepancy between sources."
    ],
    "note": "Label active: Benzoyl Peroxide 5%, leave-on acne treatment.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-weightless-body-treatment-with-2-bha",
    "brand": "Paula's Choice",
    "name": "Weightless Body Treatment with 2% BHA",
    "catalogCategory": "exfoliant",
    "tags": [
      "body"
    ],
    "region": null,
    "ingredients": [
      "Salicylic Acid",
      "Epilobium Angustifolium Extract",
      "Vanilla Planifolia Fruit Extract",
      "Hexylene Glycol",
      "Caprylyl Glycol",
      "Sodium Hydroxide",
      "Ethylhexylglycerin",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.paulaschoice.com.au/products/weightless-body-treatment-with-2-bha",
      "https://www.cloud10beauty.com/fr-fr/products/paula-s-choice-resist-weightless-body-treatment-2-bha",
      "https://skinsort.com/products/paula-s-choice/weightless-body-treatment-2-bha"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A handful of ingredients (active plus a few botanicals and the preservative/pH system) confirmed across the brand's regional site and a retailer, against a reported 29-ingredient total; most of the formula not retrievable."
    },
    "knownIssues": [
      "An INCIDecoder entry marks an older version discontinued with a note pointing to a newer current version; formula may have changed."
    ],
    "note": "Label active: Salicylic Acid (BHA) 2%, a body lotion for rough, bumpy skin (e.g. keratosis pilaris-prone areas).",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-omega-complex-moisturizer",
    "brand": "Paula's Choice",
    "name": "Omega+ Complex Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Butyrospermum Parkii (Shea) Butter",
      "Butylene Glycol",
      "Sodium Lauroyl Lactylate",
      "Phenoxyethanol",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/paulas-choice-omega-complex-moisturizer",
      "https://skinsort.com/products/paula-s-choice/omega-complex-moisturizer",
      "https://www.cloud10beauty.com/products/paulas-choice-omega-complex-moisturizer"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only about 6 of a reported 54 total ingredients were retrievable across an aggregator, a retailer, and INCIDecoder; the great majority of this large formula is unconfirmed."
    },
    "knownIssues": [
      "Full 54-ingredient panel not located; brand describes the formula as built on chia and flaxseed oils plus passionfruit and guava extracts, none of which were independently confirmed by INCI name."
    ],
    "note": "Moisturizer built around an omega fatty-acid complex (chia/flaxseed oils) for dry, compromised skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-hyaluronic-acid-booster",
    "brand": "Paula's Choice",
    "name": "Hyaluronic Acid Booster",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Glycerin",
      "Sodium Hyaluronate",
      "Panthenol",
      "Phytosphingosine",
      "Citric Acid",
      "Polysorbate 20",
      "Ethylhexylglycerin",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/paula-s-choice/hyaluronic-acid-booster",
      "https://skinsignal.com/products/paulas-choice-hyaluronic-acid-booster",
      "https://incidecoder.com/products/paulas-choice-hyaluronic-acid-booster"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Core hydrating ingredients corroborated across three aggregators, though total ingredient count disagrees (20 vs 22), and one source flags a discontinued older-formula version."
    },
    "knownIssues": [
      "An older/discontinued INCIDecoder entry exists alongside a 'current version' page, raising the possibility of reformulation; exact full ordered list not confirmed."
    ],
    "note": "A concentrated hyaluronic acid 'booster' serum meant to be mixed into other products.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-skin-balancing-pore-reducing-toner",
    "brand": "Paula's Choice",
    "name": "Skin Balancing Pore-Reducing Toner",
    "catalogCategory": "toner",
    "tags": [
      "fragrance-free",
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Aqua (Water)",
      "Glycerin",
      "Butylene Glycol",
      "Niacinamide",
      "Polysorbate 20",
      "Adenosine",
      "Anthemis Nobilis Flower Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/paula-s-choice/skin-balancing-pore-reducing-toner/us",
      "https://www.cosmeterie.com/paulas-choice/pore-reducing-toner",
      "https://www.dermstore.com/p/paula-s-choice-skin-balancing-pore-reducing-toner-190ml/11174171/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Opening ingredients (water, glycerin, butylene glycol, niacinamide) agreed between a US aggregator listing and an EU retailer listing, but the EU list is shorter than the US-reported 26-ingredient total, so this is a partial, possibly region-mixed list."
    },
    "knownIssues": [
      "US version reported at 26 ingredients; EU retailer listing shows only 7, suggesting a formulation or labeling difference between regions that wasn't fully resolved."
    ],
    "note": "Label active: Niacinamide 1%; alcohol-free pore-minimizing toner for oily/combination skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-resist-anti-aging-clear-skin-hydrator",
    "brand": "Paula's Choice",
    "name": "RESIST Anti-Aging Clear Skin Hydrator",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-oily-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Cyclopentasiloxane",
      "Glucose",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/paula-s-choice/resist-anti-aging-clear-skin-hydrator",
      "https://www.dermstore.com/paula-s-choice-resist-anti-aging-clear-skin-hydrator-50ml/11174221.html",
      "https://www.skincarisma.com/products/paula-s-choice/paula-s-choice-resist-anti-aging-clear-skin-hydrator/ingredient_list"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only 4 of a reported 29 ingredients were retrievable from an aggregator and a retailer listing; most of the formula (including the niacinamide and vitamin C actives the brand mentions) was not independently confirmed."
    },
    "knownIssues": [
      "This product does not carry SPF itself (retailer copy explicitly instructs pairing it with a separate SPF 30+ sunscreen); it should not be confused with the brand's SPF-containing 'Defense Essential Glow Moisturizer SPF 30' or 'Resist Super-Light Wrinkle Defense SPF 30'."
    ],
    "note": "A lightweight, oil-free anti-aging moisturizer for normal-to-oily, breakout-prone skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-skin-perfecting-25-aha-2-bha-exfoliant-peel",
    "brand": "Paula's Choice",
    "name": "Skin Perfecting 25% AHA + 2% BHA Exfoliant Peel",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Glycolic Acid",
      "Lactic Acid",
      "Mandelic Acid",
      "Salicylic Acid",
      "Tartaric Acid",
      "Malic Acid",
      "Tin Oxide",
      "Clitoria Ternatea (Butterfly Pea) Flower Extract",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosmeterie.com/paulas-choice/skin-perfecting-25-aha-2-bha-exfoliant-peeling",
      "https://incidecoder.com/products/paulas-choice-skin-perfecting-25-aha-2-bha-exfoliant-peel",
      "https://www.kohls.com/product/prd-5054632/paulas-choice-skin-perfecting-25-aha-2-bha-exfoliant-peel.jsp"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Acid blend and exact label percentages (8.4% glycolic, 7.1% lactic, 5% mandelic, 2.5% tartaric, 2% malic, 2% salicylic) corroborated identically across two EU retailer sources; additional ingredients (tin oxide, butterfly pea flower) confirmed via a US retailer and INCIDecoder, against a reported 26-ingredient total."
    },
    "knownIssues": [
      "About 16 of 26 reported total ingredients remain unconfirmed (e.g. hyaluronic acid, vitamin E mentioned by an aggregator but not independently verified by name/order)."
    ],
    "note": "Label actives: a 25% AHA blend (glycolic/lactic/mandelic/tartaric/malic acids) + 2% salicylic acid (BHA); an at-home 10-minute peel.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-resist-daily-smoothing-treatment-with-5-aha",
    "brand": "Paula's Choice",
    "name": "RESIST Daily Smoothing Treatment With 5% AHA",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Glycolic Acid",
      "Hexylene Glycol",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/p/paula-s-choice-resist-daily-smoothing-treatment-with-5-aha-50ml/11174217/",
      "https://skinsort.com/products/paula-s-choice/daily-smoothing-treatment-with-5-aha",
      "https://niche-beauty.com/en-de/products/paulas-choice-resist-daily-smoothing-treatment-with-5-aha/479-049"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the headline AHA active and two minor ingredients were confirmed across a US retailer and a European retailer listing; most of the formula was not retrievable."
    },
    "knownIssues": [
      "A related, higher-strength product ('RESIST Weekly Resurfacing Treatment with 10% AHA') is now discontinued per a retailer listing; the 5% daily version researched here remains current. No '20% AHA' version of this product line was found to exist."
    ],
    "note": "Label active: Glycolic Acid (AHA) 5%, a daily-use exfoliating moisturizer-treatment for dry/aging skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-clear-pore-normalizing-cleanser",
    "brand": "Paula's Choice",
    "name": "CLEAR Pore Normalizing Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Salicylic Acid",
      "Panthenol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.dermstore.com/paula-s-choice-clear-pore-normalizing-cleanser/11486957.html",
      "https://www.gopicky.com/product/34749/paula-s-choice-clear-pore-normalizing-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the headline active (salicylic acid 0.5%) and one soothing ingredient (panthenol) confirmed across a retailer and a review aggregator; the full surfactant-base ingredient list was not retrievable."
    },
    "knownIssues": [
      "Note: the product name is 'CLEAR Pore Normalizing Cleanser' (a face wash), not a toner; a related but distinct product, 'Skin Balancing Pore-Reducing Toner' (recorded separately), is the toner-format product in the pore-focused line."
    ],
    "note": "Label active: Salicylic Acid 0.5%, a daily foaming cleanser for oily/acne-prone skin.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-defense-essential-glow-moisturizer-spf-30",
    "brand": "Paula's Choice",
    "name": "DEFENSE Essential Glow Moisturizer SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Polyacrylamide",
      "Ceteareth-20",
      "Aluminum Stearate",
      "Laureth-7",
      "Ethylhexylglycerin",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosmeterie.com/paulas-choice/defense-essential-glow-moisturizer-spf-30",
      "https://beautymasterlist.com/products/paula-s-choice/defense-essential-glow-moisturizer-spf-30",
      "https://skinsort.com/products/paula-s-choice/defense-essential-glow-moisturizer-spf-30"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A 6-ingredient emulsifier/preservative fragment from an EU retailer plus mineral-filter percentages from one aggregator were combined; a reported 45-ingredient total means most of the formula (including the stated vitamin C/niacinamide antioxidants) is unconfirmed."
    },
    "knownIssues": [
      "Zinc oxide (6.12%) and titanium dioxide (5.25%) percentages come from a single aggregator (Beauty Master List) and were not cross-confirmed by a second independent source."
    ],
    "note": "A mineral (zinc oxide/titanium dioxide) SPF 30 moisturizer with brightening antioxidants, per brand description.",
    "verifiedDate": null
  },
  {
    "id": "cat-paula-s-choice-resist-retinol-skin-smoothing-body-treatment",
    "brand": "Paula's Choice",
    "name": "RESIST Retinol Skin-Smoothing Body Treatment",
    "catalogCategory": "other",
    "tags": [
      "body"
    ],
    "region": null,
    "ingredients": [
      "Water (Aqua)",
      "Retinol",
      "Butyrospermum Parkii (Shea Butter)",
      "Disodium EDTA",
      "Chlorphenesin",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/paulas-choice-resist-retinol-skin-smoothing-body-treatment",
      "https://www.desertcart.pl/products/1087396",
      "https://www.trendhunter.com/trends/retinol-body"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A handful of ingredients (water, retinol, shea butter, chelator, preservatives) confirmed across INCIDecoder and a marketplace listing; a reported 31-ingredient total (also including vitamin C and vitamin E) means most of the formula is unconfirmed."
    },
    "knownIssues": [
      "Full 31-ingredient list not located via available sources."
    ],
    "note": "Label active: Retinol 0.1%, a body lotion for rough/bumpy skin; also contains Vitamin C and E per brand marketing.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-niacinamide-serum-12-zinc-2",
    "brand": "Naturium",
    "name": "Niacinamide Serum 12% + Zinc 2%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass: the WebSearch tool's budget was exhausted before this product (and the rest of the Naturium/Differin/PanOxyl/Hero Cosmetics/First Aid Beauty products below) could be researched. Ingredients were not fabricated; this is a real, currently-sold product known from general knowledge.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-vitamin-c-super-serum-plus-20",
    "brand": "Naturium",
    "name": "Vitamin C Super Serum Plus 20%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-vitamin-c-complex-serum",
    "brand": "Naturium",
    "name": "Vitamin C Complex Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-hyaluronic-acid-serum-plus-3-2-1",
    "brand": "Naturium",
    "name": "Hyaluronic Acid Serum Plus 3-2-1",
    "catalogCategory": "serum",
    "tags": [
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-retinol-complex-serum-0-5",
    "brand": "Naturium",
    "name": "Retinol Complex Serum 0.5%",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-retinol-complex-serum-1",
    "brand": "Naturium",
    "name": "Retinol Complex Serum 1%",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-bha-liquid-exfoliant-2",
    "brand": "Naturium",
    "name": "BHA Liquid Exfoliant 2%",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-glycolic-acid-serum-20",
    "brand": "Naturium",
    "name": "Glycolic Acid Serum 20%",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-azelaic-topical-acid-10",
    "brand": "Naturium",
    "name": "Azelaic Topical Acid 10%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-salicylic-topical-acid-2-serum",
    "brand": "Naturium",
    "name": "Salicylic Topical Acid 2% Serum",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-mandelic-topical-acid-10",
    "brand": "Naturium",
    "name": "Mandelic Topical Acid 10%",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-tranexamic-topical-acid-5",
    "brand": "Naturium",
    "name": "Tranexamic Topical Acid 5%",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-niacinamide-face-wash-5",
    "brand": "Naturium",
    "name": "Niacinamide Face Wash 5%",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-retinaldehyde-0-1-treatment",
    "brand": "Naturium",
    "name": "Retinaldehyde 0.1% Treatment",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-niacinamide-body-wash",
    "brand": "Naturium",
    "name": "Niacinamide Body Wash",
    "catalogCategory": "cleanser",
    "tags": [
      "body"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-naturium-niacinamide-3-face-lotion-spf-50",
    "brand": "Naturium",
    "name": "Niacinamide 3% Face Lotion SPF 50",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-differin-daily-deep-cleanser",
    "brand": "Differin",
    "name": "Daily Deep Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-differin-daily-hydrating-moisturizer-with-spf-30",
    "brand": "Differin",
    "name": "Daily Hydrating Moisturizer with SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-differin-oil-absorbing-moisturizer-with-spf-30",
    "brand": "Differin",
    "name": "Oil Absorbing Moisturizer with SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-differin-soothing-moisturizer",
    "brand": "Differin",
    "name": "Soothing Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-differin-dark-spot-correcting-serum",
    "brand": "Differin",
    "name": "Dark Spot Correcting Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-panoxyl-acne-foaming-wash-4-benzoyl-peroxide",
    "brand": "PanOxyl",
    "name": "Acne Foaming Wash 4% Benzoyl Peroxide",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-panoxyl-acne-creamy-wash-4-benzoyl-peroxide",
    "brand": "PanOxyl",
    "name": "Acne Creamy Wash 4% Benzoyl Peroxide",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Marketed for sensitive skin. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-panoxyl-bar-10-benzoyl-peroxide",
    "brand": "PanOxyl",
    "name": "Bar 10% Benzoyl Peroxide",
    "catalogCategory": "cleanser",
    "tags": [
      "body"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-panoxyl-vanishing-acne-treatment-cream-10-benzoyl-peroxide",
    "brand": "PanOxyl",
    "name": "Vanishing Acne Treatment Cream 10% Benzoyl Peroxide",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-panoxyl-pm-overnight-acne-clearing-treatment-adapalene-0-1",
    "brand": "PanOxyl",
    "name": "PM Overnight Acne Clearing Treatment (Adapalene 0.1%)",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "Lower confidence that this exact product name/formulation is currently sold compared to the brand's core benzoyl-peroxide lineup; included because PanOxyl has marketed an overnight adapalene treatment, but this entry should be re-verified before relying on it."
    ],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-original",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch Original",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). A hydrocolloid pimple patch; likely has a short, simple INCI (hydrocolloid + adhesive) rather than a long cosmetic formula, but this was not confirmed. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-invisible",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch Invisible+",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-xl",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch XL",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-micropoint-for-body",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch Micropoint for Body",
    "catalogCategory": "spotTreatment",
    "tags": [
      "body"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Contains salicylic-acid-coated microdarts per brand marketing. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-chin",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch Chin",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-surface",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch Surface",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Designed for shallow/surface blemishes. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-mighty-patch-variety-pack",
    "brand": "Hero Cosmetics",
    "name": "Mighty Patch Variety Pack",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). A multi-size assortment of the brand's hydrocolloid patches. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-rescue-balm-dark-spot-correcting-balm",
    "brand": "Hero Cosmetics",
    "name": "Rescue Balm+ Dark Spot Correcting Balm",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-force-shield-barrier-boosting-sunscreen-spf-30",
    "brand": "Hero Cosmetics",
    "name": "Force Shield Barrier-Boosting Sunscreen SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "Lower confidence on exact current product name within the brand's newer 'Force Shield' sub-line; should be re-verified."
    ],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-hero-cosmetics-lightning-wand-targeted-acne-gel-treatment",
    "brand": "Hero Cosmetics",
    "name": "Lightning Wand Targeted Acne Gel Treatment",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-ultra-repair-cream-intense-hydration",
    "brand": "First Aid Beauty",
    "name": "Ultra Repair Cream Intense Hydration",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin",
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). The brand's flagship moisturizer, formulated with colloidal oatmeal per brand marketing. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-ultra-repair-face-moisturizer",
    "brand": "First Aid Beauty",
    "name": "Ultra Repair Face Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-ultra-repair-hydrating-serum",
    "brand": "First Aid Beauty",
    "name": "Ultra Repair Hydrating Serum",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-ultra-repair-cica-cream",
    "brand": "First Aid Beauty",
    "name": "Ultra Repair Cica Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free",
      "sensitive-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-pure-skin-face-cleanser",
    "brand": "First Aid Beauty",
    "name": "Pure Skin Face Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "fragrance-free",
      "for-oily-skin"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-fab-skin-lab-niacinamide-dark-spot-serum-10",
    "brand": "First Aid Beauty",
    "name": "FAB Skin Lab Niacinamide Dark Spot Serum 10%",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-fab-skin-lab-retinol-serum",
    "brand": "First Aid Beauty",
    "name": "FAB Skin Lab Retinol Serum",
    "catalogCategory": "retinoid",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-facial-radiance-pads",
    "brand": "First Aid Beauty",
    "name": "Facial Radiance Pads",
    "catalogCategory": "exfoliant",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). A glycolic-acid exfoliating pad product per brand marketing. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-kp-bump-eraser-body-scrub-exfoliator",
    "brand": "First Aid Beauty",
    "name": "KP Bump Eraser Body Scrub Exfoliator",
    "catalogCategory": "exfoliant",
    "tags": [
      "body"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). An AHA/BHA body scrub marketed for keratosis pilaris-prone skin. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-pure-skin-blemish-clearing-gel-moisturizer",
    "brand": "First Aid Beauty",
    "name": "Pure Skin Blemish Clearing Gel Moisturizer",
    "catalogCategory": "acneTreatment",
    "tags": [
      "for-oily-skin",
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Label active believed to be Salicylic Acid 2%, but this percentage was not independently confirmed in this pass. Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-first-aid-beauty-hello-fab-coconut-water-cream",
    "brand": "First Aid Beauty",
    "name": "Hello FAB Coconut Water Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "fragrance-free"
    ],
    "region": "US",
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Formula not found via available sources during this research pass (WebSearch budget exhausted). Ingredients were not fabricated.",
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-advanced-snail-96-mucin-power-essence",
    "brand": "COSRX",
    "name": "Advanced Snail 96 Mucin Power Essence",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Snail Secretion Filtrate",
      "Betaine",
      "Butylene Glycol",
      "1,2-Hexanediol",
      "Sodium Polyacrylate",
      "Phenoxyethanol",
      "Sodium Hyaluronate",
      "Allantoin",
      "Ethylhexanediol",
      "Carbomer",
      "Panthenol",
      "Arginine"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosmeterie.com/cosrx/advanced-snail-96-mucin-power-essence",
      "https://www.sokoglam.com/products/cosrx-advanced-snail-96-mucin-power-essence",
      "https://www.haniseoul.com/kbeauty/products/cosrx-cosrx-advanced-snail-96-mucin-power-essence-100-ml-ga210000530",
      "https://skinsort.com/products/cosrx/advanced-snail-96-mucin-power-essence"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer-published 12-item INCI list was cross-checked against two other retailer pages that each confirm a subset (sodium hyaluronate, allantoin, panthenol, arginine, betaine, snail secretion filtrate)."
    },
    "knownIssues": [
      "No official brand-site ingredient panel was accessible; the full 12-item order comes from a single retailer page and is not independently confirmed item-for-item."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-advanced-snail-92-all-in-one-cream",
    "brand": "COSRX",
    "name": "Advanced Snail 92 All in One Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": [
      "Snail Secretion Filtrate",
      "Betaine",
      "Adenosine",
      "Sodium Hyaluronate",
      "Panthenol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://dermfnd.org/p/cosrx-advanced-snail-92-all-in-one-cream/",
      "https://www.haniseoul.com/kbeauty/products/cosrx-cosrx-advanced-snail-92-all-in-one-cream-100ml-ga210000821",
      "https://skinsort.com/products/cosrx/advanced-snail-92-all-in-one-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only a short list of named key ingredients was found (product reportedly has ~22 total ingredients per two sources); no full ordered INCI panel was located."
    },
    "knownIssues": [
      "Full 22-ingredient INCI panel not found; one low-quality source's claim about ingredient order (betaine second) was flagged as doubtful given the 92% snail filtrate concentration."
    ],
    "note": "Only a partial, short list of named ingredients could be confirmed.",
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-low-ph-good-morning-gel-cleanser",
    "brand": "COSRX",
    "name": "Low pH Good Morning Gel Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Aqua/Water",
      "Butylene Glycol",
      "Pueraria Lobata Root Extract",
      "Caprylyl Glycol",
      "Cryptomeria Japonica Leaf Extract",
      "Citric Acid",
      "Betaine Salicylate",
      "Melaleuca Alternifolia (Tea Tree) Leaf Oil"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.skincarisma.com/products/cosrx/low-ph-good-morning-gel-cleanser",
      "https://incidecoder.com/products/cosrx-low-ph-good-morning-gel-cleanser",
      "https://www.gopicky.com/discussion/135251/cosrx-low-ph-good-morning-gel-cleanser-150-ml-5-07-fl-oz-find-yours-on-yesstyle-and-use-my-code-yesstyb18-to-save-some-money"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Skincarisma says the full formula has 25 ingredients; only a partial subset of named ingredients (incl. tea tree oil, betaine salicylate) was corroborated across a forum post and an ingredient-analysis site."
    },
    "knownIssues": [
      "Full ordered 25-item INCI list not located; a discontinued-version page on the same database suggests the formula may have changed over time."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-salicylic-acid-daily-gentle-cleanser",
    "brand": "COSRX",
    "name": "Salicylic Acid Daily Gentle Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Myristic Acid",
      "Stearic Acid",
      "Potassium Hydroxide",
      "Lauric Acid",
      "Butylene Glycol",
      "Glycol Distearate",
      "Polysorbate 80",
      "Sodium Methyl Cocoyl Taurate",
      "Salicylic Acid",
      "Cocamidopropyl Betaine",
      "PEG-60 Hydrogenated Castor Oil",
      "Melaleuca Alternifolia (Tea Tree) Leaf Oil",
      "Salix Alba (Willow) Bark Water",
      "Saccharomyces Ferment"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://beyondrx.ca/products/cosrx-salicylic-acid-daily-gentle-cleanser-150-ml",
      "https://skinsort.com/products/cosrx/salicylic-acid-daily-gentle-cleanser",
      "https://www.haniseoul.com/kbeauty/products/cosrx-cosrx-salicylic-acid-daily-gentle-cleanser-150ml-ga210000541",
      "https://www.escentual.com/cosrx060/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's ordered partial ingredient list (cut off mid-panel) was cross-checked against two other retailers naming the same salicylic acid and tea tree oil actives; Skinsort reports 23 ingredients total."
    },
    "knownIssues": [
      "The retailer-sourced list is truncated before the end of the full 23-item panel."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-aha-bha-clarifying-treatment-toner",
    "brand": "COSRX",
    "name": "AHA/BHA Clarifying Treatment Toner",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Salix Alba (Willow) Bark Water",
      "Pyrus Malus (Apple) Fruit Water",
      "Butylene Glycol",
      "1,2-Hexanediol",
      "Sodium Lactate",
      "Glycolic Acid",
      "Betaine Salicylate",
      "Allantoin",
      "Panthenol",
      "Ethyl Hexanediol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://wee.ae/product/cosrxahabha-clarifying-treatment-toner-48310",
      "https://skinsignal.com/products/cosrx-aha-bha-clarifying-treatment-toner",
      "https://www.skincarisma.com/products/cosrx/cosrx-aha-bha-clarifying-treatment-toner"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An 11-item ordered list from one retailer matches the 11-ingredient count given by a second independent ingredient-analysis site."
    },
    "knownIssues": [
      "Skincarisma reports 12 ingredients rather than 11, suggesting one ingredient may be missing from this list."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-bha-blackhead-power-liquid",
    "brand": "COSRX",
    "name": "BHA Blackhead Power Liquid",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Salix Alba (Willow) Bark Water",
      "Water",
      "Xanthan Gum",
      "Ethylhexanediol",
      "Sodium Hyaluronate",
      "Niacinamide",
      "Panthenol",
      "Betaine Salicylate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/cosrx-bha-blackhead-power-liquid-5",
      "https://www.skincarisma.com/products/cosrx/cosrx-bha-blackhead-power-liquid",
      "https://www.cosmeterie.com/cosrx/bha-blackhead-power-liquid"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Partial ingredient names corroborated across two ingredient-database sources; Skincarisma reports 10 total ingredients but the full ordered list was not located."
    },
    "knownIssues": [
      "Sources differ on naming the BHA active as betaine salicylate (natural BHA, 4%) vs. plain salicylic acid in some retailer copy."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-centella-blemish-cream",
    "brand": "COSRX",
    "name": "Centella Blemish Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Centella Asiatica Leaf Water",
      "Butylene Glycol",
      "Sunflower Seed Oil",
      "Dimethicone",
      "Betaine",
      "1,2-Hexanediol",
      "Viola Tricolor Extract",
      "Zinc Oxide",
      "Zinc PCA",
      "Centella Asiatica Extract",
      "Melaleuca Alternifolia (Tea Tree) Leaf Oil"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://peachesandcremeshop.com/products/centella-blemish-cream",
      "https://wishtrend.com/products/centella-blemish-cream",
      "https://eu.lookfantastic.com/p/cosrx-centella-blemish-cream-30ml/11401183/",
      "https://skincarisma.com/products/cosrx/centella-blemish-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Core ingredient names (centella water/extract, zinc oxide, zinc PCA, tea tree) were corroborated across three independent retailer pages, but the full 20-ingredient ordered panel was not located."
    },
    "knownIssues": [
      "Skincarisma lists 20 total ingredients; only about 11 could be confirmed from available search snippets."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-acne-pimple-master-patch",
    "brand": "COSRX",
    "name": "Acne Pimple Master Patch",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Petroleum Resin",
      "Cellulose Gum",
      "Styrene Isoprene Styrene Block Copolymer",
      "Polyurethane Film",
      "Polyisobutylene",
      "Liquid Paraffin",
      "Tetrakishydroxypropyl Ethylenediamine"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://kiyoko.it.com/products/cosrx-acne-pimple-master-patch-24-patches",
      "https://sentisenti.com/zh/products/cosrx-acne-pimple-master-patch-24ea",
      "https://peachesandcremeshop.com/products/acne-pimple-master-patch"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The same 7-item ingredient list was reported identically across two independent retailer pages for the original (non-Intensive) hydrocolloid patch."
    },
    "knownIssues": [
      "Retailers note the EU-market version may use slightly different packaging/ingredient phrasing than the original; do not confuse with the separate 'Master Patch Intensive' (tea tree) variant."
    ],
    "note": "One source rendered the last ingredient name oddly ('Tetrakismethane'); corrected here to the more standard INCI-like spelling reported elsewhere, but this is uncertain.",
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-advanced-snail-peptide-eye-cream",
    "brand": "COSRX",
    "name": "Advanced Snail Peptide Eye Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": [
      "Snail Secretion Filtrate",
      "Butylene Glycol",
      "Glycerin",
      "Sunflower Seed Oil",
      "1,2-Hexanediol",
      "Niacinamide",
      "Water",
      "Palmitic Acid",
      "Arginine",
      "Carbomer",
      "Stearic Acid",
      "Betaine",
      "Cetearyl Olivate",
      "Sorbitan Olivate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://beyondrx.ca/products/cosrx-advanced-snail-peptide-eye-cream-25-ml",
      "https://www.sokoglam.com/collections/dry/products/cosrx-advanced-snail-peptide-eye-cream",
      "https://www.haniseoul.com/kbeauty/products/cosrx-cosrx-advanced-snail-peptide-eye-cream-ga220816062",
      "https://dermfnd.org/p/cosrx-advanced-snail-peptide-eye-cream/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A truncated ordered partial list from one retailer was found; snail filtrate concentration (72-73.7%) as first ingredient is consistent across two sources, but the peptide sub-list is disputed."
    },
    "knownIssues": [
      "Sources disagree on which peptides are included: one lists Tripeptide-1, Acetyl Hexapeptide-8, Palmitoyl Pentapeptide-4, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7; another instead names Copper Tripeptide-1 (2ppm). This discrepancy is unresolved and the peptide names are NOT included in the ingredients array above because they could not be corroborated."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-pure-fit-cica-serum",
    "brand": "COSRX",
    "name": "Pure Fit Cica Serum",
    "catalogCategory": "serum",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Centella Asiatica (Gotu Kola) Extract",
      "Water",
      "Polyglyceryl-10 Myristate",
      "Sodium Hyaluronate",
      "Allantoin",
      "Ethylhexylglycerin",
      "Xanthan Gum",
      "Pinus Pinaster Bark Extract",
      "Asiaticoside",
      "Asiatic Acid",
      "Madecassic Acid",
      "Madecassoside"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosrxshop.it.com/products/pure-fit-cica-serum-cosrx-pure-fit-cica-serum",
      "https://skinsignal.com/products/cosrx-pure-fit-cica-serum",
      "https://skinsort.com/products/cosrx/pure-fit-cica-serum/dupes"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A partial ordered list of 11-12 items from a brand-affiliated shop listing was cross-checked against two independent ingredient-analysis sites that both report the product has 21 total ingredients."
    },
    "knownIssues": [
      "Only about 12 of the reported 21 total ingredients could be located in these search results; the remainder of the ordered list is missing."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-the-niacinamide-15-serum",
    "brand": "COSRX",
    "name": "The Niacinamide 15 Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Pentylene Glycol",
      "Niacinamide",
      "Butylene Glycol",
      "Acetyl Glucosamine",
      "1,2-Hexanediol",
      "Zinc PCA",
      "Trehalose",
      "Hydrolyzed Sclerotium Gum",
      "Pullulan",
      "Allantoin",
      "Ethylhexylglycerin",
      "Sodium Phytate",
      "Tocopherol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.lifepharmacy.com/product/cosrx-the-niacinamide-15-serum-20ml",
      "https://www.skincarisma.com/products/cosrx/the-niacinamide-15-serum",
      "https://incidecoder.com/products/cosrx-the-niacinamide-15-serum",
      "https://www.breuninger.com/se/en/b/cosrx/the-niacinamide-15/1003468059/p/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A 13-item retailer ingredient list closely matches the 15-ingredient total reported by an independent ingredient-analysis database (which confirms niacinamide, zinc PCA, acetyl glucosamine, allantoin as key actives)."
    },
    "knownIssues": [
      "Reported total is 15 ingredients but only 13 could be confirmed; Water/Aqua is listed as the presumed solvent base by one database but was not explicitly seen in the retailer's own list, which starts with Pentylene Glycol."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-full-fit-propolis-light-ampoule",
    "brand": "COSRX",
    "name": "Full Fit Propolis Light Ampoule",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Propolis Extract",
      "Butylene Glycol",
      "Glycerin",
      "Betaine",
      "1,2-Hexanediol",
      "Cassia Obtusifolia Seed Extract",
      "Sodium Hyaluronate",
      "Hydroxyethylcellulose",
      "Carbomer",
      "Panthenol",
      "Arginine"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://peachesandcremeshop.com/collections/frontpage/products/propolis-light-ampoule",
      "https://wishtrend.com/products/full-fit-propolis-light-ampoule",
      "https://dermfnd.org/p/cosrx-full-fit-propolis-light-ampoule/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An 11-item ordered retailer list matches the 11-ingredient count reported by two other independent sources."
    },
    "knownIssues": [
      "Propolis concentration claims vary across retailers (73.5%-83.5%), which may indicate regional formulation differences, though the ingredient list itself is consistent."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-aloe-soothing-sun-cream-spf50-pa",
    "brand": "COSRX",
    "name": "Aloe Soothing Sun Cream SPF50 PA+++",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Aloe Arborescens Leaf Extract",
      "Dipotassium Glycyrrhizate",
      "Tocopheryl Acetate",
      "Disodium EDTA",
      "PEG-100 Stearate",
      "Sodium Hydroxide",
      "Fragrance",
      "Phenoxyethanol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/cosrx-aloe-soothing-sun-cream-spf50-pa",
      "https://sunscreen-ranker.pages.dev/sunscreen/cosrx-aloe-soothing-sun-cream-spf51-global/",
      "https://whatsinmyjar.com/product/cosrx-aloe-soothing-sun-cream-spf50"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Core non-UV-filter ingredients corroborated across two ingredient databases, but UV filter sets conflict strongly across sources, likely reflecting multiple regional/reformulated versions."
    },
    "knownIssues": [
      "Multiple distinct UV filter sets were reported across sources (one lists Tinosorb S/BEMT + octinoxate + amiloxate + ensulizole; another lists titanium dioxide/ethylhexyl methoxycinnamate), with total ingredient counts cited as 45, 36, or 35 depending on version. UV filters are deliberately omitted from the ingredients array here since they could not be reliably attributed to one specific version; region could not be confirmed."
    ],
    "note": "This product has several known regional/reformulated SKUs (SPF50, SPF50+, PA+++ variants); the ingredient list here is a lowest-common-denominator set, not a complete panel for any single version.",
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-oil-free-ultra-moisturizing-lotion-with-birch-sap",
    "brand": "COSRX",
    "name": "Oil-Free Ultra-Moisturizing Lotion with Birch Sap",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Betula Platyphylla Japonica Juice",
      "Butylene Glycol",
      "Glycerin",
      "Dimethicone",
      "Betaine",
      "Cetearyl Alcohol",
      "1,2-Hexanediol",
      "Cetearyl Olivate",
      "Sorbitan Olivate",
      "Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://eu.lookfantastic.com/p/cosrx-oil-free-ultra-moisturising-lotion-with-birch-sap-100ml/11401196/",
      "https://incidecoder.com/products/cosrx-oil-free-ultra-moisturizing-lotion-with-birch-sap",
      "https://www.dermstore.com/p/cosrx-oil-free-ultra-moisturising-lotion-with-birch-sap-100ml/11401196/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A truncated ordered list from one retailer page was found; a review site's separate claim of a 19-ingredient 'clean' formula could not be independently verified against a full INCI panel."
    },
    "knownIssues": [
      "This is a reformulated version (birch sap replaced an earlier tea tree leaf oil formula per one review source); the current product's full ingredient list is truncated in available sources."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-the-retinol-0-1-cream",
    "brand": "COSRX",
    "name": "The Retinol 0.1 Cream",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": [
      "Polysilicone-11",
      "Sodium Sulfite",
      "Tocopherol",
      "Daucus Carota Sativa (Carrot) Root Extract",
      "Retinol",
      "Allantoin",
      "Glyceryl Caprylate",
      "Oryza Sativa (Rice) Bran Wax",
      "Tocotrienols",
      "Stearic Acid",
      "Polyglyceryl-3 Methylglucose Distearate",
      "Palmitic Acid",
      "Disodium EDTA",
      "Sodium Acetylated Hyaluronate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://wishtrend.com/products/the-retinol-0-1-cream",
      "https://incidecoder.com/products/cosrx-the-retinol-0-1-cream-2",
      "https://www.haniseoul.com/kbeauty/products/cosrx-cosrx-the-retinol-0-1-cream-ga220816058",
      "https://skinsort.com/products/cosrx/the-retinol-0-1-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Core actives and partial ordered list cross-checked across two independent retailer/database sources; Skinsort reports 51 total ingredients, far more than could be confirmed here."
    },
    "knownIssues": [
      "One retailer (HaniSeoul) labels the active as 'Retinal (0.1%)' rather than retinol, conflicting with the product's own name and with other sources; this is flagged but the active is recorded as Retinol per the product name and majority of sources.",
      "Only ~14 of the reported 51 total ingredients could be confirmed; list is far from complete."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-galactomyces-95-tone-balancing-essence",
    "brand": "COSRX",
    "name": "Galactomyces 95 Tone Balancing Essence",
    "catalogCategory": "serum",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Galactomyces Ferment Filtrate",
      "Niacinamide",
      "Panthenol",
      "Glycerin",
      "1,2-Hexanediol",
      "Butylene Glycol",
      "Betaine",
      "Sodium Hyaluronate",
      "Allantoin",
      "Xanthan Gum",
      "Ethyl Hexanediol",
      "Adenosine"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://beautyontapp.com/products/cosrx-galactomyces-95-tone-balancing-essence-100ml",
      "https://skinsort.com/products/cosrx/galactomyces-95-tone-balancing-essence",
      "https://www.skincarisma.com/products/cosrx/galactomyces-95-tone-balancing-essence"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A 12-item ordered retailer list matches the 12-ingredient count independently reported by Skinsort."
    },
    "knownIssues": [],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-two-in-one-poreless-power-liquid",
    "brand": "COSRX",
    "name": "Two in One Poreless Power Liquid",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": [
      "Salix Alba (Willow) Bark Water",
      "Butylene Glycol",
      "Hydroxypropyl Cyclodextrin",
      "Aqua",
      "Pentylene Glycol",
      "1,2-Hexanediol",
      "Betaine Salicylate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosmeterie.com/cosrx/two-in-one-poreless-powder-liquid",
      "https://skinsort.com/products/cosrx/two-in-one-poreless-power-liquid",
      "https://kbeautyhouse.de/en/cosrx-two-in-one-poreless-power-liquid/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Two retailer sources give conflicting partial ingredient sets for what may be different formulation versions; Skinsort reports 18 total ingredients versus the 7 found in one list."
    },
    "knownIssues": [
      "A German retailer's list (pentylene glycol, sodium hyaluronate, cassia obtusifolia seed extract, menthyl lactate, mentha haplocalix extract, disodium/sodium phosphate) does not overlap with the willow-bark/betaine-salicylate list from a different retailer, suggesting either reformulation or regional difference; this could not be resolved.",
      "An INCIDecoder listing is marked discontinued, pointing to a possibly newer current version not captured here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-ac-collection-calming-foam-cleanser",
    "brand": "COSRX",
    "name": "AC Collection Calming Foam Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Stearic Acid",
      "Myristic Acid",
      "PEG-32",
      "Potassium Hydroxide",
      "Palmitic Acid",
      "Lauric Acid",
      "Glyceryl Stearate",
      "Arachidic Acid",
      "Lavandula Hybrida Oil",
      "Linalool",
      "Disodium EDTA",
      "Oleic Acid",
      "Limonene",
      "Salicylic Acid",
      "Asiaticoside",
      "Asiatic Acid",
      "Madecassic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/cosrx/ac-collection-calming-foam-cleanser",
      "https://skinsort.com/products/cosrx/ac-collection-calming-foam-cleanser-old-3ddW0P0",
      "https://www.haniseoul.com/kbeauty/products/cosrx-cosrx-ac-collection-calming-foam-cleanser-150ml-ga210001817"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Two versions of the same database's listing (current '2.0' vs older) were combined; both agree on the centella and salicylic-acid-based BHA cleanser profile, matching a third retailer's description of it as salicylic-acid based."
    },
    "knownIssues": [
      "Product has a '2.0' reformulated version distinct from the original; the ingredient list combines pieces from both versions' listings and may not exactly match either one. Listed as 24 ingredients total per the database but only ~19 confirmed here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-centella-water-alcohol-free-toner",
    "brand": "COSRX",
    "name": "Centella Water Alcohol-Free Toner",
    "catalogCategory": "toner",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Centella Asiatica Leaf Water",
      "Butylene Glycol",
      "1,2-Hexanediol",
      "Betaine",
      "Panthenol",
      "Allantoin",
      "Ethyl Hexanediol",
      "Sodium Hyaluronate"
    ],
    "ingredientsComplete": true,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://wishtrend.com/products/centella-water-alcohol-free-toner",
      "https://www.soin-et-nature.com/en/27691-cosrx-centella-toner-150-ml.html",
      "https://skinsort.com/products/cosrx/centella-water-alcohol-free-toner"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A 9-item ordered list was reported identically by two independent retailer sources and matches the 9-ingredient count given by a third database."
    },
    "knownIssues": [
      "Sources disagree on whether the base solvent is labeled plain 'Water' or 'Mineral Water' (likely Jeju mineral water per marketing copy)."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-cosrx-honey-ceramide-full-moisture-cream",
    "brand": "COSRX",
    "name": "Honey Ceramide Full Moisture Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Honey Extract",
      "Butylene Glycol",
      "Elaeis Guineensis (Palm) Oil",
      "Hordeum Vulgare (Barley) Leaf Extract",
      "Panthenol",
      "Cetearyl Alcohol",
      "Sodium Hyaluronate",
      "Ethylhexylglycerin",
      "Ceramide 3",
      "Xanthan Gum",
      "Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer",
      "Adenosine",
      "1,2-Hexanediol",
      "Betaine"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.lookfantastic.com/cosrx-honey-ceramide-full-moisture-cream-50ml/11401189.html",
      "https://skinsignal.com/products/cosrx-honey-ceramide-cream",
      "https://www.skincarisma.com/products/cosrx/honey-ceramide-full-moisture-cream",
      "https://sleekshop.com/products/cosrx-honey-ceramide-full-moisture-cream.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's ordered partial list was cross-checked against two independent ingredient-analysis sites that both report a 21-total-ingredient formula and agree on honey extract and butylene glycol as leading ingredients."
    },
    "knownIssues": [
      "Sources disagree on whether the formula contains additional ingredients like beta-glucan (mentioned by one retailer but not others); total is reported as 21 ingredients but only ~14 confirmed here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-glow-deep-serum-rice-alpha-arbutin",
    "brand": "Beauty of Joseon",
    "name": "Glow Deep Serum: Rice + Alpha-Arbutin",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Oryza Sativa (Rice) Bran Water",
      "Water",
      "Glycerin",
      "Butylene Glycol",
      "1,2-Hexanediol",
      "Dipropylene Glycol",
      "Alpha-Arbutin",
      "Niacinamide",
      "Methyl Gluceth-20",
      "Panthenol",
      "Polyglycerin-3",
      "Trehalose",
      "Glyceryl Glucoside",
      "Hydrolyzed Jojoba Esters"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.lifepharmacy.com/product/beauty-of-joseon-glow-deep-serum-rice-alpha-arbutin-50ml",
      "https://skinsort.com/products/beauty-of-joseon/glow-deep-serum-rice-arbutin",
      "https://incidecoder.com/products/beauty-of-joseon-glow-deep-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's ordered partial list (14 items) was found; two independent sources (Skinsort, VeriMom) agree the full formula has 32 ingredients and both confirm the ~68% rice bran water and 2% alpha-arbutin concentration claims."
    },
    "knownIssues": [
      "Only ~14 of the reported 32 total ingredients were located; plant extracts mentioned by one database (sesame seed, wheat seed, mung bean, corn kernel extracts) could not be placed in the order and are omitted."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-dynasty-cream",
    "brand": "Beauty of Joseon",
    "name": "Dynasty Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Oryza Sativa (Rice) Bran Water",
      "Panax Ginseng Root Water",
      "Squalane",
      "Niacinamide",
      "Ceramide NP",
      "Sodium Hyaluronate",
      "Safflower Seed Oil"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/beauty-of-joseon-dynasty-cream-2022",
      "https://skinsort.com/products/beauty-of-joseon/dynasty-cream",
      "https://dermapproved-preview.pages.dev/products/beauty-of-joseon-dynasty-cream/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only marketing-level key-ingredient claims (29% rice bran water, 5% ginseng root water, 2% squalane, 2% niacinamide, ceramide NP, hyaluronic acid) were corroborated across two retailer sources; no ordered INCI panel was located."
    },
    "knownIssues": [
      "Product has an older formulation (~37 ingredients per one database) and a newer 'improved formula' with added rice water; the two formulas were not clearly distinguished across sources, so this entry may mix elements of both.",
      "No full ordered INCI list found."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-relief-sun-rice-probiotics-spf50-pa",
    "brand": "Beauty of Joseon",
    "name": "Relief Sun: Rice + Probiotics SPF50+ PA++++",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Rice Extract",
      "Dibutyl Adipate",
      "Propanediol",
      "Niacinamide",
      "Panax Ginseng Root Extract",
      "Rice Ferment Filtrate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://peachesandcremeshop.com/collections/all-products/products/relief-sun-rice-probiotics-spf50-pa",
      "https://skinsort.com/products/beauty-of-joseon/relief-sun-rice-probiotics",
      "https://www.skincarisma.com/products/beauty-of-joseon/relief-sun-rice-probiotics-spf-50-pa",
      "https://sunscreen-ranker.pages.dev/sunscreen/beauty-of-joseon-relief-sun-rice-probiotics-spf51-global/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Three independent sources (Skinsort, Skincarisma, Sunscreen Ranker) agree the product has 42 total ingredients, but only the leading few ingredients and no UV filter list could be confirmed from available search snippets."
    },
    "knownIssues": [
      "UV filters are not included in this list because they could not be confirmed; this sunscreen is known to have multiple year-versioned INCI listings (2022, 2023, 2025 reformulations per database entries), so the exact filter set depends on which year's batch is in question.",
      "Only ~7 of 42 reported total ingredients confirmed."
    ],
    "note": "This product reportedly has had several reformulations over the years (database lists separate 2022/2023/2025 entries); region/version not determined.",
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-ginseng-essence-water",
    "brand": "Beauty of Joseon",
    "name": "Ginseng Essence Water",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": [
      "Panax Ginseng Root Water",
      "Butylene Glycol",
      "Glycerin",
      "Propanediol",
      "Niacinamide",
      "1,2-Hexanediol",
      "Water",
      "Hydroxyacetophenone",
      "Glyceryl Glucoside",
      "Xanthan Gum",
      "Panthenol",
      "Dipotassium Glycyrrhizate",
      "Allantoin",
      "Adenosine",
      "Panax Ginseng Root Extract",
      "Panax Ginseng Callus Culture Extract",
      "Panax Ginseng Berry Extract",
      "Lactobacillus/Ginseng Root Ferment Filtrate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ohfeliz.com/beauty-of-joseon/ginseng-essence-water-2",
      "https://galaxus.at/en/s6/product/beauty-of-joseon-ginseng-essence-water-tonic-water-150-ml-face-cleansers-25042808",
      "https://mcgrocer.com/products/beauty-of-joseon-ginseng-essence-water-150ml",
      "https://peachesandcremeshop.com/products/ginseng-essence-water"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An 8-item ordered partial list from one retailer was cross-checked against a second retailer's longer key-ingredient list (14 items) and a third's description of the ginseng-complex sub-ingredients; core items (ginseng root water, niacinamide, adenosine) agree across all sources."
    },
    "knownIssues": [
      "80% ginseng root water concentration is consistently reported, but the full ordered INCI panel combining all named ingredients could not be independently verified end-to-end."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-revive-serum-ginseng-snail-mucin",
    "brand": "Beauty of Joseon",
    "name": "Revive Serum: Ginseng + Snail Mucin",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Panax Ginseng Root Water",
      "Snail Secretion Filtrate",
      "Niacinamide",
      "Adenosine",
      "Centella Asiatica Extract",
      "Ganoderma Lucidum (Mushroom) Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/beauty-of-joseon/repair-serum-ginseng-snail-mucin",
      "https://www.haniseoul.com/kbeauty/products/beauty-of-joseon-beauty-of-joseon-revive-serum-ginseng-snail-mucin-30ml-ga220715372",
      "https://www.cosmeterie.com/beauty-of-joseon/revive-repair-serum-ginseng-snail-mucin?sai=8384"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A database source and a retailer agree on 28 total ingredients and on the headline actives (63% ginseng root water, snail secretion filtrate, niacinamide, adenosine), but no full ordered panel was located."
    },
    "knownIssues": [
      "This is a renamed/reformulated version of the brand's earlier 'Repair Serum'; some retailers still use the old name. 'Matsutake mushroom extract' is named by one source but not corroborated elsewhere, so it is recorded here as 'Ganoderma Lucidum' per a different, more consistently-named source instead -- this substitution itself is uncertain and flagged."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-red-bean-water-gel",
    "brand": "Beauty of Joseon",
    "name": "Red Bean Water Gel",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-oily-skin"
    ],
    "region": null,
    "ingredients": [
      "Phaseolus Angularis (Red Bean/Adzuki) Seed Extract",
      "Betaine",
      "Panthenol",
      "Allantoin",
      "SH-Oligopeptide-1",
      "SH-Oligopeptide-2",
      "SH-Polypeptide-1",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/beauty-of-joseon-red-bean-water-gel-2",
      "https://skinsort.com/products/beauty-of-joseon/red-bean-water-gel",
      "https://incidecoder.com/compare-products/beauty-of-joseon-dynasty-cream-2022/beauty-of-joseon-red-bean-water-gel"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Two Skinsort pages disagree slightly on total count (57 vs 58 ingredients); only a handful of named key ingredients and one peptide claim could be corroborated, not a full ordered panel."
    },
    "knownIssues": [
      "Only ~8 of the reported ~57-58 total ingredients could be confirmed; this is a far-from-complete list for a product with many botanical extracts.",
      "44% Haenam red bean extract concentration is a marketing claim from one retailer, not independently cross-checked."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-green-plum-refreshing-toner-aha-bha",
    "brand": "Beauty of Joseon",
    "name": "Green Plum Refreshing Toner: AHA + BHA",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Prunus Mume (Green Plum) Fruit Water",
      "Glycolic Acid",
      "Phaseolus Radiatus (Mung Bean) Seed Extract",
      "Panax Ginseng Root Extract",
      "Oryza Sativa (Rice) Bran Water",
      "1,2-Hexanediol",
      "Ethylhexylglycerin",
      "Tetrasodium EDTA",
      "Salicylic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cosmeterie.com/beauty-of-joseon/green-plum-refreshing-toner-aha-bha",
      "https://www.skincarisma.com/products/beauty-of-joseon/beauty-of-joseon-green-plum-refreshing-toner-aha-bha",
      "https://skinsort.com/products/beauty-of-joseon/green-plum-refreshing-toner-aha-bha",
      "https://beautymasterlist.com/products/beauty-of-joseon/green-plum-refreshing-toner-aha-bha"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A ~10-item ordered list from one retailer (Cosmeterie) was cross-checked against salicylic acid (0.5%) and glycolic acid (2.0%) concentration claims from a second retailer; core ingredient identities agree."
    },
    "knownIssues": [
      "Total ingredient count disputed across sources (26 per Skinsort, 24 per Skincarisma, ~15 named per Cosmeterie); the full ordered list could not be confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-matte-sun-stick-mugwort-camelia-spf50-pa",
    "brand": "Beauty of Joseon",
    "name": "Matte Sun Stick: Mugwort + Camelia SPF50+ PA++++",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": [
      "Methylpropanediol",
      "Propanediol",
      "Glycerin",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/beauty-of-joseon-matte-sun-stick-mugwort-camelia",
      "https://skinsort.com/products/beauty-of-joseon/matte-sun-stick-mugwort-camelia-spf-50-pa",
      "https://sunscreen-ranker.pages.dev/sunscreen/beauty-of-joseon-matte-sun-stick-spf50-global/"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only the first few non-active ingredients were located; sources agree the product has 47-48 total ingredients but the UV filter set and remaining formula could not be confirmed."
    },
    "knownIssues": [
      "UV filter(s) not identified in available sources; this is a materially incomplete list (only ~4 of ~47-48 total ingredients found) and should be treated as a near-stub."
    ],
    "note": "Treat as low-confidence/near-stub; most of the formula including the active UV filters is unconfirmed.",
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-radiance-cleansing-balm",
    "brand": "Beauty of Joseon",
    "name": "Radiance Cleansing Balm",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Cetyl Ethylhexanoate",
      "Caprylic/Capric Triglyceride",
      "PEG-20 Glyceryl Triisostearate",
      "Synthetic Wax",
      "PEG-10 Isostearate",
      "Sorbitan Sesquioleate",
      "Sea Buckthorn Oil",
      "Rice Bran Oil",
      "Water",
      "Rice Seed Water"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ferwer.com/product/16539",
      "https://skinorea.com/en/products/beauty-of-joseon-radiance-cleansing-balm",
      "https://skinsort.com/products/beauty-of-joseon/radiance-cleansing-balm"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "One retailer's truncated ordered list was found; a second independent source describes the product as a reformulated 'no-PEG' vegan balm, directly conflicting with the PEG-containing list from the first source."
    },
    "knownIssues": [
      "Two sources appear to describe different formulation versions: one lists several PEG ingredients, the other explicitly says the renewed formula is 'No PEG.' This could not be resolved, so the list here may reflect an older/discontinued version rather than the current one."
    ],
    "note": "Note: this product is sometimes loosely called 'Rice Water Bright Cleansing Balm' in casual use, but its correct/official name is 'Radiance Cleansing Balm.'",
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-green-plum-refreshing-cleanser",
    "brand": "Beauty of Joseon",
    "name": "Green Plum Refreshing Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Prunus Mume (Plum) Fruit Water",
      "Phaseolus Radiatus (Mung Bean) Seed Extract",
      "1,2-Hexanediol",
      "Punica Granatum (Pomegranate) Extract",
      "Clitoria Ternatea Flower Extract",
      "Garcinia Mangostana Peel Extract",
      "Propylene Glycol Laurate",
      "Sodium Citrate",
      "Disodium EDTA"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/beauty-of-joseon-green-plum-refreshing-cleanser",
      "https://superbalist.com/women/beauty/skincare/green-plum-refreshing-cleanser/1194139",
      "https://peachesandcremeshop.com/collections/vegan/products/green-plum-refreshing-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "One retailer's named ingredient list (9 items) was cross-checked against a second retailer's key-ingredient claims (plum water 24%); total ingredient count varies widely across sources (27, 29, or 68) suggesting multiple formulation versions."
    },
    "knownIssues": [
      "Total ingredient count varies dramatically (27 vs 29 vs 68) across different database listings/regions, suggesting this entry may not represent the current formula consistently."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-light-on-serum-centella-vita-c",
    "brand": "Beauty of Joseon",
    "name": "Light On Serum: Centella + Vita C",
    "catalogCategory": "serum",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Centella Asiatica Extract",
      "3-O-Ethyl Ascorbic Acid",
      "Glycerin",
      "Propanediol",
      "Betaine",
      "Dicaprylyl Carbonate",
      "Methyl Trimethicone",
      "Cetyl Ethylhexanoate",
      "Panthenol",
      "Madecassoside",
      "Asiaticoside"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://skinsort.com/products/beauty-of-joseon/light-on-serum-centella-vita-c",
      "https://asung.ca/products/beauty-of-joseon-light-on-serum-with-centella-vit-c-30ml",
      "https://watsons.sa/products/light-on-serum-centella-vita-c-30ml"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Concentration claims (68% centella asiatica extract, 10% 3-O-ethyl ascorbic acid) and supporting ingredient names were consistently repeated across three independent retailer listings."
    },
    "knownIssues": [
      "Full ordered INCI panel (beyond the ~11 named ingredients) not located."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-ginseng-cleansing-oil",
    "brand": "Beauty of Joseon",
    "name": "Ginseng Cleansing Oil",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Tocopherol",
      "Salvia Officinalis (Sage) Oil",
      "Panax Ginseng Seed Oil",
      "Artemisia Vulgaris Oil",
      "Ocimum Basilicum (Basil) Oil",
      "Corylus Avellana (Hazelnut) Seed Oil",
      "Nigella Sativa Seed Oil",
      "Butylene Glycol",
      "Panax Ginseng Berry Extract",
      "Glycerin",
      "1,2-Hexanediol",
      "Methylpropanediol",
      "Panax Ginseng Root Extract",
      "Ethyl Hexanediol",
      "Panax Ginseng Extract",
      "Panax Ginseng Leaf/Stem Extract",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://well.ca/products/beauty-of-joseon-ginseng-cleansing_327520.html",
      "https://dermfnd.org/p/beauty-of-joseon-ginseng-cleansing-oil/",
      "https://whatsinmyjar.com/product/beauty-of-joseon-ginseng-cleansing-oil"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's listed order was cross-checked against a second independent source describing the same five ginseng-derived ingredients plus sage, mugwort, and basil essential oils, matching well."
    },
    "knownIssues": [
      "Product has a known 2024 reformulation listed separately in one database; it is unclear whether this list reflects the original or 2024-reformulated version.",
      "50% soybean oil base reported by one source but soybean oil itself is not explicitly named in the retailer's ingredient list, so it is omitted here as unconfirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-revive-eye-serum-ginseng-retinal",
    "brand": "Beauty of Joseon",
    "name": "Revive Eye Serum: Ginseng + Retinal",
    "catalogCategory": "retinoid",
    "tags": [],
    "region": null,
    "ingredients": [
      "Ceramide NP",
      "Sodium Hyaluronate",
      "Niacinamide",
      "Panax Ginseng Root Extract",
      "Palmitoyl Tripeptide-5",
      "Retinal",
      "Glycerin",
      "Cholesterol",
      "Disodium EDTA",
      "Ethylhexylglycerin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.haniseoul.com/kbeauty/products/beauty-of-joseon-beauty-of-joseon-revive-eye-serum-ginseng-retinal-30ml-ga220816048",
      "https://superbalist.com/women/beauty/skincare/revive-eye-serum-ginseng-retinol/1194140",
      "https://www.cvs.com/shop/ingredients/beauty-of-joseon-revive-eye-serum-ginseng-retinal-1-01-oz-prodid-555068"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Three independent sources (HaniSeoul, CVS, Incidecoder summary) agree on retinal plus panax ginseng root extract as the headline actives, with HaniSeoul and CVS matching closely on named key ingredients."
    },
    "knownIssues": [
      "One retailer (Watsons SA) and a product title on Superbalist instead describe the active as 'retinol' or 'Retinol Liposome,' conflicting with the retinal consistently named by three other sources; recorded here as Retinal per the majority."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-red-bean-refreshing-pore-mask",
    "brand": "Beauty of Joseon",
    "name": "Red Bean Refreshing Pore Mask",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Phaseolus Angularis (Red Bean) Seed Extract",
      "Glycerin",
      "Kaolin",
      "Caprylyl/Capryl Glucoside",
      "Sorbitan Oleate",
      "Triethoxycaprylylsilane"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://verimom.com/products/beauty-of-joseon-red-bean-refreshing-pore-mask-140ml",
      "https://www.cosmeterie.com/beauty-of-joseon/red-bean-refreshing-pore-mask-1?sai=28480",
      "https://skinsort.com/products/beauty-of-joseon/red-bean-refreshing-pore-mask"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's ordered opening sequence (red bean extract, glycerin, kaolin) matches the same opening three names independently reported by a second retailer and a database that both agree on 24 total ingredients."
    },
    "knownIssues": [
      "Only 6 of 24 reported total ingredients confirmed; 30% red bean extract concentration is a marketing claim from a brand-linked source, not independently cross-checked."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-apricot-blossom-peeling-gel",
    "brand": "Beauty of Joseon",
    "name": "Apricot Blossom Peeling Gel",
    "catalogCategory": "exfoliant",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Prunus Mume Flower Water",
      "Cellulose",
      "Methylpropanediol",
      "1,2-Hexanediol",
      "Carbomer",
      "Arginine",
      "Ethylhexylglycerin",
      "Allantoin",
      "Sorbitol",
      "Disodium EDTA",
      "Butylene Glycol",
      "Pyrus Malus (Apple) Fruit Extract",
      "Camellia Sinensis Leaf Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.ferwer.com/product/16775",
      "https://www.ohfeliz.com/beauty-of-joseon/apricot-blossom-peeling-gel-1",
      "https://en.zalando.de/beauty-of-joseon-beauty-of-joseon-apricot-blossom-peeling-gel-facial-scrub-and-peel-bts34g007-s11.html"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Three retailer sources give overlapping but not identical ingredient lists, likely reflecting the product's known reformulation ('renewed with improved ingredients and packaging' per one retailer); a fourth source's 4-ingredient list did not match any of these at all and was excluded."
    },
    "knownIssues": [
      "Multiple conflicting ingredient lists found across retailers, likely due to a known reformulation; the list recorded here uses the most detailed source (Ferwer) but could not be fully cross-verified.",
      "A fourth source (Kbeautyhouse.de) listed only 4 completely different ingredients, which was excluded as apparently describing a different product or being an error."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-glow-serum-propolis-niacinamide",
    "brand": "Beauty of Joseon",
    "name": "Glow Serum: Propolis + Niacinamide",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Propolis Extract",
      "Dipropylene Glycol",
      "Glycerin",
      "Butylene Glycol",
      "Water",
      "Niacinamide",
      "1,2-Hexanediol",
      "Melia Azadirachta Flower Extract",
      "Melia Azadirachta Leaf Extract",
      "Sodium Hyaluronate",
      "Curcuma Longa (Turmeric) Root Extract"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://myer.com.au/p/beauty-of-joseon-glow-serum-propolis---43-niacinamide",
      "https://skinsort.com/products/beauty-of-joseon/glow-serum-propolis-niacinamide",
      "https://www.walmart.com/ip/429051079"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "60% propolis extract concentration independently confirmed by two retailers (one giving 59.94%); the ordered partial ingredient list (11 items) comes from a single retailer and was not independently cross-checked item by item."
    },
    "knownIssues": [
      "Skinsort reports 30 total ingredients; only 11 were located here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-glow-replenishing-rice-milk-toner",
    "brand": "Beauty of Joseon",
    "name": "Glow Replenishing Rice Milk Toner",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Rice Extract",
      "Rice Amino Acids",
      "Methylpropanediol",
      "Propanediol",
      "1,2-Hexanediol",
      "Dextrin",
      "Ceramide NP",
      "Tocopherol",
      "Ethylhexylglycerin",
      "Dipotassium Glycyrrhizate",
      "Citric Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://sephora.com/product/glow-replenshing-rice-milk-exclusive-150ml-P517636",
      "https://skinsort.com/products/beauty-of-joseon/glow-replenishing-rice-milk-toner",
      "https://beautymasterlist.com/products/beauty-of-joseon/glow-replenishing-rice-milk"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A Sephora-sourced 7-item list was corroborated by a second retailer reproducing the same 7 names, but a third source (Saranghae) lists additional/different ingredients (sebum control powder, sodium hyaluronate) not found elsewhere, suggesting a two-layer formula with incompletely captured ingredients."
    },
    "knownIssues": [
      "This is described as a two-layer formula (moisture layer + sebum-control powder layer) by one retailer; the combined list here may not accurately represent both layers' true order.",
      "Skinsort reports 30 total ingredients; only ~12 located here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-beauty-of-joseon-jelloskin-massage-cream-for-face-and-body",
    "brand": "Beauty of Joseon",
    "name": "Jelloskin Massage Cream for Face and Body",
    "catalogCategory": "moisturizer",
    "tags": [
      "body"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Ceramide NP",
      "Opuntia Coccinellifera (Prickly Pear) Fruit Extract",
      "Phaseolus Vulgaris (Kidney Bean) Seed Extract",
      "Niacinamide",
      "Adenosine",
      "Panthenol",
      "Oryza Sativa (Rice) Bran Oil",
      "Cetearyl Alcohol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://incidecoder.com/products/beauty-of-joseon-jelloskin-massage-cream-for-face-and-body",
      "https://dermfnd.org/p/beauty-of-joseon-jelloskin-massage-cream/",
      "https://peachesandcremeshop.com/products/jelloskin-massage-cream-for-face-and-body"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Two database sources agree on headline ingredients (ceramide NP, niacinamide, prickly pear/kidney bean extracts), but no full ordered INCI panel was located; niacinamide's reported fifth-place position could not be verified against a complete list."
    },
    "knownIssues": [
      "Full ordered INCI panel not found; only highlighted/key ingredients corroborated."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-creamy-jelly-cleanser",
    "brand": "Byoma",
    "name": "Creamy Jelly Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Cocamidopropyl Betaine",
      "Disodium Laureth Sulfosuccinate",
      "Sodium Lauryl Sulfoacetate",
      "Sodium Methyl Cocoyl Taurate",
      "Decyl Glucoside",
      "Cocamide Methyl MEA",
      "Stearic Acid",
      "Hydrogenated Lecithin"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/product/creamy-jelly-cleanser/",
      "https://uk.byoma.com/products/creamy-jelly-cleanser",
      "https://skinsort.com/products/byoma/creamy-jelly-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The ingredients listed are drawn directly from the brand's own website (grouped by function rather than concentration order), cross-checked against an independent database reporting 25 total ingredients for the same product."
    },
    "knownIssues": [
      "Byoma's own site groups ingredients by function rather than giving a strict descending-concentration INCI order, so the array order here is not guaranteed to match the printed label order.",
      "Only 9 of 25 reported total ingredients confirmed."
    ],
    "note": "May also be referred to by retailers under the near-identical name 'Hydrating Cream Cleanser' in casual use; the brand's official name is 'Creamy Jelly Cleanser.'",
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-moisturising-gel-cream",
    "brand": "Byoma",
    "name": "Moisturising Gel Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Caprylic/Capric Triglyceride",
      "Pentaerythrityl Tetraethylhexanoate",
      "Niacinamide",
      "Ceramide NP",
      "Cholesterol",
      "Phytosphingosine",
      "Stearic Acid",
      "Oleic Acid",
      "Tromethamine",
      "Camellia Sinensis Leaf Extract",
      "Lactic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/product/moisturizing-gel-cream/",
      "https://www.skincarisma.com/products/byoma/moisturizing-gel-cream",
      "https://skinsignal.com/products/byoma-moisturising-gel-cream"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Brand-site ingredient highlights were cross-checked against Skincarisma's independent 23-ingredient analysis, which names several of the same ingredients (stearic acid, oleic acid, tromethamine, camellia sinensis extract, lactic acid)."
    },
    "knownIssues": [
      "Total is reported as 23 ingredients; only 13 confirmed here. Note this product is distinct from the separate SPF 30 sunscreen version, which has a different formula."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-hydrating-milky-toner",
    "brand": "Byoma",
    "name": "Hydrating Milky Toner",
    "catalogCategory": "toner",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "1,2-Hexanediol",
      "Panthenol",
      "Limnanthes Alba (Meadowfoam) Seed Oil",
      "Ethylhexylglycerin",
      "Sodium Hyaluronate",
      "Dipropylene Glycol",
      "Centella Asiatica Extract",
      "Methylglucose Distearate",
      "Glucose Sesquistearate",
      "Cetearyl Glucoside",
      "Gluconolactone",
      "Tocopherol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/products/hydrating-milky-toner",
      "https://skinsort.com/products/byoma/hydrating-milky-toner",
      "https://www.ulta.com/p/hydrating-milky-toner-pimprod2043230",
      "https://skinsignal.com/products/byoma-hydrating-milky-toner"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Brand-site, Skinsort, Ulta, and Skinsignal listings were combined; three of four independently name gluconolactone (PHA) and panthenol, and Skinsort/Skincarisma agree on a 29-ingredient total."
    },
    "knownIssues": [
      "A brand customer-service answer on Ulta states the toner 'does not contain any AHAs,' but Skinsignal's ingredient list includes citric acid (an AHA); this discrepancy is unresolved.",
      "Only ~13 of 29 reported total ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-clarifying-serum",
    "brand": "Byoma",
    "name": "Clarifying Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Niacinamide",
      "1,2-Hexanediol",
      "Polyglyceryl-10 Laurate",
      "Gluconolactone",
      "Glyceryl Caprylate",
      "Ceramide NP",
      "Cholesterol",
      "Caprylic/Capric Triglyceride",
      "Phytosphingosine",
      "Stearic Acid",
      "Oleic Acid",
      "Zinc Lactate",
      "Lactic Acid",
      "Tocopherol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://uk.byoma.com/products/clarifying-serum",
      "https://www.cultbeauty.co.uk/p/13554706/",
      "https://skinsignal.com/products/byoma-clarifying-serum",
      "https://www.skincarisma.com/products/byoma/clarifying-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The brand's own UK site and a retailer (Cult Beauty) both list overlapping ingredient sets (niacinamide, gluconolactone, ceramide NP, cholesterol, phytosphingosine, zinc lactate), and two independent databases agree on a 26-ingredient total."
    },
    "knownIssues": [
      "Also sold as 'Clarifying Serum with Tri-Ceramide Complex' in some markets; one database additionally lists blue tansy flower oil and sodium phytate not included here since unconfirmed by a second source."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-sensitive-retinol-oil",
    "brand": "Byoma",
    "name": "Sensitive Retinol Oil",
    "catalogCategory": "retinoid",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": [
      "Hydroxypinacolone Retinoate",
      "Squalane",
      "Glycine Soja (Soybean) Oil",
      "Tocopherol",
      "Helianthus Annuus (Sunflower) Seed Oil",
      "Cetyl Ethylhexanoate",
      "Caprylic/Capric Triglyceride",
      "Bisabolol",
      "Camellia Oleifera Seed Oil"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/product/sensitive-retinol-oil/",
      "https://www.sephora.co.uk/p/byoma-sensitive-retinol-oil",
      "https://skinsignal.com/products/byoma-sensitive-retinol-oil",
      "https://www.skincarisma.com/products/byoma/sensitive-retinol-oil"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The retinoid active (hydroxypinacolone retinoate, a retinoic acid ester rather than true retinol) is confirmed by the brand's own site; Skinsort and Skincarisma independently agree the full formula has only 12 total ingredients, and the other named oils were corroborated across two retailer sources."
    },
    "knownIssues": [
      "Despite the product name 'Retinol Oil,' the brand's own page identifies the actual retinoid ingredient as Hydroxypinacolone Retinoate, not retinol itself; flagging this naming discrepancy."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-barrier-repair-eye-cream",
    "brand": "Byoma",
    "name": "Barrier Repair Eye Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Xanthan Gum",
      "1,2-Hexanediol",
      "Glycine",
      "Caprylhydroxamic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/products/barrier-repair-eye-cream",
      "https://skinsort.com/products/byoma/barrier-repair-eye-cream",
      "https://boots.com/byoma-barrier-repair-eye-cream-20ml-10354871"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Only a handful of ingredients were located from a retailer (Ulta) plus marketing claims (barrier lipid complex, copper tripeptides, ectoin) from a second retailer; Skinsort independently reports 36 total ingredients, far more than confirmed here."
    },
    "knownIssues": [
      "Materially incomplete list: only ~5 of 36 reported total ingredients confirmed; copper tripeptides and ectoin are named as marketing highlights but not confirmed in INCI form."
    ],
    "note": "Treat as low-confidence/near-stub; most of the formula is unconfirmed.",
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-blemish-clearing-paste",
    "brand": "Byoma",
    "name": "Blemish Clearing Paste",
    "catalogCategory": "spotTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Salicylic Acid",
      "Maltodextrin",
      "Sodium Benzoate",
      "Potassium Sorbate",
      "Kaolin Clay"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://otclabels.com/lib/otc/otc-meds/byoma-acne-treatment-spot/",
      "https://www.ulta.com/p/blemish-acne-treatment-spot-paste-pimprod2059306",
      "https://mcgrocer.com/products/byoma-blemish-clearing-paste-15ml-2026461466"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "An FDA-filed US OTC drug label (salicylic acid 2% active plus maltodextrin, sodium benzoate, potassium sorbate as inactives) was cross-checked against a separate retailer's description of kaolin clay and a ceramide complex in what may be the same or a related product."
    },
    "knownIssues": [
      "Sold under at least two names (US 'Acne Treatment Spot Paste' / UK 'Blemish Clearing Paste'); a retailer (Ulta) names a different ingredient ('hydroxycinnamic acid') not found on the official FDA drug label, which is an unresolved conflict.",
      "Ceramide complex mentioned by one retailer could not be confirmed as part of the INCI inactive-ingredients list."
    ],
    "note": "This is an FDA-regulated OTC acne drug product (2% salicylic acid), not just a cosmetic; the US product name is 'Acne Treatment Spot Paste.'",
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-moisturizing-gel-sunscreen-broad-spectrum-spf-30",
    "brand": "Byoma",
    "name": "Moisturizing Gel Sunscreen Broad Spectrum SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": "US",
    "ingredients": [
      "Avobenzone",
      "Homosalate",
      "Octisalate",
      "Water",
      "Glycerin",
      "Butyloctyl Salicylate",
      "Propanediol",
      "1,2-Hexanediol",
      "Dimethicone",
      "Panthenol",
      "Poly C10-30 Alkyl Acrylate",
      "Pullulan",
      "Sclerotium Gum",
      "Sodium Polyacryloyldimethyl Taurate",
      "Solidago Virgaurea Extract",
      "Tocopherol",
      "Xanthan Gum"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://otclabels.com/lib/otc/otc-meds/byoma-moisturizing-gel-sunscreen-broad-spectrum-spf-30/",
      "https://incidecoder.com/products/byoma-moisturizing-gel-sunscreen-broad-spectrum-spf-30",
      "https://skinsignal.com/products/byoma-moisturizing-gel-sunscreen-broad-spectrum-spf-30"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The US FDA-filed OTC drug label's active ingredients (avobenzone 3%, homosalate 10%, octisalate 5%) were cross-checked against an independent ingredient database's inactive-ingredient list, which matches closely."
    },
    "knownIssues": [
      "This is a distinct US-market formula (chemical/organic UV filters) from a separate UK 'Moisturising Gel Sunscreen' version that instead uses homosalate, ethylhexyl salicylate, and butyl methoxydibenzoylmethane as filters -- the two should not be conflated; this entry is specifically the US avobenzone/homosalate/octisalate version."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-brightening-serum",
    "brand": "Byoma",
    "name": "Brightening Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Methylpropanediol",
      "Niacinamide",
      "1,2-Hexanediol",
      "Glycerin",
      "Polyglyceryl-10 Laurate",
      "Sodium Hyaluronate",
      "Ceramide NP",
      "Cholesterol",
      "Caprylic/Capric Triglyceride",
      "Phytosphingosine",
      "Sodium Phytate",
      "Ascorbic Acid",
      "Stearic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/product/brightening-serum",
      "https://www.cultbeauty.co.uk/p/15403472/",
      "https://www.skincarisma.com/products/byoma/brightening-serum-e16127a7-b2a9-4438-ba51-7c6155bdeedb/ingredient_list"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's ordered partial list (14 items) was cross-checked against the brand's own site, which independently names the first three solvent/active ingredients (water, methylpropanediol, 1,2-hexanediol) in the same order; a third source reports 25 total ingredients."
    },
    "knownIssues": [
      "Only 14 of 25 reported total ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-hydrating-serum",
    "brand": "Byoma",
    "name": "Hydrating Serum",
    "catalogCategory": "serum",
    "tags": [
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Butylene Glycol",
      "Squalane",
      "Glyceryl Oleate",
      "Ethylhexylglycerin",
      "Dipotassium Glycyrrhizate",
      "Ceramide NP",
      "Caprylic/Capric Triglyceride",
      "Cholesterol",
      "Phytosphingosine",
      "Tocopherol",
      "Caprylhydroxamic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/products/hydrating-serum",
      "https://gg.feelunique.com/p/Byoma-Hydrating-Serum-30ml",
      "https://skinsort.com/products/byoma/hydrating-serum"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The brand's own ingredient breakdown was cross-checked against a retailer's partial list ending in the same chelating agent (caprylhydroxamic acid); Skinsort and Skincarisma independently agree on a 28-ingredient total."
    },
    "knownIssues": [
      "Only 13 of 28 reported total ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-blemish-clearing-cleanser",
    "brand": "Byoma",
    "name": "Blemish Clearing Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Glycerin",
      "Propylene Glycol",
      "Hamamelis Virginiana (Witch Hazel) Water",
      "Stearic Acid",
      "Zinc Gluconate",
      "Camellia Sinensis Leaf Extract",
      "Allantoin",
      "Phytosphingosine",
      "Ceramide NP",
      "Cocamidopropyl Betaine",
      "Sodium Methyl Cocoyl Taurate",
      "Glyceryl Stearate",
      "Salicylic Acid",
      "Sodium Hydroxide",
      "Glycol Distearate",
      "Ethyl Linoleate"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://uk.byoma.com/products/blemish-clearing-cleanser",
      "https://www.cultbeauty.com/p/byoma-blemish-system/17763707/",
      "https://skinsort.com/products/byoma/blemish-clearing-cleanser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The brand's own UK site's function-grouped ingredient list was cross-checked against a retailer's INCI-ordered list, which independently confirms the same opening sequence (water, glycerin, witch hazel water)."
    },
    "knownIssues": [
      "An independent database (Skinsort) reports 27 total ingredients and lists several preservatives (phenoxyethanol, potassium sorbate, sodium benzoate) not present in the brand's own 17-item list, suggesting the brand's list may not be fully exhaustive or may reflect a different formulation batch."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-bio-collagen-radiance-facial-mask",
    "brand": "Byoma",
    "name": "Bio-Collagen Radiance Facial Mask",
    "catalogCategory": "other",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Simmondsia Chinensis (Jojoba) Seed Oil",
      "Methylpropanediol",
      "1,2-Hexanediol",
      "Caprylyl Glycol",
      "Caprylhydroxamic Acid",
      "Glycerin",
      "Tocopherol",
      "Stearic Acid",
      "Lactic Acid",
      "Caprylic/Capric Triglyceride"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://byoma.com/products/bio-collagen-mask",
      "https://www.skincarisma.com/products/byoma/bio-collagen-radiance-facial-mask",
      "https://www.ulta.com/p/bio-collagen-radiance-facial-mask-pimprod2056785"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "Brand site and two retailers' partial ingredient lists overlap on several items (caprylhydroxamic acid, glycerin, tocopherol), and two independent databases agree on a 32-ingredient total."
    },
    "knownIssues": [
      "This product is marketed as a 'bio-collagen' mask but no collagen or collagen-derived ingredient was found in any available partial listing; only 11 of 32 reported total ingredients confirmed."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-blemish-control-moisturizer",
    "brand": "Byoma",
    "name": "Blemish Control Moisturizer",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Water",
      "Propanediol",
      "Glycerin",
      "Salicylic Acid",
      "Bakuchiol",
      "Xanthan Gum",
      "Phytosphingosine",
      "Ceramide NP",
      "Carbomer",
      "Rutin",
      "Tocopherol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://www.cultbeauty.com/p/byoma-blemish-system/17763707/",
      "https://skinsort.com/products/byoma/blemish-control-moisturizer",
      "https://whatsinmyjar.com/product/byoma-blemish-control-moisturiser"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "low",
      "summary": "A retailer's truncated ordered list was cross-checked against an independent database's partial ingredient set (propanediol, bakuchiol, xanthan gum, phytosphingosine, ceramide NP, rutin), both agreeing the product contains salicylic acid as a leave-on acne treatment ingredient."
    },
    "knownIssues": [
      "Only 11 of 22 reported total ingredients confirmed; a third-party analysis site's salicylic acid concentration estimate (1-1.5%) is an unverified third-party inference, not a label claim."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-byoma-hydrating-body-lotion",
    "brand": "Byoma",
    "name": "Hydrating Body Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "body",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": [
      "Water",
      "Ricinus Communis (Castor) Seed Oil",
      "Ethylhexyl Palmitate",
      "Glycerin",
      "Glyceryl Stearate SE",
      "Cetyl Alcohol",
      "Butyrospermum Parkii (Shea) Butter",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
      "Avena Sativa (Oat) Kernel Extract",
      "Bakuchiol",
      "Caprylhydroxamic Acid"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [
      "https://cultbeauty.com/p/byoma-hydrating-body-wash-400ml-and-hydrating-body-lotion-400ml-bundle/15461271",
      "https://byoma.com/product/hydrating-body-lotion",
      "https://www.skincarisma.com/products/byoma/hydrating-body-lotion"
    ],
    "corroboration": {
      "checkedDate": "2026-11-02",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "A retailer's full ordered INCI string for the 400ml bottle was cross-checked against the brand's own site's named highlight ingredients (bakuchiol, caprylhydroxamic acid), both present in the same combined list."
    },
    "knownIssues": [
      "Retailer-sourced list is for the 400ml size specifically; formulation may differ by size/region. Independent databases report ~35 total ingredients, more than the 12 confirmed here."
    ],
    "note": null,
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-gentle-facial-cleanser",
    "brand": "Vanicream",
    "name": "Gentle Facial Cleanser",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-daily-facial-moisturizer-spf-30",
    "brand": "Vanicream",
    "name": "Daily Facial Moisturizer SPF 30",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-lite-lotion",
    "brand": "Vanicream",
    "name": "Lite Lotion",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-sunscreen-spf-50-sport",
    "brand": "Vanicream",
    "name": "Sunscreen SPF 50 Sport",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-z-bar-medicated-cleansing-bar",
    "brand": "Vanicream",
    "name": "Z-Bar Medicated Cleansing Bar",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "body"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-lip-protectant",
    "brand": "Vanicream",
    "name": "Lip Protectant",
    "catalogCategory": "other",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-aquaphor-healing-ointment",
    "brand": "Aquaphor",
    "name": "Healing Ointment",
    "catalogCategory": "other",
    "tags": [
      "fragrance-free",
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-aquaphor-baby-healing-ointment",
    "brand": "Aquaphor",
    "name": "Baby Healing Ointment",
    "catalogCategory": "other",
    "tags": [
      "baby-kids",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-aquaphor-lip-repair-stick",
    "brand": "Aquaphor",
    "name": "Lip Repair Stick",
    "catalogCategory": "other",
    "tags": [
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-aquaphor-itch-relief-ointment",
    "brand": "Aquaphor",
    "name": "Itch Relief Ointment",
    "catalogCategory": "other",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-aquaphor-baby-wash-shampoo",
    "brand": "Aquaphor",
    "name": "Baby Wash & Shampoo",
    "catalogCategory": "cleanser",
    "tags": [
      "baby-kids",
      "body"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-bioderma-sensibio-h2o-micellar-water",
    "brand": "Bioderma",
    "name": "Sensibio H2O Micellar Water",
    "catalogCategory": "cleanser",
    "tags": [
      "sensitive-skin",
      "fragrance-free"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-bioderma-sensibio-forte",
    "brand": "Bioderma",
    "name": "Sensibio Forte",
    "catalogCategory": "other",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-bioderma-s-bium-h2o-micellar-water",
    "brand": "Bioderma",
    "name": "Sébium H2O Micellar Water",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-bioderma-s-bium-foaming-gel",
    "brand": "Bioderma",
    "name": "Sébium Foaming Gel",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-bioderma-atoderm-intensive-baume",
    "brand": "Bioderma",
    "name": "Atoderm Intensive Baume",
    "catalogCategory": "moisturizer",
    "tags": [
      "sensitive-skin",
      "for-dry-skin",
      "body"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-bioderma-photoderm-max-spf-50-cream",
    "brand": "Bioderma",
    "name": "Photoderm Max SPF 50+ Cream",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-eltamd-uv-clear-broad-spectrum-spf-46",
    "brand": "EltaMD",
    "name": "UV Clear Broad-Spectrum SPF 46",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-eltamd-uv-daily-broad-spectrum-spf-40",
    "brand": "EltaMD",
    "name": "UV Daily Broad-Spectrum SPF 40",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-eltamd-uv-physical-broad-spectrum-spf-41",
    "brand": "EltaMD",
    "name": "UV Physical Broad-Spectrum SPF 41",
    "catalogCategory": "sunscreen",
    "tags": [
      "sensitive-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-eltamd-uv-sport-broad-spectrum-spf-50",
    "brand": "EltaMD",
    "name": "UV Sport Broad-Spectrum SPF 50",
    "catalogCategory": "sunscreen",
    "tags": [
      "body"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-eltamd-am-therapy-facial-moisturizer",
    "brand": "EltaMD",
    "name": "AM Therapy Facial Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-eltamd-pm-therapy-facial-moisturizer",
    "brand": "EltaMD",
    "name": "PM Therapy Facial Moisturizer",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-kiehl-s-ultra-facial-cream",
    "brand": "Kiehl's",
    "name": "Ultra Facial Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-kiehl-s-ultra-facial-cleanser",
    "brand": "Kiehl's",
    "name": "Ultra Facial Cleanser",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-kiehl-s-calendula-herbal-extract-toner",
    "brand": "Kiehl's",
    "name": "Calendula Herbal Extract Toner",
    "catalogCategory": "toner",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-kiehl-s-midnight-recovery-concentrate",
    "brand": "Kiehl's",
    "name": "Midnight Recovery Concentrate",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-kiehl-s-clearly-corrective-dark-spot-solution",
    "brand": "Kiehl's",
    "name": "Clearly Corrective Dark Spot Solution",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-kiehl-s-blue-herbal-acne-cleanser-treatment",
    "brand": "Kiehl's",
    "name": "Blue Herbal Acne Cleanser Treatment",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-clinique-dramatically-different-moisturizing-lotion",
    "brand": "Clinique",
    "name": "Dramatically Different Moisturizing Lotion+",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-clinique-moisture-surge-100h-auto-replenishing-hydrator",
    "brand": "Clinique",
    "name": "Moisture Surge 100H Auto-Replenishing Hydrator",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-clinique-liquid-facial-soap",
    "brand": "Clinique",
    "name": "Liquid Facial Soap",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-clinique-acne-solutions-cleansing-foam",
    "brand": "Clinique",
    "name": "Acne Solutions Cleansing Foam",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-clinique-even-better-clinical-dark-spot-corrector",
    "brand": "Clinique",
    "name": "Even Better Clinical Dark Spot Corrector",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-clinique-anti-blemish-solutions-clearing-gel",
    "brand": "Clinique",
    "name": "Anti-Blemish Solutions Clearing Gel",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vichy-mineral-89-hyaluronic-acid-serum",
    "brand": "Vichy",
    "name": "Mineral 89 Hyaluronic Acid Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Real, well-known product name from general knowledge of the brand's lineup — not researched via web search this session (the research pass for this brand ran out of search budget before starting). Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vichy-normaderm-phytosolution-daily-deep-cleansing-gel",
    "brand": "Vichy",
    "name": "Normaderm Phytosolution Daily Deep Cleansing Gel",
    "catalogCategory": "cleanser",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vichy-lift-ctiv-vitamin-c-brightening-serum",
    "brand": "Vichy",
    "name": "Liftáctiv Vitamin C Brightening Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vichy-capital-soleil-uv-age-daily-spf-46",
    "brand": "Vichy",
    "name": "Capital Soleil UV Age Daily SPF 46",
    "catalogCategory": "sunscreen",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vichy-aqualia-thermal-rich-cream",
    "brand": "Vichy",
    "name": "Aqualia Thermal Rich Cream",
    "catalogCategory": "moisturizer",
    "tags": [
      "for-dry-skin"
    ],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Not researched via web search this session. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-peach-slices-dew-it-glow-serum",
    "brand": "Peach Slices",
    "name": "Dew It Glow Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "Brand's current lineup/naming not independently confirmed this session — included at lower confidence of existence than other entries in this file."
    ],
    "note": "Not researched via web search this session; this brand's product name is less certain than others in this file. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-peach-slices-omega-hero-serum",
    "brand": "Peach Slices",
    "name": "Omega Hero Serum",
    "catalogCategory": "serum",
    "tags": [],
    "region": null,
    "ingredients": null,
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "unavailable",
    "dataSourceNote": "No ingredient list could be found for this product yet — it's included so you can find it by name, and you can enter its ingredients manually to get a compatibility score.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [
      "Brand's current lineup/naming not independently confirmed this session — included at lower confidence of existence than other entries in this file."
    ],
    "note": "Not researched via web search this session; this brand's product name is less certain than others in this file. Ingredients not yet available.",
    "verifiedDate": null
  },
  {
    "id": "cat-vanicream-moisturizing-cream",
    "brand": "Vanicream",
    "name": "Moisturizing Cream",
    "catalogCategory": "moisturizer",
    "tags": [],
    "region": null,
    "ingredients": [
      "Petrolatum",
      "Sorbitol",
      "Glycerin",
      "Sunflower Seed Oil"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [],
    "corroboration": null,
    "knownIssues": [],
    "note": "Marketed free of dyes, fragrance, parabens, formaldehyde, and lanolin.",
    "verifiedDate": null
  },
  {
    "id": "cat-differin-adapalene-gel-0-1",
    "brand": "Differin",
    "name": "Adapalene Gel 0.1%",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Adapalene",
      "Carbomer 940",
      "Edetate Disodium",
      "Methylparaben",
      "Poloxamer 182",
      "Propylene Glycol"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [],
    "corroboration": {
      "checkedDate": "2026-10-29",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "The core inactive-ingredient vehicle matches two independent reproductions of the US FDA label (via NDC 0299-4910). No official Galderma/DailyMed page was read directly."
    },
    "knownIssues": [
      "The US FDA label also lists Purified Water and Sodium Hydroxide as inactive ingredients (omitted here as unremarkable for scoring). An older non-US (South Africa) label lists Phenoxyethanol as an additional preservative not present in the US version — inactive-ingredient lists differ by region."
    ],
    "note": "Adapalene is the active ingredient at 0.1% (an exact, label-stated concentration — not estimated).",
    "verifiedDate": null
  },
  {
    "id": "cat-panoxyl-acne-foaming-wash-10-benzoyl-peroxide",
    "brand": "PanOxyl",
    "name": "Acne Foaming Wash 10% Benzoyl Peroxide",
    "catalogCategory": "acneTreatment",
    "tags": [],
    "region": null,
    "ingredients": [
      "Benzoyl Peroxide"
    ],
    "ingredientsComplete": false,
    "verified": false,
    "dataSource": "corroborated_secondary",
    "dataSourceNote": "Ingredient list cross-checked against secondary/retailer sources during catalog research — not independently verified against an official manufacturer source.",
    "sourceUrls": [],
    "corroboration": {
      "checkedDate": "2026-10-29",
      "method": "websearch_secondary_sources",
      "confidence": "medium",
      "summary": "Benzoyl Peroxide 10% as the sole active is consistent across every retailer listing found. No manufacturer-run label page was found; inactive ingredients were not added here due to the SKU-level disagreement above."
    },
    "knownIssues": [
      "Inactive ingredients differ by package size/SKU found during research (1oz listings show Water + T-butyl Alcohol; 5.5oz listings show Aqua + Oleic Acid, or Water + T-butyl Alcohol with no oleic acid depending on retailer) — this catalog entry does not specify a size/SKU and only the confirmed active ingredient is listed."
    ],
    "note": "Benzoyl Peroxide is the active ingredient at 10% (an exact, label-stated concentration — not estimated). Rinse-off wash, not a leave-on treatment.",
    "verifiedDate": null
  }
];

