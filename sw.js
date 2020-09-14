;
const CACHE_NAME = 'v1_cache_anteproyecto',
  urlsToCache = [
    './',
    ' https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https: //use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    '/css/estilos.css',
    './script.js',
    './images/incofe insignia.png',
    '/icons/android/android-launchericon-72-72.png'
  ]

//instalacion//
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsToCache)
        .then(() => self.skipWaiting())
    })
    .catch(err => console.log('falló registro en cache'))
  )
})

//busca registros una vez activado el sw.
self.addEventListener('activate', e => {
  const cacheWhiteList = [CACHE_NANE]

  e.waitUntil(
    caches.keys()
    .then(cachesName => {
      cacheNames.map(cacheName => {

        if (cacheWhiteList.indexOf(cacheName) === -1) {
          return caches.delete(cacheName)
        }
      })
    })
    .then(() => self.clients.claim())
  )
})
//actua cuando el navegador recupera conexion
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        return res
      }

      return fetch(e.request)
    })
  )
})