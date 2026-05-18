// app/surah/[id]/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AyahList } from "@/components/layout/ayatList";
import { getSurah, SURAHS } from "@/lib/surahs";

export const dynamic = "force-static";
export const revalidate = 86400;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const surah = getSurah(Number(id));

  if (!surah) {
    return {
      title: "Quran Mazid",
      description: "Read the Holy Quran online.",
    };
  }

  const title = `Surah ${surah.nameEnglish} — Quran Mazid`;
  const description = `Read Surah ${surah.nameEnglish} (${surah.translation}) — ${surah.ayahCount} ayahs, revealed in ${surah.revelation}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return SURAHS.map((surah) => ({
    id: String(surah.id),
  }));
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahId = Number(id);

  if (!Number.isFinite(surahId)) {
    notFound();
  }

  const surah = getSurah(surahId);

  if (!surah) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl pb-24">
      <SurahHeader surahId={surahId} />

      <AyahList surahId={surahId} />

      <Pagination current={surahId} total={SURAHS.length} />

      <span className="sr-only">Surah {surah.nameEnglish}</span>
    </article>
  );
}

function SurahHeader({ surahId }: { surahId: number }) {
  const surah = getSurah(surahId)!;

  return (
    <header className="text-center pt-10 pb-8 px-4 relative">
      <KaabaIllustration />

      <h1 className="text-2xl md:text-3xl font-bold mt-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
        Surah {surah.nameEnglish}
      </h1>

      <p className="text-sm text-muted-foreground mt-1">
        Ayah-{surah.ayahCount}, {surah.revelation}
      </p>
    </header>
  );
}

function KaabaIllustration() {
  return (
    <div className="relative inline-block">
      <svg
        viewBox="0 0 200 110"
        className="w-44 h-24 opacity-30 mx-auto"
        fill="none"
        stroke="currentColor"
      >
        <rect x="70" y="50" width="60" height="50" strokeWidth="1.5" />
        <path d="M70 60h60" strokeWidth="1" />
        <path d="M40 100h120" strokeWidth="1" />
        <path d="M100 30v20M85 38l15-8 15 8" strokeWidth="1" />
        <circle cx="20" cy="80" r="12" strokeWidth="1" />
        <circle cx="180" cy="80" r="12" strokeWidth="1" />
        <path d="M30 50c0 5-3 8-8 8" strokeWidth="1" />
        <path d="M170 50c0 5 3 8 8 8" strokeWidth="1" />
      </svg>
    </div>
  );
}

function Pagination({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const prev = current > 1 ? current - 1 : null;
  const next = current < total ? current + 1 : null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Surah pagination">
      {prev && (
        <Link
          href={`/surah/${prev}`}
          className="px-4 py-2 rounded-lg border border-border hover:bg-accent text-sm flex items-center gap-1"
        >
          ‹ Previous
        </Link>
      )}

      {next && (
        <Link
          href={`/surah/${next}`}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm flex items-center gap-1"
        >
          Next ›
        </Link>
      )}
    </nav>
  );
}