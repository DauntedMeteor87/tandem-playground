// Source: Wireframe 0.2 — the inline role <select> in clubRoster() (studio.js).
// A member's role dropdown over MEMBER_ROLES; disabled for yourself so you can't
// demote the founder out of the club.
"use client";

import { MEMBER_ROLES, type MemberRole } from "@/lib/data";

export function RolePicker({
  value,
  onChange,
  disabled,
  ariaLabel,
}: {
  value: MemberRole;
  onChange: (role: MemberRole) => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <select
      className="field field--inline"
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value as MemberRole)}
    >
      {MEMBER_ROLES.map((r) => (
        <option key={r}>{r}</option>
      ))}
    </select>
  );
}
