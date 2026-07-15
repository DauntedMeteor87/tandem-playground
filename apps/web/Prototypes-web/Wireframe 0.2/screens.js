/* ============================================================
   tandemclub web wireframe 0.2 — Plan an Adventure flow
   One wizard, three ways in:
     Create  — fresh draft
     Edit    — S.editingId set, saves back to the published trip
     Clone   — S.cloneSource set, prefilled from a past trip
   ============================================================ */

/* ---------- Top-level render ---------- */
function renderPlanAdventure(){
  if (S.published) return renderConfirmation();
  const meta = S.editingId ? `Editing — ${ADV.name}`
    : S.cloneSource ? `New draft — cloned from "${S.cloneSource}"`
    : 'Plan an Adventure — draft';
  return `
  ${topbar(meta, true)}
  <div class="studio">
    ${studioSidebar('create')}
    <div class="studio__main">
      <div class="wiz">
        ${railHtml()}
        <div class="wiz__main">
          <div class="wiz__body">${stepBody()}</div>
        </div>
      </div>
      ${footerHtml()}
    </div>
  </div>
  ${S.publishOpen ? publishSheetHtml() : ''}
  `;
}

function topbar(label, showSave){
  return `<div class="topbar">
    <div class="topbar__brand">tandemclub <span class="muted">· studio</span></div>
    <div class="topbar__meta">${label || ''}</div>
    <div class="topbar__actions">
      ${showSave ? `<button class="btn btn--ghost btn--sm" data-action="toast" data-param="Draft saved">Save &amp; exit</button>` : ''}
      <div class="avatar" title="${USER.name}">${USER.initials}</div>
    </div>
  </div>`;
}

function railHtml(){
  const i = stepIndex(S.step);
  return `<div class="wiz__rail wiz__rail--steps">
    <div class="wiz__railhead">
      <div class="wiz__railtitle">${ADV.name || 'New adventure'}</div>
      <div class="wiz__railsub">${S.editingId
        ? 'This trip is live — changes go out to members when you save.'
        : "Fill in the details, write it up, set the budget, then publish to your club's Trip Signups."}</div>
    </div>
    ${STEPS.map((s,idx)=>{
      const cls = s===S.step ? 'current' : (idx < i ? 'done' : '');
      return `<button class="railstep ${cls}" data-action="goStep" data-param="${s}">
        <span class="railstep__n">${idx < i ? I.check : idx+1}</span>${STEP_LABEL[s]}
      </button>`;
    }).join('')}
  </div>`;
}

function footerHtml(){
  const i = stepIndex(S.step);
  const isFirst = i===0, isLast = S.step==='preview';
  const lastBtn = S.editingId
    ? `<button class="btn" data-action="saveEdits">Save changes</button>`
    : `<button class="btn" data-action="openPublish">Publish to Trip Signups</button>`;
  return `<div class="wiz__foot">
    <div class="side">
      ${isFirst ? '' : `<button class="btn btn--ghost" data-action="prevStep">${I.back} Back</button>`}
      ${S.editingId ? `<button class="btn btn--sub" data-action="cancelEdits">Discard changes</button>` : ''}
    </div>
    <div class="side">
      ${S.editingId && !isLast ? `<button class="btn btn--ghost" data-action="saveEdits">Save changes</button>` : ''}
      ${isLast ? lastBtn : `<button class="btn" data-action="nextStep">Continue</button>`}
    </div>
  </div>`;
}

/* ---------- Step router ---------- */
function stepBody(){
  switch(S.step){
    case 'basics': return stepBasics();
    case 'writeup': return stepWriteup();
    case 'itinerary': return stepItinerary();
    case 'permits': return stepPermits();
    case 'budget': return stepBudget();
    case 'gear': return stepGear();
    case 'rides': return stepRides();
    case 'photos': return stepPhotos();
    case 'preview': return stepPreview();
    default: return '';
  }
}

