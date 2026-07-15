// Source: Wireframe 0.4 — SCREENS['ob-photos']. Circular profile pic + a portrait
// main photo (both required) + two optional extras. Unskippable: the Continue CTA
// stays disabled until the profile pic and main photo are set. Empty slots read as
// designed dashed frames with a placeholder glyph (cam / plus), never blank boxes.
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { OnboardingShell } from "@/components/OnboardingShell/OnboardingShell";
import { IconCam, IconCheck, IconPlus } from "@/components/icons";
import { MAX_EXTRAS, isPhotosComplete, useOnboarding } from "@/lib/onboarding-state";
import { pickImage } from "@/lib/pick-image";
import { theme } from "@/theme/tokens";

export default function PhotosStep() {
  const { draft, dispatch } = useOnboarding();
  const ready = isPhotosComplete(draft);

  const pickPfp = async () => {
    const uri = await pickImage({ aspect: [1, 1] });
    if (uri) dispatch({ type: "SET_PFP", uri });
  };
  const pickMain = async () => {
    const uri = await pickImage({ aspect: [3, 4] });
    if (uri) dispatch({ type: "SET_MAIN_PHOTO", uri });
  };
  const tapExtra = async (index: number) => {
    if (index < draft.extras.length) {
      dispatch({ type: "REMOVE_EXTRA", index });
      return;
    }
    const uri = await pickImage({ aspect: [3, 4] });
    if (uri) dispatch({ type: "ADD_EXTRA", uri });
  };

  return (
    <OnboardingShell
      step="photos"
      question="Add your photos"
      hint="Two to start — a profile pic and one main photo. You can build out your profile later; this is just to get going."
      ctaDisabled={!ready}
    >
      <View style={styles.photobox}>
        {/* profile pic — circular slot */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add your profile pic"
          onPress={pickPfp}
          style={[styles.pfp, { borderStyle: draft.pfp ? "solid" : "dashed" }]}
        >
          {draft.pfp ? (
            <Image source={{ uri: draft.pfp }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <IconCam size={30} color={theme.neutral.photoInk} />
          )}
        </Pressable>
        <View style={styles.pfpCap}>
          {draft.pfp ? <IconCheck size={15} color={theme.color.muted} /> : null}
          <Text style={styles.pfpCapText}>
            {draft.pfp ? "Profile pic" : "Tap to add your profile pic"}
          </Text>
        </View>

        {/* main photo (required) + optional extras */}
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add your main photo"
            onPress={pickMain}
            style={[styles.main, { borderStyle: draft.mainPhoto ? "solid" : "dashed" }]}
          >
            {draft.mainPhoto ? (
              <Image source={{ uri: draft.mainPhoto }} style={StyleSheet.absoluteFill} contentFit="cover" />
            ) : (
              <>
                <IconPlus size={22} color={theme.neutral.photoInk} />
                <Text style={styles.photoLbl}>Main photo · required</Text>
              </>
            )}
          </Pressable>
          <View style={styles.extras}>
            {Array.from({ length: MAX_EXTRAS }).map((_, i) => {
              const filled = i < draft.extras.length;
              return (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  accessibilityLabel={filled ? `Remove extra photo ${i + 1}` : `Add extra photo ${i + 1}`}
                  onPress={() => tapExtra(i)}
                  style={[styles.extra, { borderStyle: filled ? "solid" : "dashed" }]}
                >
                  {filled ? (
                    <Image source={{ uri: draft.extras[i] }} style={StyleSheet.absoluteFill} contentFit="cover" />
                  ) : (
                    <IconPlus size={22} color={theme.neutral.photoInk} />
                  )}
                </Pressable>
              );
            })}
            <Text style={[styles.photoLbl, styles.extrasLbl]}>Optional</Text>
          </View>
        </View>
      </View>
      <Text style={styles.helper}>
        {ready
          ? "Nice — add more anytime from your profile."
          : "Add your profile pic and main photo to continue."}
      </Text>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  photobox: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
    padding: 18,
    marginTop: 6,
    ...theme.shadow.soft,
  },
  pfp: {
    width: 96,
    height: 96,
    borderRadius: theme.radius.pill,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.neutral.sunk,
    borderWidth: 2,
    borderColor: theme.neutral.hairlineStrong,
  },
  pfpCap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 9,
    marginBottom: 16,
  },
  pfpCapText: { fontFamily: theme.fontFamily.semibold, fontSize: 12.5, color: theme.color.muted },
  row: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  main: {
    flex: 1,
    aspectRatio: 3 / 4,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    overflow: "hidden",
    backgroundColor: theme.neutral.sunk,
    borderWidth: 1.5,
    borderColor: theme.neutral.hairlineStrong,
  },
  extras: { width: 84, gap: 12 },
  extra: {
    height: 64,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.neutral.sunk,
    borderWidth: 1.5,
    borderColor: theme.neutral.hairlineStrong,
  },
  photoLbl: { fontFamily: theme.fontFamily.bold, fontSize: 11.5, color: theme.color.muted },
  extrasLbl: { textAlign: "center", marginTop: -2 },
  helper: { ...theme.type.small, textAlign: "center", marginTop: theme.spacing.s3 },
});
