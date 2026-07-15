// Thin wrapper over expo-image-picker for the onboarding photos step. Returns the
// picked image uri, or null when the member cancels, denies permission, or the
// picker is unavailable (web / jest) — so callers can no-op gracefully.
// TODO: backend seam — picked photos will upload to media storage once it exists.
import * as ImagePicker from "expo-image-picker";

export type PickImageOptions = {
  /** Crop aspect for allowsEditing, e.g. [1, 1] for the round profile pic. */
  aspect?: [number, number];
};

export async function pickImage(options: PickImageOptions = {}): Promise<string | null> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return null;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: options.aspect,
      quality: 0.9,
    });
    if (result.canceled) return null;
    return result.assets[0]?.uri ?? null;
  } catch {
    // web / jest / any native failure — no-op so the flow stays usable.
    return null;
  }
}
