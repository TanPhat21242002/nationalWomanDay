'use client';

import { useState, useEffect } from 'react';
import styles from './LetterScene.module.css';

export default function LetterScene() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [canvasHearts, setCanvasHearts] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  const openEnvelope = () => {
    if (envelopeOpen) return;
    setEnvelopeOpen(true);
    setTimeout(() => setLetterVisible(true), 800);
  };

  const addHeart = () => {
    const id = Date.now() + Math.random();
    const x = 30 + Math.random() * 40;
    setHeartCount((c) => c + 1);
    setFloatingHearts((prev) => [...prev, { id, x }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 2000);
  };

  // Auto-float a few hearts on open
  useEffect(() => {
    if (!letterVisible) return;
    const timers = [0.5, 1.2, 2, 3, 4].map((delay) =>
      setTimeout(() => addHeart(), delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [letterVisible]);

  return (
    <div className={styles.container}>
      {/* Background */}
      <div className={styles.bgGlow} />

      {/* Floating hearts from button */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          className={styles.floatingHeart}
          style={{ left: `${h.x}%` }}
        >
          💕
        </div>
      ))}

      {/* Title */}
      <div className={styles.titleArea}>
        <h2 className={styles.title}>
          {letterVisible ? 'Thư gửi Hiền yêu dấu 💌' : 'Có một lá thư dành cho em...'}
        </h2>
      </div>

      {/* Envelope */}
      {!letterVisible && (
        <div
          className={`${styles.envelope} ${envelopeOpen ? styles.envelopeOpen : ''}`}
          onClick={openEnvelope}
          role="button"
          aria-label="Mở phong bì"
        >
          {/* Envelope body */}
          <div className={styles.envBody}>
            <div className={styles.envWax}>
              <span>💕</span>
            </div>
          </div>

          {/* Envelope flap */}
          <div className={styles.envFlap} />

          {/* Front fold lines */}
          <div className={styles.envFoldLeft} />
          <div className={styles.envFoldRight} />

          {!envelopeOpen && (
            <p className={styles.envHint}>Nhấn để mở phong bì 💌</p>
          )}
        </div>
      )}

      {/* Letter */}
      {letterVisible && (
        <div className={styles.letterWrapper}>
          <div className={styles.letter}>
            {/* Letter header decor */}
            <div className={styles.letterDecorTop}>
              {'🌸 🌺 🌷 🌸 🌺 🌷 🌸'.split(' ').map((f, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>{f}</span>
              ))}
            </div>

            {/* Letter content */}
            <div className={styles.letterContent}>
              <p className={styles.letterDate}>20-10-2026</p>
              <p className={styles.letterGreeting}>Gửi em.</p>

              <p className={styles.letterPara}>
                Chúc em, người con gái anh thương,{' '}
                <em>một đời bình an,</em> anh mong sao con đường phía trước của em{' '}
                <em>sẽ luôn tự gạt đi những sóng gió, để em có thể an lòng bước qua</em>{' '}
                những tháng ngày rộng dài,
              </p>

              <blockquote className={styles.letterQuote}>
                <em>If life ever hurts you, I hope my love feels like home.</em>
              </blockquote>

              <p className={styles.letterPara}>
                Mong em chẳng phải chịu thêm những tổn thương, chẳng phải một mình{' '}
                <em>đối diện với bóng tối.</em> Còn nếu cuộc đời vẫn có những đoạn đường
                chẳng mấy dễ dàng,{' '}
                <em>
                  anh sẽ nắm tay em đi qua ngày nắng ngày mưa, and if the world
                  leaves thorns along your way, let me walk beside you,
                </em>{' '}
                anh sẽ cùng đi hết,{' '}
                <em>dù có thế nào cũng chẳng buông em lại một mình.</em>
              </p>

              <p className={styles.letterClosing}>Thương em yêu dấu.</p>

              {/* Signature */}
              <p className={styles.letterSig}> Bà nhỏ iu của anh 🌹</p>
            </div>

            {/* Letter footer decor */}
            <div className={styles.letterDecorBottom}>
              {'🌷 🌸 💕 🌸 🌷'.split(' ').map((f, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Heart button */}
          <div className={styles.heartSection}>
            <p className={styles.heartLabel}>Em đã đọc xong chưa? 💕</p>
            <button
              className={styles.heartBtn}
              onClick={addHeart}
              aria-label="Gửi tim"
            >
              💖
              {heartCount > 0 && <span className={styles.heartBadge}>{heartCount}</span>}
            </button>
            <p className={styles.heartHint}>Nhấn vào trái tim để gửi yêu thương!</p>
          </div>

          {/* Footer message */}
          <div className={styles.footerMsg}>
            <p>🌸 Chúc mừng Ngày Phụ nữ Việt Nam 20/10 · Hiền ơi anh thương em nhiều lắm 🌸</p>
          </div>
        </div>
      )}
    </div>
  );
}
