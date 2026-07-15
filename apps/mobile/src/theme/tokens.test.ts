// Asserts every migration-doc §2 value lands in the theme exactly. If a brand
// hex, radius, or spacing step drifts, this fails loudly.
import { theme } from "./tokens";

describe("theme §2 palette", () => {
  it("carries the 8 locked brand colors exactly", () => {
    expect(theme.color).toEqual({
      pine: "#05332B",
      teal: "#1B564B",
      ember: "#F24E00",
      amber: "#F2B23C",
      leaf: "#8BC97F",
      canvas: "#F0EFEE",
      paper: "#FFFFFF",
      muted: "#5E6F68",
    });
  });

  it("keeps status pairs in-family with the §2 tints", () => {
    expect(theme.status.success).toEqual({ fg: "#8BC97F", bg: "#EAF3E4" });
    expect(theme.status.warning).toEqual({ fg: "#F2B23C", bg: "#FDF3E1" });
    expect(theme.status.error).toEqual({ fg: "#C7361B", bg: "#FBEAE2" });
    expect(theme.status.info).toEqual({ fg: "#1B564B", bg: "#E9F1EF" });
  });

  it("keeps status foregrounds tied to the named brand colors", () => {
    expect(theme.status.success.fg).toBe(theme.color.leaf);
    expect(theme.status.warning.fg).toBe(theme.color.amber);
    expect(theme.status.info.fg).toBe(theme.color.teal);
  });
});

describe("theme radii", () => {
  it("exposes the §2 radii 12 / 16 / 18 / pill", () => {
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

describe("theme spacing (Wireframe 0.4 4pt scale)", () => {
  it("matches app.css --s1…--s8 exactly", () => {
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
  it("uses a warm pine-tinted shadow, never pure black", () => {
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

  it("never sets ember as a body/text color", () => {
    // §2: ember is CTA/accent only, never body text.
    for (const preset of Object.values(theme.type)) {
      if ("color" in preset) {
        expect(preset.color).not.toBe(theme.color.ember);
      }
    }
  });
});

describe("mascot palette", () => {
  it("re-tints the body to ember per §2", () => {
    expect(theme.mascot.body).toBe(theme.color.ember);
    expect(theme.mascot.ink).toBe(theme.color.pine);
  });
});
