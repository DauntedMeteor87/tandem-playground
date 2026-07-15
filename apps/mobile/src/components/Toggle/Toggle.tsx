// Source: Wireframe 0.4 — .toggle (on/off switch: repeat weekly, ride share, budget).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type ToggleProps = {
  on?: boolean;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({ on: onProp, defaultOn = false, onChange, style }: ToggleProps) {
  const [internal, setInternal] = React.useState(defaultOn);
  const on = onProp ?? internal;
  // On-state fills pine (not ember) so several toggles on one screen never
  // multiply the reserved ember accent.
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      onPress={() => {
        setInternal(!on);
        onChange?.(!on);
      }}
      style={[styles.track, { backgroundColor: on ? theme.color.pine : theme.neutral.hairlineStrong }, style]}
    >
      <View style={[styles.knob, on ? styles.knobOn : styles.knobOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 28,
    borderRadius: 999,
    justifyContent: "center",
  },
  knob: {
    position: "absolute",
    top: 3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.color.paper,
    ...theme.shadow.soft,
  },
  knobOff: { left: 3 },
  knobOn: { left: 3, transform: [{ translateX: 18 }] }, // wireframe .toggle.on span translateX(18)
});
