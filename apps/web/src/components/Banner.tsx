// Source: Wireframe 0.2 — the `.banner` info strip in app.css / studio.js.
// A dashed info callout: the info glyph followed by its message. Used for
// empty states and the W1 stub notes.
import type { ReactNode } from "react";
import { IconInfo } from "@/components/icons";

export function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="banner">
      <IconInfo />
      <span>{children}</span>
    </div>
  );
}
