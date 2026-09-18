# Project Memory — twoWheelerSOSMap

## What this is
Single-page static web app: "Two-Wheeler SOS Map for Kolkata". Helps a stranded rider
find mechanics, spare-part shops, air points, tow vans and safe parking, then hands
coordinates to the native Google Maps app in one tap. Hosted free on GitHub Pages.

## Dataset
- **125 REAL listings only. No fabricated records.** `assets/js/data.js` contains nothing
  synthetic.
  - Brands: Royal Enfield 26, Bajaj 21, Hero 18, TVS 15, Honda 14, Yamaha 13, Suzuki 12,
    KTM 3, plus 3 towing operators. 78 localities.
  - 123 of 125 have a published phone number. The other 2 (Honda BigWing Bouchtala,
    TowMigo) have `contact: false` and a visibly disabled CALL button.
  - All are authorised service centres sourced 2026-09-18 from manufacturer ASC
    directories, public authorised-dealer directories, Royal Enfield's own dealer locator,
    and the towing operators' own sites. Each record stores `src`.
- **`assets/js/seed-records.js` holds the 257 archived placeholder records.** It is NOT
  referenced by `index.html` — preserved on disk so nothing was deleted, zero download cost.
  Do not add it back to index.html.
- **`hours: null` on every record.** These directories do not publish opening times, so the
  app shows a yellow dot and `CALL AHEAD` rather than inventing a state. Never fabricate hours
  for a real business.
- **Pin dot semantics:** yellow = hours unknown but callable; red = no number on file.
- **`contact: true` is the only thing that arms CALL.** Never set it on an unverified number.
- **Known gap: no puncture shops, tyre dealers or air points.** Numbers for those could not be
  verified, so the app hides the empty category filters rather than inventing listings.

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
