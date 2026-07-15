# tandemclub

A free outdoor-club app for college students (18–22) plus a web portal for trip
planning. Outdoor clubs publish trips; students find their people and turn one
excursion into real friendships.

**Name rule:** The product is **tandemclub** — one word. Never use "Kindred" or
"Ozola" in code or new docs (those were earlier research codenames; their docs
were removed from the repo in the 2026-07 cleanup and live with the founder).

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
- [Guidlines/docs/empty-states.md](Guidlines/docs/empty-states.md) — the blank-state playbook: every dead end gets a designed empty state. Read before shipping any screen.
- [Guidlines/docs/backend-hookup-guide.md](Guidlines/docs/backend-hookup-guide.md) — the playbook for wiring the real backend (Supabase + Render); every data touchpoint in the apps is marked `// TODO: backend seam`.
- [BUILD_LOG.md](BUILD_LOG.md) — the dated record of what's been built so far, in plain English.

### Brand & UI

- [brand/design-language.md](Guidlines/docs/brand/design-language.md) — the Impressionist visual soul; read before building anything visual.
- [Guidlines/design-system/](Guidlines/design-system/readme.md) — the full design system: `styles.css` + `tokens/` (the only source of color/type/spacing), component specs, UI kits, and the mascot assets. Also an invocable skill (`SKILL.md`).

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
