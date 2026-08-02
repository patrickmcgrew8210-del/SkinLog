# ReviewPilot AI — Phase 2: System Architecture & Tech Stack

## 1. Guiding constraint

A solo founder with a limited budget cannot run servers, patch OS packages,
manage Kubernetes, or staff on-call. Every choice below optimizes for
**managed services with generous free tiers, low operational surface area,
and slow-changing infrastructure** over "best possible" performance.

## 2. Recommended stack (with rationale)

| Layer | Choice | Why |
|---|---|---|
| Frontend + Backend | **Next.js 14 (App Router) + TypeScript**, deployed on **Vercel** | One codebase for marketing site, dashboard, and API routes. Vercel deploys on `git push`, autoscaling, zero server management. Huge ecosystem/community for a solo dev to lean on. |
| Database + Auth | **Supabase** (managed Postgres + Auth + Row-Level Security) | One vendor covers DB, auth, and file storage. Postgres avoids NoSQL data-modeling foot-guns for relational data (businesses → locations → reviews → replies). RLS enforces per-tenant isolation at the database layer, not just in application code — critical since a bug in app code shouldn't leak Business A's reviews to Business B. |
| Background jobs / scheduling | **Inngest** | Review polling, AI draft generation, and digest emails are event-driven/scheduled work that shouldn't block HTTP requests. Inngest runs as serverless functions (fits Vercel), has built-in retries/backoff, and needs no queue infrastructure to operate. |
| AI integration | **Claude (Anthropic API)**, Sonnet-tier model | Strong instruction-following for constrained, on-brand text generation; prompt caching lets us cache each business's voice profile/system prompt cheaply across many draft generations. Structured output (JSON mode) used to return `{reply_text, tone_flags, needs_review}` reliably. |
| Review data sources | **Google Business Profile API** (primary), **Meta Graph API** (Facebook Page reviews), **Yelp Fusion API** (read-only — Yelp does not permit third-party posting, so Yelp is draft/copy-paste only) | Google is the dominant surface for the target verticals. Facebook and Yelp are read-first, with direct posting only where the platform's API actually allows it (Google and Facebook do; Yelp doesn't). We never build against undocumented/scraped endpoints — that's a ToS and reliability risk we can't afford as a solo founder. |
| Payments | **Stripe** (Checkout + Billing + Customer Portal) | Industry standard; Customer Portal offloads plan changes/cancellations/invoices entirely, which matters a lot when there's no support team. |
| Notifications | **Resend** (transactional email) + **Twilio SMS** (optional, Pro plan only, for urgent 1–2★ alerts) | Resend has a clean API and generous free tier for a pre-revenue product. SMS is opt-in and reserved for the "an angry review just came in" case, where email isn't fast enough. |
| Dashboard/UI | Next.js pages + **Tailwind CSS** + **Recharts** for the review-volume/sentiment trend charts | Tailwind matches fast, consistent styling without a design system team; Recharts is lightweight and covers the handful of charts the dashboard needs. |
| Secrets (OAuth tokens for GBP/Facebook) | Encrypted at rest via **Supabase Vault** (pgsodium) | Business owners connect their Google/Facebook accounts via OAuth; the resulting access/refresh tokens are high-value secrets and must never sit in plaintext columns. |
| Deployment | **Vercel** (app) + **Supabase** (managed Postgres, hosted) + **Inngest Cloud** (job execution) | No servers to patch, no containers to orchestrate. All three have free tiers sufficient through the first ~50-100 customers. |
| Monitoring/Errors | **Sentry** (error tracking) + Vercel Analytics | Minimal-maintenance visibility into production errors without building an observability stack. |

## 3. High-level architecture

