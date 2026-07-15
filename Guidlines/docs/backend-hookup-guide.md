# Backend hookup guide — wiring the real thing to the new front end

**Who this is for:** you, the founder. Plain English, no code required to read it.
**What it is:** the playbook for connecting the new TypeScript front end
(mobile app + Studio web portal, built on `deploy-phase2`) to a live backend —
database, accounts, messaging, photos, video.
**What it is not:** nothing in this doc has been provisioned or deployed yet.
When you say "go," this is the map we follow.

---

## 1. The shape of the whole thing

Three moving parts, and one shortcut that makes chat feel instant:

```
 phone app (Expo)          Studio portal (Next.js)
        \                        /
         \                      /
          ──────► the API ◄────          ← one REST API (NestJS, already built)
                    │
                    ▼
              the database                ← Supabase (Postgres)
                    │
   chat messages ride a live wire
   straight from the database to
   every phone in the crew  ──────►  ⚡ Supabase Realtime
```

Everything ordinary (profiles, trips, sign-ups, photos) goes through the API,
which checks who you are and what you're allowed to do. **Chat is special:**
messages are *sent* through the API (so they're validated), but they're
*received* over a live Supabase Realtime connection — no refresh, no polling,
no API round-trip. That's why chat feels instant. This exact pattern already
works on the `deploy-phase` branch; we keep it.

---

## 2. The route (founder's call: Render stays)

| Job | Platform | Phase 1 | Now | Why |
|---|---|---|---|---|
| Database + accounts + live chat | **Supabase** | Supabase | **Supabase (keep)** | It already works, Realtime chat is proven, and auth + database + live wire in one service is the fewest moving parts you can have. |
| The API | **Render** | Render | **Render (keep)** | The service already exists (`tandemclub-api.onrender.com`), is on the paid **Starter** plan, and has been live and healthy since the Phase-1 fixes landed. Starter means **always-on** — no serverless nap, no cold-start tax on the first tap. For "fast API calls," an always-warm server you already pay for is the honest winner. |
| Studio web portal | **Render** | — (didn't exist) | **Render (new, second service)** | A sibling web service in the same dashboard. One platform, one bill, one place to look when something's off. |
| Error alarms | **Sentry** | Sentry | **Sentry (keep)** | Already wired into the API. It emails you when something breaks before a student tells you. |
| Video | **Mux** | Mux | **Mux (keep)** | Direct-upload tickets are already built into the API's media module; the webhook already points at the Render URL. |
| Trip photos | **Cloudflare R2** | R2 | **R2 (keep)** — see §6 | The upload code exists. One 10-minute chore (CORS) was never finished in Phase 1 — we finish it, not rebuild it. |
| Push notifications | Expo Push | not built | **later** | Needs a real device build; separate step after launch basics. |

**Total: three accounts you log into** (Supabase, Render, Sentry) plus two
you rarely touch (Mux, Cloudflare). You already have all five from Phase 1.

**Two Render facts worth knowing (from your own dashboard):**

1. **The service is currently watching the `main` branch.** It switched
   itself when `deploy-phase` disappeared from GitHub. `main` has no backend
   code, so if anything gets pushed to `main`, Render will try to build it
   and fail — harmless (the live version stays up; failed deploys never
   replace a healthy one), but noisy. The fix is step ② of the checklist:
   once the backend is merged into `deploy-phase2`, point the service at
   that branch in Settings → Build & Deploy → Branch.
2. **The Phase-1 fixes are why it's stable now** — Swagger docs can no
   longer crash prod boot, and the start command uses plain `node` (not
   pnpm). Both live in the code that carries over; don't let them get
   "cleaned up."

---

## 3. What carries over from Phase 1 (a lot — this is the good news)

The whole backend was already built and tested on the **`deploy-phase`**
branch (83 tests green): the API with modules for auth, users, communities,
posts, trips, messaging, and media; the database schema + migrations
(`db/`); and the shared packages (`packages/types`, `packages/api-client`,
`packages/config`). None of it gets rewritten.

The move, when you're ready:

1. **Merge the backend folders from `deploy-phase` into `deploy-phase2`** —
   `apps/api`, `apps/workers`, `db/`, `packages/*` — and add them back to
   the workspace list in `pnpm-workspace.yaml` (they were deliberately left
   out during the front-end build).
2. **Point the new screens at the API** via `packages/api-client` — the
   typed client the mobile app already used in Phase 1.
3. The old Phase-1 mobile screens on `deploy-phase` are superseded by the
   new build; only the backend comes over.

Known Phase-1 gotchas that stay fixed because we keep the code: the
messaging RLS infinite-recursion fix, and Drizzle's Date/cursor handling.
Don't let anyone "clean up" the RLS policies on the messages tables.

---

## 4. Fast API calls — what actually makes them fast

Five things matter. Each is a checkbox, not a research project:

1. **Keep the API next to the database.** The single biggest win, and you
   already have it: the Render service runs in **Oregon**, so just confirm
   the Supabase project is US-West too (Supabase dashboard → Settings →
   General). A cross-country hop adds ~60–80ms to *every* call; same-coast
   is ~1–5ms. If they ever end up on different coasts, move the database
   region, not the API.
2. **An always-on server keeps warm database connections.** This is the
   quiet advantage of the Render Starter plan you're already on: the API
   holds a ready-to-go connection pool to Postgres, so no call pays a
   "dial the database" tax. Keep `DATABASE_URL` exactly as Phase 1 had it.
   (Only if you ever see "too many connections" errors — unlikely before
   thousands of users — would we switch to Supabase's pooler URL.)
3. **Keep payloads lean.** Already designed in: the API returns trimmed DTOs
   through `packages/api-client`, not whole database rows. Keep that
   discipline when new endpoints get added.
4. **Cache the read-heavy, rarely-changing stuff.** Club lists and campus
   feeds can carry a short cache header (even 30–60s) so repeat opens are
   instant and the database rests. The trips list a student sees on Home is
   the first candidate.
5. **Don't route live things through the API at all.** Chat (and later,
   presence/typing) rides Supabase Realtime directly — see §5. The API stays
   out of the hot path.

---

## 5. Messaging, end to end (the thing you said matters most)

The pattern (proven in Phase 1, kept verbatim):

- **Sending:** the phone POSTs the message to the API → the API checks "are
  you actually in this crew?" → writes it to the `messages` table.
- **Receiving:** every phone in that crew holds an open Realtime
  subscription to that crew's channel. The database itself announces the new
  row; Supabase pushes it down the wire; the message appears with no
  refresh. Typical delivery is well under half a second.
- **Security:** Row Level Security (RLS) means the database *itself* refuses
  to show crew messages to non-members — even if a client misbehaves. The
  Phase-1 recursion bug in these policies is already fixed; carry the
  policies over as-is.

Hookup steps when we wire it:

1. Supabase dashboard → Database → Replication: confirm **Realtime is
   enabled** for the message tables (crew, trip, DM).
2. Mobile app subscribes with the **anon key** (safe to ship in the app;
   RLS does the guarding) — one channel per open chat, subscribed on entry,
   cleaned up on leave.
3. Optimistic send: the message shows in your own chat instantly while the
   POST completes; if the POST fails you get a retry chip. (Front-end nicety
   — flag it in the build wave that does chat.)
4. Load test later, not now: Supabase's free tier handles hundreds of
   concurrent Realtime connections — more than enough for the first campus.

---

## 6. Photos: finish R2, don't rebuild it

**Recommendation: keep R2.** The API already issues presigned upload URLs
(phone uploads straight to R2, never through the API — fast and cheap), and
R2 has zero egress fees, which matters for a photo-heavy app.

The unfinished Phase-1 chore: **R2 CORS.** Browsers/phones refuse to upload
to R2 until the bucket says the app's web addresses are allowed. It's a
10-minute task in the Cloudflare dashboard (R2 → your bucket → Settings →
CORS policy): allow `PUT`/`GET` from your onrender.com URLs and the Expo dev
origin. Without it, uploads mysteriously fail on web and you'll think the
code is broken. It isn't — it's this.

*The simplify-later alternative:* Supabase Storage would fold photos into
the same dashboard as everything else — one fewer account. The trade: rewrite
the media module + pay egress. Not worth it now; revisit if Cloudflare ever
annoys you.

---

## 7. The hookup checklist, in order

Each step ends with "how you know it worked."

**① Supabase (you have this from Phase 1)**
Reuse the existing project (schema + RLS already live) — or create a fresh
one and run the migrations from `db/`. Grab from Settings → API: project
URL, anon key, service-role key, JWT secret; from Database: the **pooler**
connection string (§4.2). ✅ *Works when:* Supabase Table Editor shows the
tables and Realtime is on for messages.

**② Render — the API service (already exists — this is a re-point, not a rebuild)**
After the §3 merge lands the backend on `deploy-phase2`: Render dashboard →
tandemclub-api → Settings → Build & Deploy → change **Branch** from `main`
to `deploy-phase2`. The env vars from Phase 1 are still saved on the service
— skim them against §8 rather than re-entering. Build/start commands stay
exactly as Phase 1 left them (they encode the hard-won fixes).
✅ *Works when:* `https://tandemclub-api.onrender.com/health` says ok in
your browser after the next deploy goes live.

**③ Render — a second service for the Studio web portal**
Render dashboard → New → Web Service → same GitHub repo, branch
`deploy-phase2`, root directory `apps/web`. It's a Next.js app; we'll set
the exact build/start commands when we wire it (same plain-`node` start
lesson as Phase 1). Set the two public env vars (§8). Free tier is fine to
start — if its sleep-when-idle bothers you, Starter fixes it.
✅ *Works when:* the Studio home dashboard loads at its onrender.com URL.

**④ Mobile app env**
Fill `apps/mobile/.env` with the three `EXPO_PUBLIC_*` values (§8), restart
Expo. ✅ *Works when:* you can log in with a demo account and the Home screen
shows real trips from the database.

**⑤ Sentry**
`SENTRY_DSN` should still be sitting in the Render service env from
Phase 1 — just verify it's there.
✅ *Works when:* Sentry's dashboard shows a test event (the API has a dev
route for this; we'll trigger one).

**⑥ Mux**
The three `MUX_*` values and the webhook (Mux dashboard → Settings →
Webhooks → should already point at `tandemclub-api.onrender.com`) carry
over from Phase 1 — verify, don't re-create.
✅ *Works when:* requesting an upload ticket from the app returns a URL.

**⑦ R2 + CORS (§6)**
The five `R2_*` values should already be in the Render env; do the CORS
policy (the actually-new part).
✅ *Works when:* a photo upload from the app actually lands in the bucket.

**⑧ Messaging smoke test — the fun one**
Two simulators (or your phone + a simulator), same crew, send a message.
✅ *Works when:* it appears on the other screen in under a second, no
refresh. That's the product working.

---

## 8. Env var map (names only — values live in your `.env`, never in git)

Every name below already exists in the root `.env` from Phase 1 — this is
just *where each one goes* in the new route.

Most of the API rows are **already saved on the Render service from
Phase 1** — this table is your verify-list, not a data-entry job.

| Variable | Goes to | Notes |
|---|---|---|
| `DATABASE_URL` | Render API service | Keep exactly as Phase 1 (§4.2) |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Render API service | |
| `SUPABASE_SERVICE_ROLE_KEY` | Render API service | Server-only. Never in the mobile/web apps. |
| `SUPABASE_JWT_SECRET` | Render API service | How the API verifies login tokens |
| `SENTRY_DSN` | Render API service | |
| `MUX_TOKEN_ID` / `MUX_TOKEN_SECRET` / `MUX_WEBHOOK_SECRET` | Render API service | Webhook already aims at the Render URL (§7-⑥) |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET` / `R2_PUBLIC_URL` | Render API service | Plus the CORS chore (§6) |
| `CORS_ORIGINS` | Render API service | **Does need an edit:** add the new Studio onrender.com URL + Expo dev origin |
| `NODE_ENV`, `LOG_LEVEL`, `PORT` | Render API service | Render supplies `PORT` automatically |
| `EXPO_PUBLIC_API_URL` | `apps/mobile/.env` | `https://tandemclub-api.onrender.com` |
| `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `apps/mobile/.env` | Anon key is safe in the app; RLS guards the data |
| `NEXT_PUBLIC_API_URL` | Render web service | |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Render web service | Only once Studio needs live data/login |

---

## 9. Deliberately later (so nothing here surprises you)

- **Expo Push notifications** — needs a real-device build (EAS); after core
  flows are live.
- **Email confirmation flow** — the open Phase-1 to-do; Supabase Auth
  setting + one screen.
- **Maps + activity tracking** — last slices in the build order, untouched.
- **`apps/workers`** — the background-job app has no real jobs yet; deploy
  nothing for it until the Mux webhook worker gets built.
