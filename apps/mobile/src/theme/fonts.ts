// Source: migration doc §2 — load Spectral (display/headings) + Hanken Grotesk
// (UI/body). Weights: Spectral 400/500/600 (+ italics where offered); Hanken
// Grotesk 400/500/600/700. The font-family strings here match the keys in
// theme.fontFamily (src/theme/tokens.ts) exactly.
import {
  useFonts,
  Spectral_400Regular,
  Spectral_400Regular_Italic,
  Spectral_500Medium,
  Spectral_500Medium_Italic,
  Spectral_600SemiBold,
  Spectral_600SemiBold_Italic,
} from "@expo-google-fonts/spectral";
import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from "@expo-google-fonts/hanken-grotesk";

/**
 * Loads every brand font face used by the theme. Call once at the app root
 * and hold the splash screen until `loaded` (or `error`) is truthy.
 */
export function useLoadFonts(): { loaded: boolean; error: Error | null } {
  const [loaded, error] = useFonts({
    Spectral_400Regular,
    Spectral_400Regular_Italic,
    Spectral_500Medium,
    Spectral_500Medium_Italic,
    Spectral_600SemiBold,
    Spectral_600SemiBold_Italic,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
  });
  return { loaded, error };
}
