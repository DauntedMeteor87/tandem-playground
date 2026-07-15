// Source: Wireframe 0.4 — SCREENS['trip'] + the trip-hub panels (hubOverview /
// hubRides / hubDetails / hubWho). An Adventure card opens this full trip page:
// hero, Overview (who's going, itinerary, cost), Rides & tent, and the details +
// what-to-pack, with the Join now / Enter for a spot CTA.
// TODO: Wave 4 — the live crew chat + 4-way swipe canvas replace this stacked view.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import {
  Avatar,
  AvatarStack,
  Button,
  Card,
  IconApple,
  IconBack,
  IconCheck,
  IconClock,
  IconFlag,
  IconPerson,
  IconShare,
  ListRow,
  PhotoFrame,
  SCREEN_TOP,
  Segment,
  Tag,
} from "@/components";
import { JOINED, PEOPLE, TRIPS, costsOf, itineraryOf } from "@/lib/demo-data";

type JoinState = "joined" | "entered" | null;
type RideTab = "Rides" | "Tent";

const PACK_ITEMS = ["Sleeping bag (0°F)", "Headlamp", "2L water", "Swimsuit + towel", "Trail snacks", "Layers — it gets cold"];
const RIDE_SLOTS = ["Jordan — 3 seats", "You", "+ open seat", "+ open seat", "+ open seat", "+ open seat"];
const TENT_SLOTS = ["Maya's 4-person", "You", "+ open spot", "+ open spot"];
const TAKEN = 2; // first two slots are already taken in each list

