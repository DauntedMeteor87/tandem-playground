// Create an Adventure (Milestone W2) — the nine-step desktop trip-planning
// wizard. Source: Wireframe 0.2 renderPlanAdventure() (screens.js): a progress
// rail + step body + back/continue footer (shared WizardShell), a publish sheet
// overlay, and a confirmation screen. Three entry modes share one draft (ADV):
// fresh Create (START_CREATE), Edit a live trip (START_EDIT), or Clone
// (START_CLONE) — all primed in StudioProvider before the route mounts. The
// topbar's "— draft" chrome + Save & exit live in <Topbar>.
"use client";

import { useRouter } from "next/navigation";
import { StudioPage } from "@/components/StudioPage";
import { WizardShell, type WizardStep } from "@/components/WizardShell";
import { IconCheck } from "@/components/icons";
import {
  CREWS,
  STEP_LABEL,
  STEPS,
  visLabelFor,
  type AdventureStep,
  type VisType,
} from "@/lib/data";
import { useStudio } from "@/lib/studio-state";
import { BasicsStep } from "@/components/adventure-wizard/BasicsStep";
import { WriteupStep } from "@/components/adventure-wizard/WriteupStep";
import { ItineraryStep } from "@/components/adventure-wizard/ItineraryStep";
import { PermitsStep } from "@/components/adventure-wizard/PermitsStep";
import { BudgetStep } from "@/components/adventure-wizard/BudgetStep";
import { GearStep } from "@/components/adventure-wizard/GearStep";
import { RidesStep } from "@/components/adventure-wizard/RidesStep";
import { PhotosStep } from "@/components/adventure-wizard/PhotosStep";
import { PreviewStep } from "@/components/adventure-wizard/PreviewStep";
import { PublishSheet } from "@/components/adventure-wizard/PublishSheet";

const WIZARD_STEPS: WizardStep[] = STEPS.map((id) => ({
  id,
  label: STEP_LABEL[id],
}));

export default function CreateAdventurePage() {
  const router = useRouter();
  const { state, dispatch, showToast } = useStudio();
  const { step, adv, editingId, cloneSource, previewTab, publishOpen, confirmed, clubs } =
    state;

  // ---- Confirmation screen (doPublish landed) ----
  if (confirmed) {
    return (
      <StudioPage>
        <div className="card confirm__card mt6">
          <div className="confirm__icon">
            <IconCheck />
          </div>
          <h2>Published to {visLabelFor(adv, clubs, CREWS)}</h2>
          <p>
            &ldquo;{adv.name}&rdquo; is now live in Trip Signups on the mobile
            app — members can find it and join. You can edit it any time from
            Manage Adventures.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => router.push("/manage-adventures")}
            >
              Manage Adventures
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => dispatch({ type: "START_CREATE" })}
            >
              Start another adventure
            </button>
          </div>
        </div>
      </StudioPage>
    );
  }

  const isLast = step === "preview";

  // saveEdits()/cancelEdits(): the reducer handles the data; navigation + the
  // toast are view concerns.
  function saveEdits() {
    dispatch({ type: "SAVE_EDITS" });
    showToast("Changes saved — members see the update immediately");
    router.push("/manage-adventures");
  }
  function cancelEdits() {
    dispatch({ type: "CANCEL_EDITS" });
    showToast("Changes discarded");
    router.push("/manage-adventures");
  }
  function setVisType(visType: VisType) {
    const first = (visType === "club" ? clubs : CREWS)[0];
    dispatch({
      type: "SET_ADV",
      adv: { ...adv, visType, visId: first ? first.id : "" },
    });
  }

  function stepBody() {
    switch (step) {
      case "basics":
        return (
          <BasicsStep
            adv={adv}
            dispatch={dispatch}
            clubs={clubs}
            cloneSource={cloneSource}
          />
        );
      case "writeup":
        return <WriteupStep adv={adv} dispatch={dispatch} />;
      case "itinerary":
        return <ItineraryStep adv={adv} dispatch={dispatch} />;
      case "permits":
        return <PermitsStep adv={adv} dispatch={dispatch} />;
      case "budget":
        return <BudgetStep adv={adv} dispatch={dispatch} />;
      case "gear":
        return <GearStep adv={adv} dispatch={dispatch} />;
      case "rides":
        return <RidesStep adv={adv} dispatch={dispatch} />;
      case "photos":
        return <PhotosStep adv={adv} dispatch={dispatch} />;
      case "preview":
        return (
          <PreviewStep
            adv={adv}
            dispatch={dispatch}
            clubs={clubs}
            crews={CREWS}
            previewTab={previewTab}
            editing={!!editingId}
          />
        );
      default:
        return null;
    }
  }

  // ---- Footer right side (wireframe footerHtml) ----
  const footerEnd = isLast ? (
    editingId ? (
      <button type="button" className="btn" onClick={saveEdits}>
        Save changes
      </button>
    ) : (
      <button
        type="button"
        className="btn"
        onClick={() => dispatch({ type: "SET_PUBLISH_OPEN", open: true })}
      >
        Publish to Trip Signups
      </button>
    )
  ) : (
    <>
      {editingId ? (
        <button type="button" className="btn btn--ghost" onClick={saveEdits}>
          Save changes
        </button>
      ) : null}
      <button
        type="button"
        className="btn"
        onClick={() => dispatch({ type: "NEXT_STEP" })}
      >
        Continue
      </button>
    </>
  );

  return (
    <>
      <WizardShell
        title={adv.name || "New adventure"}
        subtitle={
          editingId
            ? "This trip is live — changes go out to members when you save."
            : "Fill in the details, write it up, set the budget, then publish to your club's Trip Signups."
        }
        steps={WIZARD_STEPS}
        currentStepId={step}
        onSelectStep={(id) =>
          dispatch({ type: "GO_STEP", step: id as AdventureStep })
        }
        onBack={() => dispatch({ type: "PREV_STEP" })}
        footerStart={
          editingId ? (
            <button type="button" className="btn btn--sub" onClick={cancelEdits}>
              Discard changes
            </button>
          ) : undefined
        }
        footerEnd={footerEnd}
      >
        {stepBody()}
      </WizardShell>

      {publishOpen ? (
        <PublishSheet
          adv={adv}
          clubs={clubs}
          crews={CREWS}
          onSetVisType={setVisType}
          onSetVisId={(id) =>
            dispatch({ type: "SET_ADV", adv: { ...adv, visId: id } })
          }
          onPublish={() => {
            // TODO: backend seam — POST /trips.
            dispatch({ type: "PUBLISH" });
          }}
          onClose={() => dispatch({ type: "SET_PUBLISH_OPEN", open: false })}
        />
      ) : null}
    </>
  );
}
