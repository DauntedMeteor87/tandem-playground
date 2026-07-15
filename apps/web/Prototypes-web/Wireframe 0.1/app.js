/* ============================================================
   tandemclub web wireframe 0.1 — core
   (icons, state, render loop, action dispatch)
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
};

/* ---------- App state ---------- */
const STEPS = ['basics','writeup','itinerary','permits','budget','gear','rides','photos','preview'];
const STEP_LABEL = {
  basics:'Basics', writeup:'Write-up', itinerary:'Itinerary', permits:'Permits',
  budget:'Budget', gear:'Gear list', rides:'Rides & tent', photos:'Photos', preview:'Preview & publish',
};

const S = {
  appView: 'wizard', // 'wizard' | 'home'
  step: 'basics',
  visited: new Set(['basics']),
  previewTab: 'overview',
  publishOpen: false,
  published: false,
  publishedTrips: [], // snapshots of everything published this session, for the Home landing
};

/* Prefilled with the same Sykes Hot Springs Overnight trip already shown
   in the mobile prototype's trip-hub, so the web preview step matches
   what members would actually see. A factory (not a plain object) so
   "Start another adventure" can hand back an untouched copy. */
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

const CLUBS = [
  { id:'field', name:'Field Studies', kind:'Club' },
  { id:'hiking', name:'Cal Poly Hiking', kind:'Club' },
  { id:'surf', name:'Surf Club', kind:'Club' },
];
const CREWS = [
  { id:'moon', name:'Moonlight Crew', kind:'Crew' },
  { id:'beach', name:'Beach Crew', kind:'Crew' },
];

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

/* ---------- Helpers ---------- */
const el = (id) => document.getElementById(id);
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
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
/* [label, value] rows, only the ones that actually cost something */
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
function visLabel(){
  const list = ADV.visType==='club' ? CLUBS : CREWS;
  const found = list.find(x=>x.id===ADV.visId);
  return found ? found.name : 'Choose one';
}

/* ---------- Render ---------- */
function render(){
  const html = S.appView === 'home' ? renderHome() : renderPlanAdventure();
  el('screen').innerHTML = html;
  mountStep();
}

function mountStep(){
  if (S.step === 'budget') mountBudgetSliders();
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg){
  const t = el('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------- Step navigation ---------- */
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

/* ---------- Global interaction handling ---------- */
document.addEventListener('click', (e)=>{
  const act = e.target.closest('[data-action]');
  if (act){ handleAction(act.dataset.action, act.dataset.param, act); return; }
  if (e.target.classList && e.target.classList.contains('sheet-overlay')) closePublish();
});
document.addEventListener('input', (e)=>{
  const key = e.target.dataset && e.target.dataset.bind;
  if (key) { handleBind(key, e.target); if (typeof refreshBudgetTotals === 'function') refreshBudgetTotals(); }
});

const ACTIONS = {};
function handleAction(action, param, node){
  if (ACTIONS[action]) { ACTIONS[action](param, node); return; }
  console.warn('No handler for action', action);
}
/* handleBind(key, node) is defined in screens.js — it updates ADV state
   directly from the input without a full re-render, so typing keeps focus. */

window.addEventListener('DOMContentLoaded', render);
