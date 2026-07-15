// Source: Wireframe 0.4 — app.js `const I = { … }` inline icon set.
// TODO: Code Connect map once Figma frame exists.
//
// Every glyph is ported 1:1 from the wireframe's inline stroke SVGs: same
// viewBox (0 0 24 24), same paths, same stroke-width, round caps/joins,
// currentColor → `color` prop. No geometry was reinterpreted. See icons.test.ts
// for the full inventory the registry must expose.
import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { theme } from "@/theme/tokens";

export type IconProps = {
  /** Square edge length in px. Wireframe defaults render at 20–24. */
  size?: number;
  /** Stroke/fill color. Defaults to pine (never a hardcoded hex here). */
  color?: string;
};

/** Stroke-style glyph wrapper — fill:none, round caps + joins (wireframe default). */
function Stroke({
  size = 24,
  color = theme.color.pine,
  sw,
  children,
}: IconProps & { sw: number; children: React.ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

/** Solid-fill glyph wrapper (heart, comment, apple). */
function Fill({
  size = 24,
  color = theme.color.pine,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      {children}
    </Svg>
  );
}

export const IconBack = (p: IconProps) => (
  <Stroke {...p} sw={2.2}>
    <Path d="M15 18l-6-6 6-6" />
  </Stroke>
);
export const IconChev = (p: IconProps) => (
  <Stroke {...p} sw={2}>
    <Path d="M9 18l6-6-6-6" />
  </Stroke>
);
export const IconDown = (p: IconProps) => (
  <Stroke {...p} sw={2}>
    <Path d="M6 9l6 6 6-6" />
  </Stroke>
);
export const IconUp = (p: IconProps) => (
  <Stroke {...p} sw={2}>
    <Path d="M18 15l-6-6-6 6" />
  </Stroke>
);
export const IconLeft = (p: IconProps) => (
  <Stroke {...p} sw={2}>
    <Path d="M15 18l-6-6 6-6" />
  </Stroke>
);
export const IconRight = (p: IconProps) => (
  <Stroke {...p} sw={2}>
    <Path d="M9 18l6-6-6-6" />
  </Stroke>
);
export const IconPerson = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Circle cx={12} cy={8} r={4} />
    <Path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </Stroke>
);
export const IconUsers = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Circle cx={9} cy={8} r={3.2} />
    <Circle cx={17} cy={9} r={2.6} />
    <Path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    <Path d="M15.5 20c0-2 .8-3.2 2-3.7" />
  </Stroke>
);
export const IconPlane = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M22 2L11 13" />
    <Path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </Stroke>
);
export const IconEdit = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M12 20h9" />
    <Path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </Stroke>
);
export const IconBell = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.7 21a2 2 0 01-3.4 0" />
  </Stroke>
);
export const IconHome = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M3 10.5L12 3l9 7.5" />
    <Path d="M5 9.5V21h14V9.5" />
  </Stroke>
);
export const IconTrips = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
    <Path d="M9 4v14M15 6v14" />
  </Stroke>
);
export const IconPlan = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M12 8v8M8 12h8" />
  </Stroke>
);
export const IconComm = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Circle cx={9} cy={8} r={3.2} />
    <Circle cx={17} cy={9} r={2.6} />
    <Path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    <Path d="M15.5 20c0-2 .8-3.2 2-3.7" />
  </Stroke>
);
export const IconImg = (p: IconProps) => (
  <Stroke {...p} sw={1.6}>
    <Rect x={3} y={4} width={18} height={16} rx={2} />
    <Circle cx={8.5} cy={9.5} r={1.6} />
    <Path d="M4 18l5-5 4 4 3-3 4 4" />
  </Stroke>
);
export const IconCam = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
    <Circle cx={12} cy={13} r={3.4} />
  </Stroke>
);
export const IconSearch = (p: IconProps) => (
  <Stroke {...p} sw={1.9}>
    <Circle cx={11} cy={11} r={7} />
    <Path d="M21 21l-4-4" />
  </Stroke>
);
export const IconHeart = (p: IconProps) => (
  <Fill {...p}>
    <Path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
  </Fill>
);
export const IconHearto = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
  </Stroke>
);
export const IconCmt = (p: IconProps) => (
  <Fill {...p}>
    <Path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H9l-5 4V5a1 1 0 011-1z" />
  </Fill>
);
export const IconShare = (p: IconProps) => (
  <Stroke {...p} sw={1.9}>
    <Path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" />
    <Path d="M12 15V3M8 7l4-4 4 4" />
  </Stroke>
);
export const IconExpand = (p: IconProps) => (
  <Stroke {...p} sw={1.9}>
    <Path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" />
  </Stroke>
);
export const IconCheck = (p: IconProps) => (
  <Stroke {...p} sw={2.4}>
    <Path d="M5 12l5 5 9-11" />
  </Stroke>
);
export const IconApple = (p: IconProps) => (
  <Fill {...p}>
    <Path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.6zM14.3 6.1c.6-.8 1-1.9.9-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.8 1.1.1 2.2-.5 2.9-1.3z" />
  </Fill>
);
export const IconLock = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Rect x={4.5} y={10} width={15} height={10} rx={2} />
    <Path d="M8 10V7a4 4 0 018 0v3" />
  </Stroke>
);
export const IconX = (p: IconProps) => (
  <Stroke {...p} sw={2.2}>
    <Path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
);
export const IconPlus = (p: IconProps) => (
  <Stroke {...p} sw={2}>
    <Path d="M12 5v14M5 12h14" />
  </Stroke>
);
export const IconPin = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z" />
    <Circle cx={12} cy={11} r={2} />
  </Stroke>
);
export const IconCal = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Rect x={3.5} y={5} width={17} height={16} rx={2} />
    <Path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </Stroke>
);
export const IconPatch = ({ size = 24, color = theme.color.pine }: IconProps) => (
  // Wireframe uses stroke-linejoin only (no linecap) — matched here.
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
    strokeLinejoin="round"
  >
    <Path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18.7l.9-5.4L4.2 8.7l5.4-.8L12 3z" />
  </Svg>
);
export const IconSmile = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <Path d="M9 9h.01M15 9h.01" />
  </Stroke>
);
export const IconFlame = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M12 3c1 3-1 4-1 6a2.5 2.5 0 005 0c0-.6-.2-1.2-.5-1.7C17 9 18 11 18 13a6 6 0 11-12 0c0-3 2.5-4.5 3.5-7 .6 1.4 1.5 1.8 1.5 3" />
  </Stroke>
);
export const IconClock = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M12 7v5l3 2" />
  </Stroke>
);
export const IconFlag = (p: IconProps) => (
  <Stroke {...p} sw={1.8}>
    <Path d="M5 21V4M5 4h11l-2 4 2 4H5" />
  </Stroke>
);
export const IconShield = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
  </Stroke>
);
export const IconChat = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M4 5h16v11H9l-5 4V5z" />
  </Stroke>
);
export const IconMap = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
    <Path d="M9 4v14M15 6v14" />
  </Stroke>
);
export const IconCar = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M5 16v2M19 16v2M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v3H3v-3z" />
    <Circle cx={7.5} cy={13.5} r={1} />
    <Circle cx={16.5} cy={13.5} r={1} />
  </Stroke>
);
export const IconTent = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Path d="M12 4L3 20h18L12 4z" />
    <Path d="M12 4v16" />
  </Stroke>
);
export const IconMoney = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Rect x={3} y={6} width={18} height={12} rx={2} />
    <Circle cx={12} cy={12} r={2.5} />
  </Stroke>
);
export const IconAirdrop = ({ size = 24, color = theme.color.pine }: IconProps) => (
  // Three stroked arcs + a solid downward triangle (fill overrides the stroke).
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4.5 9.5a10.5 10.5 0 0115 0" />
    <Path d="M7.5 12.5a6.5 6.5 0 019 0" />
    <Path d="M10.4 15.6a2.6 2.6 0 013.2 0" />
    <Path d="M12 17.6l-2.2 3.2h4.4L12 17.6z" fill={color} stroke="none" />
  </Svg>
);
export const IconLaptop = (p: IconProps) => (
  <Stroke {...p} sw={1.7}>
    <Rect x={4} y={5} width={16} height={11} rx={1.5} />
    <Path d="M2 20h20" />
  </Stroke>
);

