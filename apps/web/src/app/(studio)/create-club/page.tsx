// Create a Club (Milestone W3) — the six-step club wizard. Direct port of
// renderCreateClub() + clubStep*() + renderClubConfirmation() in studio.js:
// basics → about → membership → officers → photo → preview & create, over the
// shared draft (`nc`) through the same WizardShell the Adventure wizard uses. On
// create, CREATE_CLUB appends a fresh admin club and the confirmation screen
// takes over, offering Home or the new club's admin console.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudioPage } from "@/components/StudioPage";
import { WizardShell, type WizardStep } from "@/components/WizardShell";
import { IconCheck } from "@/components/icons";
import { CLUB_STEP_LABEL, CLUB_STEPS, type ClubStep } from "@/lib/data";
import { useStudio } from "@/lib/studio-state";
import { ClubBasicsStep } from "@/components/club-wizard/ClubBasicsStep";
import { ClubAboutStep } from "@/components/club-wizard/ClubAboutStep";
import { MembershipStep } from "@/components/club-wizard/MembershipStep";
import { OfficersStep } from "@/components/club-wizard/OfficersStep";
import { ClubPhotoStep } from "@/components/club-wizard/ClubPhotoStep";
import { ClubPreviewStep } from "@/components/club-wizard/ClubPreviewStep";

const WIZARD_STEPS: WizardStep[] = CLUB_STEPS.map((id) => ({
  id,
  label: CLUB_STEP_LABEL[id],
}));

export default function CreateClubPage() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { nc, clubStep, clubCreated, clubs } = state;

  // Re-entry reset: a fresh navigation to Create a Club after a prior create
  // should start a clean wizard, not re-show the stale confirmation (the
  // wireframe reset this inside nav('createClub')). This runs only on true
  // mount — CREATE_CLUB re-renders without remounting, so the confirmation
  // screen still shows immediately after creating.
  useEffect(() => {
    if (clubCreated) dispatch({ type: "RESET_CLUB_WIZARD" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Confirmation screen (doCreateClub landed) ----
  if (clubCreated) {
    const club = clubs[clubs.length - 1];
    return (
      <StudioPage>
        <div
          className="card confirm__card mt6"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="confirm__icon">
            <IconCheck />
          </div>
          <h2>{club?.name} is live</h2>
          <p>
            Your club now shows up in the mobile app. You&apos;re the admin —
            invites went out to your officers, and &ldquo;Manage a Club&rdquo; is
            now in your sidebar.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                dispatch({ type: "RESET_CLUB_WIZARD" });
                router.push("/");
              }}
            >
              Go to Home
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                if (club) dispatch({ type: "SET_MANAGE_CLUB", clubId: club.id });
                dispatch({ type: "RESET_CLUB_WIZARD" });
                router.push("/manage-club");
              }}
            >
              Manage {club?.name}
            </button>
          </div>
        </div>
      </StudioPage>
    );
  }

  const isLast = clubStep === "preview";

  function stepBody() {
    switch (clubStep) {
      case "basics":
        return <ClubBasicsStep nc={nc} dispatch={dispatch} />;
      case "about":
        return <ClubAboutStep nc={nc} dispatch={dispatch} />;
      case "membership":
        return <MembershipStep nc={nc} dispatch={dispatch} />;
      case "officers":
        return <OfficersStep nc={nc} dispatch={dispatch} />;
      case "photo":
        return <ClubPhotoStep nc={nc} dispatch={dispatch} />;
      case "preview":
        return <ClubPreviewStep nc={nc} dispatch={dispatch} />;
      default:
        return null;
    }
  }

  const footerEnd = isLast ? (
    <button
      type="button"
      className="btn"
      disabled={!nc.name.trim()}
      onClick={() => dispatch({ type: "CREATE_CLUB" })}
    >
      Create club
    </button>
  ) : (
    <button
      type="button"
      className="btn"
      onClick={() => dispatch({ type: "NEXT_CLUB_STEP" })}
    >
      Continue
    </button>
  );

  return (
    <WizardShell
      title={nc.name || "New club"}
      subtitle="Set up the club here, then run everything else — signups, chat, trips — from the mobile app."
      steps={WIZARD_STEPS}
      currentStepId={clubStep}
      onSelectStep={(id) =>
        dispatch({ type: "GO_CLUB_STEP", step: id as ClubStep })
      }
      onBack={() => dispatch({ type: "PREV_CLUB_STEP" })}
      footerEnd={footerEnd}
    >
      {stepBody()}
    </WizardShell>
  );
}
