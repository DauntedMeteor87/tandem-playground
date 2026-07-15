// Every Koa pose in the pose→moment map must render by name (empty-states.md
// says the filenames are the contract), plus the voice line and optional CTA.
import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyState, type KoaPose } from "./EmptyState";

const POSES: KoaPose[] = [
  "empty-seat",
  "tea",
  "loading-leaves",
  "success-leaf",
  "error-twig",
  "note",
  "swipe",
  "peek-page",
];

describe("EmptyState", () => {
  it.each(POSES)("renders the %s pose asset", (pose) => {
    const { getByTestId } = render(<EmptyState pose={pose} line="A quiet week outside." />);
    expect(getByTestId(`koa-${pose}`)).toBeTruthy();
  });

  it("renders the voice line and sub-line", () => {
    const { getByText } = render(
      <EmptyState pose="tea" line="Nothing in the rearview yet." sub="Your first trip story writes itself soon." />,
    );
    expect(getByText("Nothing in the rearview yet.")).toBeTruthy();
    expect(getByText("Your first trip story writes itself soon.")).toBeTruthy();
  });

  it("renders a single CTA when given one", () => {
    const { getByText } = render(
      <EmptyState pose="empty-seat" line="You haven't joined a trip yet." cta={{ label: "See sign ups", onPress: () => {} }} />,
    );
    expect(getByText("See sign ups")).toBeTruthy();
  });
});
