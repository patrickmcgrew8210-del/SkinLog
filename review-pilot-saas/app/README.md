# ReviewPilot AI — App

Next.js 16 (App Router) + TypeScript + Tailwind CSS. This is the SaaS
product's marketing site, auth, dashboard, and API — see `../docs/` for the
business plan, architecture, and PRD.

## Local development

```bash
cp .env.example .env.local   # fill in real values — see ../GO-LIVE-CHECKLIST.md
npm install
npm run dev
```

Visit http://localhost:3000. Health check: http://localhost:3000/api/health.

## Environment variables

See `.env.example` for the full list and `../GO-LIVE-CHECKLIST.md` for
exactly where to get each value (Supabase project settings, etc.).

| Variable | Used by |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser, server, and proxy Supabase clients |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser, server, and proxy Supabase clients (RLS-restricted) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin client (`src/lib/supabase/admin.ts`) — bypasses RLS, never expose to the browser |
| `STRIPE_SECRET_KEY` | `/api/checkout` and `/api/stripe/webhook` |
| `STRIPE_WEBHOOK_SECRET` | Verifying Stripe webhook signatures |
| `STRIPE_PRICE_STARTER` / `_GROWTH` / `_PRO` | Price IDs from Stripe Dashboard products, one per plan |
| `GEMINI_API_KEY` | `/api/drafts/generate` (Gemini-powered draft replies, free tier) |

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit

## Deployment (Vercel)

1. Push this repo to GitHub (already done — branch `claude/ai-review-response-saas-wu4mco`).
2. In Vercel, "Add New Project" → import the repo → set **Root Directory**
   to `review-pilot-saas/app` (this is a subdirectory of the SkinLog repo,
   not the repo root).
3. Framework preset: Next.js (auto-detected). Build command and output
   directory: leave as Vercel defaults (`next build`, `.next`).
4. Add the environment variables listed above in Vercel's Project Settings
   → Environment Variables, for both Production and Preview.
5. Deploy. Every push to `main` deploys to production; every PR gets a
   preview deployment automatically.

## Project layout

- `src/app/` — App Router pages and API routes (landing, pricing, FAQ,
  terms, privacy, sign-in/up, onboarding, dashboard).
- `src/app/dashboard/` — protected area; `layout.tsx` redirects signed-out
  users to `/sign-in` and users without a business to `/onboarding`.
- `src/lib/supabase/` — `client.ts` (browser), `server.ts` (Server
  Components/Route Handlers, cookie-based session), `admin.ts`
  (service-role, server-only, bypasses RLS — used by webhooks/background jobs).
- `src/proxy.ts` — refreshes the Supabase session cookie on each request.
- `src/app/api/health/route.ts` — liveness check used by uptime monitoring.
- `src/app/api/checkout/route.ts` — creates a Stripe Checkout session (14-day
  trial) for the signed-in user's business.
- `src/app/api/stripe/webhook/route.ts` — verifies Stripe webhook signatures
  and syncs `businesses.plan` on checkout completion, subscription updates,
  and cancellations.
- `src/lib/gemini.ts` — Gemini-powered draft-reply generation (free tier,
  no card required), given a review and a business's voice profile.
  Enforces in code (not just via prompt) that reviews rated 3 stars or
  below are always flagged for human review.
- `src/app/api/drafts/generate/route.ts` + `src/app/dashboard/try-a-draft/`
  — lets a signed-in owner paste in a review and see a live AI-drafted
  reply, using their saved voice profile (`src/app/dashboard/voice-profile/`).
  Useful standalone today for manually servicing customers before automatic
  Google Business Profile syncing is connected.
