// Root layout — the app shell every screen renders inside.
// M1 (mobile foundation): loads brand fonts (Spectral + Hanken Grotesk) and
// holds the splash screen until they're ready, so nothing paints in a fallback
// system font first.
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useLoadFonts } from "@/theme/fonts";
import { theme } from "@/theme/tokens";

// Keep the splash up until we've decided whether fonts loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, error } = useLoadFonts();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Hold everything until fonts resolve (loaded or errored) — avoids a flash of
  // the system font before Spectral/Hanken Grotesk arrive.
  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.color.canvas },
      }}
    />
  );
}
