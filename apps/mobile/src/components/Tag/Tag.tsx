// Source: Wireframe 0.4 — .tag (small static metadata label: kind, cost, difficulty).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

// `accent` is the one ember-tinted tone — use it at most once per view.
export type TagTone = "neutral" | "pine" | "teal" | "accent" | "success" | "warning" | "error";

export type TagProps = {
  tone?: TagTone;
  leadingIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const TONES: Record<TagTone, { bg: string; fg: string; border: string }> = {
  neutral: { bg: theme.neutral.sunk, fg: theme.color.muted, border: theme.neutral.hairline },
  pine: { bg: theme.neutral.sunk, fg: theme.color.pine, border: theme.neutral.hairline },
  teal: { bg: theme.status.info.bg, fg: theme.status.info.fg, border: "transparent" },
  accent: { bg: theme.neutral.emberSoft, fg: theme.color.ember, border: "transparent" },
  success: { bg: theme.status.success.bg, fg: theme.color.pine, border: "transparent" },
  warning: { bg: theme.status.warning.bg, fg: theme.color.pine, border: "transparent" },
  error: { bg: theme.status.error.bg, fg: theme.status.error.fg, border: "transparent" },
};

export function Tag({ tone = "neutral", leadingIcon, children, style }: TagProps) {
  const t = TONES[tone];
  return (
    <View style={[styles.tag, { backgroundColor: t.bg, borderColor: t.border }, style]}>
      {leadingIcon}
      {typeof children === "string" ? (
        <Text style={[styles.text, { color: t.fg }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4, // wireframe .tag gap
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6, // wireframe .tag radius (literal — below the token scale)
    borderWidth: 1,
  },
  text: { fontFamily: theme.fontFamily.semibold, fontSize: 11 },
});
