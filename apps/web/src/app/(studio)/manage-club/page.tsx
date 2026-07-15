// Manage a Club (Milestone W3) — the admin console. Direct port of
// renderManageClub() + clubTabBody() + the five clubTab*() renderers in
// studio.js. Admin-gated by adminClubs(): non-admins get the designed officer
// banner (empty-states.md web #6). For admins: a club picker, then Overview /
// Roster / Requests / Adventures / Settings tabs over the seeded Field Studies
// data (roster with role pickers, pending requests, dues). Roster + Requests
// carry their own blank states (empty-states.md web #7, #8).
"use client";

import { useRouter } from "next/navigation";
import { StudioPage } from "@/components/StudioPage";
import { EmptyBanner } from "@/components/EmptyBanner";
import { DuesSettings } from "@/components/DuesSettings";
import { MemberRow } from "@/components/manage-club/MemberRow";
import { RequestRow } from "@/components/manage-club/RequestRow";
import { IconCalendar, IconLink, IconPlus } from "@/components/icons";
import {
  fmtDate,
  joinPolicyLabel,
  type JoinPolicy,
  type MemberRole,
} from "@/lib/data";
import { useStudio, type ClubTab } from "@/lib/studio-state";

const JOIN_POLICIES: JoinPolicy[] = ["open", "request", "invite"];

