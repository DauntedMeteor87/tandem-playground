// Source: Wireframe 0.2 — stepBasics() in screens.js. Step 1 of 9: name, dates,
// location, capacity, co-leads, and who can see/join it (club vs crew + which).
"use client";

import { CREWS, type Club, type VisType } from "@/lib/data";
import { IconCopy } from "@/components/icons";
import { advPatch, type StepProps } from "./StepProps";

export function BasicsStep({
  adv,
  dispatch,
  clubs,
  cloneSource,
}: StepProps & { clubs: Club[]; cloneSource: string | null }) {
  const patch = advPatch(adv, dispatch);
  const visList = adv.visType === "club" ? clubs : CREWS;

  function setVisType(visType: VisType) {
    const first = (visType === "club" ? clubs : CREWS)[0];
    patch({ visType, visId: first ? first.id : "" });
  }

  return (
    <>
      <div className="wiz__eyebrow">Step 1 of 9</div>
      <h1 className="wiz__title">The basics</h1>
      <p className="wiz__hint">
        Name it, date it, place it. This is what shows at the top of the trip
        page.
      </p>

      {cloneSource ? (
        <div className="banner" style={{ marginBottom: 22 }}>
          <IconCopy />
          <span>
            Cloned from &ldquo;<span className="strong">{cloneSource}</span>
            &rdquo; — everything carried over except the dates and permit
            booking. Set new dates and re-reserve the permit before publishing.
          </span>
        </div>
      ) : null}

      <div className="form-grid">
        <div className="field-group span2">
          <label className="label" htmlFor="adv-name">
            Trip name
          </label>
          <input
            id="adv-name"
            className="field"
            value={adv.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="e.g. Sykes Hot Springs Overnight"
          />
        </div>
        <div className="field-group">
          <label className="label" htmlFor="adv-start">
            Starts
          </label>
          <input
            id="adv-start"
            className="field"
            type="date"
            value={adv.dateStart}
            onChange={(e) => patch({ dateStart: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="label" htmlFor="adv-end">
            Ends
          </label>
          <input
            id="adv-end"
            className="field"
            type="date"
            value={adv.dateEnd}
            onChange={(e) => patch({ dateEnd: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="label" htmlFor="adv-location">
            General location
          </label>
          <input
            id="adv-location"
            className="field"
            value={adv.location}
            onChange={(e) => patch({ location: e.target.value })}
            placeholder="e.g. Big Sur, CA"
          />
        </div>
        <div className="field-group">
          <label className="label" htmlFor="adv-capacity">
            Capacity
          </label>
          <input
            id="adv-capacity"
            className="field"
            type="number"
            min={1}
            value={adv.capacity}
            onChange={(e) => patch({ capacity: Number(e.target.value) })}
          />
        </div>
        <div className="field-group span2">
          <label className="label" htmlFor="adv-coleads">
            Co-leads <span className="opt">optional</span>
          </label>
          <input
            id="adv-coleads"
            className="field"
            value={adv.coLeads}
            onChange={(e) => patch({ coLeads: e.target.value })}
            placeholder="e.g. Jordan R."
          />
        </div>
      </div>

      <div className="divlabel">Who can see and join it</div>
      <div className="chiprow">
        <button
          type="button"
          className={`chip ${adv.visType === "club" ? "on" : ""}`}
          onClick={() => setVisType("club")}
        >
          Club
        </button>
        <button
          type="button"
          className={`chip ${adv.visType === "crew" ? "on" : ""}`}
          onClick={() => setVisType("crew")}
        >
          Crew
        </button>
      </div>
      <div className="chiprow mt3">
        {visList.map((v) => (
          <button
            type="button"
            key={v.id}
            className={`chip ${adv.visId === v.id ? "on" : ""}`}
            onClick={() => patch({ visId: v.id })}
          >
            {v.name}
          </button>
        ))}
      </div>
    </>
  );
}
