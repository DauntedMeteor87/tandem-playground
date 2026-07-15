/* ============================================================
   tandemclub web wireframe 0.2 — Studio
   Sidebar shell + Home, Manage Adventures, Clone an Adventure,
   Create a Club, Manage a Club.
   ============================================================ */

/* ---------- Sidebar (persistent, left) ---------- */
function studioSidebar(active){
  return `<div class="sidebar">
    <div class="sidebar__head">
      <div class="sidebar__title">Studio</div>
      <div class="sidebar__sub">Plan on the web, publish to the app</div>
    </div>
    ${NAV.filter(n => !n.adminOnly || isClubAdmin()).map(n=>`
      <button class="railstep ${active===n.id?'current':''}" data-action="nav" data-param="${n.id}">
        <span class="railstep__n railstep__n--icon">${I[n.icon]}</span>${n.label}
      </button>`).join('')}
    <div class="sidebar__foot">
      <div class="sidebar__sub">Signed in as ${USER.name}<br>${adminClubs().length ? 'Admin — ' + adminClubs().map(c=>c.name).join(', ') : 'Member'}</div>
    </div>
  </div>`;
}

/* shell for simple (non-wizard) pages */
function studioPage(active, meta, bodyHtml, maxWidth){
  return `
  ${topbar(meta)}
  <div class="studio">
    ${studioSidebar(active)}
    <div class="studio__main">
      <div class="wiz__main"><div class="wiz__body" style="max-width:${maxWidth||'900px'}">${bodyHtml}</div></div>
    </div>
  </div>`;
}

/* ============================================================
   Home
   ============================================================ */
function renderHome(){
  const live = PUBLISHED.filter(t=>t.status==='live');
  const upcoming = live.filter(t => !t.adv.dateStart || new Date(t.adv.dateStart) >= new Date(new Date().setHours(0,0,0,0)));
  const totalSignups = live.reduce((s,t)=>s+t.signups, 0);
  const pendingRequests = adminClubs().reduce((s,c)=>s+c.requests.length, 0);

  const body = `
    <div class="home-hero">
      <div>
        <div class="wiz__eyebrow">Welcome back</div>
        <h1 class="wiz__title" style="margin-bottom:0">Hey, ${USER.name} 👋</h1>
      </div>
    </div>

    <div class="quick-tiles mt5">
      <button class="quicktile accent" data-action="nav" data-param="create">
        <div class="quicktile__eyebrow">New trip</div>
        <div class="quicktile__title">${I.plus} Create an Adventure</div>
        <div class="quicktile__sub">Permits, budget, gear, and publish</div>
      </button>
      <button class="quicktile" data-action="nav" data-param="clone">
        <div class="quicktile__eyebrow">Fastest way to plan</div>
        <div class="quicktile__title">${I.copy} Clone an Adventure</div>
        <div class="quicktile__sub">Start from a past trip — yours or your clubs'</div>
      </button>
      ${isClubAdmin() ? `
      <button class="quicktile dark" data-action="nav" data-param="manageClub">
        <div class="quicktile__eyebrow">${pendingRequests ? pendingRequests + ' join request' + (pendingRequests>1?'s':'') + ' waiting' : 'Admin'}</div>
        <div class="quicktile__title">${I.cog} Manage a Club</div>
        <div class="quicktile__sub">Roster, requests &amp; club settings</div>
      </button>` : `
      <button class="quicktile dark" data-action="nav" data-param="createClub">
        <div class="quicktile__eyebrow">Start something</div>
        <div class="quicktile__title">${I.flag} Create a Club</div>
        <div class="quicktile__sub">Name it, set the rules, invite people</div>
      </button>`}
      <button class="quicktile" data-action="nav" data-param="manage">
        <div class="quicktile__eyebrow">${live.length} live</div>
        <div class="quicktile__title">${I.edit} Manage Adventures</div>
        <div class="quicktile__sub">Edit, unpublish, or duplicate your trips</div>
      </button>
    </div>

    <div class="stat-tiles mt5">
      ${[
        ['Adventures live', live.length],
        ['Members signed up', totalSignups],
        ['Upcoming', upcoming.length],
        ['Clubs & crews', CLUBS.length + CREWS.length],
      ].map(([l,v])=>`<div class="stat-tile"><div class="stat-tile__v">${v}</div><div class="stat-tile__l">${l}</div></div>`).join('')}
    </div>

    <div class="divlabel mt6">Your adventures</div>
    ${PUBLISHED.length ? `
      <div class="tripgrid">
        ${PUBLISHED.map(t=>`
          <div class="triptile">
            <div class="ph triptile__img"></div>
            <div class="triptile__body">
              <span class="tag">${t.status==='live'?'Live':'Unpublished'} · ${t.visLabel}</span>
              <div class="triptile__name">${t.adv.name}</div>
              <div class="row__sub">${fmtDate(t.adv.dateStart)}–${fmtDate(t.adv.dateEnd)} · ${t.adv.location} · ${t.signups}/${t.adv.capacity} joined</div>
              <div class="mt3" style="display:flex;gap:8px">
                <button class="btn btn--sub btn--sm" data-action="editTrip" data-param="${t.id}">${I.edit} Edit</button>
                <button class="btn btn--sub btn--sm" data-action="cloneFromPublished" data-param="${t.id}">${I.copy} Clone</button>
              </div>
            </div>
          </div>`).join('')}
      </div>
    ` : `
      <div class="banner">${I.info} Nothing published yet — create your first adventure and it'll show up here.</div>
    `}
  `;
  return studioPage('home', 'Home', body);
}

