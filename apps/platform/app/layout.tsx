import type { Metadata } from "next";
import { Unbounded, Hind } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"]
});

const body = Hind({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"]
});

export const metadata: Metadata = {
  title: "Platform | Private Library",
  description: "Member-only SOPs, resources, and delivery playbooks."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
