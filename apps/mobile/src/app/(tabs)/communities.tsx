// Source: Wireframe 0.4 — SCREENS['communities'] + communitiesJoin(). Yours/Join
// segment: "Yours" lists the clubs you're in and the crews you've hearted; "Join"
// is the Clubs/Crews browser with create actions. Club detail, crew chat, and the
// create wizards land in Wave 4 — those taps are placeholders here.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import {
  Avatar,
  Button,
  Card,
  Chip,
  EmptyState,
  IconChev,
  IconComm,
  IconPlus,
  ListRow,
  PhotoFrame,
  Segment,
  TabHeader,
} from "@/components";
import { CLUBS, CREWS, heartedCrews, type Club, type Crew } from "@/lib/demo-data";

type Tab = "Yours" | "Join";
type JoinFilter = "Clubs" | "Crews";

// wireframe S.members seed = { hiking:true }; hearted crews come from the data.
const YOUR_CLUBS: Club[] = [CLUBS.hiking];

export default function CommunitiesScreen() {
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>("Yours");
  const [filter, setFilter] = React.useState<JoinFilter>("Clubs");

  const yourCrews = heartedCrews();

  return (
    <View style={styles.screen}>
      <TabHeader title="Communities" />
      <View style={styles.segmentWrap}>
        <Segment options={["Yours", "Join"]} value={tab} onChange={(v) => setTab(v as Tab)} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === "Yours" ? (
          <View style={styles.pad}>
            <Text style={styles.divLabel}>your clubs</Text>
            <Card>
              {YOUR_CLUBS.map((c, i) => (
                <ListRow
                  key={c.id}
                  leading={<Avatar name={c.name} size={44} style={styles.squareAvatar} />}
                  title={c.name}
                  subtitle={`${c.kind} · ${c.members} members`}
                  trailing={<IconChev size={20} color={theme.color.muted} />}
                  last={i === YOUR_CLUBS.length - 1}
                  onPress={() => {}}
                />
              ))}
            </Card>

            <Text style={styles.divLabel}>your crews</Text>
            {yourCrews.length > 0 ? (
              <Card>
                {yourCrews.map((c, i) => (
                  <ListRow
                    key={c.id}
                    leading={
                      <View style={styles.crewIcon}>
                        <IconComm size={22} color={theme.color.pine} />
                      </View>
                    }
                    title={c.name}
                    subtitle={`You + ${c.members - 1} · ${c.sub}`}
                    trailing={<IconChev size={20} color={theme.color.muted} />}
                    last={i === yourCrews.length - 1}
                    onPress={() => router.push(`/crew/${c.id}/chat`)}
                  />
                ))}
              </Card>
            ) : (
              // #8 — no crews yet: a warm blank with the one way in.
              <EmptyState
                pose="empty-seat"
                poseSize={148}
                line="No crews yet — join a trip and you'll land in one automatically."
                cta={{ label: "See sign ups", variant: "primary", onPress: () => router.push("/signups") }}
              />
            )}
          </View>
        ) : (
          <JoinBrowser filter={filter} onFilter={setFilter} onOpenCrew={(id) => router.push(`/crew/${id}/chat`)} />
        )}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

function JoinBrowser({
  filter,
  onFilter,
  onOpenCrew,
}: {
  filter: JoinFilter;
  onFilter: (f: JoinFilter) => void;
  onOpenCrew: (id: string) => void;
}) {
  const list: Array<Club | Crew> = filter === "Clubs" ? Object.values(CLUBS) : Object.values(CREWS);
  const isClubs = filter === "Clubs";
  return (
    <View style={styles.pad}>
      <View style={styles.chips}>
        <Chip on={isClubs} onPress={() => onFilter("Clubs")}>
          Clubs
        </Chip>
        <Chip on={!isClubs} onPress={() => onFilter("Crews")}>
          Crews
        </Chip>
      </View>
      <View style={styles.createRow}>
        <Button variant="subtle" full={false} leadingIcon={<IconPlus size={16} color={theme.color.pine} />} onPress={() => {}} style={styles.createBtn}>
          Create a crew
        </Button>
        <Button variant="subtle" full={false} leadingIcon={<IconPlus size={16} color={theme.color.pine} />} onPress={() => {}} style={styles.createBtn}>
          Create a club
        </Button>
      </View>
      <Text style={styles.caption}>Crews you can spin up right here on your phone. Clubs are set up on desktop.</Text>

      <View style={styles.tiles}>
        {list.map((c) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            onPress={() => (isClubs ? undefined : onOpenCrew(c.id))}
            style={styles.cell}
          >
            <Card>
              <PhotoFrame height={96} />
              <View style={styles.tileMeta}>
                <Text style={theme.type.cardTitle}>{c.name}</Text>
                <Text style={styles.tileSub}>
                  {c.members} members{isClubs ? "" : " · public crew"}
                </Text>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  segmentWrap: { paddingHorizontal: theme.spacing.s4, paddingBottom: theme.spacing.s3 },
  content: { paddingTop: theme.spacing.s1 },
  pad: { paddingHorizontal: theme.spacing.s4 },
  divLabel: {
    ...theme.type.eyebrow,
    marginTop: theme.spacing.s4,
    marginBottom: theme.spacing.s2,
  },
  squareAvatar: { borderRadius: theme.radius.md },
  crewIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
  chips: { flexDirection: "row", gap: theme.spacing.s2, marginTop: theme.spacing.s3 },
  createRow: { flexDirection: "row", gap: theme.spacing.s2, marginTop: theme.spacing.s3 },
  createBtn: { flex: 1 },
  caption: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted, marginTop: theme.spacing.s2 },
  tiles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.s3,
    marginTop: theme.spacing.s4,
  },
  cell: { flexBasis: "47%", flexGrow: 1 },
  tileMeta: { padding: theme.spacing.s3 },
  tileSub: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted, marginTop: theme.spacing.s2 },
  footer: { height: theme.spacing.s6 },
});
