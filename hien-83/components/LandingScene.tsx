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

  // Countdown to birthday
  const birthday = new Date('2002-07-04');
  const now = new Date();
  const nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);
  const daysUntil = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.container} onClick={handleBgClick}>
      {/* Background gradient circles */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />
      <div className={styles.bgBlob3} />

      {/* Floating decorative flowers */}
      {['🌸','🌺','🌷','🌸','💮','🌹','🌸','🌺'].map((f, i) => (
        <div key={i} className={styles.floatingFlower} style={{
          top:  `${10 + (i * 11) % 80}%`,
          left: `${5  + (i * 13) % 90}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${4 + i * 0.5}s`,
          fontSize: `${20 + (i * 7) % 24}px`,
          opacity: 0.25 + (i % 4) * 0.1,
        }}>
          {f}
        </div>
      ))}

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
          <span>8 tháng 3 · Ngày của em</span>
          <span>🌸</span>
        </div>

        {/* Big greeting */}
        <h1 className={styles.greeting}>
          Chào mừng sinh nhật &amp; 8/3
        </h1>

        <div className={styles.nameWrapper}>
          <span className={styles.namePre}>của nàng</span>
          <span className={styles.name}>Hiền 🌹</span>
        </div>

        <p className={styles.subtitle}>
          Một món quà nhỏ, gói ghém cả tấm lòng 💕
        </p>

        {/* Birthday countdown */}
        <div className={styles.countdownBox}>
          <div className={styles.countdownIcon}>🎂</div>
          <div className={styles.countdownText}>
            <span className={styles.countdownLabel}>Sinh nhật 4/7 còn</span>
            <span className={styles.countdownNum}>{daysUntil} ngày</span>
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

        <p className={styles.scrollHint}>↓ Cuộn xuống để khám phá</p>
      </div>
    </div>
  );
}
