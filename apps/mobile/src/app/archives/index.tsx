// Source: Wireframe 0.4 — SCREENS['archives-list']. The Pinterest-style two-column
// masonry board of trips people already took, with an Activities/Adventures Segment
// on top. Empty states per Guidlines/docs/empty-states.md #4 (board) and #5 (filter).
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { ArchiveMasonry, EmptyState, PageHeader, Segment, type ArchiveTile } from "@/components";
import { archivesList, filterByKind, personInitials, type KindFilter } from "@/lib/demo-data";

const FILTERS: KindFilter[] = ["All", "Activities", "Adventures"];

export default function ArchivesScreen() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<KindFilter>("All");

  const list = filterByKind(archivesList(), filter);
  const tiles: ArchiveTile[] = list.map((a) => ({
    id: a.id,
    title: a.title,
    crew: a.crew,
    posterInitials: personInitials(a.poster),
  }));

  return (
    <View style={styles.screen}>
      <PageHeader title="Archives" onBack={() => router.back()} />
      <View style={styles.controls}>
        <Segment options={FILTERS} value={filter} onChange={(v) => setFilter(v as KindFilter)} />
        <Text style={styles.hint}>
          Trips people already took — tap one for inspiration, then reach out to whoever went.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tiles.length > 0 ? (
          <ArchiveMasonry items={tiles} onPressTile={(id) => router.push(`/archives/${id}`)} />
        ) : filter === "All" ? (
          <EmptyState
            pose="tea"
            line="No trip memories yet — the first one's always the best one."
            cta={{ label: "Plan the first trip", variant: "primary", onPress: () => router.push("/plan") }}
          />
        ) : (
          <EmptyState
            pose="tea"
            line="None in this pile."
            cta={{ label: "Show everything", variant: "ghost", onPress: () => setFilter("All") }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  controls: { paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s2, gap: theme.spacing.s2 },
  hint: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
  content: { paddingTop: theme.spacing.s3, paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s7 },
});
