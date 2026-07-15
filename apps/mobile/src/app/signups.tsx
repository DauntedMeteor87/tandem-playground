// Source: Wireframe 0.4 — SCREENS['signups-list']. The Home "See more sign ups"
// page: an Activities/Adventures Segment filter over a 2-up grid of trip cards.
// Empty states per Guidlines/docs/empty-states.md #3 (per filter) and #1 (all).
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { EmptyState, PageHeader, Segment, TripCard } from "@/components";
import { filterByKind, signupsList, type KindFilter } from "@/lib/demo-data";
import { tripHref } from "@/lib/nav";

const FILTERS: KindFilter[] = ["All", "Activities", "Adventures"];

export default function SignupsScreen() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<KindFilter>("All");

  const list = filterByKind(signupsList(), filter);

  return (
    <View style={styles.screen}>
      <PageHeader title="Sign ups for you" onBack={() => router.back()} />
      <View style={styles.controls}>
        <Segment options={FILTERS} value={filter} onChange={(v) => setFilter(v as KindFilter)} />
        <Text style={styles.hint}>
          Adventures open a full trip page. Activities drop you straight into the crew chat.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {list.length > 0 ? (
          <View style={styles.tiles}>
            {list.map((t) => (
              <View key={t.id} style={styles.cell}>
                <TripCard trip={t} mode="grid" onPress={() => router.push(tripHref(t))} />
              </View>
            ))}
          </View>
        ) : filter === "All" ? (
          <EmptyState
            pose="empty-seat"
            line="Nothing to sign up for yet — trips land here the second a lead posts one."
            cta={{ label: "Plan something →", variant: "ghost", onPress: () => router.push("/plan") }}
          />
        ) : (
          <EmptyState
            pose="empty-seat"
            line={`No ${filter.toLowerCase()} right now.`}
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
  content: { paddingTop: theme.spacing.s3, paddingBottom: theme.spacing.s7 },
  tiles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
  },
  cell: { flexBasis: "47%", flexGrow: 1 },
});
