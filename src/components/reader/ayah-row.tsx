import { Play, Pause, BookOpen, Bookmark, MoreHorizontal } from "lucide-react";
import { useSettings } from "@/lib/settings";
import { useAudio } from "@/lib/audio-store";
import { sanitizeTajweed } from "@/lib/sanitize-tajweed";
import { toArabicNumber } from "@/lib/surahs";
import type { QuranAyah } from "@/lib/api";
import { cn } from "@/lib/utils";

export function AyahRow({ ayah, queue }: { ayah: any; queue: number[] }) {
  const arabicSize = useSettings((s) => s.arabicFontSize);
  const arabicFont = useSettings((s) => s.arabicFont);
  const translationSize = useSettings((s) => s.translationFontSize);
  const tajweed = useSettings((s) => s.tajweed);

  const currentSurah = useAudio((s) => s.surahId);
  const currentAyah = useAudio((s) => s.ayahId);
  const isPlaying = useAudio((s) => s.isPlaying);
  const play = useAudio((s) => s.play);

  const isActive = currentSurah === ayah.surahId && currentAyah === ayah.ayahId;
  const isPlayingThis = isActive && isPlaying;

  const arabic = ayah.wbws.map((w:any) => w.uthmani || w.arabic_text).join(" ");
  const arabicHtml = sanitizeTajweed(arabic, tajweed);
  const translation = ayah.translations[0]?.translation ?? "";
  const translationName = ayah.translations[0]?.name?.toUpperCase() ?? "SAHEEH INTERNATIONAL";

  return (
    <div
      className={cn(
        "border-b border-border/50 px-6 py-6 transition-colors",
        isActive && "bg-surah-active/40",
      )}
    >
      
      <div className="flex items-start gap-2 mb-3">
        <span className="text-primary font-semibold text-sm">
          {ayah.surahId}:{ayah.ayahId}
        </span>
      </div>
      <div className="flex gap-4">
        {/* action column */}
        <div className="flex flex-col items-center gap-3 text-muted-foreground shrink-0">
          <button
            onClick={() => play(ayah.surahId, ayah.ayahId, queue)}
            className={cn(
              "size-7 rounded-md flex items-center justify-center hover:text-foreground hover:bg-accent transition",
              isPlayingThis && "text-primary",
            )}
            aria-label={isPlayingThis ? "Pause" : "Play"}
          >
            {isPlayingThis ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button className="size-7 rounded-md flex items-center justify-center hover:text-foreground hover:bg-accent transition" aria-label="Tafsir">
            <BookOpen className="size-4" />
          </button>
          <button className="size-7 rounded-md flex items-center justify-center hover:text-foreground hover:bg-accent transition" aria-label="Bookmark">
            <Bookmark className="size-4" />
          </button>
          <button className="size-7 rounded-md flex items-center justify-center hover:text-foreground hover:bg-accent transition" aria-label="More">
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          {/* Arabic — right aligned */}
          <p
            className="arabic-text text-right leading-loose"
            style={{
              fontFamily:""
            }}
            // style={{ fontSize: `${arabicSize}px`, fontFamily: `"${arabicFont}", "Amiri Quran", "Scheherazade New", serif` }}
          >
            <span dangerouslySetInnerHTML={{ __html: arabicHtml }} />{" "}
            <span className="inline-flex items-center justify-center mx-1 size-9 text-base text-primary border border-primary/60 rounded-full">
              {toArabicNumber(ayah.ayahId)}
            </span>
          </p>

          {/* Translation */}
          <p className="text-[10px] tracking-widest text-muted-foreground mt-4 mb-1.5 font-semibold">
            {translationName}
          </p>
          <p className="text-foreground/90" style={{ fontSize: `${translationSize}px`, lineHeight: 1.7 }}>
            {translation}
          </p>
        </div>
      </div>
    </div>
  );
}
