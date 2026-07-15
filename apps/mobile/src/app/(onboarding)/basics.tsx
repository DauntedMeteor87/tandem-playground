// Source: Wireframe 0.4 — SCREENS['ob-basics']. Major + hometown; both show on
// your profile so people have something to say hi about.
import { StyleSheet, View } from "react-native";
import { Input } from "@/components/Input/Input";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { useOnboarding } from "@/lib/onboarding-state";
import { theme } from "@/theme/tokens";

export default function BasicsStep() {
  const { draft, dispatch } = useOnboarding();
  return (
    <OnboardingShell
      step="basics"
      question="A couple basics"
      hint="These show on your profile so people have something to say hi about."
    >
      <Input
        label="Major"
        placeholder="e.g. Environmental Science"
        value={draft.major}
        onChangeText={(value) => dispatch({ type: "SET_MAJOR", value })}
      />
      <View style={styles.gap} />
      <Input
        label="Hometown"
        placeholder="e.g. Sacramento, CA"
        value={draft.hometown}
        onChangeText={(value) => dispatch({ type: "SET_HOMETOWN", value })}
      />
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  gap: { height: theme.spacing.s4 }, // wireframe .label.mt4 between the two fields
});
