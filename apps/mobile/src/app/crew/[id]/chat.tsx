// Source: Wireframe 0.4 — SCREENS['channel-chat'] + tripResponseCard/tripPinnedTile.
// A crew's chat: the message thread + composer, and — right after the plan flow
// publishes here — the trip lands as a must-answer card in the top third (✓ / ✕)
// that collapses into a slim pinned tile once answered. A brand-new crew with no
// messages shows the "say hi first" empty state; the composer is the way out.
// TODO: backend seam — messages + membership come from the API; sends POST a message.
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/theme/tokens";
import {
  ChatBubble,
  EmptyState,
  Input,
  PageHeader,
  PinnedTripCard,
  IconPlane,
  type PinnedTripResponse,
} from "@/components";
import { CLUBS, CREWS, TRIPS, crewMessages, type CrewMessage } from "@/lib/demo-data";

export default function CrewChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    published?: string;
    title?: string;
    crewName?: string;
    draft?: string;
  }>();

  const crewId = params.id ?? "moon";
  const crew = CREWS[crewId];
  const club = CLUBS[crewId];
  // A freshly-drafted crew isn't in the demo data yet — fall back to its passed name.
  const crewName = crew?.name ?? club?.name ?? params.crewName ?? "Your crew";

  // A trip was just published into this chat when `published` is present.
  const justPublished = params.published != null;
  const seed = TRIPS[params.published ?? "bishop"] ?? TRIPS.bishop;
  const pinnedTrip = {
    title: params.title && params.title.length > 0 ? params.title : seed.title,
    when: seed.when,
    place: seed.place,
  };
  const [response, setResponse] = React.useState<PinnedTripResponse>(null);

  const [messages, setMessages] = React.useState<CrewMessage[]>(() => crewMessages(crewId));
  const [text, setText] = React.useState("");
  const send = () => {
    const t = text.trim();
    if (t.length === 0) return;
    setMessages((prev) => [...prev, { id: `local-${prev.length}`, who: "You", text: t, me: true }]);
    setText("");
  };

  const openActivity = () => router.push(`/activity/${params.published ?? "bishop"}`);
  const mustAnswer = justPublished && response === null;

  return (
    <View style={styles.screen}>
      <PageHeader title={crewName} onBack={() => router.back()} />

      {/* Top-third must-answer card — holds until the member responds. */}
      {mustAnswer && (
        <View style={styles.respondWrap}>
          <PinnedTripCard
            trip={pinnedTrip}
            crewName={crewName}
            response={null}
            onRespond={(going) => setResponse(going ? "yes" : "no")}
            onOpen={openActivity}
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.thread} showsVerticalScrollIndicator={false}>
        {/* Answered → the trip collapses to a slim pinned tile atop the chat. */}
        {justPublished && response !== null && (
          <PinnedTripCard trip={pinnedTrip} crewName={crewName} response={response} onOpen={openActivity} onRespond={() => {}} />
        )}

        {messages.length > 0 ? (
          messages.map((m) => (
            <View key={m.id} style={styles.bubbleGap}>
              <ChatBubble who={m.who} text={m.text} me={m.me} />
            </View>
          ))
        ) : (
          <EmptyState pose="empty-seat" line="Say hi — someone has to go first." poseSize={148} />
        )}
      </ScrollView>

      {/* Composer — the way out of an empty chat. */}
      <View style={styles.composer}>
        <Input
          value={text}
          placeholder={`Message ${crewName}…`}
          onChangeText={setText}
          style={styles.composerInput}
        />
        <Pressable accessibilityRole="button" accessibilityLabel="Send" onPress={send} style={styles.sendBtn}>
          <IconPlane size={20} color={theme.color.paper} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  respondWrap: { paddingHorizontal: theme.spacing.s4, paddingTop: theme.spacing.s3 },
  thread: { padding: theme.spacing.s4, paddingTop: theme.spacing.s3, flexGrow: 1 },
  bubbleGap: { marginTop: 10 },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s2,
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s2,
    paddingBottom: theme.spacing.s6,
    borderTopWidth: 1,
    borderTopColor: theme.neutral.hairline,
    backgroundColor: theme.color.canvas,
  },
  composerInput: { flex: 1 },
  // Send fills pine (not ember) so the response card's "I'm in" stays the one ember.
  sendBtn: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.pine,
  },
});
