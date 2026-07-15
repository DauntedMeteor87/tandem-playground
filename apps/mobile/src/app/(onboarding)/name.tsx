// Source: Wireframe 0.4 — SCREENS['ob-name']. First name only; the profile pic
// moved to the photos step in 0.4. Forced (no Skip).
import { Input } from "@/components/Input/Input";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { useOnboarding } from "@/lib/onboarding-state";

export default function NameStep() {
  const { draft, dispatch } = useOnboarding();
  return (
    <OnboardingShell
      step="name"
      question="What should we call you?"
      hint="First name only — you can't change it later."
    >
      <Input
        placeholder="Your first name"
        value={draft.name}
        onChangeText={(value) => dispatch({ type: "SET_NAME", value })}
      />
    </OnboardingShell>
  );
}
