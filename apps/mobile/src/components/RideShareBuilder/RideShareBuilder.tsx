// Source: Wireframe 0.4 — planBudget() "Ride share" shelf. A toggle shelf where the
// member builds their car: a driver seat (them) plus open seats others claim after
// publish. Independent of the budget shelf — either can be flipped on alone.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/tokens";
import { Button } from "@/components/Button/Button";
import { Stepper } from "@/components/Stepper/Stepper";
import { Toggle } from "@/components/Toggle/Toggle";
import { IconCar, IconPlus } from "@/components/icons";
import { type PlanDraft } from "@/lib/plan-state";

export type RideShareBuilderProps = {
  draft: Pick<PlanDraft, "rideOn" | "carSeats">;
  onToggle: () => void;
  onSeats: (dir: 1 | -1) => void;
  /** "Add another carpool" — a hook for later; riders add their own car after publish. */
  onAddCarpool?: () => void;
};

export function RideShareBuilder({ draft, onToggle, onSeats, onAddCarpool }: RideShareBuilderProps) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.title}>Ride share</Text>
          <Text style={styles.sub}>Carpool there together.</Text>
        </View>
        <Toggle on={draft.rideOn} onChange={onToggle} />
      </View>

      {draft.rideOn && (
        <View style={styles.body}>
          <Text style={styles.intro}>
            Who are you taking? Add seats to your car — once it&apos;s published, others can claim a seat or add
            their own car.
          </Text>

          <View style={styles.car}>
            <View style={styles.carHead}>
              <IconCar size={20} color={theme.color.pine} />
              <Text style={styles.carTitle}>Your car</Text>
              <Stepper
                small
                value={draft.carSeats}
                min={1}
                max={7}
                onChange={(next) => onSeats(next > draft.carSeats ? 1 : -1)}
              />
            </View>
            <View style={styles.seats}>
              {Array.from({ length: draft.carSeats }).map((_, i) => (
                <View key={i} style={[styles.seat, i === 0 ? styles.seatMe : styles.seatOpen]}>
                  <Text style={i === 0 ? styles.seatMeText : styles.seatOpenText}>
                    {i === 0 ? "You · driver" : "Open seat"}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Button
            variant="subtle"
            leadingIcon={<IconPlus size={16} color={theme.color.pine} />}
            onPress={onAddCarpool}
            style={styles.addBtn}
          >
            Add another carpool
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    marginTop: theme.spacing.s3,
    ...theme.shadow.soft,
  },
  head: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s3, padding: 14 },
  headText: { flex: 1 },
  title: { fontFamily: theme.fontFamily.bold, fontSize: 15.5, letterSpacing: -0.2, color: theme.color.pine },
  sub: { fontFamily: theme.fontFamily.body, fontSize: 12, color: theme.color.muted },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: theme.neutral.hairline,
  },
  intro: {
    fontFamily: theme.fontFamily.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: theme.color.muted,
    marginVertical: 12,
  },
  car: {
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },
  carHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: theme.neutral.sunk,
    borderBottomWidth: 1,
    borderBottomColor: theme.neutral.hairline,
  },
  carTitle: { flex: 1, fontFamily: theme.fontFamily.semibold, fontSize: 14, color: theme.color.pine },
  seats: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 12 },
  seat: {
    flexBasis: "47%",
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  // driver seat fills pine (not ember) — the reserved ember accent stays on the CTA.
  seatMe: { backgroundColor: theme.color.pine, borderWidth: 1, borderColor: theme.color.pine },
  seatOpen: { borderWidth: 1.5, borderColor: theme.neutral.hairlineStrong, borderStyle: "dashed" },
  seatMeText: { fontFamily: theme.fontFamily.semibold, fontSize: 12.5, color: theme.color.paper },
  seatOpenText: { fontFamily: theme.fontFamily.semibold, fontSize: 12.5, color: theme.color.muted },
  addBtn: { marginTop: theme.spacing.s3, alignSelf: "flex-start" },
});
