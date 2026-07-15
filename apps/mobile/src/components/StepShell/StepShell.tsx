// Source: Wireframe 0.4 — obShell() + the ACT_STEPS plan-wizard shell (one shared
// shell per migration doc §8.3): progress bar + back + optional skip/step-count +
// question + optional hint + optional image slot + body slot + CTA.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { Button } from "@/components/Button/Button";
import { IconBack } from "@/components/icons";

export type StepShellProps = {
  /** Progress fraction 0–1 for the top bar. */
  progress: number;
  /** The big question (wireframe .ob__q). */
  question: string;
  /** Sub-line under the question. */
  hint?: string;
  /** Optional inspiration image band above the question (wireframe .ob__inspo). */
  imageSlot?: React.ReactNode;
  onBack?: () => void;
  /** When set, shows a Skip button top-right (unskippable/forced steps omit it). */
  onSkip?: () => void;
  skipLabel?: string;
  /** Alternative top-right content, e.g. "3 / 8" for the plan wizard. */
  stepLabel?: string;
  /** CTA label (wireframe default "Continue"; publish step overrides). */
  cta?: string;
  onCta?: () => void;
  ctaDisabled?: boolean;
  /** The step's body / fields. */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function StepShell({
  progress,
  question,
  hint,
  imageSlot,
  onBack,
  onSkip,
  skipLabel = "Skip",
  stepLabel,
  cta = "Continue",
  onCta,
  ctaDisabled = false,
  children,
  style,
}: StepShellProps) {
  const pct = `${Math.max(0, Math.min(1, progress)) * 100}%` as const;
  return (
    <View style={[styles.root, style]}>
      {/* progress rail (wireframe .progress) */}
      <View style={styles.progress}>
        <View style={[styles.progressFill, { width: pct }]} />
      </View>

      <View style={styles.ob}>
        <View style={styles.top}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back" style={styles.iconBtn} onPress={onBack}>
            <IconBack size={22} color={theme.color.pine} />
          </Pressable>
          {onSkip ? (
            <Pressable accessibilityRole="button" onPress={onSkip}>
              <Text style={styles.skip}>{skipLabel}</Text>
            </Pressable>
          ) : stepLabel ? (
            <Text style={styles.step}>{stepLabel}</Text>
          ) : (
            <View style={styles.spacer} />
          )}
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled">
          {imageSlot != null && <View style={styles.inspo}>{imageSlot}</View>}
          <Text style={styles.question}>{question}</Text>
          {hint != null && <Text style={styles.hint}>{hint}</Text>}
          {children}
        </ScrollView>

        <View style={styles.foot}>
          <Button variant="primary" full disabled={ctaDisabled} onPress={onCta}>
            {cta}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.canvas },
  progress: {
    height: 3,
    borderRadius: 3,
    marginHorizontal: theme.spacing.s4,
    marginTop: theme.spacing.s2,
    backgroundColor: theme.neutral.hairline,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3, backgroundColor: theme.color.pine },
  ob: { flex: 1, padding: theme.spacing.s4 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 40 },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: { width: 34 },
  skip: { fontFamily: theme.fontFamily.semibold, fontSize: 15, color: theme.color.muted },
  step: { fontFamily: theme.fontFamily.semibold, fontSize: 15, color: theme.color.muted },
  body: { flex: 1 },
  bodyContent: { paddingBottom: theme.spacing.s3 },
  inspo: {
    height: 120,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    marginBottom: theme.spacing.s5,
  },
  question: {
    fontFamily: theme.fontFamily.displaySemiBold,
    fontSize: 27,
    lineHeight: 31,
    letterSpacing: -0.6,
    color: theme.color.pine,
    marginTop: 22,
    marginBottom: theme.spacing.s2,
  },
  hint: { fontFamily: theme.fontFamily.body, fontSize: 15, color: theme.color.muted, marginBottom: 22 },
  foot: { paddingTop: theme.spacing.s3 },
});
