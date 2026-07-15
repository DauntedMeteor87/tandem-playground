// BudgetStep math: the ported per-person formula (gas carpool split + evenly
// split group costs + insurance) shows the right figure, and dragging a dial
// dispatches the updated draft.
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { budgetTotal, freshAdventure, type Adventure } from "@/lib/data";
import { BudgetStep } from "./BudgetStep";

// distance 200 · cars 2 · cap 10 → gas round(200*2*0.30/10)=12; campsite
// round(100/10)=10; insurance 5 → $27/person, $270 for the trip.
function crafted(): Adventure {
  const base = freshAdventure();
  return {
    ...base,
    capacity: 10,
    cars: 2,
    budget: { ...base.budget, distance: 200, campsiteTotal: 100 },
  };
}

describe("BudgetStep", () => {
  it("shows the per-person total the formula computes", () => {
    const adv = crafted();
    expect(budgetTotal(adv)).toBe(27);

    const { container } = render(<BudgetStep adv={adv} dispatch={vi.fn()} />);
    expect(container.querySelector(".budget-total .v")?.textContent).toBe("$27");
    // Trip total = per-person × capacity.
    expect(screen.getByText("$270")).toBeInTheDocument();
  });

  it("dispatches the new draft when a dial moves", () => {
    const dispatch = vi.fn();
    render(<BudgetStep adv={crafted()} dispatch={dispatch} />);

    fireEvent.change(screen.getByLabelText("Distance (round trip, mi)"), {
      target: { value: "150" },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_ADV",
      adv: expect.objectContaining({
        budget: expect.objectContaining({ distance: 150 }),
      }),
    });
  });
});
