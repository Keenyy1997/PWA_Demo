const version = "0.1";
const cacheName = `pwa-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
                	// "./",
                	// "../",
                  "manifest.json",
                	"index.html?utm=homescreen",
                  "index.html",
                	"styles/main.css",
                	"main.js",
                	"promises.js",
                	"sw.js",
                	"favicon.ico",
                	// "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {

	console.log("Activate")
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {

	console.log("fetch")

  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
        if(response)
          return response

    })
  );
});
