// ==============================
// CycleCal Service Worker
// ==============================

// 🔁 ATUALIZE A CADA RELEASE
const CACHE_NAME = "cyclecal-v1.8.5.2";

// Arquivos essenciais
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-256.png",
  "./icon-512.png",
];

// ==============================
// INSTALL (instala e força ativação)
// ==============================
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  self.skipWaiting(); // 🔥 ativa imediatamente

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ==============================
// ACTIVATE (limpa caches antigos)
// ==============================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim(); // 🔥 assume controle imediato
});

// ==============================
// FETCH (estratégia)
// ==============================
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Só GET
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached; // ⚡ rápido (cache-first)
      }

      return fetch(request)
        .then((response) => {
          // guarda no cache dinamicamente
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // fallback offline
          return caches.match("./index.html");
        });
    })
  );
});
