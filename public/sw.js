// FinTax LK — Service Worker v14  (PWABuilder-ready)
// Strategy: Cache-first for app shell + assets | Network-first for API calls
const CACHE_NAME   = "fintaxlk-v14";
const STATIC_CACHE = "fintaxlk-static-v14";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-144.png",
  "/icons/icon-96.png",
  "/icons/screenshot-mobile.png",
];

// ── Install: cache app shell ──────────────────────────────────────────────────
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: purge old caches ────────────────────────────────────────────────
self.addEventListener("activate", (e) => {
  const KEEP = [CACHE_NAME, STATIC_CACHE];
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch strategy ────────────────────────────────────────────────────────────
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // 1. Always network-only for external APIs & auth
  const networkOnly = [
    "accounts.google.com","googleapis.com","gstatic.com",
    "unpkg.com","cdnjs.cloudflare.com","wa.me","api.whatsapp.com",
    "ezpay.ird.gov.lk","ird.gov.lk",
  ];
  if (networkOnly.some((h) => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request).catch(() => new Response("Offline", { status: 503 })));
    return;
  }

  // 2. Cache-first for icons & static assets
  if (url.pathname.startsWith("/icons/") || url.pathname.match(/\.(png|jpg|ico|svg|woff2?)$/)) {
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put(e.request, clone));
          return res;
        })
      )
    );
    return;
  }

  // 3. Stale-while-revalidate for JS/CSS bundles
  if (url.pathname.match(/\.(js|css)$/) && url.origin === self.location.origin) {
    e.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(e.request);
        const fetchPromise = fetch(e.request).then((res) => {
          cache.put(e.request, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 4. Network-first with cache fallback for HTML / navigation
  if (e.request.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith(".html")) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          caches.open(CACHE_NAME).then((c) => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  // 5. Default: cache-first
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});

// ── Background sync (offline transaction queue) ───────────────────────────────
self.addEventListener("sync", (e) => {
  if (e.tag === "sync-data") {
    e.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  // Placeholder — data is localStorage-based so no server sync needed yet
  console.log("[SW] Background sync: data is local-only — nothing to sync");
}

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener("push", (e) => {
  if (!e.data) return;
  const data = e.data.json().catch(() => ({ title: "FinTax LK", body: e.data.text() }));
  e.waitUntil(
    data.then((d) =>
      self.registration.showNotification(d.title || "FinTax LK", {
        body: d.body || "",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-96.png",
        tag: "fintaxlk-push",
        renotify: true,
        data: d.url ? { url: d.url } : {},
      })
    )
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = e.notification.data?.url || "/";
  e.waitUntil(clients.openWindow(url));
});
