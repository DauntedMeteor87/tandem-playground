// Source: Wireframe 0.4 — SCREENS['archives-list'] .masonry (Pinterest-style
// two-column board, variable-height tiles). CSS `column-count:2` becomes an
// explicit greedy split here so React Native (no multi-column) still balances the
// two columns deterministically.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { PhotoFrame } from "@/components/PhotoFrame/PhotoFrame";
import { Avatar } from "@/components/Avatar/Avatar";

/** Tile photo heights, cycled by index (wireframe archives-list `heights`). */
export const MASONRY_HEIGHTS = [150, 205, 168, 222, 158, 190];
export function tileHeight(index: number): number {
  return MASONRY_HEIGHTS[index % MASONRY_HEIGHTS.length];
}

/** Greedy shortest-column packing — deterministic (ties break left). */
export function splitColumns<T>(
  items: T[],
  heightOf: (item: T, index: number) => number,
): { left: T[]; right: T[]; leftIndexes: number[]; rightIndexes: number[] } {
  const left: T[] = [];
  const right: T[] = [];
  const leftIndexes: number[] = [];
  const rightIndexes: number[] = [];
  let leftH = 0;
  let rightH = 0;
  items.forEach((item, i) => {
    const h = heightOf(item, i);
    if (leftH <= rightH) {
      left.push(item);
      leftIndexes.push(i);
      leftH += h;
    } else {
      right.push(item);
      rightIndexes.push(i);
      rightH += h;
    }
  });
  return { left, right, leftIndexes, rightIndexes };
}

export type ArchiveTile = {
  id: string;
  title: string;
  crew: string;
  /** Poster initials (or name) for the small avatar. */
  posterInitials: string;
  photo?: string;
};

export type ArchiveMasonryProps = {
  items: ArchiveTile[];
  onPressTile?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function ArchiveMasonry({ items, onPressTile, style }: ArchiveMasonryProps) {
  // Height keyed by each tile's stable position in `items` so both columns and
  // the per-tile heights render the same on every pass.
  const indexOf = new Map(items.map((it, i) => [it.id, i] as const));
  const { left, right } = splitColumns(items, (it) => tileHeight(indexOf.get(it.id) ?? 0));

  const renderTile = (tile: ArchiveTile) => {
    const i = indexOf.get(tile.id) ?? 0;
    return (
      <Pressable
        key={tile.id}
        accessibilityRole="button"
        onPress={() => onPressTile?.(tile.id)}
        style={[styles.tile, theme.shadow.soft]}
      >
        <PhotoFrame src={tile.photo} height={tileHeight(i)} />
        <View style={styles.meta}>
          <Text style={styles.title}>{tile.title}</Text>
          <View style={styles.sub}>
            <Avatar name={tile.posterInitials} size={18} />
            <Text style={styles.crew} numberOfLines={1}>
              {tile.crew}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.masonry, style]}>
      <View style={styles.col}>{left.map(renderTile)}</View>
      <View style={styles.col}>{right.map(renderTile)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  masonry: { flexDirection: "row", gap: 10 }, // wireframe .masonry column-gap:10
  col: { flex: 1, gap: 10 },
  tile: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  meta: { paddingHorizontal: 10, paddingTop: 8, paddingBottom: 10 }, // wireframe .mtile__meta
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 13.5,
    letterSpacing: -0.2,
    lineHeight: 17,
    color: theme.color.pine,
  },
  sub: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 }, // wireframe .mtile__sub
  crew: { flex: 1, fontFamily: theme.fontFamily.medium, fontSize: 11.5, color: theme.color.muted },
});
