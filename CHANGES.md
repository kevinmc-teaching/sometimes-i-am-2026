# Changes (performance, organization, accessibility)

Goal: improve performance/code quality/accessibility **without changing the site’s visual design**.

## Performance
- **Button rendering now uses a DocumentFragment** to avoid repeated reflow during initial button creation (`js-new/buttons.js`).
- **Sound loading bug fix + small performance win:** `loadSounds()` now loads the *final* audio element too (loop was stopping one early) and `playSound()` no longer duplicates entries in `activeSounds`, reducing unnecessary volume recalcs (`js-new/sounds.js`).
- **Slider updates are now live** (range inputs update on `input` as well as `change`) so the UI responds immediately without extra clicks (`js-new/config.js`).

## Code organization / correctness
- **Button click/hover now updates state first**, so text + sound are always in sync with the button you actually interacted with (`js-new/buttons.js`).
- `updateMainText()` now accepts an optional `btnId` argument and includes defensive guards for missing data (`js-new/text-updates.js`).
- Removed unused DOM queries inside the hot-path button handler (`js-new/buttons.js`).

## Accessibility
- Added ARIA wiring so the preferences button + panel communicate state:
  - Preferences button: `aria-controls`, `aria-expanded`
  - Preferences panel: `aria-hidden`
  (`index.html`, `js-new/config.js`)
- Made message outputs a polite live region so assistive tech can announce updates (`index.html`).
- Added **keyboard focus-visible outlines** and **reduced-motion support** (only affects keyboard users / reduced-motion users; does not change the default look) (`styles-updated.css`).

## Bugs fixed
- `playSound()` was using `activeSounds[sound]` (incorrect) instead of `activeSounds.indexOf(sound)`, causing duplicates and incorrect volume management (`js-new/sounds.js`).
- `loadSounds()` was skipping the last sound due to an off-by-one loop (`js-new/sounds.js`).
- Main text updates were happening **before** the current button was stored in state, so the displayed text could lag behind the hovered/clicked button (`js-new/buttons.js`).
- `updateMainText()` was accidentally applying the synonym font-size to the message element twice (synonym wasn’t getting its random size) (`js-new/text-updates.js`).

## Files changed
- `index.html`
- `styles-updated.css`
- `js-new/buttons.js`
- `js-new/config.js`
- `js-new/sounds.js`
- `js-new/text-updates.js`
- `CHANGES.md` (this file)

