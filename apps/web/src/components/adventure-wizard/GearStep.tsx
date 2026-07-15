// Source: Wireframe 0.2 — stepGear() in screens.js. Step 6 of 9: start from a
// template, then edit freely — rename items, flip required/optional, add/remove.
"use client";

import { GEAR_TEMPLATES, type GearTemplateKey } from "@/lib/data";
import { IconPlus, IconX } from "@/components/icons";
import { advPatch, type StepProps } from "./StepProps";
import { GearTemplatePicker } from "./GearTemplatePicker";

export function GearStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);

  return (
    <>
      <div className="wiz__eyebrow">Step 6 of 9</div>
      <h1 className="wiz__title">Gear list</h1>
      <p className="wiz__hint">
        Start from a template, then adjust. This is what shows in the Details
        panel on the trip page.
      </p>
      <GearTemplatePicker
        selected={adv.gearTemplate}
        onSelect={(key: GearTemplateKey) =>
          patch({
            gearTemplate: key,
            gear: GEAR_TEMPLATES[key].items.map((i) => ({ ...i })),
          })
        }
      />
      <div className="list mt4">
        {adv.gear.map((g, idx) => (
          <div className="check" key={idx}>
            <input
              className="field"
              style={{ border: "none", background: "none", padding: 0, flex: 1 }}
              value={g.name}
              onChange={(e) =>
                patch({
                  gear: adv.gear.map((item, i) =>
                    i === idx ? { ...item, name: e.target.value } : item,
                  ),
                })
              }
              aria-label={`Gear item ${idx + 1} name`}
            />
            <button
              type="button"
              className="chip small"
              style={{ padding: "5px 10px", fontSize: "11.5px" }}
              onClick={() =>
                patch({
                  gear: adv.gear.map((item, i) =>
                    i === idx ? { ...item, required: !item.required } : item,
                  ),
                })
              }
            >
              {g.required ? "Required" : "Optional"}
            </button>
            <button
              type="button"
              className="rowbtn"
              onClick={() =>
                patch({ gear: adv.gear.filter((_, i) => i !== idx) })
              }
              aria-label={`Remove gear item ${idx + 1}`}
            >
              <IconX />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="addrow"
          onClick={() =>
            patch({ gear: [...adv.gear, { name: "New item", required: false }] })
          }
        >
          <IconPlus /> Add an item
        </button>
      </div>
    </>
  );
}
