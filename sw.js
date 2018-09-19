const version = "0.1";
const cacheName = `pwa-${version}`;

self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
                  "manifest.json",
                	"index.html?utm=homescreen",
                  "index.html",
                  "",
                  "styles/main.css",
                  "styles/aos.css",
                	"styles/materialize.min.css",
                	"main.js",
                	"promises.js",
                  "sw.js",
                  "scripts/aos.js",
                	"scripts/materialize.min.js",
                  "favicon.ico",
                  "img/logo_dulink.png",
                  "img/logo_dulink2.png",
                	"img/code_background-min.jpg.png",
                	"styles/fontawesome.css"
                ])
          .then(() => self.skipWaiting())
          .catch(err=> console.log(err))
    })
  );

  console.log(Install, e)
});

self.addEventListener('activate', event => {

	console.log("Activate",event)
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {

	console.log("fetch",event)

  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
