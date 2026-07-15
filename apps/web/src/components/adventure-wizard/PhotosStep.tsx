// Source: Wireframe 0.2 — stepPhotos() in screens.js. Step 8 of 9: 1–6 shots.
// The wireframe modeled photos as a count; here the add tile is a real file
// input that previews picks via object URLs (count stays the source of truth
// the preview/home/manage screens read). Zero-photo state gets the designed
// dashed drop tile + nudge (empty-states.md #10).
"use client";

import { useEffect, useRef, useState } from "react";
import { clamp } from "@/lib/data";
import { IconImage, IconPlus } from "@/components/icons";
import { advPatch, type StepProps } from "./StepProps";

export function PhotosStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);
  // Object URLs for previews of picks made this session, indexed alongside the
  // photo count. Existing counts (from edit/clone) render as placeholder tiles.
  const [urls, setUrls] = useState<string[]>([]);
  const urlsRef = useRef<string[]>([]);
  urlsRef.current = urls;
  useEffect(
    () => () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u)),
    [],
  );

  function addPhotos(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
    if (!files.length) return;
    // TODO: backend seam — R2 presigned upload. Preview via object URLs for now.
    const room = Math.max(0, 6 - adv.photos);
    const take = files.slice(0, room);
    if (!take.length) return;
    setUrls((prev) => [...prev, ...take.map((f) => URL.createObjectURL(f))]);
    patch({ photos: clamp(adv.photos + take.length, 0, 6) });
  }

  function removePhoto(idx: number) {
    setUrls((prev) => {
      const next = [...prev];
      const [removed] = next.splice(idx, 1);
      if (removed) URL.revokeObjectURL(removed);
      return next;
    });
    patch({ photos: clamp(adv.photos - 1, 0, 6) });
  }

  return (
    <>
      <div className="wiz__eyebrow">Step 8 of 9</div>
      <h1 className="wiz__title">Photos</h1>
      <p className="wiz__hint">
        1–6 shots so people know what they&apos;re in for.
      </p>
      <div className="phgrid">
        {Array.from({ length: adv.photos }).map((_, idx) => (
          <button
            type="button"
            key={idx}
            className="ph"
            style={{ padding: 0, overflow: "hidden" }}
            onClick={() => removePhoto(idx)}
            aria-label={`Remove photo ${idx + 1}`}
          >
            {urls[idx] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urls[idx]}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <IconImage />
            )}
          </button>
        ))}
        {adv.photos < 6 ? (
          <label
            className="ph"
            style={
              adv.photos === 0
                ? { border: "1.5px dashed var(--tc-border-strong)", cursor: "pointer" }
                : { cursor: "pointer" }
            }
          >
            <IconPlus />
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              aria-label="Add photos"
              onChange={(e) => {
                addPhotos(e.target.files);
                e.currentTarget.value = "";
              }}
            />
          </label>
        ) : null}
      </div>
      {adv.photos === 0 ? (
        <p className="field-hint mt3">
          Trips with photos fill twice as fast. Add at least one.
        </p>
      ) : null}
    </>
  );
}
