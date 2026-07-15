/* ============================================================
   tandemclub wireframe prototype — screens
   ============================================================ */
const U = {
  homeTab:'foryou', packetTab:'chat', rideTab:'ride', clubTab:'landing',
  commTab:'yours', commFilter:'clubs', msgFilter:'all', reel:0,
  obPhotos:0, packList:{}, slots:{}, clubsOpen:false, actIndex:0, actKind:'Activity',
};
const rerender = () => render();
const SCREENS = {};

/* ============================================================
   FLOW 1 · Onboarding
   ============================================================ */
const OB_STEPS = ['ob-name','ob-year','ob-interests','ob-experience','ob-photos','ob-bio','ob-verify'];
function obProgress(id){ const i = OB_STEPS.indexOf(id); return `<div class="progress mt2"><i style="width:${((i+1)/OB_STEPS.length)*100}%"></i></div>`; }
function obShell(id, {q, hint, body, cta='Continue', next, skip, forced}) {
  return `${obProgress(id)}
  <div class="ob">
    <div class="ob__top">
      <button class="iconbtn" data-action="back">${I.back}</button>
      ${forced ? '<span></span>' : `<button class="skip" data-action="obGo" data-param="${skip||next}">Skip</button>`}
    </div>
    <div class="ob__body">
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

SCREENS['ob-name'] = () => obShell('ob-name', {
  q:'What should we call you?', hint:"First name only — you can't change it later.", forced:true,
  body:`<input class="field" placeholder="Your first name" value="${S.ob.name}" oninput="S.ob.name=this.value" />`,
  next:'ob-year'
});
SCREENS['ob-year'] = () => obShell('ob-year', {
  q:'What year are you?', next:'ob-interests', skip:'ob-interests',
  body:`<div style="display:flex;flex-wrap:wrap;gap:10px">${['Freshman','Sophomore','Junior','Senior','Grad'].map(y=>`<button class="chip ${S.ob.year===y?'on':''}" data-action="pickYear" data-param="${y}">${y}</button>`).join('')}</div>`
});
SCREENS['ob-interests'] = () => obShell('ob-interests', {
  q:'What are you into?', hint:'Pick a few — this shapes your Home feed.', next:'ob-experience', skip:'ob-experience',
  body:`<div style="display:flex;flex-wrap:wrap;gap:10px">${['Fitness/Active','Water/Outdoors','Sports','Creative/Media','Social/Lifestyle','Home/Chill','Pets','Personality'].map(t=>`<button class="chip ${S.ob.interests.includes(t)?'on':''}" data-action="toggleInterest" data-param="${t}">${t}</button>`).join('')}</div>`
});
SCREENS['ob-experience'] = () => obShell('ob-experience', {
  q:'How much have you done?', hint:'No pressure — this just helps match you to the right trips.', next:'ob-photos', skip:'ob-photos',
  body:`<div class="mt2">${[['Backpacking',2],['Surfing',1],['Day hikes',3],['Ski / snowboard',1]].map(([n,v])=>`
    <div class="slider-row"><span class="name">${n}</span><div class="slider"><i style="left:calc(${v*20}% - 11px)"></i></div><span class="val">${v}×</span></div>`).join('')}
    <button class="tag mt4" data-action="toast" data-param="Certifications editable later in profile">${I.plus} Add certifications</button></div>`
});
SCREENS['ob-photos'] = () => obShell('ob-photos', {
  q:'Add a couple photos', hint:'2 minimum. A profile pic helps people recognize you on the trail.', forced:true, next:'ob-bio',
  body:`<div class="tiles" style="padding:0;grid-template-columns:1fr 1fr 1fr">${[0,1,2,3,4,5].map(i=>`
    <button class="ph" style="height:104px;border-radius:14px" data-action="addPhoto">${i<U.obPhotos?I.check:I.plus}</button>`).join('')}</div>
    <p class="small muted mt3">${U.obPhotos} added</p>`
});
SCREENS['ob-bio'] = () => obShell('ob-bio', {
  q:'Say hi in one line', hint:'Up to 500 characters. Optional.', next:'ob-verify', skip:'ob-verify',
  body:`<textarea class="field" placeholder="e.g. Freshman from Sacramento, looking for hiking buddies!" oninput="S.ob.bio=this.value">${S.ob.bio}</textarea>`
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
   FLOW 0 · Home
   ============================================================ */
SCREENS['home'] = () => {
  if (U.homeTab==='watch') return homeWatch();
  const banner = S.verified ? '' : `<div class="banner"><span>${I.lock}</span><span><b>Verify your school email</b> to join trips.</span><button class="btn btn--sm" data-nav="ob-verify">Verify</button></div>`;
  const shelf = (title, list, sub) => `
    <div class="section-h"><h3>${title}</h3><span class="more">See all</span></div>
    ${sub?`<div class="section-sub">${sub}</div>`:''}
    <div class="shelf">${list.map(id=>tripCard(TRIPS[id])).join('')}</div>`;
  return `
  ${topbar('Home')}
  <div class="toptabs"><div class="toptabs__i on">For You</div><div class="toptabs__i" data-action="setHomeTab" data-param="watch">Watch</div></div>
  <div class="scroll">
    ${banner}
    ${shelf('Made for you', ['bishop','sykes','climb'], 'Picked from your interests')}
    ${shelf('This weekend near you', ['surf','bishop','ski'])}
    ${shelf('From clubs & crews you follow', ['sykes','climb'])}
    ${shelf('Jump back in', ['bishop','surf'], 'Recent trips & chats')}
    <div style="height:8px"></div>
  </div>
  ${tabbar('home')}`;
};
function homeWatch(){
  return `
  <div class="reel">
    ${phImg('reel__img','')}
    <div class="reel__grad"></div>
    <div class="hero__nav" style="padding-top:52px"><div class="toptabs" style="border:none"><div class="toptabs__i" style="color:#fff;opacity:.7" data-action="setHomeTab" data-param="foryou">For You</div><div class="toptabs__i on" style="color:#fff">Watch</div></div><button class="iconbtn" style="background:rgba(0,0,0,.35);color:#fff" data-nav="home">${I.x}</button></div>
    <div class="reel__side">
      <div class="a" data-action="toast" data-param="Liked">${I.heart}<span>1.2k</span></div>
      <div class="a" data-action="toast" data-param="Comments">${I.cmt}<span>84</span></div>
      <div class="a" data-action="toast" data-param="Shared">${I.share}<span>Share</span></div>
      <button class="avatar-btn" data-nav="profile-other" data-param="maya" style="border:2px solid #fff">${avatar('MP',40)}</button>
    </div>
    <div class="reel__foot">
      <div style="font-weight:750;font-size:16px">Sykes Hot Springs w/ Field Studies</div>
      <div class="small" style="opacity:.85;margin-top:4px">Tap the face to find your people →</div>
      <button class="btn btn--sm mt3" style="background:#fff;color:#000" data-nav="trip" data-param="sykes">View this trip</button>
    </div>
  </div>
  ${tabbar('home')}`;
}

/* ============================================================
   FLOW 3 · Trip page + join
   ============================================================ */
SCREENS['trip'] = (p) => {
  const t = TRIPS[p.id] || TRIPS.sykes;
  const joinedState = S.joined[t.id];
  const full = t.spots.toLowerCase().includes('full');
  let cta;
  if (joinedState==='joined') cta = `<button class="btn btn--sub" data-nav="packet" data-param="${t.id}">${I.check} You're in — open trip</button>`;
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
        <div class="txt"><b>${t.going.length? 'Maya and '+(t.goingN-1)+' others going':''}</b><div class="small muted">${t.mutuals} people you know are in</div></div>
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
      ${[['Fri 4:00 PM','Meet at the Rec Center lot, load gear'],['Sat 9:00 AM','2-hr hike in, set up camp riverside'],['Sat PM','Soak, cook over the fire, stargaze'],['Sun 11:00 AM','Pack out, tacos on the drive home']].map(([time,txt])=>`
        <div class="row"><span class="tag" style="width:78px;justify-content:center">${time}</span><div class="row__body"><div class="row__sub" style="white-space:normal;color:var(--c-ink)">${txt}</div></div></div>`).join('')}
    </div></div>

    <div class="section-h"><h3>The details</h3></div>
    <div class="pad">
      <p style="font-size:15px;line-height:1.5;margin:0 0 14px">${t.desc}</p>
      <div class="list">
        <div class="row"><div class="row__body"><div class="row__sub">Led by</div><div class="row__title">Maya P. · Field Studies lead</div></div>${avatar('MP',34)}</div>
        <div class="row"><div class="row__body"><div class="row__sub">Cost</div><div class="row__title">${t.cost}${t.cost!=='Free'?' · Apple Pay':''}</div></div></div>
        <div class="row"><div class="row__body"><div class="row__sub">Capacity</div><div class="row__title">${t.spots}</div></div></div>
      </div>
      ${t.mode==='lottery'?`<div class="banner" style="margin-left:0;margin-right:0"><span>${I.clock}</span><span>Lottery trip — results push <b>Wednesday 8 AM</b>, pay by midnight. First-timers get 2 entries.</span></div>`:''}
      <div style="height:100px"></div>
    </div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px calc(20px + env(safe-area-inset-bottom,0));background:linear-gradient(180deg,transparent,var(--c-screen) 22%)">${cta}</div>`;
};

