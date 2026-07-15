/* ============================================================
   tandemclub wireframe prototype 0.2 — core
   (state, router, chrome, notifications dropdown, swipe hub engine)
   ============================================================ */

/* ---------- Inline icon set (greyscale, currentColor) ---------- */
const I = {
  back:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  chev:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  down:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  up:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`,
  left:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  right: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  person:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15.5 20c0-2 .8-3.2 2-3.7"/></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
  edit:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
  bell:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>`,
  home:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
  trips: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  plan:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
  comm:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15.5 20c0-2 .8-3.2 2-3.7"/></svg>`,
  img:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>`,
  cam:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.4"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>`,
  hearto:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>`,
  cmt:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H9l-5 4V5a1 1 0 011-1z"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"/><path d="M12 15V3M8 7l4-4 4 4"/></svg>`,
  expand:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.6zM14.3 6.1c.6-.8 1-1.9.9-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.8 1.1.1 2.2-.5 2.9-1.3z"/></svg>`,
  lock:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>`,
  x:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  plus:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  pin:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>`,
  cal:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>`,
  patch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18.7l.9-5.4L4.2 8.7l5.4-.8L12 3z"/></svg>`,
  smile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3-1 4-1 6a2.5 2.5 0 005 0c0-.6-.2-1.2-.5-1.7C17 9 18 11 18 13a6 6 0 11-12 0c0-3 2.5-4.5 3.5-7 .6 1.4 1.5 1.8 1.5 3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  flag:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/></svg>`,
  chat:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5z"/></svg>`,
  map:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  car:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16v2M19 16v2M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v3H3v-3z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/></svg>`,
  tent:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L3 20h18L12 4z"/><path d="M12 4v16"/></svg>`,
  money: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>`,
};

/* ---------- Demo data (greyscale, fictional) ---------- */
const TRIPS = {
  sykes:  { id:'sykes', title:'Sykes Hot Springs Overnight', club:'Field Studies', kind:'Adventure', when:'Sat–Sun · Mar 8', diff:'Moderate', beginner:true, cost:'$18', spots:'6 spots left', mode:'lottery', going:['MP','JR','AL','DT'], goingN:8, mutuals:2, place:'Big Sur, CA', lead:'maya', patch:'Hot Springs',
    desc:'Two-hour hike in to natural hot springs. Camp riverside, cook over the fire, hike out Sunday. We handle permits + group gear.',
    roster:['maya','jordan','alex','kai','riley','taylor'] },
  bishop: { id:'bishop', title:'Bishop Peak Sunset Hike', club:'Cal Poly Hiking', kind:'Activity', when:'Thu · 5:30 PM', diff:'Easy', beginner:true, cost:'Free', spots:'Open', mode:'join', going:['KM','RS','JL'], goingN:12, mutuals:4, place:'San Luis Obispo', lead:'jordan', patch:'Sunset Summit',
    desc:"Chill after-class hike up Bishop. Great first trip if you don't know anyone yet — we go slow and grab tacos after.",
    roster:['jordan','kai','riley','alex','taylor'] },
  surf:   { id:'surf', title:'Dawn Patrol Surf — Pismo', club:'Surf Club', kind:'Activity', when:'Fri · 6:00 AM', diff:'Easy', beginner:true, cost:'Free', spots:'3 spots left', mode:'join', going:['TW','MB'], goingN:6, mutuals:1, place:'Pismo Beach', lead:'taylor', patch:'First Wave',
    desc:"Boards provided for beginners. We'll get you standing up by the end of the session.",
    roster:['taylor','maya','kai'] },
  ski:    { id:'ski', title:'Mammoth Ski Weekend', club:'Ski & Snowboard', kind:'Adventure', when:'Fri–Sun · Mar 21', diff:'Hard', beginner:false, cost:'$140', spots:'Full — waitlist', mode:'lottery', going:['DT','AL','KM','RS'], goingN:22, mutuals:5, place:'Mammoth Lakes', lead:'alex', patch:'Powder Day',
    desc:'Two nights, cabin split, lift tickets included. Intermediate+ — you should be comfortable on blues.',
    roster:['alex','riley','kai','jordan','maya','taylor'] },
  climb:  { id:'climb', title:'Bouldering @ The Pad', club:'Climbing Club', kind:'Activity', when:'Tue · 7:00 PM', diff:'Easy', beginner:true, cost:'Free', spots:'Open', mode:'join', going:['JR','MP'], goingN:9, mutuals:2, place:'SLO Bouldering', lead:'jordan', patch:'Send It',
    desc:'Indoor session, all levels. Rentals covered by the club for members.',
    roster:['jordan','maya','riley'] },
};
const CLUBS = {
  field: { id:'field', name:'Field Studies', members:134, kind:'Club', school:true, dues:'$25 / yr', blurb:'Overnight backcountry trips, every other weekend.' },
  hiking:{ id:'hiking', name:'Cal Poly Hiking', members:412, kind:'Club', school:true, dues:'Free', blurb:'Weekly hikes, all levels welcome.' },
  surf:  { id:'surf', name:'Surf Club', members:208, kind:'Club', school:true, dues:'$15 / yr', blurb:'Dawn patrols + weekend trips up the coast.' },
};
const CREWS = {
  moon:  { id:'moon', name:'Moonlight Crew', members:9, sub:'night hikes & stargazing', hearted:true },
  beach: { id:'beach', name:'Beach Crew', members:14, sub:'dawn patrols & bonfires', hearted:true },
  send:  { id:'send', name:'Send Club', members:6, sub:'gym + outdoor climbing', hearted:true },
  tahoe: { id:'tahoe', name:'Tahoe Trip Crew', members:11, sub:'from the Feb ski weekend', hearted:false },
  taco:  { id:'taco', name:'Taco Thursday', members:7, sub:'post-hike tacos, always', hearted:false },
};
const PEOPLE = {
  maya:  { id:'maya', name:'Maya P.', year:'Sophomore', role:'Trip lead', bio:'Backpacker, always down for a sunrise summit.', trips:14, certs:['WFA','CPR'], shared:['Field Studies','Surf Club'], mutual:true, from:'Bend, OR', major:'Environmental Science' },
  jordan:{ id:'jordan', name:'Jordan R.', year:'Junior', role:'Trip lead', bio:'Climber & film photographer.', trips:23, certs:['WFR','CPR'], shared:['Climbing Club'], mutual:true, from:'Denver, CO', major:'Architecture' },
  alex:  { id:'alex', name:'Alex L.', year:'Senior', role:'Member', bio:'Skier chasing the next storm.', trips:19, certs:['CPR'], shared:['Ski & Snowboard'], mutual:false, from:'Truckee, CA', major:'Business' },
  kai:   { id:'kai', name:'Kai M.', year:'Freshman', role:'Member', bio:'First year, first trips — down for anything.', trips:2, certs:[], shared:['Cal Poly Hiking'], mutual:true, from:'Honolulu, HI', major:'Undeclared' },
  riley: { id:'riley', name:'Riley S.', year:'Sophomore', role:'Member', bio:'Trail runner + coffee snob.', trips:8, certs:['WFA'], shared:['Cal Poly Hiking'], mutual:true, from:'Sacramento, CA', major:'Kinesiology' },
  taylor:{ id:'taylor', name:'Taylor W.', year:'Junior', role:'Member', bio:'Surfs before class, most days.', trips:11, certs:['CPR'], shared:['Surf Club'], mutual:false, from:'San Diego, CA', major:'Marine Bio' },
};
const FRIENDS = ['maya','kai','riley','jordan'];
const NOTIFS = [
  { icon:'plane',  t:'New trip published', s:'Field Studies posted "Sykes Hot Springs"', go:'trip', param:'sykes', unread:true },
  { icon:'person', t:'Kai added you back', s:'Say hey 👋', go:'profile-other', param:'kai', unread:true },
  { icon:'flame',  t:"You're on a 3-week streak", s:'One more trip keeps it alive', go:'mytrips', param:'', unread:true },
  { icon:'check',  t:'Roster finalized', s:"You're in for Bishop Peak Sunset Hike", go:'trip-hub', param:'bishop', unread:false },
  { icon:'car',    t:'Driver canceled', s:'A seat reopened on Mammoth Ski — riders notified', go:'trip-hub', param:'ski', unread:false },
];

/* ---------- App state ---------- */
const S = {
  screen: 'ob-login',
  params: {},
  stack: [],
  tab: null,
  verified: false,
  joined: { bishop:'joined' },  // tripId -> 'joined' | 'entered'
  members: { hiking:true },     // clubs you belong to
  hubCell: 'c',
  ob: { name:'', year:'', major:'', from:'', activities:[], bio:'', pfp:false },
};

/* ---------- Helpers ---------- */
const el = (id) => document.getElementById(id);
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
function avatar(initials, size=34){ return `<span class="avatar" style="width:${size}px;height:${size}px;font-size:${Math.round(size*0.38)}px">${initials}</span>`; }
function pInit(id){ const p=PEOPLE[id]; return p? p.name.split(' ').map(w=>w[0]).join('') : '??'; }
function stack(list, size=30){ return `<span class="stack">${list.map(i=>avatar(i,size)).join('')}</span>`; }
function phImg(cls='', h){ const style = h?`style="height:${h}px"`:''; return `<div class="ph ${cls}" ${style}>${I.img}</div>`; }

function tripCard(t, sm){
  return `<button class="card tripcard ${sm?'tripcard--sm':''}" data-nav="trip" data-param="${t.id}">
    ${phImg('', sm?104:150)}
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
      <button class="iconbtn" data-action="openNotifs">${I.bell}<span class="badge">3</span></button>
    </div>
  </div>`;
}
function tabbar(active){
  const items = [['home','Home',I.home],['mytrips','My Trips',I.trips],['plan','Plan',I.plan],['communities','Communities',I.comm]];
  return `<nav class="tabbar">${items.map(([id,label,icon])=>
    `<button class="tabbar__item ${active===id?'active':''}" data-nav="${id}">${icon}<span>${label}</span></button>`).join('')}</nav>`;
}
function pageHeader(title){
  return `<div class="topbar">
    <button class="iconbtn" data-action="back">${I.back}</button>
    <div class="topbar__title" style="font-size:18px">${title}</div>
    <span style="width:34px"></span>
  </div>`;
}

/* ---------- Router ---------- */
function navigate(id, param){
  closePop();
  if (S.screen) S.stack.push({ screen: S.screen, params: S.params, tab: S.tab });
  S.screen = id; S.params = param!==undefined ? { id: param } : {};
  if (id==='trip-hub') S.hubCell='c';
  const TABS = ['home','mytrips','plan','communities'];
  if (TABS.includes(id)) { S.tab = id; }
  render();
}
function back(){
  closePop();
  const prev = S.stack.pop();
  if (prev){ S.screen = prev.screen; S.params = prev.params; S.tab = prev.tab; if(S.screen==='trip-hub')S.hubCell='c'; render(); }
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
  closeSheet();
  const o = document.createElement('div');
  o.className = 'sheet-overlay'; o.id='sheet';
  o.innerHTML = `<div class="sheet"><div class="sheet__grip"></div>${html}</div>`;
  o.addEventListener('click', e=>{ if(e.target===o) closeSheet(); });
  el('screen').appendChild(o);
}
function closeSheet(){ const s = el('sheet'); if(s) s.remove(); }

/* ---------- Notifications dropdown (overlay) ---------- */
function openNotifs(){
  closePop();
  const five = NOTIFS.slice(0,5);
  const o = document.createElement('div');
  o.className = 'pop-overlay'; o.id='pop';
  o.innerHTML = `<div class="notif-pop">
      <div class="notif-pop__head"><span class="strong">Notifications</span><span class="small muted">${NOTIFS.filter(n=>n.unread).length} new</span></div>
      ${five.map(n=>`<button class="np-row" data-nav="${n.go}" ${n.param?`data-param="${n.param}"`:''}>
        <div class="avatar">${I[n.icon]||I.bell}</div>
        <div style="flex:1"><div class="t">${n.t} ${n.unread?'<span style="display:inline-block;width:7px;height:7px;background:var(--c-fill);border-radius:50%;margin-left:2px;vertical-align:middle"></span>':''}</div><div class="s">${n.s}</div></div>
      </button>`).join('')}
      <button class="notif-pop__all" data-action="seeAllNotifs">See all notifications</button>
    </div>`;
  o.addEventListener('click', e=>{ if(e.target===o) closePop(); });
  el('screen').appendChild(o);
}
function closePop(){ const p = el('pop'); if(p) p.remove(); }

/* ============================================================
   TRIP HUB — swipe engine (joystick / d-pad model)
   Center = chat.  Swipe/press UP = Overview, DOWN = Rides & Tent,
   LEFT = More details, RIGHT = Who's going.  Tap the edge chips,
   drag, or use arrow keys.
   ============================================================ */
const HUB_BASE = { c:[0,0], u:[0,100], d:[0,-100], l:[100,0], r:[-100,0] };
function applyHubTransform(track, cell, ox=0, oy=0){
  const b = HUB_BASE[cell] || [0,0];
  track.style.transform = `translate(calc(${b[0]}% + ${ox}px), calc(${b[1]}% + ${oy}px))`;
}
function hubGo(cell){
  const track = el('screen').querySelector('.hub__track');
  if(!track) return;
  S.hubCell = cell;
  track.classList.remove('dragging');
  applyHubTransform(track, cell);
}
function mountHub(){
  const hub = el('screen').querySelector('.hub');
  if(!hub) return;
  const track = hub.querySelector('.hub__track');
  S.hubCell = S.hubCell || 'c';
  applyHubTransform(track, S.hubCell);

  let sx=0, sy=0, axis=null, active=false, inScroll=false, ox=0, oy=0;
  const dim = () => ({ W: hub.clientWidth, H: hub.clientHeight });

  function start(x,y,target){
    if(el('pop')||el('sheet')) return;
    sx=x; sy=y; axis=null; active=true; ox=0; oy=0;
    inScroll = !!(target.closest && target.closest('[data-scrollable]'));
    track.classList.add('dragging');
  }
  function move(x,y,ev){
    if(!active) return;
    let dx=x-sx, dy=y-sy;
    if(!axis){
      if(Math.abs(dx)<8 && Math.abs(dy)<8) return;
      axis = Math.abs(dx)>Math.abs(dy) ? 'x' : 'y';
      if(axis==='y' && inScroll){ active=false; track.classList.remove('dragging'); return; } // let native scroll
    }
    const {W,H}=dim(); const c=S.hubCell;
    // joystick: track moves opposite the finger; clamp to legal transitions
    let tx=0, ty=0;
    if(axis==='x'){
      let d = -dx;
      if(c==='c') tx = clamp(d, -W, W);
      else if(c==='l') tx = clamp(d, -W, 0);   // push right (dx>0 -> d<0) to return
      else if(c==='r') tx = clamp(d, 0, W);
      else { active=false; track.classList.remove('dragging'); return; }
    } else {
      let d = -dy;
      if(c==='c') ty = clamp(d, -H, H);
      else if(c==='u') ty = clamp(d, -H, 0);
      else if(c==='d') ty = clamp(d, 0, H);
      else { active=false; track.classList.remove('dragging'); return; }
    }
    ox=tx; oy=ty;
    if(ev.cancelable) ev.preventDefault();
    applyHubTransform(track, c, tx, ty);
  }
  function end(){
    if(!active) return; active=false;
    track.classList.remove('dragging');
    const {W,H}=dim(); const c=S.hubCell;
    const TX=W*0.24, TY=H*0.22;
    let target=c;
    if(c==='c'){
      if(axis==='x'){ if(ox<=-TX) target='r'; else if(ox>=TX) target='l'; }
      else if(axis==='y'){ if(oy<=-TY) target='d'; else if(oy>=TY) target='u'; }
    } else {
      // returning: if pulled back past threshold, go center
      if(Math.abs(ox)>TX*0.6 || Math.abs(oy)>TY*0.6) target='c';
    }
    hubGo(target);
  }

  hub.addEventListener('touchstart', e=>{ const t=e.touches[0]; start(t.clientX,t.clientY,e.target); }, {passive:true});
  hub.addEventListener('touchmove', e=>{ const t=e.touches[0]; move(t.clientX,t.clientY,e); }, {passive:false});
  hub.addEventListener('touchend', end);
  hub.addEventListener('mousedown', e=>{ start(e.clientX,e.clientY,e.target);
    const mm=ev=>move(ev.clientX,ev.clientY,ev); const mu=()=>{ end(); document.removeEventListener('mousemove',mm); document.removeEventListener('mouseup',mu); };
    document.addEventListener('mousemove',mm); document.addEventListener('mouseup',mu); });
}
/* keyboard arrows drive the hub too (desktop testing) */
document.addEventListener('keydown', e=>{
  if(S.screen!=='trip-hub' || el('pop') || el('sheet')) return;
  const map={ ArrowUp:'u', ArrowDown:'d', ArrowLeft:'l', ArrowRight:'r' };
  if(e.key==='Escape'){ hubGo('c'); return; }
  if(!map[e.key]) return;
  e.preventDefault();
  hubGo(S.hubCell==='c' ? map[e.key] : 'c');
});

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
    case 'close-pop': closePop(); break;
    case 'openNotifs': openNotifs(); break;
    case 'seeAllNotifs': closePop(); navigate('notifs'); break;
    case 'hubGo': hubGo(param); break;
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
