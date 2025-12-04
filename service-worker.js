const CACHE_NAME = 'jp-house-beer-cache-v1';
const urlsToCache = [
  './MENU.html',
  './manifest.json',
  // Adicione seus ícones aqui, se os tiver:
  // '/android-chrome-192x192.png',
  // '/android-chrome-512x512.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
];

self.addEventListener('install', event => {
  // Faz o cache dos arquivos essenciais
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Intercepta as requisições e retorna a versão em cache, se disponível
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a versão em cache
        if (response) {
          return response;
        }
        // Se não estiver em cache, busca na rede
        return fetch(event.request);
      })
  );
});

// Limpa caches antigos (opcional, para garantir que novas versões sejam usadas)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});