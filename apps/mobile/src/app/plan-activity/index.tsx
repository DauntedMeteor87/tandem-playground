// Source: Wireframe 0.4 — SCREENS['plan-activity'] + ACT_STEPS. The eight-step
// activity wizard on the shared StepShell: name → when → itinerary → describe →
// location → money & rides → photos → publish. One screen; the step index and the
// whole trip draft live in the plan reducer. Copy is ported verbatim from ACT_STEPS.
// TODO: backend seam — POST /trips on publish; today it lands in a demo crew chat.
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "@/theme/tokens";
import {
  BudgetSplitter,
  Input,
  RideShareBuilder,
  StepShell,
  Toggle,
  IconCal,
  IconCheck,
  IconChev,
  IconComm,
  IconMap,
  IconPlus,
  IconUsers,
} from "@/components";
import { CREWS, PEOPLE, heartedCrews } from "@/lib/demo-data";
import { pickImage } from "@/lib/pick-image";
import {
  ACT_STEP_COUNT,
  LAST_STEP,
  canContinue,
  publishTarget,
  usePlan,
  type PlanAction,
  type PlanDraft,
} from "@/lib/plan-state";

type StepProps = { draft: PlanDraft; dispatch: React.Dispatch<PlanAction> };

// Question + hint per step (wireframe ACT_STEPS, verbatim).
const STEPS: ReadonlyArray<{ q: string; hint: string }> = [
  { q: "Name your trip", hint: "The most important part — keep it short and inviting." },
  { q: "When is it?", hint: "Pick the day, then add a quick note on timing." },
  { q: "Itinerary", hint: "A rough play-by-play so people know the plan." },
  { q: "Describe it", hint: "What's the vibe? What should people expect?" },
  { q: "General location", hint: "Type a common name — not an exact address." },
  { q: "Money & rides", hint: "Both optional — flip on only what you need. Easy to skip either." },
  { q: "Add photos", hint: "At least one so people know what they're in for." },
  { q: "Who can see it?", hint: "Pick one — this is where it gets published." },
];

export default function PlanActivityScreen() {
  const router = useRouter();
  const { draft, dispatch } = usePlan();
  const step = draft.step;

  const onBack = () => {
    if (step > 0) dispatch({ type: "BACK" });
    else router.back();
  };

  const onNext = () => {
    if (step < LAST_STEP) {
      dispatch({ type: "NEXT" });
      return;
    }
    // Publish: resolve where it lands, then drop the member into that crew's chat.
    const target = publishTarget(draft);
    dispatch({ type: "PUBLISH" });
    const q =
      `published=bishop&title=${encodeURIComponent(draft.name)}` +
      `&crewName=${encodeURIComponent(target.crewName)}${target.draft ? "&draft=1" : ""}`;
    router.replace(`/crew/${target.crewId}/chat?${q}`);
  };

  return (
    <StepShell
      progress={(step + 1) / ACT_STEP_COUNT}
      question={STEPS[step].q}
      hint={STEPS[step].hint}
      stepLabel={`${step + 1} / ${ACT_STEP_COUNT}`}
      cta={step === LAST_STEP ? "Publish trip." : "Continue"}
      ctaDisabled={!canContinue(draft)}
      onBack={onBack}
      onCta={onNext}
    >
      <StepBody draft={draft} dispatch={dispatch} />
    </StepShell>
  );
}

