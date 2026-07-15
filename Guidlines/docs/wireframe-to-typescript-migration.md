# Wireframe → TypeScript migration spec (mobile + web)

Status: **planning spec — no code yet.** This document defines how the
**Wireframe 0.4** greyscale prototype becomes real `apps/mobile/` React Native
+ TypeScript screens, with the locked brand palette applied on top, and how the
**web Wireframe 0.2 "Studio"** prototype becomes a plain React (`apps/web/`,
Next.js) build-out. Layout,
spacing, and button/navigation flow must stay exactly as built in the
wireframe — only visual skin changes.

---

## 1. Source-of-truth hierarchy

Four documents feed this migration, and they don't all outrank each other the
same way. When two sources disagree, follow this order:

1. **Layout, structure, flow, copy** → `apps/mobile/Prototypes/Wireframe 0.4/`
   (`index.html`, `app.css`, `app.js`, `screens.js`). This is the **only**
   source for screen order, button placement, navigation, and wording. Nothing
   in this migration should change what the wireframe already decided about
   flow.
2. **Color and type** → `Guidlines/brand-system.md` + `Guidlines/brand-tokens.css`
   (v1.0, locked). This supersedes the older four-mood exploration shipped in
   `Guidlines/tandemclub Design System.zip` — that zip's `tokens/colors.css`
   (Golden Hour / sunset-coral / Newsreader) is an earlier, unlocked draft.
   Do not use its colors or fonts.
3. **Component inventory & structural patterns** → the same zip's
   `components/` (Button, Card, TripCard, PhotoFrame, Mascot, etc.), `tokens/spacing.css`,
   `tokens/shadows.css`, and `ui_kits/mobile/`. Use these for what
   components should exist and how they're composed — but restyle every
   color/font reference to match #2.
4. **Everything else visual** → `Guidlines/docs/brand/design-language.md`
   (Impressionist prose guidance) for anything the above three don't cover.

Architecture and language choices come from
`Guidlines/docs/strategy/kindred-architecture-memo.html`: TypeScript
everywhere, **React Native + Expo** for mobile (this is what "iOS native" means
in this stack — not Swift/SwiftUI), Expo Router for navigation. This matches
`apps/mobile/CLAUDE.md`.

The existing `Guidlines/docs/figma-workflow.md` convention (one screen/frame =
one component, `apps/mobile/components/<Name>/<Name>.tsx`, Code Connect
mapping) applies here too, even though the wireframe isn't a Figma file —
treat each wireframe screen as if it were a Figma frame for file-organization
purposes.

---

## 2. Locked design tokens (from `brand-tokens.css`)

| Token | Hex | Role |
|---|---|---|
| Pine `--tc-pine` | `#05332B` | Primary dark — **all body copy & headings**, deep surfaces |
| Teal `--tc-teal` | `#1B564B` | Secondary dark — links, info |
| Ember `--tc-ember` | `#F24E00` | Primary accent — CTAs, mascot, **one highlight per view**, never body text |
| Amber `--tc-amber` | `#F2B23C` | Sunlit highlights, warning |
| Leaf `--tc-leaf` | `#8BC97F` | Nature, success, growth |
| Canvas `--tc-canvas` | `#F0EFEE` | App/page background |
| Paper `--tc-paper` | `#FFFFFF` | Cards, raised surfaces |
| Muted `--tc-muted` | `#5E6F68` | Secondary text |

Status colors stay in-family (success = leaf on `#EAF3E4`, warning = amber on
`#FDF3E1`, error = `#C7361B` on `#FBEAE2`, info = teal on `#E9F1EF`). Radii:
12 / 16 / 18 / pill. Shadow: soft warm-brown, never black
(`0 18px 40px -30px rgba(5,51,43,0.55)`).

Type: **Spectral** (serif, display/headings) + **Hanken Grotesk** (sans,
UI/body). This replaces the zip's Newsreader/Hanken Grotesk pairing — keep
Hanken Grotesk, swap Newsreader → Spectral.

**To do before build:** create `packages/config` (or `apps/mobile/theme/tokens.ts`)
exporting these as a typed RN theme object — a direct TS port of
`brand-tokens.css`, not a CSS import (React Native has no CSS custom
properties). Component code should reference `theme.color.pine`, never a
hardcoded hex, per `figma-workflow.md`'s "use design tokens, not hardcoded
colors" rule.