/**
 * Registry keyed by the exact wireframe `I` names. `ICON_NAMES` /
 * `<Icon name=… />` let screens look glyphs up dynamically the way the
 * wireframe did (e.g. notification rows, `I[n.icon]`).
 */
export const ICONS = {
  back: IconBack,
  chev: IconChev,
  down: IconDown,
  up: IconUp,
  left: IconLeft,
  right: IconRight,
  person: IconPerson,
  users: IconUsers,
  plane: IconPlane,
  edit: IconEdit,
  bell: IconBell,
  home: IconHome,
  trips: IconTrips,
  plan: IconPlan,
  comm: IconComm,
  img: IconImg,
  cam: IconCam,
  search: IconSearch,
  heart: IconHeart,
  hearto: IconHearto,
  cmt: IconCmt,
  share: IconShare,
  expand: IconExpand,
  check: IconCheck,
  apple: IconApple,
  lock: IconLock,
  x: IconX,
  plus: IconPlus,
  pin: IconPin,
  cal: IconCal,
  patch: IconPatch,
  smile: IconSmile,
  flame: IconFlame,
  clock: IconClock,
  flag: IconFlag,
  shield: IconShield,
  chat: IconChat,
  map: IconMap,
  car: IconCar,
  tent: IconTent,
  money: IconMoney,
  airdrop: IconAirdrop,
  laptop: IconLaptop,
} as const;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

/** Look a glyph up by its wireframe name. */
export function Icon({ name, size, color }: IconProps & { name: IconName }) {
  const Glyph = ICONS[name];
  return <Glyph size={size} color={color} />;
}
