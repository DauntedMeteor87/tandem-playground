// Your profile — the avatar in every header lands here: who you are, your
// streak, your activities, and the doors to your trips and archives.
// TODO: backend seam — identity, photos, verification, and activities all come
// from the profile API once accounts land; this renders the demo member.
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import {
  Avatar,
  Card,
  Chip,
  IconChev,
  IconPatch,
  IconTrips,
  ListRow,
  PageHeader,
  StreakBar,
  Tag,
} from "@/components";
import { STREAK_WEEKS } from "@/lib/demo-data";

// The demo member (the wireframe's signed-in "You").
const ME = {
  name: "Riley Q.",
  year: "Freshman",
  school: "Cal Poly SLO",
  activities: ["Hiking", "Surfing", "Camping"],
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <PageHeader title="Your profile" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Identity card */}
        <Card style={styles.idCard}>
          <View style={styles.idRow}>
            <Avatar name={ME.name} size={64} />
            <View style={styles.idMeta}>
              <Text style={theme.type.heading}>{ME.name}</Text>
              <Text style={styles.idSub}>
                {ME.year} · {ME.school}
              </Text>
              {/* Verification skipped in onboarding → read-only reminder, not a wall. */}
              <View style={styles.tagRow}>
                <Tag>Not verified yet</Tag>
              </View>
            </View>
          </View>
        </Card>

        <StreakBar weeks={STREAK_WEEKS} style={styles.streak} />

        <Text style={styles.divLabel}>your activities</Text>
        <View style={styles.chips}>
          {ME.activities.map((a) => (
            <Chip key={a} on>
              {a}
            </Chip>
          ))}
        </View>

        <Text style={styles.divLabel}>your stuff</Text>
        <Card>
          <ListRow
            leading={
              <View style={styles.rowIcon}>
                <IconTrips size={20} color={theme.color.pine} />
              </View>
            }
            title="My trips"
            subtitle="Upcoming and past, with your patches"
            trailing={<IconChev size={20} color={theme.color.muted} />}
            onPress={() => router.push("/my-trips")}
          />
          <ListRow
            leading={
              <View style={styles.rowIcon}>
                <IconPatch size={20} color={theme.color.pine} />
              </View>
            }
            title="Trip archives"
            subtitle="Every trip people have already taken"
            trailing={<IconChev size={20} color={theme.color.muted} />}
            last
            onPress={() => router.push("/archives")}
          />
        </Card>

        <Text style={styles.caption}>Editing your profile arrives with accounts — everything here is the demo you.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s6 },
  idCard: { marginTop: theme.spacing.s2, padding: theme.spacing.s4 },
  idRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s4 },
  idMeta: { flex: 1, gap: theme.spacing.s1 },
  idSub: { fontFamily: theme.fontFamily.medium, fontSize: 13.5, color: theme.color.muted },
  tagRow: { flexDirection: "row", marginTop: theme.spacing.s1 },
  streak: { marginTop: theme.spacing.s4 },
  divLabel: {
    ...theme.type.eyebrow,
    marginTop: theme.spacing.s5,
    marginBottom: theme.spacing.s2,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.s2 },
  rowIcon: {
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
    marginTop: theme.spacing.s5,
  },
});
