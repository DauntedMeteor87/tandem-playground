// The wizard's state machine, exercised through the real StudioProvider reducer:
// a fresh create walking all nine steps to publish, plus edit/clone prefill and
// the save-edits writeback. Complements the per-step render tests.
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { STEPS } from "@/lib/data";
import { StudioProvider, useStudio } from "@/lib/studio-state";

const wrapper = ({ children }: { children: ReactNode }) => (
  <StudioProvider>{children}</StudioProvider>
);

describe("Adventure wizard flow", () => {
  it("walks create → every step → publish, adding one live trip", () => {
    const { result } = renderHook(() => useStudio(), { wrapper });
    const seeded = result.current.state.publishedTrips.length;

    act(() => result.current.dispatch({ type: "START_CREATE" }));
    expect(result.current.state.step).toBe("basics");
    expect(result.current.state.editingId).toBeNull();
    expect(result.current.state.confirmed).toBe(false);

    for (let i = 1; i < STEPS.length; i++) {
      act(() => result.current.dispatch({ type: "NEXT_STEP" }));
      expect(result.current.state.step).toBe(STEPS[i]);
    }
    expect(result.current.state.step).toBe("preview");

    act(() => result.current.dispatch({ type: "SET_PUBLISH_OPEN", open: true }));
    expect(result.current.state.publishOpen).toBe(true);

    act(() => result.current.dispatch({ type: "PUBLISH" }));
    expect(result.current.state.confirmed).toBe(true);
    expect(result.current.state.publishOpen).toBe(false);
    expect(result.current.state.publishedTrips.length).toBe(seeded + 1);
    expect(result.current.state.publishedTrips[0].status).toBe("live");
    expect(result.current.state.publishedTrips[0].signups).toBe(0);
  });

  it("prefills from a published trip on edit and writes changes back", () => {
    const { result } = renderHook(() => useStudio(), { wrapper });
    const target = result.current.state.publishedTrips[0];

    act(() => result.current.dispatch({ type: "START_EDIT", tripId: target.id }));
    expect(result.current.state.editingId).toBe(target.id);
    expect(result.current.state.adv.name).toBe(target.adv.name);
    expect(result.current.state.step).toBe("basics");

    act(() =>
      result.current.dispatch({
        type: "SET_ADV",
        adv: { ...result.current.state.adv, name: "Renamed Trip" },
      }),
    );
    act(() => result.current.dispatch({ type: "SAVE_EDITS" }));

    expect(result.current.state.editingId).toBeNull();
    const saved = result.current.state.publishedTrips.find(
      (t) => t.id === target.id,
    );
    expect(saved?.adv.name).toBe("Renamed Trip");
  });

  it("prefills a clone and clears the dates + permit booking", () => {
    const { result } = renderHook(() => useStudio(), { wrapper });
    const source = result.current.state.publishedTrips[0].adv;

    act(() =>
      result.current.dispatch({
        type: "START_CLONE",
        adv: source,
        sourceName: source.name,
      }),
    );

    expect(result.current.state.cloneSource).toBe(source.name);
    expect(result.current.state.editingId).toBeNull();
    expect(result.current.state.adv.name).toBe(source.name);
    expect(result.current.state.adv.dateStart).toBe("");
    expect(result.current.state.adv.dateEnd).toBe("");
    expect(result.current.state.adv.permit.link).toBe("");
    // The seeded source is untouched (clone works on a deep copy).
    expect(source.dateStart).not.toBe("");
  });
});
