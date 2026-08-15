-- Schedules the send-reminders Edge Function to run every 30 minutes.
-- Run this AFTER deploying the send-reminders function (see
-- app-store-roadmap.md / the reminders section for deploy steps).
--
-- Uses the project's Publishable key (new-style Supabase API keys) to
-- authorize the trigger call at the Edge Functions gateway — this key is
-- meant to be public, unlike the Secret key.
--
-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run if you need to update it later (replaces the existing
-- schedule with the same name instead of duplicating it).

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'send-skinlog-reminders',
  '*/30 * * * *',
  $$
  select net.http_post(
    url := 'https://cmndknueukcaahjyityg.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer sb_publishable_R6TmuNV15ylRuffABmo_Aw_aCL4GE8N',
      'apikey', 'sb_publishable_R6TmuNV15ylRuffABmo_Aw_aCL4GE8N'
    ),
    body := '{}'::jsonb
  );
  $$
);
