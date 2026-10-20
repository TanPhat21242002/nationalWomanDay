'use client';

import { useState, useEffect } from 'react';
import styles from './GiftScene.module.css';

interface GiftSceneProps {
  onNext: () => void;
}

const MESSAGES = [
  { emoji: '🌸', title: 'Hạnh phúc', text: 'Anh thích nhất lúc mình mỉm cười và anh sẽ cố gắng để mình iu luôn cười tươi như thế :3.' },
  { emoji: '💖', title: 'Bình an', text: 'Mong trái tim em luôn nhẹ nhàng và bình yên trong mọi khoảnh khắc.' },
  { emoji: '🌹', title: 'Yêu thương', text: 'Mong mình biết rằng mọi điều em luôn có anh kề cạnh và ủng hộ, hông bao giờ đơn độc.' },
  { emoji: '✨', title: 'Rực rỡ', text: 'Nếu trên thế giới có 100 người chú ý những việc em đã làm thì chắc chắn trong đó có anh, còn nếu chỉ có 1 thì chắc người đó là anh!' },
];

export default function GiftScene({ onNext }: GiftSceneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([false, false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; emoji: string }[]>([]);

  const handleGiftClick = () => {
    if (!isOpen) {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setIsOpen(true);
        spawnConfetti();
      }, 600);
    }
  };

  const spawnConfetti = () => {
    const colors = ['#f472b6', '#ec4899', '#fce7f3', '#fff', '#fbcfe8'];
    const emojis = ['🌸', '✨', '💕', '🌹', '🎉'];
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      emoji: emojis[i % emojis.length],
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 3000);
  };

  const revealCard = (i: number) => {
    setRevealedCards((prev) => {
      const next = [...prev];
      next[i] = true;
      if (next.every(Boolean)) setAllRevealed(true);
      return next;
    });
  };

  return (
    <div className={styles.container}>
      {/* Background */}
      <div className={styles.bgDecor} />

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className={styles.confettiPiece}
          style={{
            left: `${c.x}%`,
            color: c.color,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1.5 + Math.random() * 1.5}s`,
          }}
        >
          {c.emoji}
        </div>
      ))}

      <div className={styles.inner}>
        <h2 className={styles.title}>
          {isOpen ? '🎉 Món quà của em!' : 'Em có một món quà nhỏ ~'}
        </h2>
        <p className={styles.subtitle}>
          {isOpen
            ? 'Nhấn vào từng ô để mở những điều anh muốn gửi 💕'
            : 'Hãy nhấn vào hộp quà để mở nào! 🎁'}
        </p>

        {/* Gift Box */}
        {!isOpen && (
          <div
            className={`${styles.giftBox} ${shaking ? styles.shaking : ''}`}
            onClick={handleGiftClick}
            role="button"
            aria-label="Mở hộp quà"
          >
            <div className={styles.giftLid}>
              <div className={styles.giftRibbon} />
            </div>
            <div className={styles.giftBody}>
              <div className={styles.giftStripe} />
            </div>
            <div className={styles.giftBow}>🎀</div>
            <p className={styles.giftHint}>Nhấn vào đây!</p>
          </div>
        )}

        {/* Message cards */}
        {isOpen && (
          <div className={styles.cardsGrid}>
            {MESSAGES.map((msg, i) => (
              <div
                key={i}
                className={`${styles.card} ${revealedCards[i] ? styles.cardOpen : ''}`}
                onClick={() => revealCard(i)}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {!revealedCards[i] ? (
                  <div className={styles.cardFront}>
                    <span className={styles.cardEmoji}>{msg.emoji}</span>
                    <span className={styles.cardTap}>Nhấn để mở</span>
                  </div>
                ) : (
                  <div className={styles.cardBack}>
                    <span className={styles.cardEmoji}>{msg.emoji}</span>
                    <h3 className={styles.cardTitle}>{msg.title}</h3>
                    <p className={styles.cardText}>{msg.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {allRevealed && (
          <div className={styles.allDoneSection}>
            <p className={styles.allDoneText}>🌸 Còn một điều đặc biệt nữa dành cho em... 🌸</p>
            <button className="btn-primary" onClick={onNext}>
              Tiếp tục nhận quà 🌷
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
