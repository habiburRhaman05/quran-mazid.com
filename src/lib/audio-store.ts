import { create } from "zustand";
import { ayahAudioUrl } from "./surahs";

type AudioState = {
  surahId: number | null;
  ayahId: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: number[]; // ayah ids for full-surah playback
  audio: HTMLAudioElement | null;
  play: (surahId: number, ayahId: number, queue?: number[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  stop: () => void;
  seek: (t: number) => void;
};

export const useAudio = create<AudioState>((set, get) => ({
  surahId: null,
  ayahId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  audio: null,

  play: (surahId, ayahId, queue) => {
    if (typeof window === "undefined") return;
    const state = get();
    let audio = state.audio;
    if (!audio) {
      audio = new Audio();
      audio.addEventListener("timeupdate", () => {
        set({ currentTime: audio!.currentTime, duration: audio!.duration || 0 });
      });
      audio.addEventListener("ended", () => {
        get().next();
      });
      audio.addEventListener("play", () => set({ isPlaying: true }));
      audio.addEventListener("pause", () => set({ isPlaying: false }));
    }
    // If clicking the same playing ayah → toggle
    if (state.surahId === surahId && state.ayahId === ayahId) {
      if (audio.paused) void audio.play();
      else audio.pause();
      set({ audio });
      return;
    }
    audio.src = ayahAudioUrl(surahId, ayahId);
    void audio.play();
    set({
      audio,
      surahId,
      ayahId,
      queue: queue ?? [ayahId],
      currentTime: 0,
      duration: 0,
    });
  },

  toggle: () => {
    const a = get().audio;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  },

  next: () => {
    const { queue, ayahId, surahId } = get();
    if (!surahId || ayahId == null) return;
    const idx = queue.indexOf(ayahId);
    const nextId = idx >= 0 && idx < queue.length - 1 ? queue[idx + 1] : null;
    if (nextId != null) get().play(surahId, nextId, queue);
    else set({ isPlaying: false });
  },

  prev: () => {
    const { queue, ayahId, surahId } = get();
    if (!surahId || ayahId == null) return;
    const idx = queue.indexOf(ayahId);
    const prevId = idx > 0 ? queue[idx - 1] : null;
    if (prevId != null) get().play(surahId, prevId, queue);
  },

  stop: () => {
    const a = get().audio;
    if (a) {
      a.pause();
      a.src = "";
    }
    set({ isPlaying: false, surahId: null, ayahId: null, currentTime: 0, duration: 0 });
  },

  seek: (t) => {
    const a = get().audio;
    if (a) a.currentTime = t;
  },
}));

export const formatTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};
