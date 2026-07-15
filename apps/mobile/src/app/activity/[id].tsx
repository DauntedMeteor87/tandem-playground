// Source: Wireframe 0.4 — SCREENS['activity']. The 0.4 addition: a single-day
// activity tied straight to its crew chat. Big date/time, a note-from-the-lead
// (member voice — emoji allowed here only), itinerary, who's going, and a direct
// button into the activity's crew chat.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { AvatarStack, Avatar, Button, Card, IconBack, IconCal, IconChat, IconShare, PhotoFrame, SCREEN_TOP } from "@/components";
import { ACT_CREW, CREWS, PEOPLE, TRIPS, itineraryOf } from "@/lib/demo-data";

export default function ActivityScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = TRIPS[id ?? ""] ?? TRIPS.bishop;
  const crewId = ACT_CREW[trip.id] ?? "moon";
  const crew = CREWS[crewId];
  const lead = PEOPLE[trip.lead];
  const itinerary = itineraryOf(trip);
  const meet = itinerary[0][0];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View>
          <PhotoFrame
            height={300}
            protect
            overlay={
              <View>
                <View style={styles.heroTag}>
                  <Text style={styles.heroTagText}>Activity · {trip.club}</Text>
                </View>
                <Text style={styles.heroTitle}>{trip.title}</Text>
              </View>
            }
          />
          <View style={styles.heroNav}>
            <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.heroBtn}>
              <IconBack size={22} color={theme.color.paper} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Share" onPress={() => {}} style={styles.heroBtn}>
              <IconShare size={22} color={theme.color.paper} />
            </Pressable>
          </View>
        </View>

        {/* Big date/time card */}
        <View style={styles.pad}>
          <View style={styles.whenCard}>
            <View style={styles.whenIcon}>
              <IconCal size={22} color={theme.color.paper} />
            </View>
            <View style={styles.flex1}>
              <Text style={styles.whenBig}>{trip.when}</Text>
              <Text style={styles.whenSub}>
                {trip.place} · meet at {meet}
              </Text>
            </View>
          </View>
        </View>

        {/* Note from the lead — member voice, emoji allowed here only */}
        <View style={styles.pad}>
          <View style={styles.note}>
            <View style={styles.noteHead}>
              <Avatar name={lead.name} size={30} />
              <View>
                <Text style={styles.noteWho}>{lead.name} · lead</Text>
                <Text style={styles.smallMuted}>a heads-up for this one</Text>
              </View>
            </View>
            <Text style={styles.noteBody}>
              “Be at the lot by {meet} sharp — if you&apos;re late I&apos;m leaving without you 😅. We go slow, tacos
              after.”
            </Text>
          </View>
        </View>

        {/* Itinerary */}
        <View style={styles.sectionH}>
          <Text style={styles.sectionTitle}>Itinerary</Text>
        </View>
        <View style={styles.pad}>
          <Card pad>
            {itinerary.map(([time, what], i) => (
              <View key={time} style={[styles.itinRow, i === itinerary.length - 1 && styles.itinRowLast]}>
                <View style={styles.timeTag}>
                  <Text style={styles.timeTagText}>{time}</Text>
                </View>
                <Text style={styles.itinText}>{what}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Who's going */}
        <View style={styles.pad}>
          <Card style={styles.whos} pad>
            <AvatarStack people={trip.going} size={34} />
            <View style={styles.flex1}>
              <Text style={styles.whosBig}>{trip.goingN} going</Text>
              <Text style={styles.smallMuted}>{trip.mutuals} people you know are in</Text>
            </View>
          </Card>
        </View>

        <View style={styles.ctaSpacer} />
      </ScrollView>

      {/* Direct button into the crew chat */}
      <View style={styles.ctaBar}>
        <Button
          variant="primary"
          leadingIcon={<IconChat size={18} color={theme.color.paper} />}
          onPress={() => router.push(`/crew/${crewId}/chat`)}
        >
          {`Open ${crew.name} chat`}
        </Button>
        <Text style={styles.ctaCaption}>This activity lives in the crew chat — jump in to say you&apos;re coming.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingBottom: theme.spacing.s5 },
  pad: { paddingHorizontal: theme.spacing.s4, marginTop: theme.spacing.s4 },
  flex1: { flex: 1, minWidth: 0 },
  heroNav: {
    position: "absolute",
    top: SCREEN_TOP,
    left: theme.spacing.s4,
    right: theme.spacing.s4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroBtn: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.scrim,
  },
  heroTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.neutral.onDarkFill,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  heroTagText: { fontFamily: theme.fontFamily.semibold, fontSize: 11, color: theme.color.paper },
  heroTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 26,
    letterSpacing: -0.5,
    color: theme.color.paper,
    marginTop: 8,
  },
  whenCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: theme.radius.card,
    backgroundColor: theme.color.pine,
    ...theme.shadow.soft,
  },
  whenIcon: {
    width: 42,
    height: 42,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.onDarkFill,
  },
  whenBig: { fontFamily: theme.fontFamily.bold, fontSize: 20, letterSpacing: -0.4, color: theme.color.paper },
  whenSub: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.neutral.onDark, marginTop: 2 },
  note: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderLeftWidth: 3,
    borderLeftColor: theme.color.pine,
    borderRadius: theme.radius.md,
    padding: 14,
    ...theme.shadow.soft,
  },
  noteHead: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  noteWho: { fontFamily: theme.fontFamily.semibold, fontSize: 13, color: theme.color.pine },
  noteBody: { fontFamily: theme.fontFamily.displayItalic, fontSize: 15, lineHeight: 22, color: theme.color.pine },
  smallMuted: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
  sectionH: { paddingHorizontal: theme.spacing.s4, paddingTop: theme.spacing.s5, paddingBottom: theme.spacing.s2 },
  sectionTitle: { fontFamily: theme.fontFamily.displaySemiBold, fontSize: 16, letterSpacing: -0.3, color: theme.color.pine },
  itinRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.neutral.hairline,
  },
  itinRowLast: { borderBottomWidth: 0 },
  timeTag: {
    width: 78,
    alignItems: "center",
    backgroundColor: theme.neutral.sunk,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeTagText: { fontFamily: theme.fontFamily.semibold, fontSize: 11, color: theme.color.muted },
  itinText: { flex: 1, fontFamily: theme.fontFamily.body, fontSize: 14, lineHeight: 19, color: theme.color.pine },
  whos: { flexDirection: "row", alignItems: "center", gap: 12 },
  whosBig: { fontFamily: theme.fontFamily.bold, fontSize: 15, color: theme.color.pine },
  ctaSpacer: { height: 120 },
  ctaBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s3,
    paddingBottom: theme.spacing.s6,
    backgroundColor: theme.color.canvas,
    borderTopWidth: 1,
    borderTopColor: theme.neutral.hairline,
  },
  ctaCaption: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted, textAlign: "center", marginTop: theme.spacing.s2 },
});
