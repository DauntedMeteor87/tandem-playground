/* ============================================================
   tandemclub wireframe prototype 0.2 — screens
   ============================================================ */
const U = {
  homePill:'all', archPill:'all', clubTab:'landing', commTab:'yours', commFilter:'clubs',
  msgFilter:'all', mtTab:'upcoming', rideTab:'ride',
  packList:{}, slots:{}, exp:{}, ranks:{},
  clubsOpen:false, crewsMore:false, actIndex:0, actClub:'hiking',
  // Plan → Activity flow state
  plan:{ budgetOn:false, rideOn:false, gas:24, permits:0, food:0, heads:6, repeat:false, photos:0,
         vis:'', visCrew:'', visOpen:'', draftFriends:[], carSeats:3 },
};
const SCREENS = {};

/* small shared bits */
function bubbles(list){
  return `<div class="bubbles">${list.map(([who,msg,me])=>`
    <div class="bub ${me?'me':''}">${me?'':avatar((who.split(/[ ·]/)[0]||who).slice(0,2),28)}<div>${me?'':`<div class="who">${who}</div>`}<div class="msg">${msg}</div></div></div>`).join('')}</div>`;
}
function itinOf(t){
  return t.kind==='Adventure'
    ? [['Fri 4:00 PM','Meet at the Rec Center lot, load gear'],['Sat 9:00 AM','Hike in, set up camp'],['Sat PM','Cook over the fire, stargaze'],['Sun 11:00 AM','Pack out, tacos on the drive home']]
    : [['5:15 PM','Meet at the trailhead lot'],['5:30 PM','Head up together — we go slow'],['Sunset','Photos at the top'],['After','Tacos for anyone who\'s in']];
}
function costsOf(t){
  if(t.cost==='Free') return [['Trip cost','Free'],['Gas (optional carpool)','~$4 each'],['You pay now','$0']];
  return [['Permit + group gear','$8 / person'],['Gas — carpool split','$10 / person'],['Total',''+t.cost]];
}

/* ============================================================
   FLOW 1 · Onboarding
   ============================================================ */
const OB_STEPS = ['ob-name','ob-year','ob-basics','ob-about','ob-experience','ob-photos','ob-bio','ob-verify'];
function obProgress(id){ const i = OB_STEPS.indexOf(id); return `<div class="progress mt2"><i style="width:${((i+1)/OB_STEPS.length)*100}%"></i></div>`; }
function obShell(id, {q, hint, inspo, body, cta='Continue', next, skip, forced}) {
  return `${obProgress(id)}
  <div class="ob">
    <div class="ob__top">
      <button class="iconbtn" data-action="back">${I.back}</button>
      ${forced ? '<span></span>' : `<button class="skip" data-action="obGo" data-param="${skip||next}">Skip</button>`}
    </div>
    <div class="ob__body">
      ${inspo?`<div class="ob__inspo ph">${I.img}</div>`:''}
      <div class="ob__q">${q}</div>
      ${hint?`<div class="ob__hint">${hint}</div>`:''}
      ${body||''}
    </div>
    <div class="ob__foot"><button class="btn" data-action="obGo" data-param="${next}">${cta}</button></div>
  </div>`;
}

SCREENS['ob-login'] = () => `
  <div class="ob" style="justify-content:space-between">
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      <div class="avatar" style="width:74px;height:74px;font-size:26px;border-radius:22px">tc</div>
      <h1 style="font-size:32px;font-weight:850;letter-spacing:-1px;margin:22px 0 6px">tandemclub</h1>
      <p class="muted" style="max-width:260px;font-size:15px">Find your people. Turn one trip into real friends.</p>
    </div>
    <div class="gap2">
      <button class="btn btn-apple" data-action="obGo" data-param="ob-name">${I.apple} Continue with Apple</button>
      <button class="btn btn--ghost" data-action="obGo" data-param="ob-code">Continue with phone number</button>
      <p class="center small muted mt2">By continuing you agree to the community guidelines.</p>
    </div>
  </div>`;

SCREENS['ob-code'] = () => `
  <div class="ob">
    <div class="ob__top"><button class="iconbtn" data-action="back">${I.back}</button><span></span></div>
    <div class="ob__body">
      <div class="ob__q">Can we get your number?</div>
      <div class="ob__hint">We'll text a code to make sure it's you.</div>
      <input class="field" placeholder="(805) 555-0134" inputmode="tel" />
      <div class="mt5 divlabel">then</div>
      <div class="label">Enter the 6-digit code</div>
      <div style="display:flex;gap:8px">${[1,2,3,4,5,6].map(()=>'<div class="field center" style="padding:14px 0;flex:1">·</div>').join('')}</div>
    </div>
    <div class="ob__foot"><button class="btn" data-action="obGo" data-param="ob-name">Continue</button></div>
  </div>`;

/* Name only — profile pic moved to the photos step */
SCREENS['ob-name'] = () => obShell('ob-name', {
  q:'What should we call you?', hint:"First name only — you can't change it later.", forced:true,
  body:`<input class="field" placeholder="Your first name" value="${S.ob.name}" oninput="S.ob.name=this.value" autofocus />`,
  next:'ob-year'
});
SCREENS['ob-year'] = () => obShell('ob-year', {
  q:'What year are you?', next:'ob-basics', skip:'ob-basics',
  body:`<div style="display:flex;flex-wrap:wrap;gap:10px">${['Freshman','Sophomore','Junior','Senior','Grad'].map(y=>`<button class="chip ${S.ob.year===y?'on':''}" data-action="pickYear" data-param="${y}">${y}</button>`).join('')}</div>`
});
/* Small-talk basics — major + hometown (shown on your profile) */
SCREENS['ob-basics'] = () => obShell('ob-basics', {
  q:'A couple basics', hint:'These show on your profile so people have something to say hi about.', next:'ob-about', skip:'ob-about',
  body:`
    <div class="label">Major</div>
    <input class="field" placeholder="e.g. Environmental Science" value="${S.ob.major}" oninput="S.ob.major=this.value" />
    <div class="label mt4">Hometown</div>
    <input class="field" placeholder="e.g. Sacramento, CA" value="${S.ob.from}" oninput="S.ob.from=this.value" />`
});
/* "Tell us about yourself" — favorite outdoor activities, pick up to 5 */
const ACTIVITIES = ['Backpacking','Day hikes','Climbing','Surfing','Snowboarding','Skiing','Trail running','Kayaking','Mountain biking','Camping','Photography','Ceramics'];
SCREENS['ob-about'] = () => obShell('ob-about', {
  q:'Tell us about yourself', hint:'Favorite ways you like to get outside — the modes you show up for. Pick up to 5.', next:'ob-experience', skip:'ob-experience',
  body:`<div style="display:flex;flex-wrap:wrap;gap:10px">${ACTIVITIES.map(t=>`<button class="chip ${S.ob.activities.includes(t)?'on':''}" data-action="toggleActivity" data-param="${t}">${t}</button>`).join('')}</div>
    <p class="small muted mt4">${S.ob.activities.length}/5 picked · shapes your Home feed and who you meet.</p>`
});
/* Experience — a fixed set of activities, rated by how many times you've been (0–5+) */
const EXPERIENCE = ['Surfing','Day hikes','Crafts','Biking','Thrifting','Camping','Backpacking','Mountaineering'];
SCREENS['ob-experience'] = () => obShell('ob-experience', {
  q:'Tell us about your experience', hint:"Roughly how many times you've been. All good to leave everything at zero and skip — just bump the ones you're good at or that you resonate with.", next:'ob-photos', skip:'ob-photos',
  body:`<div class="mt2">${EXPERIENCE.map(n=>{const v=U.exp[n]||0;return `
    <div class="slider-row"><span class="name">${n}</span><div class="slider" data-action="bumpExp" data-param="${n}"><i style="left:calc(${v*20}% - 11px)"></i></div><span class="val">${v===0?'—':(v>=5?'5+':v+'×')}</span></div>`}).join('')}
    <p class="small muted mt3">Each notch is one time you've been out — it tops out at 5+.</p>
    <button class="tag mt4" data-action="toast" data-param="Certifications editable later in profile">${I.plus} Add certifications</button></div>`
});
/* Photos — unskippable: a profile pic (circle) + one portrait main photo required; extras optional */
SCREENS['ob-photos'] = () => {
  const ready = S.ob.pfp && S.ob.mainPhoto;
  return `
  ${obProgress('ob-photos')}
  <div class="ob">
    <div class="ob__top"><button class="iconbtn" data-action="back">${I.back}</button><span></span></div>
    <div class="ob__body">
      <div class="ob__q">Add your photos</div>
      <div class="ob__hint">Two to start — a profile pic and one main photo. You can build out your profile later; this is just to get going.</div>
      <div class="photobox">
        <button class="pfp-slot ${S.ob.pfp?'filled':''}" data-action="addPfp">${S.ob.pfp?avatar('YU',84):I.cam}</button>
        <div class="pfp-cap">${S.ob.pfp?`${I.check} Profile pic`:'Tap to add your profile pic'}</div>
        <div class="photobox__row">
          <button class="photo-main ${S.ob.mainPhoto?'filled':''}" data-action="addMainPhoto">
            ${S.ob.mainPhoto?I.check:I.plus}<span class="photo-lbl">Main photo${S.ob.mainPhoto?'':' · required'}</span></button>
          <div class="photo-extras">
            ${[0,1].map(i=>`<button class="photo-extra ${i<S.ob.extras?'filled':''}" data-action="addExtra">${i<S.ob.extras?I.check:I.plus}</button>`).join('')}
            <span class="photo-lbl muted">Optional</span>
          </div>
        </div>
      </div>
      <p class="small muted center mt3">${ready?'Nice — add more anytime from your profile.':'Add your profile pic and main photo to continue.'}</p>
    </div>
    <div class="ob__foot"><button class="btn" ${ready?'data-action="obGo" data-param="ob-bio"':'disabled'}>Continue</button></div>
  </div>`;
};
/* Bio — a short caption-style bio (250), plus one optional prompt that opens its own 250-char answer */
const OB_PROMPTS = ['My ideal Saturday is…','Ask me about…','A trip I want to do…','I geek out over…'];
SCREENS['ob-bio'] = () => obShell('ob-bio', {
  q:'Say hi in one line', hint:'A short bio, like a caption — keep it real. Up to 250 characters.', next:'ob-verify', skip:'ob-verify',
  body:`<textarea class="field" maxlength="250" placeholder="e.g. Freshman from Sacramento, looking for hiking buddies!" oninput="S.ob.bio=this.value;this.nextElementSibling.textContent=this.value.length+' / 250'">${S.ob.bio}</textarea>
    <div class="charcount">${(S.ob.bio||'').length} / 250</div>
    <div class="divlabel">add a prompt</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">${OB_PROMPTS.map(p=>`<button class="chip ${S.ob.prompt===p?'on':''}" data-action="usePrompt" data-param="${p}">${p}</button>`).join('')}</div>
    ${S.ob.prompt?`<div class="mt4"><div class="label">${S.ob.prompt}</div>
      <textarea class="field" maxlength="250" placeholder="Finish the thought…" oninput="S.ob.promptText=this.value;this.nextElementSibling.textContent=this.value.length+' / 250'">${S.ob.promptText}</textarea>
      <div class="charcount">${(S.ob.promptText||'').length} / 250</div></div>`:''}`
});
SCREENS['ob-verify'] = () => `
  ${obProgress('ob-verify')}
  <div class="ob">
    <div class="ob__top"><button class="iconbtn" data-action="back">${I.back}</button>
      <button class="skip" data-action="obSkipVerify">Skip for now</button></div>
    <div class="ob__body">
      <div class="ob__q">Verify your school email</div>
      <div class="ob__hint">Last step. Verifying earns your <b>join</b> button — it's how we keep trips students-only.</div>
      <input class="field" placeholder="you@calpoly.edu" inputmode="email" />
      <div class="banner" style="margin-left:0;margin-right:0"><span>${I.lock}</span><span>Skip and you can still browse real trips — you just can't join one until you verify.</span></div>
    </div>
    <div class="ob__foot"><button class="btn" data-action="obVerify">Verify & finish</button></div>
  </div>`;

