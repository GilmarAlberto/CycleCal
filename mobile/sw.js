// ======= VERSIONAMENTO =======
const CACHE_NAME = "cyclecal-v1.2.0-alpha";

// Arquivos que serão cacheados
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-256.png"
];

// ======= INSTALAÇÃO =======
self.addEventListener("install", event => {
  console.log("Service Worker: Instalando...");

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// ======= ATIVAÇÃO =======
self.addEventListener("activate", event => {
  console.log("Service Worker: Ativando...");

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Limpando cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// ======= FETCH (Cache First) =======
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// ======= RECEBER MENSAGEM PARA FORÇAR ATUALIZAÇÃO =======
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

