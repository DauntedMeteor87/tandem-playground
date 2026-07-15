// Source: Wireframe 0.4 — SCREENS['ob-verify']. Verify your school email to earn
// the join button. "Skip for now" drops into read-only browsing; "Verify & finish"
// completes verification. Both land on the gallery placeholder (real Home + its
// read-only home banner arrive in Wave 3).
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "@/components/Input/Input";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { IconLock } from "@/components/icons";
import { useOnboarding } from "@/lib/onboarding-state";
import { theme } from "@/theme/tokens";

export default function VerifyStep() {
  const { dispatch } = useOnboarding();
  const router = useRouter();

  const finish = (type: "VERIFY" | "SKIP_VERIFY") => {
    dispatch({ type });
    // TODO: backend seam — email verification.
    router.replace("/");
  };

  return (
    <OnboardingShell
      step="verify"
      question="Verify your school email"
      hint="Last step. Verifying earns your join button — it's how we keep trips students-only."
      cta="Verify & finish"
      onCta={() => finish("VERIFY")}
      skipLabel="Skip for now"
      onSkip={() => finish("SKIP_VERIFY")}
    >
      <Input placeholder="you@calpoly.edu" />
      {/* Read-only-mode banner — the canonical skip treatment, always shown here so
          the trade-off is explicit before the member taps "Skip for now"
          (wireframe .banner). */}
      <View style={styles.banner}>
        <IconLock size={17} color={theme.color.pine} />
        <Text style={styles.bannerText}>
          Skip and you can still browse real trips — you just can&apos;t join one until you verify.
        </Text>
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: theme.spacing.s3,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: theme.radius.md,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.neutral.hairlineStrong,
  },
  bannerText: { flex: 1, fontFamily: theme.fontFamily.body, fontSize: 13, color: theme.color.muted },
});
