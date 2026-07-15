// Source: Wireframe 0.2 — the shared wizard shell (railHtml() + footerHtml()
// in screens.js, mirrored by renderCreateClub() in studio.js). ONE component
// for BOTH future wizards (Adventure + Club): a numbered progress rail with
// done/current states, the step body, and a back/continue footer. It's fully
// props-driven so each wizard owns its own state and footer buttons.
"use client";

import type { ReactNode } from "react";
import { IconBack, IconCheck } from "@/components/icons";

export interface WizardStep {
  id: string;
  label: string;
}

export interface WizardShellProps {
  /** Rail head title — e.g. the draft's name, or "New adventure". */
  title: string;
  /** Rail head subtitle. */
  subtitle: string;
  /** Ordered steps. */
  steps: WizardStep[];
  currentStepId: string;
  onSelectStep?: (id: string) => void;
  onBack?: () => void;
  onContinue?: () => void;
  /** Footer continue-button label (default "Continue"). */
  continueLabel?: string;
  /** Back-button label (default "Back"). */
  backLabel?: string;
  /** Extra controls placed next to Back (e.g. "Discard changes"). */
  footerStart?: ReactNode;
  /** Replaces the default Continue button (e.g. "Publish to Trip Signups"). */
  footerEnd?: ReactNode;
  /** The current step's body. */
  children: ReactNode;
}

export function WizardShell({
  title,
  subtitle,
  steps,
  currentStepId,
  onSelectStep,
  onBack,
  onContinue,
  continueLabel = "Continue",
  backLabel = "Back",
  footerStart,
  footerEnd,
  children,
}: WizardShellProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  const isFirst = currentIndex <= 0;

  return (
    <>
      <div className="wiz">
        <div className="wiz__rail wiz__rail--steps">
          <div className="wiz__railhead">
            <div className="wiz__railtitle">{title}</div>
            <div className="wiz__railsub">{subtitle}</div>
          </div>
          {steps.map((s, idx) => {
            const current = s.id === currentStepId;
            const done = currentIndex > -1 && idx < currentIndex;
            return (
              <button
                key={s.id}
                type="button"
                className={`railstep ${current ? "current" : done ? "done" : ""}`}
                onClick={() => onSelectStep?.(s.id)}
              >
                <span className="railstep__n">{done ? <IconCheck /> : idx + 1}</span>
                {s.label}
              </button>
            );
          })}
        </div>
        <div className="wiz__main">
          <div className="wiz__body">{children}</div>
        </div>
      </div>

      <div className="wiz__foot">
        <div className="side">
          {!isFirst && (
            <button type="button" className="btn btn--ghost" onClick={onBack}>
              <IconBack /> {backLabel}
            </button>
          )}
          {footerStart}
        </div>
        <div className="side">
          {footerEnd ?? (
            <button type="button" className="btn" onClick={onContinue}>
              {continueLabel}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
