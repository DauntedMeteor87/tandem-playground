// Source: Wireframe 0.2 — clubStepBasics() in studio.js. Step 1 of 6: name the
// club, place it in a community, and pick its category — how people find it.
"use client";

import { CLUB_CATEGORIES } from "@/lib/data";
import { ncPatch, type ClubStepProps } from "./ClubStepProps";

export function ClubBasicsStep({ nc, dispatch }: ClubStepProps) {
  const patch = ncPatch(nc, dispatch);

  return (
    <>
      <div className="wiz__eyebrow">Step 1 of 6</div>
      <h1 className="wiz__title">The basics</h1>
      <p className="wiz__hint">
        Name your club and pick what kind it is — this is how people find it in
        the app.
      </p>
      <div className="form-grid">
        <div className="field-group span2">
          <label className="label" htmlFor="club-name">
            Club name
          </label>
          <input
            id="club-name"
            className="field"
            value={nc.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="e.g. Field Studies"
          />
        </div>
        <div className="field-group span2">
          <label className="label" htmlFor="club-community">
            School or community
          </label>
          <input
            id="club-community"
            className="field"
            value={nc.community}
            onChange={(e) => patch({ community: e.target.value })}
            placeholder="e.g. Cal Poly SLO"
          />
        </div>
      </div>
      <div className="divlabel">Category</div>
      <div className="chiprow">
        {CLUB_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c}
            className={`chip ${nc.category === c ? "on" : ""}`}
            onClick={() => patch({ category: c })}
          >
            {c}
          </button>
        ))}
      </div>
    </>
  );
}