/* ---------- 1. Basics ---------- */
function stepBasics(){
  const visList = ADV.visType==='club' ? CLUBS : CREWS;
  return `
  <div class="wiz__eyebrow">Step 1 of 9</div>
  <h1 class="wiz__title">The basics</h1>
  <p class="wiz__hint">Name it, date it, place it. This is what shows at the top of the trip page.</p>
  ${S.cloneSource ? `<div class="banner" style="margin-bottom:22px">${I.copy} Cloned from "<span class="strong">${S.cloneSource}</span>" — everything carried over except the dates and permit booking. Set new dates and re-reserve the permit before publishing.</div>` : ''}
  <div class="form-grid">
    <div class="field-group span2"><label class="label">Trip name</label>
      <input class="field" data-bind="simple:name" value="${ADV.name}" placeholder="e.g. Sykes Hot Springs Overnight" /></div>
    <div class="field-group"><label class="label">Starts</label>
      <input class="field" type="date" data-bind="simple:dateStart" value="${ADV.dateStart}" /></div>
    <div class="field-group"><label class="label">Ends</label>
      <input class="field" type="date" data-bind="simple:dateEnd" value="${ADV.dateEnd}" /></div>
    <div class="field-group"><label class="label">General location</label>
      <input class="field" data-bind="simple:location" value="${ADV.location}" placeholder="e.g. Big Sur, CA" /></div>
    <div class="field-group"><label class="label">Capacity</label>
      <input class="field" type="number" min="1" data-bind="simple:capacity" value="${ADV.capacity}" /></div>
    <div class="field-group span2"><label class="label">Co-leads <span class="opt">optional</span></label>
      <input class="field" data-bind="simple:coLeads" value="${ADV.coLeads}" placeholder="e.g. Jordan R." /></div>
  </div>
  <div class="divlabel">Who can see and join it</div>
  <div class="chiprow">
    <button class="chip ${ADV.visType==='club'?'on':''}" data-action="setVisType" data-param="club">Club</button>
    <button class="chip ${ADV.visType==='crew'?'on':''}" data-action="setVisType" data-param="crew">Crew</button>
  </div>
  <div class="chiprow mt3">
    ${visList.map(v=>`<button class="chip ${ADV.visId===v.id?'on':''}" data-action="setVisId" data-param="${v.id}">${v.name}</button>`).join('')}
  </div>
  `;
}

/* ---------- 2. Write-up ---------- */
function stepWriteup(){
  return `
  <div class="wiz__eyebrow">Step 2 of 9</div>
  <h1 class="wiz__title">The write-up</h1>
  <p class="wiz__hint">Make it hefty — sell the trip. This is the first thing a member reads before they join.</p>
  <div class="field-group">
    <label class="label">Description</label>
    <textarea class="field" style="min-height:180px" data-bind="simple:writeup" placeholder="What's the trip, what's the vibe, who's it for?">${ADV.writeup}</textarea>
    <div class="field-hint">NOLS and Outward Bound both lead with what to expect physically and mentally — pace, difficulty, and what makes this trip worth showing up for.</div>
  </div>
  `;
}

/* ---------- 3. Itinerary ---------- */
function stepItinerary(){
  return `
  <div class="wiz__eyebrow">Step 3 of 9</div>
  <h1 class="wiz__title">Itinerary</h1>
  <p class="wiz__hint">The actual daily plan — not just highlights. This is what members see first on the trip page.</p>
  <div class="list">
    ${ADV.itinerary.map((row,idx)=>`
      <div class="itin-row">
        <div class="time"><input class="field" data-bind="arr:itinerary:${idx}:time" value="${row.time}" placeholder="Sat 9:00 AM" /></div>
        <div class="desc"><input class="field" data-bind="arr:itinerary:${idx}:text" value="${row.text}" placeholder="What's happening" /></div>
        <button class="rowbtn" data-action="removeItinRow" data-param="${idx}">${I.x}</button>
      </div>`).join('')}
    <button class="addrow" data-action="addItinRow">${I.plus} Add a step</button>
  </div>
  `;
}

