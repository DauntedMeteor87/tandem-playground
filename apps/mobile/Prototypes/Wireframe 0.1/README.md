# tandemclub — wireframe prototype

A clickable, **greyscale**, **fully responsive** demo of the app that follows the
UX in the Figma **"02 · Flows"** tab. This is the "03 wireframes" stage made real
so you can actually tap through it and test the flows on your phone or laptop.

## How to open it

**Easiest:** double-click `index.html`. It opens in your browser — no setup.

**Or run the little server** (nicer on a phone, gives you a URL):
```
node wireframes-prototype/server.js
```
Then open <http://localhost:4599> (also works from your phone on the same Wi-Fi
using your computer's IP, e.g. `http://192.168.1.20:4599`).

## What to try

Start at the login screen and go:

1. **Continue with Apple** → onboarding (name → year → interests → experience →
   photos → bio → **verify school email**). Try **Skip for now** on the last step
   to see the read-only mode with the verify banner.
2. **Home** — For You shelves (Spotify-style) + the **Watch** reels tab.
3. Tap a trip → **hero → itinerary → sign-up** with who's-going, difficulty, and
   **Join now / Enter for a spot** → Apple Pay → **My Trips → Trip Packet**
   (Chat, Map, Rides, Details).
4. **Communities** → Join → a club → **Become a member** (Apple Pay) → the
   Members-Only tab unlocks.
5. **Plan** → new → **Activity** (plan on phone) or **Adventure** (continue on
   desktop — the window widens).
6. **Messages** (paper-airplane, top-right) — **long-press a chat** for
   Mute / Block / Report.
7. Profile (top-left), Notifications (bell), and a **past trip → shared album →
   friendship prompt** from My Trips.

## Rules it follows

- **Greyscale only** — no color anywhere, on purpose.
- Two member-facing join states only: *Join now* and *Enter for a spot*.
- Apple Pay is the default money rail; Venmo/PayPal shown as fallback.
- No trust score — proof is patches + trips completed + certs.
- iPhone is primary; "plan on desktop" flows switch to a wide desktop window.

## Files

- `index.html` — the shell
- `app.css` — the greyscale design system + responsive device frame
- `app.js` — state, router, navigation, shared components
- `screens.js` — every screen + interactions
- `server.js` — optional tiny static server (no dependencies)