/* ============================================================
   Manage Adventures
   ============================================================ */
function renderManageAdventures(){
  const body = `
    <div class="wiz__eyebrow">Your trips</div>
    <h1 class="wiz__title">Manage Adventures</h1>
    <p class="wiz__hint">Everything you've published. Edits go live to members the moment you save — unpublishing pulls a trip out of Trip Signups without deleting it.</p>

    ${PUBLISHED.length ? `
    <div class="list">
      ${PUBLISHED.map(t=>{
        const pct = Math.min(100, Math.round(100 * t.signups / Math.max(1, t.adv.capacity)));
        return `
        <div class="managerow">
          <div class="ph managerow__img">${I.img}</div>
          <div class="managerow__body">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span class="row__title">${t.adv.name}</span>
              <span class="tag">${t.status==='live'?'Live':'Unpublished'}</span>
              <span class="tag">${t.visLabel}</span>
            </div>
            <div class="row__sub">${fmtDate(t.adv.dateStart)}–${fmtDate(t.adv.dateEnd)} · ${t.adv.location} · published ${fmtDate(t.publishedOn)}</div>
            <div class="fillbar mt2"><div class="fillbar__in" style="width:${pct}%"></div></div>
            <div class="row__sub" style="margin-top:4px">${t.signups} of ${t.adv.capacity} spots claimed</div>
          </div>
          <div class="managerow__actions">
            <button class="btn btn--sub btn--sm" data-action="editTrip" data-param="${t.id}">${I.edit} Edit</button>
            <button class="btn btn--sub btn--sm" data-action="cloneFromPublished" data-param="${t.id}">${I.copy} Clone</button>
            ${t.status==='live'
              ? `<button class="btn btn--ghost btn--sm" data-action="unpublishTrip" data-param="${t.id}">Unpublish</button>`
              : `<button class="btn btn--ghost btn--sm" data-action="republishTrip" data-param="${t.id}">Republish</button>`}
            <button class="btn btn--ghost btn--sm btn--danger" data-action="deleteTrip" data-param="${t.id}">Delete</button>
          </div>
        </div>`;
      }).join('')}
    </div>` : `
    <div class="banner">${I.info} No published adventures yet. <button class="linklike" data-action="nav" data-param="create">Create one</button> or <button class="linklike" data-action="nav" data-param="clone">clone a past trip</button> to get started.</div>`}
  `;
  return studioPage('manage', 'Manage Adventures', body);
}

/* ============================================================
   Clone an Adventure
   ============================================================ */
