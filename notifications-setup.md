# Setting up daily reminder notifications

The code for this is already built and pushed. Three things left, all done
in the Supabase dashboard — no CLI install needed.

## 1. Deploy the Edge Function

1. Supabase dashboard → **Edge Functions** (left sidebar) → **Deploy a new function**
2. Name it exactly: `send-reminders`
3. Open the code editor it gives you, delete the placeholder content, and
   paste in the contents of `supabase/functions/send-reminders/index.ts`
   from this repo
4. Deploy

## 2. Add the VAPID secrets

Still in **Edge Functions** → find **Manage secrets** (or **Settings → Edge Functions**):

Add these three secrets:
- `VAPID_PUBLIC_KEY` = `BBh5HsmI7cteDd542T9ofJSL0sEofdQ_JiuRwPj1V9EMHXaHVkNO_kd8lhfuNzEXOsa1NObo3GxaGdTSWZS_igM`
- `VAPID_PRIVATE_KEY` = *the private key I gave you in chat — never put this in a file that gets committed*
- (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are already available automatically — you don't need to set those)

## 3. Schedule it to run

Run `supabase-reminders-cron.sql` in the SQL Editor (same as the other
`.sql` files in this repo). This makes the function check every 30 minutes
whether it's anyone's chosen reminder time.

## Testing it

1. In the deployed app, tap your avatar → **Daily Reminder** → pick a time
2. Your browser will ask for notification permission — allow it
3. To test without waiting for your actual chosen hour: in Supabase, manually
   invoke the function once (Edge Functions → send-reminders → **Invoke**
   button) — since the function only sends if the current hour matches AND
   you haven't logged today, temporarily set your reminder time to the
   current hour to see a real notification arrive