**Open caveat carried over from the design system's readme:** icon set is a
substitution (Lucide recommended, ~1:1 match to the wireframe's inline stroke
icons) and there's no logo/wordmark — render "tandemclub" in Spectral/Hanken
Grotesk type wherever a mark would go. Flag both in code review; not blocking.

---

## 3. Screen inventory (Wireframe 0.4, in flow order)

Each row becomes one or more components under `apps/mobile/components/`,
composed into an Expo Router route under `apps/mobile/app/`.

### Onboarding (`OB_STEPS`, 8 steps, linear, skippable except where noted)

| # | Step id | What it does | Notes |
|---|---|---|---|
| 1 | `ob-name` | "What should we call you?" + first name | No profile photo here (removed in 0.4) |
| 2 | `ob-year` | School year | |
| 3 | `ob-basics` | Basic profile fields | |
| 4 | `ob-about` | About / freeform | |
| 5 | `ob-experience` | "Tell us about your experience" — rate 8 fixed activities (Surfing, Day hikes, Crafts, Biking, Thrifting, Camping, Backpacking, Mountaineering) 0→5+ | All good to leave at zero and skip |
| 6 | `ob-photos` | Circular profile pic + portrait main photo (required) + 2 optional extras | **Unskippable** — needs profile pic + main photo to continue |
| 7 | `ob-bio` | 250-char caption bio + optional prompt ("My ideal Saturday is…") → its own 250-char answer box | |
| 8 | `ob-verify` | Verify school email | Has a **Skip for now** path into read-only mode with a verify banner |

Shared shell: progress bar (`obProgress`) + back button + skip button (unless
`forced`) + question + optional hint + optional inspo image + CTA button. Build
this once as `OnboardingShell` and compose each step's body inside it —
matches the wireframe's `obShell()` helper 1:1.

### Home

- **Streak bar** — "weeks outside" streak row, uses the Mascot (4 stages:
  rest → walk → jump → chill). Maps directly to the design system's
  `StreakBar` + `Mascot` components.
- **"Sign ups for you"** — swipeable shelf (was "Adventures for you"), maps to
  `TripCard` in horizontal-scroll mode. "See more sign ups" opens a full page
  with an Activities/Adventures filter (`Segment` component).
  - Tapping an **Adventure** card → full trip detail page.
  - Tapping an **Activity** card → routes straight toward crew chat (skips
    trip detail).
- **This-week grid** — 2-up grid, `TripCard` in `grid` mode.

### Activity screen (new in 0.4)

For a single-day activity (e.g. "Bishop Peak Sunset Hike"): big date/time,
a note-from-the-lead block (member-authored voice, emoji allowed here only),
itinerary, and a direct button into that activity's crew chat.

### Archives (was "Debriefs")

Pinterest-style masonry board, two columns, varied-height tiles, with an
Activities/Adventures filter on top (`Segment`). Tap a tile → archive detail:
who went (`AvatarStack`), plus buttons to message the poster for insight or
reach out for details. No "clone" action.

### Plan → Activity (`ACT_STEPS`, 8 steps, linear)

Shared shell pattern (progress + back + question + hint + field), same
`OnboardingShell`-style component reused for this wizard:

1. Name your trip — single text input
2. When is it? — date picker + timing note input
3. Itinerary — multiline textarea
4. Describe it — multiline textarea
5. General location — text input (place name, not address)
6. Money & rides — two independent toggle shelves:
   - **Split a budget** — stepper inputs for gas/permits/food + headcount;
     under $5/person → copy nudges "buy you a coffee"; $5+ → shows estimated
     reimbursement per person.
   - **Ride share** — build your car with seats; others claim seats or add
     their own car after publish.
7. Add photos — at least one required to continue
8. Who can see it? (publish screen) — three dropdown-style options, each
   highlights black/selected when chosen: **Post to a crew** (lists your
   crews), **Draft a crew for this** (add friends), **Public**. Plus a
   **Repeat weekly** toggle. Button reads **"Publish trip."**

**After publish:** user lands inside that crew's chat. The trip appears as a
card in the top third of the screen with **✓ / ✕** — must be answered before
it clears — then collapses into a slim pinned trip tile at the top of the
chat. This pinned-tile behavior is a distinct interaction state worth its own
component (`PinnedTripCard`, collapsed vs. expanded).

