# tandemclub — wireframe prototype 0.4

A clickable, **greyscale**, **fully responsive** demo of the app. This is the
**0.4** pass: it takes 0.3 and folds in the next round of founder commentary —
a reworked onboarding, a "Sign ups / Archives" Home, a brand-new **Activity**
screen, and the full **Plan → Activity → publish → crew chat** flow (budget
splitter, carpool, visibility dropdowns, and a trip that lands in the crew chat
as a card you have to answer).

Greyscale is still a deliberate rule — we're testing **flow and layout**, not
color.

## How to open it

**Easiest:** double-click `index.html`. No setup.

**Or run the little server** (nicer on a phone):
```
node "Prototypes/Wireframe 0.4/server.js"
```
Then open <http://localhost:4602>. (0.1 stays on 4599, 0.2 on 4600, 0.3 on 4601, so you can compare.)

## What changed from 0.3 (by section)

### Onboarding
- **Name screen** — the profile picture is **gone from here**; it's just
  "What should we call you?" + your first name.
- **Experience** (was "How much have you done?") — retitled
  **"Tell us about your experience."** A fixed set of activities you rate by
  **how many times you've been** (0 → 5+): Surfing, Day hikes, Crafts, Biking,
  **Thrifting**, Camping, Backpacking, Mountaineering. All good to leave at zero
  and skip.
- **Photos** — now **unskippable**. One box holds a **circular profile pic** at
  the top and one **portrait main photo** below (plus two optional extras).
  You need the profile pic + main photo to continue; copy reminds you that you
  can build out your profile later.
- **Bio** — a short **caption-style bio (250 characters)**, and one optional
  **prompt** ("My ideal Saturday is…") that, when tapped, opens its **own
  250-character answer box** below.

### Home
- **"Adventures for you" → "Sign ups for you."** Same swipeable shelf +
  "See more sign ups" page with the Activities/Adventures filter. **Adventures**
  open the full trip page; **Activities** now drop you straight toward the crew
  chat.
- **New Activity screen** — for a day thing (e.g. Bishop Peak Sunset Hike):
  a **big, obvious date/time**, a **note from the lead** ("be at the lot by 5:15
  or I'm leaving without you 😅"), the itinerary, and a **direct button into the
  crew chat** it lives in.
- **"Debriefs" → "Archives."** Now a **Pinterest-style masonry board** (two
  columns of varied-height tiles) with an **Activities/Adventures** filter on
  top. Tap a tile → an **archive detail**: who went, and buttons to **message
  the poster for insight / reach out for details** (no "clone").

### Plan → Activity
The whole flow was rebuilt. New step order:

1. **Name your trip**
2. **When is it?** — a date **plus a note on the timing** ("out the door by 7 AM")
3. **Itinerary**
4. **Describe it**
5. **General location**
6. **Money & rides** — two independent toggle shelves:
   - **Split a budget** — bump **gas / permits / food** and set the headcount.
     If it works out to **under $5/person** it tells you to just have them
     *"buy you a coffee"*; **$5+** shows an **estimated reimbursement per person**.
   - **Ride share** — build **your car** with seats (others claim seats or add
     their own car after publish).
7. **Add photos** — at least **one is required** to continue.
8. **Who can see it?** (the publish screen) — **three dropdowns**, each
   **highlights black** when chosen: **Post to a crew** (lists your crews),
   **Draft a crew for this** (add friends), **Public**. Plus a **Repeat weekly**
   toggle. The button reads **"Publish trip."**

**After publishing**, you're dropped **into that crew's chat** (e.g. Moonlight
Crew). The trip lands as a **card in the top third of the screen** with a
**✓ / ✕** — you have to answer it before it clears. Once you do, it collapses to
a slim **pinned trip tile** at the top of the chat.

### Plan → Adventure
Adventures are **not** planned on the phone anymore. Picking "Adventure" no longer
opens a desktop mockup — it's a tiny **hand-off screen**: an **AirDrop to your
Mac** tile (sends `tandemlife.studio`) and, below it, the written-out link with
a **Copy** button. You finish planning the adventure on your computer.

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
  the orangutan mascot SVGs, demo data (trips, crews, archives)
- `screens.js` — every screen + interactions (onboarding, Home, Activity,
  Archives, the Plan → publish flow, messaging)
- `server.js` — optional tiny static server (no dependencies), port 4602
