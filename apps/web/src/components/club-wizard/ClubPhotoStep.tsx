// Source: Wireframe 0.2 — clubStepPhoto() in studio.js. Step 5 of 6: one banner
// shot for the club page (stubbed as a placeholder tile you can add/remove).
"use client";

import { IconImage, IconPlus } from "@/components/icons";
import { ncPatch, type ClubStepProps } from "./ClubStepProps";

export function ClubPhotoStep({ nc, dispatch }: ClubStepProps) {
  const patch = ncPatch(nc, dispatch);

  return (
    <>
      <div className="wiz__eyebrow">Step 5 of 6</div>
      <h1 className="wiz__title">Club photo</h1>
      <p className="wiz__hint">
        One banner shot for the club page. You can swap it any time.
      </p>
      <div className="phgrid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
        {nc.photo ? (
          <button
            type="button"
            className="ph"
            style={{ height: 180 }}
            onClick={() => patch({ photo: 0 })}
            aria-label="Remove club photo"
          >
            <IconImage />
          </button>
        ) : (
          <button
            type="button"
            className="ph"
            style={{ height: 180 }}
            onClick={() => patch({ photo: 1 })}
            aria-label="Add club photo"
          >
            <IconPlus />
          </button>
        )}
      </div>
    </>
  );
}
