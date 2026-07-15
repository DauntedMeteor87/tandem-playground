// Manage a Club: the admin console over the seeded Field Studies data. Covers
// the non-admin officer banner (empty-states.md web #6), an inline role change,
// and approving every pending request down to the requests-empty banner
// (empty-states.md web #7).
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { seedClubs, type Club } from "@/lib/data";
import { StudioProvider } from "@/lib/studio-state";
import ManageClubPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/manage-club",
}));

function renderPage(initialClubs?: Club[]) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <StudioProvider initialClubs={initialClubs}>{children}</StudioProvider>
  );
  return render(<ManageClubPage />, { wrapper });
}

describe("Manage a Club", () => {
  it("shows the officer banner on a direct visit by a non-admin", () => {
    const nonAdmin = seedClubs().map((c) => ({ ...c, role: "member" as const }));
    renderPage(nonAdmin);
    expect(
      screen.getByText(/Only club officers can manage a club/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to Home" }),
    ).toBeInTheDocument();
    // None of the admin console chrome renders.
    expect(screen.queryByRole("button", { name: "Roster" })).not.toBeInTheDocument();
  });

  it("changes a member's role from the roster", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Roster" }));

    const select = screen.getByLabelText(
      "Role for Jordan R.",
    ) as HTMLSelectElement;
    expect(select.value).toBe("Trip lead");
    fireEvent.change(select, { target: { value: "Admin" } });

    expect(
      (screen.getByLabelText("Role for Jordan R.") as HTMLSelectElement).value,
    ).toBe("Admin");
  });

  it("approves every request down to the requests-empty banner", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /Requests/ }));
    expect(screen.getByText("Casey L.")).toBeInTheDocument();
    expect(screen.getByText("Morgan D.")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Approve" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Approve" }));

    expect(
      screen.getByText(/No join requests waiting/),
    ).toBeInTheDocument();
    expect(screen.queryByText("Casey L.")).not.toBeInTheDocument();
  });
});