### Plan → Adventure (hand-off, not planned on phone)

Tiny hand-off screen: an "AirDrop to your Mac" tile (sends `tandemlife.studio`)
+ the written-out link with a Copy button. No desktop mockup on mobile — this
screen is intentionally minimal; don't over-build it.

### Rules that apply across every screen above

- Two member-facing join states only: **Join now** / **Enter for a spot**
  (never "RSVP"/"Register").
- Apple Pay is the default money rail; Venmo/PayPal are fallback, shown
  secondary.
- No trust score anywhere — proof is patches + trips completed + certs.
- iPhone is the primary target; "plan on desktop" flows are hand-offs, not
  responsive desktop layouts inside the RN app.

---

## 4. Component → file mapping

Following `figma-workflow.md`'s convention
(`apps/mobile/components/<Name>/<Name>.tsx`, one unit = one component, plain-English
names, short comment noting its wireframe source):

| Component | Source | Notes |
|---|---|---|
| `Button` | design-system zip `components/core/Button.jsx` | Variants: primary / ghost / subtle / accent / apple. Restyle to locked tokens. |
| `Chip` | zip `core/Chip.jsx` | Pill filter/selector |
| `Tag` | zip `core/Tag.jsx` | Static metadata label (kind/cost tags on TripCard) |
| `Card` | zip `core/Card.jsx` | Base warm surface |
| `ListRow` | zip `core/ListRow.jsx` | Tappable row inside a Card |
| `Avatar` / `AvatarStack` | zip `core/Avatar.jsx` | Profile image/initials; overlapping group (who's-going) |
| `Input` | zip `forms/Input.jsx` | Text field/textarea + label + char count (bio, activity fields) |
| `Segment` | zip `forms/Segment.jsx` | 2–3 option segmented control (Activities/Adventures filters) |
| `Toggle` | zip `forms/Toggle.jsx` | On/off (repeat weekly, ride share on/off) |
| `Stepper` | zip `forms/Stepper.jsx` | +/- counter pill (budget split, experience rating) |
| `TripCard` | zip `product/TripCard.jsx` | Core discovery unit — shelf + grid modes |
| `PhotoFrame` | zip `product/PhotoFrame.jsx` | Painterly image surface/placeholder |
| `Mascot` | zip `product/Mascot.jsx` + `assets/mascot/*.svg` | 4 stages: rest/walk/jump/chill |
| `StreakBar` | zip `product/StreakBar.jsx` | Uses Mascot |
| `Sheet` | zip `product/Sheet.jsx` | Bottom sheet / action drawer |
| `OnboardingShell` | new — from wireframe `obShell()` | Progress bar + back/skip + question + hint + body + CTA |
| `PlanWizardShell` | new — from wireframe `ACT_STEPS` shell | Same shape as OnboardingShell; consider sharing one `StepShell` component |
| `ArchiveMasonry` | new — from wireframe archives screen | Two-column variable-height tile layout |
| `PinnedTripCard` | new — from wireframe post-publish crew chat state | Collapsed/expanded pinned trip tile with ✓/✕ |
| `BudgetSplitter` | new — from wireframe `planBudget()` | Gas/permits/food steppers + headcount + per-person copy logic |
| `RideShareBuilder` | new — from wireframe `hubRides()` | Seats, claim/add-car |
| `AirdropHandoff` | new — from wireframe `openAirdrop()` | AirDrop tile + copyable link, Plan→Adventure screen |

Each file gets a one-line comment: `// Source: Wireframe 0.4 — <screen/section name>`.

---

## 5. Navigation (Expo Router)

Propose one route group per flow, file-based, matching Expo Router
conventions already declared in `apps/mobile/CLAUDE.md`:

```
apps/mobile/app/
  (onboarding)/name.tsx, year.tsx, basics.tsx, about.tsx, experience.tsx,
               photos.tsx, bio.tsx, verify.tsx
  (tabs)/home.tsx, my-trips.tsx, plan.tsx, crews.tsx
  activity/[id].tsx
  archives/index.tsx, archives/[id].tsx
  plan-activity/[step].tsx   // or 8 discrete files mirroring ACT_STEPS
  plan-adventure/handoff.tsx
  crew/[id]/chat.tsx
```

Route names and step order must match the wireframe exactly — this is a
direct port of `OB_STEPS` / `ACT_STEPS`, not a redesign.

---

## 6. Code Connect

Per `figma-workflow.md`, add a Code Connect mapping note for each screen
component once built, even though the immediate source is the HTML wireframe
rather than a Figma frame:

- If/when these screens are also modeled in the **Tandemclub1.0** Figma file,
  cross-check the built component against that frame and add the
  `add_code_connect_map` link.
- Until then, leave a placeholder comment (`// TODO: Code Connect map once
  Figma frame exists`) so it's easy to wire up later — don't block the build
  on Figma parity.

---

## 7. Build order

This spec covers UI-layer scaffolding only. It does not change the root
`CLAUDE.md` vertical-slice order (**Auth → profiles → communities → posts →
events → messaging → media → maps → activity tracking**). Build screens in
that order as their underlying features come online — don't build the whole
UI shell ahead of working data.

---

## 8. Open questions / caveats to confirm before implementation

1. Icon set: standardize on Lucide (closest match to wireframe's inline
   stroke icons) unless you'd rather use something else.
2. No logo exists — wordmark is set in type (Spectral/Hanken Grotesk)
   everywhere a mark would go.
3. `OnboardingShell` and `PlanWizardShell` look identical in structure — worth
   building as one shared `StepShell` component instead of two, to avoid
   duplicate code the "boring and strongly typed" rule would flag.
4. Mascot SVGs in the zip are colored for the old Golden Hour palette —
   re-tint to Ember/Pine before use.

---

## 9. Web Wireframe 0.2 ("Studio") → plain React

This section covers `apps/web/Prototypes-web/Wireframe 0.2/` — the desktop
**trip-lead planning portal** (distinct from the mobile wireframes above).
Note: this folder's content changed mid-project — an earlier pass in the same
path contained a phone-shaped "Spotify-style" mobile demo; that has been
superseded by the current **Studio** app described below (`index.html` now
loads `app.js` + `screens.js` + `studio.js` together, titled "web wireframe 0.2
(Studio)"). Treat Studio as the only source of truth for this folder going
forward.

### 9.1 What Studio is

A sidebar-shell desktop app for the ~10% of users who lead trips, matching
`apps/web/CLAUDE.md`'s framing exactly: "leaders plan trips" here, while the
mobile app is where the other 90% show up. Greyscale, on purpose — same rule
as the mobile wireframes: testing flow and structure, not final visual style.

Persistent left sidebar (`studioSidebar()`), six destinations:

| Nav id | Label | Notes |
|---|---|---|
| `home` | Home | Dashboard: live trips, upcoming count, total signups, pending club requests |
| `create` | Create an Adventure | The main wizard (see 9.2) |
| `manage` | Manage Adventures | List/edit previously published adventures |
| `clone` | Clone an Adventure | Browse past trips, start a new draft prefilled from one |
| `createClub` | Create a Club | A second wizard (see 9.3) |
| `manageClub` | Manage a Club | **Admin-only** (`isClubAdmin()` gate) — roster, requests, dues, settings |

### 9.2 Create-an-Adventure wizard (`STEPS`)

Nine steps, same shell pattern as the mobile onboarding/plan wizards (a
progress rail + step body + continue): **basics → write-up → itinerary →
permits → budget → gear → rides → photos → preview**. Three entry points feed
the same wizard state (`ADV`): a fresh draft (Create), editing a published
trip (`S.editingId` set), or a clone (`S.cloneSource` set, prefilled from a
past trip).

Notable step content already fully specced in `app.js`/`screens.js`, useful
for component planning:

- **Permits** — a guided, source-specific builder (`PERMIT_SOURCES`:
  Recreation.gov, state park, national-forest self-issue, or other), each
  with its own numbered instruction list.
- **Budget** — itemized sliders (distance/gas, campsite, permits, misc) plus
  an optional food line (estimate vs. itemized) and optional trip insurance —
  richer than the mobile Activity wizard's single free-text budget field.
- **Gear** — starts from a template (`GEAR_TEMPLATES`: backpacking, car
  camping, winter, custom), each item required/optional, fully editable.
- **Rides & tent** — car/tent slot counts the lead is offering.
- **Preview** — an embedded phone-frame preview showing exactly what a member
  sees in the mobile trip hub (Overview / Details / Rides & tent tabs), then
  a publish step to pick the club/crew.

### 9.3 Create-a-Club wizard (`CLUB_STEPS`)

Six steps: **basics → about the club → membership → officers → photo →
preview & create**. Backed by a `freshClub()` draft object and a fixed
`CLUB_CATEGORIES` list (Outdoors, Water, Climbing, Cycling, Snow, Social,
Other).

### 9.4 Manage a Club (admin-only)

Gated by `isClubAdmin()` / `adminClubs()`. Seeded demo data (`CLUBS` in
`app.js`) already includes an admin club (Field Studies) with a member roster,
role labels (`MEMBER_ROLES`: Member, Trip lead, Treasurer, Admin), pending
join requests, and dues settings — this is the richest data model in the
whole Studio prototype and should get its own component group (member row,
request row, role picker, dues toggle).

### 9.5 Plain React port plan

Same conventions as the mobile section (§1–§7), adapted for web:

- **Framework:** `apps/web` is Next.js (React) per the root `CLAUDE.md` /
  architecture memo — build Studio as real Next.js pages/components, not a
  standalone app, so it lands directly in the product's web portal.
- **Reuse `app.css` structure, not literal file:** unlike the mobile section,
  don't just re-skin Golden Hour greyscale tokens onto this CSS as-is —
  restyle to the locked `brand-tokens.css` palette (Pine/Ember/Teal/Amber/
  Leaf/Spectral+Hanken Grotesk) from day one, same rule as §2 above. The web
  portal should read "cleaner and more utilitarian" per
  `design-language.md`, so lean less on painterly imagery here than on
  mobile.
- **Component/file mapping**, following `apps/web/CLAUDE.md` conventions:
  - `Sidebar` — the persistent nav rail (`studioSidebar()`)
  - `StudioPage` — the non-wizard page shell (`studioPage()`)
  - `WizardShell` — shared step-shell for both the Adventure and Club
    wizards (progress rail + step body + continue/back) — one component,
    not two, per the dedup note in §8.3 above; the mobile `StepShell`
    suggestion and this one should probably be the *same* shared package
    component if `packages/ui` ends up hosting it.
  - `AdventureWizard` steps: `BasicsStep`, `WriteupStep`, `ItineraryStep`,
    `PermitsStep` (+ `PermitSourcePicker`), `BudgetStep` (+ line-item
    sliders), `GearStep` (+ `GearTemplatePicker`), `RidesStep`, `PhotosStep`,
    `PreviewStep` (+ embedded `PhonePreview` reusing mobile trip-hub
    components where possible — this is the one place web and mobile
    components should visually share code)
  - `ClubWizard` steps: `ClubBasicsStep`, `ClubAboutStep`, `MembershipStep`,
    `OfficersStep`, `ClubPhotoStep`, `ClubPreviewStep`
  - `ManageAdventuresList`, `CloneBrowser`, `ManageClub` (+ `MemberRow`,
    `RequestRow`, `RolePicker`, `DuesSettings`)
- **State:** the prototype's global `S` (view/step/wizard flags) and `ADV`/
  `NC` (draft objects) map to React context + `useReducer`, same pattern as
  the mobile section's `state.tsx` — one `StudioProvider` covering
  navigation, the active wizard draft, and admin-gating (`isClubAdmin`).
- **Data:** `CLUBS`, `CREWS`, `PERMIT_SOURCES`, `GEAR_TEMPLATES`,
  `MEMBER_ROLES` port directly to a `data.ts` module, typed.

### 9.6 Open questions specific to Studio

1. The embedded phone-frame preview in the publish step is the one place
   the web and mobile builds need to visually agree — decide whether it
   imports real mobile components (via a shared package) or is a
   web-only re-creation kept in sync by hand.
2. `isClubAdmin()` currently checks demo data only — real admin-gating needs
   to hook into the actual auth/roles system once that vertical slice
   (per root `CLAUDE.md`'s build order) exists.
3. This spec was written from `app.js` (511 lines) + `screens.js` (569
   lines, Adventure wizard only) + `studio.js` (705 lines) — confirm nothing
   in `screens.js` outside the Adventure wizard was missed before building.
