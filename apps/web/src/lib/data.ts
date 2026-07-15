// Source: Wireframe 0.2 — app.js (state seed + demo data).
// Every name, number, and request below is carried over verbatim: this is
// exactly what the founder demos Studio with. When the backend lands, these
// factories/constants get swapped for API reads at the `backend seam` notes.
import type { IconKey } from "@/components/icons";

/* ============================================================
   Core types
   ============================================================ */

export interface User {
  name: string;
  initials: string;
}

export type MemberRole = "Member" | "Trip lead" | "Treasurer" | "Admin";
export type ClubRole = "admin" | "member";
export type JoinPolicy = "open" | "request" | "invite";
export type VisType = "club" | "crew";

export interface Member {
  name: string;
  role: MemberRole;
}

export interface Club {
  id: string;
  name: string;
  kind: "Club";
  role: ClubRole;
  category: string;
  about: string;
  meets: string;
  joinPolicy: JoinPolicy;
  duesOn: boolean;
  dues: number;
  members: Member[];
  requests: string[];
}

export interface Crew {
  id: string;
  name: string;
  kind: "Crew";
}

export type PermitSourceKey = "recgov" | "state" | "forest" | "other";

export interface PermitSource {
  label: string;
  sub: string;
  icon: IconKey;
  steps: string[];
}

export interface GearItem {
  name: string;
  required: boolean;
}

export type GearTemplateKey = "backpacking" | "car" | "winter" | "custom";

export interface GearTemplate {
  label: string;
  items: GearItem[];
}

export interface ItineraryRow {
  time: string;
  text: string;
}

export interface FoodItem {
  label: string;
  cost: number;
}

export interface Permit {
  needed: boolean;
  source: "" | PermitSourceKey;
  link: string;
  notes: string;
}

export interface Budget {
  distance: number;
  distanceMax: number;
  campsiteTotal: number;
  campsiteMax: number;
  permitsTotal: number;
  permitsMax: number;
  miscTotal: number;
  miscMax: number;
  foodOn: boolean;
  foodMode: "estimate" | "itemized";
  meals: number;
  costPerMeal: number;
  foodItems: FoodItem[];
  insuranceOn: boolean;
  insuranceCost: number;
}

/** The active Adventure draft — the wireframe's `ADV`. */
export interface Adventure {
  name: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  capacity: number;
  visType: VisType;
  visId: string;
  coLeads: string;
  writeup: string;
  itinerary: ItineraryRow[];
  permit: Permit;
  budget: Budget;
  gearTemplate: GearTemplateKey;
  gear: GearItem[];
  cars: number;
  tentSpots: number;
  photos: number;
}

export interface Officer {
  name: string;
  role: MemberRole;
}

/** The active new-club draft — the wireframe's `NC`. */
export interface ClubDraft {
  name: string;
  category: string;
  community: string;
  about: string;
  meets: string;
  joinPolicy: JoinPolicy;
  duesOn: boolean;
  dues: number;
  officers: Officer[];
  photo: number;
}

export type TripStatus = "live" | "unpublished";

/** A published Adventure snapshot — a row in the Manage list. */
export interface PublishedTrip {
  id: string;
  adv: Adventure;
  visLabel: string;
  status: TripStatus;
  signups: number;
  publishedOn: string;
}

/** A past trip in the Clone library. */
export interface PastTrip {
  id: string;
  clubId: string;
  by: string;
  when: string;
  adv: Adventure;
}

export type StudioView =
  | "home"
  | "create"
  | "manage"
  | "clone"
  | "createClub"
  | "manageClub";

export interface NavItem {
  id: StudioView;
  label: string;
  icon: IconKey;
  href: string;
  adminOnly?: boolean;
}

/* ============================================================
   Current user
   ============================================================ */
export const USER: User = { name: "Maya", initials: "M" };

/* ---------- Topbar notifications (bell dropdown) ----------
   TODO: backend seam — becomes the leader's notifications feed. Demo items
   read true to the seeded clubs/adventures. */