/* My Trips */
SCREENS['mytrips'] = () => {
  const joinedIds = Object.keys(S.joined);
  const upcoming = joinedIds.length ? joinedIds : ['bishop'];
  return `
  ${topbar('My Trips')}
  <div class="scroll">
    <div class="section-h"><h3>Upcoming</h3></div>
    <div class="pad"><div class="list">
      ${upcoming.map(id=>{const t=TRIPS[id];const st=S.joined[id];return `
        <button class="row" style="width:100%;text-align:left" data-nav="${st==='entered'?'trip':'packet'}" data-param="${id}">
          ${phImg('',0)===''?'':''}<div class="avatar" style="border-radius:12px;width:48px;height:48px">${I.map}</div>
          <div class="row__body"><div class="row__title">${t.title}</div><div class="row__sub">${st==='entered'?'Entered · results Wed 8 AM':t.when+' · '+t.place}</div></div>
          <span class="chev">${I.chev}</span>
        </button>`}).join('')}
    </div></div>

    <div class="section-h"><h3>Past trips</h3><span class="more">Memories</span></div>
    <div class="shelf">
      <button class="card tripcard" data-nav="album" data-param="pismo">${phImg('',150)}<div class="tripcard__meta"><div class="tripcard__title">Pismo Beach Cleanup</div><div class="small muted mt2">Feb 22 · 11 photos · tap to relive</div></div></button>
      <button class="card tripcard" data-nav="album" data-param="cerro">${phImg('',150)}<div class="tripcard__meta"><div class="tripcard__title">Cerro San Luis Hike</div><div class="small muted mt2">Feb 8 · 6 photos</div></div></button>
    </div>
    <div style="height:12px"></div>
  </div>
  ${tabbar('mytrips')}`;
};

