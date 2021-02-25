var cacheName = 'petstore-v1';
var cacheFiles = [
    'checkout.html',
    'product.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat.jpg',
    'images/laser.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});