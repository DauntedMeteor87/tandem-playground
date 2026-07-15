// Source: Wireframe 0.2 — the global `S` / `ADV` / `NC` mutables in app.js,
// re-expressed as React context + useReducer. One provider covers Studio
// navigation, the active Adventure draft (ADV) and Club draft (NC), the
// entry modes (edit / clone), and the demo admin gate (isClubAdmin).
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  STEPS,
  CLUB_STEPS,
  CREWS,
  freshAdventure,
  freshClub,
  makeClub,
  makePublishedTrip,
  seedClubs,
  seedPublishedTrips,
  visLabelFor,
  adminClubs as adminClubsOf,
  isClubAdmin as isClubAdminOf,
  type Adventure,
  type AdventureStep,
  type Club,
  type ClubDraft,
  type ClubStep,
  type JoinPolicy,
  type MemberRole,
  type PublishedTrip,
  type StudioView,
  type TripStatus,
} from "@/lib/data";

export type PreviewTab = "overview" | "details" | "rides";
export type ClubTab = "overview" | "roster" | "requests" | "trips" | "settings";

/** The whole of `S` + the active drafts, plus the demo data the gate and
 *  Home dashboard read. Field names mirror `S`; `S.published` (the
 *  confirmation flag) is renamed `confirmed` to free up `publishedTrips`
 *  for the trip list (the old `PUBLISHED` array). */
export interface StudioState {
  view: StudioView;
  // adventure wizard
  step: AdventureStep;
  visited: AdventureStep[];
  previewTab: PreviewTab;
  publishOpen: boolean;
  confirmed: boolean; // was S.published — the "published!" confirmation screen
  editingId: string | null;
  cloneSource: string | null;
  // clone browser
  cloneFilter: string;
  // club wizard
  clubStep: ClubStep;
  clubCreated: boolean;
  // manage club
  manageClubId: string | null;
  clubTab: ClubTab;
  // active drafts
  adv: Adventure; // ADV
  nc: ClubDraft; // NC
  // demo data (mutable in state so W2/W3 can edit it)
  clubs: Club[];
  publishedTrips: PublishedTrip[];
}

export type StudioAction =
  | { type: "SET_VIEW"; view: StudioView }
  // entry points into the Adventure wizard
  | { type: "START_CREATE" }
  | { type: "START_EDIT"; tripId: string }
  | { type: "START_CLONE"; adv: Adventure; sourceName: string }
  | { type: "START_CREATE_FOR_CLUB"; clubId: string }
  // adventure wizard step nav
  | { type: "GO_STEP"; step: AdventureStep }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET_WIZARD" }
  | { type: "SET_PREVIEW_TAB"; tab: PreviewTab }
  // adventure draft edits — one action replaces the whole draft with the
  // next immutable version the step computed (the wireframe mutated ADV in
  // place; here every field/list/toggle edit routes through this).
  | { type: "SET_ADV"; adv: Adventure }
  | { type: "SET_PUBLISH_OPEN"; open: boolean }
  | { type: "PUBLISH" } // doPublish(): snapshot ADV into publishedTrips + confirm
  | { type: "SAVE_EDITS" } // saveEdits(): write ADV back to the edited trip
  | { type: "CANCEL_EDITS" } // cancelEdits(): drop the edit, keep the trip as-is
  // manage adventures — the published-trip list row actions
  | { type: "SET_TRIP_STATUS"; tripId: string; status: TripStatus } // (un)publish
  | { type: "DELETE_TRIP"; tripId: string }
  // clone browser
  | { type: "SET_CLONE_FILTER"; filter: string }
  // club wizard
  | { type: "START_CREATE_CLUB" }
  | { type: "GO_CLUB_STEP"; step: ClubStep }
  | { type: "NEXT_CLUB_STEP" }
  | { type: "PREV_CLUB_STEP" }
  | { type: "SET_NC"; nc: ClubDraft } // club-draft edits (analog of SET_ADV)
  | { type: "CREATE_CLUB" } // doCreateClub(): append the new admin club
  | { type: "RESET_CLUB_WIZARD" } // fresh draft on re-entry / after confirmation
  // manage club
  | { type: "SET_MANAGE_CLUB"; clubId: string }
  | { type: "SET_CLUB_TAB"; tab: ClubTab }
  | { type: "UPDATE_CLUB"; clubId: string; patch: Partial<Club> } // settings edits
  | { type: "SET_MEMBER_ROLE"; clubId: string; index: number; role: MemberRole }
  | { type: "REMOVE_MEMBER"; clubId: string; index: number }
  | { type: "APPROVE_REQUEST"; clubId: string; index: number } // → roster
  | { type: "DENY_REQUEST"; clubId: string; index: number };

/** Fresh-wizard fields — the wireframe's resetWizard(). */
function resetWizardFields(): Pick<
  StudioState,
  "step" | "visited" | "previewTab" | "publishOpen" | "confirmed"
