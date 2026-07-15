// The Create-a-Club state machine, exercised through the real StudioProvider
// reducer: start a fresh draft, edit it, walk all six steps, and create — adding
// one admin club whose starting roster is its named officers.
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { CLUB_STEPS } from "@/lib/data";
import { StudioProvider, useStudio } from "@/lib/studio-state";

const wrapper = ({ children }: { children: ReactNode }) => (
  <StudioProvider>{children}</StudioProvider>
);

describe("Create a Club flow", () => {
  it("walks basics → every step → create, adding one admin club", () => {
    const { result } = renderHook(() => useStudio(), { wrapper });
    const seeded = result.current.state.clubs.length;

    act(() => result.current.dispatch({ type: "START_CREATE_CLUB" }));
    expect(result.current.state.clubStep).toBe("basics");
    expect(result.current.state.clubCreated).toBe(false);
    expect(result.current.state.nc.name).toBe("");

    // Name it, then add a second officer so the roster carries over.
    act(() =>
      result.current.dispatch({
        type: "SET_NC",
        nc: {
          ...result.current.state.nc,
          name: "Trail Mix Club",
          officers: [
            ...result.current.state.nc.officers,
            { name: "Robin P.", role: "Trip lead" },
          ],
        },
      }),
    );

    for (let i = 1; i < CLUB_STEPS.length; i++) {
      act(() => result.current.dispatch({ type: "NEXT_CLUB_STEP" }));
      expect(result.current.state.clubStep).toBe(CLUB_STEPS[i]);
    }
    expect(result.current.state.clubStep).toBe("preview");

    act(() => result.current.dispatch({ type: "CREATE_CLUB" }));
    expect(result.current.state.clubCreated).toBe(true);
    expect(result.current.state.clubs.length).toBe(seeded + 1);

    const created = result.current.state.clubs[result.current.state.clubs.length - 1];
    expect(created.name).toBe("Trail Mix Club");
    expect(created.role).toBe("admin");
    expect(created.members.map((m) => m.name)).toEqual([
      "Maya (you)",
      "Robin P.",
    ]);
  });

  it("jumps to a visited step and resets cleanly for the next club", () => {
    const { result } = renderHook(() => useStudio(), { wrapper });

    act(() => result.current.dispatch({ type: "START_CREATE_CLUB" }));
    act(() => result.current.dispatch({ type: "GO_CLUB_STEP", step: "officers" }));
    expect(result.current.state.clubStep).toBe("officers");

    act(() => result.current.dispatch({ type: "CREATE_CLUB" }));
    expect(result.current.state.clubCreated).toBe(true);

    act(() => result.current.dispatch({ type: "RESET_CLUB_WIZARD" }));
    expect(result.current.state.clubCreated).toBe(false);
    expect(result.current.state.clubStep).toBe("basics");
    expect(result.current.state.nc.name).toBe("");
  });
});