```
                        ┌─────────────────────────┐
                        │   Marketing site (SSR)   │
                        │      Next.js on Vercel   │
                        └───────────┬─────────────┘
                                    │
                        ┌───────────▼─────────────┐
                        │   Dashboard (Next.js)     │
                        │  /app router, RSC + API   │
                        └───────────┬─────────────┘
                                    │  Supabase JS client (RLS-enforced)
              ┌─────────────────────┼─────────────────────┐
              │                     │                       │
   ┌──────────▼─────────┐ ┌────────▼────────┐   ┌──────────▼─────────┐
   │   Supabase Postgres  │ │  Supabase Auth  │   │   Stripe (Billing)  │
   │  (businesses, users,  │ │ (email + Google │   │  Checkout, Portal,  │
   │  locations, reviews,  │ │      OAuth)     │   │  webhooks -> DB     │
   │  replies, audit_log)  │ └─────────────────┘   └─────────────────────┘
   └──────────┬───────────┘
              │
   ┌──────────▼─────────────────────────────────────────────┐
   │                    Inngest functions                     │
   │  - poll-reviews (cron, per connected location, ~hourly)  │
   │  - generate-draft (event: review.created)                │
   │  - post-reply (event: reply.approved, if auto-post plan) │
   │  - send-digest (cron, daily/weekly email summary)        │
   └──────────┬─────────────────────┬─────────────────────────┘
              │                     │
   ┌──────────▼─────────┐ ┌─────────▼──────────┐
   │  Google Business /   │ │   Claude API        │
   │  Meta Graph / Yelp   │ │ (draft generation)  │
   │  Fusion APIs         │ └─────────────────────┘
   └──────────────────────┘
```

## 4. Core data model (Postgres / Supabase)

