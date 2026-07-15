// Source: Wireframe 0.4 — tripResponseCard() (.trip-respond) + tripPinnedTile()
// (.pinned-trip). A just-published trip lands in the crew chat as a card the member
// must answer (✓ I'm in / ✕ Can't make it); once answered it collapses into a slim
// pinned tile at the top of the chat. Two states of one interaction, one component.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { PhotoFrame } from "@/components/PhotoFrame/PhotoFrame";
import { Tag } from "@/components/Tag/Tag";
import { IconCheck, IconPlane, IconTrips, IconX } from "@/components/icons";

export type PinnedTrip = {
  title: string;
  when: string;
  place: string;
  photo?: string;
};

export type PinnedTripResponse = "yes" | "no" | null;

export type PinnedTripCardProps = {
  trip: PinnedTrip;
  crewName: string;
  /** `null` = the expanded must-answer card; `"yes"`/`"no"` = the collapsed tile. */
  response: PinnedTripResponse;
  onRespond: (going: boolean) => void;
  /** Tap the card/tile to open the full activity. */
  onOpen?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PinnedTripCard({ trip, crewName, response, onRespond, onOpen, style }: PinnedTripCardProps) {
  // Collapsed slim tile — the answered state.
  if (response !== null) {
    const going = response === "yes";
    return (
      <Pressable accessibilityRole="button" onPress={onOpen} style={[styles.pinned, theme.shadow.soft, style]}>
        <View style={styles.thumb}>
          <IconTrips size={22} color={theme.color.muted} />
        </View>
        <View style={styles.pinnedText}>
          <Text style={styles.pinnedTitle} numberOfLines={1}>
            {trip.title}
          </Text>
          <Text style={styles.smallMuted} numberOfLines={1}>
            {trip.when} · {going ? "you're going" : "you passed"}
          </Text>
        </View>
        <Tag tone={going ? "success" : "neutral"} leadingIcon={going ? <IconCheck size={13} color={theme.color.pine} /> : undefined}>
          {going ? "Going" : "Passed"}
        </Tag>
      </Pressable>
    );
  }

  // Expanded must-answer card — the freshly-published state.
  return (
    <View style={[styles.respond, theme.shadow.card, style]}>
      <View style={styles.tag}>
        <IconPlane size={14} color={theme.color.muted} />
        <Text style={styles.tagText}>Just published to {crewName} — this is how it lands for the crew</Text>
      </View>

      <Pressable accessibilityRole="button" onPress={onOpen} style={styles.card}>
        <PhotoFrame src={trip.photo} width={80} height={90} rounded />
        <View style={styles.meta}>
          <Text style={styles.metaTitle}>{trip.title}</Text>
          <Text style={styles.smallMuted}>
            {trip.when} · {trip.place}
          </Text>
          <Text style={styles.smallMuted}>Tap to see the full plan</Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => onRespond(false)}
          style={[styles.respondBtn, styles.respondNo]}
        >
          <IconX size={17} color={theme.color.pine} />
          <Text style={[styles.respondText, { color: theme.color.pine }]}>Can&apos;t make it</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => onRespond(true)}
          style={[styles.respondBtn, styles.respondYes]}
        >
          <IconCheck size={17} color={theme.color.paper} />
          <Text style={[styles.respondText, { color: theme.color.paper }]}>I&apos;m in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ---- collapsed slim tile (.pinned-trip) ---- */
  pinned: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3,
    padding: 10,
    marginBottom: 14,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.md,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
  pinnedText: { flex: 1, minWidth: 0 },
  pinnedTitle: { fontFamily: theme.fontFamily.semibold, fontSize: 14, color: theme.color.pine },
  smallMuted: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },

  /* ---- expanded must-answer card (.trip-respond) ---- */
  respond: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: theme.neutral.sunk,
    borderBottomWidth: 1,
    borderBottomColor: theme.neutral.hairline,
  },
  tagText: { flex: 1, fontFamily: theme.fontFamily.bold, fontSize: 11, color: theme.color.muted },
  card: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s3, padding: 12 },
  meta: { flex: 1, minWidth: 0 },
  metaTitle: { fontFamily: theme.fontFamily.bold, fontSize: 15, color: theme.color.pine, marginBottom: 2 },
  actions: { flexDirection: "row", gap: 10, paddingHorizontal: 14, paddingBottom: 14 },
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