/* ============================================================
   FLOW 0 · Home — Spotify-style
   ============================================================ */
SCREENS['home'] = () => {
  const banner = S.verified ? '' : `<div class="banner"><span>${I.lock}</span><span><b>Verify your school email</b> to join trips.</span><button class="btn btn--sm" data-nav="ob-verify">Verify</button></div>`;
  // quick-tiles grid (Spotify "your top" shortcuts) — most recent things you clicked, 2 wide x 3 down
  const quick = [
    ['messages','','Moonlight Crew',I.comm],['trip','bishop','Bishop Peak Sunset',I.trips],
    ['trip','surf','Dawn Patrol Surf',I.trips],['club','hiking','Cal Poly Hiking',I.comm],
    ['club','field','Field Studies',I.comm],['messages','','Beach Crew',I.comm],
  ];
  const section = (title, more, nav, cards) => `
    <div class="section-h"><h3>${title}</h3><button class="more" data-nav="${nav}">${more}</button></div>
    <div class="shelf">${cards}</div>`;

  const advCards = Object.values(TRIPS).slice(0,5).map(t=>tripCard(t, true)).join('');
  const archiveCards = Object.values(ARCHIVES).slice(0,5).map(d=>shelfCard({
    title: d.title,
    sub: `${avatar(pInit(d.poster),20)}<span class="tripcard__club">${PEOPLE[d.poster].name} · ${d.crew}</span>`,
    tag: d.kind, meta: d.place, nav:'archive', param:d.id,
  }, true)).join('');
  const clubBCards = Object.values(CLUB_BULLETIN).slice(0,5).map(b=>shelfCard({
    title: b.title,
    sub: `<span class="tripcard__club">${b.blurb}</span>`,
    tag: b.type, meta: `${b.club} · ${b.when}`, nav:'club-bulletin-list',
  }, true)).join('');
  const friendBCards = Object.values(FRIENDS_BULLETIN).slice(0,5).map(f=>shelfCard({
    title: f.title,
    sub: `${avatar(pInit(f.person),20)}<span class="tripcard__club">${PEOPLE[f.person].name}</span>`,
    tag: f.when, meta: f.blurb, nav:'friends-bulletin-list',
  }, true)).join('');

  return `
  <div class="home-top">
    <button class="avatar-btn" data-nav="profile-me">${avatar('YU',34)}</button>
    <button class="iconbtn" data-action="openNotifs">${I.bell}<span class="badge">3</span></button>
    <div class="home-brand">tandem</div>
    <button class="searchbar" data-nav="home-search"><span class="searchbar__ic">${I.search}</span><span class="searchbar__ph">Search</span></button>
    <button class="iconbtn" data-nav="messages" title="Messages">${I.plane}<span class="badge">3</span></button>
  </div>
  <div class="scroll">
    ${banner}
    <div class="qgrid mt2">${quick.map(([go,param,label,ic])=>`
      <button class="qtile" data-nav="${go}" ${param?`data-param="${param}"`:''}><div class="ph">${ic}</div><div class="qtile__t">${label}</div></button>`).join('')}</div>
    ${section('Sign ups for you', 'See more sign ups', 'signups-list', advCards)}
    ${section('Archives', 'See all archives', 'archives-list', archiveCards)}
    ${section('Club bulletin', 'See more', 'club-bulletin-list', clubBCards)}
    ${section('Friends bulletin', 'See more', 'friends-bulletin-list', friendBCards)}
    <div style="height:8px"></div>
  </div>
  ${tabbar('home')}`;
};

/* ============================================================
   Home "See more" list pages
   ============================================================ */
SCREENS['signups-list'] = () => {
  const pills = [['all','All'],['activities','Activities'],['adventures','Adventures']];
  const list = Object.values(TRIPS).filter(t=> U.homePill==='all' ? true : (U.homePill==='activities'? t.kind==='Activity' : t.kind==='Adventure'));
  return `
  ${pageHeader('Sign ups for you')}
  <div class="pillrow" style="padding:0 var(--s4) 10px">${pills.map(([id,l])=>`<button class="pill ${U.homePill===id?'on':''}" data-action="setHomePill" data-param="${id}">${l}</button>`).join('')}</div>
  <p class="small muted" style="padding:0 var(--s4) 4px">Adventures open a full trip page. Activities drop you straight into the crew chat.</p>
  <div class="scroll"><div class="tiles mt2">
    ${list.map(t=>tripCard(t,'grid')).join('')}
  </div><div style="height:16px"></div></div>`;
};

SCREENS['club-bulletin-list'] = () => `
  ${pageHeader('Club bulletin')}
  <div class="scroll"><div class="tiles mt3">
    ${Object.values(CLUB_BULLETIN).map(b=>shelfCard({
      title:b.title,
      sub:`<span class="tripcard__club">${b.blurb}</span>`,
      tag:b.type, meta:`${b.club} · ${b.when}`, nav:'club-bulletin-list',
    },'grid')).join('')}
  </div><div style="height:16px"></div></div>`;

SCREENS['friends-bulletin-list'] = () => `
  ${pageHeader('Friends bulletin')}
  <div class="scroll"><div class="tiles mt3">
    ${Object.values(FRIENDS_BULLETIN).map(f=>shelfCard({
      title:f.title,
      sub:`${avatar(pInit(f.person),20)}<span class="tripcard__club">${PEOPLE[f.person].name}</span>`,
      tag:f.when, meta:f.blurb, nav:'friends-bulletin-list',
    },'grid')).join('')}
  </div><div style="height:16px"></div></div>`;

/* Archives — a Pinterest-style inspiration board (masonry), filterable by Activities/Adventures */
SCREENS['archives-list'] = () => {
  const pills = [['all','All'],['activities','Activities'],['adventures','Adventures']];
  const list = Object.values(ARCHIVES).filter(d=> U.archPill==='all' ? true : (U.archPill==='activities'? d.kind==='Activity' : d.kind==='Adventure'));
  const heights = [150,205,168,222,158,190];
  return `
  ${pageHeader('Archives')}
  <div class="pillrow" style="padding:0 var(--s4) 8px">${pills.map(([id,l])=>`<button class="pill ${U.archPill===id?'on':''}" data-action="setArchPill" data-param="${id}">${l}</button>`).join('')}</div>
  <p class="small muted" style="padding:0 var(--s4) 4px">Trips people already took — tap one for inspiration, then reach out to whoever went.</p>
  <div class="scroll"><div class="masonry mt2">
    ${list.map((d,i)=>`<button class="mtile" data-nav="archive" data-param="${d.id}">
      <div class="ph" style="height:${heights[i%heights.length]}px">${I.img}</div>
      <div class="mtile__meta"><div class="mtile__t">${d.title}</div>
        <div class="mtile__sub">${avatar(pInit(d.poster),18)}<span>${d.crew}</span></div></div>
    </button>`).join('')}
  </div><div style="height:16px"></div></div>`;
};

/* Archive detail — who went, and how to reach out for the beta (no "clone") */
SCREENS['archive'] = (p) => {
  const d = ARCHIVES[p.id] || Object.values(ARCHIVES)[0];
  const poster = PEOPLE[d.poster];
  const first = poster.name.split(' ')[0];
  return `
  <div class="scroll" style="padding-bottom:0">
    <div style="position:relative">
      ${phImg('','420')}
      <div class="hero__grad" style="height:420px"></div>
      <div class="hero__nav" style="position:absolute;top:44px;left:0;right:0">
        <button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="back">${I.back}</button>
        <button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="toast" data-param="Saved to your ideas">${I.hearto}</button>
      </div>
      <div style="position:absolute;bottom:18px;left:0;right:0;padding:0 16px;color:#fff">
        <span class="tag" style="background:rgba(255,255,255,.2);border:none;color:#fff">${d.kind} · ${d.crew}</span>
        <h1 style="font-size:26px;font-weight:850;margin:10px 0 4px;letter-spacing:-.5px">${d.title}</h1>
        <div class="small" style="opacity:.9">${d.place} · ${d.when}</div>
      </div>
    </div>
    <div class="pad mt5"><p style="font-size:15px;line-height:1.5;margin:0">${d.caption}</p></div>
    <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">Who went</h3><span class="more">${d.roster.length} people</span></div>
    <div class="pad"><div class="whos card" style="padding:14px">${stack(d.roster.map(pInit),34)}
      <div class="txt"><b>${first}'s crew</b><div class="small muted">Posted by ${poster.name} · ${d.crew}</div></div></div></div>
    ${d.roster.map(id=>{const pp=PEOPLE[id];return `<button class="pcard" data-nav="profile-other" data-param="${id}"><div class="avatar">${pInit(id)}</div><div style="flex:1"><div class="pcard__n">${pp.name}${id===d.poster?' · posted this':''}</div><div class="pcard__s">${pp.year} · ${pp.from}</div></div><span class="chev">${I.chev}</span></button>`}).join('')}
    <div style="height:150px"></div>
  </div>
  <div class="archive-cta">
    <button class="btn" data-nav="dm-chat" data-param="${d.poster}" data-person="${poster.name}">Message ${first} for insight</button>
    <button class="btn btn--ghost mt2" data-nav="dm-chat" data-param="${d.poster}" data-person="${poster.name}">Reach out for details</button>
  </div>`;
};

SCREENS['home-search'] = () => {
  const all = Object.values(TRIPS);
  return `
  ${pageHeader('Search trips')}
  <div class="pad mt3">
    <div style="position:relative"><span style="position:absolute;left:12px;top:12px;color:var(--c-ink-3)">${I.search}</span>
      <input class="field" style="padding-left:38px" placeholder="Search a trip a friend told you about…" autofocus/></div>
    <p class="small muted mt3">Try “Sykes”, “surf”, “Bishop”…</p>
  </div>
  <div class="scroll" style="padding-top:6px"><div class="pad"><div class="list">
    ${all.map(t=>`<button class="row" style="width:100%;text-align:left" data-nav="trip" data-param="${t.id}">
      <div class="avatar" style="border-radius:12px;width:46px;height:46px">${I.trips}</div>
      <div class="row__body"><div class="row__title">${t.title}</div><div class="row__sub">${t.club} · ${t.when}</div></div>
      <span class="chev">${I.chev}</span></button>`).join('')}
  </div></div></div>`;
};

/* ============================================================
   FLOW 3 · Trip discovery + join
   ============================================================ */
