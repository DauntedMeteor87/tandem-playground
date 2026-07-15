// Root layout for the Studio web portal.
// Wires the two brand stylesheets (tokens first so globals can read them)
// and the locked type pair — Spectral (display) + Hanken Grotesk (UI) — via
// next/font/google, exposed as the CSS variables globals.css consumes.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Spectral, Hanken_Grotesk } from "next/font/google";
import "../styles/tokens.css";
import "./globals.css";

const display = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--tc-font-display",
  display: "swap",
});

const ui = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--tc-font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "tandemclub studio",
  description: "Where club leaders plan trips.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
