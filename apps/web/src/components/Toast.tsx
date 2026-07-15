// Source: Wireframe 0.2 — toast() in app.js. The little pill that slides up on
// "Draft saved", "Changes saved", etc. Reads the current toast off the studio
// context and auto-dismisses after 1800ms (the wireframe's timer), keyed on the
// message nonce so the same text can re-fire. Rendered once in the studio layout.
"use client";

import { useEffect } from "react";
import { useStudio } from "@/lib/studio-state";

export function Toast() {
  const { toast, dismissToast } = useStudio();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 1800);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
      {toast?.message ?? ""}
    </div>
  );
}
