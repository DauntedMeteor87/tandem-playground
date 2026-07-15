import React from "react";

/**
 * ListRow — a tappable row inside a Card/list: leading media, title,
 * subtitle, trailing chevron/control. Hairline divider between rows.
 */
export function ListRow({ leading, title, subtitle, trailing, last = false, style, ...rest }) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--s3)",
        textAlign: "left",
        width: "100%",
        padding: "13px var(--s4)",
        background: "transparent",
        border: "none",
        borderBottom: last ? "none" : "1px solid var(--border)",
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        ...style,
      }}
      {...rest}
    >
      {leading}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
          {title}
        </span>
        {subtitle != null && (
          <span style={{ display: "block", fontSize: 13, color: "var(--text-tertiary)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {subtitle}
          </span>
        )}
      </span>
      {trailing}
    </button>
  );
}
