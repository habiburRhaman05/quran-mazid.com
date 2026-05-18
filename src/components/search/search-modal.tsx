import { useEffect, useMemo, useState } from "react";
import { create } from "zustand";
import { Search, ArrowRight, SlidersHorizontal, ChevronDown } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SURAHS } from "@/lib/surahs";
import type { QuranAyah } from "@/lib/api";
import { useSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type SearchStore = { isOpen: boolean; open: () => void; close: () => void; toggle: () => void };
export const useSearchModal = create<SearchStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));

const quickChips = [
  { label: "Al Fatihah", id: 1 },
  { label: "Juz 30", id: 78 },
  { label: "Yasin", id: 36 },
  { label: "Page 1", id: 1 },
];

export function SearchModal() {
  const { isOpen, close } = useSearchModal();
  const [q, setQ] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useSearchModal.getState().toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const surahMatches = q.trim()
    ? SURAHS.filter(
        (s) =>
          s.nameEnglish.toLowerCase().includes(q.toLowerCase()) ||
          s.translation.toLowerCase().includes(q.toLowerCase()) ||
          s.nameArabic.includes(q) ||
          s.id.toString() === q.trim(),
      ).slice(0, 6)
    : [];

  // Search ayahs across all surahs currently cached by react-query.
  const queryClient = useQueryClient();
  const pathname = usePathname()
const currentSurahId = useMemo(() => {
  const match = pathname.match(/\/surah\/(\d+)/);
  return match ? Number(match[1]) : null;
}, [pathname]);
  const languageId = useSettings((s) => s.languageId);
  const translationId = useSettings((s) => s.translationId);

  const ayahMatches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term || term.length < 2) return [] as { surahId: number; ayahId: number; arabic: string; translation: string }[];
    const caches = queryClient.getQueriesData<QuranAyah[]>({ queryKey: ["surah"] });
    const out: { surahId: number; ayahId: number; arabic: string; translation: string }[] = [];
    for (const [, ayahs] of caches) {
      if (!ayahs) continue;
      for (const a of ayahs as any) {
        const arabic = a.wbws.map((w:any) => w.arabic_text.replace(/<[^>]+>/g, "")).join(" ");
        const tr = a.translations[0]?.translation ?? "";
        if (tr.toLowerCase().includes(term) || arabic.includes(q.trim())) {
          out.push({ surahId: a.surahId, ayahId: a.ayahId, arabic, translation: tr });
          if (out.length >= 10) return out;
        }
      }
    }
    return out;
  }, [q, queryClient, languageId, translationId, currentSurahId]);

  const goto = (id: number) => {
    void navigate.push("/surah/$id");
    close();
    setQ("");
  };

  const gotoAyah = (surahId: number, ayahId: number) => {
    void navigate.push("/surah/$id");
    close();
    setQ("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <DialogContent className="max-w-2xl p-0 bg-popover/95 backdrop-blur border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Search className="size-5 text-primary shrink-0" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find wisdom in the Quran"
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            <button className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:text-foreground">
              Quran <ChevronDown className="size-3" />
            </button>
            <button className="size-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground">
              <SlidersHorizontal className="size-4" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto scroll-thin">
          {surahMatches.length === 0 && ayahMatches.length === 0 && !q.trim() && (
            <>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Try to navigate</p>
                <div className="flex flex-wrap gap-2">
                  {quickChips.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => goto(c.id)}
                      className="px-3 py-1.5 rounded-full bg-muted hover:bg-accent text-sm transition-colors"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Tip</p>
                <p className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                  <ArrowRight className="size-4 text-primary shrink-0" />
                  Type at least 2 letters to search ayahs by Arabic or translation text in the loaded surah.
                </p>
              </div>
            </>
          )}

          {surahMatches.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Surahs</p>
              <div className="space-y-1">
                {surahMatches.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => goto(s.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent text-left"
                  >
                    <span className="text-sm">
                      <span className="text-primary font-semibold">{s.nameEnglish}</span>{" "}
                      <span className="text-muted-foreground">— {s.translation}</span>
                    </span>
                    <span className="arabic-text text-base">{s.nameArabic}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {ayahMatches.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Ayahs</p>
              <div className="space-y-1">
                {ayahMatches.map((a) => (
                  <button
                    key={`${a.surahId}:${a.ayahId}`}
                    onClick={() => gotoAyah(a.surahId, a.ayahId)}
                    className="w-full px-3 py-2 rounded-lg hover:bg-accent text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-primary font-semibold">
                        {a.surahId}:{a.ayahId}
                      </span>
                      <span className="arabic-text text-sm truncate max-w-[60%]" dir="rtl">
                        {a.arabic.slice(0, 80)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.translation}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q.trim() && surahMatches.length === 0 && ayahMatches.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No matches. Open a surah first to search inside its ayahs.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const _cn = cn;
