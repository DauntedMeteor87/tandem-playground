// Source: Wireframe 0.4 — SCREENS['mytrips']. Upcoming/Past segment, the streak bar
// on Upcoming, and big trip tiles. Empty states per Guidlines/docs/empty-states.md
// #6 (Upcoming) and #7 (Past).
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { AvatarStack, EmptyState, IconPatch, PhotoFrame, Segment, StreakBar, TabHeader } from "@/components";
import {
  STREAK_WEEKS,
  pastTrips,
  upcomingTrips,
  type PastTrip,
  type Trip,
} from "@/lib/demo-data";

type Tab = "Upcoming" | "Past";

export default function MyTripsScreen() {
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>("Upcoming");

  const upcoming = upcomingTrips();
  const past = pastTrips();

  return (
    <View style={styles.screen}>
      <TabHeader title="My Trips" />
      <View style={styles.segmentWrap}>
        <Segment options={["Upcoming", "Past"]} value={tab} onChange={(v) => setTab(v as Tab)} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === "Upcoming" ? (
          upcoming.length > 0 ? (
            <>
              <StreakBar
                weeks={STREAK_WEEKS}
                message={`${STREAK_WEEKS} weeks of getting out there.`}
                style={styles.streak}
              />
              <View style={styles.list}>
                {upcoming.map(({ trip, state }) => (
                  <UpcomingTile
                    key={trip.id}
                    trip={trip}
                    entered={state === "entered"}
                    onPress={() => router.push(`/trip/${trip.id}`)}
                  />
                ))}
              </View>
            </>
          ) : (
            <EmptyState
              pose="empty-seat"
              line="You haven't joined a trip yet. Your people are out there."
              cta={{ label: "See sign ups", variant: "primary", onPress: () => router.push("/signups") }}
            />
          )
        ) : past.length > 0 ? (
          <View style={styles.list}>
            <View style={styles.pastHead}>
              <Text style={theme.type.heading}>Past trips</Text>
              <View style={styles.patchesTag}>
                <IconPatch size={15} color={theme.color.muted} />
                <Text style={styles.patchesText}>patches earned</Text>
              </View>
            </View>
            {past.map((p) => (
              <PastTile key={p.id} trip={p} />
            ))}
          </View>
        ) : (
          <EmptyState
            pose="tea"
            line="Nothing in the rearview yet."
            sub="Your first trip story writes itself soon."
          />
        )}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

function UpcomingTile({ trip, entered, onPress }: { trip: Trip; entered: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.bigtrip, theme.shadow.soft]}>
      <PhotoFrame
        height={158}
        protect
        overlay={
          <View>
            <View style={styles.overTag}>
              <Text style={styles.overTagText}>{trip.kind}</Text>
            </View>
            <Text style={styles.overTitle}>{trip.title}</Text>
          </View>
        }
      />
      <View style={styles.bigtripMeta}>
        <Text style={styles.metaMuted}>
          {entered ? "Entered · results Wed 8 AM" : `${trip.when} · ${trip.place}`}
        </Text>
        <View style={styles.goingRow}>
          <AvatarStack people={trip.going.slice(0, 3)} size={22} />
          <Text style={styles.metaMuted}>{trip.goingN} going · tap to open the trip</Text>
        </View>
      </View>
    </Pressable>
  );
}

function PastTile({ trip }: { trip: PastTrip }) {
  // TODO: route target lands in Wave 4 (media/album). Tile renders now.
  return (
    <Pressable accessibilityRole="button" onPress={() => {}} style={[styles.bigtrip, theme.shadow.soft]}>
      <PhotoFrame height={150} />
      <View style={styles.bigtripMeta}>
        <Text style={theme.type.rowTitle}>{trip.title}</Text>
        <Text style={[styles.metaMuted, styles.metaGap]}>{trip.meta}</Text>
        <View style={styles.goingRow}>
          <View style={styles.patchTag}>
            <IconPatch size={13} color={theme.color.muted} />
            <Text style={styles.patchTagText}>{trip.patch} patch</Text>
          </View>
          <Text style={styles.metaMuted}>· message the people you went with</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  segmentWrap: { paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s3 },
  content: { paddingTop: theme.spacing.s1 },
  list: { paddingHorizontal: theme.spacing.s4 },
  streak: { marginHorizontal: theme.spacing.s4, marginBottom: theme.spacing.s1 },
  bigtrip: {
    marginTop: theme.spacing.s3,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  bigtripMeta: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 14 },
  overTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.neutral.onDarkFill,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  overTagText: { fontFamily: theme.fontFamily.semibold, fontSize: 11, color: theme.color.paper },
  overTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 19,
    letterSpacing: -0.3,
    color: theme.color.paper,
    marginTop: 6,
  },
  metaMuted: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted, flexShrink: 1 },
  metaGap: { marginTop: theme.spacing.s2 },
  goingRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: theme.spacing.s2 },
  pastHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: theme.spacing.s4,
    paddingBottom: theme.spacing.s1,
  },
  patchesTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  patchesText: { fontFamily: theme.fontFamily.semibold, fontSize: 13, color: theme.color.muted },
  patchTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    backgroundColor: theme.neutral.sunk,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
  },
  patchTagText: { fontFamily: theme.fontFamily.semibold, fontSize: 11, color: theme.color.muted },
  footer: { height: theme.spacing.s6 },
});
