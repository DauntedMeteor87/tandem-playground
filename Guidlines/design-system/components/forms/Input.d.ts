import React from "react";
/**
 * Text field / textarea with label + optional char count.
 * @startingPoint section="Forms" subtitle="Inputs, segmented control, toggle, stepper" viewport="700x300"
 */
export interface InputProps {
  label?: React.ReactNode;
  multiline?: boolean;
  maxLength?: number;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}
/**
 * Text field / textarea with label + optional char count.
 * @startingPoint section="Forms" subtitle="Inputs, segmented control, toggle, stepper" viewport="700x300"
 */
export function Input(props: InputProps): JSX.Element;
