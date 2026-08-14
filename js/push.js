/* ══════════════════════════════════════════════
   PUSH — daily reminder notifications (Web Push).
   The actual sends happen server-side, from the send-reminders
   Supabase Edge Function — this file only manages the subscription.
══════════════════════════════════════════════ */

const VAPID_PUBLIC_KEY = 'BBh5HsmI7cteDd542T9ofJSL0sEofdQ_JiuRwPj1V9EMHXaHVkNO_kd8lhfuNzEXOsa1NObo3GxaGdTSWZS_igM';

function isPushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

function getReminderHour() {
  return _cloudCache && _cloudCache.settings.reminderHour != null ? _cloudCache.settings.reminderHour : null;
}

/** Requests notification permission, subscribes to push, and saves the
 *  subscription + chosen hour (0-23, local device time) to the cloud row. */
async function enableDailyReminder(hour) {
  if (!isPushSupported()) return { error: { message: 'Notifications are not supported on this device/browser.' } };

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return { error: { message: 'Notification permission was not granted.' } };

  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    if (!_cloudCache) return { error: { message: 'Not signed in.' } };
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    _cloudCache.settings = {
      ..._cloudCache.settings,
      pushSubscription: sub.toJSON(),
      reminderHour: hour,
      reminderTimezone: timezone,
      lastReminderSentDate: null,
    };
    persistCloudData();
    return {};
  } catch (e) {
    return { error: { message: e.message || 'Could not enable reminders.' } };
  }
}

async function disableDailyReminder() {
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) await sub.unsubscribe();
    }
  } catch (e) {}
  if (_cloudCache) {
    const { pushSubscription, reminderHour, ...rest } = _cloudCache.settings;
    _cloudCache.settings = rest;
    persistCloudData();
  }
}

/* ── Account-popup wiring ── */
function formatReminderState() {
  const hour = getReminderHour();
  if (hour == null) return 'OFF';
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

function toggleDailyReminder() {
  const picker = document.getElementById('reminder-time-picker');
  if (!picker) return;
  if (getReminderHour() != null) {
    disableDailyReminder().then(() => {
      const state = document.getElementById('reminder-toggle-state');
      if (state) { state.textContent = 'OFF'; state.style.color = '#9e8a80'; }
      showToast('Daily reminder off', 'success');
    });
    picker.style.display = 'none';
    return;
  }
  picker.style.display = picker.style.display === 'flex' ? 'none' : 'flex';
}

async function setReminderTime(hour) {
  const result = await enableDailyReminder(hour);
  const picker = document.getElementById('reminder-time-picker');
  if (result.error) {
    showToast(result.error.message, 'error');
    return;
  }
  const state = document.getElementById('reminder-toggle-state');
  if (state) { state.textContent = formatReminderState(); state.style.color = '#607a5c'; }
  if (picker) picker.style.display = 'none';
  showToast(`Daily reminder set for ${formatReminderState()}`, 'success');
}
