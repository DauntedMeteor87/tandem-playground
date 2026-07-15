// Source: Wireframe 0.4 — app.js tripCard() + .tripcard / .tripcard--grid, and the
// trip-respond ✓/✕ actions. The core discovery unit: shelf + 2-up grid modes.
// TODO: Code Connect map once Figma frame exists.
// TODO: backend seam — Trip fields come from the trips table / API.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { PhotoFrame } from "@/components/PhotoFrame/PhotoFrame";
import { Tag } from "@/components/Tag/Tag";
import { AvatarStack } from "@/components/Avatar/Avatar";
import { IconCheck, IconX } from "@/components/icons";

export type TripKind = "Adventure" | "Activity";

export type TripCardTrip = {
  title: string;
  kind?: TripKind;
  cost?: string;
  when?: string;
  club?: string;
  /** Names/initials for the "who's going" stack. */
  going?: string[];
  goingN?: number;
  mutuals?: number;
  photo?: string;
};

export type TripCardProps = {
  trip: TripCardTrip;
  /** `shelf` = fixed-width horizontal card; `grid` = full-width 2-up card. */
  mode?: "shelf" | "grid";
  /** Shelf width override (wireframe default 260). */
  width?: number;
  onPress?: () => void;
  /** When set, renders the ✓/✕ respond row (wireframe trip-respond actions). */
  onRespond?: (going: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function TripCard({ trip, mode = "shelf", width = 260, onPress, onRespond, style }: TripCardProps) {
  const { title, kind, cost, when, going = [], goingN, mutuals } = trip;
  const grid = mode === "grid";

  const goingLine =
    goingN != null
      ? `${goingN} going${mutuals != null ? ` · ${mutuals} you know` : ""}`
      : (trip.club ?? "");
  const metaRight = [when, cost].filter(Boolean).join(" · ");

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, theme.shadow.soft, grid ? styles.grid : { width }, style]}
    >
      <PhotoFrame src={trip.photo} height={grid ? 120 : 150} />
      <View style={styles.meta}>
        <Text style={theme.type.cardTitle}>{title}</Text>

        <View style={styles.row}>
          {going.length > 0 && <AvatarStack people={going.slice(0, 3)} size={22} />}
          {goingLine !== "" && <Text style={styles.club}>{goingLine}</Text>}
        </View>

        <View style={[styles.row, styles.rowSplit]}>
          {kind != null && <Tag tone={kind === "Adventure" ? "pine" : "teal"}>{kind}</Tag>}
          {metaRight !== "" && <Text style={styles.smallMuted}>{metaRight}</Text>}
        </View>
      </View>

      {onRespond != null && (
        // ✓/✕ affordance — wireframe .trip-respond__actions (must be answered).
        <View style={styles.respond}>
          <Pressable style={[styles.respondBtn, styles.respondNo]} onPress={() => onRespond(false)}>
            <IconX size={17} color={theme.color.pine} />
            <Text style={[styles.respondText, { color: theme.color.pine }]}>Can&apos;t make it</Text>
          </Pressable>
          <Pressable style={[styles.respondBtn, styles.respondYes]} onPress={() => onRespond(true)}>
            <IconCheck size={17} color={theme.color.paper} />
            <Text style={[styles.respondText, { color: theme.color.paper }]}>I&apos;m in</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
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
  grid: { flex: 1, width: "100%" },
  meta: { paddingTop: 11, paddingHorizontal: theme.spacing.s3, paddingBottom: theme.spacing.s3 }, // wireframe .tripcard__meta
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 7 }, // wireframe .tripcard__row
  rowSplit: { justifyContent: "space-between", marginTop: 8 },
  club: { fontFamily: theme.fontFamily.body, fontSize: 12.5, color: theme.color.muted, flexShrink: 1 },
  smallMuted: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
  respond: { flexDirection: "row", gap: 10, paddingHorizontal: 14, paddingBottom: 14 }, // wireframe .trip-respond__actions
  respondBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
  },
  respondNo: { backgroundColor: theme.color.paper, borderColor: theme.neutral.hairlineStrong },
  respondYes: { backgroundColor: theme.color.ember, borderColor: theme.color.ember }, // the one ember accent
  respondText: { fontFamily: theme.fontFamily.bold, fontSize: 14 },
});
