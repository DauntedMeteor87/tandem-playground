// Source: Wireframe 0.2 — clubStepOfficers() in studio.js. Step 4 of 6: you're
// the admin automatically (row 0 is locked); add anyone else who should be able
// to run trips or manage the roster.
"use client";

import { IconPlus, IconX } from "@/components/icons";
import { MEMBER_ROLES, type MemberRole } from "@/lib/data";
import { ncPatch, type ClubStepProps } from "./ClubStepProps";

export function OfficersStep({ nc, dispatch }: ClubStepProps) {
  const patch = ncPatch(nc, dispatch);

  const setOfficer = (idx: number, next: { name?: string; role?: MemberRole }) =>
    patch({
      officers: nc.officers.map((o, i) => (i === idx ? { ...o, ...next } : o)),
    });
  const addOfficer = () =>
    patch({ officers: [...nc.officers, { name: "", role: "Trip lead" }] });
  const removeOfficer = (idx: number) =>
    patch({ officers: nc.officers.filter((_, i) => i !== idx) });

  return (
    <>
      <div className="wiz__eyebrow">Step 4 of 6</div>
      <h1 className="wiz__title">Officers</h1>
      <p className="wiz__hint">
        You&apos;re the admin automatically. Add anyone else who should be able
        to run trips or manage the roster — they&apos;ll get an invite when the
        club goes live.
      </p>
      <div className="list">
        {nc.officers.map((o, idx) => (
          <div className="itin-row" key={idx}>
            <div className="desc">
              <input
                className="field"
                value={o.name}
                onChange={(e) => setOfficer(idx, { name: e.target.value })}
                placeholder="Name"
                disabled={idx === 0}
                aria-label={`Officer ${idx + 1} name`}
              />
            </div>
            <div style={{ width: 160 }}>
              <select
                className="field"
                value={o.role}
                onChange={(e) =>
                  setOfficer(idx, { role: e.target.value as MemberRole })
                }
                disabled={idx === 0}
                aria-label={`Officer ${idx + 1} role`}
              >
                {MEMBER_ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            {idx === 0 ? (
              <div style={{ width: 28 }} />
            ) : (
              <button
                type="button"
                className="rowbtn"
                onClick={() => removeOfficer(idx)}
                aria-label={`Remove officer ${idx + 1}`}
              >
                <IconX />
              </button>
            )}
          </div>
        ))}
        <button type="button" className="addrow" onClick={addOfficer}>
          <IconPlus /> Add an officer
        </button>
      </div>
    </>
  );
}
