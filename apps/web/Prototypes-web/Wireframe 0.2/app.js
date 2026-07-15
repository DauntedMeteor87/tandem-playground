/* ============================================================
   tandemclub web wireframe 0.2 — core
   (icons, state, data, render loop, action dispatch)
   Studio shell: Home · Create · Manage · Clone · Clubs
   ============================================================ */

const I = {
  back:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  chev:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  plus:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  x:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>`,
  img:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>`,
  info:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>`,
  link:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/></svg>`,
  tree:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l5 8h-3l4 6h-4v6h-4v-6H6l4-6H7l5-8z"/></svg>`,
  money: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  car:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16v2M19 16v2M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v3H3v-3z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/></svg>`,
  tent:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L3 20h18L12 4z"/><path d="M12 4v16"/></svg>`,
  pin:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15.5 20c0-2 .8-3.2 2-3.7"/></svg>`,
  home:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
  edit:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  copy:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>`,
  cog:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34h.01a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55h.01a1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87v.01a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.55 1z"/></svg>`,
  flag:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h13l-2.5 4L18 12H5"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  cal:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>`,
};

/* ---------- Current user ---------- */
const USER = { name: 'Maya', initials: 'M' };

/* ---------- Adventure wizard steps ---------- */
const STEPS = ['basics','writeup','itinerary','permits','budget','gear','rides','photos','preview'];
const STEP_LABEL = {
  basics:'Basics', writeup:'Write-up', itinerary:'Itinerary', permits:'Permits',
  budget:'Budget', gear:'Gear list', rides:'Rides & tent', photos:'Photos', preview:'Preview & publish',
};

/* ---------- Club wizard steps ---------- */
const CLUB_STEPS = ['basics','about','membership','officers','photo','preview'];
const CLUB_STEP_LABEL = {
  basics:'Basics', about:'About the club', membership:'Membership',
  officers:'Officers', photo:'Photo', preview:'Preview & create',
};

/* ---------- Studio navigation ---------- */
const NAV = [
  { id:'home',       label:'Home',                icon:'home' },
  { id:'create',     label:'Create an Adventure', icon:'plus' },
  { id:'manage',     label:'Manage Adventures',   icon:'edit' },
  { id:'clone',      label:'Clone an Adventure',  icon:'copy' },
  { id:'createClub', label:'Create a Club',       icon:'flag' },
  { id:'manageClub', label:'Manage a Club',       icon:'cog', adminOnly:true },
];

/* ---------- App state ---------- */
const S = {
  view: 'home', // home | create | manage | clone | createClub | manageClub
  // adventure wizard
  step: 'basics',
  visited: new Set(['basics']),
  previewTab: 'overview',
  publishOpen: false,
  published: false,       // adventure confirmation screen
  editingId: null,        // id of published adventure being edited
  cloneSource: null,      // name of trip this draft was cloned from
  // clone browser
  cloneFilter: 'all',
  // club wizard
  clubStep: 'basics',
  clubCreated: false,     // club confirmation screen
  // manage club
  manageClubId: null,
  clubTab: 'overview',
};

/* ============================================================
   Data — clubs, crews, published adventures, past trips
   All prefilled so every studio section has something real
   to manage on first load.
   ============================================================ */
const CLUBS = [
  { id:'field',  name:'Field Studies',    kind:'Club', role:'admin',
    category:'Outdoors', about:'Overnights, day hikes, and field trips for people who want to get outside without needing to already be outdoorsy.',
    meets:'Every other Tuesday, 7 PM — Rec Center Rm 12', joinPolicy:'request', duesOn:true, dues:15,
    members:[
      { name:'Maya (you)', role:'Admin' }, { name:'Jordan R.', role:'Trip lead' },
      { name:'Sam T.', role:'Treasurer' }, { name:'Priya K.', role:'Member' },
      { name:'Diego M.', role:'Member' }, { name:'Alex W.', role:'Member' },
      { name:'Noah B.', role:'Member' }, { name:'Riley S.', role:'Member' },
    ],
    requests:[ 'Casey L.', 'Morgan D.' ],
  },
  { id:'hiking', name:'Cal Poly Hiking',  kind:'Club', role:'member',
    category:'Outdoors', about:'Weekly hikes around SLO county, all paces welcome.',
    meets:'Thursdays, 6 PM — Dexter Lawn', joinPolicy:'open', duesOn:false, dues:0,
    members:[ { name:'Maya (you)', role:'Member' } ], requests:[],
  },
  { id:'surf',   name:'Surf Club',        kind:'Club', role:'member',
    category:'Water', about:'Dawn patrol and weekend surf sessions.',
    meets:'Fridays, 5 PM — Pismo Pier lot', joinPolicy:'open', duesOn:true, dues:20,
    members:[ { name:'Maya (you)', role:'Member' } ], requests:[],
  },
];
const CREWS = [
  { id:'moon',  name:'Moonlight Crew', kind:'Crew' },
  { id:'beach', name:'Beach Crew',     kind:'Crew' },
];
const MEMBER_ROLES = ['Member','Trip lead','Treasurer','Admin'];