/* ---------- 4. Permits ---------- */
function stepPermits(){
  const p = ADV.permit;
  return `
  <div class="wiz__eyebrow">Step 4 of 9</div>
  <h1 class="wiz__title">Permits</h1>
  <p class="wiz__hint">Point members to exactly how to get squared away — most groups get stuck here, not on the trail.</p>
  <div class="chiprow">
    <button class="chip ${p.needed?'on':''}" data-action="setPermitNeeded" data-param="yes">Yes, this trip needs a permit</button>
    <button class="chip ${!p.needed?'on':''}" data-action="setPermitNeeded" data-param="no">No permit needed</button>
  </div>
  ${!p.needed ? `<div class="banner mt4">${I.info} Nothing to fill in here — this will show as "No permit needed" on the trip page.</div>` : `
  <div class="divlabel">Where's the permit from?</div>
  ${Object.entries(PERMIT_SOURCES).map(([key,src])=>`
    <button class="permitcard ${p.source===key?'on':''}" data-action="setPermitSource" data-param="${key}">
      <span class="permitcard__ic">${I[src.icon]}</span>
      <span><span class="permitcard__t">${src.label}</span><span class="permitcard__s">${src.sub}</span></span>
    </button>`).join('')}
  ${p.source && p.source!=='other' ? `
    <div class="divlabel">Steps to reserve it</div>
    <div class="list steplist">
      ${PERMIT_SOURCES[p.source].steps.map(s=>`<div class="stepitem"><span class="stepitem__n"></span><span class="stepitem__t">${s}</span></div>`).join('')}
    </div>` : ''}
  ${p.source==='other' ? `
    <div class="field-group mt4"><label class="label">Instructions for members</label>
      <textarea class="field" data-bind="permit:notes" placeholder="Where do they go, who do they contact, what do they need?">${p.notes}</textarea></div>` : ''}
  ${p.source ? `
    <div class="field-group mt4"><label class="label">Reservation link or confirmation number <span class="opt">optional</span></label>
      <input class="field" data-bind="permit:link" value="${p.link}" placeholder="Paste the recreation.gov link once you've booked" /></div>` : ''}
  `}
  `;
}

