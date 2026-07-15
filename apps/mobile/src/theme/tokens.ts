// Source: the 2026-07 "Bringing tandemclub to life" theme brief — the GOLDEN HOUR
// palette, mirrored 1:1 from Guidlines/design-system/tokens/colors.css (the design
// system's default mood). This file is the ONE place hex / radius / shadow
// literals are allowed to live — every component references `theme.color.pine`,
// `theme.radius.lg`, etc. A hardcoded hex anywhere else is a defect.
//
// The token NAMES are kept from the first (pre-brief) palette so no component
// changed — only the values did. Golden Hour mapping:
//   pine   → ink-900   warm near-black text (was deep pine green)
//   teal   → dusk-500  dusk violet accent (was teal green)
//   ember  → sun-500   sunset coral — the one action color
//   amber  → sun-400   amber glow highlight
//   leaf   → meadow    success / go
//   canvas → warm-50   sunlit cream app background
//   muted  → ink-700   warm secondary text

import type { TextStyle, ViewStyle } from "react-native";

/* ---------- Color — Golden Hour (design-system tokens/colors.css) ---------- */
export const color = {
  pine: "#2A231B", // ink-900: all body copy & headings — warm near-black, never #000
  teal: "#6F5F96", // dusk-500: violet accent — highlights & selected, never a second button
  ember: "#E0703A", // sun-500: sunset coral — THE action color, one per screen
  amber: "#EF9459", // sun-400: amber glow — sunlit highlight, warning
  leaf: "#7F9A5E", // meadow-500: nature, success, growth
  canvas: "#FAF6F0", // warm-50: app / page background — sunlit cream
  paper: "#FFFFFF", // warm-0: cards, raised surfaces
  muted: "#6A5D4D", // ink-700: secondary text (AA on canvas)
} as const;

/* ---------- Neutrals — the warm ramp (never pure grey) ----------
   Structural hairlines/tracks the wireframe relies on, taken from the design
   system's warm neutral ramp so borders read sunlit. They live here so no
   component carries a raw hex. */
export const neutral = {
  sunk: "#F4EDE2", // warm-100: raised / sunk track / subtle fill
  hairline: "#E3D6C3", // warm-200: hairline divider/border
  hairlineStrong: "#CDBCA4", // warm-300: input & dashed borders
  overlay: "rgba(42,35,27,0.42)", // sheet / modal scrim (ink-900 tinted)
  onDark: "rgba(255,248,240,0.75)", // muted text/icon on a dark (ink/coral) surface
  onDarkFill: "rgba(255,255,255,0.18)", // translucent-white pill/chip over a photo hero
  emberSoft: "#F7D4B6", // sun-200: soft peach wash — single-accent tag / highlight bg
  photo: "#E6DCCB", // photo-ph: warm painterly image placeholder fill
  photoInk: "#D3C4AD", // photo-ph2: placeholder glyph tint
  scrim: "rgba(42,35,27,0.55)", // hero/photo protection scrim under overlaid text
} as const;

/* ---------- Mascot illustration palette ----------
   Koa in the brief's warm rust — clay-500 is named "mascot / earth" in the
   design system. Face cream + warm ink from the original mascot art. */
export const mascot = {
  body: "#B5622F", // clay-500: the brief's earth/mascot rust
  face: "#F2E4D0", // warm cream face patch
  ink: "#3A2A1C", // warm dark brown (eyes / mouth)
  ground: "#E6DCCB", // soft warm ground shadow
  accent: color.amber, // amber glow (rocks, guitar, motion lines)
} as const;

/* ---------- Status pairs — Golden Hour semantics ----------
   Each pair is { fg, bg }: the semantic hue on its pale warm tint.
   fg hexes are the design system's --success / --info / --danger. */
export const status = {
  success: { fg: color.leaf, bg: "#EDF1E1" },
  warning: { fg: "#C9802E", bg: "#FBEEDF" }, // darker amber for legible warning text
  error: { fg: "#C1503F", bg: "#F8E8E2" }, // --danger
  info: { fg: "#5B93A8", bg: "#E9F1F4" }, // sky-500
} as const;

/* ---------- Radius — §2 lists 12 / 16 / 18 / pill.
   sm(8) and xl(24) are carried from the wireframe app.css for fidelity
   (bottom sheet uses 24; small dashed slots use 8). ---------- */
