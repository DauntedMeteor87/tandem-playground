// Shared plumbing for the nine Adventure-wizard steps. Each step is a pure,
// presentational view over the active draft (`adv`) that dispatches a single
// SET_ADV with the next immutable draft — mirroring the wireframe, where every
// screen's actions mutated the global ADV. Keeping steps prop-driven (not
// context-bound) makes them trivial to unit-test with a crafted adv.
import type { Dispatch } from "react";
import type { Adventure, Budget } from "@/lib/data";
import type { StudioAction } from "@/lib/studio-state";

export interface StepProps {
  adv: Adventure;
  dispatch: Dispatch<StudioAction>;
}

/** A shallow-merge patcher: `patch({ name })` replaces the draft with a copy
 *  carrying the change. Nested objects are spread by the caller. */
export function advPatch(adv: Adventure, dispatch: Dispatch<StudioAction>) {
  return (patch: Partial<Adventure>) =>
    dispatch({ type: "SET_ADV", adv: { ...adv, ...patch } });
}

/** Budget lives one level down; this patches just the budget sub-object. */
export function budgetPatch(adv: Adventure, dispatch: Dispatch<StudioAction>) {
  return (patch: Partial<Budget>) =>
    dispatch({
      type: "SET_ADV",
      adv: { ...adv, budget: { ...adv.budget, ...patch } },
    });
}
