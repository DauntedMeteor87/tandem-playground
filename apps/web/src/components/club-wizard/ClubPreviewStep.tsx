// Source: Wireframe 0.2 — clubStepPreview() in studio.js. Step 6 of 6: a
// readiness checklist + a phone-frame preview of the club page members will see.
// Per empty-states.md web #12, missing fields never render as blanks — they show
// a muted "Add this in step N" hint that points back to where to fill it in.
"use client";

import { joinPolicyLabel } from "@/lib/data";
import type { ClubStepProps } from "./ClubStepProps";

/** A muted pointer back to the step that fills a still-empty field. */
function AddHint({ step }: { step: number }) {
  return <span className="muted">Add this in step {step}</span>;
}

export function ClubPreviewStep({ nc }: ClubStepProps) {
  const readiness: Array<[string, boolean]> = [
    ["Name", !!nc.name.trim()],
    ["Description", nc.about.length > 10],
    ["Join policy", true],
    ["Officers", nc.officers.length > 0],
  ];

  return (
    <>
      <div className="wiz__eyebrow">Step 6 of 6</div>
      <h1 className="wiz__title">Preview &amp; create</h1>
      <p className="wiz__hint">This is the club page members see in the app.</p>
      <div className="preview-wrap">
        <div className="preview-copy">
          <div className="card">
            <div className="row">
              <span className="row__body">
                <span className="row__title">Ready to create?</span>
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
                <span className="row__sub">Join policy</span>
                <span className="row__title">
                  {joinPolicyLabel(nc.joinPolicy)}
                </span>
              </span>
            </div>
            <div className="row">
              <span className="row__body">
                <span className="row__sub">Dues</span>
                <span className="row__title">
                  {nc.duesOn ? `$${nc.dues}/quarter` : "None"}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="device">
          <div className="device__screen">
            <div className="device__body">
              <div className="dhero">
                <div className="ph" style={{ borderRadius: 0, height: 130 }} />
                <div className="dhero__grad" />
                <div className="dhero__meta">
                  <div className="t">{nc.name || <AddHint step={1} />}</div>
                  <div className="s">
                    {nc.category}
                    {nc.community ? ` · ${nc.community}` : ""}
                  </div>
                </div>
              </div>
              <div className="dsec-h">About</div>
              <div
                className="dpad small"
                style={{ lineHeight: 1.5, color: "var(--tc-ink-2)" }}
              >
                {nc.about || <AddHint step={2} />}
              </div>
              {nc.meets ? (
                <>
                  <div className="dsec-h">Meets</div>
                  <div className="dpad small muted">{nc.meets}</div>
                </>
              ) : null}
              <div className="dsec-h">Officers</div>
              <div className="dpad">
                {nc.officers.map((o, idx) => (
                  <div className="drow" key={idx}>
                    <span>{o.name || <AddHint step={4} />}</span>
                    <span
                      className="v"
                      style={{ fontWeight: 600, color: "var(--tc-ink-3)" }}
                    >
                      {o.role}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ height: 14 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
