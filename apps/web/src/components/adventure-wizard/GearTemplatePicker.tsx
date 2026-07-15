// Source: Wireframe 0.2 — the template chiprow in stepGear() (screens.js).
// Picking a template resets the gear list to that template's items (a fresh
// copy so edits don't mutate the template).
"use client";

import { GEAR_TEMPLATES, type GearTemplateKey } from "@/lib/data";

export function GearTemplatePicker({
  selected,
  onSelect,
}: {
  selected: GearTemplateKey;
  onSelect: (key: GearTemplateKey) => void;
}) {
  return (
    <div className="chiprow">
      {(Object.entries(GEAR_TEMPLATES) as [GearTemplateKey, (typeof GEAR_TEMPLATES)[GearTemplateKey]][]).map(
        ([key, t]) => (
          <button
            type="button"
            key={key}
            className={`chip ${selected === key ? "on" : ""}`}
            onClick={() => onSelect(key)}
          >
            {t.label}
          </button>
        ),
      )}
    </div>
  );
}
