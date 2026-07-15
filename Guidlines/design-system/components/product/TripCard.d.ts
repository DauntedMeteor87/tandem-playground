import React from "react";
export interface Trip {
  title?: string;
  club?: string;
  kind?: "Adventure" | "Activity";
  when?: string;
  cost?: string;
  photo?: string;
  /** Names/initials for the AvatarStack. */
  going?: string[];
  goingN?: number;
}
/**
 * Core trip discovery card.
 * @startingPoint section="Product" subtitle="Trip cards, streak, mascot, photo frame" viewport="700x300"
 */
export interface TripCardProps {
  trip?: Trip;
  width?: number;
  /** Full-width grid variant (2-up "see more" pages). */
  grid?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}
/**
 * Core trip discovery card.
 * @startingPoint section="Product" subtitle="Trip cards, streak, mascot, photo frame" viewport="700x300"
 */
export function TripCard(props: TripCardProps): JSX.Element;