export interface StudioNotification {
  id: string;
  text: string;
  when: string;
  /** Where clicking it lands. */
  href: string;
}

export const STUDIO_NOTIFICATIONS: StudioNotification[] = [
  {
    id: "n1",
    text: "2 join requests waiting for Field Studies.",
    when: "2h ago",
    href: "/manage-club",
  },
  {
    id: "n2",
    text: "Sykes Hot Springs Overnight is at 9 of 12 spots.",
    when: "Yesterday",
    href: "/manage-adventures",
  },
  {
    id: "n3",
    text: "Montaña de Oro Car Camp goes live in 3 weeks — gear list still empty.",
    when: "2d ago",
    href: "/manage-adventures",
  },
];

/* ============================================================
   Wizard steps
   ============================================================ */
export const STEPS = [
  "basics",
  "writeup",
  "itinerary",
  "permits",
  "budget",
  "gear",
  "rides",
  "photos",
  "preview",
] as const;
export type AdventureStep = (typeof STEPS)[number];
export const STEP_LABEL: Record<AdventureStep, string> = {
  basics: "Basics",
  writeup: "Write-up",
  itinerary: "Itinerary",
  permits: "Permits",
  budget: "Budget",
  gear: "Gear list",
  rides: "Rides & tent",
  photos: "Photos",
  preview: "Preview & publish",
};

export const CLUB_STEPS = [
  "basics",
  "about",
  "membership",
  "officers",
  "photo",
  "preview",
] as const;
export type ClubStep = (typeof CLUB_STEPS)[number];
export const CLUB_STEP_LABEL: Record<ClubStep, string> = {
  basics: "Basics",
  about: "About the club",
  membership: "Membership",
  officers: "Officers",
  photo: "Photo",
  preview: "Preview & create",
};

/* ============================================================
   Studio navigation — the six sidebar destinations.
   `href` is the Next.js route (added for the port); everything
   else is verbatim from app.js NAV.
   ============================================================ */
export const NAV: NavItem[] = [
  { id: "home", label: "Home", icon: "home", href: "/" },
  { id: "create", label: "Create an Adventure", icon: "plus", href: "/create-adventure" },
  { id: "manage", label: "Manage Adventures", icon: "edit", href: "/manage-adventures" },
  { id: "clone", label: "Clone an Adventure", icon: "copy", href: "/clone-adventure" },
  { id: "createClub", label: "Create a Club", icon: "flag", href: "/create-club" },
  {
    id: "manageClub",
    label: "Manage a Club",
    icon: "cog",
    href: "/manage-club",
    adminOnly: true,
  },
];

export const MEMBER_ROLES: MemberRole[] = [
  "Member",
  "Trip lead",
  "Treasurer",
  "Admin",
];

export const CLUB_CATEGORIES = [
  "Outdoors",
  "Water",
  "Climbing",
  "Cycling",
  "Snow",
  "Social",
  "Other",
] as const;

/* ============================================================
   Clubs, crews — prefilled so every studio section has real
   data to manage on first load.
   TODO: backend seam — clubs/crews come from the API + roles table.
   ============================================================ */
