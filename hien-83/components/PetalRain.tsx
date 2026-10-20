'use client';

import { useEffect, useRef } from 'react';

const PETAL_EMOJIS = ['🌸', '🌺', '🌹', '💮', '🌷', '🍀'];

interface Petal {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function PetalRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const COUNT = 22;
    const petals: Petal[] = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
      x: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 8 + Math.random() * 12,
      delay: -(Math.random() * 20),
      opacity: 0.5 + Math.random() * 0.5,
    }));
    petalsRef.current = petals;

    if (!containerRef.current) return;
    const container = containerRef.current;

    petals.forEach((p) => {
      const el = document.createElement('div');
      el.className = 'petal';
      el.textContent = p.emoji;
      el.style.cssText = `
        left: ${p.x}%;
        font-size: ${p.size}px;
        animation-duration: ${p.duration}s;
        animation-delay: ${p.delay}s;
        opacity: ${p.opacity};
        filter: drop-shadow(0 2px 4px rgba(236,72,153,0.3));
      `;
      container.appendChild(el);
    });

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
}
