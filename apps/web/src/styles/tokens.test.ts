import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Read the actual token stylesheet and assert every locked §2 value is
// present, exactly as written in the migration doc. If the palette drifts,
// this fails. (vitest runs with the package dir as cwd.)
const css = readFileSync(
  join(process.cwd(), "src/styles/tokens.css"),
  "utf8",
);

const PALETTE_HEXES = [
  "#05332B", // pine
  "#1B564B", // teal
  "#F24E00", // ember
  "#F2B23C", // amber
  "#8BC97F", // leaf
  "#F0EFEE", // canvas
  "#FFFFFF", // paper
  "#5E6F68", // muted
];

const STATUS_HEXES = [
  "#EAF3E4", // success bg
  "#FDF3E1", // warning bg
  "#C7361B", // error
  "#FBEAE2", // error bg
  "#E9F1EF", // info bg
];

describe("tokens.css", () => {
  it.each([...PALETTE_HEXES, ...STATUS_HEXES])(
    "defines the locked §2 value %s",
    (hex) => {
      expect(css).toContain(hex);
    },
  );

  it("exposes the pine-tinted shadow (never pure black)", () => {
    expect(css).toContain("rgba(5, 51, 43, 0.55)");
  });
});
