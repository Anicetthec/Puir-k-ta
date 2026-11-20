const CACHE_NAME = 'puir-keta-fashion-v4';
const APP_SHELL = [
  '/',
  '/index.html',
  '/a-propos.html',
  '/contact.html',
  '/styles.css',
  '/script.js',
  '/manifest.webmanifest',
  '/assets/logo.jpeg',
  '/assets/chosure.jpeg',
  '/assets/ch2.jpeg',
  '/assets/ch3.jpeg',
  '/assets/ch4.jpeg',
  '/assets/ch5.jpeg',
  '/assets/ch6.jpeg',
  '/assets/ch9.jpeg',
  '/assets/ch10.jpeg',
  '/assets/ch12.jpeg',
  '/assets/ch13.jpeg',
  '/assets/ch14.jpeg',
  '/assets/ch15.jpeg',
  '/assets/ch16.jpeg',
  '/assets/ch23.jpeg',
  '/assets/ch8.jpeg',
  '/assets/ch17.jpeg',
  '/assets/ch18.jpeg',
  '/assets/ch19.jpeg',
  '/assets/ch21.jpeg',
  '/assets/ch22.jpeg',
  '/assets/ch24.jpeg',
  '/assets/ch25.jpeg',
  '/assets/20.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // For page navigation, prefer the latest page from the server. A cached
  // homepage must never be returned in place of a requested inner page.
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok && new URL(event.request.url).origin === self.location.origin) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || Response.error())));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (new URL(event.request.url).origin === self.location.origin) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => Response.error()))
  );
});
