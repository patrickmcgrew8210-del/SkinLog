// SkinLog — daily reminder push notifications.
// Runs on a schedule (see supabase-reminders-cron.sql). For every user with
// an active push subscription whose local time currently matches their
// chosen reminder hour, and who hasn't logged an entry for today yet,
// sends a single Web Push notification.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;

webpush.setVapidDetails("mailto:support@skinlog.app", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function hourInTimezone(timezone: string): number {
  const formatted = new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", hour12: false }).format(new Date());
  return parseInt(formatted, 10) % 24;
}

function dateKeyInTimezone(timezone: string): string {
  // en-CA gives YYYY-MM-DD directly, matching the app's dateKey format.
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(new Date());
}

Deno.serve(async (_req) => {
  const { data: rows, error } = await sb
    .from("skinlog_data")
    .select("user_id, entries, settings")
    .not("settings->pushSubscription", "is", null)
    .not("settings->reminderHour", "is", null);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  let sent = 0;
  let skipped = 0;
  let cleared = 0;

  for (const row of rows ?? []) {
    const settings = row.settings ?? {};
    const timezone = settings.reminderTimezone || "UTC";
    const reminderHour = settings.reminderHour;
    const subscription = settings.pushSubscription;
    if (!subscription || reminderHour == null) continue;

    const currentHour = hourInTimezone(timezone);
    const today = dateKeyInTimezone(timezone);

    if (currentHour !== reminderHour) { skipped++; continue; }
    if (settings.lastReminderSentDate === today) { skipped++; continue; }

    const alreadyLoggedToday = Array.isArray(row.entries) && row.entries.some((e: any) => e.dateKey === today);
    if (alreadyLoggedToday) {
      // Still mark as "handled" for today so we don't re-check every run.
      await sb.from("skinlog_data").update({ settings: { ...settings, lastReminderSentDate: today } }).eq("user_id", row.user_id);
      skipped++;
      continue;
    }

    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify({ title: "SkinLog", body: "Don't forget to log your skin today ✦" })
      );
      await sb.from("skinlog_data").update({ settings: { ...settings, lastReminderSentDate: today } }).eq("user_id", row.user_id);
      sent++;
    } catch (err: any) {
      // 404/410 means the browser subscription is dead (uninstalled, expired) — drop it.
      if (err.statusCode === 404 || err.statusCode === 410) {
        const { pushSubscription, reminderHour: _rh, reminderTimezone, lastReminderSentDate, ...rest } = settings;
        await sb.from("skinlog_data").update({ settings: rest }).eq("user_id", row.user_id);
        cleared++;
      }
    }
  }

  return new Response(JSON.stringify({ sent, skipped, cleared }), {
    headers: { "Content-Type": "application/json" },
  });
});
