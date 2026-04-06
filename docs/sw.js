// ==============================
// CycleCal Service Worker
// ==============================

const VERSION = "1.9.12b";
const CACHE_NAME = `cyclecal-${VERSION}`;

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-256.png",
  "./icon-512.png",
  "./js/main.js",
  "./js/logic/events.js",
  "./js/logic/folgas.js",
  "./js/logic/holidays.js",
  "./js/logic/vacations.js",
  "./js/logic/feriados.js",
  "./js/logic/context.js",
  "./js/logic/utils.js",
  "./js/logic/areas.js",
  "./js/logic/storage.js",
  "./js/logic/events_model.js",
];

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn("[SW] Falhou ao cachear:", url, err);
          })
        )
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removendo cache antigo:", key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
      .then(() => {
        self.clients.matchAll({ type: "window" }).then((clients) => {
          clients.forEach((client) =>
            client.postMessage({ type: "SW_UPDATED", version: VERSION })
          );
        });
      })
  );
});


self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // 🔥 1. HTML (sempre rede)
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request));
    return;
  }

  // 🔥 2. só trata seu domínio
  if (!event.request.url.startsWith(self.location.origin)) return;

  // 🔥 3. assets (cache-first inteligente)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
