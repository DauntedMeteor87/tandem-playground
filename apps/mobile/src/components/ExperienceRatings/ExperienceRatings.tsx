// Source: Wireframe 0.4 — ob-experience `.slider-row` list. The wireframe's fixed
// 8 activities, each rated by how many times you've been (0 → 5+). The greyscale
// tap-slider is restyled to the design-system Stepper per migration doc §4
// ("Stepper — +/- counter pill (budget split, experience rating)"). Pure and
// router-free so it's testable on its own.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/tokens";
import { Stepper } from "@/components/Stepper/Stepper";

/** The eight fixed activities, in wireframe order. */
export const EXPERIENCE = [
  "Surfing",
  "Day hikes",
  "Crafts",
  "Biking",
  "Thrifting",
  "Camping",
  "Backpacking",
  "Mountaineering",
] as const;

/** Value label: 0 → "—", 5 (max) → "5+", else "N×" (wireframe `.val`). */
export function formatRating(v: number): string {
  if (v === 0) return "—";
  if (v >= 5) return "5+";
  return `${v}×`;
}

export type ExperienceRatingsProps = {
  /** Current ratings keyed by activity name (missing = 0). */
  values: Record<string, number>;
  onChange: (name: string, value: number) => void;
};

export function ExperienceRatings({ values, onChange }: ExperienceRatingsProps) {
  return (
    <View style={styles.list}>
      {EXPERIENCE.map((name) => (
        <View key={name} style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <Stepper
            value={values[name] ?? 0}
            min={0}
            max={5}
            format={formatRating}
            onChange={(v) => onChange(name, v)}
          />
        </View>
      ))}
      <Text style={styles.note}>Each notch is one time you&apos;ve been out — it tops out at 5+.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { marginTop: theme.spacing.s2 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.s3, // wireframe .slider-row padding: 12px 0
  },
  name: {
    flex: 1,
    marginRight: theme.spacing.s3,
    fontFamily: theme.fontFamily.semibold,
    fontSize: 14, // wireframe .slider-row .name
    color: theme.color.pine,
  },
  note: {
    ...theme.type.small,
    marginTop: theme.spacing.s3,
  },
});
