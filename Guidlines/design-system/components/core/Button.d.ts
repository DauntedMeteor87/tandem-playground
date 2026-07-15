import React from "react";

/**
 * Primary tappable action for tandemclub.
 * @startingPoint section="Core" subtitle="Buttons — primary, ghost, subtle, accent, apple" viewport="700x200"
 */
export interface ButtonProps {
  /** Visual style. */
  variant?: "primary" | "ghost" | "subtle" | "accent" | "apple";
  /** Control height. */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container (default true — mobile-first). */
  full?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Primary tappable action for tandemclub. */
export function Button(props: ButtonProps): JSX.Element;
