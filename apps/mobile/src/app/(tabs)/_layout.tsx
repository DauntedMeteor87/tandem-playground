// Source: Wireframe 0.4 — app.js tabbar(): the bottom tab bar, exactly four
// destinations in order — Home, My Trips, Plan, Communities — using the wireframe's
// own glyphs (home / trips / plan / comm). Expo Router Tabs, styled to the theme.
import { Tabs } from "expo-router";
import { theme } from "@/theme/tokens";
import { IconHome, IconTrips, IconPlan, IconComm } from "@/components/icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.color.pine,
        tabBarInactiveTintColor: theme.color.muted,
        tabBarStyle: {
          backgroundColor: theme.color.paper,
          borderTopColor: theme.neutral.hairline,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fontFamily.semibold,
          fontSize: 11,
        },
        sceneStyle: { backgroundColor: theme.color.canvas },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconHome size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="my-trips"
        options={{
          title: "My Trips",
          tabBarIcon: ({ color }) => <IconTrips size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          tabBarIcon: ({ color }) => <IconPlan size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: "Communities",
          tabBarIcon: ({ color }) => <IconComm size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