function StepBody({ draft, dispatch }: StepProps) {
  switch (draft.step) {
    case 0:
      return (
        <Input
          value={draft.name}
          placeholder="e.g. Bishop Peak Sunset Hike"
          onChangeText={(v) => dispatch({ type: "SET_NAME", value: v })}
          style={styles.field}
        />
      );
    case 1:
      return <WhenStep draft={draft} dispatch={dispatch} />;
    case 2:
      return (
        <Input
          multiline
          value={draft.itinerary}
          placeholder={
            "5:15  meet at the trailhead lot\n5:30  head up together — we go slow\nsunset  photos at the top\nafter  tacos for anyone in"
          }
          onChangeText={(v) => dispatch({ type: "SET_ITINERARY", value: v })}
          style={styles.field}
        />
      );
    case 3:
      return (
        <Input
          multiline
          value={draft.describe}
          placeholder="Chill after-class hike, tacos after…"
          onChangeText={(v) => dispatch({ type: "SET_DESCRIBE", value: v })}
          style={styles.field}
        />
      );
    case 4:
      return (
        <Input
          value={draft.location}
          placeholder="e.g. Bishop Peak trailhead · San Luis Obispo"
          onChangeText={(v) => dispatch({ type: "SET_LOCATION", value: v })}
          style={styles.field}
        />
      );
    case 5:
      return (
        <View style={styles.field}>
          <BudgetSplitter
            draft={draft}
            onToggle={() => dispatch({ type: "TOGGLE_BUDGET" })}
            onCost={(key, dir) => dispatch({ type: "ADJ_COST", key, dir })}
            onHeads={(dir) => dispatch({ type: "ADJ_HEADS", dir })}
          />
          <RideShareBuilder
            draft={draft}
            onToggle={() => dispatch({ type: "TOGGLE_RIDE" })}
            onSeats={(dir) => dispatch({ type: "ADJ_SEATS", dir })}
          />
        </View>
      );
    case 6:
      return <PhotosStep draft={draft} dispatch={dispatch} />;
    case 7:
      return <PublishStep draft={draft} dispatch={dispatch} />;
    default:
      return null;
  }
}

/* ---------- Step 2 · When (date picker + timing note) ---------- */
function WhenStep({ draft, dispatch }: StepProps) {
  const [show, setShow] = React.useState(false);
  const label = draft.date
    ? draft.date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : "Pick a day";
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Date</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setShow((s) => !s)}
        style={[styles.dateField, draft.date ? styles.dateFieldSet : null]}
      >
        <IconCal size={18} color={theme.color.muted} />
        <Text style={[styles.dateText, !draft.date && styles.datePlaceholder]}>{label}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={draft.date ?? new Date()}
          mode="date"
          onChange={(_e, d) => {
            if (Platform.OS !== "ios") setShow(false);
            if (d) dispatch({ type: "SET_DATE", value: d });
          }}
        />
      )}
      <Input
        label="A note on the timing"
        value={draft.dateNote}
        placeholder="e.g. out the door by 7 AM sharp"
        onChangeText={(v) => dispatch({ type: "SET_DATE_NOTE", value: v })}
        style={styles.fieldGap}
      />
    </View>
  );
}

