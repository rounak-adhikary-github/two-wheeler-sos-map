/* ==========================================================================
   TWO-WHEELER SOS MAP — offline shell
   A rider with one bar of signal on the Basanti highway still needs this app.
   Strategy:
     app shell   -> cache first, refresh in the background
     map tiles   -> cache first, capped, so previously viewed areas still draw
     web fonts   -> stale while revalidate
   ========================================================================== */
var VERSION = 'sos-kolkata-v1';
var SHELL_CACHE = VERSION + '-shell';
var TILE_CACHE = VERSION + '-tiles';
var MAX_TILES = 400;

var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/style.css',
  './assets/js/data.js',
  './assets/js/app.js',
  './assets/img/icon.svg',
  './vendor/leaflet/leaflet.js',
  './vendor/leaflet/leaflet.css'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .catch(function () { /* a missing optional file must not block install */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k.indexOf(VERSION) !== 0) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isTile(url) {
  return /arcgisonline\.com|basemaps\.cartocdn\.com|tile\.openstreetmap\.org|openfreemap\.org|maptiler\.com|tiles\./.test(url.hostname);
}

function isFont(url) {
  return /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.hostname);
}

/* Keep the tile cache from growing without bound on a phone. */
function trimTiles(cache) {
  return cache.keys().then(function (keys) {
    if (keys.length <= MAX_TILES) return;
    var drop = keys.slice(0, keys.length - MAX_TILES);
    return Promise.all(drop.map(function (r) { return cache.delete(r); }));
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  /* ---- map tiles ---- */
  if (isTile(url)) {
    e.respondWith(
      caches.open(TILE_CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) {
              cache.put(req, res.clone());
              trimTiles(cache);
            }
            return res;
          }).catch(function () { return hit || Response.error(); });
        });
      })
    );
    return;
  }

  /* ---- web fonts ---- */
  if (isFont(url)) {
    e.respondWith(
      caches.open(SHELL_CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
            return res;
          }).catch(function () { return hit; });
          return hit || net;
        });
      })
    );
    return;
  }

  /* ---- same-origin app shell ---- */
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(SHELL_CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          }).catch(function () {
            /* Offline navigation falls back to the cached shell. */
            if (req.mode === 'navigate') return cache.match('./index.html');
            return hit;
          });
          return hit || net;
        });
      })
    );
  }
});