export default function TripScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = TRIPS[id ?? ""] ?? TRIPS.sykes;
  const lead = PEOPLE[trip.lead];

  const [joined, setJoined] = React.useState<JoinState>((JOINED[trip.id] as JoinState) ?? null);
  const [rideTab, setRideTab] = React.useState<RideTab>("Rides");
  const [claimed, setClaimed] = React.useState<Record<string, boolean>>({});
  const [packed, setPacked] = React.useState<Record<number, boolean>>({});

  const itinerary = itineraryOf(trip);
  const costs = costsOf(trip);
  const isLottery = trip.mode === "lottery";
  const isFull = trip.spots.toLowerCase().includes("full");
  const slots = rideTab === "Rides" ? RIDE_SLOTS : TENT_SLOTS;

  const onJoin = () => setJoined(isLottery ? "entered" : "joined");

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View>
          <PhotoFrame
            height={460}
            protect
            overlay={
              <View>
                <View style={styles.heroTag}>
                  <Text style={styles.heroTagText}>
                    {trip.kind} · {trip.club}
                  </Text>
                </View>
                <Text style={styles.heroTitle}>{trip.title}</Text>
                <Text style={styles.heroSub}>
                  {trip.when} · {trip.place}
                </Text>
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

        {/* Who's going + meta tags */}
        <View style={styles.pad}>
          <Card style={styles.whos} pad>
            <AvatarStack people={trip.going} size={34} />
            <View style={styles.flex1}>
              <Text style={styles.whosBig}>{trip.goingN} going</Text>
              <Text style={styles.smallMuted}>{trip.mutuals} people you know are in</Text>
            </View>
          </Card>
          <View style={styles.tagRow}>
            <Tag leadingIcon={<IconFlag size={14} color={theme.color.muted} />}>{trip.diff}</Tag>
            {trip.beginner && <Tag leadingIcon={<IconCheck size={14} color={theme.color.muted} />}>Beginner-friendly</Tag>}
            <Tag leadingIcon={<IconPerson size={14} color={theme.color.muted} />}>{trip.spots}</Tag>
            <Tag leadingIcon={trip.cost === "Free" ? undefined : <IconApple size={13} color={theme.color.muted} />}>
              {trip.cost}
            </Tag>
          </View>
        </View>

        {/* Overview — itinerary */}
        <SectionTitle>Itinerary</SectionTitle>
        <View style={styles.pad}>
          <Card pad>
            {itinerary.map(([time, what], i) => (
              <Row key={time} last={i === itinerary.length - 1}>
                <View style={styles.timeTag}>
                  <Text style={styles.timeTagText}>{time}</Text>
                </View>
                <Text style={styles.itinText}>{what}</Text>
              </Row>
            ))}
          </Card>
        </View>

        {/* Overview — cost breakdown */}
        <SectionTitle>Cost breakdown</SectionTitle>
        <View style={styles.pad}>
          <Card pad>
            {costs.map(([label, value], i) => (
              <Row key={label} last={i === costs.length - 1} split>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowStrong}>{value}</Text>
              </Row>
            ))}
          </Card>
        </View>

        {/* Rides & tent */}
        <SectionTitle>Rides &amp; tent</SectionTitle>
        <View style={styles.pad}>
          <Segment options={["Rides", "Tent"]} value={rideTab} onChange={(v) => setRideTab(v as RideTab)} />
          <Text style={[styles.smallMuted, styles.ridesHint]}>
            {rideTab === "Rides"
              ? "Tap an open seat to claim it. Driver cancels → riders notified → autofill from the waitlist."
              : "Tap an open tent spot to claim it."}
          </Text>
          <View style={styles.slots}>
            {slots.map((label, i) => {
              const open = i >= TAKEN;
              const key = `${rideTab}-${i}`;
              const isClaimed = claimed[key];
              return (
                <Pressable
                  key={key}
                  disabled={!open}
                  onPress={() => setClaimed((c) => ({ ...c, [key]: true }))}
                  style={[styles.slot, open ? styles.slotOpen : styles.slotTaken, isClaimed && styles.slotClaimed]}
                >
                  <Text style={[styles.slotText, (!open || isClaimed) && styles.slotTextTaken]}>
                    {isClaimed ? "✓ You" : label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* The details */}
        <SectionTitle>The details</SectionTitle>
        <View style={styles.pad}>
          <Card>
            <ListRow
              leading={<Avatar name={lead.name} size={40} />}
              title={`${lead.name} · ${trip.club} lead`}
              subtitle={`${lead.trips} trips${lead.trips >= 10 ? " · experienced" : ""} · ${lead.certs.join(" · ") || "—"}`}
              last
            />
          </Card>
          <Text style={styles.desc}>{trip.desc}</Text>
          <Card pad>
            <Row split>
              <Text style={styles.rowLabel}>Cost</Text>
              <Text style={styles.rowStrong}>{trip.cost === "Free" ? "Free" : `${trip.cost} · Apple Pay`}</Text>
            </Row>
            <Row split last>
              <Text style={styles.rowLabel}>Capacity</Text>
              <Text style={styles.rowStrong}>{trip.spots}</Text>
            </Row>
          </Card>
        </View>

        {/* What to pack */}
        <SectionTitle>What to pack</SectionTitle>
        <View style={styles.pad}>
          {PACK_ITEMS.map((item, i) => {
            const done = packed[i];
            return (
              <Pressable key={item} onPress={() => setPacked((p) => ({ ...p, [i]: !p[i] }))} style={styles.check}>
                <View style={[styles.checkBox, done && styles.checkBoxDone]}>
                  {done && <IconCheck size={14} color={theme.color.paper} />}
                </View>
                <Text style={[styles.checkText, done && styles.checkTextDone]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        {isLottery && (
          <View style={styles.pad}>
            <View style={styles.banner}>
              <IconClock size={18} color={theme.color.muted} />
              <Text style={styles.bannerText}>
                Lottery trip — results push Wednesday 8 AM, pay by midnight. First-timers get 2 entries.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.ctaSpacer} />
      </ScrollView>

      {/* Join CTA */}
      <View style={styles.ctaBar}>
        {joined === "joined" ? (
          <Button variant="subtle" leadingIcon={<IconCheck size={16} color={theme.color.pine} />} onPress={() => {}}>
            You&apos;re in — open trip
          </Button>
        ) : joined === "entered" ? (
          <Button variant="subtle" onPress={() => {}}>
            Entered · results Wed 8 AM
          </Button>
        ) : (
          <Button variant="primary" onPress={onJoin}>
            {isLottery ? (isFull ? "Join waitlist" : "Enter for a spot") : "Join now"}
          </Button>
        )}
      </View>
    </View>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.sectionH}>
      <Text style={theme.type.heading}>{children}</Text>
    </View>
  );
}

function Row({ children, last, split }: { children: React.ReactNode; last?: boolean; split?: boolean }) {
  return <View style={[styles.row, split && styles.rowSplit, last && styles.rowLast]}>{children}</View>;
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
  heroTitle: { fontFamily: theme.fontFamily.bold, fontSize: 28, letterSpacing: -0.5, color: theme.color.paper, marginTop: 8 },
  heroSub: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.neutral.onDark, marginTop: 4 },
  whos: { flexDirection: "row", alignItems: "center", gap: 12 },
  whosBig: { fontFamily: theme.fontFamily.bold, fontSize: 15, color: theme.color.pine },
  smallMuted: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.s2, marginTop: theme.spacing.s3 },
  sectionH: { paddingHorizontal: theme.spacing.s4, paddingTop: theme.spacing.s5, paddingBottom: theme.spacing.s2 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.neutral.hairline,
  },
  rowSplit: { justifyContent: "space-between" },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { fontFamily: theme.fontFamily.medium, fontSize: 14, color: theme.color.muted },
  rowStrong: { fontFamily: theme.fontFamily.semibold, fontSize: 14, color: theme.color.pine },
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
  desc: { fontFamily: theme.fontFamily.body, fontSize: 15, lineHeight: 22, color: theme.color.pine, marginVertical: theme.spacing.s3 },
  ridesHint: { marginTop: theme.spacing.s3 },
  slots: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.s2, marginTop: theme.spacing.s3 },
  slot: {
    flexBasis: "47%",
    flexGrow: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: theme.radius.sm,
    alignItems: "center",
  },
  slotOpen: { borderWidth: 1, borderStyle: "dashed", borderColor: theme.neutral.hairlineStrong, backgroundColor: theme.color.paper },
  slotTaken: { backgroundColor: theme.neutral.sunk, borderWidth: 1, borderColor: theme.neutral.hairline },
  slotClaimed: { backgroundColor: theme.status.success.bg, borderColor: theme.color.leaf, borderStyle: "solid" },
  slotText: { fontFamily: theme.fontFamily.semibold, fontSize: 13, color: theme.color.pine },
  slotTextTaken: { color: theme.color.muted },
  check: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s3, paddingVertical: 10 },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.paper,
  },
  checkBoxDone: { backgroundColor: theme.color.pine, borderColor: theme.color.pine },
  checkText: { flex: 1, fontFamily: theme.fontFamily.body, fontSize: 15, color: theme.color.pine },
  checkTextDone: { color: theme.color.muted, textDecorationLine: "line-through" },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.neutral.hairlineStrong,
    backgroundColor: theme.color.paper,
  },
  bannerText: { flex: 1, fontFamily: theme.fontFamily.body, fontSize: 13, lineHeight: 18, color: theme.color.muted },
  ctaSpacer: { height: 96 },
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
});