function isClubAdmin(){ return CLUBS.some(c => c.role === 'admin'); }
function adminClubs(){ return CLUBS.filter(c => c.role === 'admin'); }

/* ---------- Permit sources ---------- */
const PERMIT_SOURCES = {
  recgov: {
    label: 'Recreation.gov',
    sub: 'Most national parks, national forests & wilderness areas with quotas',
    icon: 'shield',
    steps: [
      'Create or log into your Recreation.gov account (do this early — some areas need it days ahead).',
      'Search for the trailhead or wilderness area by name.',
      'Check the entry-date calendar — quota permits fill up fast in season.',
      'Reserve your date and pay the reservation fee.',
      'Download or print your confirmation — this is not the permit itself.',
      'Pick up the actual wilderness permit at the ranger station or trailhead kiosk before you hike. Bring photo ID.',
    ],
  },
  state: {
    label: 'State park',
    sub: 'Varies by state (ReserveCalifornia, ReserveAmerica, etc.)',
    icon: 'tree',
    steps: [
      "Find your state park system's reservation site.",
      'Search the specific campground or backcountry zone.',
      'Reserve your site or date and pay any fees.',
      'Save the confirmation email — some parks also require a self-issue permit at the entrance.',
    ],
  },
  forest: {
    label: 'National forest (self-issue)',
    sub: 'No online reservation — fill out a paper permit at the trailhead',
    icon: 'pin',
    steps: [
      "Check the forest's website to confirm a permit is required and that it's self-issue.",
      'Drive to the trailhead register box — no online reservation needed.',
      'Fill out the paper permit at the trailhead and take your copy with you.',
      'Double-check first: some forests still require a Recreation.gov reservation on top of the self-issue box.',
    ],
  },
  other: {
    label: 'Something else',
    sub: 'School land-use form, local ranger office, private land, etc.',
    icon: 'info',
    steps: [],
  },
};

const GEAR_TEMPLATES = {
  backpacking: { label:'Backpacking — summer', items:[
    { name:'Sleeping bag (0–20°F)', required:true },
    { name:'Sleeping pad', required:true },
    { name:'Backpack (40–60L)', required:true },
    { name:'Headlamp + spare batteries', required:true },
    { name:'2–3L water capacity + filter', required:true },
    { name:'Trail snacks', required:false },
    { name:'Rain shell', required:true },
    { name:'Warm layers', required:true },
    { name:'Camp shoes', required:false },
  ]},
  car: { label:'Car camping', items:[
    { name:'Tent', required:true },
    { name:'Sleeping bag', required:true },
    { name:'Pillow', required:false },
    { name:'Camp chair', required:false },
    { name:'Cooler', required:false },
    { name:'Warm layers', required:true },
    { name:'Headlamp', required:true },
  ]},
  winter: { label:'Winter', items:[
    { name:'Insulated sleeping bag (sub-0°F)', required:true },
    { name:'4-season tent', required:true },
    { name:'Traction devices / microspikes', required:true },
    { name:'Insulated layers', required:true },
    { name:'Hand & foot warmers', required:false },
    { name:'Extra socks', required:true },
    { name:'Headlamp', required:true },
  ]},
  custom: { label:'Custom', items:[] },
};

