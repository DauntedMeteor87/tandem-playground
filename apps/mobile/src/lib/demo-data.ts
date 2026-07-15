// Source: Wireframe 0.4 — app.js demo data (TRIPS, CLUBS, CREWS, PEOPLE, ARCHIVES,
// PAST_TRIPS, the home quick-tiles grid, and the joined-state seed). Ported verbatim
// (values unchanged) into one typed module the M3 screens all read from.
//
// TODO: backend seam — every constant here is placeholder demo data. Real screens
// fetch from the API: GET /trips, GET /me/trips, GET /communities, GET /archives …
// The DEV_EMPTY flags at the bottom let a reviewer force each surface blank so the
// EmptyState wiring can be seen end-to-end (see each flag's comment).
import type { IconName } from "@/components/icons";

/* Two member-facing trip kinds only (never "event"/"RSVP"). */
export type TripKind = "Adventure" | "Activity";

/* ---------- Types ---------- */
export type Person = {
  id: string;
  name: string;
  year: string;
  role: string;
  bio: string;
  trips: number;
  certs: string[];
  shared: string[];
  mutual: boolean;
  from: string;
  major: string;
};

export type Trip = {
  id: string;
  title: string;
  club: string;
  kind: TripKind;
  when: string;
  diff: string;
  beginner: boolean;
  cost: string;
  spots: string;
  /** `join` = open join now; `lottery` = enter for a spot. */
  mode: "join" | "lottery";
  going: string[];
  goingN: number;
  mutuals: number;
  place: string;
  lead: string;
  patch: string;
  desc: string;
  roster: string[];
};

export type Club = {
  id: string;
  name: string;
  members: number;
  kind: string;
  school: boolean;
  dues: string;
  blurb: string;
};

export type Crew = {
  id: string;
  name: string;
  members: number;
  sub: string;
  hearted: boolean;
};

export type Archive = {
  id: string;
  title: string;
  crew: string;
  poster: string;
  kind: TripKind;
  when: string;
  place: string;
  caption: string;
  roster: string[];
};

export type PastTrip = { id: string; title: string; meta: string; patch: string };

/** A home quick-tile shortcut (wireframe qgrid). */
export type QuickTile = {
  label: string;
  icon: IconName;
  target: { type: "crew" } | { type: "club" } | { type: "trip"; id: string };
};

/* ---------- People ---------- */
export const PEOPLE: Record<string, Person> = {
  maya: { id: "maya", name: "Maya P.", year: "Sophomore", role: "Trip lead", bio: "Backpacker, always down for a sunrise summit.", trips: 14, certs: ["WFA", "CPR"], shared: ["Field Studies", "Surf Club"], mutual: true, from: "Bend, OR", major: "Environmental Science" },
  jordan: { id: "jordan", name: "Jordan R.", year: "Junior", role: "Trip lead", bio: "Climber & film photographer.", trips: 23, certs: ["WFR", "CPR"], shared: ["Climbing Club"], mutual: true, from: "Denver, CO", major: "Architecture" },
  alex: { id: "alex", name: "Alex L.", year: "Senior", role: "Member", bio: "Skier chasing the next storm.", trips: 19, certs: ["CPR"], shared: ["Ski & Snowboard"], mutual: false, from: "Truckee, CA", major: "Business" },
  kai: { id: "kai", name: "Kai M.", year: "Freshman", role: "Member", bio: "First year, first trips — down for anything.", trips: 2, certs: [], shared: ["Cal Poly Hiking"], mutual: true, from: "Honolulu, HI", major: "Undeclared" },
  riley: { id: "riley", name: "Riley S.", year: "Sophomore", role: "Member", bio: "Trail runner + coffee snob.", trips: 8, certs: ["WFA"], shared: ["Cal Poly Hiking"], mutual: true, from: "Sacramento, CA", major: "Kinesiology" },
  taylor: { id: "taylor", name: "Taylor W.", year: "Junior", role: "Member", bio: "Surfs before class, most days.", trips: 11, certs: ["CPR"], shared: ["Surf Club"], mutual: false, from: "San Diego, CA", major: "Marine Bio" },
};