function renderCloneAdventure(){
  const filters = [
    { id:'all', label:'All past trips' },
    { id:'mine', label:'Led by you' },
    ...CLUBS.map(c=>({ id:c.id, label:c.name })),
  ];
  const trips = PAST_TRIPS.filter(t=>{
    if (S.cloneFilter==='all') return true;
    if (S.cloneFilter==='mine') return t.by==='You';
    return t.clubId===S.cloneFilter;
  });

  const body = `
    <div class="wiz__eyebrow">Start from a proven trip</div>
    <h1 class="wiz__title">Clone an Adventure</h1>
    <p class="wiz__hint">Past public trips and trips run by clubs you're in. Cloning copies the full plan — write-up, itinerary, gear, budget — into a new draft. Dates and permit bookings don't carry over.</p>

    <div class="chiprow">
      ${filters.map(f=>`<button class="chip ${S.cloneFilter===f.id?'on':''}" data-action="setCloneFilter" data-param="${f.id}">${f.label}</button>`).join('')}
    </div>

    <div class="tripgrid mt5">
      ${trips.map(t=>{
        const club = CLUBS.find(c=>c.id===t.clubId);
        const days = t.adv.itinerary.length;
        return `
        <div class="triptile">
          <div class="ph triptile__img"></div>
          <div class="triptile__body">
            <span class="tag">${club ? club.name : 'Public'}</span>
            <span class="tag">Ran ${t.when}</span>
            <div class="triptile__name">${t.adv.name}</div>
            <div class="row__sub">${t.adv.location} · led by ${t.by} · ${t.adv.capacity} spots</div>
            <div class="row__sub" style="margin-top:6px;line-height:1.45">${t.adv.writeup.slice(0,110)}${t.adv.writeup.length>110?'…':''}</div>
            <div class="mt3" style="display:flex;gap:8px;align-items:center">
              <button class="btn btn--sm" data-action="cloneTrip" data-param="${t.id}">${I.copy} Clone this trip</button>
              <span class="row__sub">${t.adv.gear.length} gear items · ${days} itinerary steps</span>
            </div>
          </div>
        </div>`;
      }).join('')}
      ${trips.length ? '' : `<div class="banner">${I.info} No past trips in this filter yet.</div>`}
    </div>
  `;
  return studioPage('clone', 'Clone an Adventure', body);
}

/* ============================================================
   Create a Club — its own small wizard
   ============================================================ */
function renderCreateClub(){
  if (S.clubCreated) return renderClubConfirmation();
  const i = CLUB_STEPS.indexOf(S.clubStep);
  return `
  ${topbar('Create a Club — draft', true)}
  <div class="studio">
    ${studioSidebar('createClub')}
    <div class="studio__main">
      <div class="wiz">
        <div class="wiz__rail wiz__rail--steps">
          <div class="wiz__railhead">
            <div class="wiz__railtitle">${NC.name || 'New club'}</div>
            <div class="wiz__railsub">Set up the club here, then run everything else — signups, chat, trips — from the mobile app.</div>
          </div>
          ${CLUB_STEPS.map((s,idx)=>{
            const cls = s===S.clubStep ? 'current' : (idx < i ? 'done' : '');
            return `<button class="railstep ${cls}" data-action="goClubStep" data-param="${s}">
              <span class="railstep__n">${idx < i ? I.check : idx+1}</span>${CLUB_STEP_LABEL[s]}
            </button>`;
          }).join('')}
        </div>
        <div class="wiz__main"><div class="wiz__body">${clubStepBody()}</div></div>
      </div>
      <div class="wiz__foot">
        <div class="side">${i===0 ? '' : `<button class="btn btn--ghost" data-action="prevClubStep">${I.back} Back</button>`}</div>
        <div class="side">
          ${S.clubStep==='preview'
            ? `<button class="btn" data-action="doCreateClub" ${NC.name.trim() ? '' : 'disabled'}>Create club</button>`
            : `<button class="btn" data-action="nextClubStep">Continue</button>`}
        </div>
      </div>
    </div>
  </div>`;
}

function clubStepBody(){
  switch(S.clubStep){
    case 'basics': return clubStepBasics();
    case 'about': return clubStepAbout();
    case 'membership': return clubStepMembership();
    case 'officers': return clubStepOfficers();
    case 'photo': return clubStepPhoto();
    case 'preview': return clubStepPreview();
    default: return '';
  }
}

function clubStepBasics(){
  return `
  <div class="wiz__eyebrow">Step 1 of 6</div>
  <h1 class="wiz__title">The basics</h1>
  <p class="wiz__hint">Name your club and pick what kind it is — this is how people find it in the app.</p>
  <div class="form-grid">
    <div class="field-group span2"><label class="label">Club name</label>
      <input class="field" data-bind="club:name" value="${NC.name}" placeholder="e.g. Field Studies" /></div>
    <div class="field-group span2"><label class="label">School or community</label>
      <input class="field" data-bind="club:community" value="${NC.community}" placeholder="e.g. Cal Poly SLO" /></div>
  </div>
  <div class="divlabel">Category</div>
  <div class="chiprow">
    ${CLUB_CATEGORIES.map(c=>`<button class="chip ${NC.category===c?'on':''}" data-action="setClubCategory" data-param="${c}">${c}</button>`).join('')}
  </div>
  `;
}

