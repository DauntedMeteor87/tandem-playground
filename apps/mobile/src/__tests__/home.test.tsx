// Home renders the "Sign ups for you" shelf and the "This week" 2-up grid straight
// from the demo-data module — the same trip appears in both, proving each section
// pulled real data. Router is mocked (no navigation container in unit tests).
import React from "react";
import { render } from "@testing-library/react-native";

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: () => {}, back: () => {}, replace: () => {} }),
}));

import HomeScreen from "../app/(tabs)/home";

describe("HomeScreen", () => {
  it("renders the section headers and See more link", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Sign ups for you")).toBeTruthy();
    expect(getByText("See more sign ups")).toBeTruthy();
    expect(getByText("This week")).toBeTruthy();
    expect(getByText("Archives")).toBeTruthy();
  });

  it("renders a trip in both the shelf and the this-week grid from demo data", () => {
    const { getAllByText } = render(<HomeScreen />);
    // bishop is in the sign-ups shelf (all trips) and the this-week grid.
    expect(getAllByText("Bishop Peak Sunset Hike").length).toBe(2);
    expect(getAllByText("Sykes Hot Springs Overnight").length).toBe(2);
  });
});