export default function ManageClubPage() {
  const router = useRouter();
  const { state, dispatch, showToast, adminClubs } = useStudio();
  const { manageClubId, clubTab, publishedTrips } = state;

  // ---- Non-admin gate (empty-states.md web #6) ----
  if (!adminClubs.length) {
    return (
      <StudioPage>
        <div className="wiz__eyebrow">Admin</div>
        <h1 className="wiz__title">Manage a Club</h1>
        <EmptyBanner
          action={{ label: "Back to Home", onClick: () => router.push("/") }}
        >
          Only club officers can manage a club. Lead a trip or two — leadership
          finds people who show up.
        </EmptyBanner>
      </StudioPage>
    );
  }

  // The wireframe defaulted S.manageClubId to the first admin club; here we
  // derive it so no dispatch is needed just to land on a valid club.
  const club = adminClubs.find((c) => c.id === manageClubId) ?? adminClubs[0];
  const clubTrips = publishedTrips.filter(
    (t) => t.adv.visType === "club" && t.adv.visId === club.id,
  );

  const tabs: Array<[ClubTab, string]> = [
    ["overview", "Overview"],
    ["roster", "Roster"],
    [
      "requests",
      `Requests${club.requests.length ? " · " + club.requests.length : ""}`,
    ],
    ["trips", "Adventures"],
    ["settings", "Settings"],
  ];

  // Shared entry points into the Adventure wizard.
  function editTrip(tripId: string) {
    dispatch({ type: "START_EDIT", tripId });
    router.push("/create-adventure");
  }
  function newTripForClub() {
    dispatch({ type: "START_CREATE_FOR_CLUB", clubId: club.id });
    router.push("/create-adventure");
  }

  // ---- Overview ----
  function overview() {
    const live = clubTrips.filter((t) => t.status === "live");
    const stats: Array<[string, string | number]> = [
      ["Members", club.members.length],
      ["Join requests", club.requests.length],
      ["Live adventures", live.length],
      ["Dues", club.duesOn ? `$${club.dues}/qtr` : "None"],
    ];
    return (
      <>
        <div className="stat-tiles mt5">
          {stats.map(([label, value]) => (
            <div className="stat-tile" key={label}>
              <div className="stat-tile__v">{value}</div>
              <div className="stat-tile__l">{label}</div>
            </div>
          ))}
        </div>
        <div className="divlabel mt6">Needs your attention</div>
        <div className="list">
          {club.requests.length ? (
            <div className="row">
              <span className="row__body">
                <span className="row__title">
                  {club.requests.length} pending join request
                  {club.requests.length > 1 ? "s" : ""}
                </span>
                <span className="row__sub">{club.requests.join(", ")}</span>
              </span>
              <button
                type="button"
                className="btn btn--sub btn--sm"
                onClick={() => dispatch({ type: "SET_CLUB_TAB", tab: "requests" })}
              >
                Review
              </button>
            </div>
          ) : null}
          {live.map((t) => (
            <div className="row" key={t.id}>
              <span className="row__body">
                <span className="row__title">{t.adv.name}</span>
                <span className="row__sub">
                  {t.signups}/{t.adv.capacity} joined · {fmtDate(t.adv.dateStart)}
                </span>
              </span>
              <button
                type="button"
                className="btn btn--sub btn--sm"
                onClick={() => editTrip(t.id)}
              >
                Edit trip
              </button>
            </div>
          ))}
          {!club.requests.length && !live.length ? (
            <div className="row">
              <span className="row__body muted">
                All quiet — nothing pending.
              </span>
            </div>
          ) : null}
        </div>
        <div className="divlabel mt6">About</div>
        <div className="card" style={{ padding: "16px 18px" }}>
          <div className="row__title" style={{ marginBottom: 4 }}>
            {club.category} · {joinPolicyLabel(club.joinPolicy)}
          </div>
          <div className="row__sub" style={{ lineHeight: 1.5 }}>
            {club.about}
          </div>
          {club.meets ? (
            <div className="row__sub mt2">
              <IconCalendar /> {club.meets}
            </div>
          ) : null}
        </div>
      </>
    );
  }

  // ---- Roster (solo blank state: empty-states.md web #8) ----
  function roster() {
    const solo = club.members.length <= 1;
    return (
      <>
        <p className="wiz__hint mt4">
          Change roles or remove members. Trip leads can publish adventures to
          the club; admins can do everything you can.
        </p>
        {solo ? (
          <EmptyBanner
            className="mt4"
            action={{
              label: "Create an Adventure",
              onClick: () => {
                dispatch({ type: "START_CREATE" });
                router.push("/create-adventure");
              },
            }}
          >
            Just you so far. Every club starts with one person who plans
            something.
          </EmptyBanner>
        ) : null}
        <div className="list">
          {club.members.map((m, idx) => (
            <MemberRow
              key={idx}
              member={m}
              onRole={(role: MemberRole) => {
                dispatch({
                  type: "SET_MEMBER_ROLE",
                  clubId: club.id,
                  index: idx,
                  role,
                });
                showToast(`${m.name} is now ${role}`);
              }}
              onRemove={() => {
                dispatch({ type: "REMOVE_MEMBER", clubId: club.id, index: idx });
                showToast(`${m.name} removed from ${club.name}`);
              }}
            />
          ))}
          <button
            type="button"
            className="addrow"
            onClick={() =>
              showToast("Invite link copied — send it to anyone")
            }
          >
            <IconLink /> Copy invite link
          </button>
        </div>
      </>
    );
  }

  // ---- Requests (blank state: empty-states.md web #7) ----
  function requests() {
    return (
      <>
        <p className="wiz__hint mt4">
          People asking to join {club.name}. Approving adds them to the roster as
          a member.
        </p>
        {club.requests.length ? (
          <div className="list">
            {club.requests.map((name, idx) => (
              <RequestRow
                key={idx}
                name={name}
                onApprove={() => {
                  dispatch({
                    type: "APPROVE_REQUEST",
                    clubId: club.id,
                    index: idx,
                  });
                  showToast(`${name} added to ${club.name}`);
                }}
                onDeny={() => {
                  dispatch({
                    type: "DENY_REQUEST",
                    clubId: club.id,
                    index: idx,
                  });
                  showToast(`Request from ${name} denied`);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyBanner className="mt4">
            No join requests waiting. Share the club page and they&apos;ll come.
          </EmptyBanner>
        )}
      </>
    );
  }

  // ---- Adventures ----
  function trips() {
    return (
      <>
        <p className="wiz__hint mt4">Adventures published to {club.name}.</p>
        <div className="list">
          {clubTrips.length ? (
            clubTrips.map((t) => (
              <div className="row" key={t.id}>
                <span className="row__body">
                  <span className="row__title">{t.adv.name}</span>
                  <span className="row__sub">
                    {fmtDate(t.adv.dateStart)}–{fmtDate(t.adv.dateEnd)} ·{" "}
                    {t.signups}/{t.adv.capacity} joined · {t.status}
                  </span>
                </span>
                <button
                  type="button"
                  className="btn btn--sub btn--sm"
                  onClick={() => editTrip(t.id)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <div className="row">
              <span className="row__body muted">
                No adventures for this club yet.
              </span>
            </div>
          )}
          <button type="button" className="addrow" onClick={newTripForClub}>
            <IconPlus /> Create an adventure for {club.name}
          </button>
        </div>
      </>
    );
  }

  // ---- Settings ----
  function settings() {
    return (
      <>
        <p className="wiz__hint mt4">
          Changes save as you type and go live to members immediately.
        </p>
        <div className="form-grid" style={{ maxWidth: 640 }}>
          <div className="field-group span2">
            <label className="label" htmlFor="club-set-name">
              Club name
            </label>
            <input
              id="club-set-name"
              className="field"
              value={club.name}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CLUB",
                  clubId: club.id,
                  patch: { name: e.target.value },
                })
              }
            />
          </div>
          <div className="field-group span2">
            <label className="label" htmlFor="club-set-about">
              Description
            </label>
            <textarea
              id="club-set-about"
              className="field"
              value={club.about}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CLUB",
                  clubId: club.id,
                  patch: { about: e.target.value },
                })
              }
            />
          </div>
          <div className="field-group span2">
            <label className="label" htmlFor="club-set-meets">
              When &amp; where you meet
            </label>
            <input
              id="club-set-meets"
              className="field"
              value={club.meets}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CLUB",
                  clubId: club.id,
                  patch: { meets: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="divlabel">Join policy</div>
        <div className="chiprow">
          {JOIN_POLICIES.map((p) => (
            <button
              type="button"
              key={p}
              className={`chip ${club.joinPolicy === p ? "on" : ""}`}
              onClick={() =>
                dispatch({
                  type: "UPDATE_CLUB",
                  clubId: club.id,
                  patch: { joinPolicy: p },
                })
              }
            >
              {joinPolicyLabel(p)}
            </button>
          ))}
        </div>
        <DuesSettings
          duesOn={club.duesOn}
          dues={club.dues}
          onToggle={() =>
            dispatch({
              type: "UPDATE_CLUB",
              clubId: club.id,
              patch: { duesOn: !club.duesOn },
            })
          }
          onDues={(dues) =>
            dispatch({ type: "UPDATE_CLUB", clubId: club.id, patch: { dues } })
          }
          listMaxWidth={640}
        />
        <div className="divlabel">Danger zone</div>
        <div className="list" style={{ maxWidth: 640 }}>
          <div className="row">
            <span className="row__body">
              <span className="row__title">Archive this club</span>
              <span className="row__sub">
                Hides it from the app. Members keep their trip history.
              </span>
            </span>
            {/* TODO: backend seam — archive club. */}
            <button
              type="button"
              className="btn btn--ghost btn--sm btn--danger"
              onClick={() => showToast("Archiving is stubbed in the wireframe")}
            >
              Archive
            </button>
          </div>
        </div>
      </>
    );
  }

  function tabBody() {
    switch (clubTab) {
      case "roster":
        return roster();
      case "requests":
        return requests();
      case "trips":
        return trips();
      case "settings":
        return settings();
      default:
        return overview();
    }
  }

  return (
    <StudioPage>
      <div className="wiz__eyebrow">Admin</div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h1 className="wiz__title" style={{ marginBottom: 0 }}>
          {club.name}
        </h1>
        {adminClubs.length > 1 ? (
          <div className="chiprow">
            {adminClubs.map((c) => (
              <button
                type="button"
                key={c.id}
                className={`chip ${c.id === club.id ? "on" : ""}`}
                onClick={() =>
                  dispatch({ type: "SET_MANAGE_CLUB", clubId: c.id })
                }
              >
                {c.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="tabrow mt4">
        {tabs.map(([k, l]) => (
          <button
            type="button"
            key={k}
            className={`tab ${clubTab === k ? "on" : ""}`}
            onClick={() => dispatch({ type: "SET_CLUB_TAB", tab: k })}
          >
            {l}
          </button>
        ))}
      </div>
      {tabBody()}
    </StudioPage>
  );
}