function clubStepAbout(){
  return `
  <div class="wiz__eyebrow">Step 2 of 6</div>
  <h1 class="wiz__title">About the club</h1>
  <p class="wiz__hint">What's the club for, and who should join? This shows on the club page before someone hits Join.</p>
  <div class="field-group">
    <label class="label">Description</label>
    <textarea class="field" style="min-height:160px" data-bind="club:about" placeholder="What do you do, how often, and who's it for?">${NC.about}</textarea>
    <div class="field-hint">The clubs that grow fastest say two things clearly: what a normal week looks like, and that beginners are genuinely welcome.</div>
  </div>
  <div class="field-group mt4">
    <label class="label">When &amp; where you meet <span class="opt">optional</span></label>
    <input class="field" data-bind="club:meets" value="${NC.meets}" placeholder="e.g. Every other Tuesday, 7 PM — Rec Center Rm 12" />
  </div>
  `;
}

function clubStepMembership(){
  const policies = [
    { id:'open',    t:'Open',         s:'Anyone in your community can join instantly', icon:'users' },
    { id:'request', t:'Request to join', s:'People ask, admins approve — the usual for trip clubs', icon:'shield' },
    { id:'invite',  t:'Invite only',  s:'Members join by invite link from an admin', icon:'link' },
  ];
  return `
  <div class="wiz__eyebrow">Step 3 of 6</div>
  <h1 class="wiz__title">Membership</h1>
  <p class="wiz__hint">How people get in, and whether the club collects dues.</p>
  ${policies.map(p=>`
    <button class="permitcard ${NC.joinPolicy===p.id?'on':''}" data-action="setJoinPolicy" data-param="${p.id}">
      <span class="permitcard__ic">${I[p.icon]}</span>
      <span><span class="permitcard__t">${p.t}</span><span class="permitcard__s">${p.s}</span></span>
    </button>`).join('')}
  <div class="divlabel">Dues</div>
  <div class="list">
    <div class="togglerow"><span class="row__title">Collect quarterly dues</span>
      <button class="toggle ${NC.duesOn?'on':''}" data-action="toggleDues"><span class="knob"></span></button></div>
    ${NC.duesOn ? `
    <div style="padding:0 var(--s4) 14px;max-width:220px">
      <label class="label">$ per member, per quarter</label>
      <input class="field" type="number" min="0" data-bind="club:dues" value="${NC.dues}" />
    </div>` : ''}
  </div>
  `;
}

function clubStepOfficers(){
  return `
  <div class="wiz__eyebrow">Step 4 of 6</div>
  <h1 class="wiz__title">Officers</h1>
  <p class="wiz__hint">You're the admin automatically. Add anyone else who should be able to run trips or manage the roster — they'll get an invite when the club goes live.</p>
  <div class="list">
    ${NC.officers.map((o,idx)=>`
      <div class="itin-row">
        <div class="desc"><input class="field" data-bind="officer:${idx}:name" value="${o.name}" placeholder="Name" ${idx===0?'disabled':''} /></div>
        <div style="width:160px">
          <select class="field" data-bindchange="officer:${idx}:role" ${idx===0?'disabled':''}>
            ${MEMBER_ROLES.map(r=>`<option ${o.role===r?'selected':''}>${r}</option>`).join('')}
          </select>
        </div>
        ${idx===0 ? '<div style="width:28px"></div>' : `<button class="rowbtn" data-action="removeOfficer" data-param="${idx}">${I.x}</button>`}
      </div>`).join('')}
    <button class="addrow" data-action="addOfficer">${I.plus} Add an officer</button>
  </div>
  `;
}

function clubStepPhoto(){
  return `
  <div class="wiz__eyebrow">Step 5 of 6</div>
  <h1 class="wiz__title">Club photo</h1>
  <p class="wiz__hint">One banner shot for the club page. You can swap it any time.</p>
  <div class="phgrid" style="grid-template-columns:repeat(2,1fr)">
    ${NC.photo ? `<button class="ph" style="height:180px" data-action="removeClubPhoto">${I.img}</button>` : `<button class="ph" style="height:180px" data-action="addClubPhoto">${I.plus}</button>`}
  </div>
  `;
}

