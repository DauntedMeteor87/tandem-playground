// The Studio shell — wraps every studio route in the StudioProvider and the
// persistent chrome: topbar, left sidebar, and the scrollable main column.
// Mirrors the wireframe's #screen > topbar + .studio(.sidebar + .studio__main).
import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Toast } from "@/components/Toast";
import { Topbar } from "@/components/Topbar";
import { StudioProvider } from "@/lib/studio-state";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <StudioProvider>
      <div className="screen">
        <Topbar />
        <div className="studio">
          <Sidebar />
          <div className="studio__main">{children}</div>
        </div>
      </div>
      <Toast />
    </StudioProvider>
  );
}
