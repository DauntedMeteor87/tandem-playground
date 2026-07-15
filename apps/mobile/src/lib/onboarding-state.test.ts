// Covers every onboarding reducer action plus the photos-required and read-only
// rules. Pure data — no components, navigation, or reanimated.
import {
  reducer,
  initialDraft,
  isPhotosComplete,
  isReadOnly,
  MAX_ACTIVITIES,
  MAX_EXTRAS,
  EXPERIENCE_MAX,
  type OnboardingDraft,
} from "./onboarding-state";

const make = (over: Partial<OnboardingDraft> = {}): OnboardingDraft => ({ ...initialDraft, ...over });

describe("onboarding reducer — text fields", () => {
  it("SET_NAME / SET_YEAR / SET_MAJOR / SET_HOMETOWN / SET_BIO / SET_PROMPT_TEXT set their field", () => {
    expect(reducer(make(), { type: "SET_NAME", value: "Kai" }).name).toBe("Kai");
    expect(reducer(make(), { type: "SET_YEAR", value: "Freshman" }).year).toBe("Freshman");
    expect(reducer(make(), { type: "SET_MAJOR", value: "Kinesiology" }).major).toBe("Kinesiology");
    expect(reducer(make(), { type: "SET_HOMETOWN", value: "Bend, OR" }).hometown).toBe("Bend, OR");
    expect(reducer(make(), { type: "SET_BIO", value: "hi" }).bio).toBe("hi");
    expect(reducer(make(), { type: "SET_PROMPT_TEXT", value: "tacos" }).promptText).toBe("tacos");
  });

  it("does not mutate the previous state", () => {
    const prev = make();
    reducer(prev, { type: "SET_NAME", value: "Kai" });
    expect(prev.name).toBe("");
  });
});

describe("onboarding reducer — activities (ob-about, cap 5)", () => {
  it("TOGGLE_ACTIVITY adds then removes", () => {
    const added = reducer(make(), { type: "TOGGLE_ACTIVITY", value: "Surfing" });
    expect(added.activities).toEqual(["Surfing"]);
    const removed = reducer(added, { type: "TOGGLE_ACTIVITY", value: "Surfing" });
    expect(removed.activities).toEqual([]);
  });

  it("ignores a new pick once at the cap", () => {
    const full = make({ activities: ["a", "b", "c", "d", "e"] });
    expect(full.activities).toHaveLength(MAX_ACTIVITIES);
    const next = reducer(full, { type: "TOGGLE_ACTIVITY", value: "f" });
    expect(next).toBe(full); // unchanged
  });

  it("still removes when at the cap", () => {
    const full = make({ activities: ["a", "b", "c", "d", "e"] });
    expect(reducer(full, { type: "TOGGLE_ACTIVITY", value: "a" }).activities).toEqual(["b", "c", "d", "e"]);
  });
});

describe("onboarding reducer — experience ratings (0..5)", () => {
  it("SET_EXPERIENCE stores per-activity values", () => {
    const next = reducer(make(), { type: "SET_EXPERIENCE", name: "Camping", value: 3 });
    expect(next.experience).toEqual({ Camping: 3 });
  });

  it("clamps above the max and below zero", () => {
    expect(reducer(make(), { type: "SET_EXPERIENCE", name: "Camping", value: 9 }).experience.Camping).toBe(EXPERIENCE_MAX);
    expect(reducer(make(), { type: "SET_EXPERIENCE", name: "Camping", value: -4 }).experience.Camping).toBe(0);
  });
});

describe("onboarding reducer — photos (ob-photos)", () => {
  it("SET_PFP and SET_MAIN_PHOTO store uris and can clear", () => {
    const withPfp = reducer(make(), { type: "SET_PFP", uri: "file://pfp.jpg" });
    expect(withPfp.pfp).toBe("file://pfp.jpg");
    expect(reducer(withPfp, { type: "SET_PFP", uri: null }).pfp).toBeNull();
    expect(reducer(make(), { type: "SET_MAIN_PHOTO", uri: "file://main.jpg" }).mainPhoto).toBe("file://main.jpg");
  });

  it("ADD_EXTRA appends up to the cap, REMOVE_EXTRA drops by index", () => {
    let s = reducer(make(), { type: "ADD_EXTRA", uri: "a" });
    s = reducer(s, { type: "ADD_EXTRA", uri: "b" });
    expect(s.extras).toEqual(["a", "b"]);
    expect(s.extras).toHaveLength(MAX_EXTRAS);
    const capped = reducer(s, { type: "ADD_EXTRA", uri: "c" });
    expect(capped).toBe(s); // unchanged at the cap
    expect(reducer(s, { type: "REMOVE_EXTRA", index: 0 }).extras).toEqual(["b"]);
  });

  it("isPhotosComplete requires both the profile pic and the main photo", () => {
    expect(isPhotosComplete(initialDraft)).toBe(false);
    expect(isPhotosComplete(make({ pfp: "a" }))).toBe(false);
    expect(isPhotosComplete(make({ mainPhoto: "b" }))).toBe(false);
    expect(isPhotosComplete(make({ pfp: "a", mainPhoto: "b" }))).toBe(true);
  });
});

describe("onboarding reducer — bio prompt (ob-bio)", () => {
  it("TOGGLE_PROMPT selects, then clears when tapped again", () => {
    const picked = reducer(make(), { type: "TOGGLE_PROMPT", value: "My ideal Saturday is…" });
    expect(picked.prompt).toBe("My ideal Saturday is…");
    expect(reducer(picked, { type: "TOGGLE_PROMPT", value: "My ideal Saturday is…" }).prompt).toBe("");
  });

  it("switches directly to a different prompt", () => {
    const picked = reducer(make(), { type: "TOGGLE_PROMPT", value: "Ask me about…" });
    expect(reducer(picked, { type: "TOGGLE_PROMPT", value: "I geek out over…" }).prompt).toBe("I geek out over…");
  });
});

describe("onboarding reducer — verify (ob-verify) + read-only mode", () => {
  it("VERIFY marks verified, SKIP_VERIFY marks skipped", () => {
    expect(reducer(make(), { type: "VERIFY" }).verify).toBe("verified");
    expect(reducer(make(), { type: "SKIP_VERIFY" }).verify).toBe("skipped");
  });

  it("isReadOnly is true until verified", () => {
    expect(isReadOnly(make({ verify: "pending" }))).toBe(true);
    expect(isReadOnly(make({ verify: "skipped" }))).toBe(true);
    expect(isReadOnly(make({ verify: "verified" }))).toBe(false);
  });
});
