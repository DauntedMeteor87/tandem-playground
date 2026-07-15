/* ============================================================
   tandemclub wireframe prototype — core (state, router, chrome)
   ============================================================ */

/* ---------- Inline icon set (greyscale, currentColor) ---------- */
const I = {
  back:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  chev:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  down:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  person:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
  bell:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>`,
  home:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
  trips: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  plan:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
  comm:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15.5 20c0-2 .8-3.2 2-3.7"/></svg>`,
  img:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>`,
  cam:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.4"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>`,
  cmt:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H9l-5 4V5a1 1 0 011-1z"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"/><path d="M12 15V3M8 7l4-4 4 4"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.6zM14.3 6.1c.6-.8 1-1.9.9-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.8 1.1.1 2.2-.5 2.9-1.3z"/></svg>`,
  lock:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>`,
  x:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  plus:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  pin:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>`,
  cal:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>`,
  patch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18.7l.9-5.4L4.2 8.7l5.4-.8L12 3z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  flag:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/></svg>`,
  chat:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5z"/></svg>`,
  map:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  car:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16v2M19 16v2M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v3H3v-3z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/></svg>`,
  tent:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L3 20h18L12 4z"/><path d="M12 4v16"/></svg>`,
};

/* ---------- Demo data (greyscale, fictional) ---------- */
const TRIPS = {
  sykes:    { id:'sykes',   title:'Sykes Hot Springs Overnight', club:'Field Studies', kind:'Adventure', when:'Sat–Sun · Mar 8', diff:'Moderate', beginner:true,  cost:'$18', spots:'6 spots left', mode:'lottery', going:['MP','JR','AL','DT'], goingN:8, mutuals:2, place:'Big Sur, CA', desc:'Two-hour hike in to natural hot springs. Camp riverside, cook over the fire, hike out Sunday. We handle permits + group gear.' },
  bishop:   { id:'bishop',  title:'Bishop Peak Sunset Hike',     club:'Cal Poly Hiking', kind:'Activity', when:'Thu · 5:30 PM', diff:'Easy', beginner:true, cost:'Free', spots:'Open', mode:'join', going:['KM','RS','JL'], goingN:12, mutuals:4, place:'San Luis Obispo', desc:'Chill after-class hike up Bishop. Great first trip if you don\'t know anyone yet — we go slow and grab tacos after.' },
  surf:     { id:'surf',    title:'Dawn Patrol Surf — Pismo',    club:'Surf Club', kind:'Activity', when:'Fri · 6:00 AM', diff:'Easy', beginner:true, cost:'Free', spots:'3 spots left', mode:'join', going:['TW','MB'], goingN:6, mutuals:1, place:'Pismo Beach', desc:'Boards provided for beginners. We\'ll get you standing up by the end of the session.' },
  ski:      { id:'ski',     title:'Mammoth Ski Weekend',         club:'Ski & Snowboard', kind:'Adventure', when:'Fri–Sun · Mar 21', diff:'Hard', beginner:false, cost:'$140', spots:'Full — waitlist', mode:'lottery', going:['DT','AL','KM','RS'], goingN:22, mutuals:5, place:'Mammoth Lakes', desc:'Two nights, cabin split, lift tickets included. Intermediate+ — you should be comfortable on blues.' },
  climb:    { id:'climb',   title:'Bouldering @ The Pad',        club:'Climbing Club', kind:'Activity', when:'Tue · 7:00 PM', diff:'Easy', beginner:true, cost:'Free', spots:'Open', mode:'join', going:['JR','MP'], goingN:9, mutuals:2, place:'SLO Bouldering', desc:'Indoor session, all levels. Rentals covered by the club for members.' },
};
const CLUBS = {
  field: { id:'field', name:'Field Studies', members:134, kind:'Club', school:true, dues:'$25 / yr', blurb:'Overnight backcountry trips, every other weekend.' },
  hiking:{ id:'hiking', name:'Cal Poly Hiking', members:412, kind:'Club', school:true, dues:'Free', blurb:'Weekly hikes, all levels welcome.' },
  surf:  { id:'surf', name:'Surf Club', members:208, kind:'Club', school:true, dues:'$15 / yr', blurb:'Dawn patrols + weekend trips up the coast.' },
  moon:  { id:'moon', name:'Moonlight Crew', members:9, kind:'Crew', school:false, dues:'Free', blurb:'Small friend group — night hikes & stargazing.' },
};
const PEOPLE = {
  maya:  { id:'maya', name:'Maya P.', year:'Sophomore', bio:'Backpacker, always down for a sunrise summit.', trips:14, certs:['WFA','CPR'], shared:['Field Studies','Surf Club'] },
  jordan:{ id:'jordan', name:'Jordan R.', year:'Junior', bio:'Climber & film photographer.', trips:23, certs:['WFR','CPR'], shared:['Climbing Club'] },
};
const NOTIFS = [
  { icon:'plane', t:'New trip published', s:'Field Studies just posted “Sykes Hot Springs”', go:'trip', param:'sykes', unread:true },
  { icon:'person', t:'Josh followed you back', s:'Say hey 👋', go:'profile-other', param:'jordan', unread:true },
  { icon:'check', t:'Roster finalized', s:'You\'re in for Bishop Peak Sunset Hike', go:'packet', param:'bishop', unread:false },
  { icon:'car', t:'Driver canceled', s:'A seat reopened on Mammoth Ski — riders notified', go:'packet', param:'ski', unread:false },
];

