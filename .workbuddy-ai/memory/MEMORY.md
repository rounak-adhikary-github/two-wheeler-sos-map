# Project Memory — twoWheelerSOSMap

## What this is
Single-page static web app: "Two-Wheeler SOS Map for Kolkata". Helps a stranded rider
find mechanics, spare-part shops, air points, tow vans and safe parking, then hands
coordinates to the native Google Maps app in one tap. Hosted free on GitHub Pages.

## Dataset
- **170 REAL listings only. No fabricated records.** `assets/js/data.js` contains nothing
  synthetic. 169 callable, 92 localities.
  - Authorised service centres: Royal Enfield 26, Bajaj 21, Hero 18, TVS 15, Honda 15,
    Yamaha 13, Suzuki 12, KTM 3.
  - **22 independent local workshops** (`brand: 'LOCAL SHOP'`).
  - **10 towing / recovery** (`brand: 'TOWING'`), 7 tyre/puncture (`brand: 'TYRE'`),
    5 battery dealers (`brand: 'BATTERY'`), 3 spare-parts shops (`brand: 'SPARES'`).
  - Sources by record count: manufacturer directories 122, **Google Maps 33**, public business
    directories 11, operators' own sites 4. Each record stores `src`.
- **Categories:** mechanic, tow, air (labelled TYRE / AIR / PUNCTURE), battery, structural,
  control, parking. `battery` uses colour `#FF2D95`.
- **Hours:** only the 13 records whose source confirmed "open 24 hours" carry real hours
  (`{o:0, c:24}`) and show a green dot. The other 157 have `hours: null` → yellow dot,
  `CALL AHEAD`. Never infer open/closed from a closing time alone — Maps gives closes-at but
  not opens-at, and only at capture time.
- **No placeholder or sample data anywhere.** The 257 archived seed records were deleted on
  the user's instruction; recoverable from git commit `518df80` if ever needed, but do not
  restore them without being asked.
- **`contact: true` is the only thing that arms CALL.** Never set it on an unverified number.
  `isPlaceholderPhone()` stays as a backstop.
- **Google Maps ToS caveat:** 33 records came from Maps place listings. Fine for a personal
  project, but needs licensing or re-collection before running at scale. Documented in the
  README — do not quietly remove that note.

## Repo
- Remote: `git@github.com:rounak-adhikary-github/two-wheeler-sos-map.git`, branch **`master`**
  (not `main`).
- GitHub Pages must be enabled manually in repo settings; source = branch `master`, `/ (root)`.
- Do not commit or push without being asked — pushing is an external action.

## Conventions
- **No build step, ever.** Plain HTML/CSS/JS. Editing a file and refreshing must be the
  whole workflow. Do not introduce npm, bundlers, or frameworks.
- **All content lives in `assets/js/data.js`.** App logic in `assets/js/app.js` must stay
  content-agnostic. A non-developer should be able to add a shop by copying one object.
- **Leaflet is vendored** in `vendor/leaflet/` — never swap it for a CDN link; offline
  capability is a core requirement.
- **Basemap: Esri Gray Canvas.** Keyless, POI-free. Do not switch back to CARTO — their
  keyless tiles are watermarked. If changing providers, verify a real downloaded tile
  visually, and update the tile-host regex in `sw.js`.
- **Never embed a map API key.** The whole point is a keyless deploy.
- **List is paged at 60 cards** (`LIST_PAGE`). Reset the page on filter change, position
  fix and boot — never on select/deselect, or the user loses their place.
- `startZoom: 14`. Zoom 13 renders ~134 badges at once and reads as clutter.

## Design rules (non-negotiable, from the brief)
- Colours carry meaning: orange `#FF5722` = immediate action only, red `#D32F2F` = call /
  danger, hi-vis `#FFEB3B` = caution + air category, neon `#39FF14` = open now.
- Day background off-white `#F5F5F5` (never pure white — glare). Night `#1C1C1C`
  (never pure black — halation).
- ALL CAPS, heavy condensed type (Oswald / Roboto Condensed, 600–700). No italics, no
  thin weights, shop descriptions truncated to one sentence.
- Minimum touch target **64×64px**. Action buttons span the full panel width and have a
  chunky shadow that collapses on press.
- Filter tiles are icon-driven and horizontally scrollable. No dropdowns, no text search.
- Sheet is swiped, not tapped. Chevrons exist only as a fallback.
- Map shows the road network only. No POI labels. Oversized circular badges, not teardrops.

## Gotchas already paid for
- Leaflet `_getSubdomain` throws when `subdomains` is omitted. Always pass a string.
- Do not apply `contrast()` filters to the light basemap — it erases the road network.
- The action dock overlays the sheet; peek offset must include `dock.offsetHeight`.
- `setPointerCapture` / `preventDefault` on `pointerdown` break clicks on nested buttons.

## Open items
- Every record is still seed data. Replace with consented real shops before publishing.
- `checks` counts are static editorial values; no backend exists for live confirmations.
- Coordinates are correct to the neighbourhood, not the shopfront — expect to nudge
  `lat`/`lng` as each record is replaced with a real one.
