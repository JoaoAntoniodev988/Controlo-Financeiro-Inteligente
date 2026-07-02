const CACHE_NAME = 'finantech-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instala o Service Worker e guarda os arquivos em cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Serve os arquivos do cache quando estiver offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});