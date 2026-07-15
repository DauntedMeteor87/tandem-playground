// Source: Wireframe 0.2 — stepWriteup() in screens.js. Step 2 of 9: the trip's
// sell — the first thing a member reads before they join.
"use client";

import { advPatch, type StepProps } from "./StepProps";

export function WriteupStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);
  return (
    <>
      <div className="wiz__eyebrow">Step 2 of 9</div>
      <h1 className="wiz__title">The write-up</h1>
      <p className="wiz__hint">
        Make it hefty — sell the trip. This is the first thing a member reads
        before they join.
      </p>
      <div className="field-group">
        <label className="label" htmlFor="adv-writeup">
          Description
        </label>
        <textarea
          id="adv-writeup"
          className="field"
          style={{ minHeight: 180 }}
          value={adv.writeup}
          onChange={(e) => patch({ writeup: e.target.value })}
          placeholder="What's the trip, what's the vibe, who's it for?"
        />
        <div className="field-hint">
          NOLS and Outward Bound both lead with what to expect physically and
          mentally — pace, difficulty, and what makes this trip worth showing up
          for.
        </div>
      </div>
    </>
  );
}
