export interface QuranAyah {
  ayahId: number;
  verseKey?: string;
  arabic?: string;
  translation?: string;
  [key: string]: unknown;
}

interface FetchSurahAyahsParams {
  surahId: number;
  languageId: string;
  translations: string[];
  script?: string;
}

const BASE =
  "https://quranmazid.com/api/v1/trpc/surah.getSurahAyahs";

/**
 * MAIN UNIFIED FETCH FUNCTION
 *
 * ✔ Works in Server Components
 * ✔ Works in Client Components
 * ✔ Works in React Query
 * ✔ Works in SSG / ISR
 * ✔ NO internal API dependency (fixes build crash)
 */
export async function fetchSurahAyahs({
  surahId,
  languageId,
  translations,
  script = "uthmani",
}: FetchSurahAyahsParams): Promise<QuranAyah[]> {
  const allAyahs: unknown[] = [];

  for (let page = 1; page <= 10; page++) {
    const input: Record<string, unknown> = {
      surahId,
      languageId,
      translations,
      script,
      limit: 100,
    };

    if (page > 1) {
      input.cursor = page;
    }

    const payload = {
      0: input,
    };

    const url = `${BASE}?batch=1&input=${encodeURIComponent(
      JSON.stringify(payload)
    )}&languageId=${languageId}`;

    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": "Mozilla/5.0 (compatible; QuranMazidApp/1.0)",
        referer: "https://quranmazid.com/",
      },
      next: {
        revalidate: 3600, // 1 hour cache (SSG + ISR safe)
      },
    });

    if (!res.ok) {
      throw new Error(`Upstream error: ${res.status}`);
    }

    const json = (await res.json()) as any;

    const data = json?.[0]?.result?.data;

    const ayahs =
      data?.surah?.ayahs ??
      data?.json?.surah?.ayahs ??
      [];

    if (ayahs.length === 0) break;

    allAyahs.push(...ayahs);

    if (ayahs.length < 100) break;
  }

  return allAyahs as QuranAyah[];
}