function clubStepPreview(){
  const readiness = [
    ['Name', !!NC.name.trim()],
    ['Description', NC.about.length > 10],
    ['Join policy', true],
    ['Officers', NC.officers.length > 0],
  ];
  return `
  <div class="wiz__eyebrow">Step 6 of 6</div>
  <h1 class="wiz__title">Preview &amp; create</h1>
  <p class="wiz__hint">This is the club page members see in the app.</p>
  <div class="preview-wrap">
    <div class="preview-copy">
      <div class="card">
        <div class="row"><span class="row__body"><span class="row__title">Ready to create?</span></span></div>
        ${readiness.map(([l,ok])=>`<div class="row"><span class="row__body"><span class="row__title">${l}</span></span><span class="tag">${ok?'✓ set':'incomplete'}</span></div>`).join('')}
      </div>
      <div class="card">
        <div class="row"><span class="row__body"><span class="row__sub">Join policy</span><span class="row__title">${joinPolicyLabel(NC.joinPolicy)}</span></span></div>
        <div class="row"><span class="row__body"><span class="row__sub">Dues</span><span class="row__title">${NC.duesOn ? '$'+NC.dues+'/quarter' : 'None'}</span></span></div>
      </div>
    </div>
    <div class="device"><div class="device__screen">
      <div class="device__body">
        <div class="dhero"><div class="ph" style="border-radius:0;height:130px"></div><div class="dhero__grad"></div>
          <div class="dhero__meta"><div class="t">${NC.name || 'Your club'}</div><div class="s">${NC.category} · ${NC.community}</div></div></div>
        <div class="dsec-h">About</div>
        <div class="dpad small" style="line-height:1.5;color:var(--c-ink-2)">${NC.about || 'Your description shows here.'}</div>
        ${NC.meets ? `<div class="dsec-h">Meets</div><div class="dpad small muted">${NC.meets}</div>` : ''}
        <div class="dsec-h">Officers</div>
        <div class="dpad">${NC.officers.map(o=>`<div class="drow"><span>${o.name || 'Officer'}</span><span class="v" style="font-weight:600;color:var(--c-ink-3)">${o.role}</span></div>`).join('')}</div>
        <div style="height:14px"></div>
      </div>
    </div></div>
  </div>
  `;
}

function renderClubConfirmation(){
  const club = CLUBS[CLUBS.length-1];
  return `
  ${topbar('Club created')}
  <div class="studio">
    ${studioSidebar('createClub')}
    <div class="studio__main">
      <div class="wiz__main"><div class="wiz__body">
        <div class="card confirm__card mt6" style="margin-left:auto;margin-right:auto">
          <div class="confirm__icon">${I.check}</div>
          <h2>${club.name} is live</h2>
          <p>Your club now shows up in the mobile app. You're the admin — invites went out to your officers, and "Manage a Club" is now in your sidebar.</p>
          <div style="display:flex;gap:10px;justify-content:center">
            <button class="btn btn--ghost" data-action="nav" data-param="home">Go to Home</button>
            <button class="btn" data-action="manageNewClub" data-param="${club.id}">Manage ${club.name}</button>
          </div>
        </div>
      </div></div>
    </div>
  </div>`;
}

/* ============================================================
   Manage a Club (admins only)
   ============================================================ */
function renderManageClub(){
  const myClubs = adminClubs();
  if (!myClubs.length) return studioPage('manageClub', 'Manage a Club',
    `<div class="banner">${I.info} You're not an admin of any club yet. <button class="linklike" data-action="nav" data-param="createClub">Create one</button> to unlock this.</div>`);

  if (!S.manageClubId || !myClubs.find(c=>c.id===S.manageClubId)) S.manageClubId = myClubs[0].id;
  const club = myClubs.find(c=>c.id===S.manageClubId);
  const clubTrips = PUBLISHED.filter(t=>t.adv.visType==='club' && t.adv.visId===club.id);
  const tabs = [
    ['overview','Overview'], ['roster','Roster'],
    ['requests', `Requests${club.requests.length ? ' · '+club.requests.length : ''}`],
    ['trips','Adventures'], ['settings','Settings'],
  ];

  const body = `
    <div class="wiz__eyebrow">Admin</div>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <h1 class="wiz__title" style="margin-bottom:0">${club.name}</h1>
      ${myClubs.length>1 ? `<div class="chiprow">${myClubs.map(c=>`<button class="chip ${c.id===club.id?'on':''}" data-action="setManageClub" data-param="${c.id}">${c.name}</button>`).join('')}</div>` : ''}
    </div>
    <div class="tabrow mt4">
      ${tabs.map(([k,l])=>`<button class="tab ${S.clubTab===k?'on':''}" data-action="setClubTab" data-param="${k}">${l}</button>`).join('')}
    </div>
    ${clubTabBody(club, clubTrips)}
  `;
  return studioPage('manageClub', 'Manage a Club', body);
}

