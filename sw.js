const version = "0.1";
const cacheName = `pwa-${version}`;

console.log(fetch("./index.html"))
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
                  "./manifest.json",
                	"./index.html?utm=homescreen",
                  "./index.html",
                  "./styles/main.css",
                  "./styles/aos.css",
                	"./styles/materialize.min.css",
                	"./main.js",
                	"./promises.js",
                  "./sw.js",
                  "./scripts/aos.js",
                	"./scripts/materialize.min.js",
                  "./favicon.ico",
                  "./img/logo_dulink.png",
                  "./img/logo_dulink2.png",
                	"./img/code_background-min.jpg.png",
                	"./styles/fontawesome.css"
                ])
          .then(() => self.skipWaiting())
          .catch(err=> console.log(err))
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
