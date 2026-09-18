# Two-Wheeler SOS Map — Kolkata

A single-page, no-build, static web app that helps a stranded rider in Kolkata find
the nearest mechanic, spare-part shop, air point, tow van or safe parking spot — and
hand the coordinates to their phone's navigation app in one tap.

Built for the worst case: you are on the side of the bypass, it is 2 PM in May or
11 PM in December, your hands are covered in chain lube, and the phone is clamped to
a vibrating handlebar mount. Every design decision follows from that.

---

## What it does

| Feature | Detail |
|---|---|
| **Tap to Navigate** | Hands `lat,lng` to the native Google Maps app with `dir_action=navigate`, so turn-by-turn starts immediately — no copying coordinates, no typing |
| **Icon-driven filters** | Six oversized horizontal tiles: Air, Structural spares, Control spares, Towing, Parking, Mechanics. No dropdowns |
| **Nearest-first** | One tap on ◎ sorts everything by real distance from your position |
| **Open-now signal** | Green/red dot on every badge, computed live from each shop's hours |
| **Swipe-over-tap panel** | Three-state bottom sheet you can flick open with a thumb; chevrons provided as a fallback |
| **Paged results** | 60 cards at a time, so a 250-place list stays smooth on a cheap phone |
| **Offline shell** | A service worker caches the app and any map tiles you have already viewed |
| **Day / night** | Auto-selects by time of day, manual toggle in the header |
| **Emergency panel** | 112 / 100 / 108 / 1073 / 101 on 76px dial buttons, plus Hero / Honda / TVS / Bajaj / Royal Enfield helplines, plus "send my pin by SMS" |
| **Call button** | Live on the 60 verified listings, visibly disabled on the 257 seed records |

## Coverage

**317 places across 173 named Kolkata localities**, spread from Barrackpore and Barasat in the
north to Baruipur and Budge Budge in the south, and from Serampore and Domjur on the west bank
to New Town and Hatiara in the east.

They come in **two kinds**, and the app always tells you which is which:

| | Verified listings | Seed records |
|---|---|---|
| **Count** | 60 | 257 |
| **What it is** | Authorised Hero / Honda / TVS / Bajaj / Royal Enfield service centres | Community-shaped entries |
| **Phone** | Real, publicly published | Synthetic placeholder |
| **CALL button** | **Live** | **Disabled** |
| **Hours** | Not confirmed — shows `CALL AHEAD` | Generated |
| **Map dot** | Yellow | Green (open) / red (closed) |

Verified listings are pulled from manufacturer authorised-service-centre directories and public
dealer listings, captured 2026-09-18. Each one records its `src` in the data file and the detail
panel shows that provenance.

The list sorts **callable first**, so the records you can actually ring are always at the top.

| Category | Listings |
|---|---|
| Mechanics | 136 |
| Flat tyre / air | 50 |
| Structural spares (forks, T-stems, frames) | 37 |
| Control spares (levers, cables, indicators) | 36 |
| Safe parking | 29 |
| Towing / pickup | 29 |

The mix follows how these services actually distribute across a city: parking and spares cluster
in the central business district and Salt Lake, towing and general repair thin out toward the
fringes, and every neighbourhood gets at least one mechanic.

---

## Host it free on GitHub Pages

No build step, no npm, no framework. Push the files and turn Pages on.

```bash
cd twoWheelerSOSMap
git add .
git commit -m "Two-Wheeler SOS Map for Kolkata"
git push
```

Then in the repository: **Settings → Pages → Build and deployment**
- Source: `Deploy from a branch`
- Branch: the branch you pushed to (`master` or `main`) · folder `/ (root)`
- Save

Your map goes live at `https://<your-username>.github.io/<repo-name>/` in about a minute.
Everything is relative-path based, so it also works from a project subpath.

> This repo is already wired to `origin`, so only the `git add / commit / push` steps are
> needed on later edits. If you are starting from a fresh copy instead, run
> `git init && git branch -M main && git remote add origin <url>` first.

> The `.nojekyll` file is included so GitHub Pages serves the files verbatim.

### Run it locally

```bash
python -m http.server 8777
# open http://127.0.0.1:8777
```

Open it over `http://`, not `file://` — geolocation and the service worker need a real
origin.

