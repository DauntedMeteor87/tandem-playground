// Source: Wireframe 0.4 — the Plan → Activity flow (ACT_STEPS + the `U.plan` draft
// object + startActivity/actNext/actBack/planToggle/planCost/planHeads/planSeats/
// planPhoto/planDrop/planPickCrew/planDraftFriend/planPublic actions). The trip a
// member builds across the 8 wizard steps lives here as a React context + reducer
// so every step reads and writes the same draft, and the publish step can resolve
// which crew the trip lands in.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { CREWS } from "@/lib/demo-data";

/* ---------- Step order (wireframe ACT_STEPS). One screen renders the current step;
   the index lives in the reducer so back/next are a tested state transition. ---------- */
export const ACT_STEP_COUNT = 8;
export const LAST_STEP = ACT_STEP_COUNT - 1;

/* Which step indexes gate the "Continue" button (wireframe step.ready()). */
const PHOTOS_STEP = 6; // "Add photos" — at least one required
const PUBLISH_STEP = 7; // "Who can see it?" — a visibility must be chosen

/* Stepper increments per budget line (wireframe planCost step map). */
export const COST_STEP = { gas: 4, permits: 5, food: 6 } as const;
export type CostKey = keyof typeof COST_STEP;

/* Splitting only kicks in over $5 each (wireframe planBudget `enough`). */
export const SPLIT_MIN = 5;

export type Visibility = "" | "crew" | "draft" | "public";

/** The trip a member is building. Mirrors the wireframe `U.plan` plus the wizard
 * step index and the publish result. */
export type PlanDraft = {
  step: number;
  // step 1–5 — the written trip
  name: string;
  date: Date | null;
  dateNote: string;
  itinerary: string;
  describe: string;
  location: string;
  // step 6 — money & rides (two independent shelves)
  budgetOn: boolean;
  gas: number;
  permits: number;
  food: number;
  heads: number;
  rideOn: boolean;
  carSeats: number;
  // step 7 — photos (uris; at least one required)
  photos: string[];
  // step 8 — publish
  vis: Visibility;
  visCrew: string;
  visOpen: "" | "crew" | "draft";
  draftFriends: string[];
  repeat: boolean;
  // set on publish — where the trip landed
  published: PublishedTrip | null;
};

export type PublishedTrip = {
  crewId: string;
  crewName: string;
  /** Demo seed the crew-chat card renders from (wireframe hardcodes `bishop`). */
  tripId: string;
  kind: "Activity";
  draft: boolean;
};

/* Wireframe startActivity() seed values, verbatim. */
export const initialDraft: PlanDraft = {
  step: 0,
  name: "",
  date: null,
  dateNote: "",
  itinerary: "",
  describe: "",
  location: "",
  budgetOn: false,
  gas: 24,
  permits: 0,
  food: 0,
  heads: 6,
  rideOn: false,
  carSeats: 3,
  photos: [],
  vis: "",
  visCrew: "",
  visOpen: "",
  draftFriends: [],
  repeat: false,
  published: null,
};

export type PlanAction =
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_DATE"; value: Date }
  | { type: "SET_DATE_NOTE"; value: string }
  | { type: "SET_ITINERARY"; value: string }
  | { type: "SET_DESCRIBE"; value: string }
  | { type: "SET_LOCATION"; value: string }
  | { type: "TOGGLE_BUDGET" }
  | { type: "ADJ_COST"; key: CostKey; dir: 1 | -1 }
  | { type: "ADJ_HEADS"; dir: 1 | -1 }
  | { type: "TOGGLE_RIDE" }
  | { type: "ADJ_SEATS"; dir: 1 | -1 }
  | { type: "ADD_PHOTO"; uri: string }
  | { type: "REMOVE_PHOTO"; index: number }
  | { type: "OPEN_DROP"; which: "crew" | "draft" }
  | { type: "PICK_CREW"; id: string }
  | { type: "TOGGLE_DRAFT_FRIEND"; id: string }
  | { type: "PICK_PUBLIC" }
  | { type: "TOGGLE_REPEAT" }
  | { type: "PUBLISH" };

const MAX_PHOTOS = 6; // wireframe planPhotos renders 6 slots
const MAX_SEATS = 7; // wireframe planSeats clamps 1..7

const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n));

