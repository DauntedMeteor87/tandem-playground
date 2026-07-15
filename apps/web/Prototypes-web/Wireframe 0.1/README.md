# tandemclub — web wireframe prototype 0.1

A clickable, **greyscale** desktop prototype of the web portal's **Plan an
Adventure** flow — the 10% of users (trip leads) who do the planning, as
opposed to the 90% who just show up on the mobile app. Matches the
conventions of `apps/mobile/Prototypes/Wireframe 0.x`: plain HTML/CSS/JS, no
build, greyscale on purpose (testing flow and content, not final visual
style).

## How to open it

**Easiest:** double-click `index.html`. No setup.

**Or run the little server:**
```
node "Prototypes-web/Wireframe 0.1/server.js"
```
Then open <http://localhost:5501>.

## What this covers

Just the planning side, end to end, as a 9-step wizard:

1. **Basics** — name, dates, general location, capacity, who can see it (club/crew), co-leads.
2. **Write-up** — the sell-the-trip description.
3. **Itinerary** — the actual daily plan (editable rows).
4. **Permits** — a guided builder: pick a permit source (Recreation.gov,
   state park, national forest self-issue, or something else) and get
   step-by-step instructions for that source, informed by how NOLS,
   Outward Bound, and recreation.gov actually walk people through permits.
5. **Budget** — a slider per cost line, live total, matches the mobile
   trip-hub's cost breakdown exactly.
6. **Gear list** — start from a template (backpacking / car camping /
   winter / custom), then edit and mark items required or optional.
7. **Rides & tent** — how many seats/tent spots the lead is offering.
8. **Photos** — placeholder tiles.
9. **Preview & publish** — an embedded phone frame showing exactly what
   members will see in the mobile trip hub (Overview / Details / Rides &
   tent), then a publish step to pick the club or crew it goes live under.

The whole flow is prefilled with **Sykes Hot Springs Overnight** — the same
trip already shown in the mobile prototype's trip-hub (`TRIPS.sykes` in
`Wireframe 0.3/screens.js`) — so the preview step is a faithful match of
what a member already sees on the phone, not a disconnected mockup.

## Deliberately out of scope (for this pass)

- No surrounding site shell (dashboard, club management, roster, other
  nav) — just this one flow, per the "plan an adventure only" scope call.
- The budget step is a best-guess slider design (three adjustable
  per-person line items). Swap in the founder's reference screenshot
  whenever it's ready — `budgetRowHtml()` / `.budget-row` in
  `screens.js` / `app.css` is the one place to change.
- Greyscale only, on purpose — same rule as the mobile wireframes.

## Files

- `index.html` — the shell
- `app.css` — the greyscale design system, desktop wizard layout, embedded
  phone-frame preview styles
- `app.js` — state, step router, render loop, text-field binding
- `screens.js` — every step + the permit/gear template data + actions
- `server.js` — optional tiny static server (no dependencies), port 5500
