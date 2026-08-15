import { create } from 'zustand';

type AudioStore = {
  isPlaying: boolean;
  audioRef: HTMLAudioElement | null;
  hydrate: () => void;
  setAudioRef: (ref: HTMLAudioElement | null) => void;
  togglePlayback: () => void;
  play: () => void;
  pause: () => void;
};

const getStoredPlaybackState = (): boolean => {
  if (typeof window === 'undefined') return false;

  const stored = window.localStorage.getItem('portfolio-music-playing');
  return stored === null ? false : stored === 'true';
};

const savePlaybackState = (isPlaying: boolean) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('portfolio-music-playing', String(isPlaying));
};

export const useAudioStore = create<AudioStore>((set, get) => ({
  isPlaying: false,
  audioRef: null,

  hydrate: () => {
    const nextState = getStoredPlaybackState();
    set({ isPlaying: nextState });

    const { audioRef } = get();
    if (audioRef && nextState && audioRef.paused) {
      audioRef.play().catch(() => {
        set({ isPlaying: false });
        savePlaybackState(false);
      });
    }
  },

  setAudioRef: (ref) => {
    set({ audioRef: ref });

    // Auto-play if music was playing before
    if (ref && get().isPlaying) {
      ref.play().catch(() => {
        // Autoplay might be blocked by browser
        set({ isPlaying: false });
        savePlaybackState(false);
      });
    }
  },

  togglePlayback: () => {
    const { audioRef, isPlaying } = get();

    if (!audioRef) return;

    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play().catch(() => {
        // Handle autoplay policy
        set({ isPlaying: false });
        savePlaybackState(false);
      });
    }

    set({ isPlaying: !isPlaying });
    savePlaybackState(!isPlaying);
  },

  play: () => {
    const { audioRef } = get();
    if (audioRef && audioRef.paused) {
      audioRef.play().catch(() => {
        set({ isPlaying: false });
        savePlaybackState(false);
      });
      set({ isPlaying: true });
      savePlaybackState(true);
    }
  },

  pause: () => {
    const { audioRef } = get();
    if (audioRef && !audioRef.paused) {
      audioRef.pause();
      set({ isPlaying: false });
      savePlaybackState(false);
    }
  },
}));
