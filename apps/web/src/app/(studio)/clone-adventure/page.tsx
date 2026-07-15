// Clone an Adventure (Milestone W3) — the past-trip browser. Direct port of
// renderCloneAdventure() in studio.js: a filter chiprow (all / led by you / one
// per club), then a grid of proven trips. "Clone this trip" deep-copies the full
// plan into a new draft (START_CLONE clears the dates + permit booking) and
// routes into the wizard. Per-filter empty state is the wireframe-verbatim
// banner (empty-states.md web #5). Past trips + the club list are static demo
// data, so this reads the module references directly.
"use client";

import { useRouter } from "next/navigation";
import { StudioPage } from "@/components/StudioPage";
import { EmptyBanner } from "@/components/EmptyBanner";
import { IconCopy } from "@/components/icons";
import { CLUBS, PAST_TRIPS } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";

export default function CloneAdventurePage() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { cloneFilter } = state;

  const filters = [
    { id: "all", label: "All past trips" },
    { id: "mine", label: "Led by you" },
    ...CLUBS.map((c) => ({ id: c.id, label: c.name })),
  ];

  const trips = PAST_TRIPS.filter((t) => {
    if (cloneFilter === "all") return true;
    if (cloneFilter === "mine") return t.by === "You";
    return t.clubId === cloneFilter;
  });

  function clone(tripId: string) {
    const src = PAST_TRIPS.find((t) => t.id === tripId);
    if (!src) return;
    dispatch({ type: "START_CLONE", adv: src.adv, sourceName: src.adv.name });
    router.push("/create-adventure");
  }

  return (
    <StudioPage>
      <div className="wiz__eyebrow">Start from a proven trip</div>
      <h1 className="wiz__title">Clone an Adventure</h1>
      <p className="wiz__hint">
        Past public trips and trips run by clubs you&apos;re in. Cloning copies
        the full plan — write-up, itinerary, gear, budget — into a new draft.
        Dates and permit bookings don&apos;t carry over.
      </p>

      <div className="chiprow">
        {filters.map((f) => (
          <button
            type="button"
            key={f.id}
            className={`chip ${cloneFilter === f.id ? "on" : ""}`}
            onClick={() => dispatch({ type: "SET_CLONE_FILTER", filter: f.id })}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="tripgrid mt5">
        {trips.map((t) => {
          const club = CLUBS.find((c) => c.id === t.clubId);
          const days = t.adv.itinerary.length;
          return (
            <div className="triptile" key={t.id}>
              <div className="ph triptile__img" />
              <div className="triptile__body">
                <span className="tag">{club ? club.name : "Public"}</span>
                <span className="tag">Ran {t.when}</span>
                <div className="triptile__name">{t.adv.name}</div>
                <div className="row__sub">
                  {t.adv.location} · led by {t.by} · {t.adv.capacity} spots
                </div>
                <div
                  className="row__sub"
                  style={{ marginTop: 6, lineHeight: 1.45 }}
                >
                  {t.adv.writeup.slice(0, 110)}
                  {t.adv.writeup.length > 110 ? "…" : ""}
                </div>
                <div
                  className="mt3"
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <button
                    type="button"
                    className="btn btn--sm"
                    onClick={() => clone(t.id)}
                  >
                    <IconCopy /> Clone this trip
                  </button>
                  <span className="row__sub">
                    {t.adv.gear.length} gear items · {days} itinerary steps
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {trips.length ? null : (
          <EmptyBanner>No past trips in this filter yet.</EmptyBanner>
        )}
      </div>
    </StudioPage>
  );
}
