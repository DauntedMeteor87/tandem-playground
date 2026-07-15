# tandemclub — Mobile App

The phone app: **where members find their people.** This is the social side of
tandemclub — the feed, trips and sign-ups, crews, messaging, and the photos and
memories from trips.

See the root [`CLAUDE.md`](../../CLAUDE.md) and
[`Guidlines/docs/summary.md`](../../Guidlines/docs/summary.md) for the big picture.

## Stack

- React Native + Expo (SDK 57), TypeScript strict.
- Expo Router for navigation (file-based routes under `src/app/`).
- Theme: `src/theme/tokens.ts` is the ONLY source of color/spacing/type —
  components reference `theme.color.pine` etc., never a raw hex.
- Backend wiring comes later via `packages/api-client`; today every data
  touchpoint is marked `// TODO: backend seam`.

## Where screens come from

This build is a 1:1 port of the greyscale wireframe at
[`Prototypes/Wireframe 0.4/`](Prototypes/) — layout, spacing, icons, and copy
stay exactly as the wireframe has them; only color and type changed (the
locked palette + Spectral/Hanken Grotesk). The build spec is
[`Guidlines/docs/wireframe-to-typescript-migration.md`](../../Guidlines/docs/wireframe-to-typescript-migration.md).
Each component notes its wireframe source in a header comment, plus a
`// TODO: Code Connect map once Figma frame exists` marker for the future
Figma round-trip per
[`Guidlines/docs/figma-workflow.md`](../../Guidlines/docs/figma-workflow.md).

## Design matters most here

The Impressionist, "beautiful way to remember a moment" design language applies
most strongly on this app. Read
[`Guidlines/docs/brand/design-language.md`](../../Guidlines/docs/brand/design-language.md)
before building anything visual. Warm, painterly, optimistic — never cold or
clinical.

- The mascot is **Koa**. Pose art lives in `assets/mascot/koa/`; every empty
  state follows [`Guidlines/docs/empty-states.md`](../../Guidlines/docs/empty-states.md)
  (voice line → one CTA → Koa at the bottom; no dead ends, ever).
- Two join states only: **Join now** / **Enter for a spot** — never
  "RSVP" or "Register". No trust scores anywhere.

## Copy

Write for an 18–22 year old — often a freshman who doesn't know anyone yet.
Warm, plain, and human. Never corporate.

## Conventions

- Descriptive, plain-English file and folder names, so it's obvious what a
  screen is without opening it.
- One component per folder: `src/components/<Name>/<Name>.tsx`.
- Build one feature (vertical slice) at a time; don't touch working screens
  when adding new ones.
- `pnpm --filter @tandemclub/mobile typecheck` and `… test` must stay green.