/* Trip packet */
SCREENS['packet'] = (p) => {
  const t = TRIPS[p.id] || TRIPS.sykes;
  const tabs = [['chat','Trip Chat'],['map','Map'],['rides','Rides'],['details','Details']];
  let body;
  if (U.packetTab==='chat') body = packetChat(t);
  else if (U.packetTab==='map') body = packetMap(t);
  else if (U.packetTab==='rides') body = packetRides(t);
  else body = packetDetails(t);
  return `
  ${pageHeader(t.title)}
  <div class="toptabs" style="justify-content:space-between;gap:0">${tabs.map(([id,l])=>`<div class="toptabs__i ${U.packetTab===id?'on':''}" style="flex:1;text-align:center" data-action="setPacketTab" data-param="${id}">${l}</div>`).join('')}</div>
  <div class="scroll" data-param="${t.id}">${body}</div>`;
};
function packetChat(t){
  const msgs = [['MP','Maya','Stoked for this! Gear list is in Details 🎒'],['JR','Jordan','I can drive 3 from campus'],['','You','Claimed a seat — thanks Jordan!']];
  return `<div class="pad mt3 gap2">
    ${msgs.map(([av,n,m])=>`<div style="display:flex;gap:10px;${n==='You'?'flex-direction:row-reverse;text-align:right':''}">${n==='You'?'':avatar(av,30)}<div><div class="small muted">${n}</div><div class="card" style="padding:10px 13px;font-size:14px;display:inline-block;margin-top:3px;${n==='You'?'background:var(--c-fill);color:#fff':''}">${m}</div></div></div>`).join('')}
    <div style="display:flex;gap:8px;margin-top:8px"><input class="field" placeholder="Message the trip…" /><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div>
  </div>`;
}
function packetMap(t){
  return `<div class="pad mt3">
    ${phImg('','230')}
    <div class="mt3 list">
      <div class="row"><div class="avatar" style="border-radius:10px">${I.pin}</div><div class="row__body"><div class="row__title">Trailhead — meet here</div><div class="row__sub">${t.place}</div></div></div>
      <div class="row"><div class="avatar" style="border-radius:10px">${I.map}</div><div class="row__body"><div class="row__title">Uploaded route map</div><div class="row__sub">4.2 mi in · 900 ft gain</div></div></div>
    </div>
    <button class="btn btn--ghost mt4" data-action="toast" data-param="Would open Strava">Record on Strava</button>
  </div>`;
}
function packetRides(t){
  const sub = [['ride','Ride Sign-up',I.car],['tent','Tent Sign-up',I.tent]];
  const isRide = U.rideTab==='ride';
  const slots = isRide
    ? [['Jordan — 3 seats','taken'],['You','taken'],['+ open seat','open'],['+ open seat','open'],['+ open seat','open'],['+ open seat','open']]
    : [['Maya\'s 4-person','taken'],['You','taken'],['+ open spot','open'],['+ open spot','open']];
  return `<div class="pad mt3">
    <div class="segment">${sub.map(([id,l,ic])=>`<div class="segment__i ${U.rideTab===id?'on':''}" data-action="setRideTab" data-param="${id}">${l}</div>`).join('')}</div>
    <p class="small muted mt3">${isRide?'Tap an open seat to claim it. Driver cancels → riders notified → autofill from waitlist.':'Tap an open tent spot to claim it.'}</p>
    <div class="slots mt2" style="padding:0">
      ${slots.map((s,i)=>`<div class="slot ${s[1]}" ${s[1]==='open'?`data-action="claimSlot" data-param="${U.rideTab}-${i}"`:''}>${U.slots[U.rideTab+'-'+i]?I.check+' You':s[0]}</div>`).join('')}
    </div>
  </div>`;
}
function packetDetails(t){
  const items = ['Sleeping bag (0°F)','Headlamp','2L water','Swimsuit + towel','Trail snacks','Layers — it gets cold'];
  return `<div class="mt3">
    <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">What to pack</h3></div>
    ${items.map((it,i)=>`<div class="check ${U.packList[i]?'done':''}" data-action="togglePack" data-param="${i}"><span class="box">${U.packList[i]?I.check:''}</span><span class="t">${it}</span></div>`).join('')}
    <div class="section-h" style="padding-bottom:8px"><h3 style="font-size:16px">Expectations</h3></div>
    <p class="pad" style="font-size:14px;line-height:1.5;margin:0">Moderate pace. Phone service is spotty — download your map. Be at the lot 10 min early; we leave on time.</p>
    <div class="pad mt5" style="padding-bottom:24px"><button class="btn btn--ghost" data-action="cancelSpot" data-param="${t.id}" style="color:var(--c-ink-2)">Cancel my spot</button>
    <p class="small muted center mt2">Drops your spot and cascades the roster to fill it.</p></div>
  </div>`;
}

/* ============================================================
   FLOW 2 · Communities
   ============================================================ */
SCREENS['communities'] = () => {
  const isYours = U.commTab==='yours';
  const yourClubs = Object.keys(S.members).filter(k=>S.members[k]);
  const body = isYours
    ? `<div class="pad mt3"><div class="list">${yourClubs.map(id=>{const c=CLUBS[id];return `
        <button class="row" style="width:100%;text-align:left" data-nav="club" data-param="${id}"><div class="avatar" style="border-radius:12px;width:46px;height:46px">${c.name[0]}</div><div class="row__body"><div class="row__title">${c.name}</div><div class="row__sub">${c.kind} · ${c.members} members</div></div><span class="chev">${I.chev}</span></button>`}).join('')}
        ${yourClubs.length===0?'<div class="row"><div class="row__sub">You haven\'t joined anything yet — hop to Join →</div></div>':''}
      </div><p class="small muted center mt4">Tap a club for the full takeover — trips, channels, members.</p></div>`
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
  const list = Object.values(CLUBS).filter(c=> U.commFilter==='crews' ? c.kind==='Crew' : c.kind==='Club');
  return `
  <div class="pad mt3"><div style="display:flex;gap:8px">
    <button class="chip ${U.commFilter==='clubs'?'on':''}" data-action="setCommFilter" data-param="clubs">Clubs</button>
    <button class="chip ${U.commFilter==='crews'?'on':''}" data-action="setCommFilter" data-param="crews">Crews</button>
  </div></div>
  <div class="tiles mt3">${list.map(c=>`
    <button class="card tile" data-nav="club" data-param="${c.id}">${phImg('',96)}<div class="tile__meta"><div class="tile__title">${c.name}</div><div class="small muted mt2">${c.members} members</div></div></button>`).join('')}
  </div><div style="height:16px"></div>`;
}