SCREENS['trip'] = (p) => {
  const t = TRIPS[p.id] || TRIPS.sykes;
  const joinedState = S.joined[t.id];
  const full = t.spots.toLowerCase().includes('full');
  let cta;
  if (joinedState==='joined') cta = `<button class="btn btn--sub" data-nav="trip-hub" data-param="${t.id}">${I.check} You're in — open trip</button>`;
  else if (joinedState==='entered') cta = `<button class="btn btn--sub" data-nav="mytrips">Entered · results Wed 8 AM</button>`;
  else if (t.mode==='lottery') cta = `<button class="btn" data-action="join" data-param="${t.id}">${full?'Join waitlist':'Enter for a spot'}</button>`;
  else cta = `<button class="btn" data-action="join" data-param="${t.id}">Join now</button>`;

  return `
  <div class="scroll" style="padding-bottom:0">
    <div style="position:relative">
      ${phImg('','460')}
      <div class="hero__grad" style="height:460px"></div>
      <div class="hero__nav" style="position:absolute;top:44px;left:0;right:0">
        <button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="back">${I.back}</button>
        <button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="toast" data-param="Saved">${I.share}</button>
      </div>
      <div style="position:absolute;bottom:18px;left:0;right:0;padding:0 16px;color:#fff">
        <span class="tag" style="background:rgba(255,255,255,.2);border:none;color:#fff">${t.kind} · ${t.club}</span>
        <h1 style="font-size:28px;font-weight:850;margin:10px 0 4px;letter-spacing:-.5px">${t.title}</h1>
        <div class="small" style="opacity:.9">${t.when} · ${t.place}</div>
      </div>
    </div>
    <div class="pad mt5">
      <div class="whos card" style="padding:14px">
        ${stack(t.going, 34)}
        <div class="txt"><b>${t.goingN} going</b><div class="small muted">${t.mutuals} people you know are in</div></div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" class="mt3">
        <span class="tag">${I.flag} ${t.diff}</span>
        ${t.beginner?`<span class="tag">${I.check} Beginner-friendly</span>`:''}
        <span class="tag">${I.person} ${t.spots}</span>
        <span class="tag">${t.cost==='Free'?'Free':I.apple+' '+t.cost}</span>
      </div>
    </div>
    <div class="section-h"><h3>Itinerary</h3></div>
    <div class="pad"><div class="list">
      ${itinOf(t).map(([time,txt])=>`<div class="row"><span class="tag" style="width:78px;justify-content:center">${time}</span><div class="row__body"><div class="row__sub" style="white-space:normal;color:var(--c-ink)">${txt}</div></div></div>`).join('')}
    </div></div>
    <div class="section-h"><h3>The details</h3></div>
    <div class="pad">
      <p style="font-size:15px;line-height:1.5;margin:0 0 14px">${t.desc}</p>
      <div class="list">
        <div class="row"><div class="row__body"><div class="row__sub">Led by</div><div class="row__title">${PEOPLE[t.lead].name} · ${t.club} lead</div></div>${avatar(pInit(t.lead),34)}</div>
        <div class="row"><div class="row__body"><div class="row__sub">Cost</div><div class="row__title">${t.cost}${t.cost!=='Free'?' · Apple Pay':''}</div></div></div>
        <div class="row"><div class="row__body"><div class="row__sub">Capacity</div><div class="row__title">${t.spots}</div></div></div>
      </div>
      ${t.mode==='lottery'?`<div class="banner" style="margin-left:0;margin-right:0"><span>${I.clock}</span><span>Lottery trip — results push <b>Wednesday 8 AM</b>, pay by midnight. First-timers get 2 entries.</span></div>`:''}
      <div style="height:100px"></div>
    </div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px calc(20px + env(safe-area-inset-bottom,0));background:linear-gradient(180deg,transparent,var(--c-screen) 22%)">${cta}</div>`;
};

/* ============================================================
   Activity — a day thing tied straight to its crew chat
   ============================================================ */
const ACT_CREW = { bishop:'moon', surf:'beach', climb:'send' };
SCREENS['activity'] = (p) => {
  const t = TRIPS[p.id] || TRIPS.bishop;
  const crewId = ACT_CREW[t.id] || 'moon';
  const crew = CREWS[crewId];
  const lead = PEOPLE[t.lead];
  const itin = itinOf(t);
  const meet = itin[0][0];
  return `
  <div class="scroll" style="padding-bottom:0">
    <div style="position:relative">
      ${phImg('','300')}
      <div class="hero__grad" style="height:300px"></div>
      <div class="hero__nav" style="position:absolute;top:44px;left:0;right:0">
        <button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="back">${I.back}</button>
        <button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="toast" data-param="Saved">${I.share}</button>
      </div>
      <div style="position:absolute;bottom:16px;left:0;right:0;padding:0 16px;color:#fff">
        <span class="tag" style="background:rgba(255,255,255,.2);border:none;color:#fff">Activity · ${t.club}</span>
        <h1 style="font-size:26px;font-weight:850;margin:8px 0 2px;letter-spacing:-.5px">${t.title}</h1>
      </div>
    </div>

    <div class="pad mt4"><div class="act-when">
      <div class="act-when__ic">${I.cal}</div>
      <div><div class="act-when__big">${t.when}</div><div class="small muted">${t.place} · meet at ${meet}</div></div>
    </div></div>

    <div class="pad mt3"><div class="act-note">
      <div class="act-note__head">${avatar(pInit(t.lead),30)}<div><div class="strong small">${lead.name} · lead</div><div class="small muted">a heads-up for this one</div></div></div>
      <p class="act-note__body">“Be at the lot by ${meet} sharp — if you're late I'm leaving without you 😅. We go slow, tacos after.”</p>
    </div></div>

    <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">Itinerary</h3></div>
    <div class="pad"><div class="list">${itin.map(([time,txt])=>`<div class="row"><span class="tag" style="width:78px;justify-content:center">${time}</span><div class="row__body"><div class="row__sub" style="white-space:normal;color:var(--c-ink)">${txt}</div></div></div>`).join('')}</div></div>

    <div class="pad mt4"><div class="whos card" style="padding:14px">${stack(t.going,34)}<div class="txt"><b>${t.goingN} going</b><div class="small muted">${t.mutuals} people you know are in</div></div></div></div>
    <div style="height:120px"></div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px calc(20px + env(safe-area-inset-bottom,0));background:linear-gradient(180deg,transparent,var(--c-screen) 22%)">
    <button class="btn" data-nav="channel-chat" data-param="${crewId}">${I.chat} Open ${crew.name} chat</button>
    <p class="small muted center mt2">This activity lives in the crew chat — jump in to say you're coming.</p>
  </div>`;
};

/* ============================================================
   My Trips — upcoming/past nav, streak bar, big tiles
   ============================================================ */
function streakBar(){
  const weeks = 3; // demo state — 3-week streak
  return `<div class="streak">
    ${orangutan(weeks, 56)}
    <div style="flex:1">
      <div class="streak__label">Adventure streak</div>
      <div class="streak__big">${weeks} weeks</div>
      <div class="small muted mt1">${weeks} weeks of getting out there.</div>
    </div>
  </div>`;
}
SCREENS['mytrips'] = () => {
  const upcoming = Object.keys(S.joined);
  const isUp = U.mtTab==='upcoming';
  const upBody = `
    ${streakBar()}
    <div class="pad" style="padding-bottom:12px">
      ${upcoming.length? upcoming.map(id=>{const t=TRIPS[id];const st=S.joined[id];return `
        <button class="bigtrip" data-nav="${st==='entered'?'trip':'trip-hub'}" data-param="${id}">
          <div class="ph" style="height:158px">${I.img}<div class="hero__grad"></div>
            <div class="bigtrip__over"><span class="tag" style="background:rgba(255,255,255,.2);border:none;color:#fff">${t.kind}</span>
              <div style="font-size:19px;font-weight:800;margin-top:6px">${t.title}</div></div></div>
          <div class="bigtrip__meta"><div class="small muted">${st==='entered'?'Entered · results Wed 8 AM':t.when+' · '+t.place}</div>
            <div class="mt2" style="display:flex;align-items:center;gap:8px">${stack(t.going.slice(0,3),22)}<span class="small muted">${t.goingN} going · tap to open the trip</span></div></div>
        </button>`}).join('') : `<p class="muted center mt6">No upcoming trips yet — find one on Home.</p>`}
    </div>`;
  const pastBody = `
    <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:17px">Past trips</h3><span class="more">${I.patch} patches earned</span></div>
    <div class="pad">
      ${[['pismo','Pismo Beach Cleanup','Feb 22 · 11 photos','First Wave'],['cerro','Cerro San Luis Hike','Feb 8 · 6 photos','Sunset Summit']].map(([id,title,meta,patch])=>`
        <button class="bigtrip" data-nav="album" data-param="${id}">
          <div class="ph" style="height:150px">${I.img}</div>
          <div class="bigtrip__meta"><div class="row__title">${title}</div><div class="small muted mt2">${meta}</div>
            <div class="mt2" style="display:flex;align-items:center;gap:8px"><span class="tag">${I.patch} ${patch} patch</span><span class="small muted">· message the people you went with</span></div></div>
        </button>`).join('')}
    </div>`;
  return `
  ${topbar('My Trips')}
  <div class="topbar" style="padding-top:0"><div class="segment" style="flex:1">
    <div class="segment__i ${isUp?'on':''}" data-action="setMtTab" data-param="upcoming">Upcoming</div>
    <div class="segment__i ${!isUp?'on':''}" data-action="setMtTab" data-param="past">Past</div>
  </div></div>
  <div class="scroll" style="padding-top:4px">${isUp?upBody:pastBody}<div style="height:16px"></div></div>
  ${tabbar('mytrips')}`;
};

/* ============================================================
   TRIP HUB — 4-way swipe canvas (center = chat)
   ============================================================ */
SCREENS['trip-hub'] = (p) => {
  const t = TRIPS[p.id] || TRIPS.sykes;
  return `<div class="hub"><div class="hub__track">
    ${hubCenter(t)}
    ${hubOverview(t)}
    ${hubRides(t)}
    ${hubDetails(t)}
    ${hubWho(t)}
  </div></div>`;
};
SCREENS['trip-hub'].mount = mountHub;

