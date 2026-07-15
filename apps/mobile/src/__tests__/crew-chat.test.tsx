// A brand-new crew (just drafted, no messages yet) lands on the "say hi first" empty
// state — no ✓/✕ card, and the composer is the only way out. Router + route params
// are mocked (no navigation container in unit tests).
import React from "react";
import { render } from "@testing-library/react-native";

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: () => {}, back: () => {}, replace: () => {} }),
  // A freshly-drafted crew: not in the demo data, no seeded messages, nothing published.
  useLocalSearchParams: () => ({ id: "draft", crewName: "Sunset Crew" }),
}));

import CrewChatScreen from "../app/crew/[id]/chat";

describe("CrewChatScreen — brand-new crew", () => {
  it("shows the say-hi empty state and the composer, with no must-answer card", () => {
    const { getByText, queryByText, getByPlaceholderText } = render(<CrewChatScreen />);
    expect(getByText("Say hi — someone has to go first.")).toBeTruthy();
    expect(getByPlaceholderText("Message Sunset Crew…")).toBeTruthy();
    // No trip was published into this chat → no ✓/✕ prompt.
    expect(queryByText("I'm in")).toBeNull();
  });
});
