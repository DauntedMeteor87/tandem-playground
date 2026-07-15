import React from "react";
export interface ToggleProps {
  /** Controlled state. */
  on?: boolean;
  /** Uncontrolled initial state. */
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  style?: React.CSSProperties;
}
/** On/off toggle switch. */
export function Toggle(props: ToggleProps): JSX.Element;
