// Source: Wireframe 0.4 — .segment (2–3 option segmented control, e.g. Activities/Adventures).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type SegmentProps = {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function Segment({ options, value, onChange, style }: SegmentProps) {
  const [internal, setInternal] = React.useState(options[0]);
  const current = value ?? internal;
  return (
    <View style={[styles.track, style]}>
      {options.map((opt) => {
        const on = opt === current;
        return (
          <Pressable
            key={opt}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            onPress={() => {
              setInternal(opt);
              onChange?.(opt);
            }}
            style={[styles.item, on ? styles.on : null, on ? theme.shadow.soft : null]}
          >
            <Text style={[styles.text, { color: on ? theme.color.pine : theme.color.muted }]}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    gap: 6, // wireframe .segment gap
    padding: 6,
    backgroundColor: theme.neutral.sunk,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.pill,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: theme.radius.pill,
  },
  on: { backgroundColor: theme.color.paper },
  text: { fontFamily: theme.fontFamily.semibold, fontSize: 13.5 },
});
