# Build log — deploy-phase2 (the TypeScript front-end rebuild)

The running record of what's been built on this branch, newest first.
Written for the founder: plain English, one entry per milestone, with the
commit that sealed it. (The Phase-1 backend's own BUILD_LOG lives on the
local `deploy-phase` branch.)

**What this branch is:** the greyscale wireframes turned into the real
TypeScript apps — mobile (`apps/mobile`, Expo + React Native) and the
Studio web portal (`apps/web`, Next.js) — with the locked brand applied
and zero backend wiring yet. The build plan is
`Guidlines/docs/wireframe-to-typescript-migration.md`; the operating rules
are `Guidlines/docs/orchestrator-prompt.md`.

**Standing rules honored throughout:** wireframe layout/spacing/icons/copy
stay constant (only the skin changed) · no hardcoded colors outside the
token files · every dead end gets a designed empty state
(`Guidlines/docs/empty-states.md`) · no backend/database/deploy work — every
seam is marked `// TODO: backend seam` · backend hookup playbook ready in
`Guidlines/docs/backend-hookup-guide.md` (Render stays, founder-locked).

---

## 2026-07-15 — Golden Hour: the app gets its color + the chrome comes alive — `7b5110a`

The theme brief ("Bringing tandemclub to life") applied to both apps:
warm cream surfaces, warm near-black ink, one sunset-coral action per
screen, dusk-violet accent, warm-brown shadows — all by re-valuing the
two token files (no component changed for the repaint). The top navbar
now actually works: the profile avatar renders (a one-line web-only
flexbox bug had collapsed it to zero height), and avatar / bell / paper
plane land on three new screens — **Your profile**, the **Notifications
hub** (empty case: "All quiet. We'll nudge you when something moves."),
and the **Messages hub** (one row per crew, last word previewed, tap
into the chat). Badge counts are computed from the demo data. The web
Studio topbar grew the same powers: a bell with a working dropdown and
a real profile menu. Bottom tab bar sized so all four tabs fit. Koa
re-tinted to the brief's earth rust. 115 tests green, both apps driven
end-to-end in the browser at the gate.

**Still in your hands:** the four new painterly Koa stage images
(climbing / dancing / walking / sitting) couldn't leave the chat as
files — drop them into `Guidlines/design-system/assets/mascot/` and say
the word, and the streak mascot swaps from the vector art to them.

## 2026-07-14 — Wave 4: the plan flows + the ✓/✕ loop — `1c5e1d6`

