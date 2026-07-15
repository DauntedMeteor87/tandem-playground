// Source: Wireframe 0.4 (spacing/radii measured from app.css) + migration doc §2
// (locked brand palette + type). This file is the ONE place hex / radius / shadow
// literals are allowed to live — every component references `theme.color.pine`,
// `theme.radius.lg`, etc. A hardcoded hex anywhere else is a defect.
//
// Greyscale → brand mapping used by the components:
//   near-black text (#1c1c1e)  → pine    (body copy & headings)
//   white cards    (#ffffff)   → paper
//   page bg        (#f4f4f5)   → canvas
//   mid-grey text  (#5c5c60/#97979c) → muted
//   black CTA fill (#262628)   → ember   (primary CTA / accent — one per view)

import type { TextStyle, ViewStyle } from "react-native";

/* ---------- Color — migration doc §2 (locked palette) ---------- */
export const color = {
  pine: "#05332B", // primary dark: all body copy & headings, deep surfaces
  teal: "#1B564B", // secondary dark: links, info
  ember: "#F24E00", // primary accent: CTAs, mascot — never body text
  amber: "#F2B23C", // sunlit highlight, warning
  leaf: "#8BC97F", // nature, success, growth
  canvas: "#F0EFEE", // app / page background
  paper: "#FFFFFF", // cards, raised surfaces
  muted: "#5E6F68", // secondary text
} as const;

/* ---------- Neutrals derived from the palette ----------
   §2 names the 8 brand colors but not the structural hairlines/tracks the
   wireframe relies on (--c-line, --c-line-2, --c-surface-2, overlays). These are
   derived from pine so borders read warm (never pure grey/black) and live here so
   no component carries a raw hex. */
export const neutral = {
  sunk: "#E9E7E5", // warm off-white sunk track / subtle fill (wireframe --c-surface-2)
  hairline: "rgba(5,51,43,0.08)", // hairline divider/border (wireframe --c-line)
  hairlineStrong: "rgba(5,51,43,0.16)", // input & dashed borders (wireframe --c-line-2)
  overlay: "rgba(5,51,43,0.42)", // sheet / modal scrim (wireframe .sheet-overlay)
  onDark: "rgba(255,255,255,0.72)", // muted text/icon on a dark (pine/ember) surface
  onDarkFill: "rgba(255,255,255,0.18)", // translucent-white pill/chip over a photo hero (wireframe rgba(255,255,255,.2/.15))
  emberSoft: "#FCE6DB", // pale ember wash — single-accent tag / highlight background
  photo: "#E5DFD8", // warm painterly image placeholder fill (wireframe --c-ph)
  photoInk: "#B9AFA4", // placeholder glyph tint (wireframe --c-ph-2)
  scrim: "rgba(5,51,43,0.55)", // hero/photo protection scrim under overlaid text
} as const;

/* ---------- Mascot illustration palette ----------
   The orangutan re-tinted from the design-system's rust into the Ember/Pine
   family. §2 explicitly assigns ember to the mascot. */
export const mascot = {
  body: color.ember, // #a8623a rust → ember
  face: "#F7E7D6", // #f2e4d0 → warm cream face patch
  ink: color.pine, // #3a2a1c → pine (eyes / mouth)
  ground: "#E7DED4", // #e6dccb → soft ground shadow
  accent: color.amber, // #caa06a → amber (rocks, guitar, motion lines)
} as const;

/* ---------- Status pairs — §2 (stay in-family) ----------
   Each pair is { fg, bg }: the in-family accent color on its pale tint. */
export const status = {
  success: { fg: color.leaf, bg: "#EAF3E4" },
  warning: { fg: color.amber, bg: "#FDF3E1" },
  error: { fg: "#C7361B", bg: "#FBEAE2" },
  info: { fg: color.teal, bg: "#E9F1EF" },
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

/* ---------- Shadow — §2: `0 18px 40px -30px rgba(5,51,43,0.55)` — soft, warm,
   pine-tinted, never pure black. Mapped to RN shadow* + android elevation. ---------- */
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
