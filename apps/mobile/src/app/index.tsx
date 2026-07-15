// The app entry. Onboarding finishes with router.replace("/"), so `/` lands here
// and redirects into the tab shell's Home (Wave 3 replaced the M1 foundation
// gallery that used to live here).
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/home" />;
}
