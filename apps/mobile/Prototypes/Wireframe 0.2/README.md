# tandemclub — wireframe prototype 0.2

A clickable, **greyscale**, **fully responsive** demo of the app. This is the
**0.2** pass: it takes the 0.1 wireframe and folds in the founder commentary from
the walkthrough transcript (July 2026) plus the new **Trip Hub** swipe design.

Greyscale is still a deliberate rule — we're testing **flow and layout**, not
color. Where the transcript said "make it like Spotify," that means the *layout*
(pill tabs, tile grid, tighter shelves), not the dark theme.

## How to open it

**Easiest:** double-click `index.html`. No setup.

**Or run the little server** (nicer on a phone):
```
node "Prototypes/Wireframe 0.2/server.js"
```
Then open <http://localhost:4600>. (0.1 stays on 4599, so you can compare.)

## What changed from 0.1 (by section)

- **Home** — Spotify layout: profile + **All · Activities · Adventures** pills +
  a **search icon** (Watch tab removed). A 2-wide **quick-tiles grid** sits above
  tighter shelves so there's more to tap and less to scroll past.
- **Trip Hub (new)** — tapping a trip in My Trips opens a **4-way swipe hub**.
  You land on the **trip chat** (center, with an **expand bar**). Swipe/scroll
  **up** for the overview (title → itinerary → cost), **right** for who's going,
  **left** for more details (lead posts), **down** for rides & tent sign-up.
  Arrows on the hub make the directions obvious; keyboard arrows work too.
- **My Trips** — **Upcoming / Past** top nav, a **streak bar** (Strava-style),
  **big tiles** for upcoming trips. Past trips show the **patch you earned** and
  nudge you to **message the people you went with**.
- **Onboarding** — "What are you into?" → **"Tell us about yourself"** (favorite
  outdoor activities, pick up to 5). **Experience sliders are built from those
  picks** (prepopulated at 0, swipe right, skippable) + one freebie. **Profile
  pic** moves onto the name screen; **major + hometown** added; **photos capped
  at 2**; verify is **skippable**. Framed by the 3 goals (Tandem / Leaders /
  Friends).
- **Profile** — trips/crews/clubs stat row **removed**. Patches are now
  **trip-specific** (a patch per completed trip). Added a **Friends list** +
  **find friends**, and a **streak**. Other people's profiles say **Add friend**.
- **Messaging** — **All / Unread / DMs** filter moved **above Recents**; airplane
  replaced by a **compose** button (name → message → send). **Club channels start
  muted** and hidden until you unmute. **Crews** are always visible, capped at 3
  with **See More** (added **Beach Crew**).
- **Notifications** — the bell opens a **dropdown overlay** (~5 unseen) with
  **See all** into the full page.
- **Plan** — the Plan button opens a **bottom sheet** (Activity / Adventure).
  Activity flow adds **Budget** + **Photos**, uses a free-type **general
  location**, drops Difficulty, and demotes "repeat" to a tiny end-toggle.
- **Communities** — club pages use **sticky tabs that scroll to the top**. Trip
  Signups are **big swipeable tiles with ranking**. Added **Create a crew**
  (mobile) and **Create a club** (desktop).

## Rules it still follows

- **Greyscale only** — no color, on purpose.
- Two member-facing join states: *Join now* and *Enter for a spot*.
- Apple Pay is the default money rail; Venmo/PayPal shown as fallback.
- No trust score — proof is patches + trips completed + certs.
- iPhone is primary; "plan on desktop" flows switch to a wide desktop window.

## Files

- `index.html` — the shell
- `app.css` — the greyscale design system + responsive device frame
- `app.js` — state, router, navigation, the swipe engine, shared components
- `screens.js` — every screen + interactions
- `server.js` — optional tiny static server (no dependencies), port 4600
