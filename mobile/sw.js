// ===================================
// CycleCal Service Worker
// Versão 1.2.3
// Escopo: /mobile/
// ===================================

const CACHE_NAME = "cyclecal-v1.2.3";

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

