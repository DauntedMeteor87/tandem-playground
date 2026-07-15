// Messages hub — the paper-plane icon in every header lands here: one row per
// crew you're in, newest words first, tap through to that crew's chat. The
// wireframe kept chat inside crews (no DMs), so the hub is a crew-thread list.
// TODO: backend seam — rows become the member's real chat threads (Realtime).
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { Card, EmptyState, IconChev, IconComm, ListRow, PageHeader } from "@/components";
import { crewMessages, heartedCrews } from "@/lib/demo-data";

export default function MessagesScreen() {
  const router = useRouter();
  const crews = heartedCrews();

  return (
    <View style={styles.screen}>
      <PageHeader title="Messages" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {crews.length > 0 ? (
          <Card style={styles.list}>
            {crews.map((crew, i) => {
              const thread = crewMessages(crew.id);
              const last = thread[thread.length - 1];
              const preview = last
                ? `${last.me ? "You" : last.who.split(" ")[0]}: ${last.text}`
                : "Say hi — someone has to go first.";
              return (
                <ListRow
                  key={crew.id}
                  leading={
                    <View style={styles.crewIcon}>
                      <IconComm size={22} color={theme.color.pine} />
                    </View>
                  }
                  title={crew.name}
                  subtitle={preview}
                  trailing={<IconChev size={20} color={theme.color.muted} />}
                  last={i === crews.length - 1}
                  onPress={() => router.push(`/crew/${crew.id}/chat`)}
                />
              );
            })}
          </Card>
        ) : (
          // No crews yet → no threads yet: same one-way-in as Communities (#8).
          <EmptyState
            pose="empty-seat"
            poseSize={148}
            line="No messages yet — join a trip and your crew's chat starts here."
            cta={{ label: "See sign ups", variant: "primary", onPress: () => router.push("/signups") }}
          />
        )}
        <Text style={styles.caption}>Chats live inside your crews — every trip gets one.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s6 },
  list: { marginTop: theme.spacing.s2 },
  crewIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
  caption: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 12,
    color: theme.color.muted,
    textAlign: "center",
    marginTop: theme.spacing.s4,
  },
});
