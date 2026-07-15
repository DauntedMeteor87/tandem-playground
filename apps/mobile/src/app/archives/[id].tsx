// Source: Wireframe 0.4 — SCREENS['archive']. Archive detail: who went
// (AvatarStack), the roster, and buttons to message the poster for insight or reach
// out for details. No "clone" action on mobile (that's a web/Studio affordance).
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { Avatar, AvatarStack, Button, Card, IconBack, IconChev, IconHearto, ListRow, PhotoFrame, SCREEN_TOP } from "@/components";
import { ARCHIVES, PEOPLE, personInitials } from "@/lib/demo-data";

export default function ArchiveDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const archive = ARCHIVES[id ?? ""] ?? Object.values(ARCHIVES)[0];
  const poster = PEOPLE[archive.poster];
  const first = poster.name.split(" ")[0];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View>
          <PhotoFrame
            height={420}
            protect
            overlay={
              <View>
                <View style={styles.heroTag}>
                  <Text style={styles.heroTagText}>
                    {archive.kind} · {archive.crew}
                  </Text>
                </View>
                <Text style={styles.heroTitle}>{archive.title}</Text>
                <Text style={styles.heroSub}>
                  {archive.place} · {archive.when}
                </Text>
              </View>
            }
          />
          <View style={styles.heroNav}>
            <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.heroBtn}>
              <IconBack size={22} color={theme.color.paper} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Save to your ideas" onPress={() => {}} style={styles.heroBtn}>
              <IconHearto size={22} color={theme.color.paper} />
            </Pressable>
          </View>
        </View>

        {/* Caption */}
        <View style={styles.pad}>
          <Text style={styles.caption}>{archive.caption}</Text>
        </View>

        {/* Who went */}
        <View style={styles.sectionH}>
          <Text style={styles.sectionTitle}>Who went</Text>
          <Text style={styles.more}>{archive.roster.length} people</Text>
        </View>
        <View style={styles.pad}>
          <Card style={styles.whos} pad>
            <AvatarStack people={archive.roster.map(personInitials)} size={34} />
            <View style={styles.flex1}>
              <Text style={styles.whosBig}>{first}&apos;s crew</Text>
              <Text style={styles.smallMuted}>
                Posted by {poster.name} · {archive.crew}
              </Text>
            </View>
          </Card>
        </View>

        {/* Roster */}
        <View style={styles.pad}>
          <Card>
            {archive.roster.map((pid, i) => {
              const person = PEOPLE[pid];
              return (
                <ListRow
                  key={pid}
                  leading={<Avatar name={person.name} size={40} />}
                  title={`${person.name}${pid === archive.poster ? " · posted this" : ""}`}
                  subtitle={`${person.year} · ${person.from}`}
                  trailing={<IconChev size={20} color={theme.color.muted} />}
                  last={i === archive.roster.length - 1}
                  onPress={() => {}}
                />
              );
            })}
          </Card>
        </View>

        <View style={styles.footer} />
      </ScrollView>

      {/* Reach-out CTAs (dm lands in Wave 4). No clone on mobile. */}
      <View style={styles.ctaBar}>
        <Button variant="primary" onPress={() => {}}>
          {`Message ${first} for insight`}
        </Button>
        <View style={styles.ctaGap} />
        <Button variant="ghost" onPress={() => {}}>
          Reach out for details
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingBottom: theme.spacing.s5 },
  pad: { paddingHorizontal: theme.spacing.s4, marginTop: theme.spacing.s3 },
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
  heroTitle: { fontFamily: theme.fontFamily.bold, fontSize: 26, letterSpacing: -0.5, color: theme.color.paper, marginTop: 8 },
  heroSub: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.neutral.onDark, marginTop: 4 },
  caption: { fontFamily: theme.fontFamily.body, fontSize: 15, lineHeight: 22, color: theme.color.pine },
  sectionH: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s5,
    paddingBottom: theme.spacing.s2,
  },
  sectionTitle: { fontFamily: theme.fontFamily.displaySemiBold, fontSize: 16, letterSpacing: -0.3, color: theme.color.pine },
  more: { fontFamily: theme.fontFamily.semibold, fontSize: 13, color: theme.color.muted },
  whos: { flexDirection: "row", alignItems: "center", gap: 12 },
  whosBig: { fontFamily: theme.fontFamily.bold, fontSize: 15, color: theme.color.pine },
  smallMuted: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
  footer: { height: 150 },
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
  ctaGap: { height: theme.spacing.s2 },
});
