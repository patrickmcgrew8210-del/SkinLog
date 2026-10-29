// Bump this whenever the fetch strategy itself changes (as it just
// did below) or the explicit APP_SHELL list changes — it forces a
// clean install/activate cycle, which is what makes the activate
// handler's cache-purge actually run. Does not need bumping on every
// ordinary content deploy now that fetches are network-first (below).
const CACHE_NAME = 'skinlog-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/app.css',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first for same-origin GET requests (the app shell), falling
// back to cache only when the network genuinely fails (offline, DNS
// failure, etc.) — cache stays updated via cache.put() on every
// successful fetch, so offline use still works exactly as before.
// Cross-origin requests (Google Fonts) pass straight through to the
// network untouched, same as before.
//
// This replaces a previous stale-while-revalidate strategy (return
// whatever's cached immediately, refresh the cache in the background
// for NEXT time). That meant a returning visitor's first page load
// after ANY deploy was served the PREVIOUS deployment's index.html —
// and, critically, any EXISTING file that deploy modified (e.g.
// js/auth.js, referenced identically by both old and new index.html)
// stayed stale too, since the background revalidation only refreshes
// the cache for the load AFTER that one. Confirmed and reproduced as
// the exact reason the scanner/analyzer feature didn't appear for a
// returning visitor after it was deployed — stale-while-revalidate
// isn't a bug on its own, but it does mean "deployed" and "visible to
// a returning visitor" are never the same moment, which isn't
// acceptable for an app shell that changes as often as this one does.
// Network-first makes them the same moment for anyone online; offline
// behavior is unchanged.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    // `cache: 'reload'` makes this bypass the BROWSER'S OWN HTTP cache
    // too, not just the Service Worker Cache Storage this file manages
    // — without it, a plain fetch() can still be silently served from
    // the browser's standard HTTP cache for a URL it's seen recently,
    // which would quietly defeat the whole point of "network-first"
    // (confirmed: without this, a same-session reload right after a
    // content-only deploy could still show stale content, even though
    // the Cache Storage logic above is correctly network-first).
    fetch(request, { cache: 'reload' })
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// ── Daily reminder push notifications (sent by the send-reminders Edge Function) ──
self.addEventListener('push', (event) => {
  let payload = { title: 'SkinFolio', body: "Don't forget to log your skin today ✦" };
  try { if (event.data) payload = { ...payload, ...event.data.json() }; } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      tag: 'skinlog-daily-reminder',
      data: { url: './index.html' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
