// Renders the ob-experience body: all eight activities present, and a rating
// adjustment fires onChange. Component-only — no navigation/reanimated imports.
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ExperienceRatings, EXPERIENCE, formatRating } from "./ExperienceRatings";

describe("ExperienceRatings", () => {
  it("lists all eight fixed activities in wireframe order", () => {
    expect(EXPERIENCE).toEqual([
      "Surfing",
      "Day hikes",
      "Crafts",
      "Biking",
      "Thrifting",
      "Camping",
      "Backpacking",
      "Mountaineering",
    ]);
    const { getByText } = render(<ExperienceRatings values={{}} onChange={() => {}} />);
    for (const name of EXPERIENCE) {
      expect(getByText(name)).toBeTruthy();
    }
  });

  it("bumps a rating — the first activity's increase fires onChange(name, 1)", () => {
    const onChange = jest.fn();
    const { getAllByLabelText } = render(<ExperienceRatings values={{}} onChange={onChange} />);
    const increases = getAllByLabelText("increase");
    expect(increases).toHaveLength(EXPERIENCE.length);
    fireEvent.press(increases[0]);
    expect(onChange).toHaveBeenCalledWith("Surfing", 1);
  });

  it("decrease is clamped at zero (Stepper min)", () => {
    const onChange = jest.fn();
    const { getAllByLabelText } = render(<ExperienceRatings values={{}} onChange={onChange} />);
    fireEvent.press(getAllByLabelText("decrease")[0]);
    expect(onChange).toHaveBeenCalledWith("Surfing", 0);
  });

  it("formatRating renders —, N×, and 5+", () => {
    expect(formatRating(0)).toBe("—");
    expect(formatRating(3)).toBe("3×");
    expect(formatRating(5)).toBe("5+");
  });
});