/* ---------- Step 7 · Photos (≥1 required; designed pick-targets like onboarding) ---------- */
function PhotosStep({ draft, dispatch }: StepProps) {
  const n = draft.photos.length;
  const add = async () => {
    const uri = await pickImage({ aspect: [4, 3] });
    if (uri) dispatch({ type: "ADD_PHOTO", uri });
  };
  return (
    <View style={styles.field}>
      <View style={styles.photoGrid}>
        {Array.from({ length: 6 }).map((_, i) => {
          const filled = i < n;
          const required = i === 0;
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={filled ? `Remove photo ${i + 1}` : `Add photo ${i + 1}`}
              onPress={() => (filled ? dispatch({ type: "REMOVE_PHOTO", index: i }) : add())}
              style={[styles.photoSlot, filled ? styles.photoFilled : required ? styles.photoReq : styles.photoEmpty]}
            >
              {filled ? (
                <Image source={{ uri: draft.photos[i] }} style={StyleSheet.absoluteFill} contentFit="cover" />
              ) : (
                <IconPlus size={22} color={theme.neutral.photoInk} />
              )}
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.helper}>
        {n >= 1 ? `${n} added — looking good.` : "Add at least one — the first slot is required to publish."}
      </Text>
    </View>
  );
}

/* ---------- Step 8 · Publish (three highlight-when-chosen options + repeat weekly) ---------- */
function PublishStep({ draft, dispatch }: StepProps) {
  const crews = heartedCrews();
  return (
    <View style={styles.field}>
      <DropCard
        icon={<IconComm size={19} color={draft.vis === "crew" ? theme.color.paper : theme.color.pine} />}
        title="Post to a crew"
        sub={
          draft.vis === "crew" && CREWS[draft.visCrew]
            ? CREWS[draft.visCrew].name
            : "Share it with a crew you're already in"
        }
        selected={draft.vis === "crew"}
        open={draft.visOpen === "crew"}
        onPress={() => dispatch({ type: "OPEN_DROP", which: "crew" })}
      >
        {crews.length > 0 ? (
          crews.map((c, i) => (
            <DropOpt
              key={c.id}
              selected={draft.visCrew === c.id}
              last={i === crews.length - 1}
              onPress={() => dispatch({ type: "PICK_CREW", id: c.id })}
            >
              <Text style={styles.optName}>{c.name}</Text>
              <Text style={styles.optMeta}>You + {c.members - 1}</Text>
            </DropOpt>
          ))
        ) : (
          // #10 — zero crews: never a dead end, the other two options stay enabled.
          <Text style={styles.inlineEmpty}>No crews yet — draft one for this trip below, or post it public.</Text>
        )}
      </DropCard>

      <DropCard
        icon={<IconUsers size={19} color={draft.vis === "draft" ? theme.color.paper : theme.color.pine} />}
        title="Draft a crew for this"
        sub={
          draft.vis === "draft"
            ? `${draft.draftFriends.length} friends added`
            : "Spin up an event crew — add friends"
        }
        selected={draft.vis === "draft"}
        open={draft.visOpen === "draft"}
        onPress={() => dispatch({ type: "OPEN_DROP", which: "draft" })}
        style={styles.dropGap}
      >
        {Object.values(PEOPLE).map((p, i, arr) => {
          const added = draft.draftFriends.includes(p.id);
          return (
            <DropOpt
              key={p.id}
              selected={added}
              last={i === arr.length - 1}
              onPress={() => dispatch({ type: "TOGGLE_DRAFT_FRIEND", id: p.id })}
            >
              <Text style={styles.optName}>{p.name}</Text>
              {added ? (
                <IconCheck size={18} color={theme.color.pine} />
              ) : (
                <IconPlus size={18} color={theme.color.muted} />
              )}
            </DropOpt>
          );
        })}
      </DropCard>

      <Pressable
        accessibilityRole="button"
        onPress={() => dispatch({ type: "PICK_PUBLIC" })}
        style={[
          styles.drop,
          styles.dropGap,
          styles.dropHead,
          draft.vis === "public" && styles.dropActive,
          draft.vis === "public" && styles.dropHeadSel,
        ]}
      >
        <View style={[styles.dropIcon, draft.vis === "public" && styles.dropIconSel]}>
          <IconMap size={19} color={draft.vis === "public" ? theme.color.paper : theme.color.pine} />
        </View>
        <View style={styles.dropTextWrap}>
          <Text style={[styles.dropTitle, draft.vis === "public" && styles.dropTitleSel]}>Public — anyone can join</Text>
          <Text style={[styles.dropSub, draft.vis === "public" && styles.dropSubSel]}>
            Anyone on your campus can see & join
          </Text>
        </View>
        <View style={[styles.radio, draft.vis === "public" && styles.radioSel]}>
          {draft.vis === "public" && <IconCheck size={15} color={theme.color.paper} />}
        </View>
      </Pressable>

      <Text style={styles.divLabel}>extras</Text>
      <View style={styles.repeatCard}>
        <View style={styles.repeatText}>
          <Text style={styles.repeatTitle}>Repeat weekly</Text>
          <Text style={styles.repeatSub}>e.g. a standing Thursday sunset hike.</Text>
        </View>
        <Toggle on={draft.repeat} onChange={() => dispatch({ type: "TOGGLE_REPEAT" })} />
      </View>
    </View>
  );
}

function DropCard({
  icon,
  title,
  sub,
  selected,
  open,
  onPress,
  children,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  selected: boolean;
  open: boolean;
  onPress: () => void;
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <View style={[styles.drop, (open || selected) && styles.dropActive, style]}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.dropHead, selected && styles.dropHeadSel]}
      >
        <View style={[styles.dropIcon, selected && styles.dropIconSel]}>{icon}</View>
        <View style={styles.dropTextWrap}>
          <Text style={[styles.dropTitle, selected && styles.dropTitleSel]}>{title}</Text>
          <Text style={[styles.dropSub, selected && styles.dropSubSel]} numberOfLines={1}>
            {sub}
          </Text>
        </View>
        <View style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }}>
          <IconChev size={18} color={selected ? theme.color.paper : theme.color.muted} />
        </View>
      </Pressable>
      {open && <View style={styles.dropBody}>{children}</View>}
    </View>
  );
}

