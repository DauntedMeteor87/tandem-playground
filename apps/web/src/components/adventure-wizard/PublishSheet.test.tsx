// PublishSheet no-club/crew empty state (empty-states.md #11): the inline line
// appears and Publish stays enabled — publishing public is never a dead end.
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CREWS, freshAdventure } from "@/lib/data";
import { PublishSheet } from "./PublishSheet";

describe("PublishSheet — no clubs", () => {
  it("shows the empty line and keeps Publish enabled when the lead admins no clubs", () => {
    render(
      <PublishSheet
        adv={freshAdventure()} // defaults to visType 'club'
        clubs={[]}
        crews={CREWS}
        onSetVisType={vi.fn()}
        onSetVisId={vi.fn()}
        onPublish={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText(/No clubs or crews yet/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publish" })).toBeEnabled();
  });

  it("still publishes (public) with no clubs", () => {
    const onPublish = vi.fn();
    render(
      <PublishSheet
        adv={freshAdventure()}
        clubs={[]}
        crews={CREWS}
        onSetVisType={vi.fn()}
        onSetVisId={vi.fn()}
        onPublish={onPublish}
        onClose={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Publish" }));
    expect(onPublish).toHaveBeenCalledTimes(1);
  });
});