function clubTabBody(club, clubTrips){
  switch(S.clubTab){
    case 'roster': return clubRoster(club);
    case 'requests': return clubRequests(club);
    case 'trips': return clubTrips_(club, clubTrips);
    case 'settings': return clubSettings(club);
    default: return clubOverview(club, clubTrips);
  }
}

function clubOverview(club, clubTrips){
  const live = clubTrips.filter(t=>t.status==='live');
  return `
  <div class="stat-tiles mt5">
    ${[
      ['Members', club.members.length],
      ['Join requests', club.requests.length],
      ['Live adventures', live.length],
      ['Dues', club.duesOn ? '$'+club.dues+'/qtr' : 'None'],
    ].map(([l,v])=>`<div class="stat-tile"><div class="stat-tile__v">${v}</div><div class="stat-tile__l">${l}</div></div>`).join('')}
  </div>
  <div class="divlabel mt6">Needs your attention</div>
  <div class="list">
    ${club.requests.length ? `<div class="row"><span class="row__body"><span class="row__title">${club.requests.length} pending join request${club.requests.length>1?'s':''}</span><span class="row__sub">${club.requests.join(', ')}</span></span><button class="btn btn--sub btn--sm" data-action="setClubTab" data-param="requests">Review</button></div>` : ''}
    ${live.map(t=>`<div class="row"><span class="row__body"><span class="row__title">${t.adv.name}</span><span class="row__sub">${t.signups}/${t.adv.capacity} joined · ${fmtDate(t.adv.dateStart)}</span></span><button class="btn btn--sub btn--sm" data-action="editTrip" data-param="${t.id}">Edit trip</button></div>`).join('')}
    ${!club.requests.length && !live.length ? `<div class="row"><span class="row__body muted">All quiet — nothing pending.</span></div>` : ''}
  </div>
  <div class="divlabel mt6">About</div>
  <div class="card" style="padding:16px 18px">
    <div class="row__title" style="margin-bottom:4px">${club.category} · ${joinPolicyLabel(club.joinPolicy)}</div>
    <div class="row__sub" style="line-height:1.5">${club.about}</div>
    ${club.meets ? `<div class="row__sub mt2">${I.cal} ${club.meets}</div>` : ''}
  </div>
  `;
}

function clubRoster(club){
  return `
  <p class="wiz__hint mt4">Change roles or remove members. Trip leads can publish adventures to the club; admins can do everything you can.</p>
  <div class="list">
    ${club.members.map((m,idx)=>`
      <div class="row">
        <div class="avatar avatar--sm">${m.name.trim()[0] || '?'}</div>
        <span class="row__body"><span class="row__title">${m.name}</span></span>
        <select class="field field--inline" ${m.name.includes('(you)')?'disabled':''} onchange="setMemberRole('${club.id}', ${idx}, this.value)">
          ${MEMBER_ROLES.map(r=>`<option ${m.role===r?'selected':''}>${r}</option>`).join('')}
        </select>
        ${m.name.includes('(you)') ? '<div style="width:34px"></div>' : `<button class="rowbtn" title="Remove from club" data-action="removeMember" data-param="${club.id}:${idx}">${I.x}</button>`}
      </div>`).join('')}
    <button class="addrow" data-action="toast" data-param="Invite link copied — send it to anyone">${I.link} Copy invite link</button>
  </div>
  `;
}

function clubRequests(club){
  return `
  <p class="wiz__hint mt4">People asking to join ${club.name}. Approving adds them to the roster as a member.</p>
  <div class="list">
    ${club.requests.length ? club.requests.map((name,idx)=>`
      <div class="row">
        <div class="avatar avatar--sm">${name[0]}</div>
        <span class="row__body"><span class="row__title">${name}</span><span class="row__sub">Requested this week</span></span>
        <button class="btn btn--sm" data-action="approveRequest" data-param="${club.id}:${idx}">Approve</button>
        <button class="btn btn--ghost btn--sm" data-action="denyRequest" data-param="${club.id}:${idx}">Deny</button>
      </div>`).join('') : `<div class="row"><span class="row__body muted">No pending requests.</span></div>`}
  </div>
  `;
}

