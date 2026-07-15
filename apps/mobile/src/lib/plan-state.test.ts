// Covers the Plan → Activity reducer: the wizard step flow, the budget math and its
// $5-a-head nudge threshold, the photos-required gate, and publish → crew landing.
// Pure data — no components or navigation.
import {
  reducer,
  initialDraft,
  budgetTotal,
  perHead,
  splitIsEnough,
  showsNudge,
  canContinue,
  publishTarget,
  ACT_STEP_COUNT,
  LAST_STEP,
  SPLIT_MIN,
  type PlanDraft,
} from "./plan-state";
import { CREWS } from "./demo-data";

const make = (over: Partial<PlanDraft> = {}): PlanDraft => ({ ...initialDraft, ...over });

describe("plan reducer — step flow", () => {
  it("has 8 steps, last index 7", () => {
    expect(ACT_STEP_COUNT).toBe(8);
    expect(LAST_STEP).toBe(7);
  });

  it("NEXT advances and BACK retreats", () => {
    expect(reducer(make({ step: 2 }), { type: "NEXT" }).step).toBe(3);
    expect(reducer(make({ step: 2 }), { type: "BACK" }).step).toBe(1);
  });

  it("clamps at the first and last step", () => {
    expect(reducer(make({ step: 0 }), { type: "BACK" }).step).toBe(0);
    expect(reducer(make({ step: LAST_STEP }), { type: "NEXT" }).step).toBe(LAST_STEP);
  });

  it("does not mutate the previous state", () => {
    const prev = make({ step: 1 });
    reducer(prev, { type: "NEXT" });
    expect(prev.step).toBe(1);
  });
});

describe("plan reducer — budget steppers", () => {
  it("ADJ_COST moves each line by its own step (gas 4 / permits 5 / food 6), floored at 0", () => {
    expect(reducer(make({ gas: 24 }), { type: "ADJ_COST", key: "gas", dir: 1 }).gas).toBe(28);
    expect(reducer(make({ gas: 24 }), { type: "ADJ_COST", key: "gas", dir: -1 }).gas).toBe(20);
    expect(reducer(make({ permits: 0 }), { type: "ADJ_COST", key: "permits", dir: 1 }).permits).toBe(5);
    expect(reducer(make({ food: 0 }), { type: "ADJ_COST", key: "food", dir: 1 }).food).toBe(6);
    expect(reducer(make({ permits: 0 }), { type: "ADJ_COST", key: "permits", dir: -1 }).permits).toBe(0);
  });

  it("ADJ_HEADS stays at least 1; ADJ_SEATS clamps 1..7", () => {
    expect(reducer(make({ heads: 6 }), { type: "ADJ_HEADS", dir: 1 }).heads).toBe(7);
    expect(reducer(make({ heads: 1 }), { type: "ADJ_HEADS", dir: -1 }).heads).toBe(1);
    expect(reducer(make({ carSeats: 7 }), { type: "ADJ_SEATS", dir: 1 }).carSeats).toBe(7);
    expect(reducer(make({ carSeats: 1 }), { type: "ADJ_SEATS", dir: -1 }).carSeats).toBe(1);
  });
});

describe("plan budget — math + the $5 nudge threshold", () => {
  it("sums the three lines and rounds per head", () => {
    expect(budgetTotal(make({ gas: 24, permits: 0, food: 0 }))).toBe(24);
    expect(perHead(make({ gas: 24, heads: 6 }))).toBe(4); // 24 / 6
    expect(perHead(make({ gas: 29, heads: 6 }))).toBe(5); // 4.83 rounds to 5
  });

  it("under $5 a head nudges (buy you a coffee); $5+ shows the reimbursement", () => {
    expect(SPLIT_MIN).toBe(5);
    const under = make({ gas: 24, permits: 0, food: 0, heads: 6 }); // $4 each
    expect(splitIsEnough(under)).toBe(false);
    expect(showsNudge(under)).toBe(true);

    const over = make({ gas: 30, permits: 0, food: 0, heads: 6 }); // $5 each
    expect(splitIsEnough(over)).toBe(true);
    expect(showsNudge(over)).toBe(false);
  });

  it("shows neither output when there's no cost to split", () => {
    const none = make({ gas: 0, permits: 0, food: 0, heads: 6 });
    expect(budgetTotal(none)).toBe(0);
    expect(showsNudge(none)).toBe(false);
    expect(splitIsEnough(none)).toBe(false);
  });
});

describe("plan reducer — photos gate", () => {
  it("ADD_PHOTO appends up to 6, REMOVE_PHOTO drops by index", () => {
    let s = reducer(make(), { type: "ADD_PHOTO", uri: "a" });
    expect(s.photos).toEqual(["a"]);
    const full = make({ photos: ["a", "b", "c", "d", "e", "f"] });
    expect(reducer(full, { type: "ADD_PHOTO", uri: "g" })).toBe(full); // capped
    expect(reducer(make({ photos: ["a", "b"] }), { type: "REMOVE_PHOTO", index: 0 }).photos).toEqual(["b"]);
  });

  it("the photos step needs at least one photo to continue", () => {
    expect(canContinue(make({ step: 6, photos: [] }))).toBe(false);
    expect(canContinue(make({ step: 6, photos: ["a"] }))).toBe(true);
  });
});

describe("plan reducer — publish visibility + landing", () => {
  it("selecting a crew / draft friends / public sets visibility", () => {
    expect(reducer(make(), { type: "PICK_CREW", id: "beach" })).toMatchObject({ vis: "crew", visCrew: "beach", visOpen: "" });
    expect(reducer(make(), { type: "PICK_PUBLIC" }).vis).toBe("public");
    const added = reducer(make(), { type: "TOGGLE_DRAFT_FRIEND", id: "maya" });
    expect(added.vis).toBe("draft");
    expect(added.draftFriends).toEqual(["maya"]);
    // removing the last drafted friend clears the draft choice
    expect(reducer(added, { type: "TOGGLE_DRAFT_FRIEND", id: "maya" }).vis).toBe("");
  });

  it("the publish step needs a visibility chosen to continue", () => {
    expect(canContinue(make({ step: 7, vis: "" }))).toBe(false);
    expect(canContinue(make({ step: 7, vis: "public" }))).toBe(true);
  });

  it("publishTarget routes crew / draft / public to the right crew", () => {
    expect(publishTarget(make({ vis: "crew", visCrew: "beach" }))).toEqual({
      crewId: "beach",
      crewName: CREWS.beach.name,
      draft: false,
    });
    expect(publishTarget(make({ vis: "draft" }))).toEqual({ crewId: "draft", crewName: "Sunset Crew", draft: true });
    expect(publishTarget(make({ vis: "public" }))).toEqual({
      crewId: "moon",
      crewName: CREWS.moon.name,
      draft: false,
    });
  });

  it("PUBLISH records where the trip landed (demo seed trip = bishop)", () => {
    const published = reducer(make({ vis: "crew", visCrew: "beach" }), { type: "PUBLISH" }).published;
    expect(published).toEqual({
      crewId: "beach",
      crewName: CREWS.beach.name,
      tripId: "bishop",
      kind: "Activity",
      draft: false,
    });
  });
});
