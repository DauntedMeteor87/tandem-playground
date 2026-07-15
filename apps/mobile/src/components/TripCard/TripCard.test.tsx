// Snapshot both TripCard display modes (shelf + grid) plus the ✓/✕ respond
// affordance. No navigation/reanimated imports.
import React from "react";
import { render } from "@testing-library/react-native";
import { TripCard, type TripCardTrip } from "./TripCard";

const TRIP: TripCardTrip = {
  title: "Sykes Hot Springs Overnight",
  kind: "Adventure",
  cost: "$18",
  when: "Sat–Sun · Mar 8",
  club: "Field Studies",
  going: ["Maya P.", "Jordan R.", "Alex L."],
  goingN: 8,
  mutuals: 2,
};

describe("TripCard", () => {
  it("renders the shelf mode", () => {
    const { toJSON } = render(<TripCard trip={TRIP} mode="shelf" onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the grid mode", () => {
    const { toJSON } = render(<TripCard trip={TRIP} mode="grid" onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the ✓/✕ respond affordance", () => {
    const { toJSON } = render(<TripCard trip={TRIP} mode="grid" onRespond={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
