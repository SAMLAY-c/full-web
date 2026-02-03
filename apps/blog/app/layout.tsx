import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";

// 统一设计系统字体：Inter用于标题，Merriweather用于正文
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  display: "swap",
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
    <html lang="zh-CN" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