> {
  return {
    step: "basics",
    visited: ["basics"],
    previewTab: "overview",
    publishOpen: false,
    confirmed: false,
  };
}

function addVisited(visited: AdventureStep[], step: AdventureStep): AdventureStep[] {
  return visited.includes(step) ? visited : [...visited, step];
}

/** Immutably replace one club in the roster by id (the wireframe reached into
 *  the global CLUBS array and mutated in place; here every roster/settings edit
 *  routes through this). */
function mapClub(
  state: StudioState,
  clubId: string,
  fn: (club: Club) => Club,
): StudioState {
  return {
    ...state,
    clubs: state.clubs.map((c) => (c.id === clubId ? fn(c) : c)),
  };
}

function reducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.view };

    case "START_CREATE":
      return {
        ...state,
        adv: freshAdventure(),
        editingId: null,
        cloneSource: null,
        view: "create",
        ...resetWizardFields(),
      };

    case "START_EDIT": {
      const entry = state.publishedTrips.find((t) => t.id === action.tripId);
      if (!entry) return state;
      return {
        ...state,
        adv: structuredClone(entry.adv),
        editingId: entry.id,
        cloneSource: null,
        view: "create",
        ...resetWizardFields(),
      };
    }

    case "START_CLONE": {
      const adv = structuredClone(action.adv);
      adv.dateStart = "";
      adv.dateEnd = "";
      adv.permit.link = "";
      return {
        ...state,
        adv,
        cloneSource: action.sourceName,
        editingId: null,
        view: "create",
        ...resetWizardFields(),
      };
    }

    case "START_CREATE_FOR_CLUB": {
      const adv = freshAdventure();
      adv.visType = "club";
      adv.visId = action.clubId;
      return {
        ...state,
        adv,
        editingId: null,
        cloneSource: null,
        view: "create",
        ...resetWizardFields(),
      };
    }

    case "GO_STEP":
      return {
        ...state,
        step: action.step,
        visited: addVisited(state.visited, action.step),
      };

    case "NEXT_STEP": {
      const i = STEPS.indexOf(state.step);
      if (i >= STEPS.length - 1) return state;
      const step = STEPS[i + 1];
      return { ...state, step, visited: addVisited(state.visited, step) };
    }

    case "PREV_STEP": {
      const i = STEPS.indexOf(state.step);
      if (i <= 0) return state;
      const step = STEPS[i - 1];
      return { ...state, step, visited: addVisited(state.visited, step) };
    }

    case "RESET_WIZARD":
      return { ...state, ...resetWizardFields() };

    case "SET_PREVIEW_TAB":
      return { ...state, previewTab: action.tab };

    case "SET_ADV":
      return { ...state, adv: action.adv };

    case "SET_PUBLISH_OPEN":
      return { ...state, publishOpen: action.open };

    case "PUBLISH": {
      // doPublish(): a fresh live row lands at the top of the list, the
      // confirmation screen takes over, and the clone origin is cleared.
      const entry = makePublishedTrip(
        structuredClone(state.adv),
        state.clubs,
        CREWS,
      );
      return {
        ...state,
        publishOpen: false,
        confirmed: true,
        cloneSource: null,
        publishedTrips: [entry, ...state.publishedTrips],
      };
    }

    case "SAVE_EDITS": {
      // saveEdits(): overwrite the live trip's snapshot; the wizard leaves
      // edit mode. Navigation + the "changes saved" toast happen in the view.
      if (!state.editingId) return state;
      const publishedTrips = state.publishedTrips.map((t) =>
        t.id === state.editingId
          ? {
              ...t,
              adv: structuredClone(state.adv),
              visLabel: visLabelFor(state.adv, state.clubs, CREWS),
            }
          : t,
      );
      return { ...state, publishedTrips, editingId: null };
    }

    case "CANCEL_EDITS":
      return { ...state, editingId: null };

    case "SET_TRIP_STATUS":
      // unpublishTrip()/republishTrip(): flip a live trip in/out of Trip Signups
      // without deleting it. Home + Manage both read publishedTrips, so this
      // reflects everywhere.
      return {
        ...state,
        publishedTrips: state.publishedTrips.map((t) =>
          t.id === action.tripId ? { ...t, status: action.status } : t,
        ),
      };

    case "DELETE_TRIP":
      // deleteTrip(): drop the row entirely.
      return {
        ...state,
        publishedTrips: state.publishedTrips.filter(
          (t) => t.id !== action.tripId,
        ),
      };

    case "SET_CLONE_FILTER":
      return { ...state, cloneFilter: action.filter };

    case "START_CREATE_CLUB":
      return {
        ...state,
        nc: freshClub(),
        clubStep: "basics",
        clubCreated: false,
        view: "createClub",
      };

    case "SET_NC":
      return { ...state, nc: action.nc };

    case "CREATE_CLUB": {
      // doCreateClub(): the new club lands at the end of the roster (so the
      // confirmation screen can read it), the confirmation flag takes over.
      const club = makeClub(state.nc);
      return { ...state, clubs: [...state.clubs, club], clubCreated: true };
    }

    case "RESET_CLUB_WIZARD":
      return {
        ...state,
        nc: freshClub(),
        clubStep: "basics",
        clubCreated: false,
      };

    case "GO_CLUB_STEP":
      return { ...state, clubStep: action.step };

    case "NEXT_CLUB_STEP": {
      const i = CLUB_STEPS.indexOf(state.clubStep);
      if (i >= CLUB_STEPS.length - 1) return state;
      return { ...state, clubStep: CLUB_STEPS[i + 1] };
    }

    case "PREV_CLUB_STEP": {
      const i = CLUB_STEPS.indexOf(state.clubStep);
      if (i <= 0) return state;
      return { ...state, clubStep: CLUB_STEPS[i - 1] };
    }

    case "SET_MANAGE_CLUB":
      return { ...state, manageClubId: action.clubId, clubTab: "overview" };

    case "SET_CLUB_TAB":
      return { ...state, clubTab: action.tab };

    case "UPDATE_CLUB":
      // clubSettings() field edits, join-policy chips, and the dues toggle all
      // route through here (the wireframe's editClub:* binds + toggleClubDues).
      return mapClub(state, action.clubId, (c) => ({ ...c, ...action.patch }));

    case "SET_MEMBER_ROLE":
      return mapClub(state, action.clubId, (c) => ({
        ...c,
        members: c.members.map((m, i) =>
          i === action.index ? { ...m, role: action.role } : m,
        ),
      }));

    case "REMOVE_MEMBER":
      return mapClub(state, action.clubId, (c) => ({
        ...c,
        members: c.members.filter((_, i) => i !== action.index),
      }));

    case "APPROVE_REQUEST":
      // approveRequest(): pull the request and add them to the roster as a member.
      return mapClub(state, action.clubId, (c) => {
        const name = c.requests[action.index];
        if (name === undefined) return c;
        return {
          ...c,
          requests: c.requests.filter((_, i) => i !== action.index),
          members: [...c.members, { name, role: "Member" }],
        };
      });

    case "DENY_REQUEST":
      return mapClub(state, action.clubId, (c) => ({
        ...c,
        requests: c.requests.filter((_, i) => i !== action.index),
      }));

    default:
      return state;
  }
}

