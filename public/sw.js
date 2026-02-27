// FinTax LK — Service Worker v14  (PWABuilder / Google Play compliant)
// Strategies: Cache-first (icons/fonts) | Stale-while-revalidate (JS/CSS) | Network-first (HTML/navigate)

const CACHE_NAME   = "fintaxlk-v14.0-app";
const STATIC_CACHE = "fintaxlk-v14.0-static";

// ── Workbox precache manifest (injected by vite-plugin-pwa at build time) ─────
// DO NOT REMOVE — vite-plugin-pwa replaces this with the actual file list
const PRECACHE_MANIFEST = self.__WB_MANIFEST || [];
const OFFLINE_URL  = "/";

const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/icons/icon-192-maskable.png",
  // Vite build assets from PRECACHE_MANIFEST
  ...PRECACHE_MANIFEST.map(e => typeof e === "string" ? e : e.url),
];

// ── Install ───────────────────────────────────────────────────────────────────
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(STATIC_CACHE).then((c) =>
      c.addAll(PRECACHE).catch((err) => {
        console.warn("[SW] Pre-cache failed (non-fatal):", err.message);
      })
    )
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────────
self.addEventListener("activate", (e) => {
  const KEEP = [CACHE_NAME, STATIC_CACHE];
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return; // skip non-GET
  const url = new URL(e.request.url);

  // 1. External services — always network, never cache
  const networkOnlyHosts = [
    "accounts.google.com","googleapis.com","gstatic.com",
    "wa.me","api.whatsapp.com","web.whatsapp.com",
    "ezpay.ird.gov.lk","ird.gov.lk",
    "unpkg.com","cdnjs.cloudflare.com","fonts.googleapis.com","fonts.gstatic.com",
  ];
  if (networkOnlyHosts.some((h) => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request).catch(() => new Response("", { status: 503 })));
    return;
  }

  // 2. Icons & images — cache-first (long-lived assets)
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|ico|webp)$/)) {
    e.respondWith(
      caches.match(e.request).then(
        (cached) => cached || fetch(e.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
      ).catch(() => caches.match("/icons/icon-192.png"))
    );
    return;
  }

  // 3. JS / CSS bundles — stale-while-revalidate
  if (url.pathname.match(/\.(js|css)$/) && url.origin === self.location.origin) {
    e.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(e.request);
        const fetchPromise = fetch(e.request)
          .then((res) => { if (res.ok) cache.put(e.request, res.clone()); return res; })
          .catch(() => null);
        return cached || await fetchPromise || new Response("", { status: 503 });
      })
    );
    return;
  }

  // 4. HTML / navigation — network-first, fall back to cached index
  if (e.request.mode === "navigate" || e.request.headers.get("accept")?.includes("text/html")) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(e.request);
          return cached || caches.match(OFFLINE_URL) || new Response("<h1>Offline</h1>", {
            headers: { "Content-Type": "text/html" },
          });
        })
    );
    return;
  }

  // 5. manifest.json — network-first
  if (url.pathname === "/manifest.json") {
    e.respondWith(
      fetch(e.request)
        .then((res) => { caches.open(STATIC_CACHE).then((c) => c.put(e.request, res.clone())); return res; })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // 6. Default — cache-first
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => new Response("", { status: 503 })))
  );
});

// ── Push Notifications ────────────────────────────────────────────────────────
self.addEventListener("push", (e) => {
  if (!e.data) return;
  let data = {};
  try { data = e.data.json(); } catch { data = { title: "FinTax LK", body: e.data.text() }; }
  e.waitUntil(
    self.registration.showNotification(data.title || "FinTax LK", {
      body: data.body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-96.png",
      tag: "fintaxlk-notification",
      renotify: false,
      requireInteraction: false,
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const target = e.notification.data?.url || "/";
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((all) => {
      const existing = all.find((c) => c.url === target && "focus" in c);
      return existing ? existing.focus() : clients.openWindow(target);
    })
  );
});

// ── Background Sync ───────────────────────────────────────────────────────────
self.addEventListener("sync", (e) => {
  // Data is localStorage-based — no remote sync needed
  console.log("[SW v14] Background sync triggered:", e.tag);
});

// ── Periodic Background Sync ──────────────────────────────────────────────────
self.addEventListener("periodicsync", (e) => {
  console.log("[SW v14] Periodic sync:", e.tag);
});

// ── Message handler — React app sends SKIP_WAITING to activate new SW ─────────
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
