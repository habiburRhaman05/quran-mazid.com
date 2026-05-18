"use client";

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
    <div
      className="
        h-20 w-full shrink-0 relative
        flex items-center gap-3
        border-t border-border
        bg-background/95
        text-foreground
        backdrop-blur supports-[backdrop-filter]:bg-background/90
      "
    >
      {/* Progress Slider */}
      <Slider
        value={[Math.min(currentTime, duration || 0)]}
        min={0}
        max={duration || 0.001}
        step={0.1}
        onValueChange={(v) => seek(v[0])}
        className="absolute top-0 left-0 right-0 cursor-pointer"
      />

      {/* Surah Info */}
      <div className="hidden sm:block min-w-[140px] text-sm absolute left-6">
        <span className="text-muted-foreground">
          {surah?.nameEnglish}:
        </span>{" "}
        <span className="font-semibold text-foreground">
          {ayahId}
        </span>
      </div>

      {/* Controls */}
      <div className="mx-auto flex items-center gap-4 sm:gap-6">
        {/* Current Time */}
        <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
          {formatTime(currentTime)}
        </span>

        {/* Previous */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="
            flex size-9 items-center justify-center rounded-full
            text-foreground
            hover:bg-accent
            hover:text-accent-foreground
            transition-colors
          "
        >
          <SkipBack className="size-4" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="
            flex size-10 items-center justify-center rounded-full
            bg-primary text-primary-foreground
            hover:bg-primary/90
            transition-colors
            shadow-sm
          "
        >
          {isPlaying ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5 ml-0.5" />
          )}
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next"
          className="
            flex size-9 items-center justify-center rounded-full
            text-foreground
            hover:bg-accent
            hover:text-accent-foreground
            transition-colors
          "
        >
          <SkipForward className="size-4" />
        </button>

        {/* Stop */}
        <button
          onClick={stop}
          aria-label="Stop"
          className="
            flex size-9 items-center justify-center rounded-full
            text-foreground
            hover:bg-accent
            hover:text-accent-foreground
            transition-colors
          "
        >
          <X className="size-4" />
        </button>

        {/* Duration */}
        <span className="w-12 text-xs tabular-nums text-muted-foreground">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}