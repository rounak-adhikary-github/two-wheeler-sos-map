# Project Memory — twoWheelerSOSMap

## What this is
Single-page static web app: "Two-Wheeler SOS Map for Kolkata". Helps a stranded rider
find mechanics, spare-part shops, air points, tow vans and safe parking, then hands
coordinates to the native Google Maps app in one tap. Hosted free on GitHub Pages.

## Dataset
- **317 places across 173 real Kolkata localities**, in two kinds:
  - **60 verified listings** (`contact: true`) — authorised Hero / Honda / TVS / Bajaj /
    Royal Enfield service centres with real, publicly-published numbers. `hours: null`,
    so they show a yellow dot and CALL AHEAD. Each carries `src` provenance.
  - **257 seed records** — geography real, everything else synthetic. Phone placeholders
    follow `+91 98300 0xxxx`.
- **The `contact` flag arms the CALL button.** `contact: true` → live. Otherwise the button
  is disabled, greyed and relabelled "NO NUMBER ON FILE" — **never removed**, so the layout
  never shifts. `isPlaceholderPhone()` stays as a backstop so a mis-flagged record can never
  dial a seed number.
- **Never fabricate opening hours for a real business.** `hours: null` is the honest answer
  and the app renders it as "unknown" (yellow). Do not fill in plausible hours for the
  verified listings.
- Mix: mechanic 136, air 50, structural 37, control 36, parking 29, tow 29.
- Sorted **callable first** (`sortRank()`: callable 0, open 1, unknown 2, shut 3). Seed hours
  are generated and almost always evaluate to "open", so without this the actionable records
  sink to the bottom of the list.

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
