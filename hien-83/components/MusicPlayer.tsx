'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YOUTUBE_VIDEO_ID = '9J5PiRnG0kQ';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Load YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('yt-bg-audio-player', {
        height: '100',
        width: '100',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            try {
              event.target.unMute();
              event.target.setVolume(100);
              event.target.playVideo();
            } catch (err) {
              console.log('Autoplay waiting for user gesture', err);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1, PAUSED is 2
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // 2. Play on first interaction if browser blocked auto-audio
    const handleFirstUserGesture = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(100);
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('click', handleFirstUserGesture, { passive: true });
    window.addEventListener('pointerdown', handleFirstUserGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { passive: true });
    window.addEventListener('keydown', handleFirstUserGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Hidden YouTube player container */}
      <div className={styles.hiddenPlayer}>
        <div id="yt-bg-audio-player" />
      </div>

      {/* Floating music control button - compact speaker icon */}
      <div className={styles.musicWrapper}>
        <button
          className={`${styles.musicBtn} ${!isPlaying ? styles.muted : styles.playing}`}
          onClick={toggleMusic}
          title={isPlaying ? 'Nhấn để tắt nhạc' : 'Nhấn để bật nhạc'}
          aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        >
          <span className={styles.musicIcon}>
            {isPlaying ? '🔊' : '🔇'}
          </span>
        </button>
      </div>
    </>
  );
}