function clubTrips_(club, clubTrips){
  return `
  <p class="wiz__hint mt4">Adventures published to ${club.name}.</p>
  <div class="list">
    ${clubTrips.length ? clubTrips.map(t=>`
      <div class="row">
        <span class="row__body"><span class="row__title">${t.adv.name}</span><span class="row__sub">${fmtDate(t.adv.dateStart)}–${fmtDate(t.adv.dateEnd)} · ${t.signups}/${t.adv.capacity} joined · ${t.status}</span></span>
        <button class="btn btn--sub btn--sm" data-action="editTrip" data-param="${t.id}">Edit</button>
      </div>`).join('') : `<div class="row"><span class="row__body muted">No adventures for this club yet.</span></div>`}
    <button class="addrow" data-action="newTripForClub" data-param="${club.id}">${I.plus} Create an adventure for ${club.name}</button>
  </div>
  `;
}

function clubSettings(club){
  return `
  <p class="wiz__hint mt4">Changes save as you type and go live to members immediately.</p>
  <div class="form-grid" style="max-width:640px">
    <div class="field-group span2"><label class="label">Club name</label>
      <input class="field" data-bind="editClub:name" value="${club.name}" /></div>
    <div class="field-group span2"><label class="label">Description</label>
      <textarea class="field" data-bind="editClub:about">${club.about}</textarea></div>
    <div class="field-group span2"><label class="label">When &amp; where you meet</label>
      <input class="field" data-bind="editClub:meets" value="${club.meets}" /></div>
  </div>
  <div class="divlabel">Join policy</div>
  <div class="chiprow">
    ${['open','request','invite'].map(p=>`<button class="chip ${club.joinPolicy===p?'on':''}" data-action="setClubJoinPolicy" data-param="${club.id}:${p}">${joinPolicyLabel(p)}</button>`).join('')}
  </div>
  <div class="divlabel">Dues</div>
  <div class="list" style="max-width:640px">
    <div class="togglerow"><span class="row__title">Collect quarterly dues</span>
      <button class="toggle ${club.duesOn?'on':''}" data-action="toggleClubDues" data-param="${club.id}"><span class="knob"></span></button></div>
    ${club.duesOn ? `
    <div style="padding:0 var(--s4) 14px;max-width:220px">
      <label class="label">$ per member, per quarter</label>
      <input class="field" type="number" min="0" data-bind="editClub:dues" value="${club.dues}" /></div>` : ''}
  </div>
  <div class="divlabel">Danger zone</div>
  <div class="list" style="max-width:640px">
    <div class="row"><span class="row__body"><span class="row__title">Archive this club</span><span class="row__sub">Hides it from the app. Members keep their trip history.</span></span>
      <button class="btn btn--ghost btn--sm btn--danger" data-action="toast" data-param="Archiving is stubbed in the wireframe">Archive</button></div>
  </div>
  `;
}

/* roster role change (inline select, no re-render needed) */
function setMemberRole(clubId, idx, role){
  const club = CLUBS.find(c=>c.id===clubId);
  if (!club) return;
  club.members[idx].role = role;
  toast(`${club.members[idx].name} is now ${role}`);
}

/* ============================================================
   Studio actions
   ============================================================ */