/* ---------- Trips (sign-ups shelf + see-more + this-week grid) ---------- */
export const TRIPS: Record<string, Trip> = {
  sykes: { id: "sykes", title: "Sykes Hot Springs Overnight", club: "Field Studies", kind: "Adventure", when: "Sat–Sun · Mar 8", diff: "Moderate", beginner: true, cost: "$18", spots: "6 spots left", mode: "lottery", going: ["MP", "JR", "AL", "DT"], goingN: 8, mutuals: 2, place: "Big Sur, CA", lead: "maya", patch: "Hot Springs", desc: "Two-hour hike in to natural hot springs. Camp riverside, cook over the fire, hike out Sunday. We handle permits + group gear.", roster: ["maya", "jordan", "alex", "kai", "riley", "taylor"] },
  bishop: { id: "bishop", title: "Bishop Peak Sunset Hike", club: "Cal Poly Hiking", kind: "Activity", when: "Thu · 5:30 PM", diff: "Easy", beginner: true, cost: "Free", spots: "Open", mode: "join", going: ["KM", "RS", "JL"], goingN: 12, mutuals: 4, place: "San Luis Obispo", lead: "jordan", patch: "Sunset Summit", desc: "Chill after-class hike up Bishop. Great first trip if you don't know anyone yet — we go slow and grab tacos after.", roster: ["jordan", "kai", "riley", "alex", "taylor"] },
  surf: { id: "surf", title: "Dawn Patrol Surf — Pismo", club: "Surf Club", kind: "Activity", when: "Fri · 6:00 AM", diff: "Easy", beginner: true, cost: "Free", spots: "3 spots left", mode: "join", going: ["TW", "MB"], goingN: 6, mutuals: 1, place: "Pismo Beach", lead: "taylor", patch: "First Wave", desc: "Boards provided for beginners. We'll get you standing up by the end of the session.", roster: ["taylor", "maya", "kai"] },
  ski: { id: "ski", title: "Mammoth Ski Weekend", club: "Ski & Snowboard", kind: "Adventure", when: "Fri–Sun · Mar 21", diff: "Hard", beginner: false, cost: "$140", spots: "Full — waitlist", mode: "lottery", going: ["DT", "AL", "KM", "RS"], goingN: 22, mutuals: 5, place: "Mammoth Lakes", lead: "alex", patch: "Powder Day", desc: "Two nights, cabin split, lift tickets included. Intermediate+ — you should be comfortable on blues.", roster: ["alex", "riley", "kai", "jordan", "maya", "taylor"] },
  climb: { id: "climb", title: "Bouldering @ The Pad", club: "Climbing Club", kind: "Activity", when: "Tue · 7:00 PM", diff: "Easy", beginner: true, cost: "Free", spots: "Open", mode: "join", going: ["JR", "MP"], goingN: 9, mutuals: 2, place: "SLO Bouldering", lead: "jordan", patch: "Send It", desc: "Indoor session, all levels. Rentals covered by the club for members.", roster: ["jordan", "maya", "riley"] },
};

/* ---------- Clubs + crews (Communities tab) ---------- */
export const CLUBS: Record<string, Club> = {
  field: { id: "field", name: "Field Studies", members: 134, kind: "Club", school: true, dues: "$25 / yr", blurb: "Overnight backcountry trips, every other weekend." },
  hiking: { id: "hiking", name: "Cal Poly Hiking", members: 412, kind: "Club", school: true, dues: "Free", blurb: "Weekly hikes, all levels welcome." },
  surf: { id: "surf", name: "Surf Club", members: 208, kind: "Club", school: true, dues: "$15 / yr", blurb: "Dawn patrols + weekend trips up the coast." },
};

export const CREWS: Record<string, Crew> = {
  moon: { id: "moon", name: "Moonlight Crew", members: 9, sub: "night hikes & stargazing", hearted: true },
  beach: { id: "beach", name: "Beach Crew", members: 14, sub: "dawn patrols & bonfires", hearted: true },
  send: { id: "send", name: "Send Club", members: 6, sub: "gym + outdoor climbing", hearted: true },
  tahoe: { id: "tahoe", name: "Tahoe Trip Crew", members: 11, sub: "from the Feb ski weekend", hearted: false },
  taco: { id: "taco", name: "Taco Thursday", members: 7, sub: "post-hike tacos, always", hearted: false },
};

/* Which crew an Activity's chat lives in (wireframe ACT_CREW). */
export const ACT_CREW: Record<string, string> = { bishop: "moon", surf: "beach", climb: "send" };

/* ---------- Crew chat messages (wireframe channel-chat bubbles, per crew) ----------
   `me` marks the member's own messages (rendered in a pine bubble). Moonlight Crew
   keeps the wireframe's verbatim channel-chat thread; the others are warm demo copy. */
export type CrewMessage = { id: string; who: string; text: string; me: boolean };

