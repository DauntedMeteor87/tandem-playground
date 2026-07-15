import React from "react";
import { PhotoFrame } from "./PhotoFrame.jsx";
import { Tag } from "../core/Tag.jsx";
import { AvatarStack } from "../core/Avatar.jsx";

/**
 * TripCard — the core discovery unit: a photo, title, club line, and
 * the crew going. Used in horizontal shelves and 2-up grids.
 */
export function TripCard({ trip = {}, width = 260, grid = false, style, ...rest }) {
  const { title, club, kind, when, cost, photo, going = [], goingN } = trip;
  return (
    <button
      style={{
        width: grid ? "100%" : width,
        flex: grid ? undefined : "none",
        textAlign: "left",
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      <PhotoFrame src={photo} height={grid ? 120 : 150} />
      <div style={{ padding: "11px 12px 13px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {kind && <Tag tone={kind === "Adventure" ? "accent" : "action"}>{kind}</Tag>}
          {cost && <Tag>{cost}</Tag>}
        </div>
        <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text-primary)", lineHeight: 1.25 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          {going.length > 0 && <AvatarStack people={going} size={22} />}
          <span style={{ fontSize: 12.5, color: "var(--text-tertiary)" }}>
            {club}
            {when ? ` · ${when}` : ""}
          </span>
        </div>
      </div>
    </button>
  );
}
