// PinnedTripCard's two interaction states: the expanded must-answer card (✓/✕ shown,
// before the member responds) and the collapsed slim tile (after they answer).
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PinnedTripCard } from "./PinnedTripCard";

const TRIP = { title: "Bishop Peak Sunset Hike", when: "Thu · 5:30 PM", place: "San Luis Obispo" };

describe("PinnedTripCard", () => {
  it("expanded (unanswered): shows the just-published tag and both ✓/✕ actions", () => {
    const { getByText } = render(
      <PinnedTripCard trip={TRIP} crewName="Moonlight Crew" response={null} onRespond={() => {}} />,
    );
    expect(getByText(/Just published to Moonlight Crew/)).toBeTruthy();
    expect(getByText("I'm in")).toBeTruthy();
    expect(getByText("Can't make it")).toBeTruthy();
  });

  it("answering fires onRespond with the going flag", () => {
    const onRespond = jest.fn();
    const { getByText } = render(
      <PinnedTripCard trip={TRIP} crewName="Moonlight Crew" response={null} onRespond={onRespond} />,
    );
    fireEvent.press(getByText("I'm in"));
    expect(onRespond).toHaveBeenCalledWith(true);
  });

  it("collapsed (yes): shows the Going tile and drops the ✓/✕ actions", () => {
    const { getByText, queryByText } = render(
      <PinnedTripCard trip={TRIP} crewName="Moonlight Crew" response="yes" onRespond={() => {}} />,
    );
    expect(getByText("Going")).toBeTruthy();
    expect(getByText(/you're going/)).toBeTruthy();
    expect(queryByText("I'm in")).toBeNull();
    expect(queryByText("Can't make it")).toBeNull();
  });

  it("collapsed (no): shows the Passed tile", () => {
    const { getByText, queryByText } = render(
      <PinnedTripCard trip={TRIP} crewName="Moonlight Crew" response="no" onRespond={() => {}} />,
    );
    expect(getByText("Passed")).toBeTruthy();
    expect(getByText(/you passed/)).toBeTruthy();
    expect(queryByText("I'm in")).toBeNull();
  });
});
