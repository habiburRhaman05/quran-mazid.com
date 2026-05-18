"use client"
import { useEffect } from "react";
import { useSettings } from "@/lib/settings";

export function ThemeAndFontProvider({ children }: { children: React.ReactNode }) {
  const theme = useSettings((s) => s.theme);
  const arabicFont = useSettings((s) => s.arabicFont);

  useEffect(() => {
    // Hydrate persist on client
    void useSettings.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--arabic-font", `"${arabicFont}"`);
  }, [arabicFont]);

  return <>{children}</>;
}