export const radius = {
  sm: 8, // wireframe --r-sm (seats, photo extras, copy-link button)
  md: 12, // §2 · wireframe --r-md (buttons, inputs)
  card: 16, // §2 (streak bar, activity when-card)
  lg: 18, // §2 · wireframe --r-lg (cards)
  xl: 24, // wireframe --r-xl (bottom sheet)
  pill: 999, // §2
} as const;

/* ---------- Spacing — measured verbatim from Wireframe 0.4 app.css (4pt scale)
   --s1:4 --s2:8 --s3:12 --s4:16 --s5:20 --s6:24 --s7:32 --s8:40 ---------- */
export const spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 32,
  s8: 40,
} as const;

/* ---------- Shadow — soft and warm-brown-tinted (sunlit), never pure black.
   shadowColor rides on `pine` (now ink-900 warm near-black), so every surface
   shadow reads brown. Mapped to RN shadow* + android elevation. ---------- */
export const shadow = {
  // The §2 signature soft warm shadow (raised surfaces: cards, sheets).
  card: {
    shadowColor: color.pine,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  } satisfies ViewStyle,
  // The wireframe's lighter --shadow-card for small tiles.
  soft: {
    shadowColor: color.pine,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  } satisfies ViewStyle,
  // Upward sheet shadow.
  sheet: {
    shadowColor: color.pine,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.16,
    shadowRadius: 30,
    elevation: 16,
  } satisfies ViewStyle,
} as const;

/* ---------- Font families — Spectral (serif, display/headings) +
   Hanken Grotesk (sans, UI/body). Names match @expo-google-fonts exports. ---------- */
export const fontFamily = {
  displayRegular: "Spectral_400Regular",
  displayMedium: "Spectral_500Medium",
  displaySemiBold: "Spectral_600SemiBold",
  displayItalic: "Spectral_400Regular_Italic",
  body: "HankenGrotesk_400Regular",
  medium: "HankenGrotesk_500Medium",
  semibold: "HankenGrotesk_600SemiBold",
  bold: "HankenGrotesk_700Bold",
} as const;

/* ---------- Type scale — sizes measured from Wireframe 0.4 app.css.
   Display / headings set in Spectral; UI / body set in Hanken Grotesk. ---------- */
export const type = {
  // ob__q — the big onboarding / wizard question (27px, 800 → Spectral semibold)
  display: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 27,
    lineHeight: 31,
    letterSpacing: -0.6,
    color: color.pine,
  } satisfies TextStyle,
  // topbar__title (22px, 800)
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    letterSpacing: -0.4,
    color: color.pine,
  } satisfies TextStyle,
  // section-h h3 (19px, 800)
  heading: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 19,
    letterSpacing: -0.3,
    color: color.pine,
  } satisfies TextStyle,
  // tripcard__title (15.5px, 750)
  cardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15.5,
    letterSpacing: -0.2,
    color: color.pine,
  } satisfies TextStyle,
  // .field / body copy (16–17px)
  body: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    color: color.pine,
  } satisfies TextStyle,
  // .details prose (15px, 1.5 line-height)
  prose: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    lineHeight: 22,
    color: color.pine,
  } satisfies TextStyle,
  // row__title (15px, 650 → semibold)
  rowTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    letterSpacing: -0.2,
    color: color.pine,
  } satisfies TextStyle,
  // .label (13px, 700)
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: color.muted,
  } satisfies TextStyle,
  // .btn (16px, 700)
  button: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    letterSpacing: -0.2,
  } satisfies TextStyle,
  // .small (12px)
  small: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: color.muted,
  } satisfies TextStyle,
  // .tag (11px, 600)
  tag: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    color: color.muted,
  } satisfies TextStyle,
  // streak__label eyebrow (12px, 750, uppercase, tracked)
  eyebrow: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: color.muted,
  } satisfies TextStyle,
} as const;

/* ---------- The theme object every component imports ---------- */
export const theme = {
  color,
  neutral,
  mascot,
  status,
  radius,
  spacing,
  shadow,
  fontFamily,
  type,
} as const;

export type Theme = typeof theme;
export type ColorToken = keyof typeof color;
export type RadiusToken = keyof typeof radius;
export type SpacingToken = keyof typeof spacing;
export type TypeToken = keyof typeof type;

export default theme;