/* ---------- Fresh adventure (blank-ish draft for Create) ---------- */
function freshAdventure(){
  return {
    name: 'Sykes Hot Springs Overnight',
    dateStart: '2027-03-08', dateEnd: '2027-03-09',
    location: 'Big Sur, CA',
    capacity: 12,
    visType: 'club', visId: 'field',
    coLeads: 'Jordan R.',
    writeup: "Two-hour hike in to natural hot springs along the Big Sur coast. We'll camp riverside, cook over the fire, and hike out Sunday. This is most people's first overnight — we go at a beginner pace and handle the permit + group gear.",
    itinerary: [
      { time:'Fri 4:00 PM', text:'Meet at the Rec Center lot, load gear' },
      { time:'Sat 9:00 AM', text:'Hike in, set up camp' },
      { time:'Sat PM', text:'Cook over the fire, stargaze' },
      { time:'Sun 11:00 AM', text:'Pack out, tacos on the drive home' },
    ],
    permit: { needed: true, source: 'forest', link: '', notes: '' },
    budget: {
      distance: 100, distanceMax: 400,
      campsiteTotal: 0, campsiteMax: 500,
      permitsTotal: 0, permitsMax: 200,
      miscTotal: 0, miscMax: 200,
      foodOn: false, foodMode: 'estimate',
      meals: 2, costPerMeal: 7,
      foodItems: [],
      insuranceOn: true, insuranceCost: 5,
    },
    gearTemplate: 'backpacking',
    gear: [
      { name:'Sleeping bag (0°F)', required:true },
      { name:'Headlamp', required:true },
      { name:'2L water', required:true },
      { name:'Swimsuit + towel', required:true },
      { name:'Trail snacks', required:false },
      { name:'Layers — it gets cold', required:true },
    ],
    cars: 4, tentSpots: 6,
    photos: 3,
  };
}
let ADV = freshAdventure();

/* ---------- Fresh club (blank draft for Create a Club) ---------- */
function freshClub(){
  return {
    name: '',
    category: 'Outdoors',
    community: 'Cal Poly SLO',
    about: '',
    meets: '',
    joinPolicy: 'request', // open | request | invite
    duesOn: false, dues: 15,
    officers: [ { name: USER.name + ' (you)', role: 'Admin' } ],
    photo: 1,
  };
}
let NC = freshClub();
const CLUB_CATEGORIES = ['Outdoors','Water','Climbing','Cycling','Snow','Social','Other'];

/* ============================================================
   Published adventures (Manage) — seeded with two live trips so
   the manage screen has real rows on first load. Each entry
   snapshots the full adventure object.
   ============================================================ */
let TRIP_SEQ = 1;
function publishedEntry(adv, extra){
  return Object.assign({
    id: 'trip' + (TRIP_SEQ++),
    adv: adv,
    visLabel: visLabelFor(adv),
    status: 'live',
    signups: 0,
    publishedOn: '2026-07-01',
  }, extra || {});
}
const PUBLISHED = [];
(function seedPublished(){
  const a = freshAdventure();
  PUBLISHED.push(publishedEntry(a, { signups: 9, publishedOn: '2026-06-28' }));

  const b = freshAdventure();
  Object.assign(b, {
    name:'Montaña de Oro Car Camp', dateStart:'2026-08-14', dateEnd:'2026-08-15',
    location:'Los Osos, CA', capacity:16, visType:'club', visId:'field', coLeads:'Sam T.',
    writeup:'Easy car camp on the bluffs — sunset tidepooling, group dinner, short morning hike to Valencia Peak. Zero-experience friendly.',
    itinerary:[
      { time:'Fri 5:00 PM', text:'Roll out from the Rec Center' },
      { time:'Fri 7:30 PM', text:'Camp dinner + sunset at the bluffs' },
      { time:'Sat 9:00 AM', text:'Valencia Peak hike (optional)' },
      { time:'Sat 1:00 PM', text:'Pack up, back by 3' },
    ],
    gearTemplate:'car',
    gear: GEAR_TEMPLATES.car.items.map(i=>({...i})),
    cars: 5, tentSpots: 10, photos: 2,
  });
  b.permit = { needed:true, source:'state', link:'', notes:'' };
  b.budget.distance = 30; b.budget.campsiteTotal = 90; b.budget.foodOn = true; b.budget.meals = 3;
  PUBLISHED.push(publishedEntry(b, { signups: 4, publishedOn: '2026-07-06' }));
})();

/* ============================================================
   Past trips — the Clone library. Public past trips + trips run
   by clubs Maya is in. `by` = leader, `clubId` = which club.
   ============================================================ */
