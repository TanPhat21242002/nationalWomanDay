'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './GardenScene.module.css';

interface GardenSceneProps {
  onNext: () => void;
}

interface FlowerData {
  id: number;
  x: number;
  y: number;
  emoji: string;
  grown: boolean;
  size: number;
  rotation: number;
}

const FLOWER_SET = ['🌸', '🌺', '🌹', '🌷', '🌼', '🌻', '💐', '🌸', '🌺', '🌷'];

const WISHES = [
  'Mong em vui mỗi ngày 🌸',
  'Mong em khỏe mạnh 💗',
  'Mong em luôn tự tin ✨',
  'Mong em ăn ngon ngủ đủ 🌙',
  'Mong em được yêu thương 💕',
  'Mong giấc mơ em đẹp 🌈',
  'Mong em không bao giờ khóc 😊',
  'Mong em mãi tươi cười 🌺',
];

export default function GardenScene({ onNext }: GardenSceneProps) {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [wishIdx, setWishIdx] = useState(0);
  const [showWish, setShowWish] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const gardenRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (flowers.length >= 8) setCanProceed(true);
  }, [flowers]);

  // Cycle wishes
  useEffect(() => {
    const t = setInterval(() => {
      setWishIdx((i) => (i + 1) % WISHES.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const plantFlower = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gardenRef.current) return;
    const rect = gardenRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (y < 10 || y > 90) return; // avoid top/bottom edges

    const id = ++idRef.current;
    const emoji = FLOWER_SET[id % FLOWER_SET.length];

    const flower: FlowerData = {
      id,
      x,
      y,
      emoji,
      grown: false,
      size: 24 + Math.random() * 20,
      rotation: (Math.random() - 0.5) * 30,
    };

    setFlowers((prev) => [...prev, flower]);

    // Show random wish
    setShowWish(false);
    setTimeout(() => setShowWish(true), 100);
    setTimeout(() => setShowWish(false), 2000);

    // Grow animation after brief delay
    setTimeout(() => {
      setFlowers((prev) =>
        prev.map((f) => (f.id === id ? { ...f, grown: true } : f))
      );
    }, 50);
  };

  const flowerCount = flowers.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Khu vườn của Hiền 🌺</h2>
        <p className={styles.subtitle}>
          Nhấn vào khu vườn để trồng hoa — trồng {Math.max(0, 8 - flowerCount)} bông nữa để tiếp tục!
        </p>

        {/* Wish bubble */}
        <div className={`${styles.wishBubble} ${showWish ? styles.wishVisible : ''}`}>
          {WISHES[wishIdx]}
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(100, (flowerCount / 8) * 100)}%` }}
          />
        </div>
        <p className={styles.progressLabel}>
          {flowerCount} / 8 bông hoa 🌸
        </p>
      </div>

      {/* Garden area */}
      <div
        ref={gardenRef}
        className={styles.garden}
        onClick={plantFlower}
        role="button"
        aria-label="Khu vườn – click để trồng hoa"
      >
        {/* Ground decoration */}
        <div className={styles.groundDecor}>
          {'🌿🍃🌱🌿🍀🌿🌱🍃🌿🍀🌿🌱'.split('').map((c, i) => (
            <span key={i} style={{ fontSize: '1.2rem', opacity: 0.6 }}>{c}</span>
          ))}
        </div>

        {/* Empty state */}
        {flowerCount === 0 && (
          <div className={styles.emptyHint}>
            <span className={styles.emptyIcon}>🌱</span>
            <span>Hãy nhấn để trồng hoa đầu tiên!</span>
          </div>
        )}

        {/* Planted flowers */}
        {flowers.map((f) => (
          <div
            key={f.id}
            className={`${styles.flowerSpot} ${f.grown ? styles.flowerGrown : ''}`}
            style={{
              left: `${f.x}%`,
              top:  `${f.y}%`,
              fontSize: `${f.size}px`,
              transform: `translate(-50%, -50%) rotate(${f.rotation}deg)`,
            }}
          >
            {f.emoji}
          </div>
        ))}

        {/* Hint cursor */}
        <div className={styles.clickHint}>✿ Click để trồng hoa ✿</div>
      </div>

      {canProceed && (
        <div className={styles.proceedSection}>
          <p className={styles.proceedText}>
            🌸 Khu vườn đẹp quá rồi! Còn một điều cuối anh muốn nói với em... 🌸
          </p>
          <button className="btn-primary" onClick={onNext}>
            Đọc thư của anh 💌
          </button>
        </div>
      )}
    </div>
  );
}
