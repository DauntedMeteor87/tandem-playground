import React from "react";
export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}
/** +/- counter pill. */
export function Stepper(props: StepperProps): JSX.Element;
