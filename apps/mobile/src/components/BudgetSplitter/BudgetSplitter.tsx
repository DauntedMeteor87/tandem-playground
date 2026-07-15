// Source: Wireframe 0.4 — planBudget() "Split a budget" shelf. A toggle shelf with
// three cost steppers (gas / permits / food) + a headcount stepper. Under $5 a head
// it nudges "buy you a coffee"; $5+ it shows the estimated per-person reimbursement.
// Presentational: values + callbacks come from the plan reducer; the $5 threshold and
// the math live in plan-state so they're tested in one place.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/tokens";
import { Stepper } from "@/components/Stepper/Stepper";
import { Toggle } from "@/components/Toggle/Toggle";
import { IconMoney } from "@/components/icons";
import {
  budgetTotal,
  perHead,
  showsNudge,
  type CostKey,
  type PlanDraft,
} from "@/lib/plan-state";

export type BudgetSplitterProps = {
  draft: Pick<PlanDraft, "budgetOn" | "gas" | "permits" | "food" | "heads">;
  onToggle: () => void;
  onCost: (key: CostKey, dir: 1 | -1) => void;
  onHeads: (dir: 1 | -1) => void;
};

const LINES: Array<{ key: CostKey; label: string; desc: string }> = [
  { key: "gas", label: "Gas", desc: "fuel to the trailhead & back" },
  { key: "permits", label: "Permits", desc: "parking or trail permits" },
  { key: "food", label: "Food", desc: "shared snacks / group meal" },
];

export function BudgetSplitter({ draft, onToggle, onCost, onHeads }: BudgetSplitterProps) {
  const total = budgetTotal(draft);
  const each = perHead(draft);
  const nudge = showsNudge(draft);

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.title}>Split a budget</Text>
          <Text style={styles.sub}>Split the cost of the trip — gas, permits, food.</Text>
        </View>
        <Toggle on={draft.budgetOn} onChange={onToggle} />
      </View>

      {draft.budgetOn && (
        <View style={styles.body}>
          {LINES.map(({ key, label, desc }) => (
            <Row key={key} label={label} desc={desc}>
              <Stepper
                value={draft[key]}
                min={0}
                max={999}
                format={(n) => `$${n}`}
                onChange={(next) => onCost(key, next > draft[key] ? 1 : -1)}
              />
            </Row>
          ))}
          <Row label="How many going?" desc="expected headcount" last>
            <Stepper
              value={draft.heads}
              min={1}
              onChange={(next) => onHeads(next > draft.heads ? 1 : -1)}
            />
          </Row>

          {total > 0 &&
            (nudge ? (
              <View style={styles.nudge}>
                <IconMoney size={18} color={theme.color.muted} />
                <Text style={styles.nudgeText}>
                  That&apos;s about <Text style={styles.bold}>${each}/person</Text> — too little to split. Just
                  have them <Text style={styles.bold}>buy you a coffee</Text> instead. Splitting kicks in over $5
                  each.
                </Text>
              </View>
            ) : (
              <View style={styles.reimburse}>
                <Text style={styles.sub}>Estimated reimbursement</Text>
                <Text style={styles.reimburseBig}>
                  ${each}
                  <Text style={styles.reimburseUnit}> / person</Text>
                </Text>
                <Text style={styles.sub}>
                  ${total} total ÷ {draft.heads} people
                </Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
}

function Row({
  label,
  desc,
  last = false,
  children,
}: {
  label: string;
  desc: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <View style={styles.rowLabel}>
        <Text style={styles.rowTitle}>{label}</Text>
        <Text style={styles.sub}>{desc}</Text>
      </View>
      {children}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.neutral.hairline,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { flex: 1 },
  rowTitle: { fontFamily: theme.fontFamily.semibold, fontSize: 14, color: theme.color.pine },
  reimburse: {
    marginTop: 14,
    padding: 16,
    borderRadius: theme.radius.md,
    backgroundColor: theme.neutral.sunk,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
  },
  reimburseBig: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 26,
    letterSpacing: -0.5,
    color: theme.color.pine,
    marginVertical: 2,
  },
  reimburseUnit: { fontFamily: theme.fontFamily.semibold, fontSize: 14, color: theme.color.muted },
  nudge: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.s2,
    marginTop: 14,
    padding: 14,
    borderRadius: theme.radius.md,
    backgroundColor: theme.status.warning.bg,
  },
  nudgeText: {
    flex: 1,
    fontFamily: theme.fontFamily.body,
    fontSize: 13,
    lineHeight: 19,
    color: theme.color.pine,
  },
  bold: { fontFamily: theme.fontFamily.bold },
});