const PAST_TRIPS = [
  {
    id:'p1', clubId:'field', by:'You', when:'Mar 2026',
    adv: Object.assign(freshAdventure(), { dateStart:'', dateEnd:'' }),
  },
  {
    id:'p2', clubId:'field', by:'Jordan R.', when:'Nov 2025',
    adv: (()=>{ const a = freshAdventure(); Object.assign(a, {
      name:'Pinnacles Caves Day Trip', dateStart:'', dateEnd:'', location:'Pinnacles NP, CA',
      capacity:10, coLeads:'',
      writeup:'Single-day loop through the talus caves and the High Peaks — bring a headlamp, the caves are pitch black in spots. Condor sightings very likely.',
      itinerary:[
        { time:'6:30 AM', text:'Carpool from campus' },
        { time:'9:00 AM', text:'Bear Gulch caves loop' },
        { time:'12:30 PM', text:'Lunch at the reservoir' },
        { time:'4:30 PM', text:'Back on the road' },
      ],
      gearTemplate:'custom',
      gear:[
        { name:'Headlamp', required:true },
        { name:'3L water — it gets hot', required:true },
        { name:'Lunch + snacks', required:true },
        { name:'Grippy shoes', required:true },
      ],
      cars:3, tentSpots:0, photos:4,
    }); a.permit = { needed:true, source:'recgov', link:'', notes:'' };
    a.budget.distance = 180; a.budget.permitsTotal = 30; return a; })(),
  },
  {
    id:'p3', clubId:'hiking', by:'Cal Poly Hiking', when:'Oct 2025',
    adv: (()=>{ const a = freshAdventure(); Object.assign(a, {
      name:'Lost Coast Weekend', dateStart:'', dateEnd:'', location:'King Range, CA',
      capacity:8, coLeads:'',
      writeup:'25 miles of beach walking under the King Range — tide-table navigation, seals everywhere, and the most remote coastline in California. Moderate fitness needed; we time the impassable zones around low tide.',
      itinerary:[
        { time:'Fri 2:00 PM', text:'Long drive north, camp at the trailhead' },
        { time:'Sat 7:00 AM', text:'Shuttle cars, start the beach walk' },
        { time:'Sat PM', text:'Camp at Big Flat' },
        { time:'Sun 3:00 PM', text:'Finish at Black Sands Beach' },
      ],
      gearTemplate:'backpacking',
      gear: GEAR_TEMPLATES.backpacking.items.map(i=>({...i})),
      cars:2, tentSpots:4, photos:5,
    }); a.permit = { needed:true, source:'recgov', link:'', notes:'' };
    a.budget.distance = 380; a.budget.permitsTotal = 48; a.budget.foodOn = true; a.budget.meals = 6; return a; })(),
  },
  {
    id:'p4', clubId:'surf', by:'Surf Club', when:'Sep 2025',
    adv: (()=>{ const a = freshAdventure(); Object.assign(a, {
      name:'Jalama Beach Surf Camp', dateStart:'', dateEnd:'', location:'Jalama Beach, CA',
      capacity:14, coLeads:'',
      writeup:'Two nights at Jalama county park — beginner-friendly beach break in the mornings, bonfire and famous Jalama burgers at night. Boards and wetsuits available to borrow from the club locker.',
      itinerary:[
        { time:'Fri 3:00 PM', text:'Caravan down, claim the group site' },
        { time:'Sat 7:00 AM', text:'Dawn patrol session' },
        { time:'Sat 6:00 PM', text:'Bonfire + burgers' },
        { time:'Sun 12:00 PM', text:'Last session, pack out' },
      ],
      gearTemplate:'car',
      gear:[
        { name:'Wetsuit (borrow from club)', required:true },
        { name:'Tent + sleeping bag', required:true },
        { name:'Warm layers for night', required:true },
        { name:'Sunscreen', required:true },
        { name:'Cash for burgers', required:false },
      ],
      cars:4, tentSpots:8, photos:3,
    }); a.permit = { needed:false, source:'', link:'', notes:'' };
    a.budget.distance = 140; a.budget.campsiteTotal = 220; return a; })(),
  },
  {
    id:'p5', clubId:'field', by:'You', when:'May 2025',
    adv: (()=>{ const a = freshAdventure(); Object.assign(a, {
      name:'Big Falls Swimming Hole Day', dateStart:'', dateEnd:'', location:'Arroyo Grande, CA',
      capacity:20, coLeads:'Priya K.',
      writeup:'Casual half-day: 4-mile round trip to the upper falls, swim, hang out on the rocks. The single easiest trip we run — bring literally anyone.',
      itinerary:[
        { time:'9:00 AM', text:'Meet at the trailhead' },
        { time:'10:30 AM', text:'Swim + lunch at the falls' },
        { time:'2:00 PM', text:'Back at the cars' },
      ],
      gearTemplate:'custom',
      gear:[
        { name:'Swimsuit + towel', required:true },
        { name:'Water shoes', required:false },
        { name:'Lunch', required:true },
      ],
      cars:5, tentSpots:0, photos:2,
    }); a.permit = { needed:false, source:'', link:'', notes:'' };
    a.budget.distance = 40; a.budget.insuranceOn = false; return a; })(),
  },
];

