const CACHE_NAME ="cache_PWADEMO", urlsCache = [
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

self.addEventListener("install", e =>{
	console.log("SW Installing...")

	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache =>
			{
				console.log('Archivos en cache')
				return cache.addAll(urlsCache)
			})
	)
})
self.addEventListener("activate",e =>{
	console.log("SW Activado")

	self.clients.claim()
	const cacheList = [CACHE_NAME]

	e.waitUntil(
		caches.keys()
			.then(cachesNames => {
				return Promise.all(
					cachesNames.map(cacheName => {
						if( cacheList.indexOf(cacheName) === -1) {
							return caches.delete(cacheName)
						}
					})
				)
			})
			.then(()=>
			{
				console.log("Cache Updated Successfully!")
				return self.clients.claim()
			})
	)

})

self.addEventListener("fetch",e =>{
	console.log("SW Recuperando")

	e.respondWith(
		caches.match(e.request)
			.then(res => 
			{
				if( res ){
					return res
				}

				return fetch( e.request )
					.then(res => 
					{
						let resToCache = res.clone()

						caches.open(cacheName)
							.then(cache => 
							{
								cache.put(request, resToCache)
									.catch(err => 
										console.log(`${request.url}:${err.message}`))
							})
						return res
					}).catch(e => {
						console.log(e)
					})
			})
	)

})