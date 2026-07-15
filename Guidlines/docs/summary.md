# tandemclub — Project Summary

A free outdoor-club app for college students (18–22), paired with a web portal
for trip planning. Outdoor clubs publish trips; students discover them, RSVP, see
who else is going and what the vibe is, and turn one excursion into real
friendships. See [mission.md](mission.md) for the why.

## Two surfaces

- **Mobile app** (`apps/mobile`) — where members find their people. The social
  side: feed, profiles, trips & RSVPs, messaging, and trip media/memories.
- **Web portal** (`apps/web`) — where club leaders plan. Desktop-first: publish
  trips, manage RSVPs, carpools, attendance, and trip archives.

## Who it's for

College students aged 18–22 — especially the freshman or transfer who just
arrived and doesn't know anyone yet. Write every screen, message, and email for
that person.

## Go-to-market

- **Beachhead:** Cal Poly SLO — a handful of outdoor clubs, prove the model in one place.
- **Then:** ~15 outdoorsy schools (CU Boulder, U of Utah, UCSB, NAU, MSU Bozeman…).
- **Then:** national + partnerships.

## Money

Monetization is on the table — likely subscription, club SaaS (~$99/club/month),
brand partnerships, and possibly transactions later. Grow the network free first;
revenue comes later. (Don't treat tandemclub as "free forever / no commerce" —
that earlier stance is superseded.)

## Stack at a glance

- **Language:** TypeScript everywhere.
- **Mobile:** React Native + Expo, Expo Router.
- **Web:** Next.js.
- **Data:** Supabase (Postgres) + Drizzle ORM.
- **API:** REST.

## Monorepo map

- `apps/mobile` — the phone app (members).
- `apps/web` — the web portal.
- `apps/api` — the REST backend.
- `apps/workers` — background jobs.
- `packages/api-client` — shared client for calling the API.
- `packages/types` — shared TypeScript types.
- `packages/ui` — shared UI components.
- `packages/config` — shared config.

## How we build

Modular vertical slices — one feature at a time, fully working (screens + database
+ security + API + tests) before starting the next. Order:
**Auth → profiles → communities → posts → events → messaging  → maps → media -> activity tracking.**

## A note on names

Earlier research was done under the codenames *Kindred* and *Ozola*. Those docs
are kept dated in `docs/` as founder/IP records and are intentionally not renamed.
The product's name is **tandemclub** — use only that in code and new docs.

## Deeper docs (read on demand)

- `docs/strategy/kindred-architecture-memo.html` — full stack decision memo.
- `docs/strategy/kindred_market_breakdown.html` — market & rollout by segment.
- `docs/strategy/Kindred_Competition_Report.docx` — competitive landscape.
- `docs/strategy/research/kindred App_Ultimate OG_.docx` — build methodology & order.
- `docs/strategy/kindred_business_plan.docx` — full business plan.
