import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Read the actual token stylesheet and assert every Golden Hour brief value is
// present, exactly as mirrored from the design system's tokens/colors.css. If
// the palette drifts, this fails. (vitest runs with the package dir as cwd.)
const css = readFileSync(
  join(process.cwd(), "src/styles/tokens.css"),
  "utf8",
);

const PALETTE_HEXES = [
  "#2a231b", // pine → ink-900 warm near-black
  "#6f5f96", // teal → dusk violet accent
  "#e0703a", // ember → sunset coral action
  "#ef9459", // amber → glow
  "#7f9a5e", // leaf → meadow
  "#faf6f0", // canvas → sunlit cream
  "#ffffff", // paper
  "#6a5d4d", // muted → ink-700
];

const STATUS_HEXES = [
  "#edf1e1", // success bg
  "#fbeedf", // warning bg
  "#c1503f", // error (danger)
  "#f8e8e2", // error bg
  "#e9f1f4", // info bg
  "#5b93a8", // info (sky)
];

describe("tokens.css", () => {
  it.each([...PALETTE_HEXES, ...STATUS_HEXES])(
    "defines the Golden Hour value %s",
    (hex) => {
      expect(css).toContain(hex);
    },
  );

  it("exposes the warm brown-tinted shadow (never pure black)", () => {
    expect(css).toContain("rgba(42, 35, 27, 0.55)");
  });

  it("keeps no cold pure-grey ramp values", () => {
    expect(css).not.toContain("#F0EFEE"); // the old grey-adjacent canvas
    expect(css).not.toContain("#05332B"); // the old pine green
  });
});