function hubCenter(t){
  const msgs = [['MP·lead','Stoked for this! Gear list is under ‹ Details',false],['JR','I can drive 3 from campus',false],['You','Claimed a seat — thanks Jordan!',true]];
  return `<div class="hub__panel c"><div class="hubc">
    <div class="hubc__top">
      <button class="iconbtn" data-action="back">${I.back}</button>
      <div style="flex:1;min-width:0;text-align:center;padding:0 8px">
        <div class="strong" style="font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.title}</div>
        <div class="small muted">${t.when} · ${t.place}</div>
      </div>
      <button class="iconbtn" data-action="toast" data-param="Trip options">${I.share}</button>
    </div>
    <div class="hubhint-row t"><button class="hubhint" data-action="hubGo" data-param="u">${I.up} Overview</button></div>
    <button class="hubhint l" data-action="hubGo" data-param="l">${I.left} Details</button>
    <button class="hubhint r" data-action="hubGo" data-param="r">Who's going ${I.right}</button>
    <div class="chatcut">
      <button class="chatcut__expand" data-action="expandChat" data-param="${t.id}"><span class="bar"></span> ${I.expand} Expand chat</button>
      <div class="chatcut__body" data-scrollable>${bubbles(msgs)}</div>
      <div class="chatcut__composer"><input class="field" placeholder="Message the trip…" data-scrollable/><button class="btn" style="width:auto;padding:0 16px" data-action="toast" data-param="Sent">${I.plane}</button></div>
    </div>
    <div class="hubhint-row b"><button class="hubhint" data-action="hubGo" data-param="d">${I.car} Rides & tent ${I.down}</button></div>
  </div></div>`;
}
function hubPanelHead(title){
  return `<div class="hub__phead"><button class="iconbtn" data-action="hubGo" data-param="c">${I.back}</button><div class="t">${title}</div><span class="hub__back" data-action="hubGo" data-param="c">Hub ${I.chat}</span></div>`;
}
function hubOverview(t){
  return `<div class="hub__panel u">${hubPanelHead('Overview')}
    <div class="hub__scroll" data-scrollable>
      <div style="position:relative">${phImg('',180)}<div class="hero__grad" style="height:180px"></div>
        <div style="position:absolute;bottom:12px;left:14px;right:14px;color:#fff"><div style="font-size:20px;font-weight:850">${t.title}</div><div class="small" style="opacity:.9">${t.when} · ${t.place}</div></div></div>
      <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">Itinerary</h3></div>
      <div class="pad"><div class="list">${itinOf(t).map(([time,txt])=>`<div class="row"><span class="tag" style="width:76px;justify-content:center">${time}</span><div class="row__body"><div class="row__sub" style="white-space:normal;color:var(--c-ink)">${txt}</div></div></div>`).join('')}</div></div>
      <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">Cost breakdown</h3></div>
      <div class="pad"><div class="list">${costsOf(t).map(([l,v],i)=>`<div class="row"><div class="row__body"><div class="row__title">${l}</div></div><span class="strong">${v}</span></div>`).join('')}</div></div>
      <div class="pad mt4"><button class="row card" style="width:100%;text-align:left" data-action="hubGo" data-param="r"><div class="row__body"><div class="row__title">${t.goingN} going · ${t.mutuals} you know</div><div class="row__sub">Swipe right to see everyone</div></div>${stack(t.going.slice(0,4),26)}</button></div>
      <div style="height:20px"></div>
    </div></div>`;
}
function hubRides(t){
  const isRide = U.rideTab==='ride';
  const slots = isRide
    ? [['Jordan — 3 seats','taken'],['You','taken'],['+ open seat','open'],['+ open seat','open'],['+ open seat','open'],['+ open seat','open']]
    : [["Maya's 4-person",'taken'],['You','taken'],['+ open spot','open'],['+ open spot','open']];
  return `<div class="hub__panel d">${hubPanelHead('Rides & Tent')}
    <div class="hub__scroll" data-scrollable>
      <div class="pad mt3"><div class="segment">
        <div class="segment__i ${isRide?'on':''}" data-action="setRideTab" data-param="ride">${I.car} Ride sign-up</div>
        <div class="segment__i ${!isRide?'on':''}" data-action="setRideTab" data-param="tent">${I.tent} Tent sign-up</div>
      </div>
      <p class="small muted mt3">${isRide?'Tap an open seat to claim it. Driver cancels → riders notified → autofill from the waitlist.':'Tap an open tent spot to claim it.'}</p>
      <div class="slots mt2" style="padding:0">${slots.map((s,i)=>`<div class="slot ${s[1]}" ${s[1]==='open'?`data-action="claimSlot" data-param="${U.rideTab}-${i}"`:''}>${U.slots[U.rideTab+'-'+i]?I.check+' You':s[0]}</div>`).join('')}</div>
      <div style="height:20px"></div></div>
    </div></div>`;
}
function hubDetails(t){
  const items = ['Sleeping bag (0°F)','Headlamp','2L water','Swimsuit + towel','Trail snacks','Layers — it gets cold'];
  const lead = PEOPLE[t.lead];
  return `<div class="hub__panel l">${hubPanelHead('More details')}
    <div class="hub__scroll" data-scrollable>
      <button class="pcard" data-nav="profile-other" data-param="${t.lead}"><div class="avatar">${pInit(t.lead)}</div><div style="flex:1"><div class="pcard__n">${lead.name} · trip lead</div><div class="pcard__s">${lead.trips} trips${lead.trips>=10?' · experienced':''} · ${lead.certs.join(' · ')||'—'}</div></div><span class="chev">${I.chev}</span></button>
      <div class="post"><div class="post__h">${avatar(pInit(t.lead),34)}<div><div class="strong small">${lead.name} · lead</div><div class="small muted">2 days ago</div></div></div>
        <p style="font-size:14px;line-height:1.5;margin:0">Weather looks perfect. Phone service is spotty up there — download your map. Be at the lot 10 min early; we leave on time. 🎒</p></div>
      <div class="post"><div class="post__h">${avatar(pInit(t.lead),34)}<div><div class="strong small">${lead.name} · lead</div><div class="small muted">4 days ago</div></div></div>
        <p style="font-size:14px;line-height:1.5;margin:0">Posted the full gear list below — borrow anything you're missing from the club Gear Shed.</p></div>
      <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">What to pack</h3></div>
      ${items.map((it,i)=>`<div class="check ${U.packList[i]?'done':''}" data-action="togglePack" data-param="${i}"><span class="box">${U.packList[i]?I.check:''}</span><span class="t">${it}</span></div>`).join('')}
      <div class="pad mt5" style="padding-bottom:24px"><button class="btn btn--ghost" data-action="cancelSpot" data-param="${t.id}" style="color:var(--c-ink-2)">Cancel my spot</button>
        <p class="small muted center mt2">Drops your spot and cascades the roster to fill it.</p></div>
    </div></div>`;
}
function hubWho(t){
  return `<div class="hub__panel r">${hubPanelHead("Who's going")}
    <div class="hub__scroll" data-scrollable>
      <p class="small muted pad mt3">${t.goingN} going · ${t.mutuals} you already know. Tap anyone to say hi before the trip.</p>
      ${t.roster.map(id=>{const p=PEOPLE[id];return `<button class="pcard" data-nav="profile-other" data-param="${id}"><div class="avatar">${pInit(id)}</div><div style="flex:1"><div class="pcard__n">${p.name}${id===t.lead?' · lead':''} ${p.mutual?'<span class="tag" style="margin-left:4px">you know</span>':''}</div><div class="pcard__s">${p.year} · ${p.from}</div></div><span class="chev">${I.chev}</span></button>`}).join('')}
      <div style="height:20px"></div>
    </div></div>`;
}
/* full-screen chat (from the expand bar) */
SCREENS['trip-chat'] = (p) => {
  const t = TRIPS[p.id] || TRIPS.sykes;
  const msgs = [['MP·lead','Stoked for this! Gear list is in Details 🎒',false],['JR','I can drive 3 from campus',false],['You','Claimed a seat — thanks Jordan!',true],['RS','What time are we back Sunday?',false],['MP·lead','Rolling back around 4, tacos on the way',false]];
  return `
  ${pageHeader(t.title+' · chat')}
  <div class="scroll pad" style="padding-top:8px">${bubbles(msgs)}</div>
  <div class="pad" style="padding-bottom:16px"><div style="display:flex;gap:8px"><input class="field" placeholder="Message the trip…"/><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div></div>`;
};

/* ============================================================
   FLOW 2 · Communities
   ============================================================ */
SCREENS['communities'] = () => {
  const isYours = U.commTab==='yours';
  const yourClubs = Object.keys(S.members).filter(k=>S.members[k]);
  const yourCrews = Object.values(CREWS).filter(c=>c.hearted);
  const body = isYours
    ? `<div class="pad mt3">
        <div class="divlabel" style="margin-top:6px">your clubs</div>
        <div class="list">${yourClubs.map(id=>{const c=CLUBS[id];return `
          <button class="row" style="width:100%;text-align:left" data-nav="club" data-param="${id}"><div class="avatar" style="border-radius:12px;width:46px;height:46px">${c.name[0]}</div><div class="row__body"><div class="row__title">${c.name}</div><div class="row__sub">${c.kind} · ${c.members} members</div></div><span class="chev">${I.chev}</span></button>`}).join('')||'<div class="row"><div class="row__sub">None yet — hop to Join →</div></div>'}</div>
        <div class="divlabel">your crews</div>
        <div class="list">${yourCrews.map(c=>`<button class="row" style="width:100%;text-align:left" data-nav="channel-chat" data-param="${c.id}"><div class="avatar" style="border-radius:12px;width:46px;height:46px">${I.comm}</div><div class="row__body"><div class="row__title">${c.name}</div><div class="row__sub">You + ${c.members-1} · ${c.sub}</div></div><span class="chev">${I.chev}</span></button>`).join('')}</div>
      </div>`
    : communitiesJoin();
  return `
  ${topbar('Communities')}
  <div class="topbar" style="padding-top:0"><div class="segment" style="flex:1">
    <div class="segment__i ${isYours?'on':''}" data-action="setCommTab" data-param="yours">Yours</div>
    <div class="segment__i ${!isYours?'on':''}" data-action="setCommTab" data-param="join">Join</div>
  </div></div>
  <div class="scroll" style="padding-top:0">${body}</div>
  ${tabbar('communities')}`;
};
function communitiesJoin(){
  const isClubs = U.commFilter==='clubs';
  const list = isClubs ? Object.values(CLUBS) : Object.values(CREWS);
  return `
  <div class="pad mt3"><div style="display:flex;gap:8px">
    <button class="chip ${isClubs?'on':''}" data-action="setCommFilter" data-param="clubs">Clubs</button>
    <button class="chip ${!isClubs?'on':''}" data-action="setCommFilter" data-param="crews">Crews</button>
  </div></div>
  <div class="pad mt3"><div style="display:flex;gap:10px">
    <button class="btn btn--sub" data-nav="create-crew"><div>${I.plus}</div> Create a crew</button>
    <button class="btn btn--sub" data-action="createClub">${I.plus} Create a club</button>
  </div><p class="small muted mt2">Crews you can spin up right here on your phone. Clubs are set up on desktop.</p></div>
  <div class="tiles mt3">${list.map(c=>`
    <button class="card tile" data-nav="${isClubs?'club':'messages'}" ${isClubs?`data-param="${c.id}"`:''}>${phImg('',96)}<div class="tile__meta"><div class="tile__title">${c.name}</div><div class="small muted mt2">${c.members} members${!isClubs?' · public crew':''}</div></div></button>`).join('')}
  </div><div style="height:16px"></div>`;
}

SCREENS['club'] = (p) => {
  const c = CLUBS[p.id] || CLUBS.field;
  const isMember = !!S.members[c.id];
  const tabs = isMember ? [['landing','Landing'],['signups','Trip Signups'],['links','Useful Links'],['members','Members'],['messages','Messages']]
                        : [['landing','Landing'],['signups','Trip Signups'],['links','Useful Links']];
  let body;
  if (U.clubTab==='signups') body = clubSignups(c,isMember);
  else if (U.clubTab==='links') body = clubLinks(c);
  else if (U.clubTab==='members') body = clubMembers(c);
  else if (U.clubTab==='messages' && isMember) body = clubMessages(c);
  else body = clubLanding(c,isMember);
  return `
  <div class="scroll" style="padding-top:0">
    <div style="position:relative">
      ${phImg('','170')}
      <div class="hero__nav" style="position:absolute;top:44px;left:0;right:0"><button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="back">${I.back}</button></div>
    </div>
    <div class="pad" style="margin-top:-30px;position:relative">
      <div class="card" style="padding:16px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><div class="strong" style="font-size:20px">${c.name}</div><div class="small muted mt2">${c.kind} · ${c.blurb}</div></div>
          ${avatar(c.name[0],44)}
        </div>
        <div class="whos mt3">${stack(['MP','JR','AL','KM','DT'],28)}<div class="small"><b>${c.members} members</b> · 5 you know</div></div>
      </div>
    </div>
    <div class="toptabs sticky mt3">${tabs.map(([id,l])=>`<div class="toptabs__i ${U.clubTab===id?'on':''}" data-action="setClubTab" data-param="${id}">${l}</div>`).join('')}</div>
    ${body}
    ${!isMember?'<div style="height:80px"></div>':'<div style="height:20px"></div>'}
  </div>
  ${!isMember?`<div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px calc(16px + env(safe-area-inset-bottom,0));background:linear-gradient(180deg,transparent,var(--c-screen) 30%)"><button class="btn" data-action="payDues" data-param="${c.id}">Become a member${c.dues!=='Free'?' · '+c.dues:''}</button></div>`:''}`;
};
SCREENS['club'].mount = ()=>{};
function clubLanding(c, isMember){
  return `<div class="pad mt4">
    ${phImg('','160')}
    <p style="font-size:15px;line-height:1.5" class="mt3">${c.blurb} We run trips every other weekend, teach the skills, and handle the gear. Come for one trip, stay for the people.</p>
    <div class="tiles mt3">${[0,1,2,3].map(()=>phImg('',96)).join('')}</div>
    <div class="divlabel">next trip</div>
    ${tripCard(TRIPS.sykes)}
  </div>`;
}
function clubSignups(c, isMember){
  const ids = ['sykes','ski','climb'];
  return `<div class="pad mt4">
    <p class="small muted">${isMember?'Big cards you swipe through. Rank the ones you want — leads use your ranking when spots are limited.':'Non-members can see what\'s happening — join to rank & sign up.'}</p>
    <div class="shelf mt3 ${isMember?'':'blur'}" style="padding-left:0">${ids.map((id,i)=>{const t=TRIPS[id];const r=U.ranks[id]||0;return `
      <div class="card tripcard rankcard" style="width:250px">
        ${r?`<span class="rankbadge">${r}</span>`:''}
        ${phImg('',160)}
        <div class="tripcard__meta"><div class="tripcard__title">${t.title}</div><div class="small muted mt2">${t.when} · ${t.cost} · ${t.spots}</div>
          <div class="rankbtns mt3"><button class="chip ${r?'on':''}" data-action="rankTrip" data-param="${id}">${r?'Ranked #'+r:'Rank this trip'}</button><button class="chip" data-nav="trip" data-param="${id}">View</button></div>
        </div>
      </div>`}).join('')}</div>
    <p class="small muted mt3">Tap “Rank this trip” to set your priority (1, 2, …). Tap again to bump it.</p>
  </div>`;
}
function clubLinks(c){
  const links = ['Instagram / website','Drop a trip idea','Become a member','Request a refund','Driver reimbursement','Tutorials'];
  return `<div class="pad mt4"><div class="list">${links.map(l=>`<button class="row" style="width:100%;text-align:left" data-action="toast" data-param="Placeholder link"><div class="row__body"><div class="row__title">${l}</div></div><span class="chev">${I.chev}</span></button>`).join('')}</div></div>`;
}
function clubMembers(c){
  return `<div class="pad mt4">
    <div class="section-h" style="padding:0 0 8px"><h3 style="font-size:16px">Upcoming for members</h3></div>
    ${tripCard(TRIPS.sykes)}
    <div class="section-h" style="padding:16px 0 8px"><h3 style="font-size:16px">Perks</h3></div>
    <div class="list">
      <button class="row" data-action="toast" data-param="Gear Shed"><div class="row__body"><div class="row__title">Gear Shed — borrow gear</div></div><span class="chev">${I.chev}</span></button>
      <button class="row" data-action="toast" data-param="Get more involved"><div class="row__body"><div class="row__title">Get more involved</div></div><span class="chev">${I.chev}</span></button>
    </div>
  </div>`;
}
function clubMessages(c){
  const justPub = S.publishedTrip && S.publishedTrip.clubId===c.id ? TRIPS[S.publishedTrip.tripId] : null;
  return `<div class="pad mt4">
    ${justPub?`<button class="card tripcard tripcard--grid" style="margin-bottom:14px" data-nav="trip" data-param="${justPub.id}">
      ${phImg('',110)}
      <div class="tripcard__meta"><div class="small muted">${I.check} Just published — tap to view</div><div class="tripcard__title mt1">${justPub.title}</div></div>
    </button>`:''}
    ${bubbles([['MP·lead','Welcome! Post-trip pics + logistics all live here.',false],['JR','Anyone free to co-lead next month?',false],['','I can help plan!',true]])}
  </div>
  <div class="pad" style="padding-bottom:16px"><div style="display:flex;gap:8px"><input class="field" placeholder="Message ${c.name}…"/><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div></div>`;
}

