import React from "react";

/**
 * tandemclub Button — the primary tappable action.
 * Warm sunset-coral fill by default; ghost/subtle/apple variants
 * mirror the wireframe button set. Full-width by default (mobile).
 */
export function Button({
  variant = "primary",
  size = "md",
  full = true,
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: full ? "100%" : "auto",
    fontFamily: "var(--font-ui)",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    border: "1px solid transparent",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? "none" : "auto",
    transition: "transform .08s ease, background .15s ease, color .15s ease",
    borderRadius: size === "sm" ? "var(--r-pill)" : "var(--r-md)",
  };

  const sizes = {
    sm: { padding: "10px 16px", fontSize: 14 },
    md: { padding: "15px 18px", fontSize: 16 },
    lg: { padding: "17px 22px", fontSize: 17 },
  };

  const variants = {
    primary: { background: "var(--action)", color: "var(--text-on-action)" },
    ghost: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      borderColor: "var(--border-strong)",
    },
    subtle: {
      background: "var(--surface-raised)",
      color: "var(--text-primary)",
      borderColor: "var(--border)",
    },
    accent: { background: "var(--accent)", color: "#fff" },
    apple: { background: "#000", color: "#fff" },
  };

  return (
    <button
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
