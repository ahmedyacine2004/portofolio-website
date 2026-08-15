'use client';

import { useAudioStore } from '@/stores/audio.store';
import { useEffect } from 'react';

export function AudioPlayer() {
  const { setAudioRef } = useAudioStore();

  useEffect(() => {
    const audio = new Audio('/music/Interstellar.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%

    setAudioRef(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [setAudioRef]);

  return null; // This component doesn't render anything, it just manages the audio
}
