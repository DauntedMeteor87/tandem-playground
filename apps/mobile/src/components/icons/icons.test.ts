// Asserts the icon module exports every glyph inventoried from Wireframe 0.4's
// `const I = { … }` set (app.js). If a wireframe glyph is dropped or renamed,
// this fails.
import { ICONS, ICON_NAMES } from "./icons";

// The full inventory — the exact keys of the wireframe `I` object.
const INVENTORY = [
  "back",
  "chev",
  "down",
  "up",
  "left",
  "right",
  "person",
  "users",
  "plane",
  "edit",
  "bell",
  "home",
  "trips",
  "plan",
  "comm",
  "img",
  "cam",
  "search",
  "heart",
  "hearto",
  "cmt",
  "share",
  "expand",
  "check",
  "apple",
  "lock",
  "x",
  "plus",
  "pin",
  "cal",
  "patch",
  "smile",
  "flame",
  "clock",
  "flag",
  "shield",
  "chat",
  "map",
  "car",
  "tent",
  "money",
  "airdrop",
  "laptop",
] as const;

describe("icon module", () => {
  it("exports all 43 inventoried glyphs", () => {
    expect(ICON_NAMES).toHaveLength(INVENTORY.length);
    expect(new Set(ICON_NAMES)).toEqual(new Set(INVENTORY));
  });

  it("maps every inventoried name to a component", () => {
    for (const name of INVENTORY) {
      expect(typeof ICONS[name]).toBe("function");
    }
  });

  it("does not expose glyphs the wireframe never had", () => {
    for (const name of ICON_NAMES) {
      expect(INVENTORY).toContain(name);
    }
  });
});
