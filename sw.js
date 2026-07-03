const CACHE_NAME = 'finantech-cache-v2';
const assets = [
  './',
  'index.html',
  'estilo.css',
  'script.js',
  'manifest.json'
];

// Instala e guarda em cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Responde offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});