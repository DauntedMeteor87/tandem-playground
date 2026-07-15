// Source: Wireframe 0.4 — SCREENS['ob-about']. "Tell us about yourself": favorite
// ways you like to get outside, pick up to 5. Shapes the Home feed and who you
// meet. (The wireframe titles this step "about"; it is activity picks, not a
// freeform text box.)
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "@/components/Chip/Chip";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { useOnboarding } from "@/lib/onboarding-state";
import { theme } from "@/theme/tokens";

const ACTIVITIES = [
  "Backpacking",
  "Day hikes",
  "Climbing",
  "Surfing",
  "Snowboarding",
  "Skiing",
  "Trail running",
  "Kayaking",
  "Mountain biking",
  "Camping",
  "Photography",
  "Ceramics",
] as const;

export default function AboutStep() {
  const { draft, dispatch } = useOnboarding();
  return (
    <OnboardingShell
      step="about"
      question="Tell us about yourself"
      hint="Favorite ways you like to get outside — the modes you show up for. Pick up to 5."
    >
      <View style={styles.wrap}>
        {ACTIVITIES.map((a) => (
          <Chip
            key={a}
            on={draft.activities.includes(a)}
            onPress={() => dispatch({ type: "TOGGLE_ACTIVITY", value: a })}
          >
            {a}
          </Chip>
        ))}
      </View>
      <Text style={styles.count}>
        {draft.activities.length}/5 picked · shapes your Home feed and who you meet.
      </Text>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, // wireframe gap:10px
  count: { ...theme.type.small, marginTop: theme.spacing.s4 },
});
