-- Schedules the send-reminders Edge Function to run every 30 minutes.
-- Run this AFTER deploying the send-reminders function (see
-- app-store-roadmap.md / the reminders section for deploy steps).
--
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

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
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbmRrbnVldWtjYWFoanlpdHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA3NjIsImV4cCI6MjEwMTI1Njc2Mn0._z4p-PjPLrHWkJ_n_RZ5qS6j1m9O97tEfsHYZ0S3K8Q'
    ),
    body := '{}'::jsonb
  );
  $$
);
