// Source: Wireframe 0.4 — the orangutan mascot (app.js ORANGUTAN, 4 stages), taken
// from the design-system assets (assets/mascot/mascot-{0..3}.svg) and re-tinted from
// the old rust palette into the Ember/Pine family (theme.mascot).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import Svg, { Circle, Ellipse, Path, Rect, type NumberProp } from "react-native-svg";
import { theme } from "@/theme/tokens";

/** 0 rest · 1 walk · 2 jump · 3 chill — grows with a member's streak. */
export type MascotStage = 0 | 1 | 2 | 3;

export type MascotProps = {
  stage?: MascotStage;
  size?: number;
};

const M = theme.mascot;

// Each stage's shapes ported 1:1 from the SVG asset; only fill/stroke colors
// swapped for theme.mascot tokens (body→ember, ink→pine, accent→amber…).
const STAGES: React.ReactNode[] = [
  // 0 — resting, playing with rocks
  <React.Fragment key={0}>
    <Ellipse cx={50} cy={87} rx={30} ry={7} fill={M.ground} />
    <Path d="M28 82c-3-20 6-34 22-34s25 14 22 34c-1 6-9 9-22 9s-21-3-22-9z" fill={M.body} />
    <Path d="M34 66q-10 6-16 16" stroke={M.body} strokeWidth={8} fill="none" strokeLinecap="round" />
    <Path d="M66 66q9 5 11 12" stroke={M.body} strokeWidth={8} fill="none" strokeLinecap="round" />
    <Circle cx={36} cy={28} r={6.5} fill={M.body} />
    <Circle cx={64} cy={28} r={6.5} fill={M.body} />
    <Circle cx={50} cy={40} r={18} fill={M.body} />
    <Ellipse cx={50} cy={44} rx={11} ry={9} fill={M.face} />
    <Circle cx={45.5} cy={42} r={1.8} fill={M.ink} />
    <Circle cx={54.5} cy={42} r={1.8} fill={M.ink} />
    <Path d="M45 48q5 4 10 0" stroke={M.ink} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    <Circle cx={17} cy={83} r={5} fill={M.accent} />
    <Circle cx={26} cy={87} r={3.5} fill={M.accent} />
  </React.Fragment>,
  // 1 — walking
  <React.Fragment key={1}>
    <Path d="M42 70q-7 13-11 21" stroke={M.body} strokeWidth={9} fill="none" strokeLinecap="round" />
    <Path d="M58 70q8 9 6 23" stroke={M.body} strokeWidth={9} fill="none" strokeLinecap="round" />
    <Path d="M38 50q-13 4-17 16" stroke={M.body} strokeWidth={8} fill="none" strokeLinecap="round" />
    <Path d="M62 50q11 1 15-7" stroke={M.body} strokeWidth={8} fill="none" strokeLinecap="round" />
    <Path d="M38 46c0-10 5-16 12-16s12 6 12 16v18c0 5-5 8-12 8s-12-3-12-8V46z" fill={M.body} />
    <Circle cx={38} cy={14} r={5.5} fill={M.body} />
    <Circle cx={62} cy={14} r={5.5} fill={M.body} />
    <Circle cx={50} cy={24} r={16} fill={M.body} />
    <Ellipse cx={50} cy={27} rx={9.5} ry={7.5} fill={M.face} />
    <Circle cx={46} cy={26} r={1.6} fill={M.ink} />
    <Circle cx={54} cy={26} r={1.6} fill={M.ink} />
    <Path d="M46 31q4 3 8 0" stroke={M.ink} strokeWidth={1.4} fill="none" strokeLinecap="round" />
    <Path d="M10 58h9M8 66h8" stroke={M.accent} strokeWidth={2.5} fill="none" strokeLinecap="round" />
  </React.Fragment>,
  // 2 — jumping
  <React.Fragment key={2}>
    <Path d="M30 90q20 7 40 0" stroke={M.accent} strokeWidth={2.5} fill="none" strokeLinecap="round" />
    <Path d="M42 68q-5 10 1 17" stroke={M.body} strokeWidth={9} fill="none" strokeLinecap="round" />
    <Path d="M58 68q5 10-1 17" stroke={M.body} strokeWidth={9} fill="none" strokeLinecap="round" />
    <Path d="M37 46q-11-14-5-25" stroke={M.body} strokeWidth={8} fill="none" strokeLinecap="round" />
    <Path d="M63 46q11-14 5-25" stroke={M.body} strokeWidth={8} fill="none" strokeLinecap="round" />
    <Path d="M38 44c0-10 5-16 12-16s12 6 12 16v14c0 5-5 8-12 8s-12-3-12-8V44z" fill={M.body} />
    <Circle cx={38} cy={14} r={5.5} fill={M.body} />
    <Circle cx={62} cy={14} r={5.5} fill={M.body} />
    <Circle cx={50} cy={23} r={16} fill={M.body} />
    <Ellipse cx={50} cy={26} rx={9.5} ry={7.5} fill={M.face} />
    <Circle cx={46} cy={25} r={2.1} fill={M.ink} />
    <Circle cx={54} cy={25} r={2.1} fill={M.ink} />
    <Circle cx={50} cy={30} r={2.2} fill={M.ink} />
  </React.Fragment>,
  // 3 — chilling with a guitar
  <React.Fragment key={3}>
    <Ellipse cx={50} cy={87} rx={30} ry={7} fill={M.ground} />
    <Path d="M26 82c-4-18 8-30 24-30s28 12 24 30c-2 6-46 6-48 0z" fill={M.body} />
    <Rect x={62} y={44} width={3.4} height={21} rx={1.5} fill={M.accent} />
    <Ellipse cx={59} cy={68} rx={10} ry={13} fill={M.accent} />
    <Circle cx={59} cy={66} r={3.2} fill={M.body} />
    <Path d="M40 68q9 3 13-4" stroke={M.body} strokeWidth={7} fill="none" strokeLinecap="round" />
    <Path d="M67 70q6-3 7-11" stroke={M.body} strokeWidth={7} fill="none" strokeLinecap="round" />
    <Circle cx={36} cy={28} r={6.5} fill={M.body} />
    <Circle cx={64} cy={28} r={6.5} fill={M.body} />
    <Circle cx={50} cy={40} r={18} fill={M.body} />
    <Ellipse cx={50} cy={44} rx={11} ry={9} fill={M.face} />
    <Path d="M44 41q2-2.4 4 0" stroke={M.ink} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    <Path d="M52 41q2-2.4 4 0" stroke={M.ink} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    <Path d="M44 48q6 5 12 0" stroke={M.ink} strokeWidth={1.6} fill="none" strokeLinecap="round" />
  </React.Fragment>,
];

export function Mascot({ stage = 0, size = 56 }: MascotProps) {
  const s = Math.max(0, Math.min(STAGES.length - 1, stage | 0));
  const dim: NumberProp = size;
  return (
    <Svg width={dim} height={dim} viewBox="0 0 100 100">
      {STAGES[s]}
    </Svg>
  );
}