/* ============================================================
   FLOW 4 · Plan
   ============================================================ */
SCREENS['plan'] = () => `
  ${topbar('Plan')}
  <div class="scroll">
    <div class="section-h"><h3>Pick back up</h3></div>
    <div class="shelf">
      <button class="card tripcard tripcard--sm" data-action="toast" data-param="Draft — start new below">${phImg('',104)}<div class="tripcard__meta"><div class="tripcard__title">Bishop Peak (draft)</div><div class="small muted mt2">Not published</div></div></button>
      <button class="card tripcard tripcard--sm" data-action="toast" data-param="Saved ideas">${phImg('',104)}<div class="tripcard__meta"><div class="tripcard__title">Inspo — saved ideas</div></div></button>
    </div>
    <div class="pad mt6"><button class="btn" data-action="planSheet">${I.plus} Plan something new</button>
    <p class="small muted center mt2">Opens a quick menu — an activity or an adventure.</p></div>
    <div style="height:20px"></div>
  </div>
  ${tabbar('plan')}`;

const ACT_STEPS = [
  { q:'Name your trip', hint:'The most important part — keep it short and inviting.',
    field:()=>`<input class="field" placeholder="e.g. Bishop Peak Sunset Hike" autofocus />` },
  { q:'When is it?', hint:'Pick the day, then add a quick note on timing.',
    field:()=>`<div class="label">Date</div><input class="field" type="date" />
      <div class="label mt4">A note on the timing</div>
      <input class="field" placeholder="e.g. out the door by 7 AM sharp" />` },
  { q:'Itinerary', hint:'A rough play-by-play so people know the plan.',
    field:()=>`<textarea class="field" style="min-height:150px" placeholder="5:15  meet at the trailhead lot&#10;5:30  head up together — we go slow&#10;sunset  photos at the top&#10;after  tacos for anyone in"></textarea>` },
  { q:'Describe it', hint:"What's the vibe? What should people expect?",
    field:()=>`<textarea class="field" style="min-height:150px" placeholder="Chill after-class hike, tacos after…"></textarea>` },
  { q:'General location', hint:'Type a common name — not an exact address.',
    field:()=>`<input class="field" placeholder="e.g. Bishop Peak trailhead · San Luis Obispo" />` },
  { q:'Money & rides', hint:'Both optional — flip on only what you need. Easy to skip either.',
    field:()=>planBudget() },
  { q:'Add photos', hint:'At least one so people know what they\'re in for.',
    ready:()=> U.plan.photos>=1, field:()=>planPhotos() },
  { q:'Who can see it?', hint:'Pick one — this is where it gets published.',
    cta:'Publish trip', ready:()=> !!U.plan.vis, field:()=>planPublish() },
];
SCREENS['plan-activity'] = () => {
  const i = U.actIndex, step = ACT_STEPS[i], last = i===ACT_STEPS.length-1;
  const ready = step.ready ? step.ready() : true;
  const cta = step.cta || (last?'Publish trip':'Continue');
  return `
  <div class="progress mt2"><i style="width:${((i+1)/ACT_STEPS.length)*100}%"></i></div>
  <div class="ob">
    <div class="ob__top"><button class="iconbtn" data-action="actBack">${I.back}</button><span class="skip muted">${i+1} / ${ACT_STEPS.length}</span></div>
    <div class="ob__body"><div class="ob__q">${step.q}</div>${step.hint?`<div class="ob__hint">${step.hint}</div>`:''}${step.field()}</div>
    <div class="ob__foot"><button class="btn" ${ready?'data-action="actNext"':'disabled'}>${cta}</button></div>
  </div>`;
};

/* Budget & rides — two independent shelves you flip on */
function planBudget(){
  const pl = U.plan;
  const total = pl.gas + pl.permits + pl.food;
  const perHead = pl.heads>0 ? Math.round(total/pl.heads) : 0;
  const enough = perHead>=5;
  const cost = (k,l,d)=>`<div class="cost-row">
      <div class="cost-row__lbl"><div class="strong small">${l}</div><div class="small muted">${d}</div></div>
      <div class="stepper"><button data-action="planCost" data-param="${k}:-">–</button><span>$${pl[k]}</span><button data-action="planCost" data-param="${k}:+">+</button></div>
    </div>`;
  return `
  <div class="shelf-card">
    <div class="shelf-card__head">
      <div><div class="shelf-card__t">Split a budget</div><div class="small muted">Split the cost of the trip — gas, permits, food.</div></div>
      <button class="toggle ${pl.budgetOn?'on':''}" data-action="planToggle" data-param="budget"><span></span></button>
    </div>
    ${pl.budgetOn?`<div class="shelf-card__body">
      ${cost('gas','Gas','fuel to the trailhead & back')}
      ${cost('permits','Permits','parking or trail permits')}
      ${cost('food','Food','shared snacks / group meal')}
      <div class="cost-row">
        <div class="cost-row__lbl"><div class="strong small">How many going?</div><div class="small muted">expected headcount</div></div>
        <div class="stepper"><button data-action="planHeads" data-param="-">–</button><span>${pl.heads}</span><button data-action="planHeads" data-param="+">+</button></div>
      </div>
      ${total>0?(enough
        ? `<div class="reimburse"><div class="small muted">Estimated reimbursement</div><div class="reimburse__big">$${perHead}<span> / person</span></div><div class="small muted">$${total} total ÷ ${pl.heads} people</div></div>`
        : `<div class="banner" style="margin:14px 0 0"><span>${I.money}</span><span>That's about <b>$${perHead}/person</b> — too little to split. Just have them <b>buy you a coffee</b> instead. Splitting kicks in over $5 each.</span></div>`)
      :''}
    </div>`:''}
  </div>

  <div class="shelf-card mt3">
    <div class="shelf-card__head">
      <div><div class="shelf-card__t">Ride share</div><div class="small muted">Carpool there together.</div></div>
      <button class="toggle ${pl.rideOn?'on':''}" data-action="planToggle" data-param="ride"><span></span></button>
    </div>
    ${pl.rideOn?`<div class="shelf-card__body">
      <p class="small muted" style="margin:0 0 12px">Who are you taking? Add seats to your car — once it's published, others can claim a seat or add their own car.</p>
      <div class="car">
        <div class="car__head">${I.car}<div class="strong small" style="flex:1">Your car</div>
          <div class="stepper stepper--sm"><button data-action="planSeats" data-param="-">–</button><span>${pl.carSeats}</span><button data-action="planSeats" data-param="+">+</button></div></div>
        <div class="car__seats">${[...Array(pl.carSeats)].map((_,i)=>`<div class="seat ${i===0?'me':'open'}">${i===0?'You · driver':'Open seat'}</div>`).join('')}</div>
      </div>
      <button class="btn btn--sub mt3" data-action="toast" data-param="Riders can add their own car after you publish">${I.plus} Add another carpool</button>
    </div>`:''}
  </div>`;
}

/* Photos — first one required */
function planPhotos(){
  const n = U.plan.photos;
  return `<div class="tiles" style="padding:0;grid-template-columns:1fr 1fr 1fr">${[0,1,2,3,4,5].map(i=>`
    <button class="ph photo-slot ${i===0?'req':''} ${i<n?'filled':''}" style="height:96px;border-radius:12px" data-action="planPhoto">${i<n?I.check:I.plus}</button>`).join('')}</div>
    <p class="small muted mt3">${n>=1?`${n} added — looking good.`:'Add at least one — the first slot is required to publish.'}</p>`;
}

/* Publish — who can see it: three dropdowns + a repeat-weekly shelf */
function planPublish(){
  const pl = U.plan, open = pl.visOpen;
  return `
  <div class="drop ${open==='crew'?'open':''} ${pl.vis==='crew'?'sel':''}">
    <button class="drop__head" data-action="planDrop" data-param="crew">
      <div class="drop__ic">${I.comm}</div>
      <div class="drop__t"><div class="strong">Post to a crew</div><div class="small muted">${pl.vis==='crew'&&CREWS[pl.visCrew]?CREWS[pl.visCrew].name:"Share it with a crew you're already in"}</div></div>
      <span class="chev" style="transform:rotate(${open==='crew'?90:0}deg)">${I.chev}</span>
    </button>
    ${open==='crew'?`<div class="drop__body">${Object.values(CREWS).map(c=>`<button class="drop__opt ${pl.visCrew===c.id?'on':''}" data-action="planPickCrew" data-param="${c.id}"><span>${c.name}</span><span class="small muted">You + ${c.members-1}</span></button>`).join('')}</div>`:''}
  </div>

  <div class="drop ${open==='draft'?'open':''} ${pl.vis==='draft'?'sel':''} mt3">
    <button class="drop__head" data-action="planDrop" data-param="draft">
      <div class="drop__ic">${I.users}</div>
      <div class="drop__t"><div class="strong">Draft a crew for this</div><div class="small muted">${pl.vis==='draft'?pl.draftFriends.length+' friends added':'Spin up an event crew — add friends'}</div></div>
      <span class="chev" style="transform:rotate(${open==='draft'?90:0}deg)">${I.chev}</span>
    </button>
    ${open==='draft'?`<div class="drop__body">${Object.values(PEOPLE).map(pp=>`<button class="drop__opt ${pl.draftFriends.includes(pp.id)?'on':''}" data-action="planDraftFriend" data-param="${pp.id}"><span>${pp.name}</span><span>${pl.draftFriends.includes(pp.id)?I.check:I.plus}</span></button>`).join('')}</div>`:''}
  </div>

  <div class="drop ${pl.vis==='public'?'sel':''} mt3">
    <button class="drop__head" data-action="planPublic">
      <div class="drop__ic">${I.map}</div>
      <div class="drop__t"><div class="strong">Public — anyone can join</div><div class="small muted">Anyone on your campus can see & join</div></div>
      <span class="drop__radio">${pl.vis==='public'?I.check:''}</span>
    </button>
  </div>

  <div class="divlabel">extras</div>
  <div class="shelf-card">
    <div class="shelf-card__head">
      <div><div class="shelf-card__t">Repeat weekly</div><div class="small muted">e.g. a standing Thursday sunset hike.</div></div>
      <button class="toggle ${pl.repeat?'on':''}" data-action="planToggle" data-param="repeat"><span></span></button>
    </div>
  </div>`;
}

