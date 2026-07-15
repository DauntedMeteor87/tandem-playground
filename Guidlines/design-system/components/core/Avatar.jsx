import React from "react";

/**
 * Avatar — round profile image or initials fallback with a warm
 * gradient. Use AvatarStack for overlapping "who's going" groups.
 */
export function Avatar({ src, name = "", size = 40, style, ...rest }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "var(--r-pill)",
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "var(--font-ui)",
        fontWeight: 700,
        fontSize: size * 0.36,
        color: "#fff",
        background: "linear-gradient(135deg, var(--sun-400), var(--clay-500))",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials
      )}
    </span>
  );
}

export function AvatarStack({ people = [], size = 34, max = 4 }) {
  const shown = people.slice(0, max);
  return (
    <span style={{ display: "inline-flex" }}>
      {shown.map((p, i) => (
        <Avatar
          key={i}
          {...(typeof p === "string" ? { name: p } : p)}
          size={size}
          style={{ marginLeft: i === 0 ? 0 : -10, border: "2px solid var(--surface-card)" }}
        />
      ))}
    </span>
  );
}
