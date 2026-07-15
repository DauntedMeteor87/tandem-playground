// Source: Wireframe 0.2 — topbar() in screens.js, grown into the full studio
// chrome: wordmark, the current page label, and the right-side actions — the
// notifications bell (with its dropdown hub) and the signed-in profile button
// (with its menu). On the Adventure wizard route it keeps the wireframe's
// wizard chrome — the "— draft" / "Editing —" meta and "Save & exit".
// TODO: backend seam — notifications + account actions come with accounts.
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconBell, IconCog, IconLogOut } from "@/components/icons";
import { NAV, STUDIO_NOTIFICATIONS, USER } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";

const WIZARD_PATH = "/create-adventure";

function metaForPath(pathname: string): string {
  const exact = NAV.find((n) => n.href === pathname);
  if (exact) return exact.label;
  const prefixed = NAV.find((n) => n.href !== "/" && pathname.startsWith(n.href));
  return prefixed ? prefixed.label : "";
}

type Menu = "bell" | "profile" | null;

export function Topbar() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { state, showToast, adminClubs } = useStudio();

  const [open, setOpen] = useState<Menu>(null);
  const [seen, setSeen] = useState(false); // opening the bell clears the badge
  const actionsRef = useRef<HTMLDivElement>(null);

  // Close the open menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

  const unread = seen ? 0 : STUDIO_NOTIFICATIONS.length;

  return (
    <div className="topbar">
      <div className="topbar__brand">
        tandemclub <span className="muted">· studio</span>
      </div>
      <div className="topbar__meta">{meta}</div>
      <div className="topbar__actions" ref={actionsRef}>
        {showSave ? (
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => showToast("Draft saved")}
          >
            Save &amp; exit
          </button>
        ) : null}

        {/* Notifications bell + dropdown hub */}
        <button
          type="button"
          className="topbar__iconbtn"
          aria-label="Notifications"
          aria-expanded={open === "bell"}
          onClick={() => {
            setOpen(open === "bell" ? null : "bell");
            setSeen(true);
          }}
        >
          <IconBell />
          {unread > 0 && <span className="topbar__badge">{unread}</span>}
        </button>
        {open === "bell" && (
          <div className="menu menu--bell" role="menu">
            <div className="menu__head">Notifications</div>
            {STUDIO_NOTIFICATIONS.length > 0 ? (
              STUDIO_NOTIFICATIONS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className="menu__row"
                  role="menuitem"
                  onClick={() => {
                    setOpen(null);
                    router.push(n.href);
                  }}
                >
                  <span className="menu__text">{n.text}</span>
                  <span className="menu__when">{n.when}</span>
                </button>
              ))
            ) : (
              <div className="menu__empty">All quiet. We&apos;ll nudge you when something moves.</div>
            )}
          </div>
        )}

        {/* Profile button + menu */}
        <button
          type="button"
          className="avatar topbar__avatarbtn"
          title={USER.name}
          aria-label="Your profile"
          aria-expanded={open === "profile"}
          onClick={() => setOpen(open === "profile" ? null : "profile")}
        >
          {USER.initials}
        </button>
        {open === "profile" && (
          <div className="menu menu--profile" role="menu">
            <div className="menu__head">
              {USER.name}
              <span className="menu__sub">
                {adminClubs.length ? "Admin — " + adminClubs.map((c) => c.name).join(", ") : "Member"}
              </span>
            </div>
            <button
              type="button"
              className="menu__row"
              role="menuitem"
              onClick={() => {
                setOpen(null);
                showToast("Profile settings arrive with accounts");
              }}
            >
              <IconCog />
              <span className="menu__text">Profile settings</span>
            </button>
            <button
              type="button"
              className="menu__row"
              role="menuitem"
              onClick={() => {
                setOpen(null);
                showToast("Sign-out arrives with accounts");
              }}
            >
              <IconLogOut />
              <span className="menu__text">Sign out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
