// Asserts every Golden Hour brief value lands in the theme exactly (mirrored
// from Guidlines/design-system/tokens/colors.css). If a brand hex, radius, or
// spacing step drifts, this fails loudly.
import { theme } from "./tokens";

describe("theme Golden Hour palette", () => {
  it("carries the 8 brand tokens exactly", () => {
    expect(theme.color).toEqual({
      pine: "#2A231B", // ink-900 — warm near-black text
      teal: "#6F5F96", // dusk-500 — violet accent
      ember: "#E0703A", // sun-500 — sunset coral action
      amber: "#EF9459", // sun-400 — amber glow
      leaf: "#7F9A5E", // meadow-500 — success
      canvas: "#FAF6F0", // warm-50 — sunlit cream
      paper: "#FFFFFF",
      muted: "#6A5D4D", // ink-700 — secondary text
    });
  });

  it("keeps status pairs on warm tints with the brief's semantic hues", () => {
    expect(theme.status.success).toEqual({ fg: "#7F9A5E", bg: "#EDF1E1" });
    expect(theme.status.warning).toEqual({ fg: "#C9802E", bg: "#FBEEDF" });
    expect(theme.status.error).toEqual({ fg: "#C1503F", bg: "#F8E8E2" });
    expect(theme.status.info).toEqual({ fg: "#5B93A8", bg: "#E9F1F4" });
  });

  it("keeps success tied to the named brand color", () => {
    expect(theme.status.success.fg).toBe(theme.color.leaf);
  });
});

describe("theme radii", () => {
  it("exposes the locked radii 12 / 16 / 18 / pill", () => {
    expect(theme.radius.md).toBe(12);
    expect(theme.radius.card).toBe(16);
    expect(theme.radius.lg).toBe(18);
    expect(theme.radius.pill).toBe(999);
  });

  it("carries the wireframe sm/xl radii for fidelity", () => {
    expect(theme.radius.sm).toBe(8);
    expect(theme.radius.xl).toBe(24);
  });
});

describe("theme spacing (4pt scale)", () => {
  it("matches the 4→40 scale exactly", () => {
    expect(theme.spacing).toEqual({
      s1: 4,
      s2: 8,
      s3: 12,
      s4: 16,
      s5: 20,
      s6: 24,
      s7: 32,
      s8: 40,
    });
  });
});

describe("theme shadow", () => {
  it("uses a warm brown-tinted shadow, never pure black", () => {
    expect(theme.shadow.card.shadowColor).toBe(theme.color.pine);
    expect(theme.shadow.soft.shadowColor).toBe(theme.color.pine);
    expect(theme.shadow.sheet.shadowColor).toBe(theme.color.pine);
    // android parity
    expect(theme.shadow.card.elevation).toBeGreaterThan(0);
  });
});

describe("theme type", () => {
  it("maps Spectral to display/headings and Hanken Grotesk to UI/body", () => {
    expect(theme.fontFamily.displaySemiBold).toBe("Spectral_600SemiBold");
    expect(theme.fontFamily.body).toBe("HankenGrotesk_400Regular");
    expect(theme.type.display.fontFamily).toBe("Spectral_600SemiBold");
    expect(theme.type.body.fontFamily).toBe("HankenGrotesk_400Regular");
  });

  it("never sets ember (coral) as a body/text color", () => {
    // The brief: coral is the one action color, never body text.
    for (const preset of Object.values(theme.type)) {
      if ("color" in preset) {
        expect(preset.color).not.toBe(theme.color.ember);
      }
    }
  });
});

describe("mascot palette", () => {
  it("tints Koa in the brief's earth/mascot rust (clay-500)", () => {
    expect(theme.mascot.body).toBe("#B5622F");
    expect(theme.mascot.ink).toBe("#3A2A1C");
  });
});
