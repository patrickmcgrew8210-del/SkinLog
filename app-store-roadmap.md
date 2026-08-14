# Getting SkinLog into the App Store & Play Store

What's already done in the code, and the exact steps left — all of which
need your accounts/payment, so they can't be done from here.

## Already done (this repo)

- [x] Cloud accounts (email/password + Google) via Supabase
- [x] In-app account deletion — required by both stores
- [x] Privacy Policy (`privacy.html`) and Terms (`terms.html`), linked
      from the sign-in screen and account menu
- [x] App icons regenerated at all required sizes, including iOS's
      1024×1024 opaque App Store icon (`icons/ios-app-store-1024.png`)
- [x] `manifest.json` filled out with categories/lang/id for store
      packaging tools to read
- [x] Store listing copy drafted (`app-store-listing.md`)

## What's left — in order

### 1. Buy a custom domain
Any registrar (Namecheap, Cloudflare, etc.), ~$10-15/year. You'll point
this at your existing GitHub Pages deployment — no rebuilding needed.

### 2. Point the domain at GitHub Pages
1. In the repo: **Settings → Pages → Custom domain** → enter your domain
   → Save. GitHub adds the `CNAME` file to the repo automatically.
2. At your registrar, add the DNS records GitHub's docs specify for your
   setup (either an `ALIAS`/`ANAME` record, or four `A` records pointing
   at GitHub's IPs — GitHub shows you exactly which once you enter the
   domain in step 1).
3. Wait for DNS to propagate (minutes to a few hours), then check
   **"Enforce HTTPS"** in the same Pages settings once the checkbox
   becomes available.

### 3. Android — Google Play
1. Create a **Google Play Console** account ($25 one-time):
   play.google.com/console
2. Go to **pwabuilder.com**, enter your new custom domain URL, let it
   analyze the site
3. Download the **Android package** — PWABuilder generates the whole
   TWA wrapper and the `assetlinks.json` domain-verification file for
   you; it'll tell you exactly where to host that file (your domain's
   `.well-known/` folder) to prove you own it
4. Upload the generated `.aab` file to Play Console, fill in the store
   listing using `app-store-listing.md`, submit for review

### 4. iOS — App Store
1. Enroll in the **Apple Developer Program** ($99/year):
   developer.apple.com/programs
2. Use **pwabuilder.com** again — it can generate an iOS package too
   (via a Capacitor-based wrapper), or a developer familiar with Xcode
   can wrap it manually for more control
3. You'll need a Mac (or a cloud Mac service) to build and submit
   through Xcode / App Store Connect — this is an Apple platform
   requirement, not something PWABuilder can fully route around
4. Fill in App Store Connect's listing using `app-store-listing.md`,
   upload screenshots, submit for review

### Costs summary
| Item | Cost |
|---|---|
| Domain | ~$10-15/year |
| Google Play Console | $25 one-time |
| Apple Developer Program | $99/year |

Nothing above requires touching the app's code again unless a store
reviewer specifically requests a change — come back here if that happens
and I'll fix whatever they flag.
