// ==============================
// CycleCal Service Worker
// ==============================

const CACHE_NAME = "cyclecal-v1.9.1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-256.png",
  "./icon-512.png",
  "./js/main.js",
  "./js/calendario.js",
  "./js/logic/events.js",
  "./js/logic/folgas.js",
  "./js/logic/holidays.js",
  "./js/logic/vacations.js",
  "./js/logic/feriados.js",
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
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
