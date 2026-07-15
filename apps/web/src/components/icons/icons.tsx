// Source: Wireframe 0.2 — the inline `I` SVG set in app.js.
// Every glyph is ported verbatim: same viewBox (0 0 24 24), same stroke
// paths, same per-icon stroke-width. Sizing stays in CSS (globals.css:
// svg { width:18px }, .railstep svg { 16px }, .phgrid .ph svg { 26px }),
// so these render at the wireframe's sizes wherever they're placed.
import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/** Shared frame: the attributes every wireframe icon has in common. */
function Icon({
  strokeWidth = 1.8,
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconBack = (p: IconProps) => (
  <Icon strokeWidth={2.2} {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
);

export const IconChevron = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M9 18l6-6-6-6" />
  </Icon>
);

export const IconPlus = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const IconX = (p: IconProps) => (
  <Icon strokeWidth={2.2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const IconCheck = (p: IconProps) => (
  <Icon strokeWidth={2.4} {...p}>
    <path d="M5 12l5 5 9-11" />
  </Icon>
);

export const IconImage = (p: IconProps) => (
  <Icon strokeWidth={1.6} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <path d="M4 18l5-5 4 4 3-3 4 4" />
  </Icon>
);

export const IconInfo = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v5h1" />
  </Icon>
);

export const IconLink = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5" />
    <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5" />
  </Icon>
);

export const IconShield = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
  </Icon>
);

export const IconTree = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <path d="M12 2l5 8h-3l4 6h-4v6h-4v-6H6l4-6H7l5-8z" />
  </Icon>
);

export const IconMoney = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
  </Icon>
);

export const IconCar = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <path d="M5 16v2M19 16v2M3 13l2-5a2 2 0 012-1.4h10A2 2 0 0119 8l2 5v3H3v-3z" />
    <circle cx="7.5" cy="13.5" r="1" />
    <circle cx="16.5" cy="13.5" r="1" />
  </Icon>
);

export const IconTent = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <path d="M12 4L3 20h18L12 4z" />
    <path d="M12 4v16" />
  </Icon>
);

export const IconPin = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </Icon>
);

export const IconUsers = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <circle cx="17" cy="9" r="2.6" />
    <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    <path d="M15.5 20c0-2 .8-3.2 2-3.7" />
  </Icon>
);

export const IconHome = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </Icon>
);

export const IconEdit = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </Icon>
);

export const IconCopy = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 012-2h10" />
  </Icon>
);

export const IconCog = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34h.01a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55h.01a1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87v.01a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.55 1z" />
  </Icon>
);

export const IconFlag = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M5 21V4" />
    <path d="M5 4h13l-2.5 4L18 12H5" />
  </Icon>
);

export const IconSearch = (p: IconProps) => (
  <Icon strokeWidth={1.9} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Icon>
);

export const IconCalendar = (p: IconProps) => (
  <Icon strokeWidth={1.7} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </Icon>
);

/* Topbar chrome — same glyphs as the mobile app's header set. */
export const IconBell = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 01-3.4 0" />
  </Icon>
);

export const IconLogOut = (p: IconProps) => (
  <Icon strokeWidth={1.8} {...p}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </Icon>
);

/** Registry keyed by the wireframe's `I` keys, so ported data (NAV,
 *  PERMIT_SOURCES, membership cards) can resolve an icon by string. */
export const ICONS = {
  back: IconBack,
  chev: IconChevron,
  plus: IconPlus,
  x: IconX,
  check: IconCheck,
  img: IconImage,
  info: IconInfo,
  link: IconLink,
  shield: IconShield,
  tree: IconTree,
  money: IconMoney,
  car: IconCar,
  tent: IconTent,
  pin: IconPin,
  users: IconUsers,
  home: IconHome,
  edit: IconEdit,
  copy: IconCopy,
  cog: IconCog,
  flag: IconFlag,
  search: IconSearch,
  cal: IconCalendar,
  bell: IconBell,
  logout: IconLogOut,
} as const;

export type IconKey = keyof typeof ICONS;
