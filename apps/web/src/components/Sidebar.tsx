// Source: Wireframe 0.2 — studioSidebar() in studio.js.
// The persistent left rail: Studio heading, the six destinations
// (Manage a Club shown only when the demo admin gate passes, exactly as
// the wireframe's NAV.filter(!adminOnly || isClubAdmin())), and the
// signed-in footer. Nav is real Next.js routing; the active row is
// derived from the pathname.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS } from "@/components/icons";
import { NAV, USER } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname() ?? "/";
  const { isClubAdmin, adminClubs, dispatch } = useStudio();
  const items = NAV.filter((n) => !n.adminOnly || isClubAdmin);

  return (
    <nav className="sidebar">
      <div className="sidebar__head">
        <div className="sidebar__title">Studio</div>
        <div className="sidebar__sub">Plan on the web, publish to the app</div>
      </div>

      {items.map((n) => {
        const Icon = ICONS[n.icon];
        const active = isActive(n.href, pathname);
        return (
          <Link
            key={n.id}
            href={n.href}
            className={`railstep ${active ? "current" : ""}`}
            aria-current={active ? "page" : undefined}
            // Entering the Adventure wizard from the sidebar starts a fresh
            // draft every time (wireframe nav('create')).
            onClick={
              n.id === "create"
                ? () => dispatch({ type: "START_CREATE" })
                : undefined
            }
          >
            <span className="railstep__n railstep__n--icon">
              <Icon />
            </span>
            {n.label}
          </Link>
        );
      })}

      <div className="sidebar__foot">
        <div className="sidebar__sub">
          Signed in as {USER.name}
          <br />
          {adminClubs.length
            ? "Admin — " + adminClubs.map((c) => c.name).join(", ")
            : "Member"}
        </div>
      </div>
    </nav>
  );
}
