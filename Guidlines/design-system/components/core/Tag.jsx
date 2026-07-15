import React from "react";

/**
 * Tag — a small static metadata label (difficulty, cost, activity type).
 * Non-interactive by default; smaller than a Chip.
 */
export function Tag({ tone = "neutral", leadingIcon, children, style, ...rest }) {
  const tones = {
    neutral: { background: "var(--surface-sunk)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    action: { background: "var(--action-soft)", color: "var(--action-hover)", border: "1px solid transparent" },
    accent: { background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid transparent" },
    success: { background: "color-mix(in oklch, var(--success) 18%, white)", color: "var(--success)", border: "1px solid transparent" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 6,
        fontFamily: "var(--font-ui)",
        fontSize: 11,
        fontWeight: 600,
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
    </span>
  );
}