The final build wave. Plan tab chooser; the 8-step Plan-an-Activity
wizard (BudgetSplitter with the under-$5 "buy you a coffee" nudge,
RideShareBuilder, photo gate, publish to crew / draft-a-crew / public,
"Publish trip."). **After publish you land inside the crew's chat**: the
trip card holds the top third with ✓ "I'm in" / ✕ "Can't make it" that
must be answered, then collapses into the slim pinned "you're going"
tile — the product's namesake loop, driven live at the gate. Crew chat
(pine own-bubbles), real Communities tab, minimal AirDrop handoff, and
the last three empty states (no crews / brand-new chat "Say hi —
someone has to go first." / zero-crew publish that never bricks).
75 mobile tests green.

## 2026-07-14 — Wave 3: browse & manage, both apps — `737392e` (web), `a310ac7` (mobile)

- **Mobile**: the temporary gallery retired; real tab shell (Home ·
  My Trips · Plan · Communities). Home ported top-to-bottom (header,
  crew grid, streak bar, "Sign ups for you" shelf, this-week grid);
  kind-aware card routing (Adventure → trip page with "Enter for a
  spot" lotteries, Activity → activity screen); Archives masonry +
  detail; My Trips. **EmptyState component ships** — voice line, one
  CTA, Koa pose PNG at the bottom — with all seven Wave-3 blank states
  wired behind one-line review switches. A real Button crash bug found
  and fixed. 55 tests at the gate.
- **Web**: Manage Adventures (fill bars, edit/clone/unpublish/delete),
  Clone browser, the 6-step Club wizard, Manage a Club (roster + role
  picker, join requests approve/deny, dues, settings). Home dashboard
  reads live state. The wireframe's three verbatim empty banners plus
  the non-admin officers gate, requests-empty (driven live), and
  solo-roster states. 38 tests, build green.

## 2026-07-14 — Wave 2: the first two flows, gate-verified end to end — `d7cc3f3`

- **Mobile onboarding**: all 8 steps as real routes — name, year (chips
  auto-advance), basics, about (pick up to 5 activities), experience
  (8 activities rated 0–5), photos (unskippable; designed pick-targets;
  Continue gated until profile pic + main photo), bio (250-char + prompt),
  verify (Skip for now → read-only banner). Copy verbatim from the
  wireframe, line-referenced. 40 tests green.
- **Studio Adventure wizard**: all 9 steps — basics → write-up → itinerary
  → permits (source-specific builder) → budget (sliders, per-person math)
  → gear (templates) → rides & tent → photos → preview (phone-frame with
  Overview/Details/Rides & tent tabs) → publish sheet → "Published to
  Field Studies" confirmation. Fresh/edit/clone entries prefill. 27 tests,
  production build green.
- **Blank states shipped with it**: "No permit needed" banner, zero-photos
  nudge, and a publish flow that never bricks a clubless lead.
- **Koa lands in the app**: interim transparent pose cutouts (from the
  Branding PDF sheet) committed under contract filenames in
  `apps/mobile/assets/mascot/koa/` — the flat-ember versions replace them
  file-for-file when the founder saves that sheet.
- Gate: both loops driven in-browser end to end by the orchestrator
  (publish confirmed; onboarding walked with photo-gate + verify-skip
  checks), hex audits clean, copy spot-checked against the wireframes.

## 2026-07-14 — Empty-states spec: no dead ends, ever — `d8059cf`, `29e6b08`

Canonical blank-state patterns (mobile: voice line + one CTA + **Koa pose
art anchored at the bottom**; web: the wireframe's own info-banner) plus a
complete 24-surface inventory across both apps with copy and owners. The
web wireframe's three designed empty banners are canon, ported verbatim.
Review gates now drive every flow to its empty case too.

## 2026-07-14 — Wave 1: foundations, brand applied — `ab3abc3`

- **Mobile**: typed theme (locked palette: Pine/Teal/Ember/Amber/Leaf/
  Canvas/Paper/Muted; wireframe spacing scale), Spectral + Hanken Grotesk
  behind the splash, **all 43 wireframe icons ported 1:1 (zero
  substitutions)**, 16 core components (Button, TripCard incl. the ✓/✕
  respond card, Mascot re-tinted Ember/Pine, StreakBar, StepShell…),
  temporary foundation gallery. 22 tests.
- **Web**: tokens as CSS variables + wireframe geometry (236px sidebar,
  232px step rail, 720px wizard body), all 22 Studio icons 1:1, typed demo
  data, StudioProvider state, Sidebar/StudioPage/WizardShell, the real
  Home dashboard. 17 tests, build green.
- Gate fix: tertiary text tone failed WCAG contrast (2.4:1, inherited from
  the wireframe's grey) — now full muted (4.6:1) with the soft tone kept
  for placeholders. Ember button labels (3.6:1) flagged: big/bold labels
  only, never body text.

## 2026-07-14 — Backend hookup guide (docs only) — `f92ed4d`, `58d59ad`

The founder playbook for wiring the real backend later: **keep Supabase**
(database + auth + Realtime chat) and **keep Render** (founder's call —
the existing always-on Starter service; no cold starts), keep Sentry/Mux/
R2 (+ finish the R2 CORS chore), fast-calls checklist, messaging
end-to-end, env-var verify-list, ordered hookup steps each with a "works
when" test. ⚠️ Noted: `deploy-phase` was deleted from GitHub that morning —
the local branch is the only copy of the Phase-1 backend; Render currently
watches `main` and must be re-pointed at `deploy-phase2` after the
backend merge.

## 2026-07-14 — Workspace prep + scaffolds — `81da880`, `4645d80`

Branch `deploy-phase2` cut from main (the clean wireframes+docs state).
Design system zip extracted to `Guidlines/design-system/` (zip itself
gitignored). Monorepo plumbing recreated from deploy-phase conventions,
pruned to `apps/mobile` + `apps/web`. Both apps scaffolded (Expo SDK 57 /
Next.js 16, TS strict, same package names and scripts as Phase 1 so the
backend merge stays painless) — typecheck clean before any feature work.

---

## The build is complete — final state (2026-07-14)

**113 tests green** (75 mobile + 38 web) · typecheck clean both apps ·
web production build passes · zero hardcoded colors outside the token
files · every planned loop driven live at its gate, populated **and**
forced-empty.

### Founder to-dos (in your hands)

- Save the **flat-ember Koa sheet** to Desktop — the interim painterly
  cutouts swap file-for-file, no code changes.
- **Backend hookup** when ready: follow
  `Guidlines/docs/backend-hookup-guide.md` (Render stays; re-point the
  service from `main` to `deploy-phase2` after the merge).
- Optionally re-push the local `deploy-phase` branch to GitHub as a
  safety copy — it is the ONLY copy of the Phase-1 backend.
- Real-device pass: `pnpm --filter @tandemclub/mobile ios` for the
  simulator (photo picking, which the browser can't exercise, works
  there).

### Deferred by design (each flagged in code with a TODO)

- **Notifications screen** — the wireframe defines it; ships with its
  own slice (+ its empty state, spec #12).
- **expo-clipboard** (handoff Copy uses a local confirmation) and
  **expo-linear-gradient** (PhotoFrame scrim is a solid pine band) —
  add both packages in one small pass when wanted.
- Koa poses 1 & 3 parked (old-name wordmark/app art — redraw as
  tandemclub before shipping).
- Trip-hub swipe canvas + live chat data, Code Connect maps (once Figma
  frames exist), the jest version-skew workarounds (revisit when
  jest-expo catches up), and one dev-flavored archive toast line kept
  verbatim from the wireframe — all noted for future passes.
- **Everything backend**: auth, real data, media upload, Realtime chat —
  every seam marked `// TODO: backend seam` and mapped in the hookup
  guide.
