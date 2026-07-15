// Source: Wireframe 0.2 — topbar() in screens.js. The persistent bar above the
// shell: wordmark, the current page label, and the signed-in avatar. On the
// Adventure wizard route it switches to the wireframe's wizard chrome — the
// "— draft" / "Editing —" / "New draft — cloned…" meta and the "Save & exit"
// button (both arrive with the wizard in W2).
"use client";

import { usePathname } from "next/navigation";
import { NAV, USER } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";

const WIZARD_PATH = "/create-adventure";

function metaForPath(pathname: string): string {
  const exact = NAV.find((n) => n.href === pathname);
  if (exact) return exact.label;
  const prefixed = NAV.find((n) => n.href !== "/" && pathname.startsWith(n.href));
  return prefixed ? prefixed.label : "";
}

export function Topbar() {
  const pathname = usePathname() ?? "/";
  const { state, showToast } = useStudio();

  let meta = metaForPath(pathname);
  let showSave = false;

  if (pathname === WIZARD_PATH) {
    const { confirmed, editingId, cloneSource, adv } = state;
    meta = confirmed
      ? "Published"
      : editingId
        ? `Editing — ${adv.name}`
        : cloneSource
          ? `New draft — cloned from "${cloneSource}"`
          : "Plan an Adventure — draft";
    // The wizard shows Save & exit; the confirmation screen doesn't.
    showSave = !confirmed;
  }

  return (
    <div className="topbar">
      <div className="topbar__brand">
        tandemclub <span className="muted">· studio</span>
      </div>
      <div className="topbar__meta">{meta}</div>
      <div className="topbar__actions">
        {showSave ? (
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => showToast("Draft saved")}
          >
            Save &amp; exit
          </button>
        ) : null}
        <div className="avatar" title={USER.name}>
          {USER.initials}
        </div>
      </div>
    </div>
  );
}
