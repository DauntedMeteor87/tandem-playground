// Source: Wireframe 0.4 — the Plan → Activity wizard route group. Wraps the wizard in
// the PlanProvider so the single wizard screen and its steps share one trip draft.
import { Stack } from "expo-router";
import { PlanProvider } from "@/lib/plan-state";
import { theme } from "@/theme/tokens";

export default function PlanActivityLayout() {
  return (
    <PlanProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.color.canvas },
        }}
      />
    </PlanProvider>
  );
}
