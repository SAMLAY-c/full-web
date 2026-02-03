import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700"]
});

export const metadata: Metadata = {
  title: "Portfolio | Product Manager",
  description: "Minimal portfolio focused on product strategy and AI building."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
