/*
  OpenLeash service worker — makes the app work offline (parks have bad signal).

  Strategy: stale-while-revalidate. The app opens instantly from the cache,
  and quietly fetches fresh files in the background. After you push an edit,
  it shows up the next time the app is opened (open it twice to see it).
  Bump CACHE only if you rename or remove files.
*/
const CACHE = 'openleash-v1';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './content/programs.js',
  './content/guides.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('openleash-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req)
      .then(res => {
        if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
        return res;
      })
      .catch(() => null);

    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    const res = await network;
    if (res) return res;
    if (req.mode === 'navigate') {
      const shell = await cache.match('./index.html');
      if (shell) return shell;
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  })());
});
