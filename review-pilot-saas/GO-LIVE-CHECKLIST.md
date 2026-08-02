# Go-Live Checklist — ReviewPilot AI

Everything in this checklist requires *your* identity, business details, or
payment info, so none of it could be done for you — an AI agent cannot open
a bank-linked Stripe account, verify a Google Cloud OAuth consent screen, or
accept a Supabase Terms of Service on your behalf. Everything else (all the
code, copy, and docs in this repo) is already done. This is the list of
what's left, in the order that gets you able to take money fastest.

## 0. Fastest path to your first dollar (do this today, skip the rest for now)

You do **not** need to finish the items below to start selling. Use the
concierge onboarding flow (`docs/05-onboarding-flow.md`):

1. Create a Stripe account (see step 2 below — takes ~15 minutes,
   verification can finish later).
2. In the Stripe Dashboard, create a **Payment Link** for one plan (e.g.
   Growth, $79/mo) — no code required.
3. Start outreach using `docs/sales-and-marketing/cold-email-sequence.md`
   and `cold-call-script.md`, close a sale, send the Payment Link.
4. Service that first customer manually (see the concierge flow doc) while
   you finish the items below at your own pace.

## 1. Supabase (required for the self-serve product to work at all)

1. Sign up at supabase.com, create a new project (pick a region close to
   your customers, e.g. `us-east-1`).
2. In Project Settings → API, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret —
     never put it in a `NEXT_PUBLIC_*` variable or commit it)
3. Install the Supabase CLI and apply the schema:
   ```bash
   npm install -g supabase
   supabase login
   cd review-pilot-saas
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```
   (See `supabase/README.md` for details — this schema has already been
   test-applied against a real Postgres instance to verify the row-level
   security actually isolates tenants.)
4. In Authentication → URL Configuration, set **Site URL** to your deployed
   domain (or Vercel URL) and add `<your-domain>/auth/callback` as a
   Redirect URL.
5. Email confirmation: by default Supabase requires users to click a
   confirmation link before they get a session. That's fine and secure —
   the sign-up page already handles the "check your email" state. If you'd
   rather remove that step for a smoother trial signup, you can disable
   "Confirm email" in Authentication → Providers → Email (trade-off:
   slightly less spam protection).

## 2. Stripe (required to take any money)

1. Sign up at stripe.com and complete business verification (bank account,
   business details) — you can start in test mode immediately and finish
   verification before going live.
2. Product catalog → create 3 products, each with one recurring monthly
   price:
   - Starter — $39.00/month → copy the Price ID to `STRIPE_PRICE_STARTER`
   - Growth — $79.00/month → `STRIPE_PRICE_GROWTH`
   - Pro — $149.00/month → `STRIPE_PRICE_PRO`
3. Developers → API keys → copy the **Secret key** to `STRIPE_SECRET_KEY`.
4. Developers → Webhooks → Add endpoint:
   - URL: `https://<your-domain>/api/stripe/webhook`
   - Events to send: `checkout.session.completed`,
     `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the **Signing secret** to `STRIPE_WEBHOOK_SECRET`.
5. (Optional, for concierge sales — see section 0) Payment Links → create
   one per plan for manual sales before self-serve signup is fully live.

## 3. Google Cloud (required for "Sign in with Google" and, later, for the
   Google Business Profile integration)

1. Create a project at console.cloud.google.com.
2. APIs & Services → OAuth consent screen: fill in app name (ReviewPilot
   AI), support email, and add your domain once you have one.
3. APIs & Services → Credentials → Create OAuth client ID → Web application.
   - Authorized redirect URI:
     `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
4. Copy the Client ID and Client Secret into Supabase → Authentication →
   Providers → Google, and enable the provider.
5. Later, when building the Google Business Profile integration (Task 5 of
   the Phase 4 backlog, not yet built): the Business Profile API requires a
   separate access request/approval from Google that can take several
   business days — worth starting early once you have your first few
   customers lined up, since it's a hard dependency for automatic review
   syncing.

## 4. Anthropic (needed when AI draft generation — Task 9 of the backlog —
   is built; not required yet)

1. Sign up at console.anthropic.com and create an API key.
2. Store it as `ANTHROPIC_API_KEY` when that task adds it to `.env.example`.

## 5. Vercel (deployment)

1. Sign up at vercel.com, "Add New Project," import this repository.
2. Set **Root Directory** to `review-pilot-saas/app`.
3. Add every environment variable from `review-pilot-saas/app/.env.example`
   under Project Settings → Environment Variables, for both Production and
   Preview.
4. Deploy. Optionally attach a custom domain under Project Settings →
   Domains once you've registered one.

## 6. Housekeeping (do these once revenue is real, not before)

- **Domain + business email**: all contact points currently use
  `pmcgrew82@gmail.com` (in `terms/page.tsx`, `privacy/page.tsx`,
  `pricing/page.tsx`, `demo/page.tsx`). Once you register a domain, set up
  a domain email (Google Workspace, ~$6/mo, or a free Zoho Mail alias) and
  swap those four references.
- **Legal review**: the Terms of Service and Privacy Policy are complete,
  real documents written for this specific product (OAuth data handling,
  AI-generated content, autopilot disclaimers) — not filler text — but
  they haven't been reviewed by a lawyer. Worth a one-time review once
  you're processing real payments and real customer data at any scale.
- **Business entity**: consider forming an LLC once revenue is real, both
  for liability protection and because it simplifies opening a business
  bank account for Stripe payouts.
