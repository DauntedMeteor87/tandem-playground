// Source: Wireframe 0.4 — SCREENS['ob-bio']. A short caption-style bio (<= 250),
// plus one optional prompt that, when picked, opens its own 250-char answer box.
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "@/components/Chip/Chip";
import { Input } from "@/components/Input/Input";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { useOnboarding } from "@/lib/onboarding-state";
import { theme } from "@/theme/tokens";

const OB_PROMPTS = [
  "My ideal Saturday is…",
  "Ask me about…",
  "A trip I want to do…",
  "I geek out over…",
] as const;

/** wireframe `.divlabel` — a centered caption flanked by hairlines. */
function DivLabel({ children }: { children: string }) {
  return (
    <View style={styles.divlabel}>
      <View style={styles.divrule} />
      <Text style={styles.divtext}>{children}</Text>
      <View style={styles.divrule} />
    </View>
  );
}

export default function BioStep() {
  const { draft, dispatch } = useOnboarding();
  return (
    <OnboardingShell
      step="bio"
      question="Say hi in one line"
      hint="A short bio, like a caption — keep it real. Up to 250 characters."
    >
      <Input
        multiline
        maxLength={250}
        placeholder="e.g. Freshman from Sacramento, looking for hiking buddies!"
        value={draft.bio}
        onChangeText={(value) => dispatch({ type: "SET_BIO", value })}
      />
      <DivLabel>add a prompt</DivLabel>
      <View style={styles.prompts}>
        {OB_PROMPTS.map((p) => (
          <Chip
            key={p}
            on={draft.prompt === p}
            onPress={() => dispatch({ type: "TOGGLE_PROMPT", value: p })}
          >
            {p}
          </Chip>
        ))}
      </View>
      {draft.prompt !== "" ? (
        <Input
          style={styles.answer}
          label={draft.prompt}
          multiline
          maxLength={250}
          placeholder="Finish the thought…"
          value={draft.promptText}
          onChangeText={(value) => dispatch({ type: "SET_PROMPT_TEXT", value })}
        />
      ) : null}
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  divlabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: theme.spacing.s4,
    marginBottom: theme.spacing.s2,
  },
  divrule: { flex: 1, height: 1, backgroundColor: theme.neutral.hairline },
  divtext: { fontFamily: theme.fontFamily.semibold, fontSize: 12, color: theme.color.muted },
  prompts: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, // wireframe gap:8px
  answer: { marginTop: theme.spacing.s4 }, // wireframe prompt block .mt4
});
