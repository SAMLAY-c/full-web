import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "暖阳博客 | WarmSun Blog",
  description: "用文字记录每一个精彩瞬间"
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
