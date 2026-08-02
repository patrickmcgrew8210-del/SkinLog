# ReviewPilot AI — App

Next.js 14 (App Router) + TypeScript + Tailwind CSS. This is the SaaS
product's marketing site, dashboard, and API — see `../docs/` for the
business plan, architecture, and PRD.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Health check: http://localhost:3000/api/health.

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
4. No environment variables are required yet for this initial scaffold.
   Later tasks will add `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, etc. — each will be documented
   in this README as it's introduced.
5. Deploy. Every push to `main` deploys to production; every PR gets a
   preview deployment automatically.

## Project layout

- `src/app/` — App Router pages and API routes.
- `src/app/page.tsx` — placeholder marketing homepage (real copy lands in
  Phase 5 / Task 20).
- `src/app/api/health/route.ts` — liveness check used by uptime monitoring.
