'use client';

import { useEffect, useState } from 'react';
import styles from './LandingScene.module.css';

interface LandingSceneProps {
  onNext: () => void;
}

const FLOWERS = ['🌸', '🌺', '🌹', '🌷', '💐', '🌼', '🌻', '🌸', '🌺'];

export default function LandingScene({ onNext }: LandingSceneProps) {
  const [visible, setVisible] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const emoji = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
    const id = Date.now() + Math.random();

    setSparkles((prev) => [...prev, { id, x, y, emoji }]);
    setClickCount((c) => c + 1);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 1200);
  };

  return (
    <div className={styles.container} onClick={handleBgClick}>
      {/* Background gradient circles */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />
      <div className={styles.bgBlob3} />

      {/* Click sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className={styles.sparkle}
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          {s.emoji}
        </div>
      ))}

      {/* Main content */}
      <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
        {/* Date badge */}
        <div className={styles.dateBadge}>
          <span>🌸</span>
          <span>20 tháng 10 · Ngày Phụ Nữ Việt Nam</span>
          <span>🌸</span>
        </div>

        {/* Big greeting */}
        <h1 className={styles.greeting}>
          Chúc Mừng Ngày 20/10
        </h1>

        <div className={styles.nameWrapper}>
          <span className={styles.namePre}>dành tặng em</span>
          <span className={styles.name}>Hiền🌹</span>
        </div>

        <p className={styles.subtitle}>
          Chúc iu luôn xinh đẹp, rạng rỡ và tràn đầy hạnh phúc 💕
        </p>

        {/* 20/10 Celebration Box */}
        <div className={styles.countdownBox}>
          <div className={styles.countdownIcon}>💐</div>
          <div className={styles.countdownText}>
            <span className={styles.countdownLabel}>Ngày Phụ Nữ Việt Nam</span>
            <span className={styles.countdownNum}>20 tháng 10 💖</span>
          </div>
        </div>

        {/* Hint */}
        {clickCount < 5 && (
          <p className={styles.hint}>✨ Click vào màn hình để tạo hoa nhé ✨</p>
        )}
        {clickCount >= 5 && (
          <p className={styles.hint} style={{ color: 'var(--rose-500)' }}>🌸 Em thật đáng yêu khi click lung tung thế! 🌸</p>
        )}

        {/* CTA */}
        <button className={`btn-primary ${styles.ctaBtn}`} onClick={(e) => { e.stopPropagation(); onNext(); }}>
          Mở quà của em 🎁
        </button>

      </div>
    </div>
  );
}
