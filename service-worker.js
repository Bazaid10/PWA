var cacheName = 'petstore-v1';
var cacheFiles = [
    'checkout.html',
    'product.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/catfood.jpg',
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

// self.addEventListener('fetch', function (e) {
    // e.respondWith(
        // check if the cache has the file
        // caches.match(e.request).then(function (r) {
            // console.log('[Service Worker] Fetching resource: '+ e.request.url);
            // 'r' is the matching file if it exists in the cache
            // return r 
        // })
    // );
// });

caches.match(e.request).then(function (r) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
    


             