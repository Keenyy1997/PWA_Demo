const version = "0.1";
const cacheName = `pwa-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
                	// "./",
                	// "../",
                  "/PWA_DEMO/manifest.json",
                	"/PWA_DEMO/index.html?utm=homescreen",
                  "/PWA_DEMO/index.html",
                  "/PWA_DEMO/styles/main.css",
                  "/PWA_DEMO/styles/aos.css",
                	"/PWA_DEMO/styles/materialize.min.css",
                	"/PWA_DEMO/main.js",
                	"/PWA_DEMO/promises.js",
                  "/PWA_DEMO/sw.js",
                  "/PWA_DEMO/scripts/aos.js",
                	"/PWA_DEMO/scripts/materialize.min.js",
                  "/PWA_DEMO/favicon.ico",
                  "/PWA_DEMO/img/logo_dulink.png",
                  "/PWA_DEMO/img/logo_dulink2.png",
                	"/PWA_DEMO/img/code_background-min.jpg.png",
                	"/PWA_DEMO/styles/fontawesome.css"
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
