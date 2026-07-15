// PermitsStep: the source picker swaps in that source's numbered instructions,
// the "no permit needed" answer shows the designed empty state, and picking a
// card dispatches the new source.
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  PERMIT_SOURCES,
  freshAdventure,
  type Adventure,
  type PermitSourceKey,
} from "@/lib/data";
import { PermitsStep } from "./PermitsStep";

function withPermit(source: "" | PermitSourceKey, needed = true): Adventure {
  return {
    ...freshAdventure(),
    permit: { needed, source, link: "", notes: "" },
  };
}

describe("PermitsStep", () => {
  it("switches instruction lists when the source changes", () => {
    const { rerender } = render(
      <PermitsStep adv={withPermit("recgov")} dispatch={vi.fn()} />,
    );
    expect(
      screen.getByText(PERMIT_SOURCES.recgov.steps[0]),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(PERMIT_SOURCES.state.steps[0]),
    ).not.toBeInTheDocument();

    rerender(<PermitsStep adv={withPermit("state")} dispatch={vi.fn()} />);
    expect(screen.getByText(PERMIT_SOURCES.state.steps[0])).toBeInTheDocument();
    expect(
      screen.queryByText(PERMIT_SOURCES.recgov.steps[0]),
    ).not.toBeInTheDocument();
  });

  it("dispatches the picked source", () => {
    const dispatch = vi.fn();
    render(<PermitsStep adv={withPermit("recgov")} dispatch={dispatch} />);

    fireEvent.click(screen.getByText("State park").closest("button")!);

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_ADV",
      adv: expect.objectContaining({
        permit: expect.objectContaining({ source: "state" }),
      }),
    });
  });

  it("renders the 'no permit needed' empty state", () => {
    render(<PermitsStep adv={withPermit("", false)} dispatch={vi.fn()} />);
    expect(screen.getByText(/Nothing to fill in here/)).toBeInTheDocument();
    // The source picker is hidden in this state.
    expect(screen.queryByText("Recreation.gov")).not.toBeInTheDocument();
  });
});
