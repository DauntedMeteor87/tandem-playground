// Shared plumbing for the six Create-a-Club steps — the club-wizard analog of
// the Adventure wizard's StepProps. Each step is a pure view over the active
// club draft (`nc`) that dispatches a single SET_NC with the next immutable
// draft, mirroring the wireframe where every screen mutated the global NC.
import type { Dispatch } from "react";
import type { ClubDraft } from "@/lib/data";
import type { StudioAction } from "@/lib/studio-state";

export interface ClubStepProps {
  nc: ClubDraft;
  dispatch: Dispatch<StudioAction>;
}

/** Shallow-merge patcher: `patch({ name })` replaces the draft with a copy
 *  carrying the change. Lists (officers) are rebuilt by the caller. */
export function ncPatch(nc: ClubDraft, dispatch: Dispatch<StudioAction>) {
  return (patch: Partial<ClubDraft>) =>
    dispatch({ type: "SET_NC", nc: { ...nc, ...patch } });
}
