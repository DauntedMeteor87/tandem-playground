# tandemclub — wireframe prototype 0.3

A clickable, **greyscale**, **fully responsive** demo of the app. This is the
**0.3** pass: it takes 0.2 and folds in the next round of founder commentary —
a reworked Home header, a "See more" tier of full list/feed pages, a redesigned
streak + patch key on Profile, and a few Communities/Plan fixes.

Greyscale is still a deliberate rule — we're testing **flow and layout**, not
color.

## How to open it

**Easiest:** double-click `index.html`. No setup.

**Or run the little server** (nicer on a phone):
```
node "Prototypes/Wireframe 0.3/server.js"
```
Then open <http://localhost:4601>. (0.1 stays on 4599, 0.2 on 4600, so you can compare.)

## What changed from 0.2 (by section)

- **Home header** — profile (circular avatar) → notifications bell → **"tandem"**
  wordmark (the All/Activities/Adventures filter pills are gone from here) →
  search bar → **paper airplane** (messaging) at the far right.
- **Quick tiles** — trimmed to a clean **2-wide × 3-down** grid of your most
  recent taps (a crew, two trips, two clubs, another crew).
- **Four Home shelves, same card style, each with a "See more"** into its own
  full page:
  - **Adventures for you** → *Adventures list* — 2-wide grid, scrolls forever;
    the **Activities/Adventures filter pill moved here** from the header.
  - **Debriefs** (renamed from "past trips") → *Debriefs feed* — 1-wide,
    Instagram-style: photo, caption, who posted, which crew.
  - **Club bulletin** → 2-wide grid of club articles + recruiting posts.
  - **Friends bulletin** → 2-wide grid of ordinary posts from people you follow.
- **Adventure streak** (My Trips + Profile, shared component) — redesigned:
  title **"Adventure streak"**, big **"N weeks"**, a one-line tagline, and a
  hand-drawn **greyscale orangutan mascot** that evolves with the streak
  (sitting with rocks → walking → jumping → sitting playing guitar at 3
  weeks). Dropped the old flame icon and the "this season / keep it up" block.
- **Profile — Patch key** (renamed from "Patches") — patches are now generated
  from your actual clubs, hearted crews, and completed trips, and **scattered
  as a true absolute-position overlay** across the profile's blank space
  (small round pins, slightly rotated, like stickers). Tap one to see how you
  earned it.
- **Communities** — tapping a crew you're in now opens its **group chat
  directly** (was routing to the generic Messages tab).
- **Club page** — added a 5th **Messages** tab (members only) with its own
  chat. The top tabs no longer horizontally scroll — they're **equal-width and
  fit the screen**, whether there are 3 tabs (non-member) or 5 (member).
- **Plan → Activity → publish** — the "which club?" step is now interactive;
  publishing lands you **inside that club's Messages tab** with a clickable
  trip tile pinned at the top ("Just published — tap to view").

## Rules it still follows

- **Greyscale only** — no color, on purpose.
- Two member-facing join states: *Join now* and *Enter for a spot*.
- Apple Pay is the default money rail; Venmo/PayPal shown as fallback.
- No trust score — proof is patches + trips completed + certs.
- iPhone is primary; "plan on desktop" flows switch to a wide desktop window.

## Files

- `index.html` — the shell
- `app.css` — the greyscale design system + responsive device frame
- `app.js` — state, router, navigation, the swipe engine, shared components,
  the orangutan mascot SVGs
- `screens.js` — every screen + interactions
- `server.js` — optional tiny static server (no dependencies), port 4601