export const CREW_MESSAGES: Record<string, CrewMessage[]> = {
  moon: [
    { id: "moon-1", who: "Maya P.", text: "@channel Roster finalized for Sykes! Check your My Trips.", me: false },
    { id: "moon-2", who: "Jordan R.", text: "Let's gooo 🏕️", me: false },
    { id: "moon-3", who: "You", text: "count me in", me: true },
  ],
  beach: [
    { id: "beach-1", who: "Taylor W.", text: "Dawn patrol at 6? 🌊", me: false },
    { id: "beach-2", who: "You", text: "so in — bringing coffee for everyone", me: true },
    { id: "beach-3", who: "Maya P.", text: "legend", me: false },
  ],
  send: [
    { id: "send-1", who: "Jordan R.", text: "gym tonight then tacos?", me: false },
    { id: "send-2", who: "You", text: "yes, finally sending that V4", me: true },
  ],
  tahoe: [
    { id: "tahoe-1", who: "Alex L.", text: "who's got the cabin playlist for next time", me: false },
    { id: "tahoe-2", who: "Riley S.", text: "that was all me, no regrets", me: false },
  ],
  taco: [
    { id: "taco-1", who: "Riley S.", text: "thursday tacos still on?", me: false },
    { id: "taco-2", who: "You", text: "always", me: true },
  ],
};

/* ---------- Archives — inspiration board of trips people already took ---------- */
export const ARCHIVES: Record<string, Archive> = {
  yose: { id: "yose", title: "Yosemite Weekend", crew: "Moonlight Crew", poster: "maya", kind: "Adventure", when: "Last weekend", place: "Yosemite Valley", caption: "Sunrise over Half Dome — worth the 4am wake-up.", roster: ["maya", "jordan", "kai", "riley"] },
  pismo2: { id: "pismo2", title: "Pismo Beach Cleanup", crew: "Surf Club", poster: "taylor", kind: "Activity", when: "2 weeks ago", place: "Pismo Beach", caption: "40 lbs of trash off the beach, then tacos.", roster: ["taylor", "maya", "kai"] },
  bishopd: { id: "bishopd", title: "Bishop Peak Sunset", crew: "Cal Poly Hiking", poster: "jordan", kind: "Activity", when: "3 weeks ago", place: "San Luis Obispo", caption: "Golden hour at the summit, whole crew made it up.", roster: ["jordan", "kai", "riley", "alex"] },
  sykesd: { id: "sykesd", title: "Sykes Hot Springs", crew: "Field Studies", poster: "kai", kind: "Adventure", when: "Last month", place: "Big Sur", caption: "Two-hour hike in was worth it for this view.", roster: ["kai", "maya", "jordan", "taylor", "riley"] },
  skid: { id: "skid", title: "Mammoth Ski Weekend", crew: "Ski & Snowboard", poster: "alex", kind: "Adventure", when: "Last month", place: "Mammoth Lakes", caption: "Bluebird day on the mountain.", roster: ["alex", "riley", "kai", "jordan"] },
};

/* ---------- Past trips (My Trips · Past — patches earned) ---------- */
export const PAST_TRIPS: PastTrip[] = [
  { id: "pismo", title: "Pismo Beach Cleanup", meta: "Feb 22 · 11 photos", patch: "First Wave" },
  { id: "cerro", title: "Cerro San Luis Hike", meta: "Feb 8 · 6 photos", patch: "Sunset Summit" },
];

/* Trips the member has joined (wireframe S.joined seed). tripId -> state. */
export const JOINED: Record<string, "joined" | "entered"> = { bishop: "joined" };

/* Demo streak — 3 weeks out (wireframe streakBar()). */
export const STREAK_WEEKS = 3;

/* ---------- Home quick-tiles grid (wireframe qgrid, 2-wide) ---------- */
export const QUICK_TILES: QuickTile[] = [
  { label: "Moonlight Crew", icon: "comm", target: { type: "crew" } },
  { label: "Bishop Peak Sunset", icon: "trips", target: { type: "trip", id: "bishop" } },
  { label: "Dawn Patrol Surf", icon: "trips", target: { type: "trip", id: "surf" } },
  { label: "Cal Poly Hiking", icon: "comm", target: { type: "club" } },
  { label: "Field Studies", icon: "comm", target: { type: "club" } },
  { label: "Beach Crew", icon: "comm", target: { type: "crew" } },
];

/* ---------- Selectors the screens read ---------- */
/** Segment filter value used by the Activities/Adventures controls. */
export type KindFilter = "All" | "Activities" | "Adventures";

export function filterByKind<T extends { kind: TripKind }>(items: T[], filter: KindFilter): T[] {
  if (filter === "Activities") return items.filter((i) => i.kind === "Activity");
  if (filter === "Adventures") return items.filter((i) => i.kind === "Adventure");
  return items;
}

/** All trips available to sign up for (shelf + see-more). Empty when forced. */
export function signupsList(): Trip[] {
  return DEV_EMPTY.signupsList ? [] : Object.values(TRIPS);
}

