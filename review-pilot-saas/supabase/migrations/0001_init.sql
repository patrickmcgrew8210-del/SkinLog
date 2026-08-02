-- ReviewPilot AI — initial schema
-- Multi-tenant model: every business-scoped table is reachable from
-- `businesses` and locked down with row-level security so a bug in
-- application code cannot leak one business's reviews to another.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Core tables
-- ---------------------------------------------------------------------

create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  voice_profile jsonb not null default '{}'::jsonb,
  stripe_customer_id text unique,
  plan text not null default 'trialing'
    check (plan in ('trialing', 'starter', 'growth', 'pro', 'agency', 'canceled')),
  created_at timestamptz not null default now()
);

create table business_members (
  business_id uuid not null references businesses (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'staff')),
  created_at timestamptz not null default now(),
  primary key (business_id, user_id)
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses (id) on delete cascade,
  platform text not null check (platform in ('google', 'facebook', 'yelp')),
  external_id text not null,
  display_name text,
  connected_at timestamptz,
  created_at timestamptz not null default now(),
  unique (business_id, platform, external_id)
);

-- Access/refresh tokens are encrypted application-side (AES-256-GCM, key
-- held only in server environment variables, never in the database) before
-- being written here. No client (authenticated role) can read this table
-- at all — see RLS policies below.
create table oauth_credentials (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations (id) on delete cascade,
  encrypted_access_token text not null,
  encrypted_refresh_token text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations (id) on delete cascade,
  platform_review_id text not null,
  author_name text,
  rating smallint not null check (rating between 1 and 5),
  body text,
  posted_at timestamptz not null,
  status text not null default 'new'
    check (status in ('new', 'drafted', 'approved', 'posted', 'skipped')),
  created_at timestamptz not null default now(),
  unique (location_id, platform_review_id)
);

create table replies (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null unique references reviews (id) on delete cascade,
  draft_text text,
  final_text text,
  generated_by text not null default 'ai'
    check (generated_by in ('ai', 'human-edited')),
  flag_for_review boolean not null default false,
  flag_reason text,
  approved_by uuid references auth.users (id),
  approved_at timestamptz,
  posted_at timestamptz,
  posting_method text check (posting_method in ('api', 'manual-copy')),
  created_at timestamptz not null default now()
);

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses (id) on delete cascade,
  actor uuid references auth.users (id),
  action text not null,
  entity text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses (id) on delete cascade,
  user_id uuid references auth.users (id),
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Indexes for the access patterns the dashboard and polling jobs use
-- ---------------------------------------------------------------------

create index business_members_user_id_idx on business_members (user_id);
create index locations_business_id_idx on locations (business_id);
create index oauth_credentials_location_id_idx on oauth_credentials (location_id);
create index reviews_location_id_idx on reviews (location_id);
create index reviews_status_idx on reviews (status);
create index audit_log_business_id_idx on audit_log (business_id, created_at desc);
create index notifications_user_id_idx on notifications (user_id, read_at);

-- ---------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------

create or replace function public.is_business_member(target_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as '
  select exists (
    select 1 from business_members
    where business_id = target_business_id
      and user_id = auth.uid()
  );
';

create or replace function public.is_business_owner(target_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as '
  select exists (
    select 1 from business_members
    where business_id = target_business_id
      and user_id = auth.uid()
      and role = ''owner''
  );
';

alter table businesses enable row level security;
alter table business_members enable row level security;
alter table locations enable row level security;
alter table oauth_credentials enable row level security;
alter table reviews enable row level security;
alter table replies enable row level security;
alter table audit_log enable row level security;
alter table notifications enable row level security;

-- businesses: members can read; only the owner can update (billing fields
-- are updated by the Stripe webhook using the service role key, which
-- bypasses RLS entirely, so this stays tight for client access).
create policy "members can read their business" on businesses
  for select using (is_business_member(id));

create policy "owner can update their business" on businesses
  for update using (is_business_owner(id));

create policy "authenticated users can create a business" on businesses
  for insert with check (auth.uid() is not null);

-- business_members: members can see their own membership rows; only the
-- owner can add/remove members.
create policy "members can read business membership" on business_members
  for select using (is_business_member(business_id));

create policy "owner can manage business membership" on business_members
  for all using (is_business_owner(business_id))
  with check (is_business_owner(business_id));

create policy "user can insert their own owner membership" on business_members
  for insert with check (user_id = auth.uid() and role = 'owner');

-- Creating a business and its first (owner) membership row must happen
-- atomically: a business with no business_members row would be permanently
-- invisible under the RLS policies above (nobody could ever pass
-- is_business_member for it again), and a client-side
-- insert-then-select on `businesses` alone fails RLS anyway, because the
-- SELECT-after-INSERT check runs before the follow-up business_members
-- insert exists. The app should call this function (via
-- supabase.rpc('create_business', ...)) rather than inserting into
-- `businesses` directly during signup.
create or replace function public.create_business(p_name text, p_industry text default null)
returns businesses
language plpgsql
security definer
set search_path = public
as '
declare
  new_business businesses;
begin
  if auth.uid() is null then
    raise exception ''must be authenticated to create a business'';
  end if;

  insert into businesses (name, industry)
    values (p_name, p_industry)
    returning * into new_business;

  insert into business_members (business_id, user_id, role)
    values (new_business.id, auth.uid(), ''owner'');

  return new_business;
end;
';

grant execute on function public.create_business(text, text) to authenticated;

-- locations: members can read; only the owner can connect/disconnect
-- platforms.
create policy "members can read locations" on locations
  for select using (is_business_member(business_id));

create policy "owner can manage locations" on locations
  for all using (is_business_owner(business_id))
  with check (is_business_owner(business_id));

-- oauth_credentials: no client access at all. Only the service role
-- (used by server-side jobs) can read/write these rows.
create policy "no client access to oauth credentials" on oauth_credentials
  for all using (false) with check (false);

-- reviews: members can read reviews for their business's locations.
create policy "members can read reviews" on reviews
  for select using (
    exists (
      select 1 from locations
      where locations.id = reviews.location_id
        and is_business_member(locations.business_id)
    )
  );

-- replies: members can read and update (approve/edit/skip) replies for
-- their business's reviews.
create policy "members can read replies" on replies
  for select using (
    exists (
      select 1 from reviews
      join locations on locations.id = reviews.location_id
      where reviews.id = replies.review_id
        and is_business_member(locations.business_id)
    )
  );

create policy "members can update replies" on replies
  for update using (
    exists (
      select 1 from reviews
      join locations on locations.id = reviews.location_id
      where reviews.id = replies.review_id
        and is_business_member(locations.business_id)
    )
  );

-- audit_log: members can read; writes come only from the service role
-- (application code always writes audit entries using the service key,
-- so no client insert policy is granted).
create policy "members can read audit log" on audit_log
  for select using (is_business_member(business_id));

-- notifications: a user can read and mark their own notifications read.
create policy "users can read their notifications" on notifications
  for select using (user_id = auth.uid());

create policy "users can mark their notifications read" on notifications
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid());