---

## Adding real places

Everything lives in **`assets/js/data.js`**. Nothing else needs to change.

```js
{
  id: 'sos-318',                                  // any unique string
  name: 'EXAMPLE MOTOR WORKS',
  area: 'Bansdroni',                              // shown under the name
  lat: 22.4780, lng: 88.3600,                     // decimal degrees
  cats: ['mechanic', 'structural'],               // filter categories
  primary: 'mechanic',                            // icon + colour on the map badge
  phone: '+91 98300 00046',

  contact: true,                                  // <-- THIS is what arms CALL
  src: 'Owner gave permission, visited 2026-09-18',
  hours: null,                                    // null = hours not confirmed

  off: [0],                                       // closed Sunday (0=Sun … 6=Sat)
  note: 'One sentence. Anything longer gets truncated on purpose.',
  checks: 0,                                      // community confirmations
  verified: '2026-09-18'                          // YYYY-MM-DD
}
```

### The `contact` flag controls the call button

This is the whole mechanism, and it is deliberately explicit rather than inferred:

| `contact` | `phone` | CALL button |
|---|---|---|
| `true` | a real number | **enabled**, labelled `CALL NOW` |
| omitted | a real number | enabled (legacy records fall back to a placeholder-pattern check) |
| `false`, or a `+91 98300 0…` placeholder | placeholder | **disabled**, greyed out, labelled `NO NUMBER ON FILE` |

The button is **never removed** — only disabled — so the layout never shifts and it stays
obvious that the number is simply missing rather than that the feature is broken.

To promote a seed record: put in a real consented number, add `contact: true`, and the button
arms itself. To keep a number on file but stop the app dialling it, set `contact: false`.

### Honest hours

Set `hours: null` for any record whose opening times you have not confirmed. The app then shows
a **yellow** pin dot and `HOURS NOT CONFIRMED / CALL BEFORE YOU TOW` instead of inventing an
open/closed state. Never fabricate hours for a real business.

Categories: `air` · `structural` · `control` · `tow` · `parking` · `mechanic`

Optional extras:
- `air: 'FREE'` or `air: '₹20'` — adds an air-price chip
- `pickup: true` — adds a "PICKUP AVAILABLE" chip

The map is hard-locked to the Greater Kolkata bounding box in `meta.bounds`, so nobody
can pan off into empty map.

> ### About the 257 seed records
>
> The **geography is real** — every `area` is a genuine Kolkata neighbourhood and its
> coordinates sit within a few hundred metres of it, which is what makes the map useful to
> look at.
>
> Everything else is **synthetic**: the business names, the opening hours, the verification
> dates and the phone numbers. They are not verified businesses, and `+91 98300 0xxxx` is a
> placeholder sequence, not a real contact.
>
> **Because of that, the CALL button is disabled on every seed record** — dialling a
> placeholder could reach a stranger who has nothing to do with this map. The button stays
> visible but greyed out, labelled `NO NUMBER ON FILE`, and the detail panel explains why.
> NAVIGATE still works normally on every record.
>
> Publishing a real person's phone number without their consent is a privacy violation. Before
> sharing this map publicly, walk the list, replace the placeholders with shops that agreed to
> be listed, and delete the rest.

> ### About the 60 verified listings
>
> These are real businesses that publish their numbers specifically so customers can call
> them. Sources are recorded per record in `src`. Two caveats worth taking seriously:
>
> 1. **Directory listings go stale.** Phone numbers change, branches close. The app shows the
>    capture date (`LISTED ON`) on every verified record so you can judge how much to trust it.
>    Re-check the list periodically.
> 2. **Hours are deliberately not shown.** Nobody confirmed them, and inventing an open/closed
>    state for a real business would be worse than admitting we don't know. Verified listings
>    get a yellow dot and `CALL AHEAD` instead — which is what you should do anyway before
>    towing a bike anywhere.

### Reaching a specific category faster

The list renders 60 cards at a time with a **SHOW 60 MORE** button at the end. The map, the
filters and the nearest-first sort always see the full 257 — paging is presentation only.

---

## Design language

Deliberately **industrial, high-visibility and tactile** rather than sleek.

