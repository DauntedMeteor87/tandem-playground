import React from "react";

/**
 * Sheet — bottom sheet / action drawer. Renders an overlay + a rounded
 * top panel with a grip. `open` controls visibility.
 */
export function Sheet({ open = true, title, onClose, children, style, ...rest }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(40,28,15,.42)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "var(--surface-card)",
          borderRadius: "var(--r-xl) var(--r-xl) 0 0",
          padding: "10px var(--s4) calc(var(--s4) + env(safe-area-inset-bottom,0))",
          boxShadow: "var(--shadow-sheet)",
          maxHeight: "88%",
          overflowY: "auto",
          fontFamily: "var(--font-ui)",
          ...style,
        }}
        {...rest}
      >
        <div style={{ width: 38, height: 5, borderRadius: 3, background: "var(--border-strong)", margin: "4px auto 14px" }} />
        {title && <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: 8 }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}