SCREENS['club'] = (p) => {
  const c = CLUBS[p.id] || CLUBS.field;
  const isMember = !!S.members[c.id];
  const tabs = isMember ? [['landing','Landing'],['signups','Trip Signups'],['links','Useful Links'],['members','Members Only']]
                        : [['landing','Landing'],['signups','Trip Signups'],['links','Useful Links']];
  let body;
  if (U.clubTab==='signups') body = clubSignups(c,isMember);
  else if (U.clubTab==='links') body = clubLinks(c);
  else if (U.clubTab==='members') body = clubMembers(c);
  else body = clubLanding(c,isMember);
  return `
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
  <div class="toptabs mt3" style="overflow-x:auto">${tabs.map(([id,l])=>`<div class="toptabs__i ${U.clubTab===id?'on':''}" style="white-space:nowrap" data-action="setClubTab" data-param="${id}">${l}${id==='members'&&!isMember?' '+I.lock:''}</div>`).join('')}</div>
  <div class="scroll" style="flex:1">${body}
    ${!isMember?`<div style="position:sticky;bottom:0;padding:12px 16px calc(16px + env(safe-area-inset-bottom,0));background:linear-gradient(180deg,transparent,var(--c-screen) 30%)"><button class="btn" data-action="payDues" data-param="${c.id}">Become a member${c.dues!=='Free'?' · '+c.dues:''}</button></div>`:''}
  </div>`;
};
SCREENS['club'].mount = ()=>{};
function clubLanding(c, isMember){
  return `<div class="pad mt4">
    ${phImg('','160')}
    <p style="font-size:15px;line-height:1.5" class="mt3">${c.blurb} We run trips every other weekend, teach the skills, and handle the gear. Come for one trip, stay for the people.</p>
    <div class="divlabel">next trip</div>
    ${tripCard(TRIPS.sykes)}
    <div style="height:${isMember?'20px':'70px'}"></div>
  </div>`;
}
function clubSignups(c, isMember){
  return `<div class="pad mt4">
    <p class="small muted">${isMember?'Members can browse and join every trip.':'Non-members can see what\'s happening — join to unlock the cards.'}</p>
    <div class="mt3 ${isMember?'':'blur'}">${['sykes','ski','climb'].map(id=>`<div class="mb3" style="margin-bottom:12px">${tripCard(TRIPS[id])}</div>`).join('')}</div>
    <div style="height:${isMember?'20px':'70px'}"></div>
  </div>`;
}
function clubLinks(c){
  const links = ['Instagram / website','Drop a trip idea','Become a member','Request a refund','Driver reimbursement','Tutorials'];
  return `<div class="pad mt4"><div class="list">${links.map(l=>`<button class="row" style="width:100%;text-align:left" data-action="toast" data-param="Placeholder link"><div class="row__body"><div class="row__title">${l}</div></div><span class="chev">${I.chev}</span></button>`).join('')}</div><div style="height:70px"></div></div>`;
}
function clubMembers(c){
  return `<div class="pad mt4">
    <div class="section-h" style="padding:0 0 8px"><h3 style="font-size:16px">Upcoming for members</h3></div>
    ${tripCard(TRIPS.sykes)}
    <div class="section-h" style="padding:16px 0 8px"><h3 style="font-size:16px">Perks</h3></div>
    <div class="list">
      <button class="row" data-action="toast" data-param="Gear Shed (FSC)"><div class="row__body"><div class="row__title">Gear Shed — borrow gear</div></div><span class="chev">${I.chev}</span></button>
      <button class="row" data-action="toast" data-param="Get more involved"><div class="row__body"><div class="row__title">Get more involved</div></div><span class="chev">${I.chev}</span></button>
    </div><div style="height:20px"></div>
  </div>`;
}

/* ============================================================
   FLOW 4 · Plan a trip
   ============================================================ */
SCREENS['plan'] = () => `
  ${topbar('Plan')}
  <div class="scroll">
    <div class="section-h"><h3>In progress</h3></div>
    <div class="shelf">
      <button class="card tripcard" style="width:200px" data-action="toast" data-param="Draft carousel is reference — start new with +">${phImg('',110)}<div class="tripcard__meta"><div class="tripcard__title">Bishop Peak (draft)</div><div class="small muted mt2">Not published</div></div></button>
      <button class="card tripcard" style="width:200px" data-action="toast" data-param="Inspo">${phImg('',110)}<div class="tripcard__meta"><div class="tripcard__title">Inspo — saved ideas</div></div></button>
      <button class="card tripcard" style="width:200px" data-nav="mytrips">${phImg('',110)}<div class="tripcard__meta"><div class="tripcard__title">Calendar</div><div class="small muted mt2">Your trips by date</div></div></button>
    </div>
    <div class="pad mt6"><button class="btn" data-nav="plan-new">${I.plus} Start something new</button>
    <p class="small muted center mt2">The carousel above is for picking things back up — start fresh here.</p></div>
    <div style="height:20px"></div>
  </div>
  ${tabbar('plan')}`;

SCREENS['plan-new'] = () => `
  ${pageHeader('New trip')}
  <div class="pad mt5">
    <p style="font-size:16px;line-height:1.5" class="muted">Two kinds of trips. Pick one.</p>
    <button class="card mt3" style="width:100%;text-align:left;padding:18px;display:flex;gap:14px;align-items:center" data-action="startActivity">
      <div class="avatar" style="border-radius:14px;width:52px;height:52px">${I.clock}</div>
      <div><div class="strong" style="font-size:17px">Activity</div><div class="small muted mt2">A day thing — plan it right here on your phone.</div></div>
    </button>
    <button class="card mt3" style="width:100%;text-align:left;padding:18px;display:flex;gap:14px;align-items:center" data-nav="plan-desktop">
      <div class="avatar" style="border-radius:14px;width:52px;height:52px">${I.tent}</div>
      <div><div class="strong" style="font-size:17px">Adventure</div><div class="small muted mt2">Overnight — you'll finish this one on desktop.</div></div>
    </button>
  </div>`;

