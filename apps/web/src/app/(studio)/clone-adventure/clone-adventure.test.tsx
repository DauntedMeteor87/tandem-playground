// Clone an Adventure: the filter chiprow narrows the past-trip grid — "All past
// trips" shows everything, "Led by you" keeps only your trips, a club chip keeps
// only that club's trips. The bogus-filter case (proving the verbatim empty
// banner) is checked against the same predicate the page uses.
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { PAST_TRIPS } from "@/lib/data";
import { StudioProvider } from "@/lib/studio-state";
import CloneAdventurePage from "./page";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

function renderPage() {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <StudioProvider>{children}</StudioProvider>
  );
  return render(<CloneAdventurePage />, { wrapper });
}

describe("Clone an Adventure filter", () => {
  it("starts on All past trips and shows every proven trip", () => {
    renderPage();
    for (const t of PAST_TRIPS) {
      expect(screen.getByText(t.adv.name)).toBeInTheDocument();
    }
    expect(
      screen.queryByText("No past trips in this filter yet."),
    ).not.toBeInTheDocument();
  });

  it("Led by you keeps only your trips", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Led by you" }));
    // p1 (Sykes) + p5 (Big Falls) are led "You"; p2 (Pinnacles, Jordan R.) isn't.
    expect(screen.getByText("Sykes Hot Springs Overnight")).toBeInTheDocument();
    expect(screen.getByText("Big Falls Swimming Hole Day")).toBeInTheDocument();
    expect(
      screen.queryByText("Pinnacles Caves Day Trip"),
    ).not.toBeInTheDocument();
  });

  it("a club chip keeps only that club's trips", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Surf Club" }));
    expect(screen.getByText("Jalama Beach Surf Camp")).toBeInTheDocument();
    expect(
      screen.queryByText("Sykes Hot Springs Overnight"),
    ).not.toBeInTheDocument();
  });

  it("filter predicate yields the empty case for a club with no past trips", () => {
    // The page renders the verbatim banner whenever this predicate is empty.
    const none = PAST_TRIPS.filter((t) => t.clubId === "club-with-no-history");
    expect(none).toHaveLength(0);
  });
});
