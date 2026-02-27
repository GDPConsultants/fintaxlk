// FinTax LK — Service Worker v14.1
// Classic script (no import/export) — compatible with all browsers
// Handles: offline caching, update notifications, push, SKIP_WAITING

var CACHE = "fintaxlk-v14.1";

var PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-192-maskable.png",
  "/icons/icon-512-maskable.png",
  "/icons/icon-96.png"
];

// ── Install: cache app shell ──────────────────────────────────────────────────
self.addEventListener("install", function(e) {
  // SKIP_WAITING immediately — critical to evict old broken SW
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      // addAll failures are non-fatal — app still works without cache
      return c.addAll(PRECACHE).catch(function(err) {
        console.warn("[SW v14.1] Pre-cache warning (non-fatal):", err.message);
      });
    })
  );
});

// ── Activate: delete ALL old caches, claim clients ───────────────────────────
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      // Take control of all open tabs immediately
      return self.clients.claim();
    })
  );
});

// ── Fetch: network-first for HTML, cache-first for assets ────────────────────
self.addEventListener("fetch", function(e) {
  if (e.request.method !== "GET") return;

  var url;
  try { url = new URL(e.request.url); } catch(err) { return; }

  // Never intercept external domains
  if (url.origin !== self.location.origin) return;

  // SW and workbox files — always fresh from network
  if (url.pathname === "/sw.js" || url.pathname.startsWith("/workbox-")) return;

  // HTML / navigation — network-first, fall back to cached index.html
  if (e.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname === "/") {
    e.respondWith(
      fetch(e.request).then(function(res) {
        if (res.ok) {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      }).catch(function() {
        return caches.match("/index.html").then(function(cached) {
          return cached || new Response("<h1>Offline</h1>", { headers: { "Content-Type": "text/html" } });
        });
      })
    );
    return;
  }

  // manifest.json — network-first (short TTL headers handle this)
  if (url.pathname === "/manifest.json") {
    e.respondWith(
      fetch(e.request).catch(function() { return caches.match(e.request); })
    );
    return;
  }

  // Icons — cache-first (immutable assets)
  if (url.pathname.startsWith("/icons/")) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(res) {
          if (res.ok) {
            var clone = res.clone();
            caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
          }
          return res;
        });
      })
    );
    return;
  }

  // JS/CSS/assets — stale-while-revalidate
  if (url.pathname.startsWith("/assets/")) {
    e.respondWith(
      caches.open(CACHE).then(function(cache) {
        return cache.match(e.request).then(function(cached) {
          var fetchPromise = fetch(e.request).then(function(res) {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(function() { return cached; });
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // Default: try network, fall back to cache
  e.respondWith(
    fetch(e.request).catch(function() { return caches.match(e.request); })
  );
});

// ── Message: SKIP_WAITING from React app (user clicked "Update Now") ─────────
self.addEventListener("message", function(e) {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener("push", function(e) {
  if (!e.data) return;
  var data = {};
  try { data = e.data.json(); } catch(err) { data = { title: "FinTax LK", body: e.data.text() }; }
  e.waitUntil(
    self.registration.showNotification(data.title || "FinTax LK", {
      body: data.body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-96.png",
      tag: "fintaxlk-notification",
      data: { url: data.url || "/" }
    })
  );
});

self.addEventListener("notificationclick", function(e) {
  e.notification.close();
  var target = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(all) {
      var found = null;
      for (var i = 0; i < all.length; i++) {
        if (all[i].url === target && "focus" in all[i]) { found = all[i]; break; }
      }
      return found ? found.focus() : clients.openWindow(target);
    })
  );
});
