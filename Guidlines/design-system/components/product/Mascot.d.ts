import React from "react";
export interface MascotProps {
  /** 0 rest · 1 walk · 2 jump · 3 chill — grows with a member's streak. */
  stage?: 0 | 1 | 2 | 3;
  size?: number;
  style?: React.CSSProperties;
}
/** The tandemclub orangutan mascot (warm rust, 4 streak stages). */
export function Mascot(props: MascotProps): JSX.Element;
