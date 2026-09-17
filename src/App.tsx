import React from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { CursorSparkles } from './components/CursorSparkles';
import { AudioPlayer } from './components/AudioPlayer';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { MomentsGallery } from './components/MomentsGallery';
import { FloatingAvatars } from './components/FloatingAvatars';
import { MarqueeSection } from './components/MarqueeSection';
import { WhyYouSection } from './components/WhyYouSection';
import { CounterSection } from './components/CounterSection';
import { CakeSection } from './components/CakeSection';
import { GrandFinaleSection } from './components/GrandFinaleSection';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen text-burgundy selection:bg-pink-300 selection:text-burgundy-dark">
      {/* Continuous Ambient Background FX: Falling Petals, Bows, Glowing Blobs */}
      <AmbientBackground />

      {/* Trailing Cursor Sparkles */}
      <CursorSparkles />

      {/* Floating Audio Disc Player (Bottom-Right) */}
      <AudioPlayer />

      {/* Sticky Pill Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section (#HOME) */}
        <HeroSection />

        {/* 2. Love Letter Section (#LETTER) */}
        <LoveLetterSection />

        {/* 3. Photo Gallery (#MOMENTS) */}
        <MomentsGallery />

        {/* 4. Floating Avatars ("Our Sweet Moments") */}
        <FloatingAvatars />

        {/* 5. 3D Typography & Marquee Ribbon */}
        <MarqueeSection />

        {/* 6. Why You Are Extraordinary (#WHY YOU) */}
        <WhyYouSection />

        {/* 7. Counter Section ("Love, Measured") */}
        <CounterSection />

        {/* 8. Interactive Birthday Cake (#CELEBRATE) */}
        <CakeSection />

        {/* 9. Grand Finale & Footer */}
        <GrandFinaleSection />
      </main>
    </div>
  );
};

export default App;
