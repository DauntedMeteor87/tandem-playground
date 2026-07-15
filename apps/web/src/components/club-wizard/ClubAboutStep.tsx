// Source: Wireframe 0.2 — clubStepAbout() in studio.js. Step 2 of 6: the club
// description members see before they hit Join, plus an optional meet time.
"use client";

import { ncPatch, type ClubStepProps } from "./ClubStepProps";

export function ClubAboutStep({ nc, dispatch }: ClubStepProps) {
  const patch = ncPatch(nc, dispatch);

  return (
    <>
      <div className="wiz__eyebrow">Step 2 of 6</div>
      <h1 className="wiz__title">About the club</h1>
      <p className="wiz__hint">
        What&apos;s the club for, and who should join? This shows on the club
        page before someone hits Join.
      </p>
      <div className="field-group">
        <label className="label" htmlFor="club-about">
          Description
        </label>
        <textarea
          id="club-about"
          className="field"
          style={{ minHeight: 160 }}
          value={nc.about}
          onChange={(e) => patch({ about: e.target.value })}
          placeholder="What do you do, how often, and who's it for?"
        />
        <div className="field-hint">
          The clubs that grow fastest say two things clearly: what a normal week
          looks like, and that beginners are genuinely welcome.
        </div>
      </div>
      <div className="field-group mt4">
        <label className="label" htmlFor="club-meets">
          When &amp; where you meet <span className="opt">optional</span>
        </label>
        <input
          id="club-meets"
          className="field"
          value={nc.meets}
          onChange={(e) => patch({ meets: e.target.value })}
          placeholder="e.g. Every other Tuesday, 7 PM — Rec Center Rm 12"
        />
      </div>
    </>
  );
}