export function reducer(state: PlanDraft, action: PlanAction): PlanDraft {
  switch (action.type) {
    case "NEXT":
      return { ...state, step: clamp(state.step + 1, 0, LAST_STEP) };
    case "BACK":
      return { ...state, step: clamp(state.step - 1, 0, LAST_STEP) };
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_DATE":
      return { ...state, date: action.value };
    case "SET_DATE_NOTE":
      return { ...state, dateNote: action.value };
    case "SET_ITINERARY":
      return { ...state, itinerary: action.value };
    case "SET_DESCRIBE":
      return { ...state, describe: action.value };
    case "SET_LOCATION":
      return { ...state, location: action.value };
    case "TOGGLE_BUDGET":
      return { ...state, budgetOn: !state.budgetOn };
    case "ADJ_COST": {
      const step = COST_STEP[action.key];
      return { ...state, [action.key]: Math.max(0, state[action.key] + action.dir * step) };
    }
    case "ADJ_HEADS":
      return { ...state, heads: Math.max(1, state.heads + action.dir) };
    case "TOGGLE_RIDE":
      return { ...state, rideOn: !state.rideOn };
    case "ADJ_SEATS":
      return { ...state, carSeats: clamp(state.carSeats + action.dir, 1, MAX_SEATS) };
    case "ADD_PHOTO":
      if (state.photos.length >= MAX_PHOTOS) return state;
      return { ...state, photos: [...state.photos, action.uri] };
    case "REMOVE_PHOTO":
      return { ...state, photos: state.photos.filter((_, i) => i !== action.index) };
    case "OPEN_DROP":
      // wireframe planDrop: tapping the open drop closes it (accordion).
      return { ...state, visOpen: state.visOpen === action.which ? "" : action.which };
    case "PICK_CREW":
      return { ...state, vis: "crew", visCrew: action.id, visOpen: "" };
    case "TOGGLE_DRAFT_FRIEND": {
      const has = state.draftFriends.includes(action.id);
      const draftFriends = has
        ? state.draftFriends.filter((f) => f !== action.id)
        : [...state.draftFriends, action.id];
      // wireframe: adding a friend selects "draft"; emptying it clears the choice
      // only if it was "draft" (a crew/public pick is left alone).
      const vis: Visibility = draftFriends.length > 0 ? "draft" : state.vis === "draft" ? "" : state.vis;
      return { ...state, draftFriends, vis };
    }
    case "PICK_PUBLIC":
      return { ...state, vis: "public", visOpen: "" };
    case "TOGGLE_REPEAT":
      return { ...state, repeat: !state.repeat };
    case "PUBLISH": {
      const target = publishTarget(state);
      return {
        ...state,
        published: { ...target, tripId: "bishop", kind: "Activity" },
      };
    }
    default:
      return state;
  }
}

/* ---------- Pure selectors (used by the components + the wizard + tests) ---------- */

/** Sum of the three budget lines. */
export const budgetTotal = (s: Pick<PlanDraft, "gas" | "permits" | "food">): number =>
  s.gas + s.permits + s.food;

/** Estimated reimbursement per head (wireframe: round(total / heads)). */
export const perHead = (s: Pick<PlanDraft, "gas" | "permits" | "food" | "heads">): number =>
  s.heads > 0 ? Math.round(budgetTotal(s) / s.heads) : 0;

/** $5+ each → show the reimbursement; anything under → the "buy you a coffee" nudge. */
export const splitIsEnough = (s: Pick<PlanDraft, "gas" | "permits" | "food" | "heads">): boolean =>
  perHead(s) >= SPLIT_MIN;

/** There's a cost to split but it's too little to bother (drives the nudge copy). */
export const showsNudge = (s: Pick<PlanDraft, "gas" | "permits" | "food" | "heads">): boolean =>
  budgetTotal(s) > 0 && !splitIsEnough(s);

/** The current step's Continue gate (wireframe ACT_STEPS[i].ready). */
export function canContinue(s: PlanDraft): boolean {
  if (s.step === PHOTOS_STEP) return s.photos.length >= 1;
  if (s.step === PUBLISH_STEP) return s.vis !== "";
  return true;
}

/** Where the published trip lands (wireframe actNext publish branch). Public and
 * the default both land in Moonlight Crew for the demo; a drafted crew becomes a
 * fresh "Sunset Crew". Pure so the screen can navigate before the dispatch lands. */
export function publishTarget(s: PlanDraft): { crewId: string; crewName: string; draft: boolean } {
  if (s.vis === "crew" && s.visCrew && CREWS[s.visCrew]) {
    return { crewId: s.visCrew, crewName: CREWS[s.visCrew].name, draft: false };
  }
  if (s.vis === "draft") {
    return { crewId: "draft", crewName: "Sunset Crew", draft: true };
  }
  return { crewId: "moon", crewName: CREWS.moon.name, draft: false };
}

/* ---------- Context ---------- */
type PlanContextValue = {
  draft: PlanDraft;
  dispatch: React.Dispatch<PlanAction>;
};

const PlanContext = React.createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [draft, dispatch] = React.useReducer(reducer, initialDraft);
  return <PlanContext.Provider value={{ draft, dispatch }}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = React.useContext(PlanContext);
  if (ctx === null) {
    throw new Error("usePlan must be used inside <PlanProvider>.");
  }
  return ctx;
}
