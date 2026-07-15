import React from "react";
export interface SheetProps {
  open?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Bottom sheet / action drawer (positioned within a relative parent). */
export function Sheet(props: SheetProps): JSX.Element | null;