const CLUBS_SEED: Club[] = [
  {
    id: "field",
    name: "Field Studies",
    kind: "Club",
    role: "admin",
    category: "Outdoors",
    about:
      "Overnights, day hikes, and field trips for people who want to get outside without needing to already be outdoorsy.",
    meets: "Every other Tuesday, 7 PM — Rec Center Rm 12",
    joinPolicy: "request",
    duesOn: true,
    dues: 15,
    members: [
      { name: "Maya (you)", role: "Admin" },
      { name: "Jordan R.", role: "Trip lead" },
      { name: "Sam T.", role: "Treasurer" },
      { name: "Priya K.", role: "Member" },
      { name: "Diego M.", role: "Member" },
      { name: "Alex W.", role: "Member" },
      { name: "Noah B.", role: "Member" },
      { name: "Riley S.", role: "Member" },
    ],
    requests: ["Casey L.", "Morgan D."],
  },
  {
    id: "hiking",
    name: "Cal Poly Hiking",
    kind: "Club",
    role: "member",
    category: "Outdoors",
    about: "Weekly hikes around SLO county, all paces welcome.",
    meets: "Thursdays, 6 PM — Dexter Lawn",
    joinPolicy: "open",
    duesOn: false,
    dues: 0,
    members: [{ name: "Maya (you)", role: "Member" }],
    requests: [],
  },
  {
    id: "surf",
    name: "Surf Club",
    kind: "Club",
    role: "member",
    category: "Water",
    about: "Dawn patrol and weekend surf sessions.",
    meets: "Fridays, 5 PM — Pismo Pier lot",
    joinPolicy: "open",
    duesOn: true,
    dues: 20,
    members: [{ name: "Maya (you)", role: "Member" }],
    requests: [],
  },
];

export const CREWS: Crew[] = [
  { id: "moon", name: "Moonlight Crew", kind: "Crew" },
  { id: "beach", name: "Beach Crew", kind: "Crew" },
];

/* ============================================================
   Permit sources — a guided builder, one instruction list each.
   ============================================================ */
export const PERMIT_SOURCES: Record<PermitSourceKey, PermitSource> = {
  recgov: {
    label: "Recreation.gov",
    sub: "Most national parks, national forests & wilderness areas with quotas",
    icon: "shield",
    steps: [
      "Create or log into your Recreation.gov account (do this early — some areas need it days ahead).",
      "Search for the trailhead or wilderness area by name.",
      "Check the entry-date calendar — quota permits fill up fast in season.",
      "Reserve your date and pay the reservation fee.",
      "Download or print your confirmation — this is not the permit itself.",
      "Pick up the actual wilderness permit at the ranger station or trailhead kiosk before you hike. Bring photo ID.",
    ],
  },
  state: {
    label: "State park",
    sub: "Varies by state (ReserveCalifornia, ReserveAmerica, etc.)",
    icon: "tree",
    steps: [
      "Find your state park system's reservation site.",
      "Search the specific campground or backcountry zone.",
      "Reserve your site or date and pay any fees.",
      "Save the confirmation email — some parks also require a self-issue permit at the entrance.",
    ],
  },
  forest: {
    label: "National forest (self-issue)",
    sub: "No online reservation — fill out a paper permit at the trailhead",
    icon: "pin",
    steps: [
      "Check the forest's website to confirm a permit is required and that it's self-issue.",
      "Drive to the trailhead register box — no online reservation needed.",
      "Fill out the paper permit at the trailhead and take your copy with you.",
      "Double-check first: some forests still require a Recreation.gov reservation on top of the self-issue box.",
    ],
  },
  other: {
    label: "Something else",
    sub: "School land-use form, local ranger office, private land, etc.",
    icon: "info",
    steps: [],
  },
};

/* ============================================================
   Gear templates — each item required/optional, fully editable.
   ============================================================ */
export const GEAR_TEMPLATES: Record<GearTemplateKey, GearTemplate> = {
  backpacking: {
    label: "Backpacking — summer",
    items: [
      { name: "Sleeping bag (0–20°F)", required: true },
      { name: "Sleeping pad", required: true },
      { name: "Backpack (40–60L)", required: true },
      { name: "Headlamp + spare batteries", required: true },
      { name: "2–3L water capacity + filter", required: true },
      { name: "Trail snacks", required: false },
      { name: "Rain shell", required: true },
      { name: "Warm layers", required: true },
      { name: "Camp shoes", required: false },
    ],
  },
  car: {
    label: "Car camping",
    items: [
      { name: "Tent", required: true },
      { name: "Sleeping bag", required: true },
      { name: "Pillow", required: false },
      { name: "Camp chair", required: false },
      { name: "Cooler", required: false },
      { name: "Warm layers", required: true },
      { name: "Headlamp", required: true },
    ],
  },
  winter: {
    label: "Winter",
    items: [
      { name: "Insulated sleeping bag (sub-0°F)", required: true },
      { name: "4-season tent", required: true },
      { name: "Traction devices / microspikes", required: true },
      { name: "Insulated layers", required: true },
      { name: "Hand & foot warmers", required: false },
      { name: "Extra socks", required: true },
      { name: "Headlamp", required: true },
    ],
  },
  custom: { label: "Custom", items: [] },
};

