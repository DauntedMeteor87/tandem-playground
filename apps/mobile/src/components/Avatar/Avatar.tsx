// Source: Wireframe 0.4 — .avatar / .stack (profile image or initials; overlapping group).
// TODO: Code Connect map once Figma frame exists.
// TODO: backend seam — `src` will be a member's uploaded photo URL.
import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type AvatarProps = {
  /** Photo URL; falls back to initials when absent. */
  src?: string;
  /** Used for the initials fallback + accessibility label. */
  name?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ src, name = "", size = 34, style }: AvatarProps) {
  return (
    <View
      accessibilityLabel={name || undefined}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: theme.radius.pill },
        style,
      ]}
    >
      {src ? (
        <Image source={{ uri: src }} style={styles.img} contentFit="cover" />
      ) : (
        <Text style={[styles.initials, { fontSize: Math.round(size * 0.38) }]}>{initialsOf(name)}</Text>
      )}
    </View>
  );
}

export type AvatarStackProps = {
  /** Names (strings) or Avatar props. */
  people?: Array<string | AvatarProps>;
  size?: number;
  /** Max shown before truncation. */
  max?: number;
};

export function AvatarStack({ people = [], size = 30, max = 4 }: AvatarStackProps) {
  const shown = people.slice(0, max);
  return (
    <View style={styles.stack}>
      {shown.map((p, i) => (
        <Avatar
          key={i}
          {...(typeof p === "string" ? { name: p } : p)}
          size={size}
          style={[styles.stacked, i === 0 ? styles.stackedFirst : null]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.color.teal, // warm-dark fill replaces the greyscale gradient
  },
  img: { width: "100%", height: "100%" },
  initials: { fontFamily: theme.fontFamily.bold, color: theme.color.paper },
  stack: { flexDirection: "row" },
  stacked: { marginLeft: -10, borderWidth: 2, borderColor: theme.color.paper }, // wireframe .stack overlap
  stackedFirst: { marginLeft: 0 },
});
