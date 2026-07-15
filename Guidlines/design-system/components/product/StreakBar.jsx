import React from "react";
import { Mascot } from "./Mascot.jsx";

/**
 * StreakBar — the "weeks outside" streak row on My Trips / Profile.
 * The mascot on the left evolves with the streak count.
 */
export function StreakBar({ weeks = 0, label = "Weeks outside", message, style, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 16,
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
        fontFamily: "var(--font-ui)",
        ...style,
      }}
      {...rest}
    >
      <Mascot stage={Math.min(3, weeks)} size={52} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
          {label}
        </div>
        <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.3 }}>
          {weeks} {weeks === 1 ? "week" : "weeks"}
        </div>
        {message && <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{message}</div>}
      </div>
    </div>
  );
}
