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
| **Need filter** | Category tiles for Mechanics, Towing, Tyre/Air, Battery, Structure and Controls. Empty categories are hidden rather than shown as dead ends |
| **Nearest-first** | One tap on ◎ sorts everything by real distance from your position |
| **Swipe-over-tap panel** | Three-state bottom sheet you can flick open with a thumb; chevrons as a fallback |
| **Four ways out of a place** | Red ✕ in the panel bar, tap anywhere on the map, BACK TO LIST inside the details, or Escape on a keyboard |
| **Support block** | Credit, UPI, WhatsApp and Instagram, at the end of the results list and in the Help panel |
| **Offline shell** | A service worker caches the app and any map tiles you have already viewed |
| **Day / night** | Auto-selects by time of day, manual toggle in the header |
| **Emergency panel** | 112 / 100 / 108 / 1073 / 1033 / 101 plus Hero / Honda / TVS / Bajaj / Royal Enfield helplines, and "send my pin by SMS" |

### Getting back out of a place

Selecting a place peeks the panel at head height only — so the `BACK TO LIST` button inside the
scrolled detail content is off-screen and useless as an escape. There are four ways back:

1. **The red ✕** in the panel bar. Always visible while a place is selected, 64×64px, and
   placed last in the bar so it is the control nearest a right thumb.
2. **Tap anywhere on the map.** Leaflet does not fire `click` after a drag, so panning will not
   trip it, and pin clicks are stopped from bubbling so selecting never deselects itself.
3. **BACK TO LIST**, inside the detail, for when the panel is expanded.
4. **Escape**, if there is a keyboard attached.

The ✕ is hidden again when nothing is selected, and the collapse chevron is hidden while a
place is selected so the bar does not crowd on a 320px screen.

## Coverage

**170 real listings. No fabricated records.** Every entry is a genuine business with a real
street address and a phone number printed exactly as its source published it. There is no
placeholder or sample data anywhere in the project.

| Group | Listings |
|---|---|
| Royal Enfield | 26 |
| **Independent local workshops** | **22** |
| Bajaj | 21 |
| Hero MotoCorp | 18 |
| TVS | 15 |
| Honda | 15 |
| Yamaha | 13 |
| Suzuki | 12 |
| **24x7 towing / recovery** | **10** |
| **Tyre / puncture shops** | **7** |
| **Battery dealers (Exide, Amaron)** | **5** |
| Spare-parts shops | 3 |
| KTM | 3 |

169 of the 170 have a published phone number, so CALL is live on them. Only Honda BigWing
Topline South has none, and keeps a visibly disabled button.

Spread across 92 localities: Barrackpore and Barasat in the north, Baruipur and Budge Budge in
the south, Serampore and Dankuni on the west bank, New Town and Hatiara in the east.

### Where the data came from

- **Manufacturer authorised-service-centre directories** — Hero MotoCorp's official ASC
  directory, and the public authorised-dealer directories for Honda, TVS, Bajaj, Royal
  Enfield, Yamaha, Suzuki and KTM. The Royal Enfield entries come from Royal Enfield's own
  dealer locator. *(captured 18 Sep 2026)*
- **Public business directory listings** for the first batch of independent workshops.
  *(captured 21 Sep 2026)*
- **Google Maps place listings** for the tyre shops, battery dealers, spare-parts shops, most
  of the towing operators and the second batch of workshops. *(captured 21 Sep 2026)*
- **Operators' own websites** for the national roadside-assistance services.

Every record stores its `src`, and the detail panel shows it.

### About the opening hours

Thirteen listings are confirmed **open 24 hours** by their source, so those carry real hours
and show a green dot. Everything else has an **unknown opening time** — Maps will report
"closes at 7 PM" but not when a shop opens, and a closing time alone cannot tell you whether
a place is open right now. So those records keep `hours: null`, show a yellow dot, and say
`CALL AHEAD`. The closing time is recorded in the note as a listing fact, not as a live claim.

### A note on using Google Maps data

The Maps-sourced records were read from publicly visible place listings. Google's terms
restrict scraping and bulk redistribution of Maps content, and place data goes stale. For a
personal or community project this is low-risk, but **if you intend to run this at any scale,
replace those records with numbers you collected yourself or licensed from a provider.** The
manufacturer-directory records do not carry that caveat.

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

## Credits and support

At the end of the results list — and again in the Help panel — there is a support block:

- **Created by Rounak Adhikary**
- **UPI / GPay / PhonePe — 8017414711**, as a tap-to-copy button
- **WhatsApp** → `wa.me/918017414711`
- **Instagram** → `@ig_chromozome`

To change any of it, edit the four constants at the top of the `SUPPORT` section in
`assets/js/app.js` (`UPI_NUMBER`, `WHATSAPP_URL`, `INSTAGRAM_HANDLE`, `INSTAGRAM_URL`) and the
copy in `supportHtml()` just below. It is rendered in both places from that one function.

> **Why the UPI number is copy-to-clipboard and not a `upi://` link.** A UPI deep link needs a
> full VPA — `8017414711@ybl`, `@okaxis`, and so on — and the handle decides where the money
> actually goes. Guessing one would risk sending a stranger's payment into the void. The bare
> number works in every UPI app via "pay to mobile number", so the button copies it and the
> hint says to paste it in.

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

- **Google Maps is the source for 33 of the 170 records.** See the note above — fine for a
  community project, but licence or re-collect before running this at scale.
- **Opening hours are unknown for 157 of the 170 records**, so they read `CALL AHEAD`. Only
  the confirmed 24-hour places show a live open state. This is honest, not a bug.
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
