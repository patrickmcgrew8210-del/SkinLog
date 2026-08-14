-- Adds in-app account deletion, required by both the App Store and Google
-- Play whenever an app supports account creation (Apple guideline 5.1.1(v),
-- Google Play Data Safety / account deletion policy).
--
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- (Run this in addition to supabase-schema.sql, not instead of it.)

create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Deletes the calling user's auth record. skinlog_data is removed
  -- automatically via its "on delete cascade" foreign key.
  delete from auth.users where id = auth.uid();
end;
$$;

grant execute on function public.delete_user() to authenticated;
