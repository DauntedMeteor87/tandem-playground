// Manage Adventures (Milestone W3) — the published-trip list. Direct port of
// renderManageAdventures() in studio.js: every trip you've published, with a
// signup fill bar and per-row Edit / Clone / Unpublish (or Republish) / Delete.
// Edit + Clone prime the shared wizard draft (START_EDIT / START_CLONE) and
// route into /create-adventure; status + delete flow through the reducer so Home
// and Manage stay in sync. Empty state is the wireframe-verbatim banner with
// both inline links live (empty-states.md web #4).
"use client";

import { useRouter } from "next/navigation";
import { StudioPage } from "@/components/StudioPage";
import { EmptyBanner } from "@/components/EmptyBanner";
import { IconCopy, IconEdit, IconImage } from "@/components/icons";
import { fmtDate } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";

export default function ManageAdventuresPage() {
  const router = useRouter();
  const { state, dispatch, showToast } = useStudio();
  const published = state.publishedTrips;

  // Entry modes — prime the shared draft, then head to the wizard route.
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
  // Row actions — the reducer owns the data; the toast is a view concern.
  // TODO: backend seam — PATCH/DELETE /trips once the API exists.
  function unpublish(tripId: string, name: string) {
    dispatch({ type: "SET_TRIP_STATUS", tripId, status: "unpublished" });
    showToast(`"${name}" pulled from Trip Signups`);
  }
  function republish(tripId: string, name: string) {
    dispatch({ type: "SET_TRIP_STATUS", tripId, status: "live" });
    showToast(`"${name}" is live again`);
  }
  function remove(tripId: string, name: string) {
    dispatch({ type: "DELETE_TRIP", tripId });
    showToast(`"${name}" deleted`);
  }

  return (
    <StudioPage>
      <div className="wiz__eyebrow">Your trips</div>
      <h1 className="wiz__title">Manage Adventures</h1>
      <p className="wiz__hint">
        Everything you&apos;ve published. Edits go live to members the moment you
        save — unpublishing pulls a trip out of Trip Signups without deleting it.
      </p>

      {published.length ? (
        <div className="list">
          {published.map((t) => {
            const pct = Math.min(
              100,
              Math.round((100 * t.signups) / Math.max(1, t.adv.capacity)),
            );
            return (
              <div className="managerow" key={t.id}>
                <div className="ph managerow__img">
                  <IconImage />
                </div>
                <div className="managerow__body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="row__title">{t.adv.name}</span>
                    <span className="tag">
                      {t.status === "live" ? "Live" : "Unpublished"}
                    </span>
                    <span className="tag">{t.visLabel}</span>
                  </div>
                  <div className="row__sub">
                    {fmtDate(t.adv.dateStart)}–{fmtDate(t.adv.dateEnd)} ·{" "}
                    {t.adv.location} · published {fmtDate(t.publishedOn)}
                  </div>
                  <div className="fillbar mt2">
                    <div className="fillbar__in" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="row__sub" style={{ marginTop: 4 }}>
                    {t.signups} of {t.adv.capacity} spots claimed
                  </div>
                </div>
                <div className="managerow__actions">
                  <button
                    type="button"
                    className="btn btn--sub btn--sm"
                    onClick={() => edit(t.id)}
                  >
                    <IconEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn--sub btn--sm"
                    onClick={() => clone(t.id)}
                  >
                    <IconCopy /> Clone
                  </button>
                  {t.status === "live" ? (
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => unpublish(t.id, t.adv.name)}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => republish(t.id, t.adv.name)}
                    >
                      Republish
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm btn--danger"
                    onClick={() => remove(t.id, t.adv.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyBanner>
          No published adventures yet.{" "}
          <button
            type="button"
            className="linklike"
            onClick={() => {
              dispatch({ type: "START_CREATE" });
              router.push("/create-adventure");
            }}
          >
            Create one
          </button>{" "}
          or{" "}
          <button
            type="button"
            className="linklike"
            onClick={() => router.push("/clone-adventure")}
          >
            clone a past trip
          </button>{" "}
          to get started.
        </EmptyBanner>
      )}
    </StudioPage>
  );
}
