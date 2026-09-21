/* ==========================================================================
   TWO-WHEELER SOS MAP — KOLKATA
   Static, dependency-light, works offline once loaded, hosts free on GitHub
   Pages. All content comes from assets/js/data.js — this file is logic only.
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SOS_DATA;
  if (!D) { console.error('SOS: data.js failed to load'); return; }

  /* ------------------------------------------------------------------ ICONS */
  /* Inline SVG everywhere — no icon font, no sprite, no 404s offline. */
  var ICONS = {
    all: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="2.2"/><rect x="13" y="3" width="8" height="8" rx="2.2"/><rect x="3" y="13" width="8" height="8" rx="2.2"/><rect x="13" y="13" width="8" height="8" rx="2.2"/></svg>',
    air: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.4" cy="12" r="7"/><circle cx="10.4" cy="12" r="2.6"/><path d="M17.4 12H22"/><path d="M10.4 5V2.2"/></svg>',
    structural: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 3.2h13"/><path d="M7.6 3.2v8.4a4.4 4.4 0 0 0 8.8 0V3.2"/><path d="M12 16v4.8"/><path d="M8.3 20.8h7.4"/></svg>',
    control: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2.4 5.6h8"/><circle cx="12.4" cy="5.6" r="2.2"/><path d="M12.4 7.8v3.6a6.6 6.6 0 0 0 6.6 6.6h2.6"/><path d="M18.6 2.7 21.5 5.6l-2.9 2.9"/></svg>',
    tow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2.4 16.4V8.4H10v8"/><path d="M10 12h4.2l3.4 4.4"/><path d="M2.4 16.4h2.1"/><circle cx="7.1" cy="17.5" r="2.3"/><circle cx="16.5" cy="17.5" r="2.3"/><path d="M11.4 17.5h2.8"/><path d="M20.5 17.5h1.1"/><path d="M5 8.4V5.9h4.6"/></svg>',
    parking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M9.4 17.2V6.8h3.3a3.1 3.1 0 0 1 0 6.2H9.4"/></svg>',
    mechanic: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.6 19.1 13.5 10c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.1 6 9.1 1.7 4.8C.5 7.2 1 10.2 3 12.2c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.2-2.2c.4-.5.4-1.1 0-1.5z"/></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="2.4" y="7" width="16.2" height="11" rx="2.6"/><path d="M18.6 10.4h1.6a1.2 1.2 0 0 1 1.2 1.2v1.8a1.2 1.2 0 0 1-1.2 1.2h-1.6" fill="currentColor" stroke="none"/><path d="M11.6 9.3 8.9 12.8h2.9l-1.6 3.1" stroke-linecap="round"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5.2"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" stroke="none"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.5 8.3-8 8.3z"/><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/></svg>',

    navigate: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.1 3.1 21.6l8.9-4.3 8.9 4.3z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.7 10.9a15.1 15.1 0 0 0 6.4 6.4l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M12 5.2v13.6M5.2 12h13.6"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M5.2 12h13.6"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="7.8"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/><path d="M12 1.6v3.2M12 19.2v3.2M1.6 12h3.2M19.2 12h3.2"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.6 15.4A8.9 8.9 0 0 1 8.6 3.4a8.9 8.9 0 1 0 12 12z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4.6"/><path d="M12 1.7v3M12 19.3v3M1.7 12h3M19.3 12h3M4.7 4.7l2.1 2.1M17.2 17.2l2.1 2.1M19.3 4.7l-2.1 2.1M6.8 17.2l-2.1 2.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"><path d="M12 2.7 1.7 21h20.6z"/><path d="M12 9.2v4.9" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.35" fill="currentColor" stroke="none"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5.4 5.4 18.6 18.6M18.6 5.4 5.4 18.6"/></svg>',
    chevup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15.2 12 8.2l7 7"/></svg>',
    chevdown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8.8 12 15.8l7-7"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.6v12.4"/><path d="M7.6 6.9 12 2.5l4.4 4.4"/><path d="M4.6 12.4v7.6a1.4 1.4 0 0 0 1.4 1.4h12a1.4 1.4 0 0 0 1.4-1.4v-7.6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"><rect x="8.4" y="8.4" width="12" height="12" rx="2.4"/><path d="M15.6 8.4V5.6a2.4 2.4 0 0 0-2.4-2.4H5.6A2.4 2.4 0 0 0 3.2 5.6v7.6a2.4 2.4 0 0 0 2.4 2.4h2.8"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4.5 7.5 12l7.5 7.5"/></svg>'
  };

  function svg(name) { return ICONS[name] || ''; }
  function icoEl(name) { return '<span class="ico">' + svg(name) + '</span>'; }

  /* ------------------------------------------------------------------------
     The map is intentionally stripped of every non-essential POI. Only the
     road network, water and land are drawn — no restaurants, no retail, no
     parks. A stranded rider sees streets, not advertising.

     The default provider is Esri's Gray Canvas basemap: it needs no API key,
     no signup and no billing account, and its labels live in a *separate*
     reference layer that we simply never request. That gives us a genuinely
     POI-free basemap for free.

     To swap providers, add a block below and point ACTIVE_PROVIDER at it.
     Any keyed provider (MapTiler, Mapbox, Google) needs its own key, its own
     billing account and its own terms review before you publish a public URL.
     ---------------------------------------------------------------------- */
  var PROVIDERS = {
    esri: {
      day:   'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      night: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      maxNativeZoom: 16,
      /* Leaflet resolves {s} unconditionally, so this must stay non-empty even
         though the Esri URL template has no subdomain placeholder. */
      subdomains: 'abc',
      attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors, and the GIS user community'
    }

    /* Example of a keyed alternative — uncomment, add your key, read the terms:
    , maptiler: {
      day:   'https://api.maptiler.com/maps/dataviz-light/256/{z}/{x}/{y}.png?key=YOUR_KEY_HERE',
      night: 'https://api.maptiler.com/maps/dataviz-dark/256/{z}/{x}/{y}.png?key=YOUR_KEY_HERE',
      maxNativeZoom: 20,
      attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; OpenStreetMap contributors'
    }
    */
  };
  var ACTIVE_PROVIDER = 'esri';

  /* ------------------------------------------------------------------ STATE */
  var state = {
    cat: 'all',
    brand: null,
    sel: null,
    user: null,
    snap: 'peek',
    theme: 'day'
  };

  var snaps = { peek: 0, half: 0, full: 0 };

  /* ------------------------------------------------------------------- DOM */
  var $ = function (id) { return document.getElementById(id); };
  var hud = $('hud'), rail = $('rail'), sheet = $('sheet'), sheetHead = $('sheet-head'),
      sheetScroll = $('sheet-scroll'), sheetTitle = $('sheet-title'), dock = $('dock'),
      viewList = $('view-list'), viewDetail = $('view-detail'),
      readoutLeft = $('readout-left'), readoutRight = $('readout-right'),
      modal = $('modal'), toast = $('toast'), side = $('side');

  /* ---------------------------------------------------------------- HELPERS */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function catById(id) {
    for (var i = 0; i < D.categories.length; i++) if (D.categories[i].id === id) return D.categories[i];
    return D.categories[D.categories.length - 1];
  }

  function haversine(aLat, aLng, bLat, bLng) {
    var R = 6371, toRad = Math.PI / 180;
    var dLat = (bLat - aLat) * toRad, dLng = (bLng - aLng) * toRad;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(aLat * toRad) * Math.cos(bLat * toRad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
  }

  function distTo(p) {
    if (!state.user) return null;
    return haversine(state.user.lat, state.user.lng, p.lat, p.lng);
  }

  function fmtDist(km) {
    if (km === null || km === undefined) return '—';
    if (km < 1) return Math.round(km * 1000 / 10) * 10 + ' M';
    if (km < 10) return km.toFixed(1) + ' KM';
    return Math.round(km) + ' KM';
  }

  function fmtTime(h) {
    if (h >= 24 || h <= 0) return 'MIDNIGHT';
    var hh = Math.floor(h), mm = Math.round((h - hh) * 60);
    var ap = hh >= 12 ? 'PM' : 'AM';
    var h12 = hh % 12; if (h12 === 0) h12 = 12;
    return h12 + (mm ? ':' + (mm < 10 ? '0' + mm : mm) : '') + ' ' + ap;
  }

  var DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  /* Verified listings carry no confirmed opening hours — inventing them for a
     real business would be worse than admitting we do not know. */
  function hasHours(p) { return !!(p && p.hours && typeof p.hours.o === 'number'); }

  function is24x7(p) { return hasHours(p) && p.hours.o === 0 && p.hours.c >= 24; }

  function isOpenNow(p) {
    if (!hasHours(p)) return false;
    var now = new Date(), d = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    if (p.off && p.off.indexOf(d) !== -1) return false;
    if (is24x7(p)) return true;
    var o = p.hours.o, c = p.hours.c;
    if (c > o) return h >= o && h < c;
    return h >= o || h < c; /* overnight shift */
  }

  /* 'open' | 'shut' | 'unknown' — drives the status banner. */
  function statusKind(p) {
    if (!hasHours(p)) return 'unknown';
    return isOpenNow(p) ? 'open' : 'shut';
  }

  /* The pin dot. Yellow means "hours unknown, ring before you ride over".
     Red means there is no number on file at all, so you must go in person. */
  function pinDotKind(p) {
    if (hasHours(p)) return isOpenNow(p) ? 'open' : 'shut';
    return hasRealContact(p) ? 'unknown' : 'shut';
  }

  function statusText(p) {
    if (!hasHours(p)) return 'CALL BEFORE YOU TOW';
    if (isOpenNow(p)) return is24x7(p) ? '24 HOURS' : 'CLOSES ' + fmtTime(p.hours.c);
    var now = new Date(), d = now.getDay();
    if (p.off && p.off.indexOf(d) !== -1) return 'CLOSED TODAY · OPENS ' + fmtTime(p.hours.o);
    return 'OPENS ' + fmtTime(p.hours.o);
  }

  function hoursText(p) {
    if (!hasHours(p)) return 'NOT CONFIRMED';
    if (is24x7(p)) return 'OPEN 24 HOURS';
    var t = fmtTime(p.hours.o) + ' – ' + fmtTime(p.hours.c);
    if (p.off && p.off.length) t += ' · SHUT ' + p.off.map(function (d) { return DAYS[d]; }).join(' ');
    return t;
  }

  function shortDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.getDate() + ' ' + ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][d.getMonth()];
  }

  /* Safety net. Every live record is a real business with a published number,
     but if a placeholder-style number is ever added to data.js it must never be
     dialled — a fake number can still reach a real stranger. So a call to one is
     refused rather than placed, whatever the `contact` flag says. */
  function isPlaceholderPhone(phone) {
    return /^\+91\s*98300\s*0/.test(String(phone));
  }

  /* A record is callable only when it is explicitly flagged as a real listing.
     The pattern check stays as a backstop so a mis-flagged record can never
     dial a placeholder. */
  function hasRealContact(p) {
    if (!p || !p.phone) return false;
    if (p.contact === false) return false;
    if (p.contact === true) return !isPlaceholderPhone(p.phone);
    return !isPlaceholderPhone(p.phone);
  }

  /* The colour/icon a pin should wear: when a filter is on, matching places
     adopt that filter's colour so the map answers the question directly. */
  function visualCat(p) {
    if (state.cat !== 'all' && p.cats.indexOf(state.cat) !== -1) return catById(state.cat);
    return catById(p.primary);
  }

  function visiblePlaces() {
    return D.places.filter(function (p) {
      if (state.brand && p.brand !== state.brand) return false;
      if (state.cat !== 'all' && p.cats.indexOf(state.cat) === -1) return false;
      return true;
    });
  }

  /* Brands present in the dataset, in a fixed order. */
  function brandList() {
    var seen = {}, out = [];
    D.places.forEach(function (p) {
      if (p.brand && !seen[p.brand]) { seen[p.brand] = 1; out.push(p.brand); }
    });
    return out;
  }

  /* Tiles are narrow, so long brand names get a short form. */
  var BRAND_SHORT = { 'ROYAL ENFIELD': 'ENFIELD', 'TOWING': 'TOWING', 'LOCAL SHOP': 'LOCAL' };
  function brandShort(b) { return BRAND_SHORT[b] || b; }

  /* Callable records first — the only ones a rider can act on from the roadside.
     Then grouped by brand, which is how riders actually think about this
     ("I ride a Honda, who services Hondas?"). */
  function sortedPlaces() {
    var list = visiblePlaces();
    if (state.user) {
      list.sort(function (a, b) { return distTo(a) - distTo(b); });
    } else {
      list.sort(function (a, b) {
        var ca = hasRealContact(a) ? 0 : 1, cb = hasRealContact(b) ? 0 : 1;
        if (ca !== cb) return ca - cb;
        if (a.brand !== b.brand) return String(a.brand).localeCompare(String(b.brand));
        return String(a.name).localeCompare(String(b.name));
      });
    }
    return list;
  }

  /* ------------------------------------------------------------------- MAP */
  var map = L.map('map', {
    zoomControl: false,
    attributionControl: true,
    minZoom: D.meta.minZoom,
    maxZoom: D.meta.maxZoom,
    maxBounds: L.latLngBounds(D.meta.bounds),
    maxBoundsViscosity: 1.0,      /* hard lock — you cannot pan off into nowhere */
    worldCopyJump: false,
    preferCanvas: false
  }).setView(D.meta.center, D.meta.startZoom);

  map.attributionControl.setPrefix('');

  var tileLayer = null;
  function applyTiles() {
    var prov = PROVIDERS[ACTIVE_PROVIDER];
    if (tileLayer) map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(prov[state.theme], {
      subdomains: prov.subdomains,
      maxZoom: prov.maxZoom,
      detectRetina: true,
      attribution: prov.attribution,
      crossOrigin: true
    }).addTo(map);
  }

  var markers = {};   /* id -> L.Marker */
  var meMarker = null, meCircle = null;

  function pinHtml(p, selected) {
    var c = visualCat(p);
    var k = pinDotKind(p);
    var cls = k === 'shut' ? ' pin--shut' : (k === 'unknown' ? ' pin--unk' : '');
    return '<div class="pin' + cls + (selected ? ' pin--sel' : '') + '"' +
           ' style="--c:' + c.color + ';--ci:' + c.ink + '">' +
           '<span class="pin__ico">' + svg(c.id) + '</span>' +
           '<i class="pin__dot"></i></div>';
  }

  function makeMarker(p) {
    var m = L.marker([p.lat, p.lng], {
      icon: L.divIcon({ className: '', html: pinHtml(p, false), iconSize: [46, 46], iconAnchor: [23, 23] }),
      riseOnHover: true,
      keyboard: false
    });
    m.bindTooltip(
      '<span>' + esc(p.name) + '</span>',
      { permanent: true, direction: 'top', offset: [0, -24], className: 'pin-lbl', opacity: 1 }
    );
    m.on('click', function (e) {
      L.DomEvent.stopPropagation(e); /* or the map's click would deselect at once */
      select(p.id);
    });
    return m;
  }

  function buildMarkers() {
    Object.keys(markers).forEach(function (id) { map.removeLayer(markers[id]); });
    markers = {};
    D.places.forEach(function (p) {
      var m = makeMarker(p);
      markers[p.id] = m;
    });
  }

  var clusterLayer = L.layerGroup().addTo(map);

  /* ------------------------------------------------------------------------
     PIN LAYOUT
     Forty-five oversized badges will always overlap in a dense city. Overlap
     means misclicks, which is the one thing this UI cannot afford. So pins
     that would collide collapse into a numbered cluster badge; tapping it
     zooms in until they separate. The selected pin is never swallowed.
     ---------------------------------------------------------------------- */
  function layoutPins() {
    var z = map.getZoom();
    /* Only merge pins that would physically overlap. Anything further apart
       than one pin diameter stays its own tappable badge. */
    var R = 46;
    var shown = visiblePlaces();
    var visibleIds = {};
    var clusters = [];

    var items = shown.map(function (p) {
      var pt = map.project([p.lat, p.lng], z);
      return { p: p, x: pt.x, y: pt.y };
    });
    /* Selected first, so it always seeds its own group and stays tappable. */
    items.sort(function (a, b) {
      return (a.p.id === state.sel ? 0 : 1) - (b.p.id === state.sel ? 0 : 1);
    });

    var groups = [];
    items.forEach(function (it) {
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var dx = g.x - it.x, dy = g.y - it.y;
        if (dx * dx + dy * dy < R * R) {
          g.x = (g.x * g.n + it.x) / (g.n + 1);
          g.y = (g.y * g.n + it.y) / (g.n + 1);
          g.n++;
          g.items.push(it);
          return;
        }
      }
      groups.push({ x: it.x, y: it.y, n: 1, items: [it] });
    });

    groups.forEach(function (g) {
      var kept = [];
      g.items.forEach(function (it) {
        if (it.p.id === state.sel) visibleIds[it.p.id] = true; else kept.push(it);
      });
      if (kept.length === 1) { visibleIds[kept[0].p.id] = true; return; }
      if (!kept.length) return;

      var lat = 0, lng = 0, kinds = {};
      kept.forEach(function (it) {
        lat += it.p.lat; lng += it.p.lng;
        kinds[it.p.primary] = 1;
      });
      var only = Object.keys(kinds);
      clusters.push({
        lat: lat / kept.length,
        lng: lng / kept.length,
        n: kept.length,
        cat: only.length === 1 ? only[0] : null
      });
    });

    /* Apply to the persistent markers. */
    D.places.forEach(function (p) {
      var m = markers[p.id];
      if (!m) return;
      var isSel = state.sel === p.id;
      var show = !!visibleIds[p.id];
      if (show) {
        if (!map.hasLayer(m)) m.addTo(map);
        var c = visualCat(p);
        var key = c.id + '|' + pinDotKind(p) + '|' + (isSel ? 1 : 0);
        if (m._sosKey !== key) {
          m._sosKey = key;
          m.setIcon(L.divIcon({ className: '', html: pinHtml(p, isSel), iconSize: [46, 46], iconAnchor: [23, 23] }));
        }
        m.setZIndexOffset(isSel ? 1000 : 0);
        /* Name plates appear once the streets are readable, and always for
           the pin the rider has actually chosen. */
        if (isSel || z >= 16) m.openTooltip(); else m.closeTooltip();
      } else if (map.hasLayer(m)) {
        m.closeTooltip();
        map.removeLayer(m);
      }
    });

    /* Rebuild cluster badges. If every place inside shares a category, the
       badge wears that colour so the map still answers the filter question. */
    clusterLayer.clearLayers();
    clusters.forEach(function (c) {
      var c2 = c.cat ? catById(c.cat) : null;
      L.marker([c.lat, c.lng], {
        icon: L.divIcon({
          className: '',
          html: '<div class="pin pin--cluster"' + (c2 ? ' style="--c:' + c2.color + '"' : '') + '>' +
                '<span class="pin__n">' + c.n + '</span></div>',
          iconSize: [54, 54],
          iconAnchor: [27, 27]
        }),
        keyboard: false
      }).on('click', function (e) {
        L.DomEvent.stopPropagation(e);
        map.flyTo([c.lat, c.lng], Math.min(D.meta.maxZoom, z + 2), { duration: .5 });
      }).addTo(clusterLayer);
    });
  }

  /* Re-cluster on zoom only. Re-clustering mid-pan would make pins jump
     under the rider's thumb, which is worse than a little overlap. */
  map.on('zoomend', layoutPins);

  function fitToPlaces(list, animate) {
    var pts = list.slice(0, 12).map(function (p) { return [p.lat, p.lng]; });
    if (state.user) pts.push([state.user.lat, state.user.lng]);
    if (!pts.length) return;
    var peek = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--peek-h')) || 150;
    var opts = {
      paddingTopLeft: [24, hud.offsetHeight + 24],
      paddingBottomRight: [24, peek + 24],
      maxZoom: 15,
      animate: animate !== false
    };
    map.fitBounds(L.latLngBounds(pts).pad(0.06), opts);
  }

  function flyToPlace(p) {
    var peek = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--peek-h')) || 150;
    var targetZ = Math.max(map.getZoom(), 15);
    var pt = map.project([p.lat, p.lng], targetZ);
    var offset = (hud.offsetHeight - peek) / 2; /* keep the pin in the visible band */
    var center = map.unproject(pt.add([0, offset]), targetZ);
    map.flyTo(center, targetZ, { duration: 0.6 });
  }

  /* ------------------------------------------------------------- SUPPORT */
  /* One block, rendered at the end of the results list and again in the About
     panel, so it is reachable whether you scroll the list or open Help.

     The UPI number is copy-to-clipboard rather than a upi:// deep link. A UPI
     deep link needs a VPA handle (@ybl, @okaxis ...) and guessing one would
     send money to a stranger. The bare number works in every UPI app. */
  var UPI_NUMBER = '8017414711';
  var WHATSAPP_URL = 'https://wa.me/91' + UPI_NUMBER;
  var INSTAGRAM_HANDLE = 'ig_chromozome';
  var INSTAGRAM_URL = 'https://instagram.com/' + INSTAGRAM_HANDLE;

  function supportHtml() {
    return '<div class="support">' +
      '<p class="support__kicker">Support this project</p>' +
      '<p class="support__by">Created by <b>Rounak Adhikary</b></p>' +
      '<p class="support__ask">Buy a coffee to support such projects</p>' +

      '<button type="button" class="btn btn--ghost btn--sm support__upi" data-copy="' + UPI_NUMBER + '">' +
        '<span class="btn__ico">' + svg('copy') + '</span>' +
        '<span class="btn__txt">GPay / PhonePe / UPI \u2014 ' + UPI_NUMBER + '</span>' +
      '</button>' +
      '<p class="support__hint">Tap to copy, then paste into GPay or PhonePe.</p>' +

      '<div class="support__row">' +
        '<a class="btn support__wa" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener">' +
          '<span class="btn__ico">' + svg('whatsapp') + '</span>' +
          '<span class="btn__txt">WhatsApp</span></a>' +
        '<a class="btn support__ig" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">' +
          '<span class="btn__ico">' + svg('instagram') + '</span>' +
          '<span class="btn__txt">@' + INSTAGRAM_HANDLE + '</span></a>' +
      '</div>' +
    '</div>';
  }

  /* Delegated, because the block is re-rendered along with the list. */
  function handleCopyClick(e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    copyText(b.getAttribute('data-copy'), 'UPI NUMBER COPIED');
  }

  /* ---------------------------------------------------------------- FILTER */
  var noFilter = function () { return state.cat === 'all' && !state.brand; };

  function renderRail() {
    var html = '<button type="button" class="tile tile--all' + (noFilter() ? ' is-on' : '') + '" data-cat="all">' +
      '<span class="tile__ico">' + svg('all') + '</span>' +
      '<span class="tile__lbl">SHOW<br>ALL</span>' +
      '<span class="tile__n">' + D.places.length + '</span></button>';

    /* Only categories that actually have records — an empty filter is a dead end. */
    D.categories.forEach(function (c) {
      var n = D.places.filter(function (p) { return p.cats.indexOf(c.id) !== -1; }).length;
      if (!n) return;
      html += '<button type="button" class="tile' + (state.cat === c.id ? ' is-on' : '') + '"' +
        ' data-cat="' + c.id + '" style="--c:' + c.color + ';--ci:' + c.ink + '">' +
        '<span class="tile__ico">' + svg(c.id) + '</span>' +
        '<span class="tile__lbl">' + esc(c.tile) + '</span>' +
        '<span class="tile__n">' + n + '</span></button>';
    });

    /* Then one tile per manufacturer. With every listing being an authorised
       service centre, brand is the filter riders actually reach for. */
    var brands = brandList();
    if (brands.length) {
      html += '<span class="rail__sep" aria-hidden="true"></span>';
      brands.forEach(function (b) {
        var n = D.places.filter(function (p) { return p.brand === b; }).length;
        html += '<button type="button" class="tile tile--brand' + (state.brand === b ? ' is-on' : '') + '"' +
          ' data-brand="' + esc(b) + '">' +
          '<span class="tile__ico">' + svg('mechanic') + '</span>' +
          '<span class="tile__lbl">' + esc(brandShort(b)) + '</span>' +
          '<span class="tile__n">' + n + '</span></button>';
      });
    }
    rail.innerHTML = html;
  }

  function applyFilter() {
    renderRail();
    layoutPins();
    renderList(true);
    updateReadout();
    var list = sortedPlaces();
    if (list.length) fitToPlaces(list, true);
  }

  rail.addEventListener('click', function (e) {
    var t = e.target.closest('.tile');
    if (!t) return;
    var brand = t.getAttribute('data-brand');
    if (brand) {
      /* Brand and category are mutually exclusive — one question at a time. */
      state.brand = (state.brand === brand) ? null : brand;
      state.cat = 'all';
    } else {
      var id = t.getAttribute('data-cat');
      state.cat = (state.cat === id && id !== 'all') ? 'all' : id;
      state.brand = null;
    }
    applyFilter();
  });

  /* ---------------------------------------------------------------- LIST */
  /* 250+ cards is a lot of DOM for a cheap phone, so the list renders in
     pages. The map, filters and nearest-first sort all still see everything. */
  var LIST_PAGE = 60;
  var listShown = LIST_PAGE;

  function cardHtml(p) {
    var c = visualCat(p);
    var k = statusKind(p);
    var d = distTo(p);
    var callable = hasRealContact(p);
    var chips = p.cats.slice(0, 3).map(function (id) {
      var cc = catById(id);
      return '<span class="chip" style="--c:' + cc.color + ';--ci:' + cc.ink + '">' + esc(cc.tile) + '</span>';
    }).join('');

    var statusChip = k === 'open'
      ? '<span class="chip chip--open">OPEN</span>'
      : (k === 'shut'
        ? '<span class="chip chip--shut">SHUT</span>'
        : '<span class="chip chip--unk">CALL AHEAD</span>');

    return '<button type="button" class="card' + (state.sel === p.id ? ' is-sel' : '') + '"' +
      ' data-id="' + p.id + '" style="--c:' + c.color + ';--ci:' + c.ink + '">' +
      '<span class="card__badge">' + icoEl(c.id) + '</span>' +
      '<span>' +
        '<span class="card__name">' + esc(p.name) + '</span>' +
        '<span class="card__meta">' +
          statusChip +
          (d !== null ? '<span class="card__dist">' + fmtDist(d) + '</span><span class="card__sep">·</span>' : '') +
          '<span>' + esc(p.area) + '</span>' +
          (callable ? '<span class="card__tel" title="Phone number on file">' + svg('phone') + '</span>' : '') +
        '</span>' +
        '<span class="card__meta" style="margin-top:6px">' + chips +
          (p.brand ? '<span class="chip chip--brand">' + esc(p.brand) + '</span>' : '') +
        '</span>' +
      '</span></button>';
  }

  function renderList(resetPage) {
    var list = sortedPlaces();
    var sortNote = state.user ? 'NEAREST FIRST'
      : (state.brand ? state.brand + ' SERVICE' : 'CALLABLE FIRST');
    if (resetPage) listShown = LIST_PAGE;

    if (!list.length) {
      viewList.innerHTML = '<p class="hint" style="padding:20px 4px;font-size:15px">' +
        'NOTHING IN THIS CATEGORY YET. TAP <b>SHOW ALL</b> OR PICK ANOTHER TILE.</p>';
      return;
    }

    var left = list.length - listShown;
    var html =
      '<div class="listhead"><span>' + sortNote + ' · <b>' + list.length + ' PLACES</b></span>' +
      '<span>' + (state.user ? 'FROM YOUR PIN' : 'TAP ◎ FOR DISTANCE') + '</span></div>' +
      list.slice(0, listShown).map(cardHtml).join('');

    if (left > 0) {
      html += '<button type="button" class="btn btn--ghost btn--sm" id="btn-more">' +
        'SHOW ' + Math.min(LIST_PAGE, left) + ' MORE — ' + left + ' LEFT</button>';
    }
    html += supportHtml();
    viewList.innerHTML = html;
  }

  viewList.addEventListener('click', function (e) {
    if (e.target.closest('[data-copy]')) { handleCopyClick(e); return; }
    var c = e.target.closest('.card');
    if (c) { select(c.getAttribute('data-id')); return; }
    if (e.target.closest('#btn-more')) {
      listShown += LIST_PAGE;
      renderList();
    }
  });

  /* ---------------------------------------------------------------- DETAIL */
  function renderDetail(p) {
    var c = visualCat(p);
    var k = statusKind(p);
    var d = distTo(p);
    var callable = hasRealContact(p);

    var chips = p.cats.map(function (id) {
      var cc = catById(id);
      return '<span class="chip" style="--c:' + cc.color + ';--ci:' + cc.ink + '">' + esc(cc.label) + '</span>';
    }).join('');
    if (p.air) chips += '<span class="chip" style="--c:var(--hi-vis);--ci:#111">AIR ' + esc(p.air) + '</span>';
    if (p.pickup) chips += '<span class="chip" style="--c:var(--alert);--ci:#fff">PICKUP AVAILABLE</span>';
    if (p.brand) chips += '<span class="chip chip--brand">' + esc(p.brand) + '</span>';

    var statusHtml = k === 'open'
      ? '<div class="status"><span class="status__dot"></span><span>OPEN NOW</span>' +
        '<span class="status__sub">' + esc(statusText(p)) + '</span></div>'
      : (k === 'shut'
        ? '<div class="status is-shut"><span class="status__dot"></span><span>CLOSED NOW</span>' +
          '<span class="status__sub">' + esc(statusText(p)) + '</span></div>'
        : '<div class="status is-unk"><span class="status__dot"></span><span>HOURS NOT CONFIRMED</span>' +
          '<span class="status__sub">' + esc(statusText(p)) + '</span></div>');

    /* Provenance line for records that have a number, and a plain explanation
       for the couple that do not. */
    var banner = callable
      ? '<div class="srcstrip"><b>PUBLISHED NUMBER</b>' + esc(p.src || 'Publicly listed') +
        ' · captured ' + esc(shortDate(p.verified)) + '. Ring ahead before you tow.</div>'
      : '<div class="warnstrip"><b>NO NUMBER PUBLISHED</b>' +
        'This is a real business, but no phone number for it appeared in the source ' +
        'directory, so <b>CALL IS DISABLED</b>. Ride over, or add a number in ' +
        '<code>assets/js/data.js</code> and set <code>contact: true</code>.</div>';

    viewDetail.innerHTML =
      '<button type="button" class="btn btn--ghost btn--sm" id="btn-back">' +
        '<span class="btn__ico">' + svg('back') + '</span><span class="btn__txt">BACK TO LIST</span></button>' +

      '<h2 class="detail__name">' + esc(p.name) + '</h2>' +
      '<p class="detail__where">' + esc(p.area) + ' · KOLKATA · ' + esc(p.id.toUpperCase()) + '</p>' +

      banner +
      statusHtml +

      '<div class="grid2">' +
        '<div class="stat"><div class="stat__k">DISTANCE</div><div class="stat__v">' +
          (d === null ? '—' : fmtDist(d).replace(' ', '<small> ').replace(/$/, '</small>')) + '</div></div>' +
        '<div class="stat"><div class="stat__k">PHONE</div><div class="stat__v" style="font-size:15px;line-height:1.3">' +
          (callable ? esc(p.phone) : '<span style="color:var(--ink-dim)">NONE ON FILE</span>') + '</div></div>' +
        '<div class="stat"><div class="stat__k">HOURS</div><div class="stat__v" style="font-size:16px;line-height:1.25">' +
          esc(hoursText(p)) + '</div></div>' +
        '<div class="stat"><div class="stat__k">' + (callable ? 'LISTED ON' : 'LAST VERIFIED') + '</div>' +
          '<div class="stat__v">' + esc(shortDate(p.verified)) + '</div></div>' +
      '</div>' +

      '<div class="chips">' + chips + '</div>' +
      '<p class="note">' + esc(p.note) + '</p>' +
      '<p class="hint" style="margin-bottom:12px">PIN <b>' + p.lat.toFixed(5) + ', ' + p.lng.toFixed(5) + '</b> — handed straight to your navigation app.</p>' +
      '<button type="button" class="btn btn--ghost btn--sm" id="btn-copy">' +
        '<span class="btn__ico">' + svg('copy') + '</span><span class="btn__txt">COPY COORDINATES</span></button>';

    $('btn-back').addEventListener('click', deselect);
    $('btn-copy').addEventListener('click', function () { copyText(p.lat + ',' + p.lng, 'COORDINATES COPIED'); });
  }

  /* The call button is enabled only for records with a real number. Everything
     else keeps the button visible but inert, so the layout never shifts and it
     is obvious the number is simply missing. */
  function syncCallButton(p) {
    var btn = $('btn-call');
    var ok = hasRealContact(p);
    btn.disabled = !ok;
    btn.setAttribute('aria-disabled', ok ? 'false' : 'true');
    btn.classList.toggle('is-off', !ok);
    btn.querySelector('.btn__txt').textContent = ok ? 'CALL NOW' : 'NO NUMBER ON FILE';
  }

  function select(id) {
    var p = null;
    for (var i = 0; i < D.places.length; i++) if (D.places[i].id === id) p = D.places[i];
    if (!p) return;

    state.sel = id;

    viewList.hidden = true;
    viewDetail.hidden = false;
    renderDetail(p);
    sheetScroll.scrollTop = 0;

    sheetTitle.textContent = p.name;
    $('sheet-close').hidden = false;
    $('snap-down').hidden = true;  /* keep the bar uncrowded on small screens */
    dock.hidden = false;
    syncCallButton(p);
    document.documentElement.style.setProperty('--dock-h', dock.offsetHeight + 'px');

    layoutPins();
    layout();
    setSnap('peek', true);
    flyToPlace(p);
    renderList();
  }

  function deselect() {
    state.sel = null;
    viewDetail.hidden = true;
    viewList.hidden = false;
    sheetTitle.textContent = 'NEAREST PLACES';
    $('sheet-close').hidden = true;
    $('snap-down').hidden = false;
    dock.hidden = true;
    document.documentElement.style.setProperty('--dock-h', '0px');
    layoutPins();
    layout();
    setSnap('peek', true);
    renderList();
  }

  /* ------------------------------------------------------------- READOUT */
  function updateReadout() {
    var list = visiblePlaces();
    var callable = list.filter(hasRealContact).length;
    readoutRight.textContent = callable + ' CALLABLE · ' + list.length + ' LISTED';

    if (!state.user) {
      readoutLeft.textContent = 'TAP ◎ TO FIND YOUR POSITION';
      readoutLeft.parentNode.classList.remove('is-warn');
      return;
    }
    var near = sortedPlaces()[0];
    if (!near) { readoutLeft.textContent = 'NO PLACES IN THIS FILTER'; return; }
    var d = distTo(near);
    readoutLeft.textContent = 'NEAREST: ' + near.name + ' — ' + fmtDist(d);
    readoutLeft.parentNode.classList.toggle('is-warn', d > 25);
  }

  /* -------------------------------------------------------------- SHEET UX */
  var DESKTOP = window.matchMedia('(min-width: 760px)');
  function isDocked() { return DESKTOP.matches; }

  /* On a phone the header collapses to make room for the sheet; on a desktop
     there is room for everything, so it stays put. */
  function syncHud() {
    hud.classList.toggle('hud--compact', !isDocked() && (!!state.sel || state.snap !== 'peek'));
  }

  function layout() {
    var vh = window.innerHeight;
    document.documentElement.style.setProperty('--hud-h', hud.offsetHeight + 'px');

    if (isDocked()) {
      sheet.classList.add('sheet--docked');
      sheet.style.transform = 'translateY(0)';
      snaps.peek = snaps.half = snaps.full = 0;
      document.documentElement.style.setProperty('--peek-h', '0px');
      syncHud();
      return;
    }
    sheet.classList.remove('sheet--docked');

    var H = sheet.offsetHeight;
    var headH = sheetHead.offsetHeight;
    var dockH = dock.hidden ? 0 : dock.offsetHeight;

    /* The action dock is opaque and sits above the sheet, so the sheet must
       peek *clear of* the dock — otherwise the drag handle and the chevrons
       end up hidden behind it and the panel can never be swiped open. */
    var peekVisible = dockH
      ? dockH + headH + 10
      : Math.max(headH + 96, 150);

    snaps.peek = Math.max(0, H - peekVisible);
    snaps.half = Math.max(0, H - Math.round(vh * 0.55));
    snaps.full = 0;
    if (snaps.half > snaps.peek) snaps.half = snaps.peek;
  }

  function setSnap(name, animate) {
    state.snap = name;
    layout();
    var y = snaps[name];
    if (isDocked()) { syncHud(); return; }
    if (!animate) sheet.classList.add('is-dragging');
    sheet.style.transform = 'translateY(' + y + 'px)';
    if (!animate) {
      requestAnimationFrame(function () { sheet.classList.remove('is-dragging'); });
    }
    document.documentElement.style.setProperty('--peek-h', Math.max(0, sheet.offsetHeight - y) + 'px');
    syncHud();
  }

  /* Drag: a 3-state snap sheet. Swipe hard, it follows. No precision needed. */
  (function dragSheet() {
    var startY = 0, startT = 0, lastY = 0, lastTime = 0;
    var dragging = false, moved = false;

    function curY() {
      var m = /translateY\(([-\d.]+)px\)/.exec(sheet.style.transform || '');
      return m ? parseFloat(m[1]) : snaps.peek;
    }

    sheetHead.addEventListener('pointerdown', function (e) {
      if (isDocked()) return;
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      moved = false;
      startY = e.clientY;
      startT = curY();
      lastY = e.clientY;
      lastTime = performance.now();
      sheet.classList.add('is-dragging');
      /* NOTE: no preventDefault() and no immediate setPointerCapture() here.
         Either one would retarget the compatibility click event and swallow
         taps on the chevron buttons that live inside the head. Capture is
         taken only once a real drag is under way. */
    });

    sheetHead.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dy = e.clientY - startY;

      if (!moved && Math.abs(dy) > 6) {
        moved = true;
        try { sheetHead.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (!moved) return;

      var y = Math.min(snaps.peek + 40, Math.max(snaps.full - 30, startT + dy));
      sheet.style.transform = 'translateY(' + y + 'px)';
      document.documentElement.style.setProperty('--peek-h', Math.max(0, sheet.offsetHeight - y) + 'px');
      lastY = e.clientY;
      lastTime = performance.now();
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      sheet.classList.remove('is-dragging');
      if (!moved) return;

      var dy = (e.clientY !== undefined ? e.clientY : lastY) - startY;
      var dt = Math.max(1, performance.now() - lastTime);
      var y = curY();

      /* Fast flick = move a whole state, regardless of distance travelled. */
      var flick = Math.abs(dy) > 34 && dt < 260;
      var order = ['full', 'half', 'peek'];
      var idx = 0, best = Infinity;
      order.forEach(function (k, i) { var dd = Math.abs(snaps[k] - y); if (dd < best) { best = dd; idx = i; } });

      var target;
      if (flick) {
        target = order[Math.min(order.length - 1, Math.max(0, idx + (dy < 0 ? -1 : 1)))];
      } else {
        target = order[idx];
      }
      setSnap(target, true);
    }

    sheetHead.addEventListener('pointerup', endDrag);
    sheetHead.addEventListener('pointercancel', endDrag);

    /* Tap the head to cycle states — the fallback for numb fingers. */
    sheetHead.addEventListener('click', function () {
      if (moved) return;
      setSnap(state.snap === 'peek' ? 'half' : (state.snap === 'half' ? 'full' : 'peek'), true);
    });
  })();

  $('snap-up').addEventListener('click', function (e) {
    e.stopPropagation();
    var order = ['peek', 'half', 'full'];
    var i = order.indexOf(state.snap);
    setSnap(order[Math.min(order.length - 1, i + 1)], true);
  });
  $('snap-down').addEventListener('click', function (e) {
    e.stopPropagation();
    var order = ['full', 'half', 'peek'];
    var i = order.indexOf(state.snap);
    setSnap(order[Math.min(order.length - 1, i + 1)], true);
  });

  /* The escape hatch. When a place is selected the sheet peeks at head height
     only, so the BACK TO LIST button inside the scrolled detail content is
     off-screen — this is the control that is always reachable. */
  $('sheet-close').addEventListener('click', function (e) {
    e.stopPropagation();
    deselect();
  });

  /* Tapping the map itself also clears the selection. Leaflet does not fire
     click after a drag, so panning will not trip this. */
  map.on('click', function () {
    if (state.sel) deselect();
  });

  /* ------------------------------------------------------------- GEO / SOS */
  function locate() {
    if (!navigator.geolocation) { showToast('THIS BROWSER CANNOT SHARE LOCATION'); return; }
    var btn = $('btn-locate');
    btn.classList.add('is-busy');
    readoutLeft.textContent = 'ACQUIRING SATELLITES…';

    navigator.geolocation.getCurrentPosition(function (pos) {
      btn.classList.remove('is-busy');
      state.user = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };

      if (meMarker) map.removeLayer(meMarker);
      if (meCircle) map.removeLayer(meCircle);

      meCircle = L.circle([state.user.lat, state.user.lng], {
        radius: Math.max(30, state.user.acc || 40),
        color: '#2979FF', weight: 2, opacity: .7, fillColor: '#2979FF', fillOpacity: .12, interactive: false
      }).addTo(map);

      meMarker = L.marker([state.user.lat, state.user.lng], {
        icon: L.divIcon({ className: '', html: '<div class="me-pin"></div>', iconSize: [30, 30], iconAnchor: [15, 15] }),
        interactive: false, zIndexOffset: 900
      }).addTo(map);

      var b = L.latLngBounds(D.meta.bounds);
      var inside = b.contains([state.user.lat, state.user.lng]);

      renderList(true);
      updateReadout();
      $('my-coords').innerHTML = 'YOUR PIN: <b>' + state.user.lat.toFixed(5) + ', ' + state.user.lng.toFixed(5) +
        '</b> · ACCURATE TO ~' + Math.round(state.user.acc || 0) + ' M';

      if (inside) {
        showToast('POSITION LOCKED — SORTED BY NEAREST');
        map.flyTo([state.user.lat, state.user.lng], 14, { duration: .8 });
      } else {
        showToast('YOU ARE OUTSIDE KOLKATA — SHOWING NEAREST ANYWAY');
        fitToPlaces(sortedPlaces(), true);
      }
    }, function (err) {
      btn.classList.remove('is-busy');
      var msg = err && err.code === 1
        ? 'LOCATION BLOCKED — ALLOW IT IN BROWSER SETTINGS'
        : 'COULD NOT GET A FIX — MOVE INTO THE OPEN';
      showToast(msg);
      readoutLeft.textContent = 'NO GPS FIX · SORTED BY OPEN NOW';
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 });
  }

  /* -------------------------------------------------- NAVIGATE / CALL / SOS */
  /* The whole point of the app: one tap hands the coordinates to the rider's
     native Google Maps app, which starts turn-by-turn immediately. */
  function navUrl(p) {
    return 'https://www.google.com/maps/dir/?api=1' +
      '&destination=' + p.lat.toFixed(6) + ',' + p.lng.toFixed(6) +
      '&travelmode=driving&dir_action=navigate';
  }

  function currentPlace() {
    if (!state.sel) return null;
    for (var i = 0; i < D.places.length; i++) if (D.places[i].id === state.sel) return D.places[i];
    return null;
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(navigator.userAgent);
  }

  $('btn-nav').addEventListener('click', function () {
    var p = currentPlace();
    if (!p) return;
    var url = navUrl(p);
    showToast('OPENING NAVIGATION — ' + p.name);
    if (isMobile()) window.location.href = url;
    else window.open(url, '_blank', 'noopener');
  });

  $('btn-call').addEventListener('click', function () {
    var p = currentPlace();
    if (!p) return;
    if (!hasRealContact(p)) {
      /* Backstop — the button is disabled, but never dial a placeholder. */
      showToast('NO NUMBER ON FILE FOR THIS RECORD');
      return;
    }
    showToast('DIALING ' + p.phone);
    window.location.href = 'tel:' + String(p.phone).replace(/[^\d+]/g, '');
  });

  function smsBody() {
    var coords = state.user
      ? state.user.lat.toFixed(6) + ',' + state.user.lng.toFixed(6)
      : '(position not available)';
    return 'SOS - two-wheeler breakdown in Kolkata. My location: ' + coords +
      ' - https://maps.google.com/?q=' + encodeURIComponent(coords);
  }

  function copyText(text, okMsg) {
    function done() { showToast(okMsg || 'COPIED'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text, done); });
    } else { legacyCopy(text, done); }
  }

  function legacyCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { showToast('COPY FAILED — SELECT MANUALLY'); }
    document.body.removeChild(ta);
  }

  /* ------------------------------------------------------------- EMERGENCY */
  var EMERGENCY = [
    { n: '112', t: 'ALL EMERGENCY', s: 'Police, fire and ambulance — one number', cls: '' },
    { n: '100', t: 'KOLKATA POLICE', s: 'Control room, 24 hours', cls: 'dial--police' },
    { n: '108', t: 'AMBULANCE', s: 'Emergency ambulance service', cls: '' },
    { n: '1073', t: 'ROAD ACCIDENT HELPLINE', s: 'National highway accident response', cls: '' },
    { n: '1033', t: 'HIGHWAY BREAKDOWN', s: 'NHAI helpline for national highways', cls: '' },
    { n: '101', t: 'FIRE BRIGADE', s: 'West Bengal fire and rescue', cls: 'dial--fire' }
  ];

  /* Manufacturer helplines. A stranded rider with a specific brand can often
     get recovery arranged through these faster than through a local garage. */
  var HELPLINES = [
    { n: '1800 266 0018', t: 'HERO MOTOCORP', s: 'Customer care and assistance' },
    { n: '1800 103 3434', t: 'HONDA 2WHEELERS', s: 'Customer care' },
    { n: '1800 425 2077', t: 'TVS MOTOR', s: 'Customer care' },
    { n: '1800 233 2453', t: 'BAJAJ AUTO', s: 'Customer care' },
    { n: '1800 2100 007', t: 'ROYAL ENFIELD', s: '24x7 roadside assistance' }
  ];

  function renderHelplines() {
    $('helpline-list').innerHTML = HELPLINES.map(function (e) {
      return '<button type="button" class="dial dial--mfr" data-tel="' + e.n + '">' +
        '<span class="dial__n" style="font-size:19px;min-width:132px">' + e.n + '</span>' +
        '<span class="dial__t">' + esc(e.t) + '<small>' + esc(e.s) + '</small></span>' +
        '<span class="btn__ico" style="margin-left:auto;width:26px;height:26px">' + svg('phone') + '</span>' +
        '</button>';
    }).join('');
  }

  function renderEmergency() {
    $('emergency-list').innerHTML = EMERGENCY.map(function (e) {
      return '<button type="button" class="dial ' + e.cls + '" data-tel="' + e.n + '">' +
        '<span class="dial__n">' + e.n + '</span>' +
        '<span class="dial__t">' + esc(e.t) + '<small>' + esc(e.s) + '</small></span>' +
        '<span class="btn__ico" style="margin-left:auto;width:26px;height:26px">' + svg('phone') + '</span>' +
        '</button>';
    }).join('');
  }

  $('emergency-list').addEventListener('click', function (e) {
    var b = e.target.closest('.dial');
    if (b) window.location.href = 'tel:' + b.getAttribute('data-tel');
  });

  $('btn-share-sms').addEventListener('click', function () {
    var body = encodeURIComponent(smsBody());
    /* iOS wants &body=, Android wants ?body= — this covers both. */
    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    window.location.href = ios ? 'sms:&body=' + body : 'sms:?body=' + body;
  });

  $('btn-copy-coords').addEventListener('click', function () {
    var t = state.user ? state.user.lat.toFixed(6) + ',' + state.user.lng.toFixed(6) : '';
    if (!t) { showToast('NO POSITION YET — TAP ◎ FIRST'); return; }
    copyText(t, 'COORDINATES COPIED');
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-copy]')) handleCopyClick(e);
  });

  $('helpline-list').addEventListener('click', function (e) {
    var b = e.target.closest('.dial');
    if (b) window.location.href = 'tel:' + b.getAttribute('data-tel');
  });

  $('btn-sos').addEventListener('click', function () { modal.hidden = false; });
  $('btn-close-modal').addEventListener('click', function () { modal.hidden = true; });

  /* ----------------------------------------------------------------- THEME */
  function setTheme(t) {
    state.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', t === 'night' ? '#1C1C1C' : '#FF5722');
    var b = $('btn-theme').querySelector('.iconbtn__ico');
    b.innerHTML = svg(t === 'night' ? 'sun' : 'moon');
    b.setAttribute('data-ico', t === 'night' ? 'sun' : 'moon');
    try { localStorage.setItem('sos-theme', t); } catch (e) {}
    applyTiles();
  }

  $('btn-theme').addEventListener('click', function () {
    setTheme(state.theme === 'night' ? 'day' : 'night');
  });

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('sos-theme'); } catch (e) {}
    if (saved === 'day' || saved === 'night') { setTheme(saved); return; }
    var h = new Date().getHours();
    setTheme((h >= 19 || h < 6) ? 'night' : 'day');
  }

  /* ----------------------------------------------------------------- TOAST */
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
  }

  /* ------------------------------------------------------------------ MISC */
  $('btn-zin').addEventListener('click', function () { map.zoomIn(); });
  $('btn-zout').addEventListener('click', function () { map.zoomOut(); });
  $('btn-locate').addEventListener('click', locate);

  var callable = D.places.filter(hasRealContact).length;
  var brands = brandList();
  $('stamp').innerHTML = '<b>' + D.places.length + ' REAL LISTINGS</b> across ' +
    new Set(D.places.map(function (p) { return p.area; })).size + ' Kolkata localities and ' +
    brands.length + ' brands · <b>' + callable + ' have a phone number on file</b> · ' +
    'captured <b>' + esc(D.meta.updated) + '</b> · no fabricated records.';

  window.addEventListener('resize', function () {
    layout();
    setSnap(state.snap, false);
    map.invalidateSize();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!modal.hidden) modal.hidden = true;
      else if (state.sel) deselect();
    }
  });

  /* ------------------------------------------------------------------ BOOT */
  function paintStaticIcons() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ico]'), function (el) {
      if (el.id === 'btn-theme' || el.closest('#btn-theme')) return;
      el.innerHTML = svg(el.getAttribute('data-ico'));
    });
  }

  function boot() {
    paintStaticIcons();
    initTheme();
    renderEmergency();
    renderHelplines();
    $('support-slot').innerHTML = supportHtml();
    renderRail();
    buildMarkers();
    layoutPins();
    renderList(true);
    updateReadout();
    layout();
    setSnap('peek', false);

    /* Nudge first-time riders toward the two controls that matter. */
    setTimeout(function () { showToast('TAP ◎ TO FIND YOUR POSITION'); }, 900);
  }

  boot();

  /* Offline shell so a stranded rider still gets the app with no signal. */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* fine without it */ });
    });
  }
})();