/* Adventures aren't planned on the phone — hand the link off to your Mac */
SCREENS['plan-adventure-link'] = () => `
  ${pageHeader('Plan an adventure')}
  <div class="scroll pad adv-link">
    <p class="center muted adv-link__intro">Adventures get planned on your Mac — more room for the write-up and budget. Send yourself the link:</p>
    <button class="airdrop-card" data-action="airdropPlan">
      <div class="airdrop-card__ic">${I.airdrop}</div>
      <div class="airdrop-card__t">AirDrop to your Mac</div>
      <div class="airdrop-card__s">tandemlife.studio</div>
    </button>
    <div class="divlabel">or copy it</div>
    <div class="copylink">
      <div class="copylink__url">tandemlife.studio</div>
      <button class="copylink__btn" data-action="copyPlanLink">${I.share} Copy</button>
    </div>
  </div>`;

/* ============================================================
   FLOW 5 · Create a crew (mobile) / club (desktop)
   ============================================================ */
SCREENS['create-crew'] = () => `
  ${pageHeader('Create a crew')}
  <div class="scroll pad">
    <p class="muted mt3" style="font-size:15px">A crew is basically a group chat with your people — like a private trip circle. Public or private, invite by link.</p>
    <div class="label mt4">Add a cover pic</div>${phImg('','120')}
    <div class="mt4"><div class="label">Crew name</div><input class="field" placeholder="e.g. Sunday Summit Club"/></div>
    <div class="mt4"><div class="label">About</div><textarea class="field" placeholder="What's this crew about?"></textarea></div>
    <div class="mt4"><div class="label">Public or private</div><div style="display:flex;gap:8px"><button class="chip on">Private — invite only</button><button class="chip">Public — anyone can join</button></div></div>
    <div class="mt4"><div class="label">Invite your friends</div><button class="btn btn--sub" data-action="toast" data-param="Invite link copied">${I.share} Copy invite link</button></div>
    <div class="mt6"><button class="btn" data-action="createCrew">Create crew</button></div>
    <div style="height:20px"></div>
  </div>`;

SCREENS['create-start'] = () => `
  ${pageHeader('Start a club')}
  <div class="pad mt5">
    <p class="muted" style="font-size:16px">Clubs are school-official and set up on desktop — you'll draft here and finish on your laptop.</p>
    <button class="optcard mt4" data-nav="create-steps" data-param="Club"><div class="avatar">${I.shield}</div><div><div class="strong" style="font-size:17px">Club</div><div class="small muted mt2">Official org — can take dues via school PayPal.</div></div></button>
    <p class="small muted mt4">Looking for something lighter? <b data-nav="create-crew" style="text-decoration:underline">Create a crew</b> instead — you can do that right here on your phone.</p>
  </div>`;

SCREENS['create-steps'] = (p) => {
  const kind = p.id || 'Club';
  return `
  ${pageHeader('Draft your '+kind.toLowerCase())}
  <div class="scroll pad">
    <div class="banner" style="margin:16px 0 0"><span>${I.lock}</span><span>You'll publish from your laptop — this is the draft.</span></div>
    <div class="label mt5">Start it here, add pictures</div>${phImg('','130')}
    <div class="mt4"><div class="label">Name</div><input class="field" placeholder="e.g. Trail Runners"/></div>
    <div class="mt4"><div class="label">About — who you are, what you're about</div><textarea class="field" placeholder="Hype it up…"></textarea></div>
    <div class="mt4"><div class="label">Dues</div><div style="display:flex;gap:8px"><button class="chip on">${I.apple} Apple Pay</button><button class="chip">Venmo</button><button class="chip">School PayPal</button></div></div>
    <div class="mt4"><div class="label">Public or private</div><div style="display:flex;gap:8px"><button class="chip on">Public</button><button class="chip">Private</button></div></div>
    <div class="mt6"><button class="btn" data-nav="create-desktop" data-param="${kind}">Continue on desktop</button></div>
    <div style="height:20px"></div>
  </div>`;
};

SCREENS['create-desktop'] = (p) => {
  const kind = p.id || 'Club';
  return `
  <div class="dt">
    <div class="dt__side"><div class="strong" style="font-size:16px">tandemclub <span class="muted">· web</span></div>
      <p class="small muted mt4">Review everything, then publish your ${kind.toLowerCase()}.</p>
      <button class="btn btn--ghost btn--sm mt6" data-action="back">${I.back} Back to phone</button></div>
    <div class="dt__main">
      <div class="dt__bar" style="margin:-26px -34px 22px;padding-left:14px"><span class="dt__dot"></span><span class="dt__dot"></span><span class="dt__dot"></span><span class="small muted" style="margin-left:8px">Publish your ${kind}</span></div>
      <h2 style="margin:0 0 4px">Trail Runners</h2>
      <p class="muted" style="margin:0 0 22px">Everything from your phone draft, ready to review & edit.</p>
      <div class="form-grid">
        ${[['Name','Trail Runners'],['Type',kind],['Visibility','Public'],['Dues','Apple Pay · $10/yr'],['Sign-up default','Join now'],['Board members','+ add usernames']].map(([l,v])=>`<div><div class="label">${l}</div><div class="field">${v}</div></div>`).join('')}
      </div>
      <div style="display:flex;gap:12px;margin-top:26px"><button class="btn" style="width:auto;padding:0 28px" data-action="publishClub">Publish</button><button class="btn btn--ghost" style="width:auto;padding:0 22px" data-action="toast" data-param="Invite members — skippable">Invite members</button></div>
    </div>
  </div>`;
};

/* ============================================================
   FLOW 6 · Messaging
   ============================================================ */
SCREENS['messages'] = () => {
  const filters=[['all','All'],['unread','Unread'],['dms','DMs']];
  // recents = DMs + unmuted crew chats. Club channels start MUTED → not here.
  const flat=[
    ['MP','Maya P.','Stoked for this! Gear list is in Details','2m',true,'dm','maya'],
    ['','Beach Crew','Dawn patrol at 6? 🌊','40m',true,'crew','beach'],
    ['JR','Jordan R.','I can drive 3 from campus','3h',false,'dm','jordan'],
    ['','Moonlight Crew','stargazing sat night?','5h',false,'crew','moon'],
  ];
  const show = flat.filter(f=> U.msgFilter==='dms'? f[5]==='dm' : U.msgFilter==='unread'? f[4] : true);
  const heartedCrews = Object.values(CREWS).filter(c=>c.hearted);
  const moreCrews = Object.values(CREWS).filter(c=>!c.hearted);
  return `
  ${pageHeader('Messages')}
  <div class="pad mt3"><div style="display:flex;gap:8px;align-items:center">
    <div style="flex:1;position:relative"><span style="position:absolute;left:12px;top:12px;color:var(--c-ink-3)">${I.search}</span><input class="field" style="padding-left:38px" placeholder="Search by name"/></div>
    <button class="roundbtn" data-action="compose" title="New message">${I.edit}</button>
  </div></div>

  <div class="scroll" style="padding-top:0">
    <button class="row" style="width:100%;text-align:left;margin-top:10px" data-action="toggleClubs"><div class="avatar" style="border-radius:10px">${I.comm}</div><div class="row__body"><div class="row__title">Clubs</div><div class="row__sub">Field Studies · Cal Poly Hiking · channels muted</div></div><span class="chev" style="transform:rotate(${U.clubsOpen?90:0}deg)">${I.chev}</span></button>
    ${U.clubsOpen?`<div class="pad"><div class="list">
        <button class="row" data-nav="channels" data-param="field"><div class="row__body"><div class="row__title"># Field Studies</div><div class="row__sub">muted · unmute to see in Recents</div></div><span class="chev">${I.chev}</span></button>
        <button class="row" data-nav="channels" data-param="hiking"><div class="row__body"><div class="row__title"># Cal Poly Hiking</div><div class="row__sub">muted · unmute to see in Recents</div></div><span class="chev">${I.chev}</span></button>
      </div></div>`:''}

    <div class="section-h" style="padding-bottom:6px"><h3 style="font-size:15px">Crews</h3><span class="more small" data-action="toggleCrewsMore">${U.crewsMore?'Show less':'See more'}</span></div>
    <div class="pad"><div class="list">
      ${heartedCrews.map(c=>`<button class="row" data-nav="channel-chat" data-param="${c.id}"><div class="avatar" style="border-radius:10px">${I.comm}</div><div class="row__body"><div class="row__title">${c.name}</div><div class="row__sub">You + ${c.members-1} · ${c.sub}</div></div><span class="chev">${I.chev}</span></button>`).join('')}
      ${U.crewsMore?moreCrews.map(c=>`<button class="row" data-nav="channel-chat" data-param="${c.id}"><div class="avatar" style="border-radius:10px">${I.comm}</div><div class="row__body"><div class="row__title">${c.name}</div><div class="row__sub">You + ${c.members-1} · ${c.sub}</div></div><span class="chev">${I.chev}</span></button>`).join(''):''}
    </div></div>

    <div class="section-h" style="padding-bottom:6px"><h3 style="font-size:15px">Recent</h3><span class="more small">swipe = mute · hold = block</span></div>
    <div class="pad mt2"><div class="segment">${filters.map(([id,l])=>`<div class="segment__i ${U.msgFilter===id?'on':''}" data-action="setMsgFilter" data-param="${id}">${l}</div>`).join('')}</div></div>
    <div class="pad mt2"><div class="list">
      ${show.map(([av,n,m,t,unread,type,param])=>`<button class="row msg-row" style="width:100%;text-align:left" data-nav="${type==='dm'?'dm-chat':'channel-chat'}" data-param="${param}" data-person="${n}">
        <div class="avatar" style="border-radius:${type==='dm'?'999px':'10px'};width:46px;height:46px">${av||I.comm}</div>
        <div class="row__body"><div class="row__title">${n} ${unread?'<span style="display:inline-block;width:8px;height:8px;background:var(--c-fill);border-radius:50%;margin-left:4px;vertical-align:middle"></span>':''}</div><div class="row__sub">${m}</div></div>
        <span class="small muted">${t}</span></button>`).join('')}
    </div><p class="small muted center mt3">Long-press a chat to Mute · Block · Report.</p></div>
    <div style="height:16px"></div>
  </div>`;
};
SCREENS['messages'].mount = attachLongPress;

SCREENS['dm-chat'] = (p) => {
  const person = PEOPLE[p.id] || PEOPLE.maya;
  const name = S.params.person || person.name;
  return `
  <div class="topbar"><button class="iconbtn" data-action="back">${I.back}</button>
    <button class="row" style="border:none;padding:0;gap:8px" data-nav="profile-other" data-param="${person.id}">${avatar(pInit(person.id),30)}<span class="strong">${name}</span></button>
    <button class="iconbtn" data-action="safety" data-param="${name}">${I.shield}</button></div>
  <div class="scroll pad">
    ${bubbles([[pInit(person.id),'Hey! Saw you signed up for Sykes 🙌',false],['','Yeah! First overnight, kinda nervous haha',true],[pInit(person.id),"You'll be great — I'll show you the gear ropes",false]])}
  </div>
  <div class="pad" style="padding-bottom:16px"><div style="display:flex;gap:8px"><input class="field" placeholder="Message…"/><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div></div>`;
};