Object.assign(ACTIONS, {
  nav: (param)=>{
    if (param==='create'){
      // fresh draft every time you enter via the sidebar
      ADV = freshAdventure(); S.editingId = null; S.cloneSource = null; resetWizard();
    }
    if (param==='createClub' && S.clubCreated){ NC = freshClub(); S.clubStep='basics'; S.clubCreated=false; }
    goView(param);
  },

  /* --- manage adventures --- */
  editTrip: (param)=>{
    const entry = PUBLISHED.find(t=>t.id===param);
    if (!entry) return;
    ADV = deepCopy(entry.adv);
    S.editingId = entry.id; S.cloneSource = null;
    resetWizard();
    goView('create');
  },
  unpublishTrip: (param)=>{
    const entry = PUBLISHED.find(t=>t.id===param);
    if (entry){ entry.status = 'unpublished'; toast(`"${entry.adv.name}" pulled from Trip Signups`); render(); }
  },
  republishTrip: (param)=>{
    const entry = PUBLISHED.find(t=>t.id===param);
    if (entry){ entry.status = 'live'; toast(`"${entry.adv.name}" is live again`); render(); }
  },
  deleteTrip: (param)=>{
    const idx = PUBLISHED.findIndex(t=>t.id===param);
    if (idx>-1){ const name = PUBLISHED[idx].adv.name; PUBLISHED.splice(idx,1); toast(`"${name}" deleted`); render(); }
  },

  /* --- clone --- */
  setCloneFilter: (param)=>{ S.cloneFilter = param; render(); },
  cloneTrip: (param)=>{
    const src = PAST_TRIPS.find(t=>t.id===param);
    if (!src) return;
    ADV = deepCopy(src.adv);
    ADV.dateStart = ''; ADV.dateEnd = '';
    ADV.permit.link = '';
    S.cloneSource = src.adv.name;
    S.editingId = null;
    resetWizard();
    goView('create');
  },
  cloneFromPublished: (param)=>{
    const src = PUBLISHED.find(t=>t.id===param);
    if (!src) return;
    ADV = deepCopy(src.adv);
    ADV.dateStart = ''; ADV.dateEnd = '';
    ADV.permit.link = '';
    S.cloneSource = src.adv.name;
    S.editingId = null;
    resetWizard();
    goView('create');
  },

  /* --- create a club --- */
  goClubStep: (param)=>{ S.clubStep = param; render(); window.scrollTo(0,0); },
  nextClubStep: ()=>{
    const i = CLUB_STEPS.indexOf(S.clubStep);
    if (i < CLUB_STEPS.length-1){ S.clubStep = CLUB_STEPS[i+1]; render(); window.scrollTo(0,0); }
  },
  prevClubStep: ()=>{
    const i = CLUB_STEPS.indexOf(S.clubStep);
    if (i > 0){ S.clubStep = CLUB_STEPS[i-1]; render(); window.scrollTo(0,0); }
  },
  setClubCategory: (param)=>{ NC.category = param; render(); },
  setJoinPolicy: (param)=>{ NC.joinPolicy = param; render(); },
  toggleDues: ()=>{ NC.duesOn = !NC.duesOn; render(); },
  addOfficer: ()=>{ NC.officers.push({ name:'', role:'Trip lead' }); render(); },
  removeOfficer: (param)=>{ NC.officers.splice(+param,1); render(); },
  addClubPhoto: ()=>{ NC.photo = 1; render(); },
  removeClubPhoto: ()=>{ NC.photo = 0; render(); },
  doCreateClub: ()=>{
    const id = 'club' + Date.now();
    CLUBS.push({
      id, name: NC.name.trim(), kind:'Club', role:'admin',
      category: NC.category, about: NC.about, meets: NC.meets,
      joinPolicy: NC.joinPolicy, duesOn: NC.duesOn, dues: NC.dues,
      members: NC.officers.filter(o=>o.name.trim()).map(o=>({ name:o.name, role:o.role })),
      requests: [],
    });
    S.clubCreated = true;
    render();
  },
  manageNewClub: (param)=>{
    NC = freshClub(); S.clubStep='basics'; S.clubCreated=false;
    S.manageClubId = param; S.clubTab = 'overview';
    goView('manageClub');
  },

  /* --- manage a club --- */
  setManageClub: (param)=>{ S.manageClubId = param; S.clubTab = 'overview'; render(); },
  setClubTab: (param)=>{ S.clubTab = param; render(); },
  approveRequest: (param)=>{
    const [clubId, idx] = param.split(':');
    const club = CLUBS.find(c=>c.id===clubId);
    if (!club) return;
    const [name] = club.requests.splice(+idx,1);
    club.members.push({ name, role:'Member' });
    toast(`${name} added to ${club.name}`);
    render();
  },
  denyRequest: (param)=>{
    const [clubId, idx] = param.split(':');
    const club = CLUBS.find(c=>c.id===clubId);
    if (!club) return;
    const [name] = club.requests.splice(+idx,1);
    toast(`Request from ${name} denied`);
    render();
  },
  removeMember: (param)=>{
    const [clubId, idx] = param.split(':');
    const club = CLUBS.find(c=>c.id===clubId);
    if (!club) return;
    const [m] = club.members.splice(+idx,1);
    toast(`${m.name} removed from ${club.name}`);
    render();
  },
  setClubJoinPolicy: (param)=>{
    const [clubId, policy] = param.split(':');
    const club = CLUBS.find(c=>c.id===clubId);
    if (club){ club.joinPolicy = policy; render(); }
  },
  toggleClubDues: (param)=>{
    const club = CLUBS.find(c=>c.id===param);
    if (club){ club.duesOn = !club.duesOn; render(); }
  },
  newTripForClub: (param)=>{
    ADV = freshAdventure();
    ADV.visType = 'club'; ADV.visId = param;
    S.editingId = null; S.cloneSource = null;
    resetWizard();
    goView('create');
  },
});
