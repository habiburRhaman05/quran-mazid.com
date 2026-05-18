// src/components/layout/ayatList.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import { AyahRow } from "@/components/reader/ayah-row";
import { useSettings } from "@/lib/settings";
import { fetchSurahAyahs, type QuranAyah } from "@/lib/api";

export function AyahList({ surahId }: { surahId: number }) {
  const languageId = useSettings((s) => s.languageId);
  const translationId = useSettings((s) => s.translationId);

  const [ayahs, setAyahs] = useState<QuranAyah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchSurahAyahs({
          surahId,
          languageId,
          translations: [translationId],
          
        });

        if (!alive) return;

        setAyahs(data);
      } catch (err) {
        if (!alive || controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Failed to load ayahs.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [surahId, languageId, translationId]);

  const queue = useMemo(() => ayahs.map((ayah) => ayah.ayahId), [ayahs]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-24 rounded-xl border border-border/60 bg-muted/30 animate-pulse" />
        <div className="h-24 rounded-xl border border-border/60 bg-muted/30 animate-pulse" />
        <div className="h-24 rounded-xl border border-border/60 bg-muted/30 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-destructive">
        {error}
      </div>
    );
  }

  if (!ayahs.length) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No ayahs returned.
      </div>
    );
  }

  return (
    <div>
      {ayahs.map((ayah) => (
        <AyahRow key={ayah.ayahId} ayah={ayah} queue={queue} />
      ))}
    </div>
  );
}