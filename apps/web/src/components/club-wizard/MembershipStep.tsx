// Source: Wireframe 0.2 — clubStepMembership() in studio.js. Step 3 of 6: how
// people get in (open / request / invite, as permit-style cards) and whether the
// club collects quarterly dues (shared DuesSettings control).
"use client";

import { DuesSettings } from "@/components/DuesSettings";
import { ICONS, type IconKey } from "@/components/icons";
import type { JoinPolicy } from "@/lib/data";
import { ncPatch, type ClubStepProps } from "./ClubStepProps";

const POLICIES: Array<{ id: JoinPolicy; t: string; s: string; icon: IconKey }> = [
  {
    id: "open",
    t: "Open",
    s: "Anyone in your community can join instantly",
    icon: "users",
  },
  {
    id: "request",
    t: "Request to join",
    s: "People ask, admins approve — the usual for trip clubs",
    icon: "shield",
  },
  {
    id: "invite",
    t: "Invite only",
    s: "Members join by invite link from an admin",
    icon: "link",
  },
];

export function MembershipStep({ nc, dispatch }: ClubStepProps) {
  const patch = ncPatch(nc, dispatch);

  return (
    <>
      <div className="wiz__eyebrow">Step 3 of 6</div>
      <h1 className="wiz__title">Membership</h1>
      <p className="wiz__hint">
        How people get in, and whether the club collects dues.
      </p>
      {POLICIES.map((p) => {
        const Icon = ICONS[p.icon];
        return (
          <button
            type="button"
            key={p.id}
            className={`permitcard ${nc.joinPolicy === p.id ? "on" : ""}`}
            onClick={() => patch({ joinPolicy: p.id })}
          >
            <span className="permitcard__ic">
              <Icon />
            </span>
            <span>
              <span className="permitcard__t">{p.t}</span>
              <span className="permitcard__s">{p.s}</span>
            </span>
          </button>
        );
      })}
      <DuesSettings
        duesOn={nc.duesOn}
        dues={nc.dues}
        onToggle={() => patch({ duesOn: !nc.duesOn })}
        onDues={(dues) => patch({ dues })}
      />
    </>
  );
}