/* ============================================================
   Fresh drafts (blank-ish starting points for Create).
   Factories so every entry point gets its own object.
   ============================================================ */
export function freshAdventure(): Adventure {
  return {
    name: "Sykes Hot Springs Overnight",
    dateStart: "2027-03-08",
    dateEnd: "2027-03-09",
    location: "Big Sur, CA",
    capacity: 12,
    visType: "club",
    visId: "field",
    coLeads: "Jordan R.",
    writeup:
      "Two-hour hike in to natural hot springs along the Big Sur coast. We'll camp riverside, cook over the fire, and hike out Sunday. This is most people's first overnight — we go at a beginner pace and handle the permit + group gear.",
    itinerary: [
      { time: "Fri 4:00 PM", text: "Meet at the Rec Center lot, load gear" },
      { time: "Sat 9:00 AM", text: "Hike in, set up camp" },
      { time: "Sat PM", text: "Cook over the fire, stargaze" },
      { time: "Sun 11:00 AM", text: "Pack out, tacos on the drive home" },
    ],
    permit: { needed: true, source: "forest", link: "", notes: "" },
    budget: {
      distance: 100,
      distanceMax: 400,
      campsiteTotal: 0,
      campsiteMax: 500,
      permitsTotal: 0,
      permitsMax: 200,
      miscTotal: 0,
      miscMax: 200,
      foodOn: false,
      foodMode: "estimate",
      meals: 2,
      costPerMeal: 7,
      foodItems: [],
      insuranceOn: true,
      insuranceCost: 5,
    },
    gearTemplate: "backpacking",
    gear: [
      { name: "Sleeping bag (0°F)", required: true },
      { name: "Headlamp", required: true },
      { name: "2L water", required: true },
      { name: "Swimsuit + towel", required: true },
      { name: "Trail snacks", required: false },
      { name: "Layers — it gets cold", required: true },
    ],
    cars: 4,
    tentSpots: 6,
    photos: 3,
  };
}

export function freshClub(): ClubDraft {
  return {
    name: "",
    category: "Outdoors",
    community: "Cal Poly SLO",
    about: "",
    meets: "",
    joinPolicy: "request",
    duesOn: false,
    dues: 15,
    officers: [{ name: USER.name + " (you)", role: "Admin" }],
    photo: 1,
  };
}

/* ============================================================
   Helpers (pure — operate on the typed data)
   ============================================================ */
export function fmtDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function visLabelFor(adv: Adventure, clubs: Club[], crews: Crew[]): string {
  const list = adv.visType === "club" ? clubs : crews;
  const found = list.find((x) => x.id === adv.visId);
  return found ? found.name : "Choose one";
}

