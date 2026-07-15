import React from "react";
/**
 * Base warm surface card.
 * @startingPoint section="Core" subtitle="Surfaces — card, list rows, avatars" viewport="700x260"
 */
export interface CardProps {
  /** Use the larger raised shadow. */
  raised?: boolean;
  /** Apply default internal padding (s4). */
  pad?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/**
 * Base warm surface card.
 * @startingPoint section="Core" subtitle="Surfaces — card, list rows, avatars" viewport="700x260"
 */
export function Card(props: CardProps): JSX.Element;
