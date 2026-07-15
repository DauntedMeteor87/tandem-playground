// Source: Wireframe 0.4 — app.js chrome: home-top (Home header), topbar() (tab
// screen header), and pageHeader() (pushed-screen back header). One small module so
// Home / My Trips / Plan / Communities and the stack pages share identical chrome.
// TODO: Code Connect map once Figma frame exists.
// TODO: backend seam — badge counts + avatar come from the notifications/profile APIs.
import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { Avatar } from "@/components/Avatar/Avatar";
import { IconBack, IconBell, IconPlane, IconSearch } from "@/components/icons";

/** Fixed status-bar clearance — the app uses fixed insets (no safe-area hook),
 * matching the existing StepShell/gallery convention. Heroes reuse this for their
 * absolute top-nav row. */
export const SCREEN_TOP = 48;

const noop = () => {};

/** A round icon button with an optional count badge (wireframe .iconbtn + .badge). */
function IconButton({
  children,
  badge,
  label,
  onPress = noop,
}: {
  children: React.ReactNode;
  badge?: number;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.iconBtn}>
      {children}
      {badge != null && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
}

/* ---------- Home header (wireframe .home-top) ---------- */
export type HomeHeaderProps = {
  onAvatar?: () => void;
  onBell?: () => void;
  onSearch?: () => void;
  onMessages?: () => void;
  notifications?: number;
  messages?: number;
};

export function HomeHeader({
  onAvatar = noop,
  onBell = noop,
  onSearch = noop,
  onMessages = noop,
  notifications = 3,
  messages = 3,
}: HomeHeaderProps) {
  return (
    <View style={styles.homeTop}>
      <Pressable accessibilityRole="button" accessibilityLabel="Your profile" onPress={onAvatar} style={styles.avatarBtn}>
        <Avatar name="You" size={34} />
      </Pressable>
      <IconButton label="Notifications" badge={notifications} onPress={onBell}>
        <IconBell size={22} color={theme.color.pine} />
      </IconButton>
      {/* Wordmark: rendered in Spectral type — no logo asset exists (migration doc §2). */}
      <Text style={styles.brand}>tandemclub</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Search" onPress={onSearch} style={styles.searchbar}>
        <IconSearch size={17} color={theme.color.muted} />
        <Text style={styles.searchPlaceholder}>Search</Text>
      </Pressable>
      <IconButton label="Messages" badge={messages} onPress={onMessages}>
        <IconPlane size={22} color={theme.color.pine} />
      </IconButton>
    </View>
  );
}

/* ---------- Tab-screen header (wireframe topbar()) ---------- */
export type TabHeaderProps = {
  title: string;
  onAvatar?: () => void;
  onMessages?: () => void;
  onBell?: () => void;
  notifications?: number;
  messages?: number;
};

export function TabHeader({
  title,
  onAvatar = noop,
  onMessages = noop,
  onBell = noop,
  notifications = 3,
  messages = 3,
}: TabHeaderProps) {
  return (
    <View style={styles.topbar}>
      <Pressable accessibilityRole="button" accessibilityLabel="Your profile" onPress={onAvatar} style={styles.avatarBtn}>
        <Avatar name="You" size={34} />
      </Pressable>
      <Text style={styles.topbarTitle}>{title}</Text>
      <View style={styles.topbarActions}>
        <IconButton label="Messages" badge={messages} onPress={onMessages}>
          <IconPlane size={22} color={theme.color.pine} />
        </IconButton>
        <IconButton label="Notifications" badge={notifications} onPress={onBell}>
          <IconBell size={22} color={theme.color.pine} />
        </IconButton>
      </View>
    </View>
  );
}

/* ---------- Pushed-screen back header (wireframe pageHeader()) ---------- */
export type PageHeaderProps = {
  title: string;
  onBack?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PageHeader({ title, onBack = noop, style }: PageHeaderProps) {
  return (
    <View style={[styles.pageHeader, style]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={styles.iconBtn}>
        <IconBack size={22} color={theme.color.pine} />
      </Pressable>
      <Text style={styles.pageTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.pageSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // wireframe .home-top gap
    paddingTop: SCREEN_TOP,
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: 10,
    backgroundColor: theme.color.canvas,
  },
  brand: {
    fontFamily: theme.fontFamily.displaySemiBold,
    fontSize: 17,
    letterSpacing: -0.3,
    color: theme.color.pine,
  },
  searchbar: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    height: 36,
    paddingHorizontal: 13,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
  },
  searchPlaceholder: {
    fontFamily: theme.fontFamily.semibold,
    fontSize: 13.5,
    color: theme.color.muted,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: SCREEN_TOP,
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s3,
    backgroundColor: theme.color.canvas,
  },
  topbarTitle: { ...theme.type.title },
  topbarActions: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s4 },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: SCREEN_TOP,
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s3,
    backgroundColor: theme.color.canvas,
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: theme.fontFamily.displaySemiBold,
    fontSize: 18,
    letterSpacing: -0.3,
    color: theme.color.pine,
  },
  pageSpacer: { width: 34 },
  avatarBtn: { width: 34, height: 34, borderRadius: theme.radius.pill, overflow: "hidden" },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -1,
    right: -1,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.color.ember, // wireframe --c-fill badge
    borderWidth: 1.5,
    borderColor: theme.color.canvas,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontFamily: theme.fontFamily.bold, fontSize: 9, color: theme.color.paper },
});
