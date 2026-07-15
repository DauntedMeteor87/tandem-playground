# tandemclub — Design System

> *What a beautiful way to remember a moment.*

A design system for **tandemclub** — a free outdoor-club app for college students
(18–22) plus a web portal for trip planning. Outdoor clubs publish trips; students
find their people and turn one excursion into real friendship.

This system encodes the brand's **warm Impressionist** soul (Monet, broken
brushwork, sunlit color) on top of the structure proven in the greyscale flow
wireframes.

---

## Sources

Built from the attached codebase `tandemclub/` (read-only). Key references:

- `tandemclub/CLAUDE.md`, `apps/CLAUDE.md`, `apps/web/CLAUDE.md` — product + stack.
- `Guidlines/docs/mission.md`, `summary.md` — why it exists, who it's for.
- `Guidlines/docs/brand/design-language.md` — the Impressionist visual soul.
- `apps/mobile/Prototypes/Wireframe 0.4/` — the mobile flow wireframe (app.css,
  app.js, screens.js). The **structural** source of truth (spacing, radii,
  shadows, component inventory, copy).
- `apps/web/Prototypes-web/Wireframe 0.2/` — the desktop planner wizard wireframe.

> The product's name is **tandemclub** (one word). Earlier research used the
> codenames *Kindred* and *Ozola* — do not use them in new work.

---

## The greyscale → color decision

The provided wireframes are **deliberately greyscale** — the founder froze color
to test flow and layout only. The brand itself calls for warm Impressionist
color. **This design system encodes the warm brand**, preserving the wireframes'
exact structure (4pt spacing, radii, shadows, layouts, copy) and adding color,
type, and painterly imagery on top. Four palette *moods* ship so the direction
can be felt and chosen (see below) — **Golden Hour** is the default.

---

## Content fundamentals

How tandemclub writes. Every user-facing word is for an 18–22-year-old — often a
freshman who doesn't know anyone yet.

- **Voice:** warm, plain, human — *never* corporate. Talk like a friend who's
  been there, not a brand.
- **Person:** second person ("find your people", "you're in"). First-person only
  for the member's own voice (a lead's note: *"be at the lot by 5:15 or I'm
  leaving without you 😅"*).
- **Casing:** sentence case everywhere — buttons, headings, titles. No Title Case
  UI, no ALL-CAPS except tiny eyebrow labels (e.g. `TRIP LEAD`, `WEEKS OUTSIDE`).
- **Tone examples (from the wireframes):**
  - Empty/first-timer: *"Great first trip if you don't know anyone yet — we go
    slow and grab tacos after."*
  - CTA pair: **Join now** / **Enter for a spot** (never "RSVP"/"Register").
  - Budget under $5: *"just have them buy you a coffee."*
  - Reassurance: *"you can build out your profile later."*
- **Emoji:** sparingly, and only in *member-authored* voice (a lead's note, a chat
  message) — never in system chrome, labels, or buttons.
- **Length:** short. Bios cap at 250 characters. Say the human thing, then stop.
- **Vibe:** belonging, warmth, a little nostalgia. The opposite of doomscroll-gray.

---

## Visual foundations

- **North star:** Impressionism — Monet, broken brushwork, light that feels
  alive. Color and atmosphere over hard edges. Warm, hopeful, optimistic; never
  cold, clinical, or corporate-tech.
- **Color:** sunlit and earthy. A **warm-tinted neutral ramp** (never pure grey)
  carries the UI; brand hue is **sunset coral** (`--action`) with a **dusk
  violet** accent, meadow-green success, sky-blue info. Four palette moods:
  Golden Hour (default), Alpine Morning, Monet Garden, Trailhead — switch with
  `data-palette="…"` on any ancestor.
- **Type:** **Newsreader** (warm literary serif) for display / "memory" moments
  and pull-quotes — its italics carry the nostalgia. **Hanken Grotesk** (friendly
  humanist sans) for all UI, tuned to stay legible at the wireframes' small,
  dense sizes. **Space Mono** for the occasional timestamp / coordinate.
  *(Substitution — see Caveats.)*
- **Spacing:** 4pt scale (`--s1`…`--s8` = 4→40), taken verbatim from the
  wireframe. Dense and small-first.
- **Corner radii:** 8 / 12 / 18 / 24 / pill. Cards are generously rounded (18px),
  chips and toggles fully pill.
- **Cards:** white (`--surface-card`) on a warm-cream app background, a single
  hairline border (`--border`), and a **soft warm-tinted shadow** (shadows use
  brown, not black, so surfaces feel sunlit). `raised` bumps to a larger shadow.
- **Backgrounds:** flat warm surfaces — *no* gradient fills behind content. The
  only gradients are (a) the **painterly photo grade** overlaid on imagery and
  (b) the **bottom protection gradient** on full-bleed hero photos for legible
  overlaid text.