/* ---------- Helpers ---------- */
const el = (id) => document.getElementById(id);
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
function deepCopy(o){ return JSON.parse(JSON.stringify(o)); }
function fmtDate(iso){
  if(!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
}
const GAS_RATE_PER_MILE = 0.30;
function gasPerPerson(){
  return Math.round((ADV.budget.distance * ADV.cars * GAS_RATE_PER_MILE) / Math.max(1, ADV.capacity));
}
function splitPerPerson(total){ return Math.round(total / Math.max(1, ADV.capacity)); }
function foodPerPerson(){
  const b = ADV.budget;
  if (!b.foodOn) return 0;
  if (b.foodMode === 'itemized') return b.foodItems.reduce((s,i)=>s+Number(i.cost||0), 0);
  return b.meals * b.costPerMeal;
}
function budgetBreakdown(){
  const b = ADV.budget;
  const rows = [];
  const gas = gasPerPerson(); if (gas>0) rows.push(['Gas — carpool split', gas]);
  const campsite = splitPerPerson(b.campsiteTotal); if (campsite>0) rows.push(['Campsite (split)', campsite]);
  const permits = splitPerPerson(b.permitsTotal); if (permits>0) rows.push(['Permits (split)', permits]);
  const food = foodPerPerson(); if (food>0) rows.push(['Food', food]);
  const misc = splitPerPerson(b.miscTotal); if (misc>0) rows.push(['Misc', misc]);
  if (b.insuranceOn && b.insuranceCost>0) rows.push(['Injury insurance', b.insuranceCost]);
  return rows;
}
function budgetTotal(){ return budgetBreakdown().reduce((sum,[,v])=>sum+v, 0); }
function visLabelFor(adv){
  const list = adv.visType==='club' ? CLUBS : CREWS;
  const found = list.find(x=>x.id===adv.visId);
  return found ? found.name : 'Choose one';
}
function visLabel(){ return visLabelFor(ADV); }
function joinPolicyLabel(p){
  return { open:'Open — anyone can join', request:'Request — admins approve', invite:'Invite only' }[p] || p;
}

/* ---------- Render ---------- */
function render(){
  let html;
  switch (S.view) {
    case 'home':       html = renderHome(); break;
    case 'create':     html = renderPlanAdventure(); break;
    case 'manage':     html = renderManageAdventures(); break;
    case 'clone':      html = renderCloneAdventure(); break;
    case 'createClub': html = renderCreateClub(); break;
    case 'manageClub': html = renderManageClub(); break;
    default:           html = renderHome();
  }
  el('screen').innerHTML = html;
  mountStep();
}

function mountStep(){
  if (S.view === 'create' && S.step === 'budget') mountBudgetSliders();
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg){
  const t = el('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------- View + step navigation ---------- */
function goView(view){
  S.view = view;
  render();
  window.scrollTo(0,0);
}
function goStep(step){
  S.step = step;
  S.visited.add(step);
  render();
  window.scrollTo(0,0);
}
function stepIndex(step){ return STEPS.indexOf(step); }
function nextStep(){
  const i = stepIndex(S.step);
  if (i < STEPS.length-1) goStep(STEPS[i+1]);
}
function prevStep(){
  const i = stepIndex(S.step);
  if (i > 0) goStep(STEPS[i-1]);
}
/* fresh wizard for Create / Clone / Edit entry points */
function resetWizard(){
  S.step = 'basics'; S.visited = new Set(['basics']);
  S.previewTab = 'overview'; S.publishOpen = false; S.published = false;
}

/* ---------- Global interaction handling ---------- */
document.addEventListener('click', (e)=>{
  const act = e.target.closest('[data-action]');
  if (act){ handleAction(act.dataset.action, act.dataset.param, act); return; }
  if (e.target.classList && e.target.classList.contains('sheet-overlay')) closePublishOverlay();
});
document.addEventListener('input', (e)=>{
  const key = e.target.dataset && e.target.dataset.bind;
  if (key) { handleBind(key, e.target); if (typeof refreshBudgetTotals === 'function') refreshBudgetTotals(); }
});
document.addEventListener('change', (e)=>{
  const key = e.target.dataset && e.target.dataset.bindchange;
  if (key) handleBind(key, e.target);
});
function closePublishOverlay(){ if (S.publishOpen){ S.publishOpen = false; render(); } }

const ACTIONS = {};
function handleAction(action, param, node){
  if (ACTIONS[action]) { ACTIONS[action](param, node); return; }
  console.warn('No handler for action', action);
}
/* handleBind(key, node) lives in screens.js */

window.addEventListener('DOMContentLoaded', render);
