import React from "react";
export interface PhotoFrameProps {
  src?: string;
  alt?: string;
  height?: number | string;
  /** Round all corners (standalone tile). */
  rounded?: boolean;
  /** Add bottom protection gradient for overlaid text. */
  protect?: boolean;
  /** Content pinned bottom-left over the photo (white). */
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Painterly warm image surface / placeholder. */
export function PhotoFrame(props: PhotoFrameProps): JSX.Element;
