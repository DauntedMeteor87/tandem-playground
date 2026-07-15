import React from "react";

/**
 * Segment — segmented control (e.g. Activities / Adventures filter).
 * Selected pill floats on a warm sunk track.
 */
export function Segment({ options = [], value, onChange, style, ...rest }) {
  const [sel, setSel] = React.useState(value ?? options[0]);
  const current = value ?? sel;
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        padding: 6,
        background: "var(--surface-sunk)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-pill)",
        fontFamily: "var(--font-ui)",
        ...style,
      }}
      {...rest}
    >
      {options.map((opt) => {
        const on = opt === current;
        return (
          <button
            key={opt}
            onClick={() => {
              setSel(opt);
              onChange && onChange(opt);
            }}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 10px",
              borderRadius: "var(--r-pill)",
              border: "none",
              cursor: "pointer",
              fontSize: 13.5,
              fontWeight: 600,
              transition: "background .15s ease, color .15s ease, box-shadow .15s ease",
              background: on ? "var(--surface-card)" : "transparent",
              color: on ? "var(--text-primary)" : "var(--text-secondary)",
              boxShadow: on ? "var(--shadow-card)" : "none",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
