# ReviewPilot AI — Phase 4: Coding Task Backlog

Smallest-shippable-unit breakdown. Each task is built, tested, committed, and
pushed one at a time, with approval requested before moving to the next.

- [x] **Task 1 — Project scaffold**: Next.js 16 (App Router) + TypeScript +
      Tailwind app, lint/format config, base layout, health-check route,
      builds clean.
- [x] **Task 2 — Supabase schema & migrations**: businesses, business_members,
      locations, oauth_credentials, reviews, replies, audit_log,
      notifications + RLS policies. Test-applied against a real Postgres
      instance to verify tenant isolation actually holds.
- [x] **Task 3 — Supabase Auth wiring**: email/password + Google OAuth
      sign-in/up pages, session handling via `src/proxy.ts`, protected
      `/dashboard` route (redirects signed-out users to sign-in, business-less
      users to onboarding).
- [x] **Task 4 — Business onboarding flow**: `/onboarding` collects business
      name/industry and calls the `create_business()` RPC. Staff invites are
      not yet built (RLS supports the `staff` role; no UI yet).
- [ ] Task 5 — Google Business Profile OAuth connect flow.
- [ ] Task 6 — GBP API client wrapper (fetch reviews, post reply, token refresh).
- [ ] Task 7 — Inngest setup + `poll-reviews` scheduled function.
- [ ] Task 8 — Voice profile data model + onboarding questionnaire UI.
- [ ] Task 9 — Claude API integration for draft generation (`generate-draft`
      Inngest function, structured JSON output, prompt caching).
- [ ] Task 10 — Inbox dashboard UI (review + draft list, mobile-first) — a
      placeholder "no reviews yet" state exists at `/dashboard` today.
- [ ] Task 11 — Approve / Edit-then-Approve / Skip actions, posting to GBP,
      audit log writes.
- [x] **Task 12 — Stripe Checkout integration**: `/api/checkout` creates a
      customer + 14-day-trial subscription Checkout session; onboarding
      redirects into it after business creation.
- [x] **Task 13 — Stripe webhook handler**: `/api/stripe/webhook` verifies
      signatures and syncs `businesses.plan` on checkout completion,
      subscription updates, and cancellations. Fine-grained feature gating
      per plan is not yet wired into the UI.
- [ ] Task 14 — Stripe Customer Portal link in settings.
- [ ] Task 15 — Daily digest email (Inngest cron + Resend).
- [ ] Task 16 — Analytics dashboard (rating trend, response time, approve/edit rate).
- [ ] Task 17 — Team members & roles (owner/staff invite).
- [ ] Task 18 — Rate limiting on AI-generation and public API routes.
- [ ] Task 19 — Sentry error monitoring setup.
- [x] **Task 20 — Marketing landing page**: real copy shipped, plus pricing,
      FAQ, terms, privacy, and demo pages.
- [ ] Task 21 — CI pipeline (GitHub Actions: typecheck, lint, test) + Vercel
      deployment wiring.
- [ ] Task 22 — SMS alerts (Twilio) for 1–2★ reviews, Pro plan.
- [ ] Task 23 — Facebook Page reviews integration (v1.1).
- [ ] Task 24 — Yelp Fusion read-only integration, draft + copy-to-clipboard (v1.1).
- [ ] Task 25 — Autopilot for 4–5★ auto-posting, Pro plan opt-in (v1.2).
- [ ] Task 26 — Agency multi-location white-label dashboard (v1.3).

Tasks 1–21 constitute the v1 launchable product described in the PRD.
Tasks 22–26 are explicitly deferred (see PRD §2 Non-goals).
