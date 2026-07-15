// Source: Wireframe 0.4 — SCREENS['ob-experience']. Rate the eight fixed activities
// by how many times you've been (0 → 5+). All good to leave at zero and skip.
import { StyleSheet } from "react-native";
import { Button } from "@/components/Button/Button";
import { ExperienceRatings } from "@/components/ExperienceRatings/ExperienceRatings";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { IconPlus } from "@/components/icons";
import { useOnboarding } from "@/lib/onboarding-state";
import { theme } from "@/theme/tokens";

export default function ExperienceStep() {
  const { draft, dispatch } = useOnboarding();
  return (
    <OnboardingShell
      step="experience"
      question="Tell us about your experience"
      hint="Roughly how many times you've been. All good to leave everything at zero and skip — just bump the ones you're good at or that you resonate with."
    >
      <ExperienceRatings
        values={draft.experience}
        onChange={(name, value) => dispatch({ type: "SET_EXPERIENCE", name, value })}
      />
      {/* wireframe: a `.tag` button that toasts "Certifications editable later in
          profile". Certs are edited later from your profile, so it's a no-op here. */}
      <Button
        variant="subtle"
        size="sm"
        full={false}
        leadingIcon={<IconPlus size={17} color={theme.color.pine} />}
        onPress={() => {}}
        style={styles.cert}
      >
        Add certifications
      </Button>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  cert: { marginTop: theme.spacing.s4 }, // wireframe .tag.mt4
});
