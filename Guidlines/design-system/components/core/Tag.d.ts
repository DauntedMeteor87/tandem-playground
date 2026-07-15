import React from "react";
export interface TagProps {
  tone?: "neutral" | "action" | "accent" | "success";
  leadingIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Small static metadata label. */
export function Tag(props: TagProps): JSX.Element;
