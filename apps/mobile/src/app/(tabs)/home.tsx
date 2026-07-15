// Source: Wireframe 0.4 — SCREENS['home']. Ported top-to-bottom: the home-top
// header, the quick-tiles crew/community grid, the streak bar (migration doc §3),
// the "Sign ups for you" shelf + "See more sign ups", a "This week" 2-up grid, and
// the Archives shelf entry. Empty states per Guidlines/docs/empty-states.md #1/#2.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import {
  EmptyState,
  HomeHeader,
  Icon,
  StreakBar,
  TripCard,
  type TripCardTrip,
} from "@/components";
import {
  ARCHIVES,
  PEOPLE,
  QUICK_TILES,
  STREAK_WEEKS,
  archivesList,
  signupsShelf,
  thisWeekList,
  type Archive,
  type QuickTile,
} from "@/lib/demo-data";
import { tripHref } from "@/lib/nav";

/** Archive → the trip-card shape (title, poster · crew, place). */
function archiveCardTrip(a: Archive): TripCardTrip {
  return { title: a.title, kind: a.kind, club: `${PEOPLE[a.poster].name} · ${a.crew}`, when: a.place };
}

function SectionHeader({ title, moreLabel, onMore }: { title: string; moreLabel?: string; onMore?: () => void }) {
  return (
    <View style={styles.sectionH}>
      <Text style={theme.type.heading}>{title}</Text>
      {moreLabel != null && (
        <Pressable accessibilityRole="button" onPress={onMore}>
          <Text style={styles.more}>{moreLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const onQuickTile = (tile: QuickTile) => {
    // Crews/clubs land in the Communities tab (crew chat + club detail are Wave 4);
    // trip tiles route kind-aware like every other trip card.
    if (tile.target.type === "trip") router.push(tripHref({ id: tile.target.id, kind: "Activity" }));
    else router.push("/communities");
  };

  const signups = signupsShelf();
  const thisWeek = thisWeekList();
  const archives = archivesList();

  return (
    <View style={styles.screen}>
      {/* Chrome routes itself: avatar → profile, bell → notifications, plane → messages. */}
      <HomeHeader onSearch={() => {}} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick-tiles grid — your crews / communities / recent trips */}
        <View style={styles.qgrid}>
          {QUICK_TILES.map((tile) => (
            <Pressable
              key={tile.label}
              accessibilityRole="button"
              onPress={() => onQuickTile(tile)}
              style={[styles.qtile, theme.shadow.soft]}
            >
              <View style={styles.qtilePh}>
                <Icon name={tile.icon} size={22} color={theme.neutral.photoInk} />
              </View>
              <Text style={styles.qtileLabel} numberOfLines={2}>
                {tile.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Streak bar (uses the Mascot) */}
        <StreakBar
          weeks={STREAK_WEEKS}
          message={`${STREAK_WEEKS} weeks of getting out there.`}
          style={styles.streak}
        />

        {/* Sign ups for you — horizontal shelf */}
        <SectionHeader title="Sign ups for you" moreLabel="See more sign ups" onMore={() => router.push("/signups")} />
        {signups.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shelf}
          >
            {signups.map((t) => (
              <TripCard key={t.id} trip={t} mode="shelf" onPress={() => router.push(tripHref(t))} />
            ))}
          </ScrollView>
        ) : (
          <EmptyState
            pose="empty-seat"
            line="Nothing to sign up for yet — trips land here the second a lead posts one."
            cta={{ label: "Plan something →", variant: "ghost", onPress: () => router.push("/plan") }}
          />
        )}

        {/* This week — 2-up grid */}
        <SectionHeader title="This week" />
        {thisWeek.length > 0 ? (
          <View style={styles.tiles}>
            {thisWeek.map((t) => (
              <View key={t.id} style={styles.cell}>
                <TripCard trip={t} mode="grid" onPress={() => router.push(tripHref(t))} />
              </View>
            ))}
          </View>
        ) : (
          <EmptyState
            pose="tea"
            line="A quiet week outside. They happen."
            sub="Check the sign-ups shelf or plan your own."
          />
        )}

        {/* Archives shelf — the entry into the Archives board */}
        <SectionHeader title="Archives" moreLabel="See all archives" onMore={() => router.push("/archives")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelf}>
          {archives.map((a) => (
            <TripCard
              key={a.id}
              trip={archiveCardTrip(a)}
              mode="shelf"
              onPress={() => router.push(`/archives/${a.id}`)}
            />
          ))}
        </ScrollView>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingBottom: theme.spacing.s6 },
  sectionH: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: theme.spacing.s5,
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s3,
  },
  more: { fontFamily: theme.fontFamily.semibold, fontSize: 13, color: theme.color.muted },
  qgrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.s2,
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s1,
  },
  qtile: {
    flexBasis: "47%",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 10,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    overflow: "hidden",
  },
  qtilePh: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.photo,
  },
  qtileLabel: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: theme.fontFamily.bold,
    fontSize: 12.5,
    lineHeight: 15,
    color: theme.color.pine,
  },
  streak: { marginTop: theme.spacing.s3, marginHorizontal: theme.spacing.s4 },
  shelf: { gap: theme.spacing.s3, paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s2 },
  tiles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
  },
  cell: { flexBasis: "47%", flexGrow: 1 },
  footer: { height: theme.spacing.s5 },
});