const ACT_STEPS = [
  {q:'Name your trip', hint:'Keep it short and inviting.', field:'<input class="field" placeholder="e.g. Bishop Peak Sunset Hike" />'},
  {q:'Describe it', hint:'What\'s the vibe? What should people expect?', field:'<textarea class="field" placeholder="Chill after-class hike, tacos after…"></textarea>'},
  {q:'Where?', hint:'', field:`<button class="field" style="text-align:left;color:var(--c-ink-3)">${I.pin} Add a location</button>`},
  {q:'Does it repeat?', hint:'', field:`<div style="display:flex;gap:10px"><button class="chip on">One-time</button><button class="chip">Weekly</button><button class="chip">Monthly</button></div>`},
  {q:'Difficulty & who it\'s for', hint:'This shows on the sign-up screen so people know what they\'re getting into.', field:`<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="chip on">Easy</button><button class="chip">Moderate</button><button class="chip">Hard</button></div><label class="check mt4" style="border:none;padding:0" ><span class="box done">${I.check}</span><span>Good for beginners</span></label><div class="divlabel mt4">sign-up style</div><div style="display:flex;gap:10px"><button class="chip on">Join now</button><button class="chip">Enter for a spot</button></div>`},
  {q:'Who can see it?', hint:'', field:`<div class="gap2"><button class="chip on" style="width:100%;justify-content:flex-start;padding:14px">Private — invite only</button><button class="chip" style="width:100%;justify-content:flex-start;padding:14px">Group — a club or crew you lead</button><button class="chip" style="width:100%;justify-content:flex-start;padding:14px">Public — anyone can view & join</button></div>`},
];
SCREENS['plan-activity'] = () => {
  const i = U.actIndex, step = ACT_STEPS[i], last = i===ACT_STEPS.length-1;
  return `
  <div class="progress mt2"><i style="width:${((i+1)/ACT_STEPS.length)*100}%"></i></div>
  <div class="ob">
    <div class="ob__top"><button class="iconbtn" data-action="actBack">${I.back}</button><span class="skip muted">${i+1} / ${ACT_STEPS.length}</span></div>
    <div class="ob__body"><div class="ob__q">${step.q}</div>${step.hint?`<div class="ob__hint">${step.hint}</div>`:''}${step.field}</div>
    <div class="ob__foot"><button class="btn" data-action="actNext">${last?'Publish trip':'Continue'}</button></div>
  </div>`;
};

SCREENS['plan-desktop'] = () => `
  <div class="dt">
    <div class="dt__side">
      <div class="strong" style="font-size:16px">tandemclub <span class="muted">· web</span></div>
      <p class="small muted mt4">Adventures are overnight — you plan them on desktop where there's room for the budget maker.</p>
      <button class="btn btn--ghost btn--sm mt6" data-nav="plan-new">${I.back} Back</button>
    </div>
    <div class="dt__main">
      <div class="dt__bar" style="margin:-26px -34px 22px;padding-left:14px"><span class="dt__dot"></span><span class="dt__dot"></span><span class="dt__dot"></span><span class="small muted" style="margin-left:8px">Plan an Adventure — budget maker</span></div>
      <h2 style="margin:0 0 4px">Mammoth Ski Weekend</h2>
      <p class="muted" style="margin:0 0 22px">Fill in the details, set the budget, publish to your club's Trip Signups.</p>
      <div class="form-grid">
        ${[['Trip name','Mammoth Ski Weekend'],['Dates','Mar 21–23'],['Capacity','24 people'],['Co-leads','+ add lead'],['Difficulty','Hard'],['Good for beginners','No']].map(([l,v])=>`<div><div class="label">${l}</div><div class="field">${v}</div></div>`).join('')}
      </div>
      <div class="label mt6">Budget maker</div>
      <div class="list" style="max-width:520px">
        ${[['Cabin (2 nights)','$1,680'],['Lift tickets ×24','$2,400'],['Gas (4 cars)','$320'],['Per person','$140']].map(([l,v])=>`<div class="row"><div class="row__body"><div class="row__title">${l}</div></div><span class="strong">${v}</span></div>`).join('')}
      </div>
      <div style="display:flex;gap:12px;margin-top:26px;max-width:520px"><button class="btn" data-action="publishAdventure">Publish to Trip Signups</button><button class="btn btn--ghost" style="width:auto;padding:0 22px" data-action="back">Cancel</button></div>
    </div>
  </div>`;

/* ============================================================
   FLOW 5 · Create a club / crew
   ============================================================ */
SCREENS['create-start'] = () => `
  ${pageHeader('Start a club or crew')}
  <div class="pad mt5">
    <p class="muted" style="font-size:16px">Same steps either way. A club is school-official; a crew is a looser friend group.</p>
    <button class="card mt4" style="width:100%;text-align:left;padding:18px;display:flex;gap:14px;align-items:center" data-nav="create-steps" data-param="Club"><div class="avatar" style="border-radius:14px;width:52px;height:52px">${I.shield}</div><div><div class="strong" style="font-size:17px">Club</div><div class="small muted mt2">Official org — can take dues via school PayPal.</div></div></button>
    <button class="card mt3" style="width:100%;text-align:left;padding:18px;display:flex;gap:14px;align-items:center" data-nav="create-steps" data-param="Crew"><div class="avatar" style="border-radius:14px;width:52px;height:52px">${I.comm}</div><div><div class="strong" style="font-size:17px">Crew</div><div class="small muted mt2">Friend group — same process, lighter.</div></div></button>
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
    <div class="mt4"><div class="label">Sign-up style (club default — leads override per trip)</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="chip on">FCFS</button><button class="chip">Priority</button><button class="chip">Preferential</button><button class="chip">Random</button></div></div>
    <div class="mt4"><div class="label">Dues</div><div style="display:flex;gap:8px"><button class="chip on">${I.apple} Apple Pay</button><button class="chip">Venmo</button>${kind==='Club'?'<button class="chip">School PayPal</button>':''}</div></div>
    <div class="mt4"><div class="label">Public or private</div><div style="display:flex;gap:8px"><button class="chip on">Public</button><button class="chip">Private</button></div></div>
    <div class="mt6"><button class="btn btn--sub" disabled>${I.lock} Publish (finish on desktop)</button>
    <button class="btn mt3" data-nav="create-desktop" data-param="${kind}">Continue on desktop</button></div>
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
        ${[['Name','Trail Runners'],['Type',kind],['Visibility','Public'],['Dues','Apple Pay · $10/yr'],['Sign-up default','FCFS'],['Board members','+ add usernames']].map(([l,v])=>`<div><div class="label">${l}</div><div class="field">${v}</div></div>`).join('')}
      </div>
      <div style="display:flex;gap:12px;margin-top:26px"><button class="btn" style="width:auto;padding:0 28px" data-action="publishClub">Publish</button><button class="btn btn--ghost" style="width:auto;padding:0 22px" data-action="toast" data-param="Invite members — skippable">Invite members</button></div>
    </div>
  </div>`;
};

/* ============================================================
   FLOW 6 · Messaging hub
   ============================================================ */
