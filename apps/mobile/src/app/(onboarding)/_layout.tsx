// Source: Wireframe 0.4 — FLOW 1 Onboarding route group. Wraps all eight steps in
// the OnboardingProvider so they share one draft profile, and hosts them in a
// headerless Stack (the StepShell draws its own progress bar + back button).
import { Stack } from "expo-router";
import { OnboardingProvider } from "@/lib/onboarding-state";
import { theme } from "@/theme/tokens";

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.color.canvas },
        }}
      />
    </OnboardingProvider>
  );
}
