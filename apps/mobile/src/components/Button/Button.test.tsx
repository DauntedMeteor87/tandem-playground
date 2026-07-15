// Snapshot every Button variant. No navigation/reanimated imports — runs on the
// plain jest-expo preset.
import React from "react";
import { render } from "@testing-library/react-native";
import { Button, type ButtonVariant } from "./Button";

const VARIANTS: ButtonVariant[] = ["primary", "ghost", "subtle", "accent", "apple"];

describe("Button", () => {
  for (const variant of VARIANTS) {
    it(`renders the ${variant} variant`, () => {
      const { toJSON } = render(
        <Button variant={variant} onPress={() => {}}>
          {variant}
        </Button>,
      );
      expect(toJSON()).toMatchSnapshot();
    });
  }

  it("renders disabled", () => {
    const { toJSON } = render(
      <Button variant="primary" disabled>
        Disabled
      </Button>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
