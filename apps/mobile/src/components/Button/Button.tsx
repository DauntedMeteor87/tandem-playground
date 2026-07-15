// Source: Wireframe 0.4 — .btn / .btn--ghost / .btn--sub / .btn-apple
// (design-system Button variant set).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type ButtonVariant = "primary" | "ghost" | "subtle" | "accent" | "apple";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to fill the container (default true — mobile-first, from the wireframe). */
  full?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

// ember = the one primary CTA/accent (never body); pine = strong filled action
// that keeps "one ember per view"; apple stays warm-dark (never pure black).
const FILL: Record<ButtonVariant, string> = {
  primary: theme.color.ember,
  accent: theme.color.pine,
  apple: theme.color.pine,
  ghost: theme.color.paper,
  subtle: theme.neutral.sunk,
};

const LABEL: Record<ButtonVariant, string> = {
  primary: theme.color.paper,
  accent: theme.color.paper,
  apple: theme.color.paper,
  ghost: theme.color.pine,
  subtle: theme.color.pine,
};

const BORDER: Partial<Record<ButtonVariant, string>> = {
  ghost: theme.neutral.hairlineStrong,
  subtle: theme.neutral.hairline,
};

export function Button({
  variant = "primary",
  size = "md",
  full = true,
  disabled = false,
  leadingIcon,
  trailingIcon,
  onPress,
  children,
  style,
}: ButtonProps) {
  const labelColor = LABEL[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizes[size],
        { backgroundColor: FILL[variant] },
        BORDER[variant] ? { borderColor: BORDER[variant] } : styles.noBorder,
        full ? styles.full : styles.auto,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {leadingIcon}
      {typeof children === "string" ? (
        <Text style={[theme.type.button, sizeText[size], { color: labelColor }]}>{children}</Text>
      ) : (
        <View style={styles.slot}>{children}</View>
      )}
      {trailingIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.s2, // wireframe .btn gap: 8
    borderWidth: 1,
    borderRadius: theme.radius.md,
  },
  noBorder: { borderColor: "transparent" },
  full: { alignSelf: "stretch", width: "100%" },
  auto: { alignSelf: "flex-start" },
  disabled: { opacity: 0.4 },
  pressed: { transform: [{ translateY: 1 }] }, // wireframe .btn:active
  slot: { flexDirection: "row", alignItems: "center" },
});

// Padding/size from wireframe .btn (md) + .btn--sm; lg from design-system Button.
const sizes = StyleSheet.create({
  sm: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: theme.radius.pill },
  md: { paddingVertical: 15, paddingHorizontal: 18 },
  lg: { paddingVertical: 17, paddingHorizontal: 22 },
});

const sizeText = StyleSheet.create({
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 17 },
});