**Hazard palette** — colours carry meaning and are never used for decoration:

| Token | Value | Reserved for |
|---|---|---|
| Safety orange | `#FF5722` | Navigate Now, immediate action |
| Alert red | `#D32F2F` | Call, closed, danger |
| Hi-vis yellow | `#FFEB3B` | Caution band, air category |
| Neon green | `#39FF14` | Open now, available |
| Off-white | `#F5F5F5` | Day background (never pure white — glare) |
| Charcoal | `#1C1C1C` | Night background (never pure black — halation) |

**Handlebar typography** — Oswald / Roboto Condensed, ALL CAPS, weights 600–700,
letter-spaced. No italics, no thin weights, no paragraphs longer than one sentence.
Readable from two feet away.

**Greasy-hand UX** — minimum touch target is **64×64px** (above the 48px norm), the
dock buttons are 64px and 76px tall and span the full panel width, every button has a
chunky drop-shadow that collapses on press so it feels physical, and the bottom sheet
can be flicked rather than precisely tapped.

**Map clutter reduction** — the basemap draws roads, water and land and nothing else.
No restaurants, no retail, no parks. Pins are 46px circular badges with 4px borders,
not teardrops. Pins that would physically overlap merge into a numbered cluster so a
misclick is impossible.

---

## Basemap provider

The default is **Esri Gray Canvas** (`World_Light_Gray_Base` / `World_Dark_Gray_Base`):

- No API key, no signup, no billing account
- Genuinely POI-free — its labels live in a separate reference layer that the app
  simply never requests
- Full road network including alleys

The provider is swappable in one place — the `PROVIDERS` object at the top of
`assets/js/app.js`. A commented MapTiler example is included.

**Before you swap or publish, check two things:**

1. **Terms of use.** The default tile services are free for reasonable community use
   with attribution. Heavy traffic, commercial use, or redistribution may need a paid
   plan or a self-hosted tile server. Attribution is rendered on the map — leave it on.
2. **Map data compliance.** This app renders a foreign city, so no national-boundary
   or disputed-territory features are drawn: the view is hard-locked to the Greater
   Kolkata bounding box and cannot pan anywhere near a sensitive border. If you
   re-target this app at another region, review the applicable map-data regulations
   for that region first, and confirm the basemap's boundary rendering is acceptable
   there.

---

## Files

```
index.html                  markup and structure
assets/css/style.css        the entire design system, commented by section
assets/js/data.js           <-- all content lives here
assets/js/app.js            map, filters, clustering, geolocation, navigation handoff
assets/img/icon.svg         app / home-screen icon
vendor/leaflet/             Leaflet 1.9.4, vendored so the app works offline
sw.js                       offline cache (app shell, tiles, fonts)
manifest.webmanifest        installable "add to home screen" metadata
.nojekyll                   tells GitHub Pages to serve files verbatim
```

No build step. Edit a file, refresh the page.

---

## Known limitations

- **Navigation handoff requires the Google Maps app.** Without it, the link opens in
  the browser instead. Everything else works offline.
- **CALL is disabled on all 257 seed records.** Intentional, not a bug. See the `contact`
  flag section above for how to arm it.
- **Directory numbers go stale.** The 60 verified listings were captured 2026-09-18 from
  manufacturer and public dealer directories. Numbers change and branches close — the app
  shows the capture date on each record, but re-check the list periodically.
- **Verified listings have no confirmed opening hours**, so they show `CALL AHEAD` rather
  than a made-up open/closed state.
- **The 257 seed records have not been field-checked.** Coordinates are correct to the
  neighbourhood but not to the individual shopfront, because the shopfronts are fictional.
  Expect to nudge `lat`/`lng` as you replace each one.
- **`checks` is a static number.** There is no backend, so community confirmations are
  editorial, not live. Wiring that up needs a database or a form service.
- **Tile zoom stops at 16** (Esri's native limit). Past that the map upscales. This is
  a deliberate trade for a keyless, POI-free basemap — the app hands off to a real
  navigation app for the last few hundred metres anyway.
- **At city-wide zoom the pins cluster heavily**, because 317 badges cannot fit on a phone
  screen without overlapping. That is the clustering doing its job — tap a numbered badge
  to zoom into it.
