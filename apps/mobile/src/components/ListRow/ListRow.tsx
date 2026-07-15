// Source: Wireframe 0.4 — .row (tappable row inside a Card / list, hairline divider).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type ListRowProps = {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  /** Drop the bottom hairline (last row in a list). */
  last?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ListRow({ leading, title, subtitle, trailing, last = false, onPress, style }: ListRowProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? "button" : undefined}
      onPress={onPress}
      style={[styles.row, last ? styles.last : styles.divided, style]}
    >
      {leading}
      <View style={styles.body}>
        {typeof title === "string" ? <Text style={theme.type.rowTitle}>{title}</Text> : title}
        {subtitle != null &&
          (typeof subtitle === "string" ? (
            <Text style={styles.sub} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : (
            subtitle
          ))}
      </View>
      {trailing}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3, // wireframe .row gap: 12
    paddingVertical: 13, // wireframe .row vertical padding (literal)
    paddingHorizontal: theme.spacing.s4,
  },
  divided: { borderBottomWidth: 1, borderBottomColor: theme.neutral.hairline },
  last: { borderBottomWidth: 0 },
  body: { flex: 1, minWidth: 0 },
  sub: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.color.muted, marginTop: 2 },
});
