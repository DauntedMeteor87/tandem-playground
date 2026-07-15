import React from "react";
export interface ChipProps {
  /** Filled/selected state. */
  on?: boolean;
  leadingIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}
/** Pill filter/selector chip. */
export function Chip(props: ChipProps): JSX.Element;
