import React from "react";

/** Toggle switch — fills sunset-coral when on. */
export function Toggle({ on: onProp, defaultOn = false, onChange, style, ...rest }) {
  const [on, setOn] = React.useState(defaultOn);
  const val = onProp ?? on;
  return (
    <button
      role="switch"
      aria-checked={val}
      onClick={() => {
        setOn(!val);
        onChange && onChange(!val);
      }}
      style={{
        width: 46,
        height: 28,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        position: "relative",
        flex: "none",
        transition: "background .18s ease",
        background: val ? "var(--action)" : "var(--border-strong)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "var(--shadow-card)",
          transition: "transform .18s ease",
          transform: val ? "translateX(18px)" : "none",
        }}
      />
    </button>
  );
}
