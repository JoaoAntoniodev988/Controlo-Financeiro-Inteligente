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

// Evento 'activate': roda quando a nova versão (ex: v2) assume o controle
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Se o cache na memória do celular for diferente do atual, apaga o antigo
          if (cache !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});