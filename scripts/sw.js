const version = "0.1";
const cacheName = `pwa-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
	// "./",
	// "../",
	"/PWA_Demo/index.html?utm=homescreen",
	"/PWA_Demo/styles/main.css",
	"/PWA_Demo/scripts/main.js",
	"/PWA_Demo/scripts/promises.js",
	"/PWA_Demo/scripts/sw.js",
	"/PWA_Demo/favicon.ico",
	"https://use.fontawesome.com/releases/v5.3.1/css/all.css"
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
      return response || fetch(event.request);
    })
  );
});
