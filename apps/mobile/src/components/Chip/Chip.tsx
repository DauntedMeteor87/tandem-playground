// Source: Wireframe 0.4 — .chip / .pill (pill filter & selector).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type ChipProps = {
  /** Selected (filled) state. */
  on?: boolean;
  leadingIcon?: React.ReactNode;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ on = false, leadingIcon, onPress, children, style }: ChipProps) {
  // Selected chips fill pine (dark), not ember — keeps "one ember highlight per view".
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={onPress}
      style={[styles.chip, on ? styles.on : styles.off, style]}
    >
      {leadingIcon}
      {typeof children === "string" ? (
        <Text style={[styles.text, { color: on ? theme.color.paper : theme.color.muted }]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5, // wireframe .chip gap
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
  },
  off: { backgroundColor: theme.color.paper, borderColor: theme.neutral.hairlineStrong },
  on: { backgroundColor: theme.color.pine, borderColor: theme.color.pine },
  text: { fontFamily: theme.fontFamily.semibold, fontSize: 12.5 },
});
