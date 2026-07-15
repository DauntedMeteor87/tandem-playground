import React from "react";

/**
 * Chip — a pill filter/selector. `on` gives the filled (selected) state.
 * Mirrors the wireframe .chip / .pill pattern.
 */
export function Chip({ on = false, leadingIcon, children, style, ...rest }) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "8px 14px",
        borderRadius: "var(--r-pill)",
        fontFamily: "var(--font-ui)",
        fontSize: 13.5,
        fontWeight: 600,
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: "background .15s ease, color .15s ease, border-color .15s ease",
        background: on ? "var(--action)" : "var(--surface-card)",
        color: on ? "var(--text-on-action)" : "var(--text-secondary)",
        border: `1px solid ${on ? "var(--action)" : "var(--border-strong)"}`,
        ...style,
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