/** Just the Home "Sign ups for you" shelf source (can be blanked on its own). */
export function signupsShelf(): Trip[] {
  return DEV_EMPTY.signupsShelf ? [] : Object.values(TRIPS);
}

/** Curated subset shown in the Home "This week" 2-up grid. */
const THIS_WEEK_IDS = ["bishop", "surf", "sykes", "climb"] as const;
export function thisWeekList(): Trip[] {
  return DEV_EMPTY.thisWeek ? [] : THIS_WEEK_IDS.map((id) => TRIPS[id]);
}

/** All archives (board + home shelf). Empty when forced. */
export function archivesList(): Archive[] {
  return DEV_EMPTY.archivesBoard ? [] : Object.values(ARCHIVES);
}

/** Upcoming (joined) trips for My Trips. Empty when forced. */
export function upcomingTrips(): Array<{ trip: Trip; state: "joined" | "entered" }> {
  if (DEV_EMPTY.myTripsUpcoming) return [];
  return Object.keys(JOINED).map((id) => ({ trip: TRIPS[id], state: JOINED[id] }));
}

/** Past trips for My Trips. Empty when forced. */
export function pastTrips(): PastTrip[] {
  return DEV_EMPTY.myTripsPast ? [] : PAST_TRIPS;
}

/* Itinerary rows for a trip (wireframe itinOf) — [time, what]. */
export function itineraryOf(t: Trip): Array<[string, string]> {
  return t.kind === "Adventure"
    ? [
        ["Fri 4:00 PM", "Meet at the Rec Center lot, load gear"],
        ["Sat 9:00 AM", "Hike in, set up camp"],
        ["Sat PM", "Cook over the fire, stargaze"],
        ["Sun 11:00 AM", "Pack out, tacos on the drive home"],
      ]
    : [
        ["5:15 PM", "Meet at the trailhead lot"],
        ["5:30 PM", "Head up together — we go slow"],
        ["Sunset", "Photos at the top"],
        ["After", "Tacos for anyone who's in"],
      ];
}

/* Cost breakdown rows for a trip (wireframe costsOf) — [label, value]. */
export function costsOf(t: Trip): Array<[string, string]> {
  if (t.cost === "Free") {
    return [
      ["Trip cost", "Free"],
      ["Gas (optional carpool)", "~$4 each"],
      ["You pay now", "$0"],
    ];
  }
  return [
    ["Permit + group gear", "$8 / person"],
    ["Gas — carpool split", "$10 / person"],
    ["Total", t.cost],
  ];
}

/** The crews the member is in (wireframe: hearted crews = "your crews"). Drives the
 * Communities "your crews" list and the publish "Post to a crew" picker. Empty when
 * forced — that's the day-one "no crews yet" case (#8 / #10). */
export function heartedCrews(): Crew[] {
  return DEV_EMPTY.crews ? [] : Object.values(CREWS).filter((c) => c.hearted);
}

/** Messages in a crew's chat. A brand-new crew (no seed, e.g. a just-drafted one)
 * returns none — that's the "say hi first" empty state (#9). */
export function crewMessages(id: string): CrewMessage[] {
  if (DEV_EMPTY.crewChat) return [];
  return CREW_MESSAGES[id] ?? [];
}

/* Initials for a person id (wireframe pInit). */
export function personInitials(id: string): string {
  const p = PEOPLE[id];
  return p
    ? p.name
        .split(" ")
        .map((w) => w[0])
        .join("")
    : "??";
}

/* ============================================================
   DEV_EMPTY — review switches. Every flag is false by default (all surfaces
   populated). Flip one to true and reload to see that surface's EmptyState.
   Each maps to a row of Guidlines/docs/empty-states.md's mobile inventory.
   ============================================================ */
export const DEV_EMPTY = {
  /** #1 Home · "Sign ups for you" shelf → koa-empty-seat. */
  signupsShelf: false,
  /** #2 Home · this-week grid → koa-tea. */
  thisWeek: false,
  /** #3 See-more sign-ups (pick Activities/Adventures to hit the per-filter copy). */
  signupsList: false,
  /** #4 Archives board (+ #5 per-filter when a Segment yields none). */
  archivesBoard: false,
  /** #6 My Trips · Upcoming → koa-empty-seat. */
  myTripsUpcoming: false,
  /** #7 My Trips · Past → koa-tea. */
  myTripsPast: false,
  /** #8 Communities · your crews (also blanks the publish "Post to a crew" picker,
   * #10) → koa-empty-seat + "See sign ups". */
  crews: false,
  /** #9 A brand-new crew chat with no messages yet → koa-empty-seat, "Say hi…". */
  crewChat: false,
};
