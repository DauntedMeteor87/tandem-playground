// Source: Wireframe 0.4 — bubbles() (.bub / .bub.me). A chat line: other people's
// messages sit left with an avatar + name; the member's own messages sit right in a
// pine bubble (the brand skin over the wireframe's neutral bubble).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/tokens";
import { Avatar } from "@/components/Avatar/Avatar";

export type ChatBubbleProps = {
  who: string;
  text: string;
  me: boolean;
};

export function ChatBubble({ who, text, me }: ChatBubbleProps) {
  if (me) {
    return (
      <View style={styles.meRow}>
        <View style={[styles.bubble, styles.meBubble]}>
          <Text style={styles.meText}>{text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.otherRow}>
      <Avatar name={who} size={28} />
      <View style={styles.otherCol}>
        <Text style={styles.who}>{who}</Text>
        <View style={[styles.bubble, styles.otherBubble]}>
          <Text style={styles.otherText}>{text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otherRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  otherCol: { maxWidth: "76%" },
  meRow: { flexDirection: "row", justifyContent: "flex-end" },
  who: { fontFamily: theme.fontFamily.semibold, fontSize: 12, color: theme.color.muted, marginBottom: 3 },
  bubble: { paddingVertical: 9, paddingHorizontal: 12, borderRadius: 14 },
  otherBubble: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    alignSelf: "flex-start",
  },
  meBubble: { backgroundColor: theme.color.pine, maxWidth: "76%" }, // own messages → pine bubble
  otherText: { fontFamily: theme.fontFamily.body, fontSize: 14, lineHeight: 19, color: theme.color.pine },
  meText: { fontFamily: theme.fontFamily.body, fontSize: 14, lineHeight: 19, color: theme.color.paper },
});
