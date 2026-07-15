// Source: Wireframe 0.4 — .stepper (+/- counter pill: budget items, headcount, seats).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type StepperProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  /** Compact variant (wireframe .stepper--sm) — tighter value column. */
  small?: boolean;
  /** Format the value label, e.g. `(n) => "$" + n`. */
  format?: (value: number) => string;
  onChange?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
};

export function Stepper({
  value,
  defaultValue = 0,
  min = 0,
  max = 99,
  small = false,
  format,
  onChange,
  style,
}: StepperProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const val = value ?? internal;
  const set = (n: number) => {
    const clamped = Math.max(min, Math.min(max, n));
    setInternal(clamped);
    onChange?.(clamped);
  };
  const label = format ? format(val) : String(val);
  return (
    <View style={[styles.pill, style]}>
      <Pressable accessibilityRole="button" accessibilityLabel="decrease" style={styles.btn} onPress={() => set(val - 1)}>
        <Text style={styles.sign}>{"−"}</Text>
      </Pressable>
      <Text style={[styles.value, small && styles.valueSmall]}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="increase" style={styles.btn} onPress={() => set(val + 1)}>
        <Text style={styles.sign}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 2,
    padding: 3,
    borderRadius: 999,
    backgroundColor: theme.neutral.sunk,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  sign: { fontFamily: theme.fontFamily.bold, fontSize: 18, color: theme.color.pine },
  value: { minWidth: 44, textAlign: "center", fontFamily: theme.fontFamily.bold, fontSize: 14, color: theme.color.pine },
  valueSmall: { minWidth: 24 },
});
