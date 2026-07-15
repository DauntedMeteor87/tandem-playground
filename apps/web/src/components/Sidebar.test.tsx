import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { StudioProvider } from "@/lib/studio-state";

// Hermetic: stub Next routing so the rail renders without an app router.
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const SIX_LABELS = [
  "Home",
  "Create an Adventure",
  "Manage Adventures",
  "Clone an Adventure",
  "Create a Club",
  "Manage a Club",
];

describe("Sidebar", () => {
  it("renders exactly the six destinations for a club admin", () => {
    // Default seed clubs include Field Studies (role: admin) → gate passes.
    render(
      <StudioProvider>
        <Sidebar />
      </StudioProvider>,
    );
    for (const label of SIX_LABELS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("hides Manage a Club when the user admins nothing", () => {
    // No admin club → isClubAdmin() is false → adminOnly row is filtered out.
    render(
      <StudioProvider initialClubs={[]}>
        <Sidebar />
      </StudioProvider>,
    );
    expect(screen.queryByText("Manage a Club")).not.toBeInTheDocument();
    for (const label of SIX_LABELS.slice(0, 5)) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
