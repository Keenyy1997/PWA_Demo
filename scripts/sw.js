const CACHE_NAME = "cache_PWADEMO"
const urlsCache = [
	"./",
	"../",
	"../?utm=homescreen",
	"../index.html?utm=homescreen",
	"../styles/main.css",
	"../scripts/main.js",
	"../scripts/promises.js",
	"../scripts/sw.js",
	"../favicon.ico",
	"https://use.fontawesome.com/releases/v5.3.1/css/all.css"
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function(response) {
          if (response.status === 404) {
            // return caches.match('fourohfour.html');
          }
          return caches.open(urlsCache).then(function(cache) {
           cache.put(event.request.url, response.clone());
            return response;
          });
        });
      }).catch(function(error) {
        console.log('Error, ', error);
        // return caches.match('offline.html');
      })
    );
  });