- **Imagery:** painterly and warm. Photos sit under a subtle warm grade
  (`--photo-grade`, multiplied); placeholders are a warm hatched fill. Think
  *remembered moment*, not camera roll. Applied most heavily on the mobile app's
  photo/memory surfaces; the web portal is cleaner but still warm.
- **Animation:** restrained. Short eases (~.15s) on hover/press and toggles; a
  small pop on menus; the mascot bobs. No bounces, no infinite decorative loops.
  Respect `prefers-reduced-motion`.
- **Hover / press:** hover deepens the fill (`--action` → `--action-hover`);
  press nudges down 1px (`translateY(1px)`). Focus shows a soft coral ring.
- **Borders:** 1px hairlines (`--border`); stronger `--border-strong` for inputs
  and dashed dropzones. Selected states swap border to `--action`.
- **Transparency / blur:** used on the tab bar (translucent app bg + backdrop
  blur) and glassy chips over photos — not decoratively elsewhere.

---

## Iconography

- The wireframes use an **inline stroke-icon set** — Feather/Lucide style: 24×24
  viewBox, ~1.7–1.9 stroke, round caps and joins, `currentColor`. Home, trips,
  plan, crews, bell, search, pin, calendar, car, tent, camera, heart, check, etc.
- **Recommendation: standardize on [Lucide](https://lucide.dev)** — it matches
  the existing set almost 1:1. Load from CDN, size 22–24px, inherit `currentColor`.
  *(Substitution flagged — see Caveats.)* The UI kits inline a handful of these
  glyphs directly.
- **Emoji** appear only in member-authored copy (lead notes, chat). Not used as
  UI iconography.
- No icon *font*; SVG only.

## Logo & mascot

- **There is no logo/wordmark in the sources.** The brand is shown as the plain
  wordmark **tandemclub** set in type (display serif in-product, UI sans in
  chrome). No mark has been drawn or invented — render the name in type wherever
  a logo would go.
- **Mascot:** an **orangutan** that levels up through 4 stages (rest → walk →
  jump → chill) as a member builds a streak. Copied from the wireframe and
  re-colored into warm rust. Assets in `assets/mascot/`; also shipped as the
  `Mascot` component.

---

## Components

Reusable primitives (React), grouped by concern. Namespace on the compiled
bundle: `window.TandemclubDesignSystem_d44a9e`.

**Core** (`components/core/`)
- **Button** — primary tappable action (primary / ghost / subtle / accent / apple).
- **Chip** — pill filter/selector.
- **Tag** — small static metadata label.
- **Card** — base warm surface.
- **ListRow** — tappable row inside a Card.
- **Avatar** / **AvatarStack** — profile image / initials; overlapping group.

**Forms** (`components/forms/`)
- **Input** — text field / textarea with label + char count.
- **Segment** — segmented control (2–3 options).
- **Toggle** — on/off switch.
- **Stepper** — +/- counter pill.

**Product** (`components/product/`)
- **TripCard** — the core trip discovery unit.
- **PhotoFrame** — painterly image surface / placeholder.
- **Mascot** — the evolving orangutan.
- **StreakBar** — "weeks outside" streak row (uses Mascot).
- **Sheet** — bottom sheet / action drawer.

---

## UI kits

- `ui_kits/mobile/` — the member phone app: Home (streak + sign-ups) → Trip
  detail → RSVP, with a bottom tab bar. *(Interactive.)*
- `ui_kits/web/` — the leader web portal: the Plan-a-trip wizard (name →
  schedule → itinerary → money & rides → publish). *(Interactive.)*

---

## Index / manifest (root)

- `styles.css` — the one entry point consumers link (only `@import`s).
- `tokens/` — `fonts.css`, `colors.css` (+ 3 palette moods), `typography.css`,
  `spacing.css`, `shadows.css`, `base.css`.
- `components/` — `core/`, `forms/`, `product/` (each: `.jsx` + `.d.ts` +
  `.prompt.md` + a `@dsCard` HTML).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand),
  including the four-mood palette exploration.
- `ui_kits/` — `mobile/`, `web/`.
- `assets/mascot/` — the 4 orangutan stage SVGs.
- `SKILL.md` — Agent-Skills-compatible entry point.

---

## Caveats & open questions (please help me iterate!)

1. **Palette not yet locked.** You asked to explore wide — four moods ship
   (Golden Hour is default). **Which mood is "tandemclub"?** See the *Get a feel*
   card. I can refine the winner and drop the rest.
2. **Fonts are a substitution.** The wireframes used the system stack only;
   Newsreader + Hanken Grotesk are my brand proposal. If you have licensed brand
   fonts, share them and I'll swap them in.
3. **Icons are a substitution** — standardized on Lucide as the closest match to
   the wireframe's inline set. Say the word if you'd rather use another set.
4. **No logo** exists in the sources, so none was made. If/when you have a mark,
   I'll wire it into the wordmark slots.
5. **UI kit coverage is a first pass** (Home + Trip; the planner wizard). Onboarding,
   Archives (masonry), Activity, and the crew-chat flow are specced and ready to
   build next.
