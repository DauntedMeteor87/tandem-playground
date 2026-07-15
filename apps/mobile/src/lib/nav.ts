// Kind-aware routing for a trip card (wireframe app.js tripCard(): Activities open
// their own Activity screen straight into the crew chat; Adventures open the full
// trip page).
import type { TripKind } from "@/lib/demo-data";

export function tripHref(t: { id: string; kind: TripKind }): string {
  return t.kind === "Adventure" ? `/trip/${t.id}` : `/activity/${t.id}`;
}
