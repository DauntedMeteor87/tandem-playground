// Manage Adventures: the list reflects publish/unpublish live (status tag flips,
// Unpublish ⇄ Republish), and the zero state is the wireframe-verbatim banner
// with both inline ways out.
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { seedPublishedTrips } from "@/lib/data";
import { StudioProvider } from "@/lib/studio-state";
import ManageAdventuresPage from "./page";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const oneLiveTrip = () => seedPublishedTrips().slice(0, 1);

function renderPage(published = oneLiveTrip()) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <StudioProvider initialPublished={published}>{children}</StudioProvider>
  );
  return render(<ManageAdventuresPage />, { wrapper });
}

describe("Manage Adventures", () => {
  it("flips a trip between Live and Unpublished from the row action", () => {
    renderPage();
    expect(screen.getByText("Sykes Hot Springs Overnight")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Unpublish"));
    expect(screen.getByText("Unpublished")).toBeInTheDocument();
    expect(screen.getByText("Republish")).toBeInTheDocument();
    expect(screen.queryByText("Live")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Republish"));
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.queryByText("Unpublished")).not.toBeInTheDocument();
  });

  it("shows the verbatim empty banner with both inline links when nothing is published", () => {
    renderPage([]);
    expect(
      screen.getByText(/No published adventures yet/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create one" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "clone a past trip" }),
    ).toBeInTheDocument();
  });
});
