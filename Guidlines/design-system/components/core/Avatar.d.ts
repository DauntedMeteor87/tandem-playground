import React from "react";
export interface AvatarProps {
  src?: string;
  /** Used for initials fallback + alt text. */
  name?: string;
  size?: number;
  style?: React.CSSProperties;
}
export interface AvatarStackProps {
  /** Names (strings) or AvatarProps objects. */
  people?: Array<string | AvatarProps>;
  size?: number;
  /** Max shown before truncation. */
  max?: number;
}
/** Round profile image / initials avatar. */
export function Avatar(props: AvatarProps): JSX.Element;
/** Overlapping avatar group ("who's going"). */
export function AvatarStack(props: AvatarStackProps): JSX.Element;
