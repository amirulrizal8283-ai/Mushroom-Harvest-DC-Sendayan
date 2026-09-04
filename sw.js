// v2 — network-first app shell (fixes stale-forever caching from v1).
// Bumping CACHE_NAME is what forces the browser to notice this file changed
// and actually install this new worker; without it, browsers keep the old
// worker (and its cache-first behaviour) running indefinitely.
const CACHE_NAME = 'harvest-dcs-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Never intercept live Google Sheets requests — always go to network.
  if (url.includes('docs.google.com')) return;
  if (event.request.method !== 'GET') return;

  // Network-first: always try to get the freshest app shell; only fall back
  // to the cached copy when the network request fails (offline / no signal).
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((resp) => {
        if (resp && resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
