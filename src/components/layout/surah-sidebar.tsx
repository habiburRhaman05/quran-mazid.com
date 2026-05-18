
import { useMemo, useState } from "react";

import { Search } from "lucide-react";
import { SURAHS } from "@/lib/surahs";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Tab = "Surah" | "Juz" | "Page";

export function SurahSidebar({ onNavigate,currentId }: { onNavigate?: () => void;currentId:number }) {
  const [tab, setTab] = useState<Tab>("Surah");
  const [q, setQ] = useState("");

  



  const filtered = useMemo(() => {
    if (!q.trim()) return SURAHS;
    const needle = q.trim().toLowerCase();
    return SURAHS.filter(
      (s) =>
        s.nameEnglish.toLowerCase().includes(needle) ||
        s.translation.toLowerCase().includes(needle) ||
        s.nameArabic.includes(needle) ||
        s.id.toString() === needle,
    );
  }, [q]);

  return (
    <div className="flex flex-col  w-full  bg-background ">
     
      <div className="px-6 py-3 pb-2 space-y-3">
        <div className="grid grid-cols-3 rounded-full bg-muted p-1 text-sm">
          {(["Surah", "Juz", "Page"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "py-1.5 rounded-full transition-colors",
                tab === t ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${tab}`}
            className="w-full h-10 pl-9 pr-3 rounded-full bg-muted text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-2 scroll-thin px-6 pb-4 space-y-1.5">
        {tab !== "Surah" ? (
          <div className="text-center text-xs text-muted-foreground py-10">
            {tab} view coming soon
          </div>
        ) : (
          filtered.map((s) => {
            const active = s.id === currentId;
            return (
              <Link
                key={s.id}
                href={`/surah/${s.id}`}
              
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-md p-4 border  hover:bg-accent/60 transition-colors",
                  active && "bg-surah-active/40 border-surah-active-border",
                )}
              >
                <NumberBadge n={s.id} active={active} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{s.nameEnglish}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{s.translation}</div>
                </div>
                <div className="arabic-text text-base text-muted-foreground" style={{ ["--arabic-font" as never]: `"Amiri Quran"` }}>
                  {s.nameArabic}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

function NumberBadge({ n, active }: { n: number; active: boolean }) {
  return (
    <div
      className={cn(
        "relative size-9 shrink-0 flex items-center justify-center text-xs font-bold",
        "before:absolute before:inset-0 before:rotate-45 before:rounded-md before:border",
        active
          ? "before:bg-primary before:border-primary text-primary-foreground"
          : "before:border-border text-foreground before:bg-muted",
      )}
    >
      <span className="relative">{n}</span>
    </div>
  );
}