- `businesses` — id, name, industry, voice_profile (jsonb: tone samples,
  signature, do/don't rules), stripe_customer_id, plan, created_at
- `users` — Supabase-managed auth.users, joined via `business_members`
  (business_id, user_id, role: owner/staff)
- `locations` — business_id, platform (google/facebook/yelp), external_id,
  oauth_credential_id, display_name, connected_at
- `oauth_credentials` — encrypted access/refresh tokens (Vault), location_id,
  expires_at
- `reviews` — location_id, platform_review_id, author_name, rating, body,
  posted_at, sentiment (derived), status (new/drafted/approved/posted/skipped)
- `replies` — review_id, draft_text, final_text, generated_by (ai/human-edited),
  approved_by, approved_at, posted_at, posting_method (api/manual-copy)
- `audit_log` — actor, action, entity, entity_id, metadata, created_at (every
  approval, edit, and post is logged — required for trust and dispute
  resolution)

Row-Level Security policies scope every table to `business_id` matching the
authenticated user's `business_members` rows — tenant isolation is enforced
by the database, not just application logic.

## 5. Authentication & authorization

- Supabase Auth: email/password + "Sign in with Google" (also convenient
  since most target businesses already have a Google account for GBP).
- Roles: `owner` (billing, connect/disconnect platforms, invite staff) and
  `staff` (approve/edit replies only — useful for a front-desk employee who
  handles reviews day-to-day without touching billing).
- Platform connections (Google Business Profile, Facebook Page) use OAuth 2.0
  with the minimum scopes required (`business.manage` for GBP,
  `pages_manage_engagement` + `pages_read_engagement` for Facebook); tokens
  refreshed automatically by the polling job and revoked immediately on
  disconnect.

## 6. AI integration design

- Each business has a **voice profile**: 3–5 sample past replies (or a short
  tone questionnaire completed at onboarding if they have no history),
  business name, industry, and explicit do/don't rules (e.g., "never offer
  refunds in a public reply," "always sign off with the owner's first name").
- The voice profile is rendered into a system prompt and cached via Claude's
  prompt caching, since it's reused for every draft for that business —
  keeps inference cost low at scale.
- Generation request includes: review text, star rating, business voice
  profile, and platform (tone differs slightly — Google replies are public
  and SEO-visible; Facebook replies are more conversational).
- Output is constrained JSON: `{ "reply": string, "flag_for_review": boolean,
  "flag_reason": string | null }`. The model itself flags anything referencing
  legal threats, health/safety claims (important for dental/med spa —
  HIPAA-adjacent caution), or requests that need owner-specific facts it
  doesn't have — these are always routed to manual approval regardless of
  plan/autopilot settings.
- **Hard rule, enforced in code, not just prompted:** reviews rated 1–3 stars
  are *never* eligible for autopilot, on any plan. Only 4–5★ reviews can be
  auto-posted, and only on the Pro plan with autopilot explicitly enabled.

## 7. Payment processing

- Stripe Checkout for signup (trial-then-subscribe), Stripe Billing for plan
  management, Stripe Customer Portal linked from the dashboard for
  self-service upgrades/downgrades/cancellations/invoice history.
- Stripe webhooks (`checkout.session.completed`, `customer.subscription.*`,
  `invoice.payment_failed`) update `businesses.plan` and gate feature access;
  failed payments trigger a dunning email sequence (Stripe Smart Retries)
  before downgrade/suspension.

## 8. Notifications

- Transactional (Resend): new-review digest (daily default, configurable to
  immediate), draft-ready notification, payment failed, weekly summary
  report (reviews received, avg rating, response time, replies approved).
- SMS (Twilio, Pro plan): immediate alert on any 1–2★ review, opt-in only.
- In-app: a notification bell in the dashboard backed by a `notifications`
  table, read via Supabase Realtime subscription (no extra infra needed —
  it's a Postgres feature Supabase already exposes).

## 9. Dashboard

- **Inbox view**: queue of new reviews with AI-drafted replies, one-click
  Approve / Edit-then-Approve / Skip, keyboard shortcuts for power users.
- **Analytics view**: review volume over time, rating distribution, average
  response time, approval vs. edit rate (signal for voice-profile tuning).
- **Settings**: connected platforms (OAuth connect/disconnect), voice
  profile editor, team members, billing (embeds Stripe Customer Portal).
- Mobile-responsive by default (Tailwind) since Dana checks this from her
  phone between patients/jobs — this is not a "nice to have," it's the
  primary usage pattern.

## 10. Security

- RLS on every table; service-role key used only in trusted server contexts
  (Inngest functions), never shipped to the client.
- OAuth tokens encrypted at rest (Supabase Vault); scoped to minimum
  permissions; refreshed and rotated automatically.
- All traffic over HTTPS (enforced by Vercel/Supabase by default).
- Stripe webhook signatures verified; Inngest function invocations verified
  via signing key.
- Audit log for every reply approval/edit/post — needed both for customer
  trust ("show me exactly what was posted and when") and for our own dispute
  resolution if a business claims something was posted without approval.
- Rate limiting on public API routes (Vercel/Upstash Redis rate limiter) to
  prevent abuse of the AI-generation endpoint.
- Least-privilege service accounts for the Google/Meta API integrations;
  no broader scopes requested than the reviews feature needs.

## 11. Deployment & environments

- `main` branch → Vercel Production; every PR gets an automatic Vercel
  Preview deployment for manual QA before merge.
- Three Supabase projects: local (Supabase CLI + Docker for dev), staging,
  production — schema migrations tracked in `supabase/migrations` and applied
  via `supabase db push` in CI.
- GitHub Actions: typecheck, lint, unit tests on every PR; blocks merge on
  failure. No separate CI infra to maintain — GitHub Actions is free for a
  repo this size.
- Environment variables (Stripe keys, Anthropic key, OAuth client secrets)
  stored in Vercel's encrypted environment variable store, never committed.

## 12. Why this stack over alternatives considered

- **Considered Django/Rails + self-hosted Postgres on a VPS**: rejected —
  adds server patching, backups, and scaling as ongoing maintenance a solo
  founder doesn't have time for.
- **Considered Firebase instead of Supabase**: rejected — Postgres + SQL is a
  better fit for the relational, multi-tenant data model here (locations →
  reviews → replies), and RLS gives real tenant isolation that Firestore
  security rules make more awkward to express and audit.
- **Considered building a custom job queue (BullMQ + Redis)**: rejected in
  favor of Inngest — one more piece of infrastructure (Redis) to run and
  monitor is exactly the kind of ongoing burden this project is designed to
  avoid.
