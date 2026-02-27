// FinTax LK — Service Worker v13
const CACHE_NAME = "fintaxlk-v13";
const APP_SHELL  = ["/", "/index.html", "/manifest.json"];

// Install: cache the app shell
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Network-only for CDN, Google APIs, PayHere
  const networkOnly = ["unpkg.com","accounts.google.com","googleapis.com","gstatic.com","payhere.lk"];
  if (networkOnly.some((h) => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Cache-first for icons
  if (url.pathname.startsWith("/icons/")) {
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => {
          caches.open(CACHE_NAME).then((c) => c.put(e.request, res.clone()));
          return res;
        })
      )
    );
    return;
  }

  // Network-first for app shell
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && res.status === 200 && e.request.method === "GET") {
          caches.open(CACHE_NAME).then((c) => c.put(e.request, res.clone()));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((cached) => cached || caches.match("/index.html"))
      )
  );
});