function makeInitialState(
  clubs: Club[],
  publishedTrips: PublishedTrip[],
): StudioState {
  return {
    view: "home",
    step: "basics",
    visited: ["basics"],
    previewTab: "overview",
    publishOpen: false,
    confirmed: false,
    editingId: null,
    cloneSource: null,
    cloneFilter: "all",
    clubStep: "basics",
    clubCreated: false,
    manageClubId: null,
    clubTab: "overview",
    adv: freshAdventure(),
    nc: freshClub(),
    clubs,
    publishedTrips,
  };
}

/** A transient toast (the wireframe's toast()); `nonce` lets the same message
 *  re-fire and re-trigger the auto-dismiss timer. */
export interface Toast {
  message: string;
  nonce: number;
}

export interface StudioContextValue {
  state: StudioState;
  dispatch: Dispatch<StudioAction>;
  /** Demo gate — true if the user admins any club (wireframe isClubAdmin()). */
  isClubAdmin: boolean;
  /** Clubs the user admins (wireframe adminClubs()). */
  adminClubs: Club[];
  /** The current toast, or null. Rendered by <Toast> in the studio layout. */
  toast: Toast | null;
  /** Flash a toast (wireframe toast()) — "Draft saved", "Changes saved", etc. */
  showToast: (message: string) => void;
  /** Clear the toast (called by <Toast> when its timer elapses). */
  dismissToast: () => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({
  children,
  initialClubs,
  initialPublished,
}: {
  children: ReactNode;
  /** Override the seed clubs — used by tests to flip the admin gate. */
  initialClubs?: Club[];
  initialPublished?: PublishedTrip[];
}) {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    makeInitialState(
      initialClubs ?? seedClubs(),
      initialPublished ?? seedPublishedTrips(),
    ),
  );

  const [toast, setToast] = useState<Toast | null>(null);
  const showToast = useCallback(
    (message: string) => setToast({ message, nonce: Date.now() }),
    [],
  );
  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo<StudioContextValue>(
    () => ({
      state,
      dispatch,
      isClubAdmin: isClubAdminOf(state.clubs),
      adminClubs: adminClubsOf(state.clubs),
      toast,
      showToast,
      dismissToast,
    }),
    [state, toast, showToast, dismissToast],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error("useStudio must be used inside <StudioProvider>.");
  }
  return ctx;
}
