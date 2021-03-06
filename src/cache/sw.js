self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        // '/cache/',
        // '/cache/cache.html',
        '/cache/style.css',
        '/cache/cache.js',
        // '/cache/image-list.js',
        // '/cache/imgs/daishu.jpeg',
        // '/cache/imgs/daishu.gif',
        // '/cache/imgs/logo.png',
        // '/cache/imgs/logo-prefetch-new.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        if (event.request && event.request.url && /\/cache\/imgs\//.test(event.request.url)) {
          // only cache resource that we want
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function () {
        return caches.match('/cache/imgs/daishu.gif');
      });
    }
  }));
});