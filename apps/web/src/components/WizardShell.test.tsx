import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WizardShell, type WizardStep } from "./WizardShell";

const steps: WizardStep[] = [
  { id: "basics", label: "Basics" },
  { id: "writeup", label: "Write-up" },
  { id: "itinerary", label: "Itinerary" },
];

describe("WizardShell", () => {
  it("matches the snapshot at a middle step (one done, one current, one ahead)", () => {
    const { container } = render(
      <WizardShell
        title="Sykes Hot Springs Overnight"
        subtitle="Fill in the details, then publish."
        steps={steps}
        currentStepId="writeup"
      >
        <p>Step body</p>
      </WizardShell>,
    );
    expect(container).toMatchSnapshot();
  });
});
