// Source: Wireframe 0.2 — stepPreview() + deviceHtml() + previewOverview/
// Details/Rides() in screens.js. Step 9 of 9: a readiness checklist beside an
// embedded phone frame that re-creates the mobile trip hub (Overview / Details
// / Rides & tent). This is a web-only re-creation kept in sync by hand — it does
// NOT import mobile code (migration doc §9.6.1).
"use client";

import type { Dispatch } from "react";
import {
  PERMIT_SOURCES,
  budgetBreakdown,
  budgetTotal,
  fmtDate,
  visLabelFor,
  type Adventure,
  type Club,
  type Crew,
} from "@/lib/data";
import type { PreviewTab, StudioAction } from "@/lib/studio-state";

const TABS: Array<[PreviewTab, string]> = [
  ["overview", "Overview"],
  ["details", "Details"],
  ["rides", "Rides & tent"],
];

export function PreviewStep({
  adv,
  dispatch,
  clubs,
  crews,
  previewTab,
  editing,
}: {
  adv: Adventure;
  dispatch: Dispatch<StudioAction>;
  clubs: Club[];
  crews: Crew[];
  previewTab: PreviewTab;
  editing: boolean;
}) {
  const readiness: Array<[string, boolean]> = [
    ["Basics", !!(adv.name && adv.location)],
    ["Dates", !!(adv.dateStart && adv.dateEnd)],
    ["Write-up", adv.writeup.length > 10],
    ["Itinerary", adv.itinerary.length > 0],
    ["Permit", !adv.permit.needed || !!adv.permit.source],
    ["Budget", true],
    ["Gear list", adv.gear.length > 0],
  ];

  return (
    <>
      <div className="wiz__eyebrow">Step 9 of 9</div>
      <h1 className="wiz__title">{editing ? "Preview & save" : "Preview & publish"}</h1>
      <p className="wiz__hint">
        Exactly what this looks like on the mobile app before it goes live.
      </p>
      <div className="preview-wrap">
        <div className="preview-copy">
          <div className="card">
            <div className="row">
              <span className="row__body">
                <span className="row__title">
                  {editing ? "Ready to save?" : "Ready to publish?"}
                </span>
              </span>
            </div>
            {readiness.map(([label, ok]) => (
              <div className="row" key={label}>
                <span className="row__body">
                  <span className="row__title">{label}</span>
                </span>
                <span className="tag">{ok ? "✓ set" : "incomplete"}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="row">
              <span className="row__body">
                <span className="row__sub">Visible to</span>
                <span className="row__title">
                  {visLabelFor(adv, clubs, crews)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="device">
          <div className="device__screen">
            <div className="device__tabs">
              {TABS.map(([key, label]) => (
                <button
                  type="button"
                  key={key}
                  className={`device__tab ${previewTab === key ? "on" : ""}`}
                  onClick={() => dispatch({ type: "SET_PREVIEW_TAB", tab: key })}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="device__body">
              {previewTab === "details" ? (
                <PreviewDetails adv={adv} />
              ) : previewTab === "rides" ? (
                <PreviewRides adv={adv} />
              ) : (
                <PreviewOverview adv={adv} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PreviewOverview({ adv }: { adv: Adventure }) {
  const rows = budgetBreakdown(adv);
  const dateLine = fmtDate(adv.dateStart)
    ? `${fmtDate(adv.dateStart)}–${fmtDate(adv.dateEnd)} · ${adv.location}`
    : adv.location;
  return (
    <>
      <div className="dhero">
        <div className="ph" />
        <div className="dhero__grad" />
        <div className="dhero__meta">
          <div className="t">{adv.name}</div>
          <div className="s">{dateLine}</div>
        </div>
      </div>
      <div className="dsec-h">Itinerary</div>
      <div className="dpad">
        {adv.itinerary.map((r, i) => (
          <div className="drow" key={i}>
            <span className="tg">{r.time}</span>
            <span>{r.text}</span>
          </div>
        ))}
      </div>
      <div className="dsec-h">Cost breakdown</div>
      <div className="dpad">
        {rows.length ? (
          rows.map(([label, value]) => (
            <div className="drow" key={label}>
              <span>{label}</span>
              <span className="v">${value}</span>
            </div>
          ))
        ) : (
          <div className="drow muted">Free trip</div>
        )}
        <div className="drow">
          <span className="strong">Total</span>
          <span className="v">${budgetTotal(adv)}</span>
        </div>
      </div>
      <div style={{ height: 14 }} />
    </>
  );
}

function PreviewDetails({ adv }: { adv: Adventure }) {
  const p = adv.permit;
  const permitLabel = p.needed
    ? p.source
      ? PERMIT_SOURCES[p.source].label
      : "Permit required"
    : "No permit needed";
  return (
    <>
      <div className="dsec-h">Permit</div>
      <div className="dpad small muted" style={{ paddingBottom: 8 }}>
        {permitLabel}
      </div>
      <div className="dsec-h">What to pack</div>
      {adv.gear.map((g, i) => (
        <div className="dcheck" key={i}>
          <span className="box" />
          <span>
            {g.name}
            {g.required ? "" : " (optional)"}
          </span>
        </div>
      ))}
      <div style={{ height: 14 }} />
    </>
  );
}

function PreviewRides({ adv }: { adv: Adventure }) {
  return (
    <>
      <div className="dsec-h">Rides</div>
      <div className="dpad">
        {adv.cars > 0 ? (
          Array.from({ length: adv.cars }).map((_, i) => (
            <div className="drow" key={i}>
              <span>Open seat</span>
            </div>
          ))
        ) : (
          <div className="drow muted">No cars set yet</div>
        )}
      </div>
      <div className="dsec-h">Tent spots</div>
      <div className="dpad">
        {adv.tentSpots > 0 ? (
          Array.from({ length: adv.tentSpots }).map((_, i) => (
            <div className="drow" key={i}>
              <span>Open tent spot</span>
            </div>
          ))
        ) : (
          <div className="drow muted">No tent spots set yet</div>
        )}
      </div>
      <div style={{ height: 14 }} />
    </>
  );
}
