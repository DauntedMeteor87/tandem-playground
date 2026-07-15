// Source: Wireframe 0.2 — the permit-source cards in stepPermits() (screens.js).
// Four guided sources from PERMIT_SOURCES; picking one selects it and reveals
// that source's numbered instruction list (rendered by PermitsStep).
"use client";

import { ICONS } from "@/components/icons";
import { PERMIT_SOURCES, type PermitSourceKey } from "@/lib/data";

export function PermitSourcePicker({
  selected,
  onSelect,
}: {
  selected: "" | PermitSourceKey;
  onSelect: (key: PermitSourceKey) => void;
}) {
  return (
    <>
      {(Object.entries(PERMIT_SOURCES) as [PermitSourceKey, (typeof PERMIT_SOURCES)[PermitSourceKey]][]).map(
        ([key, src]) => {
          const Icon = ICONS[src.icon];
          return (
            <button
              type="button"
              key={key}
              className={`permitcard ${selected === key ? "on" : ""}`}
              onClick={() => onSelect(key)}
            >
              <span className="permitcard__ic">
                <Icon />
              </span>
              <span>
                <span className="permitcard__t">{src.label}</span>
                <span className="permitcard__s">{src.sub}</span>
              </span>
            </button>
          );
        },
      )}
    </>
  );
}
