'use client';

import { useState, useEffect } from 'react';
import LandingScene from '../components/LandingScene';
import GiftScene from '../components/GiftScene';
import GardenScene from '../components/GardenScene';
import LetterScene from '../components/LetterScene';
import PetalRain from '../components/PetalRain';

export type Scene = 'landing' | 'gift' | 'garden' | 'letter';

export default function Home() {
  const [scene, setScene] = useState<Scene>('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (next: Scene) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScene(next);
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Always-on petal rain */}
      <PetalRain />

      {/* Scene container */}
      <div
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        {scene === 'landing' && <LandingScene onNext={() => goTo('gift')} />}
        {scene === 'gift'    && <GiftScene    onNext={() => goTo('garden')} />}
        {scene === 'garden'  && <GardenScene  onNext={() => goTo('letter')} />}
        {scene === 'letter'  && <LetterScene  />}
      </div>
    </main>
  );
}
