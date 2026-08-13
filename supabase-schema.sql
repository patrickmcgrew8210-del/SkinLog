-- SkinLog cloud schema.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.skinlog_data (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  display_name      text,
  entries           jsonb not null default '[]'::jsonb,
  products          jsonb not null default '[]'::jsonb,
  current_products  jsonb not null default '{}'::jsonb,
  settings          jsonb not null default '{}'::jsonb,
  updated_at        timestamptz not null default now()
);

alter table public.skinlog_data enable row level security;

create policy "Users can view own data"
  on public.skinlog_data for select
  using (auth.uid() = user_id);

create policy "Users can insert own data"
  on public.skinlog_data for insert
  with check (auth.uid() = user_id);

create policy "Users can update own data"
  on public.skinlog_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
