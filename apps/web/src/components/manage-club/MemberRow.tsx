// Source: Wireframe 0.2 — a roster row in clubRoster() (studio.js). Avatar,
// name, a role picker, and a remove button — all locked for yourself ("(you)").
"use client";

import { IconX } from "@/components/icons";
import type { Member, MemberRole } from "@/lib/data";
import { RolePicker } from "./RolePicker";

export function MemberRow({
  member,
  onRole,
  onRemove,
}: {
  member: Member;
  onRole: (role: MemberRole) => void;
  onRemove: () => void;
}) {
  const isYou = member.name.includes("(you)");

  return (
    <div className="row">
      <div className="avatar avatar--sm">{member.name.trim()[0] || "?"}</div>
      <span className="row__body">
        <span className="row__title">{member.name}</span>
      </span>
      <RolePicker
        value={member.role}
        onChange={onRole}
        disabled={isYou}
        ariaLabel={`Role for ${member.name}`}
      />
      {isYou ? (
        <div style={{ width: 34 }} />
      ) : (
        <button
          type="button"
          className="rowbtn"
          title="Remove from club"
          aria-label={`Remove ${member.name}`}
          onClick={onRemove}
        >
          <IconX />
        </button>
      )}
    </div>
  );
}
