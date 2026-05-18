import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/layout/app-shell";
import AppProvider from "@/components/wrapper";
import { ThemeAndFontProvider } from "@/components/theme-provider";
import { AudioPlayer } from "@/components/reader/audio-player";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Quran Mazid",
  description: "Read the Holy Quran online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col overflow-hidden antialiased`}
      >
        <AppProvider>
          <ThemeAndFontProvider>
            <AppShell>{children}</AppShell>
           
          </ThemeAndFontProvider>
        </AppProvider>
      </body>
    </html>
  );
}