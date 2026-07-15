// Source: Guidlines/docs/empty-states.md — the mobile "no dead ends" pattern.
// Composition, centered on canvas, top to bottom: a warm voice line (Spectral
// italic, pine) → optional sub-line (Hanken, muted) → optional single CTA (never
// two) → the Koa pose PNG anchored at the bottom. Never the word "empty".
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Image, StyleSheet, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { Button, type ButtonVariant } from "@/components/Button/Button";

/** Koa pose keys — the filenames in assets/mascot/koa/ are the contract
 * (empty-states.md pose → moment map). Art can be re-cut without code changes. */
export type KoaPose =
  | "empty-seat"
  | "tea"
  | "loading-leaves"
  | "success-leaf"
  | "error-twig"
  | "note"
  | "swipe"
  | "peek-page";

// Static requires (Metro needs literal paths; a map keeps the `pose` prop 1:1
// with the pose sheet). Relative path: EmptyState → components → src → mobile → assets.
const POSES: Record<KoaPose, ImageSourcePropType> = {
  "empty-seat": require("../../../assets/mascot/koa/koa-empty-seat.png"),
  tea: require("../../../assets/mascot/koa/koa-tea.png"),
  "loading-leaves": require("../../../assets/mascot/koa/koa-loading-leaves.png"),
  "success-leaf": require("../../../assets/mascot/koa/koa-success-leaf.png"),
  "error-twig": require("../../../assets/mascot/koa/koa-error-twig.png"),
  note: require("../../../assets/mascot/koa/koa-note.png"),
  swipe: require("../../../assets/mascot/koa/koa-swipe.png"),
  "peek-page": require("../../../assets/mascot/koa/koa-peek-page.png"),
};

export type EmptyStateCta = {
  label: string;
  onPress: () => void;
  /** `primary` when it starts the core loop; `ghost` for a secondary way out. */
  variant?: Extract<ButtonVariant, "primary" | "ghost">;
};

export type EmptyStateProps = {
  /** Which Koa pose sits at the bottom. */
  pose: KoaPose;
  /** The one-sentence voice line (Spectral italic, pine). */
  line: string;
  /** Optional practical sub-line (Hanken, muted). */
  sub?: string;
  /** Optional single CTA — the one way out. Never pass two. */
  cta?: EmptyStateCta;
  /** Illustration edge length (px). */
  poseSize?: number;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({ pose, line, sub, cta, poseSize = 168, style }: EmptyStateProps) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.copy}>
        <Text style={styles.line}>{line}</Text>
        {sub != null && <Text style={styles.sub}>{sub}</Text>}
        {cta != null && (
          <View style={styles.ctaWrap}>
            <Button variant={cta.variant ?? "primary"} full={false} onPress={cta.onPress}>
              {cta.label}
            </Button>
          </View>
        )}
      </View>
      <Image
        source={POSES[pose]}
        testID={`koa-${pose}`}
        accessibilityRole="image"
        accessibilityLabel={`Koa the orangutan, ${pose.replace("-", " ")}`}
        style={{ width: poseSize, height: poseSize }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing.s5,
    paddingVertical: theme.spacing.s7,
    paddingHorizontal: theme.spacing.s5,
  },
  copy: { alignItems: "center", gap: theme.spacing.s2 },
  line: {
    // voice line — Spectral italic, pine (matches the brand's loading/empty voice)
    fontFamily: theme.fontFamily.displayItalic,
    fontSize: 19,
    lineHeight: 26,
    letterSpacing: -0.2,
    color: theme.color.pine,
    textAlign: "center",
  },
  sub: {
    fontFamily: theme.fontFamily.body,
    fontSize: 14,
    lineHeight: 20,
    color: theme.color.muted,
    textAlign: "center",
    maxWidth: 280,
  },
  ctaWrap: { marginTop: theme.spacing.s2 },
});
