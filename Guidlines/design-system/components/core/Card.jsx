import React from "react";

/**
 * Card — the base warm surface: white, hairline border, soft shadow,
 * generous rounding. The building block for most content blocks.
 */
export function Card({ raised = false, pad = false, children, style, ...rest }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: raised ? "var(--shadow-raised)" : "var(--shadow-card)",
        padding: pad ? "var(--s4)" : 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
