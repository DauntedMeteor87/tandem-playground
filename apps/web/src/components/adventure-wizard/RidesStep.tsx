// Source: Wireframe 0.2 — stepRides() in screens.js. Step 7 of 9: how many car
// seats and tent spots the lead is offering — members claim them after publish.
"use client";

import { clamp } from "@/lib/data";
import { IconCar, IconTent } from "@/components/icons";
import { advPatch, type StepProps } from "./StepProps";

export function RidesStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);

  return (
    <>
      <div className="wiz__eyebrow">Step 7 of 9</div>
      <h1 className="wiz__title">Rides &amp; tent</h1>
      <p className="wiz__hint">
        Set how many seats and tent spots you can offer — members claim them
        once this goes live.
      </p>
      <div className="list">
        <div className="row">
          <span className="row__body">
            <span className="row__title">
              <IconCar /> Cars expected
            </span>
          </span>
          <div className="row__actions">
            <button
              type="button"
              className="rowbtn"
              onClick={() => patch({ cars: clamp(adv.cars - 1, 0, 12) })}
              aria-label="One fewer car"
            >
              –
            </button>
            <span className="strong" style={{ width: 24, textAlign: "center" }}>
              {adv.cars}
            </span>
            <button
              type="button"
              className="rowbtn"
              onClick={() => patch({ cars: clamp(adv.cars + 1, 0, 12) })}
              aria-label="One more car"
            >
              +
            </button>
          </div>
        </div>
        <div className="row">
          <span className="row__body">
            <span className="row__title">
              <IconTent /> Tent spots
            </span>
          </span>
          <div className="row__actions">
            <button
              type="button"
              className="rowbtn"
              onClick={() =>
                patch({ tentSpots: clamp(adv.tentSpots - 1, 0, 20) })
              }
              aria-label="One fewer tent spot"
            >
              –
            </button>
            <span className="strong" style={{ width: 24, textAlign: "center" }}>
              {adv.tentSpots}
            </span>
            <button
              type="button"
              className="rowbtn"
              onClick={() =>
                patch({ tentSpots: clamp(adv.tentSpots + 1, 0, 20) })
              }
              aria-label="One more tent spot"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
