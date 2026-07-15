import React from "react";
export interface ListRowProps {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  /** Drop the bottom divider (last row in a list). */
  last?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}
/** Tappable row for lists inside a Card. */
export function ListRow(props: ListRowProps): JSX.Element;
