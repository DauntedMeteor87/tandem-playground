import React from "react";

/**
 * Mascot — the tandemclub orangutan. It "levels up" through 4 stages
 * (0 rest → 1 walk → 2 jump → 3 chill) as a member builds a streak.
 * Warm rust palette. Self-contained SVG (no asset dependency).
 */
const STAGES = [
  // 0 — resting
  `<ellipse cx="50" cy="87" rx="30" ry="7" fill="#e6dccb"/><path d="M28 82c-3-20 6-34 22-34s25 14 22 34c-1 6-9 9-22 9s-21-3-22-9z" fill="#a8623a"/><path d="M34 66q-10 6-16 16" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M66 66q9 5 11 12" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="36" cy="28" r="6.5" fill="#a8623a"/><circle cx="64" cy="28" r="6.5" fill="#a8623a"/><circle cx="50" cy="40" r="18" fill="#a8623a"/><ellipse cx="50" cy="44" rx="11" ry="9" fill="#f2e4d0"/><circle cx="45.5" cy="42" r="1.8" fill="#3a2a1c"/><circle cx="54.5" cy="42" r="1.8" fill="#3a2a1c"/><path d="M45 48q5 4 10 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="17" cy="83" r="5" fill="#caa06a"/><circle cx="26" cy="87" r="3.5" fill="#caa06a"/>`,
  // 1 — walking
  `<path d="M42 70q-7 13-11 21" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M58 70q8 9 6 23" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M38 50q-13 4-17 16" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M62 50q11 1 15-7" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M38 46c0-10 5-16 12-16s12 6 12 16v18c0 5-5 8-12 8s-12-3-12-8V46z" fill="#a8623a"/><circle cx="38" cy="14" r="5.5" fill="#a8623a"/><circle cx="62" cy="14" r="5.5" fill="#a8623a"/><circle cx="50" cy="24" r="16" fill="#a8623a"/><ellipse cx="50" cy="27" rx="9.5" ry="7.5" fill="#f2e4d0"/><circle cx="46" cy="26" r="1.6" fill="#3a2a1c"/><circle cx="54" cy="26" r="1.6" fill="#3a2a1c"/><path d="M46 31q4 3 8 0" stroke="#3a2a1c" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
  // 2 — jumping
  `<path d="M30 90q20 7 40 0" stroke="#caa06a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M42 68q-5 10 1 17" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M58 68q5 10-1 17" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M37 46q-11-14-5-25" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M63 46q11-14 5-25" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M38 44c0-10 5-16 12-16s12 6 12 16v14c0 5-5 8-12 8s-12-3-12-8V44z" fill="#a8623a"/><circle cx="38" cy="14" r="5.5" fill="#a8623a"/><circle cx="62" cy="14" r="5.5" fill="#a8623a"/><circle cx="50" cy="23" r="16" fill="#a8623a"/><ellipse cx="50" cy="26" rx="9.5" ry="7.5" fill="#f2e4d0"/><circle cx="46" cy="25" r="2.1" fill="#3a2a1c"/><circle cx="54" cy="25" r="2.1" fill="#3a2a1c"/><circle cx="50" cy="30" r="2.2" fill="#3a2a1c"/>`,
  // 3 — chilling with guitar
  `<ellipse cx="50" cy="87" rx="30" ry="7" fill="#e6dccb"/><path d="M26 82c-4-18 8-30 24-30s28 12 24 30c-2 6-46 6-48 0z" fill="#a8623a"/><rect x="62" y="44" width="3.4" height="21" rx="1.5" fill="#caa06a"/><ellipse cx="59" cy="68" rx="10" ry="13" fill="#caa06a"/><circle cx="59" cy="66" r="3.2" fill="#a8623a"/><path d="M40 68q9 3 13-4" stroke="#a8623a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M67 70q6-3 7-11" stroke="#a8623a" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="36" cy="28" r="6.5" fill="#a8623a"/><circle cx="64" cy="28" r="6.5" fill="#a8623a"/><circle cx="50" cy="40" r="18" fill="#a8623a"/><ellipse cx="50" cy="44" rx="11" ry="9" fill="#f2e4d0"/><path d="M44 41q2-2.4 4 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M52 41q2-2.4 4 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M44 48q6 5 12 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
];

export function Mascot({ stage = 0, size = 56, style, ...rest }) {
  const s = Math.max(0, Math.min(STAGES.length - 1, stage | 0));
  return (
    <span
      style={{ display: "inline-block", width: size, height: size, flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 100 100" width="100%" height="100%">${STAGES[s]}</svg>` }}
      {...rest}
    />
  );
}