function DropOpt({
  selected,
  last,
  onPress,
  children,
}: {
  selected: boolean;
  last: boolean;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.dropOpt, !last && styles.dropOptDivided, selected && styles.dropOptSel]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: { marginTop: 6 },
  fieldGap: { marginTop: theme.spacing.s4 },
  label: { fontFamily: theme.fontFamily.bold, fontSize: 13, color: theme.color.muted, marginBottom: theme.spacing.s2 },

  /* date field */
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s2,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    backgroundColor: theme.color.paper,
  },
  dateFieldSet: { borderColor: theme.color.pine },
  dateText: { fontFamily: theme.fontFamily.body, fontSize: 17, color: theme.color.pine },
  datePlaceholder: { color: theme.color.muted },

  /* photos */
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.s2 },
  photoSlot: {
    flexBasis: "31%",
    flexGrow: 1,
    height: 96,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.neutral.sunk,
  },
  photoEmpty: { borderWidth: 1.5, borderColor: theme.neutral.hairlineStrong, borderStyle: "dashed" },
  photoReq: { borderWidth: 1.5, borderColor: theme.color.pine, borderStyle: "solid" }, // first slot required
  photoFilled: { borderWidth: 1, borderColor: theme.neutral.hairline },
  helper: { ...theme.type.small, textAlign: "center", marginTop: theme.spacing.s3 },

  /* publish dropdowns */
  drop: {
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairlineStrong,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  dropActive: { borderColor: theme.color.pine },
  dropGap: { marginTop: theme.spacing.s3 },
  dropHead: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s3, paddingVertical: 14, paddingHorizontal: 16 },
  dropHeadSel: { backgroundColor: theme.color.pine },
  dropIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.sunk,
  },
  dropIconSel: { backgroundColor: theme.neutral.onDarkFill },
  dropTextWrap: { flex: 1, minWidth: 0 },
  dropTitle: { fontFamily: theme.fontFamily.semibold, fontSize: 15, color: theme.color.pine },
  dropTitleSel: { color: theme.color.paper },
  dropSub: { fontFamily: theme.fontFamily.body, fontSize: 12.5, color: theme.color.muted, marginTop: 1 },
  dropSubSel: { color: theme.neutral.onDark },
  dropBody: { borderTopWidth: 1, borderTopColor: theme.neutral.hairline },
  dropOpt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  dropOptDivided: { borderBottomWidth: 1, borderBottomColor: theme.neutral.hairline },
  dropOptSel: { backgroundColor: theme.neutral.sunk },
  optName: { fontFamily: theme.fontFamily.semibold, fontSize: 14, color: theme.color.pine },
  optMeta: { fontFamily: theme.fontFamily.medium, fontSize: 12, color: theme.color.muted },
  inlineEmpty: {
    fontFamily: theme.fontFamily.body,
    fontSize: 13,
    lineHeight: 19,
    color: theme.color.muted,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.neutral.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSel: { borderColor: theme.color.paper },

  /* repeat weekly */
  divLabel: { ...theme.type.eyebrow, marginTop: theme.spacing.s5, marginBottom: theme.spacing.s2 },
  repeatCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s3,
    padding: 14,
    backgroundColor: theme.color.paper,
    borderWidth: 1,
    borderColor: theme.neutral.hairline,
    borderRadius: theme.radius.lg,
    ...theme.shadow.soft,
  },
  repeatText: { flex: 1 },
  repeatTitle: { fontFamily: theme.fontFamily.bold, fontSize: 15.5, letterSpacing: -0.2, color: theme.color.pine },
  repeatSub: { fontFamily: theme.fontFamily.body, fontSize: 12, color: theme.color.muted },
});
