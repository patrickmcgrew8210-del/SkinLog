-- Adds the experiments column to support the Experiments feature
-- (self-tracked before/during/after comparisons for a product or
-- routine change the user deliberately decides to test).
--
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- (Run this in addition to supabase-schema.sql, not instead of it.)
--
-- ── DEPLOYMENT ORDER — READ BEFORE SHIPPING THE CLIENT CODE ──
-- 1. Run this migration against the live database first.
-- 2. Verify it succeeded (query at the bottom of this file).
-- 3. Only then deploy/merge the client-code commits that read or write
--    the `experiments` field.
--
-- Why the order matters: the client's toRow() (js/backend.js) sends the
-- ENTIRE row — entries, products, current_products, settings,
-- display_name, and now experiments — on every single save, not just
-- experiment-related ones. PostgREST rejects an update/insert that
-- references a column which doesn't exist on the table. If the client
-- code ships before this column exists, EVERY save fails for EVERY
-- user, not just anything touching experiments, until this migration
-- runs. Running this first and confirming the column exists removes
-- that risk entirely.

alter table public.skinlog_data
  add column if not exists experiments jsonb not null default '[]'::jsonb;

-- No RLS policy changes needed. The existing policies on
-- public.skinlog_data ("Users can view own data" / "...insert..." /
-- "...update...", all scoped to auth.uid() = user_id) apply at the row
-- level, so they already cover this new column exactly the way they
-- already cover entries/products/current_products/settings — there is
-- no per-column RLS in this schema to extend.

-- Verify after running: should return one row showing the new column
-- with its default. If this returns nothing, the migration did not
-- apply and the client code must not be deployed yet.
-- select column_name, column_default, is_nullable
--   from information_schema.columns
--   where table_name = 'skinlog_data' and column_name = 'experiments';