/* ---------- App state ---------- */
const S = {
  screen: 'ob-login',
  params: {},
  stack: [],
  tab: null,
  verified: false,
  joined: {},            // tripId -> 'joined' | 'entered'
  members: { hiking:true }, // clubs you belong to
  ob: { name:'', year:'', interests:[], bio:'' },
};

/* ---------- Helpers ---------- */
const el = (id) => document.getElementById(id);
function avatar(initials, size=34){ return `<span class="avatar" style="width:${size}px;height:${size}px;font-size:${Math.round(size*0.38)}px">${initials}</span>`; }
function stack(list, size=30){ return `<span class="stack">${list.map(i=>avatar(i,size)).join('')}</span>`; }
function phImg(cls='', h){ const style = h?`style="height:${h}px"`:''; return `<div class="ph ${cls}" ${style}>${I.img}</div>`; }

function tripCard(t){
  return `<button class="card tripcard" data-nav="trip" data-param="${t.id}">
    ${phImg('', 150)}
    <div class="tripcard__meta">
      <div class="tripcard__title">${t.title}</div>
      <div class="tripcard__row">${stack(t.going.slice(0,3),22)}<span class="tripcard__club">${t.goingN} going · ${t.mutuals} you know</span></div>
      <div class="tripcard__row" style="margin-top:8px;justify-content:space-between">
        <span class="tag">${t.kind}</span>
        <span class="small muted">${t.when} · ${t.cost}</span>
      </div>
    </div>
  </button>`;
}

/* ---------- Chrome ---------- */
function statusbar(){
  return `<div class="statusbar"><span>9:41</span>
    <span class="sb-right"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4.5" y="5" width="3" height="7" rx="1"/><rect x="9" y="2.5" width="3" height="9.5" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" stroke-width="1"><rect x="1" y="1.5" width="19" height="9" rx="2.5"/><rect x="2.5" y="3" width="14" height="6" rx="1.2" fill="currentColor"/><rect x="21" y="4" width="1.5" height="4" rx="1" fill="currentColor"/></svg></span></div>`;
}
function topbar(title){
  return `<div class="topbar">
    <button class="avatar-btn" data-nav="profile-me" title="Profile">${avatar('YU',34)}</button>
    <div class="topbar__title">${title}</div>
    <div class="topbar__actions">
      <button class="iconbtn" data-nav="messages">${I.plane}<span class="badge">3</span></button>
      <button class="iconbtn" data-nav="notifs">${I.bell}<span class="badge">2</span></button>
    </div>
  </div>`;
}
function tabbar(active){
  const items = [['home','Home',I.home],['mytrips','My Trips',I.trips],['plan','Plan',I.plan],['communities','Communities',I.comm]];
  return `<nav class="tabbar">${items.map(([id,label,icon])=>
    `<button class="tabbar__item ${active===id?'active':''}" data-nav="${id}">${icon}<span>${label}</span></button>`).join('')}</nav>`;
}
function pageHeader(title, backTo){
  return `<div class="topbar">
    <button class="iconbtn" data-action="back">${I.back}</button>
    <div class="topbar__title" style="font-size:18px">${title}</div>
    <span style="width:34px"></span>
  </div>`;
}

/* ---------- Router ---------- */
function navigate(id, param){
  if (S.screen) S.stack.push({ screen: S.screen, params: S.params, tab: S.tab });
  S.screen = id; S.params = param!==undefined ? { id: param } : {};
  const TABS = ['home','mytrips','plan','communities'];
  if (TABS.includes(id)) { S.tab = id; }
  render();
}
function back(){
  const prev = S.stack.pop();
  if (prev){ S.screen = prev.screen; S.params = prev.params; S.tab = prev.tab; render(); }
}
function replace(id, param){ S.screen = id; S.params = param!==undefined?{id:param}:{}; render(); }

function render(){
  const fn = SCREENS[S.screen];
  const html = fn ? fn(S.params) : `<div class="pad mt6">Missing screen: ${S.screen}</div>`;
  const wide = WIDE_SCREENS.has(S.screen);
  document.body.classList.toggle('wide', wide);
  const screenEl = el('screen');
  screenEl.innerHTML = (wide ? '' : statusbar()) + html;
  screenEl.scrollTop = 0;
  const sc = screenEl.querySelector('.scroll'); if (sc) sc.scrollTop = 0;
  // run optional mount hook
  if (fn && fn.mount) fn.mount(S.params);
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg){
  let t = el('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------- Sheets ---------- */
function openSheet(html){
  const o = document.createElement('div');
  o.className = 'sheet-overlay'; o.id='sheet';
  o.innerHTML = `<div class="sheet"><div class="sheet__grip"></div>${html}</div>`;
  o.addEventListener('click', e=>{ if(e.target===o) closeSheet(); });
  el('screen').appendChild(o);
}
function closeSheet(){ const s = el('sheet'); if(s) s.remove(); }

/* ---------- Global interaction handling (event delegation) ---------- */
document.addEventListener('click', (e)=>{
  const nav = e.target.closest('[data-nav]');
  if (nav){ navigate(nav.dataset.nav, nav.dataset.param); return; }
  const act = e.target.closest('[data-action]');
  if (act){ handleAction(act.dataset.action, act.dataset.param, act); return; }
});

function handleAction(action, param, node){
  switch(action){
    case 'back': back(); break;
    case 'close-sheet': closeSheet(); break;
    case 'toast': toast(param); break;
    default:
      if (ACTIONS[action]) ACTIONS[action](param, node);
  }
}

/* screen-specific actions live here, filled by screens.js */
const ACTIONS = {};
const WIDE_SCREENS = new Set(['plan-desktop','create-desktop']);

/* ---------- Boot ---------- */
window.addEventListener('DOMContentLoaded', render);
