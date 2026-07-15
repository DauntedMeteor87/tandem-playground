// Source: Wireframe 0.4 — .sheet-overlay / .sheet (bottom sheet / action drawer).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";

export type SheetProps = {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Sheet({ open = false, title, onClose, children, style }: SheetProps) {
  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <View style={[styles.sheet, theme.shadow.sheet, style]}>
          <View style={styles.grip} />
          {title != null && <Text style={styles.title}>{title}</Text>}
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: theme.neutral.overlay },
  sheet: {
    backgroundColor: theme.color.paper,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingTop: 10,
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s6, // wireframe s4 + safe-area inset
    maxHeight: "88%",
  },
  grip: {
    width: 38,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.neutral.hairlineStrong,
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  title: {
    fontFamily: theme.fontFamily.displaySemiBold,
    fontSize: 18,
    letterSpacing: -0.3,
    color: theme.color.pine,
    marginBottom: theme.spacing.s2,
  },
});