SCREENS['channels'] = (p) => {
  const c = CLUBS[p.id] || CLUBS.field;
  const chans = [['important','trip alerts stay on even when muted'],['general','muted · badge only'],['random','muted · badge only']];
  return `
  ${pageHeader(c.name)}
  <div class="scroll pad"><p class="small muted mt3">Club channels start muted — unmute one and it shows up in your Recents.</p><div class="list mt2">
    ${chans.map(([ch,sub])=>`<button class="row" style="width:100%;text-align:left" data-nav="channel-chat" data-param="${p.id}"><div class="row__body"><div class="row__title"># ${ch}</div><div class="row__sub">${sub}</div></div><button class="chip" data-action="toast" data-param="Unmuted # ${ch}">Unmute</button></button>`).join('')}
  </div></div>`;
};
SCREENS['channel-chat'] = (p) => {
  const crew = CREWS[p.id]; const club = CLUBS[p.id];
  const title = crew ? crew.name : (club? club.name : '# important');
  const pub = S.publishedTrip && S.publishedTrip.crewId===p.id ? TRIPS[S.publishedTrip.tripId] : null;
  const respond = pub && S.tripResponse===null;
  return `
  ${pageHeader(title)}
  ${respond?tripResponseCard(pub, title):''}
  <div class="scroll pad">
    ${pub && S.tripResponse!==null ? tripPinnedTile(pub) : ''}
    ${bubbles([['MP','@channel Roster finalized for Sykes! Check your My Trips.',false],['JR','Let\'s gooo 🏕️',false],['','count me in',true]])}
  </div>
  <div class="pad" style="padding-bottom:16px"><div style="display:flex;gap:8px"><input class="field" placeholder="Message ${title}…"/><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div></div>`;
};
/* Published trip lands in the crew chat as a top-third card you must answer (✓/✕) */
function tripResponseCard(t, crewName){
  return `<div class="trip-respond">
    <div class="trip-respond__tag">${I.plane} Just published to ${crewName} — this is how it lands for the crew</div>
    <button class="trip-respond__card" data-nav="activity" data-param="${t.id}">
      <div class="ph" style="height:90px;border-radius:12px">${I.img}</div>
      <div class="trip-respond__meta"><div class="strong">${t.title}</div><div class="small muted mt1">${t.when} · ${t.place}</div><div class="small muted">Tap to see the full plan</div></div>
    </button>
    <div class="trip-respond__actions">
      <button class="respond-btn no" data-action="respondTrip" data-param="no">${I.x} Can't make it</button>
      <button class="respond-btn yes" data-action="respondTrip" data-param="yes">${I.check} I'm in</button>
    </div>
  </div>`;
}
function tripPinnedTile(t){
  const yes = S.tripResponse==='yes';
  return `<button class="pinned-trip" data-nav="activity" data-param="${t.id}">
    <div class="ph" style="width:52px;height:52px;border-radius:10px;flex:none">${I.trips}</div>
    <div style="flex:1;min-width:0"><div class="strong small">${t.title}</div><div class="small muted">${t.when} · ${yes?"you're going":'you passed'}</div></div>
    <span class="tag">${yes?I.check+' Going':'Passed'}</span>
  </button>`;
}

/* ============================================================
   FLOW 7 · Notifications (full page, from "See all")
   ============================================================ */
SCREENS['notifs'] = () => `
  ${pageHeader('Notifications')}
  <div class="scroll pad"><div class="list mt3">
    ${NOTIFS.map(n=>`<button class="row" style="width:100%;text-align:left" data-nav="${n.go}" ${n.param?`data-param="${n.param}"`:''}>
      <div class="avatar" style="border-radius:12px;width:44px;height:44px">${I[n.icon]||I.bell}</div>
      <div class="row__body"><div class="row__title">${n.t} ${n.unread?'<span style="display:inline-block;width:8px;height:8px;background:var(--c-fill);border-radius:50%;margin-left:2px"></span>':''}</div><div class="row__sub">${n.s}</div></div>
      <span class="chev">${I.chev}</span></button>`).join('')}
  </div>
  <p class="small muted center mt4">Trip-critical alerts, DMs & @mentions are on. Club #general / #random are muted with a badge.</p>
  </div>`;

/* ============================================================
   Profiles
   ============================================================ */
function getProfilePatches(){
  const advs  = PAST_TRIPS.map(t=>({icon:I.smile,  label:t.patch, detail:`Earned on ${t.title} · ${t.meta}.`}));
  const clubs = Object.values(CLUBS).filter(c=>S.members[c.id]).map(c=>({icon:I.shield, label:c.name, detail:`Member of ${c.name}.`}));
  const crews = Object.values(CREWS).filter(c=>c.hearted).map(c=>({icon:I.heart,  label:c.name, detail:`Part of ${c.name} — ${c.sub}.`}));
  return [...advs, ...clubs, ...crews];
}
const PATCH_SPOTS = [
  {top:38, left:12, rot:-12}, {top:64, right:10, rot:9},
  {top:130, right:26, rot:-6}, {top:170, left:14, rot:7},
  {top:206, left:8, rot:8}, {top:206, right:8, rot:-9},
  {top:330, right:8, rot:-7},
];
SCREENS['profile-me'] = () => {
  const patches = getProfilePatches();
  const pins = patches.map((p,i)=>{
    const spotIdx = patches.length>=PATCH_SPOTS.length ? i % PATCH_SPOTS.length : Math.floor(i * PATCH_SPOTS.length / patches.length);
    const s = PATCH_SPOTS[spotIdx];
    const side = s.left!==undefined ? `left:${s.left}px` : `right:${s.right}px`;
    return `<button class="patchpin" style="top:${s.top}px;${side};transform:rotate(${s.rot}deg)" data-action="openPatch" data-param="${i}" title="${p.label}">${p.icon}</button>`;
  }).join('');
  return `
  ${pageHeader('Profile')}
  <div class="scroll">
  <div class="patchlayer">
    <div class="center pad mt4">
      ${avatar('YU',88)}
      <div class="strong mt3" style="font-size:22px">${S.ob.name||'You'} · ${S.ob.year||'Freshman'}</div>
      <div class="small muted mt2">${S.ob.from||'Sacramento, CA'} · ${S.ob.major||'Undeclared'}</div>
      <p style="font-size:14px;max-width:280px;margin:12px auto 0">${S.ob.bio||'Looking for hiking buddies and a first overnight!'}</p>
    </div>
    <div class="tiles mt4" style="grid-template-columns:1fr 1fr">${[0,1].map(()=>phImg('',110)).join('')}</div>

    ${streakBar()}
    <div class="section-h"><h3 style="font-size:16px">Friends</h3><span class="more" data-nav="find-friends">Find friends</span></div>
    <div class="friends">
      ${FRIENDS.map(id=>`<button class="friend" data-nav="profile-other" data-param="${id}">${avatar(pInit(id),58)}<div class="fn">${PEOPLE[id].name.split(' ')[0]}</div></button>`).join('')}
      <button class="friend friend--add" data-nav="find-friends"><span class="avatar" style="width:58px;height:58px">${I.plus}</span><div class="fn">Find</div></button>
    </div>

    <div class="section-h"><h3 style="font-size:16px">Patch key</h3><span class="more">tap a patch to see how you got it</span></div>
    <p class="small muted" style="padding:0 var(--s4)">One per club, crew, and adventure — scattered around your profile.</p>
    ${pins}

    <div class="section-h"><h3 style="font-size:16px">Certifications</h3></div>
    <div class="pad"><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag">WFA</span><span class="tag">CPR</span><button class="tag" data-action="toast" data-param="Add cert">${I.plus} Add</button></div>
    <p class="small muted mt3">No trust score — your proof is patches, trips completed, and certs.</p></div>
    <div style="height:24px"></div>
  </div>
  </div>`;
};

SCREENS['find-friends'] = () => `
  ${pageHeader('Find friends')}
  <div class="pad mt3"><div style="position:relative"><span style="position:absolute;left:12px;top:12px;color:var(--c-ink-3)">${I.search}</span>
    <input class="field" style="padding-left:38px" placeholder="Search by name" autofocus/></div></div>
  <div class="scroll pad" style="padding-top:8px"><div class="list">
    ${Object.values(PEOPLE).map(p=>`<div class="row"><div class="avatar" style="width:44px;height:44px">${pInit(p.id)}</div>
      <button class="row__body" style="text-align:left;background:none" data-nav="profile-other" data-param="${p.id}"><div class="row__title">${p.name}</div><div class="row__sub">${p.year} · ${p.shared[0]||'—'}</div></button>
      <button class="chip ${FRIENDS.includes(p.id)?'on':''}" data-action="addFriend" data-param="${p.id}">${FRIENDS.includes(p.id)?'Friends':'Add'}</button></div>`).join('')}
  </div></div>`;

SCREENS['profile-other'] = (p) => {
  const person = PEOPLE[p.id] || PEOPLE.maya;
  const isFriend = FRIENDS.includes(person.id);
  return `
  <div style="position:relative">${phImg('','150')}<div class="hero__nav" style="position:absolute;top:44px;left:0;right:0"><button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="back">${I.back}</button><button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="safety" data-param="${person.name}">${I.shield}</button></div></div>
  <div class="scroll pad" style="margin-top:-40px">
    <div class="center">${avatar(pInit(person.id),80)}
      <div class="strong mt3" style="font-size:21px">${person.name}</div>
      <div class="small muted mt2">${person.year} · ${person.from} · ${person.trips} trips${person.trips>=10?' · experienced':''}</div>
      <p style="font-size:14px;max-width:260px;margin:10px auto 0">${person.bio}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center" class="mt3">${person.certs.map(c=>`<span class="tag">${c}</span>`).join('')}</div>
    <div class="divlabel">shared with you</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${person.shared.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
    <div style="display:flex;gap:10px" class="mt5">
      <button class="btn" data-nav="dm-chat" data-param="${person.id}" data-person="${person.name}">Message</button>
      <button class="btn ${isFriend?'btn--sub':'btn--ghost'}" style="width:auto;padding:0 20px" data-action="addFriend" data-param="${person.id}">${isFriend?I.check+' Friends':'Add friend'}</button>
    </div>
    <p class="small muted center mt3">Full profile unlocks once you're both in the same crew.</p>
    <div style="height:20px"></div>
  </div>`;
};

/* ============================================================
   FLOW 9 · Post-trip — album + friendship prompt
   ============================================================ */
SCREENS['album'] = (p) => `
  ${pageHeader('Pismo Beach Cleanup')}
  <div class="scroll">
    <div class="pad mt3"><div class="card" style="padding:14px"><div class="strong">You earned a patch!</div><div class="whos mt3"><div class="avatar" style="width:48px;height:48px;border-radius:14px">${I.smile}</div><div class="small">First Wave · added to your profile</div></div></div></div>
    <div class="section-h"><h3 style="font-size:16px">Shared album</h3><span class="more">Add photos</span></div>
    <div class="tiles" style="grid-template-columns:1fr 1fr 1fr">${[0,1,2,3,4,5].map(()=>phImg('','98')).join('')}</div>
    <div class="pad mt5"><div class="card" style="padding:16px">
      <div class="strong" style="font-size:17px">You survived the beach with these 7 people</div>
      <p class="small muted mt2">Message the people you went with, tag them, or start a crew. This is how one trip turns into your people.</p>
      <div class="mt3">${stack(['MP','JR','AL','KM','DT','RS','TW'],36)}</div>
      <div style="display:flex;gap:10px" class="mt4"><button class="btn" data-nav="messages">Message the crew</button><button class="btn btn--ghost" style="width:auto;padding:0 18px" data-action="toast" data-param="Crew started 🎉">Start a crew</button></div>
    </div></div>
    <div style="height:24px"></div>
  </div>`;

/* ============================================================
   ACTIONS
   ============================================================ */
function attachLongPress(){
  document.querySelectorAll('.msg-row').forEach(row=>{
    let timer;
    const start=(e)=>{ timer=setTimeout(()=>{ openSafety(row.dataset.person||'this person'); }, 500); };
    const cancel=()=>clearTimeout(timer);
    row.addEventListener('touchstart',start,{passive:true});
    row.addEventListener('mousedown',start);
    ['touchend','touchmove','mouseup','mouseleave'].forEach(ev=>row.addEventListener(ev,cancel));
  });
}
function openSafety(name){
  openSheet(`
    <div class="sheet__title">${name}</div>
    <div class="list mt3">
      <button class="row" data-action="doMute" data-param="${name}"><div class="row__body"><div class="row__title">Mute</div><div class="row__sub">Stop notifications from this chat</div></div></button>
      <button class="row" data-action="doBlock" data-param="${name}"><div class="row__body"><div class="row__title">Block</div><div class="row__sub">Instant · they can't contact or match with you</div></div></button>
      <button class="row" data-action="doReport" data-param="${name}"><div class="row__body"><div class="row__title">Report</div><div class="row__sub">We take protective action right away</div></div></button>
    </div>
    <button class="btn btn--ghost mt3" data-action="close-sheet">Cancel</button>`);
}
function openCompose(){
  openSheet(`
    <div class="sheet__title">New message</div>
    <p class="small muted" style="margin:2px 0 14px">Like iMessage — type a name, write, send.</p>
    <div class="label">To</div><input class="field" placeholder="Search a name…"/>
    <div class="label mt4">Message</div><textarea class="field" placeholder="Say hey…"></textarea>
    <button class="btn mt4" data-action="sendCompose">${I.plane} Send</button>
    <button class="skip center mt3" style="display:block;width:100%" data-action="close-sheet">Cancel</button>`);
}
function openPlanSheet(){
  openSheet(`
    <div class="sheet__title">Plan something new</div>
    <p class="small muted" style="margin:2px 0 14px">Two kinds of trips — pick one.</p>
    <button class="optcard" data-action="startActivity"><div class="avatar">${I.clock}</div><div><div class="strong" style="font-size:17px">Activity</div><div class="small muted mt2">A day thing — plan it right here on your phone.</div></div></button>
    <button class="optcard" data-action="startAdventure"><div class="avatar">${I.tent}</div><div><div class="strong" style="font-size:17px">Adventure</div><div class="small muted mt2">Overnight — send the link to your Mac to plan.</div></div></button>
    <button class="skip center mt4" style="display:block;width:100%" data-action="close-sheet">Cancel</button>`);
}
function openAirdrop(){
  openSheet(`
    <div class="sheet__title center">AirDrop</div>
    <p class="small muted center" style="margin:2px 0 18px">Tap a device to send <b>tandemlife.studio</b></p>
    <button class="airdrop-device" data-action="airdropSend">
      <div class="airdrop-device__ic">${I.laptop}</div>
      <div style="flex:1"><div class="strong">Your MacBook Pro</div><div class="small muted">Ready · same Apple ID</div></div>
      <span class="chev">${I.chev}</span>
    </button>
    <button class="skip center mt4" style="display:block;width:100%" data-action="close-sheet">Cancel</button>`);
}

Object.assign(ACTIONS, {
  /* onboarding */
  obGo:(next)=>navigate(next),
  addPfp:()=>{ S.ob.pfp=!S.ob.pfp; render(); },
  pickYear:(y)=>{ S.ob.year=y; navigate('ob-basics'); },
  toggleActivity:(t)=>{ const a=S.ob.activities; if(a.includes(t)){ a.splice(a.indexOf(t),1); } else { if(a.length>=5){ toast('Pick up to 5'); return; } a.push(t); } render(); },
  bumpExp:(name)=>{ U.exp[name]=((U.exp[name]||0)+1)%6; render(); },
  addMainPhoto:()=>{ S.ob.mainPhoto=!S.ob.mainPhoto; render(); },
  addExtra:()=>{ S.ob.extras=(S.ob.extras+1)%3; render(); },
  usePrompt:(p)=>{ S.ob.prompt = (S.ob.prompt===p ? '' : p); render(); },
  obSkipVerify:()=>{ S.verified=false; S.tab='home'; S.screen='ob-verify'; S.stack=[]; navigate('home'); toast('Browsing in read-only — verify anytime'); },
  obVerify:()=>{ S.verified=true; S.tab='home'; S.stack=[]; S.screen='ob-verify'; navigate('home'); toast('Verified — you can join trips 🎉'); },

  /* home / tabs */
  setHomePill:(t)=>{ U.homePill=t; render(); },
  setArchPill:(t)=>{ U.archPill=t; render(); },
  setActClub:(id)=>{ U.actClub=id; render(); },
  openPatch:(i)=>{ const p=getProfilePatches()[i]; if(!p) return; openSheet(`<div class="center pad" style="padding-top:6px"><div class="avatar" style="width:60px;height:60px;border-radius:18px;margin:0 auto">${p.icon}</div><div class="strong mt3" style="font-size:18px">${p.label}</div><p class="muted mt2">${p.detail}</p><button class="btn mt4" data-action="close-sheet">Got it</button></div>`); },
  setMtTab:(t)=>{ U.mtTab=t; render(); },
  setRideTab:(t)=>{ U.rideTab=t; render(); },
  setClubTab:(t)=>{ U.clubTab=t; render(); },
  setCommTab:(t)=>{ U.commTab=t; if(t==='join')U.commFilter='clubs'; render(); },
  setCommFilter:(f)=>{ U.commFilter=f; render(); },
  setMsgFilter:(f)=>{ U.msgFilter=f; render(); },
  toggleClubs:()=>{ U.clubsOpen=!U.clubsOpen; render(); },
  toggleCrewsMore:()=>{ U.crewsMore=!U.crewsMore; render(); },
  rankTrip:(id)=>{ U.ranks[id]=((U.ranks[id]||0)+1)%3; render(); },

  /* trip hub */
  expandChat:(id)=>navigate('trip-chat', id),

  /* join a trip */
  join:(id)=>{
    if(!S.verified){ toast('Verify your school email to join'); navigate('ob-verify'); return; }
    const t=TRIPS[id];
    if(t.mode==='lottery'){ S.joined[id]='entered'; toast('Entered · results Wed 8 AM'); render(); }
    else if(t.cost==='Free'){ S.joined[id]='joined'; navigate('trip-hub', id); toast("You're in! 🎉"); }
    else { openApplePay(t.cost, ()=>{ S.joined[id]='joined'; closeSheet(); navigate('trip-hub', id); toast("You're in! 🎉"); }); }
  },
  claimSlot:(key)=>{ U.slots[key]=true; render(); toast('Claimed'); },
  togglePack:(i)=>{ U.packList[i]=!U.packList[i]; render(); },
  cancelSpot:(id)=>{ delete S.joined[id]; toast('Spot canceled — roster cascades'); navigate('mytrips'); },

  /* communities / dues */
  payDues:(id)=>{ const c=CLUBS[id]; if(c.dues==='Free'){ ACTIONS.confirmDues(id); } else { openApplePay(c.dues.replace(' / yr','/yr'), ()=>ACTIONS.confirmDues(id)); } },
  confirmDues:(id)=>{ closeSheet(); S.members[id]=true; U.clubTab='members'; render(); toast("Nice, you're a member!"); },
  createClub:()=>navigate('create-start'),
  createCrew:()=>{ CREWS.newcrew = { id:'newcrew', name:'Your new crew', members:1, sub:'just created', hearted:true }; S.stack=[]; navigate('messages'); toast('Crew created — invite your friends 🎉'); },

  /* plan */
  planSheet:()=>openPlanSheet(),
  startActivity:()=>{ closeSheet(); U.actIndex=0;
    U.plan={ budgetOn:false, rideOn:false, gas:24, permits:0, food:0, heads:6, repeat:false, photos:0, vis:'', visCrew:'', visOpen:'', draftFriends:[], carSeats:3 };
    navigate('plan-activity'); },
  startAdventure:()=>{ closeSheet(); navigate('plan-adventure-link'); },
  airdropPlan:()=>openAirdrop(),
  airdropSend:()=>{ closeSheet(); toast('Sent to your Mac 💻'); },
  copyPlanLink:()=>{ const url='tandemlife.studio'; if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(()=>toast('Link copied')).catch(()=>toast('Link copied')); } else { toast('Link copied'); } },
  planToggle:(w)=>{ const pl=U.plan; if(w==='budget')pl.budgetOn=!pl.budgetOn; else if(w==='ride')pl.rideOn=!pl.rideOn; else if(w==='repeat')pl.repeat=!pl.repeat; render(); },
  planCost:(param)=>{ const [k,sign]=param.split(':'); const step={gas:4,permits:5,food:6}[k]||2; U.plan[k]=Math.max(0,U.plan[k]+(sign==='+'?step:-step)); render(); },
  planHeads:(sign)=>{ U.plan.heads=Math.max(1,U.plan.heads+(sign==='+'?1:-1)); render(); },
  planSeats:(sign)=>{ U.plan.carSeats=Math.max(1,Math.min(7,U.plan.carSeats+(sign==='+'?1:-1))); render(); },
  planPhoto:()=>{ U.plan.photos = U.plan.photos>=6 ? 0 : U.plan.photos+1; render(); },
  planDrop:(w)=>{ U.plan.visOpen = U.plan.visOpen===w ? '' : w; render(); },
  planPickCrew:(id)=>{ U.plan.vis='crew'; U.plan.visCrew=id; U.plan.visOpen=''; render(); },
  planDraftFriend:(id)=>{ const f=U.plan.draftFriends; if(f.includes(id))f.splice(f.indexOf(id),1); else f.push(id); U.plan.vis=f.length?'draft':(U.plan.vis==='draft'?'':U.plan.vis); render(); },
  planPublic:()=>{ U.plan.vis='public'; U.plan.visOpen=''; render(); },
  actNext:()=>{ if(U.actIndex<ACT_STEPS.length-1){ U.actIndex++; render(); } else {
    const pl=U.plan; let crewId='moon';
    if(pl.vis==='crew' && pl.visCrew) crewId=pl.visCrew;
    else if(pl.vis==='draft'){ CREWS.event={ id:'event', name:'Sunset Crew', members:pl.draftFriends.length+1, sub:'event crew for this trip', hearted:true }; crewId='event'; }
    S.publishedTrip={ crewId, tripId:'bishop', kind:'Activity' };
    S.tripResponse=null; S.stack=[];
    navigate('channel-chat', crewId);
    toast('Trip published 🎉');
  } },
  actBack:()=>{ if(U.actIndex>0){ U.actIndex--; render(); } else back(); },
  respondTrip:(ans)=>{ S.tripResponse=ans; render(); toast(ans==='yes'?"You're in 🎉":'No worries — maybe next time'); },
  publishClub:()=>{ S.stack=[]; navigate('communities'); toast('Published! 🎉 Now on your Communities'); },

  /* messaging */
  compose:()=>openCompose(),
  sendCompose:()=>{ closeSheet(); toast('Message sent'); },

  /* friends */
  addFriend:(id)=>{ if(!FRIENDS.includes(id)){ FRIENDS.push(id); toast(`Added ${PEOPLE[id].name}`);} else { FRIENDS.splice(FRIENDS.indexOf(id),1); toast('Removed'); } render(); },

  /* safety */
  safety:(name)=>openSafety(name),
  doMute:(n)=>{ closeSheet(); toast(`${n} muted`); },
  doBlock:(n)=>{ closeSheet(); toast(`${n} blocked`); },
  doReport:(n)=>{ closeSheet(); openSheet(`<div class="center pad" style="padding-top:6px"><div class="avatar" style="width:60px;height:60px;border-radius:18px;margin:0 auto">${I.check}</div><div class="strong mt3" style="font-size:18px">Thanks — we're on it</div><p class="muted mt2">You won't be matched with them. Our team reviews reports; bans are human-reviewed.</p><button class="btn mt4" data-action="close-sheet">Done</button></div>`); },
});

function openApplePay(amount, onDone){
  openSheet(`
    <div class="center pad" style="padding-top:0">
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-size:20px;font-weight:800">${I.apple} Pay</div>
      <div class="card mt4" style="text-align:left">
        <div class="row"><div class="row__body"><div class="row__sub">Pay tandemclub</div><div class="row__title">Amount due</div></div><span class="strong" style="font-size:18px">${amount}</span></div>
        <div class="row"><div class="avatar" style="border-radius:8px;width:40px;height:26px">••</div><div class="row__body"><div class="row__title">Apple Card</div><div class="row__sub">•••• 4242</div></div></div>
      </div>
      <button class="btn btn-apple mt4" data-action="applePayConfirm">${I.apple} Double-click to pay</button>
      <button class="skip mt3" data-action="close-sheet">Cancel</button>
      <p class="small muted mt3">Venmo / school PayPal available as fallback.</p>
    </div>`);
  ACTIONS.applePayConfirm = ()=>{ onDone && onDone(); };
}
