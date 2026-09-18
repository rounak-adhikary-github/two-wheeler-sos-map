# Two-Wheeler SOS Map — Kolkata

A single-page, no-build, static web app that helps a stranded rider in Kolkata find an
authorised service centre or a tow — and hand the coordinates to their phone's navigation app
in one tap.

Built for the worst case: you are on the side of the bypass, it is 2 PM in May or 11 PM in
December, your hands are covered in chain lube, and the phone is clamped to a vibrating
handlebar mount. Every design decision follows from that.

---

## What it does

| Feature | Detail |
|---|---|
| **Tap to Navigate** | Hands `lat,lng` to the native Google Maps app with `dir_action=navigate`, so turn-by-turn starts immediately |
| **Call the shop** | Every listing with a published number has a live CALL button. The two without one are visibly disabled |
| **Brand filter** | One tile per manufacturer — Hero, Honda, TVS, Bajaj, Enfield, Yamaha, Suzuki, KTM. Pick your bike, see who services it |
| **Need filter** | Category tiles for Mechanics and Towing. Empty categories are hidden rather than shown as dead ends |
| **Nearest-first** | One tap on ◎ sorts everything by real distance from your position |
| **Swipe-over-tap panel** | Three-state bottom sheet you can flick open with a thumb; chevrons as a fallback |
| **Offline shell** | A service worker caches the app and any map tiles you have already viewed |
| **Day / night** | Auto-selects by time of day, manual toggle in the header |
| **Emergency panel** | 112 / 100 / 108 / 1073 / 101 plus Hero / Honda / TVS / Bajaj / Royal Enfield helplines, and "send my pin by SMS" |

## Coverage

**125 real listings. No fabricated records.** Every entry is a genuine business with a real
street address and a phone number printed exactly as its source published it.

| Brand | Listings |
|---|---|
| Royal Enfield | 26 |
| Bajaj | 21 |
| Hero MotoCorp | 18 |
| TVS | 15 |
| Honda | 14 |
| Yamaha | 13 |
| Suzuki | 12 |
| KTM | 3 |
| 24x7 towing operators | 3 |

Spread across the metro: Barrackpore and Barasat in the north, Baruipur and Budge Budge in the
south, Serampore and Dankuni on the west bank, New Town and Hatiara in the east.

### Where the data came from

Captured **18 September 2026** from:

- **Manufacturer authorised-service-centre directories** — Hero MotoCorp's official ASC
  directory, and the public authorised-dealer directories for Honda, TVS, Bajaj, Royal
  Enfield, Yamaha, Suzuki and KTM. The Royal Enfield entries come from Royal Enfield's own
  dealer locator.
- **Operators' own websites** for the towing services.

Every record stores its `src`, and the detail panel shows it. These are businesses that
publish their numbers specifically so customers can call them.

> **What is deliberately NOT here:** phone numbers for independent local garages and puncture
> shops. I could not verify them, and a wrong number sends a stranded rider to a stranger —
> the exact harm this app exists to prevent. Those categories show as hidden filters rather
> than as invented listings. Add them yourself as you confirm them (see below).

> **Opening hours are not published by these sources, so the app does not guess.** Every pin
> shows a **yellow** dot and `CALL AHEAD` instead of a made-up open/closed state. A red dot
> means no number is on file at all, so you must ride over. Ring before you tow your bike
> anywhere.

---

## Host it free on GitHub Pages

No build step, no npm, no framework. Push the files and turn Pages on.

```bash
cd twoWheelerSOSMap
git add .
git commit -m "Real listings only"
git push
```

Then in the repository: **Settings → Pages → Build and deployment**
- Source: `Deploy from a branch`
- Branch: the branch you pushed to (`master` or `main`) · folder `/ (root)`
- Save

Your map goes live at `https://<your-username>.github.io/<repo-name>/` in about a minute.
Everything is relative-path based, so it also works from a project subpath.

> This repo is already wired to `origin`, so only the `git add / commit / push` steps are
> needed on later edits. The branch is **`master`**.

> The `.nojekyll` file is included so GitHub Pages serves the files verbatim.

### Run it locally

```bash
python -m http.server 8777
# open http://127.0.0.1:8777
```

Open it over `http://`, not `file://` — geolocation and the service worker need a real origin.

---

## Adding a place

Everything lives in **`assets/js/data.js`**. Nothing else needs to change.

```js
{
  id: 'sos-126',                                  // any unique string
  name: 'EXAMPLE MOTOR WORKS',
  area: 'Bansdroni',                              // shown under the name
  lat: 22.4780, lng: 88.3600,                     // decimal degrees
  cats: ['mechanic'],                             // air | structural | control | tow | parking | mechanic
  primary: 'mechanic',                            // icon + colour on the map badge
  brand: 'HONDA',                                 // drives the brand filter tile

  phone: '+91 98300 00046',                       // the real number, or '' if none
  contact: true,                                  // <-- THIS is what arms CALL
  src: 'Owner gave permission, visited 2026-09-18',

  hours: null,                                    // null = not confirmed -> CALL AHEAD
  off: [],                                        // closed Sundays? use [0]
  note: 'One short sentence.',
  checks: 0,
  verified: '2026-09-18'                          // YYYY-MM-DD
}
```

### The `contact` flag controls the call button

