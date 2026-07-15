// Home — the Studio dashboard. Direct port of renderHome() in studio.js:
// welcome hero, four quick-action tiles, the live/signups/upcoming/clubs stat
// row, and the "Your adventures" grid. Live numbers come from StudioProvider
// (published trips + admin clubs); the quick tiles route to the six
// destinations; Edit/Clone prime the wizard draft (W2 renders it).
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudioPage } from "@/components/StudioPage";
import {
  IconCog,
  IconCopy,
  IconEdit,
  IconFlag,
  IconInfo,
  IconPlus,
} from "@/components/icons";
import { CREWS, USER, fmtDate } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";

export default function HomePage() {
  const router = useRouter();
  const { state, dispatch, isClubAdmin, adminClubs } = useStudio();

  const published = state.publishedTrips;
  const live = published.filter((t) => t.status === "live");
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const upcoming = live.filter(
    (t) => !t.adv.dateStart || new Date(t.adv.dateStart) >= today,
  );
  const totalSignups = live.reduce((s, t) => s + t.signups, 0);
  const pendingRequests = adminClubs.reduce((s, c) => s + c.requests.length, 0);

  // Entry modes — prime the shared draft, then head to the wizard route.
  // TODO: backend seam — persist edits/clones once the trips API exists.
  function edit(tripId: string) {
    dispatch({ type: "START_EDIT", tripId });
    router.push("/create-adventure");
  }
  function clone(tripId: string) {
    const entry = published.find((t) => t.id === tripId);
    if (!entry) return;
    dispatch({ type: "START_CLONE", adv: entry.adv, sourceName: entry.adv.name });
    router.push("/create-adventure");
  }

  const stats: Array<[string, number]> = [
    ["Adventures live", live.length],
    ["Members signed up", totalSignups],
    ["Upcoming", upcoming.length],
    ["Clubs & crews", state.clubs.length + CREWS.length],
  ];

  return (
    <StudioPage>
      <div className="home-hero">
        <div>
          <div className="wiz__eyebrow">Welcome back</div>
          <h1 className="wiz__title" style={{ marginBottom: 0 }}>
            Hey, {USER.name} 👋
          </h1>
        </div>
      </div>

      <div className="quick-tiles mt5">
        <Link
          className="quicktile accent"
          href="/create-adventure"
          onClick={() => dispatch({ type: "START_CREATE" })}
        >
          <div className="quicktile__eyebrow">New trip</div>
          <div className="quicktile__title">
            <IconPlus /> Create an Adventure
          </div>
          <div className="quicktile__sub">Permits, budget, gear, and publish</div>
        </Link>

        <Link className="quicktile" href="/clone-adventure">
          <div className="quicktile__eyebrow">Fastest way to plan</div>
          <div className="quicktile__title">
            <IconCopy /> Clone an Adventure
          </div>
          <div className="quicktile__sub">
            Start from a past trip — yours or your clubs&apos;
          </div>
        </Link>

        {isClubAdmin ? (
          <Link className="quicktile dark" href="/manage-club">
            <div className="quicktile__eyebrow">
              {pendingRequests
                ? `${pendingRequests} join request${pendingRequests > 1 ? "s" : ""} waiting`
                : "Admin"}
            </div>
            <div className="quicktile__title">
              <IconCog /> Manage a Club
            </div>
            <div className="quicktile__sub">Roster, requests &amp; club settings</div>
          </Link>
        ) : (
          <Link className="quicktile dark" href="/create-club">
            <div className="quicktile__eyebrow">Start something</div>
            <div className="quicktile__title">
              <IconFlag /> Create a Club
            </div>
            <div className="quicktile__sub">Name it, set the rules, invite people</div>
          </Link>
        )}

        <Link className="quicktile" href="/manage-adventures">
          {/* Kicker degrades at zero — no fake "0 live" (empty-states.md web #2). */}
          <div className="quicktile__eyebrow">
            {live.length ? `${live.length} live` : "Your trips"}
          </div>
          <div className="quicktile__title">
            <IconEdit /> Manage Adventures
          </div>
          <div className="quicktile__sub">Edit, unpublish, or duplicate your trips</div>
        </Link>
      </div>

      <div className="stat-tiles mt5">
        {stats.map(([label, value]) => (
          <div className="stat-tile" key={label}>
            <div className="stat-tile__v">{value}</div>
            <div className="stat-tile__l">{label}</div>
          </div>
        ))}
      </div>

      <div className="divlabel mt6">Your adventures</div>
      {published.length ? (
        <div className="tripgrid">
          {published.map((t) => (
            <div className="triptile" key={t.id}>
              <div className="ph triptile__img" />
              <div className="triptile__body">
                <span className="tag">
                  {t.status === "live" ? "Live" : "Unpublished"} · {t.visLabel}
                </span>
                <div className="triptile__name">{t.adv.name}</div>
                <div className="row__sub">
                  {fmtDate(t.adv.dateStart)}–{fmtDate(t.adv.dateEnd)} ·{" "}
                  {t.adv.location} · {t.signups}/{t.adv.capacity} joined
                </div>
                <div className="mt3" style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn--sub btn--sm"
                    onClick={() => edit(t.id)}
                  >
                    <IconEdit /> Edit
                  </button>
                  <button
                    className="btn btn--sub btn--sm"
                    onClick={() => clone(t.id)}
                  >
                    <IconCopy /> Clone
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="banner">
          <IconInfo />
          <span>
            Nothing published yet — create your first adventure and it&apos;ll
            show up here.
          </span>
        </div>
      )}
    </StudioPage>
  );
}