/* ---------- 5. Budget ---------- */
function sliderRow(label, valSpanText, path, value, min, max, step=1){
  return `<div class="budget-row">
    <div class="budget-row__head">
      <span class="budget-row__name">${label}</span>
      <span class="budget-row__val" data-valfor="${path}" data-fmt="${valSpanText}">${valSpanText.replace('{v}', value)}</span>
    </div>
    <input class="slider" type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-bindnum="${path}" />
  </div>`;
}
function stepBudget(){
  const b = ADV.budget;
  return `
  <div class="wiz__eyebrow">Step 5 of 9</div>
  <h1 class="wiz__title">Budget</h1>
  <p class="wiz__hint">Drag each dial — the total updates live. This is exactly what members see as the cost breakdown.</p>

  <div class="divlabel">Group &amp; travel</div>
  <div class="list">
    ${sliderRow('Capacity', '{v} ppl', 'capacity', ADV.capacity, 2, 40)}
    ${sliderRow('Cars needed', '{v} cars', 'cars', ADV.cars, 0, 12)}
    ${sliderRow('Distance (round trip, mi)', '{v} mi', 'budget.distance', b.distance, 0, b.distanceMax, 5)}
  </div>

  <div class="divlabel">Group costs <span class="opt">split evenly across capacity</span></div>
  <div class="list">
    ${sliderRow('Campsite total', '$'+'{v}', 'budget.campsiteTotal', b.campsiteTotal, 0, b.campsiteMax, 5)}
    ${sliderRow('Permits total', '$'+'{v}', 'budget.permitsTotal', b.permitsTotal, 0, b.permitsMax, 5)}
    ${sliderRow('Misc costs', '$'+'{v}', 'budget.miscTotal', b.miscTotal, 0, b.miscMax, 5)}
  </div>

  <div class="divlabel">Food</div>
  <div class="list">
    <div class="togglerow"><span class="row__title">Food included in the cost</span>
      <button class="toggle ${b.foodOn?'on':''}" data-action="toggleFood"><span class="knob"></span></button></div>
    ${b.foodOn ? `
    <div class="pad" style="padding:0 var(--s4) 14px">
      <div class="chiprow mt3">
        <button class="chip ${b.foodMode==='estimate'?'on':''}" data-action="setFoodMode" data-param="estimate">Quick estimate</button>
        <button class="chip ${b.foodMode==='itemized'?'on':''}" data-action="setFoodMode" data-param="itemized">Build a food budget</button>
      </div>
      ${b.foodMode==='estimate' ? `
        <div class="budget-row" style="padding-left:0;padding-right:0">
          <div class="budget-row__head"><span class="budget-row__name">Number of meals</span>
            <span class="budget-row__val" data-valfor="budget.meals" data-fmt="{v} meals">${b.meals} meals</span></div>
          <input class="slider" type="range" min="0" max="12" step="1" value="${b.meals}" data-bindnum="budget.meals" />
        </div>
        <div class="form-grid mt3" style="grid-template-columns:1fr 1fr;max-width:320px">
          <div class="field-group"><label class="label">$ per meal</label>
            <input class="field" type="number" min="0" step="1" data-bind="budget:costPerMeal" value="${b.costPerMeal}" /></div>
        </div>
        <p class="field-hint mt2">$7/meal is a solid group-food estimate for a weekend trip. ${b.meals} meals × $${b.costPerMeal} = <span class="strong" data-valfor="foodSubtotal" data-fmt="${'$'}{v}">$${foodPerPerson()}</span> per person.</p>
      ` : `
        <div class="list mt3">
          ${b.foodItems.map((f,idx)=>`
            <div class="itin-row">
              <div class="desc"><input class="field" data-bind="foodItem:${idx}:label" value="${f.label}" placeholder="e.g. Sat dinner" /></div>
              <div style="width:100px"><input class="field" type="number" min="0" data-bind="foodItem:${idx}:cost" value="${f.cost}" placeholder="$" /></div>
              <button class="rowbtn" data-action="removeFoodItem" data-param="${idx}">${I.x}</button>
            </div>`).join('')}
          <button class="addrow" data-action="addFoodItem">${I.plus} Add a meal or snack cost</button>
        </div>
        <p class="field-hint mt2">Per-person food total: <span class="strong">$${foodPerPerson()}</span></p>
      `}
    </div>` : ''}
  </div>

  <div class="divlabel">Insurance</div>
  <div class="list">
    <div class="togglerow"><span class="row__title">Injury insurance ($${b.insuranceCost}/person)</span>
      <button class="toggle ${b.insuranceOn?'on':''}" data-action="toggleInsurance"><span class="knob"></span></button></div>
  </div>

  <div class="divlabel">Breakdown</div>
  <div class="list" id="budgetBreakdown">${breakdownHtml()}</div>
  `;
}
function breakdownHtml(){
  const rows = budgetBreakdown();
  return `${rows.length ? rows.map(([l,v])=>`<div class="row"><span class="row__body"><span class="row__title">${l}</span></span><span class="strong">$${v}</span></div>`).join('')
    : `<div class="row"><span class="row__body muted">No costs yet — everything's free so far.</span></div>`}
  <div class="budget-total"><span class="l">Total per person</span><span class="v" data-budget-total>$${budgetTotal()}</span></div>
  <div class="row"><span class="row__body"><span class="row__sub">Total trip cost (${ADV.capacity} ppl)</span></span><span class="strong" data-budget-total-trip>$${budgetTotal()*ADV.capacity}</span></div>
  `;
}
function refreshBudgetTotals(){
  const list = el('budgetBreakdown');
  if (!list) return;
  list.innerHTML = breakdownHtml();
}
function mountBudgetSliders(){
  const root = el('screen');
  root.querySelectorAll('input[type=range][data-bindnum]').forEach(input=>{
    input.addEventListener('input', ()=>{
      setNumPath(input.dataset.bindnum, +input.value);
      root.querySelectorAll(`[data-valfor="${input.dataset.bindnum}"]`).forEach(span=>{
        span.textContent = span.dataset.fmt.replace('{v}', input.value);
      });
      refreshBudgetTotals();
      const foodNote = root.querySelector('[data-valfor="foodSubtotal"]');
      if (foodNote) foodNote.textContent = foodNote.dataset.fmt.replace('{v}', foodPerPerson());
    });
    input.addEventListener('change', ()=> render());
  });
}
function setNumPath(path, val){
  const parts = path.split('.');
  if (parts.length===1) ADV[parts[0]] = val;
  else ADV[parts[0]][parts[1]] = val;
}

/* ---------- 6. Gear ---------- */
function stepGear(){
  return `
  <div class="wiz__eyebrow">Step 6 of 9</div>
  <h1 class="wiz__title">Gear list</h1>
  <p class="wiz__hint">Start from a template, then adjust. This is what shows in the Details panel on the trip page.</p>
  <div class="chiprow">
    ${Object.entries(GEAR_TEMPLATES).map(([key,t])=>`<button class="chip ${ADV.gearTemplate===key?'on':''}" data-action="setGearTemplate" data-param="${key}">${t.label}</button>`).join('')}
  </div>
  <div class="list mt4">
    ${ADV.gear.map((g,idx)=>`
      <div class="check">
        <input class="field" style="border:none;background:none;padding:0;flex:1" data-bind="arr:gear:${idx}:name" value="${g.name}" />
        <button class="chip small" style="padding:5px 10px;font-size:11.5px" data-action="toggleGearRequired" data-param="${idx}">${g.required?'Required':'Optional'}</button>
        <button class="rowbtn" data-action="removeGearItem" data-param="${idx}">${I.x}</button>
      </div>`).join('')}
    <button class="addrow" data-action="addGearItem">${I.plus} Add an item</button>
  </div>
  `;
}

/* ---------- 7. Rides & tent ---------- */
function stepRides(){
  return `
  <div class="wiz__eyebrow">Step 7 of 9</div>
  <h1 class="wiz__title">Rides &amp; tent</h1>
  <p class="wiz__hint">Set how many seats and tent spots you can offer — members claim them once this goes live.</p>
  <div class="list">
    <div class="row"><span class="row__body"><span class="row__title">${I.car} Cars expected</span></span>
      <div class="row__actions">
        <button class="rowbtn" data-action="adjustCars" data-param="-1">–</button>
        <span class="strong" style="width:24px;text-align:center">${ADV.cars}</span>
        <button class="rowbtn" data-action="adjustCars" data-param="1">+</button>
      </div></div>
    <div class="row"><span class="row__body"><span class="row__title">${I.tent} Tent spots</span></span>
      <div class="row__actions">
        <button class="rowbtn" data-action="adjustTent" data-param="-1">–</button>
        <span class="strong" style="width:24px;text-align:center">${ADV.tentSpots}</span>
        <button class="rowbtn" data-action="adjustTent" data-param="1">+</button>
      </div></div>
  </div>
  `;
}

/* ---------- 8. Photos ---------- */
function stepPhotos(){
  return `
  <div class="wiz__eyebrow">Step 8 of 9</div>
  <h1 class="wiz__title">Photos</h1>
  <p class="wiz__hint">1–6 shots so people know what they're in for.</p>
  <div class="phgrid">
    ${Array.from({length: ADV.photos}).map((_,idx)=>`<button class="ph" data-action="removePhoto" data-param="${idx}">${I.img}</button>`).join('')}
    ${ADV.photos < 6 ? `<button class="ph" data-action="addPhoto">${I.plus}</button>` : ''}
  </div>
  `;
}

/* ---------- 9. Preview ---------- */
function stepPreview(){
  const readiness = [
    ['Basics', !!(ADV.name && ADV.location)],
    ['Dates', !!(ADV.dateStart && ADV.dateEnd)],
    ['Write-up', ADV.writeup.length > 10],
    ['Itinerary', ADV.itinerary.length > 0],
    ['Permit', !ADV.permit.needed || !!ADV.permit.source],
    ['Budget', true],
    ['Gear list', ADV.gear.length > 0],
  ];
  return `
  <div class="wiz__eyebrow">Step 9 of 9</div>
  <h1 class="wiz__title">${S.editingId ? 'Preview &amp; save' : 'Preview &amp; publish'}</h1>
  <p class="wiz__hint">Exactly what this looks like on the mobile app before it goes live.</p>
  <div class="preview-wrap">
    <div class="preview-copy">
      <div class="card">
        <div class="row"><span class="row__body"><span class="row__title">${S.editingId ? 'Ready to save?' : 'Ready to publish?'}</span></span></div>
        ${readiness.map(([l,ok])=>`<div class="row"><span class="row__body"><span class="row__title">${l}</span></span><span class="tag">${ok?'✓ set':'incomplete'}</span></div>`).join('')}
      </div>
      <div class="card">
        <div class="row"><span class="row__body"><span class="row__sub">Visible to</span><span class="row__title">${visLabel()}</span></span></div>
      </div>
    </div>
    ${deviceHtml()}
  </div>
  `;
}

function deviceHtml(){
  const tabs = [['overview','Overview'],['details','Details'],['rides','Rides & tent']];
  return `<div class="device"><div class="device__screen">
    <div class="device__tabs">${tabs.map(([k,l])=>`<button class="device__tab ${S.previewTab===k?'on':''}" data-action="setPreviewTab" data-param="${k}">${l}</button>`).join('')}</div>
    <div class="device__body">${previewPanel()}</div>
  </div></div>`;
}
function previewPanel(){
  if (S.previewTab==='details') return previewDetails();
  if (S.previewTab==='rides') return previewRides();
  return previewOverview();
}
function previewOverview(){
  return `
  <div class="dhero">${'<div class="ph"></div>'}<div class="dhero__grad"></div>
    <div class="dhero__meta"><div class="t">${ADV.name}</div><div class="s">${fmtDate(ADV.dateStart) ? fmtDate(ADV.dateStart)+'–'+fmtDate(ADV.dateEnd)+' · ' : ''}${ADV.location}</div></div></div>
  <div class="dsec-h">Itinerary</div>
  <div class="dpad">${ADV.itinerary.map(r=>`<div class="drow"><span class="tg">${r.time}</span><span>${r.text}</span></div>`).join('')}</div>
  <div class="dsec-h">Cost breakdown</div>
  <div class="dpad">${budgetBreakdown().map(([l,v])=>`<div class="drow"><span>${l}</span><span class="v">$${v}</span></div>`).join('') || `<div class="drow muted">Free trip</div>`}<div class="drow"><span class="strong">Total</span><span class="v">$${budgetTotal()}</span></div></div>
  <div style="height:14px"></div>
  `;
}
function previewDetails(){
  const p = ADV.permit;
  return `
  <div class="dsec-h">Permit</div>
  <div class="dpad small muted" style="padding-bottom:8px">${p.needed ? (PERMIT_SOURCES[p.source]?.label || 'Permit required') : 'No permit needed'}</div>
  <div class="dsec-h">What to pack</div>
  ${ADV.gear.map(g=>`<div class="dcheck"><span class="box"></span><span>${g.name}${g.required?'':' (optional)'}</span></div>`).join('')}
  <div style="height:14px"></div>
  `;
}
function previewRides(){
  return `
  <div class="dsec-h">Rides</div>
  <div class="dpad">${Array.from({length: ADV.cars}).map((_,i)=>`<div class="drow"><span>Open seat</span></div>`).join('') || `<div class="drow muted">No cars set yet</div>`}</div>
  <div class="dsec-h">Tent spots</div>
  <div class="dpad">${Array.from({length: ADV.tentSpots}).map((_,i)=>`<div class="drow"><span>Open tent spot</span></div>`).join('') || `<div class="drow muted">No tent spots set yet</div>`}</div>
  <div style="height:14px"></div>
  `;
}

/* ---------- Publish sheet ---------- */
function publishSheetHtml(){
  const visList = ADV.visType==='club' ? CLUBS : CREWS;
  return `<div class="sheet-overlay">
    <div class="sheet">
      <div class="sheet__title">Publish to Trip Signups</div>
      <div class="sheet__sub">This sends "${ADV.name}" straight to the mobile app's Trip Signups for the group you pick.</div>
      <div class="chiprow">
        <button class="chip ${ADV.visType==='club'?'on':''}" data-action="setVisType" data-param="club">Club</button>
        <button class="chip ${ADV.visType==='crew'?'on':''}" data-action="setVisType" data-param="crew">Crew</button>
      </div>
      <div class="chiprow mt3">
        ${visList.map(v=>`<button class="chip ${ADV.visId===v.id?'on':''}" data-action="setVisId" data-param="${v.id}">${v.name}</button>`).join('')}
      </div>
      <div style="display:flex;gap:10px;margin-top:22px">
        <button class="btn btn--ghost" style="flex:1" data-action="closePublish">Cancel</button>
        <button class="btn" style="flex:1" data-action="doPublish">Publish</button>
      </div>
    </div>
  </div>`;
}

function renderConfirmation(){
  return `
  ${topbar('Published')}
  <div class="studio">
    ${studioSidebar('create')}
    <div class="studio__main">
      <div class="wiz__main"><div class="wiz__body">
        <div class="card confirm__card mt6" style="margin-left:auto;margin-right:auto">
          <div class="confirm__icon">${I.check}</div>
          <h2>Published to ${visLabel()}</h2>
          <p>"${ADV.name}" is now live in Trip Signups on the mobile app — members can find it and join. You can edit it any time from Manage Adventures.</p>
          <div style="display:flex;gap:10px;justify-content:center">
            <button class="btn btn--ghost" data-action="nav" data-param="manage">Manage Adventures</button>
            <button class="btn" data-action="startAnother">Start another adventure</button>
          </div>
        </div>
      </div></div>
    </div>
  </div>`;
}

/* ---------- Adventure wizard actions ---------- */
Object.assign(ACTIONS, {
  toast: (param)=>toast(param),
  goStep: (param)=>goStep(param),
  nextStep: ()=>nextStep(),
  prevStep: ()=>prevStep(),

  setVisType: (param)=>{ ADV.visType = param; ADV.visId = (param==='club'?CLUBS:CREWS)[0].id; render(); },
  setVisId: (param)=>{ ADV.visId = param; render(); },

  addItinRow: ()=>{ ADV.itinerary.push({ time:'', text:'' }); render(); },
  removeItinRow: (param)=>{ ADV.itinerary.splice(+param,1); render(); },

  setPermitNeeded: (param)=>{ ADV.permit.needed = param==='yes'; render(); },
  setPermitSource: (param)=>{ ADV.permit.source = param; render(); },

  toggleFood: ()=>{ ADV.budget.foodOn = !ADV.budget.foodOn; render(); },
  setFoodMode: (param)=>{ ADV.budget.foodMode = param; render(); },
  addFoodItem: ()=>{ ADV.budget.foodItems.push({ label:'New item', cost:0 }); render(); },
  removeFoodItem: (param)=>{ ADV.budget.foodItems.splice(+param,1); render(); },
  toggleInsurance: ()=>{ ADV.budget.insuranceOn = !ADV.budget.insuranceOn; render(); },

  setGearTemplate: (param)=>{ ADV.gearTemplate = param; ADV.gear = GEAR_TEMPLATES[param].items.map(i=>({...i})); render(); },
  toggleGearRequired: (param)=>{ const g = ADV.gear[+param]; g.required = !g.required; render(); },
  removeGearItem: (param)=>{ ADV.gear.splice(+param,1); render(); },
  addGearItem: ()=>{ ADV.gear.push({ name:'New item', required:false }); render(); },

  adjustCars: (param)=>{ ADV.cars = clamp(ADV.cars + (+param), 0, 12); render(); },
  adjustTent: (param)=>{ ADV.tentSpots = clamp(ADV.tentSpots + (+param), 0, 20); render(); },

  addPhoto: ()=>{ ADV.photos = clamp(ADV.photos+1, 0, 6); render(); },
  removePhoto: ()=>{ ADV.photos = clamp(ADV.photos-1, 0, 6); render(); },

  setPreviewTab: (param)=>{ S.previewTab = param; render(); },

  openPublish: ()=>{ S.publishOpen = true; render(); },
  closePublish: ()=>{ S.publishOpen = false; render(); },
  doPublish: ()=>{
    S.publishOpen = false; S.published = true;
    PUBLISHED.unshift(publishedEntry(deepCopy(ADV), { publishedOn: new Date().toISOString().slice(0,10) }));
    S.cloneSource = null;
    render();
  },

  /* edit mode */
  saveEdits: ()=>{
    const entry = PUBLISHED.find(t=>t.id===S.editingId);
    if (entry){ entry.adv = deepCopy(ADV); entry.visLabel = visLabelFor(entry.adv); }
    S.editingId = null;
    toast('Changes saved — members see the update immediately');
    goView('manage');
  },
  cancelEdits: ()=>{
    S.editingId = null;
    toast('Changes discarded');
    goView('manage');
  },

  startAnother: ()=>{
    ADV = freshAdventure();
    S.editingId = null; S.cloneSource = null;
    resetWizard();
    goView('create');
  },
});

/* ---------- Text field bindings (no full re-render, keeps focus) ---------- */
function handleBind(key, node){
  const parts = key.split(':');
  const val = node.value;
  if (parts[0]==='simple'){
    ADV[parts[1]] = node.type==='number' ? +val : val;
  } else if (parts[0]==='arr'){
    const [,coll,idx,prop] = parts;
    ADV[coll][+idx][prop] = val;
  } else if (parts[0]==='permit'){
    ADV.permit[parts[1]] = val;
  } else if (parts[0]==='budget'){
    ADV.budget[parts[1]] = node.type==='number' ? +val : val;
  } else if (parts[0]==='foodItem'){
    const [,idx,prop] = parts;
    ADV.budget.foodItems[+idx][prop] = prop==='cost' ? +val : val;
  } else if (parts[0]==='club'){
    NC[parts[1]] = node.type==='number' ? +val : val;
  } else if (parts[0]==='officer'){
    const [,idx,prop] = parts;
    NC.officers[+idx][prop] = val;
  } else if (parts[0]==='editClub'){
    const club = CLUBS.find(c=>c.id===S.manageClubId);
    if (club) club[parts[1]] = node.type==='number' ? +val : val;
  }
}