SCREENS['messages'] = () => {
  const filters=[['all','All'],['unread','Unread'],['dms','DMs']];
  const flat=[['MP','Maya P.','Stoked for this! Gear list is in Details','2m',true,'dm'],['#','Field Studies · #important','Roster finalized for Sykes 🎉','1h',true,'channel'],['JR','Jordan R.','I can drive 3 from campus','3h',false,'dm'],['#','Surf Club · #general','Dawn patrol moved to 6am','5h',false,'channel']];
  const show = flat.filter(f=> U.msgFilter==='dms'? f[5]==='dm' : U.msgFilter==='unread'? f[4] : true);
  return `
  ${pageHeader('Messages')}
  <div class="pad mt3"><div style="display:flex;gap:8px;align-items:center">
    <div style="flex:1;position:relative"><span style="position:absolute;left:12px;top:12px;color:var(--c-ink-3)">${I.search}</span><input class="field" style="padding-left:38px" placeholder="Search by name"/></div>
    <button class="iconbtn" data-nav="dms" title="DMs">${I.plane}</button>
  </div></div>
  <div class="pad mt3"><div class="segment">${filters.map(([id,l])=>`<div class="segment__i ${U.msgFilter===id?'on':''}" data-action="setMsgFilter" data-param="${id}">${l}</div>`).join('')}</div></div>

  <div class="scroll" style="padding-top:0">
    <button class="row" style="width:100%;text-align:left;margin-top:8px" data-action="toggleClubs"><div class="avatar" style="border-radius:10px">${I.comm}</div><div class="row__body"><div class="row__title">Clubs</div><div class="row__sub">Field Studies · Cal Poly Hiking</div></div><span class="chev" style="transform:rotate(${U.clubsOpen?90:0}deg)">${I.chev}</span></button>
    ${U.clubsOpen?`<div class="pad"><div class="list">
        <button class="row" data-nav="channels" data-param="field"><div class="row__body"><div class="row__title"># Field Studies</div></div><span class="chev">${I.chev}</span></button>
        <button class="row" data-nav="channels" data-param="hiking"><div class="row__body"><div class="row__title"># Cal Poly Hiking</div></div><span class="chev">${I.chev}</span></button>
      </div></div>`:''}

    <div class="section-h" style="padding-bottom:6px"><h3 style="font-size:15px">Crews</h3></div>
    <div class="pad"><div class="list"><button class="row" data-nav="channels" data-param="moon"><div class="avatar" style="border-radius:10px">${I.comm}</div><div class="row__body"><div class="row__title">Moonlight Crew</div><div class="row__sub">You + 8 · night hikes</div></div><span class="chev">${I.chev}</span></button></div></div>

    <div class="section-h" style="padding-bottom:6px"><h3 style="font-size:15px">Recent</h3><span class="more small">swipe = mute · hold = block</span></div>
    <div class="pad"><div class="list">
      ${show.map(([av,n,m,t,unread,type],i)=>`<button class="row msg-row" style="width:100%;text-align:left" data-nav="${type==='dm'?'dm-chat':'channel-chat'}" data-param="${type==='dm'?'maya':'field'}" data-person="${n}">
        <div class="avatar" style="border-radius:${type==='dm'?'999px':'10px'};width:46px;height:46px">${av==='#'?I.comm:av}</div>
        <div class="row__body"><div class="row__title">${n} ${unread?'<span style="display:inline-block;width:8px;height:8px;background:var(--c-fill);border-radius:50%;margin-left:4px;vertical-align:middle"></span>':''}</div><div class="row__sub">${m}</div></div>
        <span class="small muted">${t}</span></button>`).join('')}
    </div><p class="small muted center mt3">Long-press a chat to Mute · Block · Report.</p></div>
    <div style="height:16px"></div>
  </div>`;
};
SCREENS['messages'].mount = attachLongPress;

SCREENS['dms'] = () => `
  ${pageHeader('Direct messages')}
  <div class="scroll pad"><div class="list mt3">
    ${[['MP','Maya P.','Stoked for this!','2m'],['JR','Jordan R.','I can drive 3','3h'],['AL','Alex L.','see you at the lot','1d']].map(([a,n,m,t])=>`
      <button class="row msg-row" style="width:100%;text-align:left" data-nav="dm-chat" data-param="maya" data-person="${n}"><div class="avatar" style="width:46px;height:46px">${a}</div><div class="row__body"><div class="row__title">${n}</div><div class="row__sub">${m}</div></div><span class="small muted">${t}</span></button>`).join('')}
  </div></div>`;
SCREENS['dms'].mount = attachLongPress;

SCREENS['dm-chat'] = (p) => {
  const name = S.params.person || 'Maya P.';
  return `
  <div class="topbar"><button class="iconbtn" data-action="back">${I.back}</button>
    <button class="row" style="border:none;padding:0;gap:8px" data-nav="profile-other" data-param="maya">${avatar('MP',30)}<span class="strong">${name}</span></button>
    <button class="iconbtn" data-action="safety" data-param="${name}">${I.shield}</button></div>
  <div class="scroll pad">
    <div class="gap2 mt3">
      <div style="display:flex;gap:10px">${avatar('MP',28)}<div class="card" style="padding:10px 13px;font-size:14px">Hey! Saw you signed up for Sykes 🙌</div></div>
      <div style="display:flex;flex-direction:row-reverse"><div class="card" style="padding:10px 13px;font-size:14px;background:var(--c-fill);color:#fff">Yeah! First overnight, kinda nervous haha</div></div>
      <div style="display:flex;gap:10px">${avatar('MP',28)}<div class="card" style="padding:10px 13px;font-size:14px">You'll be great — I'll show you the gear ropes</div></div>
    </div>
  </div>
  <div class="pad" style="padding-bottom:16px"><div style="display:flex;gap:8px"><input class="field" placeholder="Message…"/><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div></div>`;
};