export function joinPolicyLabel(p: JoinPolicy): string {
  return (
    {
      open: "Open — anyone can join",
      request: "Request — admins approve",
      invite: "Invite only",
    }[p] || p
  );
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/* ============================================================
   Budget math — ported verbatim from app.js. Every figure the
   Budget step and the phone preview show comes from these pure
   functions (they read from a passed-in Adventure instead of the
   wireframe's global ADV). Per-person is the unit everywhere.
   ============================================================ */
export const GAS_RATE_PER_MILE = 0.3;

export function gasPerPerson(adv: Adventure): number {
  return Math.round(
    (adv.budget.distance * adv.cars * GAS_RATE_PER_MILE) /
      Math.max(1, adv.capacity),
  );
}

export function splitPerPerson(total: number, capacity: number): number {
  return Math.round(total / Math.max(1, capacity));
}

export function foodPerPerson(adv: Adventure): number {
  const b = adv.budget;
  if (!b.foodOn) return 0;
  if (b.foodMode === "itemized")
    return b.foodItems.reduce((s, i) => s + Number(i.cost || 0), 0);
  return b.meals * b.costPerMeal;
}

/** Per-person cost lines, in the wireframe's order; only non-zero lines show. */
export function budgetBreakdown(adv: Adventure): Array<[string, number]> {
  const b = adv.budget;
  const rows: Array<[string, number]> = [];
  const gas = gasPerPerson(adv);
  if (gas > 0) rows.push(["Gas — carpool split", gas]);
  const campsite = splitPerPerson(b.campsiteTotal, adv.capacity);
  if (campsite > 0) rows.push(["Campsite (split)", campsite]);
  const permits = splitPerPerson(b.permitsTotal, adv.capacity);
  if (permits > 0) rows.push(["Permits (split)", permits]);
  const food = foodPerPerson(adv);
  if (food > 0) rows.push(["Food", food]);
  const misc = splitPerPerson(b.miscTotal, adv.capacity);
  if (misc > 0) rows.push(["Misc", misc]);
  if (b.insuranceOn && b.insuranceCost > 0)
    rows.push(["Injury insurance", b.insuranceCost]);
  return rows;
}

export function budgetTotal(adv: Adventure): number {
  return budgetBreakdown(adv).reduce((sum, [, v]) => sum + v, 0);
}

export function isClubAdmin(clubs: Club[]): boolean {
  return clubs.some((c) => c.role === "admin");
}

export function adminClubs(clubs: Club[]): Club[] {
  return clubs.filter((c) => c.role === "admin");
}

/* ============================================================
   Seed factories — return fresh deep copies so React state owns
   its own mutable data and re-mounts reset cleanly.
   ============================================================ */
export function seedClubs(): Club[] {
  return structuredClone(CLUBS_SEED);
}

/** The canonical clubs seed (read-only reference). */
export const CLUBS: Club[] = CLUBS_SEED;

/** Two live trips so Manage/Home have real rows on first load. */
export function seedPublishedTrips(): PublishedTrip[] {
  const a = freshAdventure();

  const b = freshAdventure();
  Object.assign(b, {
    name: "Montaña de Oro Car Camp",
    dateStart: "2026-08-14",
    dateEnd: "2026-08-15",
    location: "Los Osos, CA",
    capacity: 16,
    visType: "club",
    visId: "field",
    coLeads: "Sam T.",
    writeup:
      "Easy car camp on the bluffs — sunset tidepooling, group dinner, short morning hike to Valencia Peak. Zero-experience friendly.",
    itinerary: [
      { time: "Fri 5:00 PM", text: "Roll out from the Rec Center" },
      { time: "Fri 7:30 PM", text: "Camp dinner + sunset at the bluffs" },
      { time: "Sat 9:00 AM", text: "Valencia Peak hike (optional)" },
      { time: "Sat 1:00 PM", text: "Pack up, back by 3" },
    ],
    gearTemplate: "car",
    gear: GEAR_TEMPLATES.car.items.map((i) => ({ ...i })),
    cars: 5,
    tentSpots: 10,
    photos: 2,
  } satisfies Partial<Adventure>);
  b.permit = { needed: true, source: "state", link: "", notes: "" };
  b.budget.distance = 30;
  b.budget.campsiteTotal = 90;
  b.budget.foodOn = true;
  b.budget.meals = 3;

  return [
    {
      id: "trip1",
      adv: a,
      visLabel: visLabelFor(a, CLUBS, CREWS),
      status: "live",
      signups: 9,
      publishedOn: "2026-06-28",
    },
    {
      id: "trip2",
      adv: b,
      visLabel: visLabelFor(b, CLUBS, CREWS),
      status: "live",
      signups: 4,
      publishedOn: "2026-07-06",
    },
  ];
}

/** New-publish factory — the wireframe's publishedEntry(): a fresh live row,
 *  0 signups, published today. `adv` is snapshotted by the caller.
 *  TODO: backend seam — POST /trips returns the persisted row. */
let publishSeq = 0;
export function makePublishedTrip(
  adv: Adventure,
  clubs: Club[],
  crews: Crew[],
): PublishedTrip {
  publishSeq += 1;
  return {
    id: `trip-new-${publishSeq}`,
    adv,
    visLabel: visLabelFor(adv, clubs, crews),
    status: "live",
    signups: 0,
    publishedOn: new Date().toISOString().slice(0, 10),
  };
}

/** New-club factory — the wireframe's doCreateClub(): a fresh admin club built
 *  from the `nc` draft. Officers with a name become the starting roster; the
 *  creator is always the admin. `id` is a stable sequence so tests are
 *  deterministic (the wireframe used Date.now()).
 *  TODO: backend seam — POST /clubs returns the persisted row. */
let clubSeq = 0;
export function makeClub(nc: ClubDraft): Club {
  clubSeq += 1;
  return {
    id: `club-new-${clubSeq}`,
    name: nc.name.trim(),
    kind: "Club",
    role: "admin",
    category: nc.category,
    about: nc.about,
    meets: nc.meets,
    joinPolicy: nc.joinPolicy,
    duesOn: nc.duesOn,
    dues: nc.dues,
    members: nc.officers
      .filter((o) => o.name.trim())
      .map((o) => ({ name: o.name, role: o.role })),
    requests: [],
  };
}

/* ============================================================
   Past trips — the Clone library. Public past trips + trips run
   by clubs Maya is in. `by` = leader, `clubId` = which club.
   ============================================================ */
export function seedPastTrips(): PastTrip[] {
  const p1Adv = freshAdventure();
  p1Adv.dateStart = "";
  p1Adv.dateEnd = "";

  const p2Adv = freshAdventure();
  Object.assign(p2Adv, {
    name: "Pinnacles Caves Day Trip",
    dateStart: "",
    dateEnd: "",
    location: "Pinnacles NP, CA",
    capacity: 10,
    coLeads: "",
    writeup:
      "Single-day loop through the talus caves and the High Peaks — bring a headlamp, the caves are pitch black in spots. Condor sightings very likely.",
    itinerary: [
      { time: "6:30 AM", text: "Carpool from campus" },
      { time: "9:00 AM", text: "Bear Gulch caves loop" },
      { time: "12:30 PM", text: "Lunch at the reservoir" },
      { time: "4:30 PM", text: "Back on the road" },
    ],
    gearTemplate: "custom",
    gear: [
      { name: "Headlamp", required: true },
      { name: "3L water — it gets hot", required: true },
      { name: "Lunch + snacks", required: true },
      { name: "Grippy shoes", required: true },
    ],
    cars: 3,
    tentSpots: 0,
    photos: 4,
  } satisfies Partial<Adventure>);
  p2Adv.permit = { needed: true, source: "recgov", link: "", notes: "" };
  p2Adv.budget.distance = 180;
  p2Adv.budget.permitsTotal = 30;

  const p3Adv = freshAdventure();
  Object.assign(p3Adv, {
    name: "Lost Coast Weekend",
    dateStart: "",
    dateEnd: "",
    location: "King Range, CA",
    capacity: 8,
    coLeads: "",
    writeup:
      "25 miles of beach walking under the King Range — tide-table navigation, seals everywhere, and the most remote coastline in California. Moderate fitness needed; we time the impassable zones around low tide.",
    itinerary: [
      { time: "Fri 2:00 PM", text: "Long drive north, camp at the trailhead" },
      { time: "Sat 7:00 AM", text: "Shuttle cars, start the beach walk" },
      { time: "Sat PM", text: "Camp at Big Flat" },
      { time: "Sun 3:00 PM", text: "Finish at Black Sands Beach" },
    ],
    gearTemplate: "backpacking",
    gear: GEAR_TEMPLATES.backpacking.items.map((i) => ({ ...i })),
    cars: 2,
    tentSpots: 4,
    photos: 5,
  } satisfies Partial<Adventure>);
  p3Adv.permit = { needed: true, source: "recgov", link: "", notes: "" };
  p3Adv.budget.distance = 380;
  p3Adv.budget.permitsTotal = 48;
  p3Adv.budget.foodOn = true;
  p3Adv.budget.meals = 6;

  const p4Adv = freshAdventure();
  Object.assign(p4Adv, {
    name: "Jalama Beach Surf Camp",
    dateStart: "",
    dateEnd: "",
    location: "Jalama Beach, CA",
    capacity: 14,
    coLeads: "",
    writeup:
      "Two nights at Jalama county park — beginner-friendly beach break in the mornings, bonfire and famous Jalama burgers at night. Boards and wetsuits available to borrow from the club locker.",
    itinerary: [
      { time: "Fri 3:00 PM", text: "Caravan down, claim the group site" },
      { time: "Sat 7:00 AM", text: "Dawn patrol session" },
      { time: "Sat 6:00 PM", text: "Bonfire + burgers" },
      { time: "Sun 12:00 PM", text: "Last session, pack out" },
    ],
    gearTemplate: "car",
    gear: [
      { name: "Wetsuit (borrow from club)", required: true },
      { name: "Tent + sleeping bag", required: true },
      { name: "Warm layers for night", required: true },
      { name: "Sunscreen", required: true },
      { name: "Cash for burgers", required: false },
    ],
    cars: 4,
    tentSpots: 8,
    photos: 3,
  } satisfies Partial<Adventure>);
  p4Adv.permit = { needed: false, source: "", link: "", notes: "" };
  p4Adv.budget.distance = 140;
  p4Adv.budget.campsiteTotal = 220;

  const p5Adv = freshAdventure();
  Object.assign(p5Adv, {
    name: "Big Falls Swimming Hole Day",
    dateStart: "",
    dateEnd: "",
    location: "Arroyo Grande, CA",
    capacity: 20,
    coLeads: "Priya K.",
    writeup:
      "Casual half-day: 4-mile round trip to the upper falls, swim, hang out on the rocks. The single easiest trip we run — bring literally anyone.",
    itinerary: [
      { time: "9:00 AM", text: "Meet at the trailhead" },
      { time: "10:30 AM", text: "Swim + lunch at the falls" },
      { time: "2:00 PM", text: "Back at the cars" },
    ],
    gearTemplate: "custom",
    gear: [
      { name: "Swimsuit + towel", required: true },
      { name: "Water shoes", required: false },
      { name: "Lunch", required: true },
    ],
    cars: 5,
    tentSpots: 0,
    photos: 2,
  } satisfies Partial<Adventure>);
  p5Adv.permit = { needed: false, source: "", link: "", notes: "" };
  p5Adv.budget.distance = 40;
  p5Adv.budget.insuranceOn = false;

  return [
    { id: "p1", clubId: "field", by: "You", when: "Mar 2026", adv: p1Adv },
    { id: "p2", clubId: "field", by: "Jordan R.", when: "Nov 2025", adv: p2Adv },
    { id: "p3", clubId: "hiking", by: "Cal Poly Hiking", when: "Oct 2025", adv: p3Adv },
    { id: "p4", clubId: "surf", by: "Surf Club", when: "Sep 2025", adv: p4Adv },
    { id: "p5", clubId: "field", by: "You", when: "May 2025", adv: p5Adv },
  ];
}

/** The Clone library (read-only reference). */
export const PAST_TRIPS: PastTrip[] = seedPastTrips();
