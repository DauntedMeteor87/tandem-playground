// Source: Wireframe 0.2 — publishSheetHtml() in screens.js. The publish overlay:
// pick the club/crew, then send the trip to the mobile app's Trip Signups.
// Empty-states.md #11: when the lead belongs to no club/crew, an inline line
// keeps it from being a dead end and the Publish button stays enabled (publish
// public). Extracted as its own component so the no-clubs case is unit-testable.
"use client";

import { EmptyBanner } from "@/components/EmptyBanner";
import type { Adventure, Club, Crew, VisType } from "@/lib/data";

export function PublishSheet({
  adv,
  clubs,
  crews,
  onSetVisType,
  onSetVisId,
  onPublish,
  onClose,
}: {
  adv: Adventure;
  clubs: Club[];
  crews: Crew[];
  onSetVisType: (t: VisType) => void;
  onSetVisId: (id: string) => void;
  onPublish: () => void;
  onClose: () => void;
}) {
  const visList = adv.visType === "club" ? clubs : crews;

  return (
    <div
      className="sheet-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Publish to Trip Signups">
        <div className="sheet__title">Publish to Trip Signups</div>
        <div className="sheet__sub">
          This sends &ldquo;{adv.name}&rdquo; straight to the mobile app&apos;s
          Trip Signups for the group you pick.
        </div>
        <div className="chiprow">
          <button
            type="button"
            className={`chip ${adv.visType === "club" ? "on" : ""}`}
            onClick={() => onSetVisType("club")}
          >
            Club
          </button>
          <button
            type="button"
            className={`chip ${adv.visType === "crew" ? "on" : ""}`}
            onClick={() => onSetVisType("crew")}
          >
            Crew
          </button>
        </div>
        {visList.length ? (
          <div className="chiprow mt3">
            {visList.map((v) => (
              <button
                type="button"
                key={v.id}
                className={`chip ${adv.visId === v.id ? "on" : ""}`}
                onClick={() => onSetVisId(v.id)}
              >
                {v.name}
              </button>
            ))}
          </div>
        ) : (
          <EmptyBanner className="mt3">
            No clubs or crews yet — you can still publish public, or create a
            club first.
          </EmptyBanner>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button
            type="button"
            className="btn btn--ghost"
            style={{ flex: 1 }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            style={{ flex: 1 }}
            onClick={onPublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
