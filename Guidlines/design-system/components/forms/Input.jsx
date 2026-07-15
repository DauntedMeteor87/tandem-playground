import React from "react";

/**
 * Input — text field / textarea with an optional label and char count.
 * Warm surface, calm border that deepens on focus.
 */
export function Input({ label, multiline = false, maxLength, value, onChange, style, ...rest }) {
  const [val, setVal] = React.useState(value ?? "");
  const v = value ?? val;
  const Comp = multiline ? "textarea" : "input";
  return (
    <label style={{ display: "block", fontFamily: "var(--font-ui)" }}>
      {label && (
        <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8 }}>
          {label}
        </span>
      )}
      <Comp
        value={v}
        maxLength={maxLength}
        onChange={(e) => {
          setVal(e.target.value);
          onChange && onChange(e);
        }}
        style={{
          width: "100%",
          padding: "15px 16px",
          borderRadius: "var(--r-md)",
          border: "1px solid var(--border-strong)",
          background: "var(--surface-card)",
          color: "var(--text-primary)",
          fontFamily: "inherit",
          fontSize: 16,
          outline: "none",
          resize: multiline ? "none" : undefined,
          minHeight: multiline ? 120 : undefined,
          transition: "border-color .15s ease, box-shadow .15s ease",
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--action)";
          e.target.style.boxShadow = "0 0 0 3px var(--focus-ring)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border-strong)";
          e.target.style.boxShadow = "none";
        }}
        {...rest}
      />
      {maxLength != null && (
        <span style={{ display: "block", textAlign: "right", fontSize: 11.5, fontWeight: 600, color: "var(--text-tertiary)", marginTop: 6 }}>
          {v.length}/{maxLength}
        </span>
      )}
    </label>
  );
}
