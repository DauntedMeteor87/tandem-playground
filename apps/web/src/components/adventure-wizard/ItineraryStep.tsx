// Source: Wireframe 0.2 — stepItinerary() in screens.js. Step 3 of 9: the daily
// plan as editable time/what rows, add/remove at will.
"use client";

import { IconPlus, IconX } from "@/components/icons";
import { advPatch, type StepProps } from "./StepProps";

export function ItineraryStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);

  const setRow = (idx: number, key: "time" | "text", value: string) =>
    patch({
      itinerary: adv.itinerary.map((row, i) =>
        i === idx ? { ...row, [key]: value } : row,
      ),
    });

  return (
    <>
      <div className="wiz__eyebrow">Step 3 of 9</div>
      <h1 className="wiz__title">Itinerary</h1>
      <p className="wiz__hint">
        The actual daily plan — not just highlights. This is what members see
        first on the trip page.
      </p>
      <div className="list">
        {adv.itinerary.map((row, idx) => (
          <div className="itin-row" key={idx}>
            <div className="time">
              <input
                className="field"
                value={row.time}
                onChange={(e) => setRow(idx, "time", e.target.value)}
                placeholder="Sat 9:00 AM"
                aria-label={`Itinerary step ${idx + 1} time`}
              />
            </div>
            <div className="desc">
              <input
                className="field"
                value={row.text}
                onChange={(e) => setRow(idx, "text", e.target.value)}
                placeholder="What's happening"
                aria-label={`Itinerary step ${idx + 1} description`}
              />
            </div>
            <button
              type="button"
              className="rowbtn"
              onClick={() =>
                patch({ itinerary: adv.itinerary.filter((_, i) => i !== idx) })
              }
              aria-label={`Remove itinerary step ${idx + 1}`}
            >
              <IconX />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="addrow"
          onClick={() =>
            patch({ itinerary: [...adv.itinerary, { time: "", text: "" }] })
          }
        >
          <IconPlus /> Add a step
        </button>
      </div>
    </>
  );
}
