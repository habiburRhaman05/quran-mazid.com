"use client"
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { useAudio, formatTime } from "@/lib/audio-store";
import { getSurah } from "@/lib/surahs";
import { Slider } from "@/components/ui/slider";

export function AudioPlayer() {
  const surahId = useAudio((s) => s.surahId);
  const ayahId = useAudio((s) => s.ayahId);
  const isPlaying = useAudio((s) => s.isPlaying);
  const currentTime = useAudio((s) => s.currentTime);
  const duration = useAudio((s) => s.duration);
  const toggle = useAudio((s) => s.toggle);
  const next = useAudio((s) => s.next);
  const prev = useAudio((s) => s.prev);
  const stop = useAudio((s) => s.stop);
  const seek = useAudio((s) => s.seek);

  if (!surahId || ayahId == null) return null;
  const surah = getSurah(surahId);

  return (
    <div className="h-20 shrink-0  bg-sidebar/95 backdrop-blur flex items-center gap-3 px-4">
      <div className="hidden sm:block min-w-[120px] text-sm">
        <span className="text-muted-foreground">{surah?.nameEnglish} :</span>{" "}
        <span className="font-semibold">{ayahId}</span>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[Math.min(currentTime, duration || 0)]}
          min={0}
          max={duration || 0.001}
          step={0.1}
          onValueChange={(v) => seek(v[0])}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground tabular-nums w-12">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={prev} className="size-9 rounded-full hover:bg-accent flex items-center justify-center" aria-label="Previous">
          <SkipBack className="size-4" />
        </button>
        <button
          onClick={toggle}
          className="size-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
        </button>
        <button onClick={next} className="size-9 rounded-full hover:bg-accent flex items-center justify-center" aria-label="Next">
          <SkipForward className="size-4" />
        </button>
        <button onClick={stop} className="size-9 rounded-full hover:bg-accent flex items-center justify-center" aria-label="Stop">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
