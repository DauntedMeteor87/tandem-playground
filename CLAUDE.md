# tandemclub

A free outdoor-club app for college students (18–22) plus a web portal for trip
planning. Outdoor clubs publish trips; students find their people and turn one
excursion into real friendships.

**Name rule:** The product is **tandemclub** — one word. Never use "Kindred" or
"Ozola" in code or new docs (those were earlier research codenames; their docs are
kept below as dated records — don't rename or reference them in product work).

---

## Docs — the link key

Everything worth reading lives under `Guidlines/docs/`. Start at the top; go
deeper on demand.

### Start here (read first)

- [mission.md](Guidlines/docs/mission.md) — why tandemclub exists. Read this first.
- [summary.md](Guidlines/docs/summary.md) — what we're building, who it's for, go-to-market, monorepo map.
- [brand/design-language.md](Guidlines/docs/brand/design-language.md) — how it should look and feel (Impressionist, warm).

### App guides (read when working inside an app)

- [apps/mobile/CLAUDE.md](apps/mobile/CLAUDE.md) — the phone app (members find their people).
- [apps/web/CLAUDE.md](apps/web/CLAUDE.md) — the web portal (leaders plan trips).

### Building the app

- [Guidlines/docs/figma-workflow.md](Guidlines/docs/figma-workflow.md) — how a Figma screen becomes a React Native component under `apps/mobile/`, kept two-way with Code Connect. Read before translating any design.

### Brand & UI

- [brand/design-language.md](Guidlines/docs/brand/design-language.md) — the Impressionist visual soul; read before building anything visual.
- [brand/competition-ui-analysis.html](Guidlines/docs/brand/competition-ui-analysis.html) — "The Trailhead Brief": concept & diligence notes with competitor UI teardown.
  - _Note: `Guidlines/docs/strategy/competition-ui-analysis copy.html` is a byte-identical duplicate of this file — ignore it._

### Strategy & market (`Guidlines/docs/strategy/`)

- [kindred-architecture-memo.html](Guidlines/docs/strategy/kindred-architecture-memo.html) — backend/stack architecture decision memo for a solo founder building with Claude Code.
- [kindred_market_breakdown.html](Guidlines/docs/strategy/kindred_market_breakdown.html) — market breakdown & serviceable market (SOM) by segment.
- [Kindred_Competition_Report.docx](<Guidlines/docs/strategy/Kindred_Competition_Report.docx>) — competitive landscape.
- [kindred_business_plan.docx](Guidlines/docs/strategy/kindred_business_plan.docx) — full business plan.
- [Note_To_Self_How_Kindred_Stays_Different.html](Guidlines/docs/strategy/Note_To_Self_How_Kindred_Stays_Different.html) — differentiation / moat notes.
- [cs_jargon_key.html](Guidlines/docs/strategy/cs_jargon_key.html) — CS jargon key in plain English (for the non-coder founder).
- [kindred-brief.html](Guidlines/docs/strategy/kindred-brief.html) — "Why We Need the Outdoors Now More Than Ever" thesis essay.

### Research (`Guidlines/docs/strategy/research/`)

- [kindred App_Ultimate OG_.docx](<Guidlines/docs/strategy/research/kindred App_Ultimate OG_.docx>) — build methodology & feature order.
- [kindred App.pdf](<Guidlines/docs/strategy/research/kindred App.pdf>) — original app concept deck.
- [Kindred - Y Combinator structure_.docx](<Guidlines/docs/strategy/research/Kindred - Y Combinator structure_.docx>) — YC / company-structure notes.
- [Kindred Ccorp Conversation.docx](<Guidlines/docs/strategy/research/Kindred Ccorp Conversation.docx>) — incorporation (C-corp) notes.
- [kindred - Why We Need the Outdoors Now More Than Ever.docx](<Guidlines/docs/strategy/research/kindred - Why We Need the Outdoors Now More Than Ever.docx>) — outdoors thesis essay (same text as `kindred-brief.html`).
- [codingcheatsheet.html](Guidlines/docs/strategy/research/codingcheatsheet.html) — build master cheat sheet.

---

## Repo layout

A TypeScript monorepo.

- `apps/mobile` — the phone app (where members find their people).
- `apps/web` — the web portal (where club leaders plan trips).
- `apps/api` — the REST backend.
- `apps/workers` — background jobs.
- `packages/` — shared code: `types`, `ui`, `api-client`, `config`.

## Stack

- TypeScript everywhere.
- Mobile: React Native + Expo, Expo Router.
- Web: Next.js.
- Data: Supabase (Postgres) + Drizzle ORM.
- API: REST.

## How to build here

- **Vertical slices.** Build one feature at a time, fully working — screens +
  database table + security rules + API + tests — before starting the next.
- **Build order:** Auth → profiles → communities → posts → events → messaging →
  media → maps → activity tracking.
- **Don't touch working code.** Once a slice works, leave it alone. Make precise,
  limited changes and don't edit unrelated files.
- **Boring and strongly typed.** Prefer simple, well-typed code over clever code.

## Writing copy

Every user-facing word — screens, buttons, errors, emails — is for an 18–22 year
old college student, often a freshman who doesn't know anyone yet. Warm and plain,
never corporate.

## For the founder (non-coder)

Keep file and folder names descriptive and plain-English, so it's obvious where
things live without reading the code. Keep names brief.
