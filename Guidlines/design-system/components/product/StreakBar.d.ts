import React from "react";
export interface StreakBarProps {
  weeks?: number;
  label?: string;
  message?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Streak row with the evolving mascot. */
export function StreakBar(props: StreakBarProps): JSX.Element;
