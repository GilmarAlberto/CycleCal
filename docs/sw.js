// ===================================
// CycleCal Service Worker
// Versão 1.3.3
// Escopo: /mobile/
// ===================================

const CACHE_NAME = "cyclecal-v1.3.3";

// Arquivos relativos à pasta mobile
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-256.png",
  "./icon-512.png"
];

// ===============================
// INSTALAÇÃO
// ===============================
self.addEventListener("install", event => {
  console.log("SW: Instalando", CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );

  self.skipWaiting();
});

// ===============================
// ATIVAÇÃO
// ===============================
self.addEventListener("activate", event => {
  console.log("SW: Ativando e limpando caches antigos...");

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );

  self.clients.claim();
});

// ===============================
// FETCH – Cache First
// ===============================
self.addEventListener("fetch", event => {

  // HTML → Network First
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, {cache: "no-store" })
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put("./index.html", response.clone());
            return response;
          });
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Outros arquivos → Cache First
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );

});

// ===============================
// Atualização forçada opcional
// ===============================
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

