// Source: Wireframe 0.4 — SCREENS['plan-adventure-link'] + openAirdrop(). Adventures
// aren't planned on the phone — this tiny hand-off sends the studio link to the
// member's Mac: an "AirDrop to your Mac" tile + the written-out link with a Copy
// button. Intentionally minimal per the migration doc (§3, "Plan → Adventure").
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import { PageHeader, Sheet, IconAirdrop, IconCheck, IconChev, IconLaptop, IconShare } from "@/components";

const LINK = "tandemlife.studio";

export default function PlanAdventureHandoff() {
  const router = useRouter();
  const [airOpen, setAirOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const copy = () => {
    // TODO: real clipboard once expo-clipboard lands — local confirmation for now.
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  const airdropSend = () => {
    setAirOpen(false);
    setSent(true);
  };

  return (
    <View style={styles.screen}>
      <PageHeader title="Plan an adventure" onBack={() => router.back()} />
      <View style={styles.body}>
        <Text style={styles.intro}>
          Adventures get planned on your Mac — more room for the write-up and budget. Send yourself the link:
        </Text>

        <Pressable accessibilityRole="button" onPress={() => setAirOpen(true)} style={styles.airCard}>
          <View style={styles.airIcon}>
            <IconAirdrop size={34} color={theme.color.paper} />
          </View>
          <Text style={styles.airTitle}>AirDrop to your Mac</Text>
          <Text style={styles.airSub}>{LINK}</Text>
        </Pressable>
        {sent && <Text style={styles.sent}>Sent to your Mac.</Text>}

        <Text style={styles.divLabel}>or copy it</Text>
        <View style={styles.copyRow}>
          <Text style={styles.copyUrl} numberOfLines={1}>
            {LINK}
          </Text>
          <Pressable accessibilityRole="button" onPress={copy} style={styles.copyBtn}>
            {copied ? (
              <IconCheck size={16} color={theme.color.pine} />
            ) : (
              <IconShare size={16} color={theme.color.pine} />
            )}
            <Text style={styles.copyBtnText}>{copied ? "Copied" : "Copy"}</Text>
          </Pressable>
        </View>
      </View>

      <Sheet open={airOpen} title="AirDrop" onClose={() => setAirOpen(false)}>
        <Text style={styles.sheetSub}>
          Tap a device to send <Text style={styles.bold}>{LINK}</Text>
        </Text>
        <Pressable accessibilityRole="button" onPress={airdropSend} style={styles.device}>
          <View style={styles.deviceIcon}>
            <IconLaptop size={24} color={theme.color.pine} />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.deviceName}>Your MacBook Pro</Text>
            <Text style={styles.deviceSub}>Ready · same Apple ID</Text>
          </View>
          <IconChev size={18} color={theme.color.muted} />
        </Pressable>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  body: { paddingHorizontal: theme.spacing.s4, paddingTop: theme.spacing.s5 },
  intro: {
    fontFamily: theme.fontFamily.body,
    fontSize: 15,
    lineHeight: 22,
    color: theme.color.muted,
    textAlign: "center",
    marginBottom: theme.spacing.s6,
  },
  airCard: {
    alignItems: "center",
    gap: 5,
    paddingVertical: theme.spacing.s6,
    paddingHorizontal: theme.spacing.s4,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.lg,
    ...theme.shadow.soft,
  },
  airIcon: {
    width: 66,
    height: 66,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.ember, // the one ember accent — the primary hand-off action
    marginBottom: theme.spacing.s1,
  },
  airTitle: { fontFamily: theme.fontFamily.bold, fontSize: 17, letterSpacing: -0.3, color: theme.color.pine },
  airSub: { fontFamily: theme.fontFamily.semibold, fontSize: 13.5, color: theme.color.muted },
  sent: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 12,
    color: theme.color.muted,
    textAlign: "center",
    marginTop: theme.spacing.s3,
  },
  divLabel: { ...theme.type.eyebrow, marginTop: theme.spacing.s6, marginBottom: theme.spacing.s2 },
  copyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3,
    padding: 8,
    paddingLeft: 16,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.md,
  },
  copyUrl: { flex: 1, minWidth: 0, fontFamily: theme.fontFamily.semibold, fontSize: 15, color: theme.color.pine },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.neutral.sunk,
  },
  copyBtnText: { fontFamily: theme.fontFamily.bold, fontSize: 13.5, color: theme.color.pine },

  /* airdrop sheet */
  sheetSub: { fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.color.muted, marginBottom: theme.spacing.s4, textAlign: "center" },
  bold: { fontFamily: theme.fontFamily.bold, color: theme.color.pine },
  device: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.md,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
  flex1: { flex: 1, minWidth: 0 },
  deviceName: { fontFamily: theme.fontFamily.semibold, fontSize: 15, color: theme.color.pine },
  deviceSub: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
});
