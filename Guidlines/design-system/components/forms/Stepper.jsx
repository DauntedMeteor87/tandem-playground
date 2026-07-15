import React from "react";

/** Stepper — pill +/- counter (headcount, seats, budget items). */
export function Stepper({ value: valueProp, defaultValue = 0, min = 0, max = 99, onChange, style, ...rest }) {
  const [v, setV] = React.useState(defaultValue);
  const val = valueProp ?? v;
  const set = (n) => {
    const c = Math.max(min, Math.min(max, n));
    setV(c);
    onChange && onChange(c);
  };
  const btn = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        background: "var(--surface-sunk)",
        border: "1px solid var(--border-strong)",
        borderRadius: 999,
        padding: 3,
        ...style,
      }}
      {...rest}
    >
      <button style={btn} onClick={() => set(val - 1)}>−</button>
      <span style={{ minWidth: 40, textAlign: "center", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-ui)" }}>{val}</span>
      <button style={btn} onClick={() => set(val + 1)}>+</button>
    </div>
  );
}