| `contact` | `phone` | CALL button |
|---|---|---|
| `true` | a real number | **enabled**, labelled `CALL NOW` |
| `false` | any value | **disabled**, greyed out, labelled `NO NUMBER ON FILE` |

The button is **never removed** — only disabled — so the layout never shifts and it stays
obvious that the number is missing rather than that the feature is broken. `NAVIGATE` still
works on every record regardless.

**Never set `contact: true` on a number you have not verified.** A wrong number sends someone
to a stranger.

### Honest hours

Set `hours: null` for any record whose opening times you have not confirmed. The app then shows
a **yellow** dot and `CALL AHEAD`. To enable real open/closed states, use a 24h decimal range:

```js
hours: { o: 9, c: 21 },   // 9:00 AM to 9:00 PM
hours: { o: 0, c: 24 },   // open 24 hours
```

Never fabricate hours for a real business.

### Keeping the list fresh

Directory listings go stale — numbers change and branches close. There is no backend, so
nothing updates itself. Walk the list every few months, re-check the numbers, and delete
anything you cannot confirm.

---

## Design language

Deliberately **industrial, high-visibility and tactile** rather than sleek.

**Hazard palette** — colours carry meaning and are never used for decoration:

| Token | Value | Reserved for |
|---|---|---|
| Safety orange | `#FF5722` | Navigate Now, immediate action |
| Alert red | `#D32F2F` | Call, closed, danger |
| Hi-vis yellow | `#FFEB3B` | Caution band, hours-unknown dot |
| Neon green | `#39FF14` | Open now, available |
| Off-white | `#F5F5F5` | Day background (never pure white — glare) |
| Charcoal | `#1C1C1C` | Night background (never pure black — halation) |

**Handlebar typography** — Oswald / Roboto Condensed, ALL CAPS, weights 600–700,
letter-spaced. No italics, no thin weights, no paragraphs longer than one sentence. Readable
from two feet away.

**Greasy-hand UX** — minimum touch target is **64×64px** (above the 48px norm), the dock
buttons are 64px and 76px tall and span the full panel width, every button has a chunky
drop-shadow that collapses on press so it feels physical, and the bottom sheet can be flicked
rather than precisely tapped.

**Map clutter reduction** — the basemap draws roads, water and land and nothing else. No
restaurants, no retail, no parks. Pins are 46px circular badges with 4px borders, not
teardrops. Pins that would physically overlap merge into a numbered cluster so a misclick is
impossible.

---

## Basemap provider

The default is **Esri Gray Canvas** (`World_Light_Gray_Base` / `World_Dark_Gray_Base`):

- No API key, no signup, no billing account
- Genuinely POI-free — its labels live in a separate reference layer the app never requests
- Full road network including alleys

The provider is swappable in one place — the `PROVIDERS` object at the top of
`assets/js/app.js`. A commented MapTiler example is included.

**Before you swap or publish, check two things:**

1. **Terms of use.** The default tile services are free for reasonable community use with
   attribution. Heavy traffic, commercial use, or redistribution may need a paid plan or a
   self-hosted tile server. Attribution is rendered on the map — leave it on.
2. **Map data compliance.** This app renders a foreign city, so no national-boundary or
   disputed-territory features are drawn: the view is hard-locked to the Greater Kolkata
   bounding box and cannot pan anywhere near a sensitive border. If you re-target this app at
   another region, review the applicable map-data regulations for that region first.

---

## Files

```
index.html                  markup and structure
assets/css/style.css        the entire design system, commented by section
assets/js/data.js           <-- all content lives here
assets/js/app.js            map, filters, clustering, geolocation, navigation handoff
assets/js/seed-records.js   ARCHIVED placeholder records — NOT loaded, kept for reference
assets/img/icon.svg         app / home-screen icon
vendor/leaflet/             Leaflet 1.9.4, vendored so the app works offline
sw.js                       offline cache (app shell, tiles, fonts)
manifest.webmanifest        installable "add to home screen" metadata
.nojekyll                   tells GitHub Pages to serve files verbatim
```

No build step. Edit a file, refresh the page.

`seed-records.js` holds the 257 synthetic placeholder records from the earlier draft. It is
**not referenced by `index.html`**, so it costs nothing to download — it is just kept on disk
so that work is not lost. Delete it if you do not want it.

---

## Known limitations

- **No puncture shops, tyre dealers or air points.** I could not verify phone numbers for
  those categories, so rather than invent them the app hides the empty filters. This is the
  biggest gap in the dataset — see *Adding a place* above.
- **Navigation handoff requires the Google Maps app.** Without it, the link opens in the
  browser instead. Everything else works offline.
- **Listings go stale.** Numbers change and branches close. There is no backend and nothing
  auto-updates. The app shows the capture date on every record.
- **Hours are unknown for every listing**, so everything reads `CALL AHEAD`. This is honest,
  not a bug.
- **Coordinates are accurate to the street, not the shopfront.** They are derived from the
  published address, so expect to nudge `lat`/`lng` for a few of them.
- **`checks` is unused** — there is no backend for community confirmations. Wiring that up
  needs a database or a form service.
- **Tile zoom stops at 16** (Esri's native limit). Past that the map upscales — a deliberate
  trade for a keyless, POI-free basemap. The app hands off to a real navigation app for the
  last few hundred metres anyway.
