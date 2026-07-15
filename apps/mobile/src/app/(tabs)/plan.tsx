// Source: Wireframe 0.4 — SCREENS['plan'] + openPlanSheet(). The plan chooser: a
// "Pick back up" drafts shelf and a "Plan something new" button that opens a quick
// menu — an Activity (planned here on the phone) or an Adventure (handed off to the
// member's Mac). The two options route into the real flows.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { Button, IconClock, IconPlus, IconTent, Sheet, TabHeader, TripCard } from "@/components";

const DRAFTS = [
  { id: "draft", title: "Bishop Peak (draft)", club: "Not published" },
  { id: "inspo", title: "Inspo — saved ideas" },
];

export default function PlanScreen() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const startActivity = () => {
    setSheetOpen(false);
    router.push("/plan-activity");
  };
  const startAdventure = () => {
    setSheetOpen(false);
    router.push("/plan-adventure/handoff");
  };

  return (
    <View style={styles.screen}>
      <TabHeader title="Plan" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionH}>
          <Text style={theme.type.heading}>Pick back up</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelf}>
          {DRAFTS.map((d) => (
            <TripCard key={d.id} trip={d} mode="shelf" width={180} onPress={() => {}} />
          ))}
        </ScrollView>

        <View style={styles.actionBlock}>
          <Button
            variant="primary"
            leadingIcon={<IconPlus size={18} color={theme.color.paper} />}
            onPress={() => setSheetOpen(true)}
          >
            Plan something new
          </Button>
          <Text style={styles.caption}>Opens a quick menu — an activity or an adventure.</Text>
        </View>
      </ScrollView>

      <Sheet open={sheetOpen} title="Plan something new" onClose={() => setSheetOpen(false)}>
        <Text style={styles.sheetSub}>Two kinds of trips — pick one.</Text>
        <OptCard
          icon={<IconClock size={22} color={theme.color.pine} />}
          title="Activity"
          sub="A day thing — plan it right here on your phone."
          onPress={startActivity}
        />
        <OptCard
          icon={<IconTent size={22} color={theme.color.pine} />}
          title="Adventure"
          sub="Overnight — send the link to your Mac to plan."
          onPress={startAdventure}
        />
        <Button variant="ghost" onPress={() => setSheetOpen(false)} style={styles.cancel}>
          Cancel
        </Button>
      </Sheet>
    </View>
  );
}

function OptCard({
  icon,
  title,
  sub,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.optCard}>
      <View style={styles.optIcon}>{icon}</View>
      <View style={styles.flex1}>
        <Text style={styles.optTitle}>{title}</Text>
        <Text style={styles.optSub}>{sub}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  content: { paddingBottom: theme.spacing.s7 },
  sectionH: {
    paddingTop: theme.spacing.s5,
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s3,
  },
  shelf: { gap: theme.spacing.s3, paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s2 },
  actionBlock: { paddingHorizontal: theme.spacing.s4, paddingTop: theme.spacing.s6, gap: theme.spacing.s2 },
  caption: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted, textAlign: "center" },
  sheetSub: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.color.muted, marginBottom: theme.spacing.s3 },
  optCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    marginBottom: theme.spacing.s3,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
  },
  optIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
  flex1: { flex: 1, minWidth: 0 },
  optTitle: { fontFamily: theme.fontFamily.bold, fontSize: 17, letterSpacing: -0.2, color: theme.color.pine },
  optSub: { fontFamily: theme.fontFamily.body, fontSize: 12.5, color: theme.color.muted, marginTop: 2 },
  cancel: { marginTop: theme.spacing.s2 },
});
