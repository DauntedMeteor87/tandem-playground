// Source: Wireframe 0.4 — .card (base warm surface: paper, hairline, soft shadow, rounded).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type CardProps = {
  /** Lift onto the larger warm shadow. */
  raised?: boolean;
  /** Inset the content by one 16px gutter (wireframe --s4). */
  pad?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({ raised = false, pad = false, children, style }: CardProps) {
  return (
    <View
      style={[styles.card, raised ? theme.shadow.card : theme.shadow.soft, pad && styles.pad, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  pad: { padding: theme.spacing.s4 },
});
