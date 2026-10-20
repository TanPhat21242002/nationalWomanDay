'use client';

import React, { useMemo } from 'react';
import styles from './GardenBackground.module.css';

interface FlowerItem {
  id: number;
  emoji: string;
  left: number;       // percentage across width
  stemHeight: number; // height in px
  flowerSize: number; // font-size in px
  swayClass: string;
  delay: number;      // animation-delay in seconds
  scale: number;
  zIndex: number;
}

const FLOWERS = ['🌸', '🌷', '🌹', '🌺', '🌼', '🌻', '🪻', '💮'];

export default function GardenBackground() {
  // Generate consistent flower field
  const flowers = useMemo<FlowerItem[]>(() => {
    // 28 flower stems planted across the horizon
    const list: FlowerItem[] = [];
    const count = 28;

    for (let i = 0; i < count; i++) {
      // spread evenly with slight jitter
      const left = ((i + 0.5) / count) * 98 + (Math.sin(i * 3.7) * 1.5);
      const isBackLayer = i % 2 === 0;
      const stemHeight = isBackLayer
        ? 22 + ((i * 11) % 18)   // 22px - 40px
        : 32 + ((i * 13) % 20);   // 32px - 52px

      const emoji = FLOWERS[i % FLOWERS.length];
      const swayClasses = [styles.swayGentle1, styles.swayGentle2, styles.swayGentle3];
      const swayClass = swayClasses[i % swayClasses.length];
      const delay = -((i * 0.43) % 4.5);
      const scale = isBackLayer ? 0.75 : 0.9;
      const zIndex = isBackLayer ? 2 : 3;
      const flowerSize = isBackLayer ? 22 : 26;

      list.push({
        id: i,
        emoji,
        left,
        stemHeight,
        flowerSize,
        swayClass,
        delay,
        scale,
        zIndex,
      });
    }

    return list;
  }, []);

  return (
    <div className={styles.bgContainer} aria-hidden="true">
      {/* Sun glow & morning sky tone */}
      <div className={styles.sunGlow} />
      <div className={styles.skyTint} />

      {/* Butterflies gently flying */}
      <div className={`${styles.butterfly} ${styles.butterfly1}`}>🦋</div>
      <div className={`${styles.butterfly2} ${styles.butterfly2}`}>🦋</div>

      {/* Rolling meadow hills SVG */}
      <svg
        className={styles.meadowSvg}
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="backHills" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="frontHills" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Back rolling hill */}
        <path
          d="M0,90 C320,30 460,120 720,70 C980,20 1140,110 1440,60 L1440,220 L0,220 Z"
          fill="url(#backHills)"
        />

        {/* Front rolling hill */}
        <path
          d="M0,130 C240,90 480,160 800,110 C1080,70 1280,140 1440,100 L1440,220 L0,220 Z"
          fill="url(#frontHills)"
        />
      </svg>

      {/* Swaying flower field */}
      <div className={styles.flowerField}>
        {flowers.map((f) => (
          <div
            key={f.id}
            className={`${styles.plant} ${f.swayClass}`}
            style={{
              left: `${f.left}%`,
              zIndex: f.zIndex,
              animationDelay: `${f.delay}s`,
              transform: `scale(${f.scale})`,
            }}
          >
            {/* Flower bloom on top */}
            <span
              className={styles.flowerHead}
              style={{ fontSize: `${f.flowerSize}px` }}
            >
              {f.emoji}
            </span>

            {/* Stem with leaves */}
            <div
              className={styles.stem}
              style={{ height: `${f.stemHeight}px` }}
            >
              <span className={styles.leafLeft} />
              <span className={styles.leafRight} />
            </div>
          </div>
        ))}
      </div>

      {/* Grass fringe at bottom */}
      <div className={styles.grassFringe}>
        {'🌿 🌱 🍀 🌾 🌿 🌱 🍀 🌾 🌿 🌱 🍀 🌾 🌿 🌱 🍀 🌾 🌿 🌱 🍀 🌾 🌿 🌱 🍀 🌾 🌿 🌱 🍀'
          .split(' ')
          .map((g, i) => (
            <span
              key={i}
              className={styles.grassBlade}
              style={{
                fontSize: `${14 + (i % 5) * 2}px`,
                animationDelay: `${-(i * 0.2)}s`,
                opacity: 0.85,
              }}
            >
              {g}
            </span>
          ))}
      </div>
    </div>
  );
}
