# Empty states — no dead ends, ever

**The rule:** every list, feed, board, or picker that can be empty gets a
*designed* blank state, and every blank state points somewhere — a single
warm line plus one way out (a CTA into the loop that fills it). A student
should never hit a silent grey wall on day one.

**Why this doc exists:** the wireframes ship pre-seeded (Maya's world), so
most empty moments were never drawn. The web wireframe designed three; those
are canon and are ported verbatim. Everything else here is commissioned new
design (founder, 2026-07-14), built strictly from existing brand pieces.

---

## The two patterns

### Mobile — `EmptyState` component (`apps/mobile/src/components/EmptyState/`)

The mascot moment. The mascot is **Koa** (the orangutan — named on the
pose sheet in `Branding (1).pdf` p.2), and per the founder (2026-07-14) the
pose art sits at the **bottom** of the empty state. Composition, top to
bottom, centered in the content area on canvas:

1. **Voice line** — Spectral italic, pine, one sentence, Koa's warm voice
   (this matches the brand's loading/empty voice rule).
2. **Sub-line** (optional) — Hanken, muted, one short practical sentence.
3. **One CTA** (optional but usual) — existing `Button`; `primary` when it
   starts the product's core loop, `ghost` for secondary ways out.
4. **Koa pose asset** (bottom anchor) — transparent PNG from
   `apps/mobile/assets/mascot/koa/`, cut from the founder's flat-ember pose
   sheet. `EmptyState` takes a `pose` prop.

Pose file → moment map (filenames are the contract; art can be re-cut
without code changes):

| File | Sheet pose | Use for |
|---|---|---|
| `koa-empty-seat.png` | 6 "patting empty seat" | default for anything empty |
| `koa-tea.png` | 5 "chilling at bottom" | past/finished/bottom-of-feed |
| `koa-loading-leaves.png` | 7 "sorting leaves" | loading moments (post-backend) |
| `koa-success-leaf.png` | 8 "placing new leaf" | success confirmations |
| `koa-error-twig.png` | 9 "holding broken twig" | error states |
| `koa-note.png` | 10 "peeking with note" | notifications/nudges |
| `koa-swipe.png` | 4 "pointing to swipe" | tutorial/swipe cues |
| `koa-peek-page.png` | 2 "lifting the page" | onboarding/tutorial moments |
| *(parked)* | 1 wordmark, 3 teaching | old-name wordmark/app screen — do not ship until redrawn |

The four small SVG mascot stages (rest/walk/jump/chill) stay for tiny
inline uses (StreakBar); Koa pose PNGs own the empty states.

Never two CTAs. Never an icon-only shrug. Never the word "empty".

### Web — the wireframe's own `.banner` pattern

The web wireframe already chose its empty-state furniture: the info banner
(`info` icon + one line + inline linklike action). Port it as an
`EmptyBanner` component and use it everywhere web goes blank — utilitarian,
warm, no mascot theatrics on the planning surface. Full-page empties (a
whole tab with nothing) still use the banner inside the page shell, top of
the content column.

---

## Inventory — mobile (Wireframe 0.4 surfaces)

| # | Surface | When it's empty | Mascot | Voice line | Sub-line / CTA | Ships in |
|---|---|---|---|---|---|---|
| 1 | Home · "Sign ups for you" shelf | New campus, nothing published | walk | "Nothing to sign up for yet — trips land here the second a lead posts one." | CTA `ghost`: "Plan something →" (Plan tab) | M3 |
| 2 | Home · this-week grid | Nothing happening this week | rest | "A quiet week outside. They happen." | Sub: "Check the sign-ups shelf or plan your own." | M3 |
| 3 | See-more sign-ups (per filter) | No Activities / no Adventures in filter | rest | "No {activities/adventures} right now." | CTA `ghost`: "Show everything" (clears Segment) | M3 |
| 4 | Archives board | Club has no archives yet | chill | "No trip memories yet — the first one's always the best one." | CTA `primary`: "Plan the first trip" | M3 |
| 5 | Archives (per filter) | Empty per segment | chill | "None in this pile." | CTA `ghost`: "Show everything" | M3 |
| 6 | My Trips · Upcoming | Never joined anything | walk | "You haven't joined a trip yet. Your people are out there." | CTA `primary`: "See sign ups" (Home shelf) | M3/M4 |
| 7 | My Trips · Past | Joined but nothing finished yet | rest | "Nothing in the rearview yet." | Sub: "Your first trip story writes itself soon." | M3/M4 |
| 8 | Crews tab | No crews yet | walk | "No crews yet — join a trip and you'll land in one automatically." | CTA `primary`: "See sign ups" | M4 |
| 9 | Crew chat (brand-new crew) | No messages yet | walk | "Say hi — someone has to go first." | (no CTA; the composer *is* the way out) | M4 |
| 10 | Plan → publish · "Post to a crew" picker | User has zero crews | — (inline, inside the sheet) | Inline line, Hanken muted: "No crews yet — draft one for this trip below, or post it public." | Highlights the other two publish options | M4 |
| 11 | Search (if/when surfaced) | No results | rest | "Nothing matches that — yet." | CTA `ghost`: "Clear search" | with the screen |
| 12 | Notifications (bell) | None yet | rest | "All quiet. We'll nudge you when something moves." | — | with the screen |

Read-only mode (verify skipped) is **not** an empty state — the wireframe
already designed its banner; port as speced in onboarding.

## Inventory — web Studio (Wireframe 0.2 surfaces)

| # | Surface | When it's empty | Treatment | Ships in |
|---|---|---|---|---|
| 1 | Home dashboard | Nothing published yet | **Wireframe verbatim** (studio.js:109): "Nothing published yet — create your first adventure and it'll show up here." | W1 done / verify in W3 gate |
| 2 | Home quick-tile kickers | 0 join requests / 0 live | Kicker copy degrades gracefully: "MANAGE A CLUB" / "MANAGE ADVENTURES" plain (no fake zero-counts) | W3 |
| 3 | Home stat tiles | All zeros, day one | Keep the zeros honest; banner from #1 carries the welcome | W3 |
| 4 | Manage Adventures | None published | **Wireframe verbatim** (studio.js:152): "No published adventures yet. Create one or clone a past trip to get started." — both inline links live | W3 |
| 5 | Clone browser (per filter) | No past trips in filter | **Wireframe verbatim** (studio.js:201): "No past trips in this filter yet." | W3 |
| 6 | Manage a Club — direct visit, not an admin | isClubAdmin() false | EmptyBanner: "Only club officers can manage a club. Lead a trip or two — leadership finds people who show up." + link "Back to Home" | W3 |
| 7 | Manage a Club · Requests tab | No pending requests | EmptyBanner: "No join requests waiting. Share the club page and they'll come." | W3 |
| 8 | Manage a Club · Roster | Solo founder club | EmptyBanner: "Just you so far. Every club starts with one person who plans something." + link to Create an Adventure | W3 |
| 9 | Adventure wizard · Permits "not needed" | Lead says no permit | **Wireframe verbatim** (screens.js:172): "Nothing to fill in here — this will show as 'No permit needed' on the trip page." | W2 |
| 10 | Adventure wizard · Photos step | Zero photos added | Dashed drop tile (wireframe geometry) + line: "Trips with photos fill twice as fast. Add at least one." | W2 |
| 11 | Adventure wizard · Publish picker | Lead belongs to no club/crew | Inline in the publish sheet: "No clubs or crews yet — you can still publish public, or create a club first." (public option stays enabled) | W2 |
| 12 | Club wizard · Preview | Bare-minimum club | Preview renders what exists; missing fields show muted "Add this in step N" hints, never blanks | W3 |

---

## Copy rules for every blank state

Written for an 18–22-year-old, often a freshman who knows nobody: warm,
plain, a little hopeful, zero corporate ("No data available" is banned).
The mascot voice lines are first-person-club, not system messages. Every
state names the way out. Sentence case, one line, no exclamation-mark
pileups.

## Verification rule (review gates)

At every wave gate the orchestrator drives each flow to its empty case
(fresh state, cleared filters, non-admin visit, zero-crew publish) and
screenshots it — populated paths AND blank paths both walk end-to-end.
