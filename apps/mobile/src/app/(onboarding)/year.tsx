// Source: Wireframe 0.4 — SCREENS['ob-year']. Pick a school year. As in the
// wireframe (pickYear), tapping a chip selects it and advances to basics; Skip and
// Continue also go to basics.
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Chip } from "@/components/Chip/Chip";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { OB_ROUTE, useOnboarding } from "@/lib/onboarding-state";

const YEARS = ["Freshman", "Sophomore", "Junior", "Senior", "Grad"] as const;

export default function YearStep() {
  const { draft, dispatch } = useOnboarding();
  const router = useRouter();
  const pick = (value: string) => {
    dispatch({ type: "SET_YEAR", value });
    router.push(OB_ROUTE.basics);
  };
  return (
    <OnboardingShell step="year" question="What year are you?">
      <View style={styles.wrap}>
        {YEARS.map((y) => (
          <Chip key={y} on={draft.year === y} onPress={() => pick(y)}>
            {y}
          </Chip>
        ))}
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, // wireframe gap:10px
});