SCREENS['channels'] = (p) => {
  const c = CLUBS[p.id] || CLUBS.field;
  const chans = ['important','general','random'];
  return `
  ${pageHeader(c.name)}
  <div class="scroll pad"><div class="list mt3">
    ${chans.map(ch=>`<button class="row" style="width:100%;text-align:left" data-nav="channel-chat" data-param="${p.id}"><div class="row__body"><div class="row__title"># ${ch}</div><div class="row__sub">${ch==='important'?'muted trip alerts stay on':'muted · badge only'}</div></div><span class="chev">${I.chev}</span></button>`).join('')}
  </div></div>`;
};
SCREENS['channel-chat'] = (p) => {
  const c = CLUBS[p.id] || CLUBS.field;
  return `
  ${pageHeader('# important')}
  <div class="scroll pad"><div class="gap2 mt3">
    <div style="display:flex;gap:10px">${avatar('MP',28)}<div><div class="small muted">Maya · lead</div><div class="card" style="padding:10px 13px;font-size:14px;margin-top:3px">@channel Roster finalized for Sykes! Check your My Trips.</div></div></div>
    <div style="display:flex;gap:10px">${avatar('JR',28)}<div><div class="small muted">Jordan</div><div class="card" style="padding:10px 13px;font-size:14px;margin-top:3px">Let's gooo 🏕️</div></div></div>
  </div></div>
  <div class="pad" style="padding-bottom:16px"><div style="display:flex;gap:8px"><input class="field" placeholder="Message # important…"/><button class="btn" style="width:auto;padding:0 18px" data-action="toast" data-param="Sent">${I.plane}</button></div></div>`;
};

/* ============================================================
   FLOW 7 · Notifications
   ============================================================ */
SCREENS['notifs'] = () => `
  ${pageHeader('Notifications')}
  <div class="scroll pad"><div class="list mt3">
    ${NOTIFS.map(n=>`<button class="row" style="width:100%;text-align:left" data-nav="${n.go}" data-param="${n.param}">
      <div class="avatar" style="border-radius:12px;width:44px;height:44px">${I[n.icon]}</div>
      <div class="row__body"><div class="row__title">${n.t} ${n.unread?'<span style="display:inline-block;width:8px;height:8px;background:var(--c-fill);border-radius:50%;margin-left:2px"></span>':''}</div><div class="row__sub">${n.s}</div></div>
      <span class="chev">${I.chev}</span></button>`).join('')}
  </div>
  <p class="small muted center mt4">Trip-critical alerts, DMs & @mentions are on. Club #general / #random are muted with a badge.</p>
  </div>`;

/* ============================================================
   Profiles
   ============================================================ */
SCREENS['profile-me'] = () => {
  const patches = [['First Trip',true],['3 Trips',true],['First Overnight',false],['Trip Leader',false]];
  return `
  ${pageHeader('Profile')}
  <div class="scroll">
    <div class="center pad mt4">
      ${avatar('YU',88)}
      <div class="strong mt3" style="font-size:22px">You · Freshman</div>
      <div class="small muted mt2">Sacramento, CA · Cal Poly</div>
      <p style="font-size:14px;max-width:280px;margin:12px auto 0">${S.ob.bio||'Looking for hiking buddies and a first overnight!'}</p>
    </div>
    <div class="pad mt4" style="display:flex;gap:10px">
      <div class="card" style="flex:1;padding:14px;text-align:center"><div class="strong" style="font-size:22px">3</div><div class="small muted">trips</div></div>
      <div class="card" style="flex:1;padding:14px;text-align:center"><div class="strong" style="font-size:22px">1</div><div class="small muted">crews</div></div>
      <div class="card" style="flex:1;padding:14px;text-align:center"><div class="strong" style="font-size:22px">2</div><div class="small muted">clubs</div></div>
    </div>
    <div class="section-h"><h3 style="font-size:16px">Patches</h3></div>
    <div class="pad"><div style="display:flex;gap:14px">${patches.map(([n,earned])=>`<div class="center" style="flex:1"><div class="avatar" style="width:56px;height:56px;border-radius:16px;${earned?'':'opacity:.35'}">${I.patch}</div><div class="small ${earned?'':'muted'} mt2" style="font-size:10px">${n}</div></div>`).join('')}</div></div>
    <div class="section-h"><h3 style="font-size:16px">Certifications</h3></div>
    <div class="pad"><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag">WFA</span><span class="tag">CPR</span><button class="tag" data-action="toast" data-param="Add cert">${I.plus} Add</button></div>
    <p class="small muted mt3">No trust score — your proof is patches, trips completed, and certs.</p></div>
    <div style="height:24px"></div>
  </div>`;
};
SCREENS['profile-other'] = (p) => {
  const person = PEOPLE[p.id] || PEOPLE.maya;
  return `
  <div style="position:relative">${phImg('','150')}<div class="hero__nav" style="position:absolute;top:44px;left:0;right:0"><button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="back">${I.back}</button><button class="iconbtn" style="background:rgba(0,0,0,.4);color:#fff" data-action="safety" data-param="${person.name}">${I.shield}</button></div></div>
  <div class="scroll pad" style="margin-top:-40px">
    <div class="center">${avatar(person.name.split(' ').map(w=>w[0]).join(''),80)}
      <div class="strong mt3" style="font-size:21px">${person.name}</div>
      <div class="small muted mt2">${person.year} · ${person.trips} trips${person.trips>=10?' · experienced':''}</div>
      <p style="font-size:14px;max-width:260px;margin:10px auto 0">${person.bio}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center" class="mt3">${person.certs.map(c=>`<span class="tag">${c}</span>`).join('')}</div>
    <div class="divlabel">shared with you</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${person.shared.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
    <div style="display:flex;gap:10px" class="mt5">
      <button class="btn" data-nav="dm-chat" data-param="maya" data-person="${person.name}">Message</button>
      <button class="btn btn--ghost" style="width:auto;padding:0 20px" data-action="toast" data-param="Following ${person.name}">Follow</button>
    </div>
    <button class="btn btn--sub mt3" data-action="toast" data-param="Added to a crew">Add to a crew</button>
    <p class="small muted center mt3">Full profile unlocks once you're in the same crew.</p>
    <div style="height:20px"></div>
  </div>`;
};

/* ============================================================
   FLOW 9 · Post-trip — album + friendship prompt
   ============================================================ */
SCREENS['album'] = (p) => `
  ${pageHeader('Pismo Beach Cleanup')}
  <div class="scroll">
    <div class="pad mt3"><div class="card" style="padding:14px"><div class="strong">You earned a patch!</div><div class="whos mt3"><div class="avatar" style="width:48px;height:48px;border-radius:14px">${I.patch}</div><div class="small">First Trip · added to your profile</div></div></div></div>
    <div class="section-h"><h3 style="font-size:16px">Shared album</h3><span class="more">Add photos</span></div>
    <div class="tiles" style="grid-template-columns:1fr 1fr 1fr">${[0,1,2,3,4,5].map(()=>phImg('','98')).join('')}</div>
    <div class="pad mt5"><div class="card" style="padding:16px">
      <div class="strong" style="font-size:17px">You survived the beach with these 7 people</div>
      <p class="small muted mt2">Tag them, start a crew, or just say hey. This is how one trip turns into your people.</p>
      <div class="mt3">${stack(['MP','JR','AL','KM','DT','RS','TW'],36)}</div>
      <div style="display:flex;gap:10px" class="mt4"><button class="btn" data-action="toast" data-param="Crew started 🎉">Start a crew</button><button class="btn btn--ghost" style="width:auto;padding:0 18px" data-nav="profile-other" data-param="maya">Say hey</button></div>
    </div></div>
    <div style="height:24px"></div>
  </div>`;

/* ============================================================
   ACTIONS
   ============================================================ */
function attachLongPress(){
  document.querySelectorAll('.msg-row').forEach(row=>{
    let timer;
    const start=(e)=>{ timer=setTimeout(()=>{ e.preventDefault(); openSafety(row.dataset.person||'this person'); }, 500); };
    const cancel=()=>clearTimeout(timer);
    row.addEventListener('touchstart',start,{passive:true});
    row.addEventListener('mousedown',start);
    ['touchend','touchmove','mouseup','mouseleave'].forEach(ev=>row.addEventListener(ev,cancel));
  });
}
function openSafety(name){
  openSheet(`
    <div class="strong" style="font-size:17px">${name}</div>
    <div class="list mt3">
      <button class="row" data-action="doMute" data-param="${name}"><div class="row__body"><div class="row__title">Mute</div><div class="row__sub">Stop notifications from this chat</div></div></button>
      <button class="row" data-action="doBlock" data-param="${name}"><div class="row__body"><div class="row__title">Block</div><div class="row__sub">Instant · they can't contact or match with you</div></div></button>
      <button class="row" data-action="doReport" data-param="${name}"><div class="row__body"><div class="row__title">Report</div><div class="row__sub">We take protective action right away</div></div></button>
    </div>
    <button class="btn btn--ghost mt3" data-action="close-sheet">Cancel</button>`);
}

Object.assign(ACTIONS, {
  /* onboarding */
  obGo:(next)=>navigate(next),
  pickYear:(y)=>{ S.ob.year=y; navigate('ob-interests'); },
  toggleInterest:(t,node)=>{ const a=S.ob.interests; a.includes(t)?a.splice(a.indexOf(t),1):a.push(t); node.classList.toggle('on'); },
  addPhoto:()=>{ if(U.obPhotos<6){U.obPhotos++; render();} },
  obSkipVerify:()=>{ S.verified=false; S.tab='home'; S.screen='ob-verify'; S.stack=[]; navigate('home'); toast('Browsing in read-only — verify anytime'); },
  obVerify:()=>{ S.verified=true; S.tab='home'; S.stack=[]; S.screen='ob-verify'; navigate('home'); toast('Verified — you can join trips 🎉'); },

  /* home / tabs */
  setHomeTab:(t)=>{ U.homeTab=t; render(); },
  setPacketTab:(t)=>{ U.packetTab=t; render(); },
  setRideTab:(t)=>{ U.rideTab=t; render(); },
  setClubTab:(t)=>{ U.clubTab=t; render(); },
  setCommTab:(t)=>{ U.commTab=t; if(t==='join')U.commFilter='clubs'; render(); },
  setCommFilter:(f)=>{ U.commFilter=f; render(); },
  setMsgFilter:(f)=>{ U.msgFilter=f; render(); },
  toggleClubs:()=>{ U.clubsOpen=!U.clubsOpen; render(); },

  /* join a trip */
  join:(id)=>{
    if(!S.verified){ toast('Verify your school email to join'); navigate('ob-verify'); return; }
    const t=TRIPS[id];
    if(t.mode==='lottery'){
      S.joined[id]='entered'; toast('Entered · results Wed 8 AM'); render();
    } else if(t.cost==='Free'){
      S.joined[id]='joined'; navigate('packet', id); toast("You're in! 🎉");
    } else {
      openApplePay(t.cost, ()=>{ S.joined[id]='joined'; closeSheet(); navigate('packet', id); toast("You're in! 🎉"); });
    }
  },
  claimSlot:(key,node)=>{ U.slots[key]=true; render(); toast('Seat claimed'); },
  togglePack:(i)=>{ U.packList[i]=!U.packList[i]; render(); },
  cancelSpot:(id)=>{ delete S.joined[id]; toast('Spot canceled — roster cascades'); navigate('mytrips'); },

  /* communities / dues */
  payDues:(id)=>{ const c=CLUBS[id]; if(c.dues==='Free'){ ACTIONS.confirmDues(id); } else { openApplePay(c.dues.replace(' / yr','/yr'), ()=>ACTIONS.confirmDues(id)); } },
  confirmDues:(id)=>{ closeSheet(); S.members[id]=true; U.clubTab='members'; render(); toast("Nice, you're a member!"); },

  /* plan */
  startActivity:()=>{ U.actIndex=0; navigate('plan-activity'); },
  actNext:()=>{ if(U.actIndex<ACT_STEPS.length-1){ U.actIndex++; render(); } else { S.stack=[]; navigate('plan'); toast('Trip published 🎉'); } },
  actBack:()=>{ if(U.actIndex>0){ U.actIndex--; render(); } else back(); },
  publishAdventure:()=>{ S.stack=[]; navigate('communities'); toast('Adventure published to Trip Signups'); },

  /* create club */
  publishClub:()=>{ S.stack=[]; navigate('communities'); toast('Published! 🎉 Now on your Communities'); },

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
