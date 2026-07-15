// Source: Wireframe 0.4 — .streak (the "weeks outside" streak row; uses the Mascot).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { Mascot, type MascotStage } from "@/components/Mascot/Mascot";

export type StreakBarProps = {
  weeks?: number;
  /** Eyebrow label (wireframe copy: "Adventure streak"). */
  label?: string;
  /** Optional sub-line (wireframe: "3 weeks of getting out there."). */
  message?: string;
  style?: StyleProp<ViewStyle>;
};

export function StreakBar({ weeks = 0, label = "Adventure streak", message, style }: StreakBarProps) {
  const stage = Math.min(3, Math.max(0, weeks)) as MascotStage;
  return (
    <View style={[styles.streak, theme.shadow.soft, style]}>
      <Mascot stage={stage} size={56} />
      <View style={styles.body}>
        <Text style={theme.type.eyebrow}>{label}</Text>
        <Text style={styles.big}>
          {weeks} {weeks === 1 ? "week" : "weeks"}
        </Text>
        {message != null && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14, // wireframe .streak gap
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: theme.radius.card,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
  },
  body: { flex: 1, minWidth: 0 },
  big: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 23,
    letterSpacing: -0.4,
    lineHeight: 30,
    color: theme.color.pine,
  },
  message: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.color.muted, marginTop: 2 },
});
