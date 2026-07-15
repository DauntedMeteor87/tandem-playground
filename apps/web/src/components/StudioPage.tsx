// Source: Wireframe 0.2 — studioPage() in studio.js.
// The non-wizard page shell: the scrollable main column and its centered
// body. The topbar + sidebar live in the (studio) layout, so this is just
// the inner content wrapper. Default max width matches the wireframe's
// 900px (the wizard body's 720px comes from globals.css).
import type { ReactNode } from "react";

export function StudioPage({
  maxWidth = "900px",
  children,
}: {
  maxWidth?: string;
  children: ReactNode;
}) {
  return (
    <div className="wiz__main">
      <div className="wiz__body" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
