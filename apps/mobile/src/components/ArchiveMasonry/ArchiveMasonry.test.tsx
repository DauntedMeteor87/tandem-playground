// The masonry must split its tiles into two columns deterministically so the
// board renders identically every pass. Locks the greedy shortest-column packing
// against the wireframe's height pattern.
import React from "react";
import { render } from "@testing-library/react-native";
import { ArchiveMasonry, splitColumns, tileHeight, MASONRY_HEIGHTS, type ArchiveTile } from "./ArchiveMasonry";

const TILES: ArchiveTile[] = [
  { id: "a", title: "Yosemite Weekend", crew: "Moonlight Crew", posterInitials: "MP" },
  { id: "b", title: "Pismo Beach Cleanup", crew: "Surf Club", posterInitials: "TW" },
  { id: "c", title: "Bishop Peak Sunset", crew: "Cal Poly Hiking", posterInitials: "JR" },
  { id: "d", title: "Sykes Hot Springs", crew: "Field Studies", posterInitials: "KM" },
  { id: "e", title: "Mammoth Ski Weekend", crew: "Ski & Snowboard", posterInitials: "AL" },
];

describe("splitColumns", () => {
  it("packs the wireframe height pattern into balanced columns (ties break left)", () => {
    const heights = MASONRY_HEIGHTS.map((_, i) => tileHeight(i)); // [150,205,168,222,158,190]
    const { leftIndexes, rightIndexes } = splitColumns(heights, (h) => h);
    expect(leftIndexes).toEqual([0, 2, 4]);
    expect(rightIndexes).toEqual([1, 3, 5]);
  });

  it("is a pure, repeatable split for the same input", () => {
    const a = splitColumns(TILES, (_t, i) => tileHeight(i));
    const b = splitColumns(TILES, (_t, i) => tileHeight(i));
    expect(a.leftIndexes).toEqual(b.leftIndexes);
    expect(a.rightIndexes).toEqual(b.rightIndexes);
    // every tile lands in exactly one column
    expect([...a.leftIndexes, ...a.rightIndexes].sort()).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("ArchiveMasonry", () => {
  it("renders every tile's title", () => {
    const { getByText } = render(<ArchiveMasonry items={TILES} onPressTile={() => {}} />);
    for (const tile of TILES) {
      expect(getByText(tile.title)).toBeTruthy();
    }
  });
});
