# Supabase schema

`migrations/0001_init.sql` creates the full v1 schema: `businesses`,
`business_members`, `locations`, `oauth_credentials`, `reviews`, `replies`,
`audit_log`, `notifications`, plus row-level security policies that scope
every table to the authenticated user's business membership.

This has been test-applied against a real Postgres instance (with a
minimal stand-in for Supabase's `auth.users`/`auth.uid()`) to verify: the
migration runs cleanly end to end, RLS actually isolates one business's
data from another user with no membership, `oauth_credentials` is
unreadable by any client role, and a business's owner cannot have their
approval on a reply overwritten by an unrelated user.

## Applying this to your real Supabase project

1. Install the Supabase CLI (`npm install -g supabase` or see
   https://supabase.com/docs/guides/cli).
2. `supabase login`, then `supabase link --project-ref <your-project-ref>`
   from the `review-pilot-saas/` directory (the project ref is in your
   Supabase project's dashboard URL).
3. `supabase db push` — applies `migrations/0001_init.sql` to your linked
   project.
4. Business creation from the app must go through the `create_business(name,
   industry)` RPC (`supabase.rpc('create_business', { p_name, p_industry })`),
   not a direct `insert()` into `businesses` — see the comment above that
   function in the migration for why.
