import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ArabicFont =
  | "Amiri Quran"
  | "Scheherazade New"
  | "Noto Naskh Arabic";

export const ARABIC_FONTS: { label: string; value: ArabicFont; script: "uthmani" | "indopak" }[] = [
  { label: "Amiri Quran", value: "Amiri Quran", script: "uthmani" },
  { label: "Scheherazade New", value: "Scheherazade New", script: "uthmani" },
  { label: "Noto Naskh Arabic", value: "Noto Naskh Arabic", script: "indopak" },
];

// QuranMazid translation catalog (subset of popular options).
export type TranslationOption = {
  id: string; // translation id used in the upstream API
  languageId: string; // BCP-ish code passed as languageId
  label: string; // human label
  language: string; // language group label
};

export const TRANSLATIONS: TranslationOption[] = [
  { id: "23", languageId: "en", label: "Saheeh International", language: "English" },
  { id: "20", languageId: "en", label: "Dr. Mustafa Khattab", language: "English" },
  { id: "19", languageId: "en", label: "Pickthall", language: "English" },
  { id: "161", languageId: "bn", label: "Muhiuddin Khan", language: "Bangla" },
  { id: "163", languageId: "bn", label: "Taisirul Quran", language: "Bangla" },
  { id: "78", languageId: "ur", label: "Fateh Muhammad Jalandhry", language: "Urdu" },
  { id: "131", languageId: "id", label: "Indonesian Islamic Affairs Ministry", language: "Indonesian" },
  { id: "33", languageId: "tr", label: "Diyanet Isleri", language: "Turkish" },
];

export type Theme = "dark" | "light";

type SettingsState = {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
  showByWord: boolean;
  tajweed: boolean;
  theme: Theme;
  translationId: string;
  languageId: string;
  setArabicFont: (f: ArabicFont) => void;
  setArabicFontSize: (n: number) => void;
  setTranslationFontSize: (n: number) => void;
  setShowByWord: (v: boolean) => void;
  setTajweed: (v: boolean) => void;
  setTheme: (t: Theme) => void;
  setTranslation: (translationId: string) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFont: "Amiri Quran",
      arabicFontSize: 40,
      translationFontSize: 17,
      showByWord: false,
      tajweed: true,
      theme: "dark",
      translationId: "23",
      languageId: "en",
      setArabicFont: (arabicFont) => set({ arabicFont }),
      setArabicFontSize: (arabicFontSize) => set({ arabicFontSize }),
      setTranslationFontSize: (translationFontSize) => set({ translationFontSize }),
      setShowByWord: (showByWord) => set({ showByWord }),
      setTajweed: (tajweed) => set({ tajweed }),
      setTheme: (theme) => set({ theme }),
      setTranslation: (translationId) => {
        const t = TRANSLATIONS.find((x) => x.id === translationId);
        set({ translationId, languageId: t?.languageId ?? "en" });
      },
    }),
    {
      name: "qm-settings-v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as never))),
      skipHydration: true,
    },
  ),
);
