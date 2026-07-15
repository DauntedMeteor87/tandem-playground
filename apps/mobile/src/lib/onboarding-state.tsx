// Source: Wireframe 0.4 — FLOW 1 Onboarding (OB_STEPS + the `S.ob` draft object +
// the obGo / pickYear / toggleActivity / bumpExp / usePrompt / obVerify /
// obSkipVerify actions). The profile a member fills across the 8 steps lives here
// as a React context + reducer so every step reads and writes the same draft.
// TODO: Code Connect map once Figma frame exists.
import React from "react";

/* ---------- Step order (wireframe OB_STEPS, minus the `ob-` prefix so ids line up
   with the Expo Router file names name.tsx / year.tsx / …). ---------- */
export const OB_STEPS = [
  "name",
  "year",
  "basics",
  "about",
  "experience",
  "photos",
  "bio",
  "verify",
] as const;
export type ObStep = (typeof OB_STEPS)[number];

/* Route href per step. The `(onboarding)` group is path-transparent in Expo
   Router, so /name, /year, … are the real paths. */
export const OB_ROUTE: Record<ObStep, string> = {
  name: "/name",
  year: "/year",
  basics: "/basics",
  about: "/about",
  experience: "/experience",
  photos: "/photos",
  bio: "/bio",
  verify: "/verify",
};

/* Steps the wireframe marks `forced` — no Skip button. obShell() hides Skip when
   forced:true (ob-name); the ob-photos custom render shows an empty top-right
   slot instead of a Skip. Every other step is skippable. */
export const FORCED_STEPS: Record<ObStep, boolean> = {
  name: true,
  year: false,
  basics: false,
  about: false,
  experience: false,
  photos: true,
  bio: false,
  verify: false,
};

/* Caps carried verbatim from the wireframe. */
export const MAX_ACTIVITIES = 5; // ob-about "Pick up to 5"
export const EXPERIENCE_MAX = 5; // ob-experience ratings top out at "5+"
export const MAX_EXTRAS = 2; // ob-photos "2 optional extras"

export type VerifyStatus = "pending" | "verified" | "skipped";

export type OnboardingDraft = {
  name: string; // ob-name — first name
  year: string; // ob-year — Freshman…Grad
  major: string; // ob-basics
  hometown: string; // ob-basics (wireframe field name: `from`)
  activities: string[]; // ob-about — favorite modes, up to 5
  experience: Record<string, number>; // ob-experience — activity name -> 0..5
  pfp: string | null; // ob-photos — profile pic uri (required)
  mainPhoto: string | null; // ob-photos — main photo uri (required)
  extras: string[]; // ob-photos — up to 2 optional extra uris
  bio: string; // ob-bio — caption (<= 250)
  prompt: string; // ob-bio — selected prompt ("" = none)
  promptText: string; // ob-bio — prompt answer (<= 250)
  verify: VerifyStatus; // ob-verify — widened from the wireframe's `S.verified` boolean
};

export const initialDraft: OnboardingDraft = {
  name: "",
  year: "",
  major: "",
  hometown: "",
  activities: [],
  experience: {},
  pfp: null,
  mainPhoto: null,
  extras: [],
  bio: "",
  prompt: "",
  promptText: "",
  verify: "pending",
};

export type OnboardingAction =
  | { type: "SET_NAME"; value: string }
  | { type: "SET_YEAR"; value: string }
  | { type: "SET_MAJOR"; value: string }
  | { type: "SET_HOMETOWN"; value: string }
  | { type: "TOGGLE_ACTIVITY"; value: string }
  | { type: "SET_EXPERIENCE"; name: string; value: number }
  | { type: "SET_PFP"; uri: string | null }
  | { type: "SET_MAIN_PHOTO"; uri: string | null }
  | { type: "ADD_EXTRA"; uri: string }
  | { type: "REMOVE_EXTRA"; index: number }
  | { type: "SET_BIO"; value: string }
  | { type: "TOGGLE_PROMPT"; value: string }
  | { type: "SET_PROMPT_TEXT"; value: string }
  | { type: "VERIFY" }
  | { type: "SKIP_VERIFY" };

const clampRating = (n: number): number => Math.max(0, Math.min(EXPERIENCE_MAX, n));

export function reducer(state: OnboardingDraft, action: OnboardingAction): OnboardingDraft {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_YEAR":
      return { ...state, year: action.value };
    case "SET_MAJOR":
      return { ...state, major: action.value };
    case "SET_HOMETOWN":
      return { ...state, hometown: action.value };
    case "TOGGLE_ACTIVITY": {
      // wireframe toggleActivity: remove if present; otherwise add unless already
      // at the cap of 5 (where it toasts "Pick up to 5" and leaves state alone).
      if (state.activities.includes(action.value)) {
        return { ...state, activities: state.activities.filter((a) => a !== action.value) };
      }
      if (state.activities.length >= MAX_ACTIVITIES) return state;
      return { ...state, activities: [...state.activities, action.value] };
    }
    case "SET_EXPERIENCE":
      return { ...state, experience: { ...state.experience, [action.name]: clampRating(action.value) } };
    case "SET_PFP":
      return { ...state, pfp: action.uri };
    case "SET_MAIN_PHOTO":
      return { ...state, mainPhoto: action.uri };
    case "ADD_EXTRA":
      if (state.extras.length >= MAX_EXTRAS) return state;
      return { ...state, extras: [...state.extras, action.uri] };
    case "REMOVE_EXTRA":
      return { ...state, extras: state.extras.filter((_, i) => i !== action.index) };
    case "SET_BIO":
      return { ...state, bio: action.value };
    case "TOGGLE_PROMPT":
      // wireframe usePrompt: tapping the selected prompt again clears it.
      return { ...state, prompt: state.prompt === action.value ? "" : action.value };
    case "SET_PROMPT_TEXT":
      return { ...state, promptText: action.value };
    // ob-verify finish paths (obVerify / obSkipVerify).
    // TODO: backend seam — POST /me profile once auth exists. This is the submit
    // point: the draft is complete when the member finishes the verify step.
    case "VERIFY":
      return { ...state, verify: "verified" };
    case "SKIP_VERIFY":
      return { ...state, verify: "skipped" };
    default:
      return state;
  }
}

/* ob-photos is unskippable until both required photos exist
   (wireframe `ready = S.ob.pfp && S.ob.mainPhoto`). */
export const isPhotosComplete = (d: OnboardingDraft): boolean =>
  d.pfp !== null && d.mainPhoto !== null;

/* Read-only mode = anything other than a completed verification. The wireframe
   home shows the "Verify your school email" banner whenever `!S.verified`; both
   "pending" and "skipped" read as read-only for a later Home (Wave 3) to honor. */
export const isReadOnly = (d: OnboardingDraft): boolean => d.verify !== "verified";

type OnboardingContextValue = {
  draft: OnboardingDraft;
  dispatch: React.Dispatch<OnboardingAction>;
};

const OnboardingContext = React.createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, dispatch] = React.useReducer(reducer, initialDraft);
  return (
    <OnboardingContext.Provider value={{ draft, dispatch }}>{children}</OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = React.useContext(OnboardingContext);
  if (ctx === null) {
    throw new Error("useOnboarding must be used inside <OnboardingProvider>.");
  }
  return ctx;
}
