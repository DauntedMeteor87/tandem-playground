// Source: Wireframe 0.2 — stepPermits() in screens.js. Step 4 of 9: a guided,
// source-specific permit builder. Says-no path shows the "No permit needed"
// empty state (empty-states.md #9, wireframe verbatim); says-yes reveals the
// source picker, that source's numbered steps, an "other" notes box, and an
// optional reservation link.
"use client";

import { EmptyBanner } from "@/components/EmptyBanner";
import { PERMIT_SOURCES, type PermitSourceKey } from "@/lib/data";
import { advPatch, type StepProps } from "./StepProps";
import { PermitSourcePicker } from "./PermitSourcePicker";

export function PermitsStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);
  const p = adv.permit;

  const setPermit = (next: Partial<typeof p>) =>
    patch({ permit: { ...p, ...next } });

  return (
    <>
      <div className="wiz__eyebrow">Step 4 of 9</div>
      <h1 className="wiz__title">Permits</h1>
      <p className="wiz__hint">
        Point members to exactly how to get squared away — most groups get stuck
        here, not on the trail.
      </p>

      <div className="chiprow">
        <button
          type="button"
          className={`chip ${p.needed ? "on" : ""}`}
          onClick={() => setPermit({ needed: true })}
        >
          Yes, this trip needs a permit
        </button>
        <button
          type="button"
          className={`chip ${!p.needed ? "on" : ""}`}
          onClick={() => setPermit({ needed: false })}
        >
          No permit needed
        </button>
      </div>

      {!p.needed ? (
        <EmptyBanner className="mt4">
          Nothing to fill in here — this will show as &ldquo;No permit
          needed&rdquo; on the trip page.
        </EmptyBanner>
      ) : (
        <>
          <div className="divlabel">Where&apos;s the permit from?</div>
          <PermitSourcePicker
            selected={p.source}
            onSelect={(source: PermitSourceKey) => setPermit({ source })}
          />

          {p.source && p.source !== "other" ? (
            <>
              <div className="divlabel">Steps to reserve it</div>
              <div className="list steplist">
                {PERMIT_SOURCES[p.source].steps.map((s, i) => (
                  <div className="stepitem" key={i}>
                    <span className="stepitem__n" />
                    <span className="stepitem__t">{s}</span>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {p.source === "other" ? (
            <div className="field-group mt4">
              <label className="label" htmlFor="permit-notes">
                Instructions for members
              </label>
              <textarea
                id="permit-notes"
                className="field"
                value={p.notes}
                onChange={(e) => setPermit({ notes: e.target.value })}
                placeholder="Where do they go, who do they contact, what do they need?"
              />
            </div>
          ) : null}

          {p.source ? (
            <div className="field-group mt4">
              <label className="label" htmlFor="permit-link">
                Reservation link or confirmation number{" "}
                <span className="opt">optional</span>
              </label>
              <input
                id="permit-link"
                className="field"
                value={p.link}
                onChange={(e) => setPermit({ link: e.target.value })}
                placeholder="Paste the recreation.gov link once you've booked"
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
