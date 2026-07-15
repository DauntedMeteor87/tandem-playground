import React from "react";
export interface SegmentProps {
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
/** Segmented control (2–3 short options). */
export function Segment(props: SegmentProps): JSX.Element;
