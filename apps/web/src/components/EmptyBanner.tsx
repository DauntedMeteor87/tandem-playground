// Source: Guidlines/docs/empty-states.md (web pattern) — the shared blank-state
// furniture for the Studio portal. It's the wireframe's `.banner` (info glyph +
// one warm line) with an optional inline `linklike` action — "no dead ends,
// ever": every empty state names one way out. Wave 3 reuses this everywhere
// web goes blank; W2 uses it for the Permits "not needed" and no-club publish
// states. (Distinct from the plain <Banner>, which is info-only.)
import type { ReactNode } from "react";
import { IconInfo } from "@/components/icons";

export interface EmptyBannerAction {
  label: string;
  onClick?: () => void;
}

export function EmptyBanner({
  children,
  action,
  className,
}: {
  /** The one-line, warm message. */
  children: ReactNode;
  /** Optional inline way out (rendered as a `.linklike` button). */
  action?: EmptyBannerAction;
  /** Extra classes on the banner (e.g. "mt4" for wizard spacing). */
  className?: string;
}) {
  return (
    <div className={`banner${className ? ` ${className}` : ""}`}>
      <IconInfo />
      <span>
        {children}
        {action ? (
          <>
            {" "}
            <button type="button" className="linklike" onClick={action.onClick}>
              {action.label}
            </button>
          </>
        ) : null}
      </span>
    </div>
  );
}
