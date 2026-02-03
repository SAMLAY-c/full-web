import type { Metadata } from "next";
import { Chakra_Petch, Outfit } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "The Insider Library | X 的私密知识库",
  description: "Member-only SOPs, resources, and delivery playbooks."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
