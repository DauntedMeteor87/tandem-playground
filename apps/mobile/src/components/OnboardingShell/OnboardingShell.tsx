// Source: Wireframe 0.4 — obShell() specialized for the onboarding flow. A thin
// composition over the shared StepShell: it fills in the step's progress fraction
// (obProgress = (i+1)/8), wires Back → router.back(), and Skip / Continue → the
// next step — while respecting the wireframe's `forced` steps, which show no Skip.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { useRouter } from "expo-router";
import { StepShell } from "@/components/StepShell/StepShell";
import { OB_STEPS, OB_ROUTE, FORCED_STEPS, type ObStep } from "@/lib/onboarding-state";

export type OnboardingShellProps = {
  /** Which onboarding step this is — drives the progress bar and next route. */
  step: ObStep;
  question: string;
  hint?: string;
  /** CTA label (StepShell defaults to "Continue"). */
  cta?: string;
  /** CTA press. Defaults to advancing to the next step. */
  onCta?: () => void;
  ctaDisabled?: boolean;
  /** Skip label (StepShell defaults to "Skip"). */
  skipLabel?: string;
  /** Skip press. Defaults to advancing to the next step (skippable steps only). */
  onSkip?: () => void;
  children?: React.ReactNode;
};

export function OnboardingShell({
  step,
  question,
  hint,
  cta,
  onCta,
  ctaDisabled,
  skipLabel,
  onSkip,
  children,
}: OnboardingShellProps) {
  const router = useRouter();
  const index = OB_STEPS.indexOf(step);
  const progress = (index + 1) / OB_STEPS.length; // wireframe obProgress
  const forced = FORCED_STEPS[step];

  const advance = () => {
    const next = OB_STEPS[index + 1];
    // Last step lands on "/" — the gallery placeholder (real Home is Wave 3).
    router.push(next ? OB_ROUTE[next] : "/");
  };

  return (
    <StepShell
      progress={progress}
      question={question}
      hint={hint}
      onBack={() => router.back()}
      onSkip={forced ? undefined : (onSkip ?? advance)}
      skipLabel={skipLabel}
      cta={cta}
      onCta={onCta ?? advance}
      ctaDisabled={ctaDisabled}
    >
      {children}
    </StepShell>
  );
}
