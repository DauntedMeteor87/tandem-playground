// Notifications hub — the bell in every header lands here. One row per nudge,
// tap-through to the trip or crew it's about. Empty case is spec #12:
// "All quiet. We'll nudge you when something moves."
// TODO: backend seam — notificationsList() becomes the notifications API feed.
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { Avatar, Card, EmptyState, IconBell, IconChev, ListRow, PageHeader } from "@/components";
import { PEOPLE, TRIPS, notificationsList, type Notification } from "@/lib/demo-data";
import { tripHref } from "@/lib/nav";

export default function NotificationsScreen() {
  const router = useRouter();
  const items = notificationsList();

  const open = (n: Notification) => {
    if (n.target.type === "trip") {
      const t = TRIPS[n.target.id];
      if (t) router.push(tripHref(t));
    } else if (n.target.type === "crew") {
      router.push(`/crew/${n.target.id}/chat`);
    }
  };

  return (
    <View style={styles.screen}>
      <PageHeader title="Notifications" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {items.length > 0 ? (
          <Card style={styles.list}>
            {items.map((n, i) => (
              <ListRow
                key={n.id}
                leading={
                  n.from != null ? (
                    <Avatar name={PEOPLE[n.from]?.name ?? ""} size={44} />
                  ) : (
                    <View style={styles.bellIcon}>
                      <IconBell size={20} color={theme.color.pine} />
                    </View>
                  )
                }
                title={n.text}
                subtitle={n.when}
                trailing={<IconChev size={20} color={theme.color.muted} />}
                last={i === items.length - 1}
                onPress={() => open(n)}
              />
            ))}
          </Card>
        ) : (
          // #12 — nothing yet, and that's fine.
          <EmptyState pose="tea" poseSize={148} line="All quiet. We'll nudge you when something moves." />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s6 },
  list: { marginTop: theme.spacing.s2 },
  bellIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
});
