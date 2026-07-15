# tandemclub — Web Portal

The web portal: **where club leaders plan trips.** Desktop-first. Leaders publish
trips, manage RSVPs, organize carpools, take attendance, and keep trip archives.

See the root [`CLAUDE.md`](../../CLAUDE.md) and
[`Guidlines/docs/summary.md`](../../Guidlines/docs/summary.md) for the big picture.

## Stack

- Next.js.
- TypeScript.
- Talks to the REST API via `packages/api-client`; shared types from `packages/types`.

## What lives here

The leader-facing planning tool. This is a productivity surface, not a social
feed — clarity and ease beat flashiness. Planning is easier on a laptop than a
phone, and students are happily on laptops in class.

## Design

A planning tool can be cleaner and more utilitarian than the app — but it should
still feel **warm, never clinical.** When a screen touches trip photos or
memories, follow
[`Guidlines/docs/brand/design-language.md`](../../Guidlines/docs/brand/design-language.md).

## Conventions

- Descriptive, plain-English file and folder names, so it's obvious what a page
  does without opening it.
- Build one feature (vertical slice) at a time; don't touch working pages when
  adding new ones.
