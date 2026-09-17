import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crown, Stars } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
}

export const GrandFinaleSection: React.FC = () => {
  const [isPlayingFinale, setIsPlayingFinale] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const launchGrandFinale = () => {
    setIsPlayingFinale(true);

    // Spawn floating heart explosion
    const newHearts: FloatingHeart[] = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 26) + 16,
      duration: Math.random() * 3 + 3,
    }));
    setFloatingHearts(newHearts);

    // Continuous fireworks burst using canvas-confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: number = window.setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsPlayingFinale(false);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fireworks from left and right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#FBBF24', '#F472B6', '#FFFFFF'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#FBBF24', '#F472B6', '#FFFFFF'],
      });
    }, 250);
  };

  return (
    <div className="relative pt-12 overflow-hidden">
      {/* Ticker Ribbon: Burgundy bar with infinite scrolling text */}
      <div className="w-full bg-burgundy-deep text-white py-3.5 shadow-xl overflow-hidden select-none border-y border-rose-900/40">
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex items-center gap-8 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-8 text-sm sm:text-base font-serif tracking-[0.2em] uppercase">
                <span className="text-pink-300">✦</span>
                <span className="font-semibold text-rose-100">
                  My Heart Is Yours Now & Always...
                </span>
                <span className="text-rose-400 font-script normal-case text-xl tracking-normal">
                  Happy Birthday Nilu
                </span>
                <Heart size={15} className="text-rose-400" fill="currentColor" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating viewport hearts when finale triggered */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '100vh', opacity: 1, scale: 0.8 }}
            animate={{ y: '-20vh', opacity: 0, scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: 'easeOut' }}
            style={{ left: `${heart.left}%` }}
            className="fixed bottom-0 z-50 pointer-events-none text-rose-500 filter drop-shadow-md"
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Grand Finale Section Content */}
      <div className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-14 rounded-3xl glass-card border-2 border-rose-200/90 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Glowing Orbs */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl" />

          {/* Crown Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg mb-6 transform -rotate-6">
            <Crown size={30} />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-serif uppercase tracking-[0.25em] text-burgundy font-semibold mb-3">
            <Stars size={15} className="text-amber-500" />
            <span>To The One Who Holds My Heart</span>
            <Stars size={15} className="text-amber-500" />
          </div>

          {/* Hero Card Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-burgundy mb-6 leading-tight">
            You Are My Favourite Gift <br className="hidden sm:inline" />
            from the Universe
          </h2>

          <p className="text-burgundy/85 text-base sm:text-xl font-light italic max-w-xl mx-auto mb-10 leading-relaxed">
            &ldquo;There is no constellation in the night sky as radiant as you, Nilu.
            May this special year bring you boundless happiness, peace, and endless love.&rdquo;
          </p>

          {/* Finale Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={launchGrandFinale}
              disabled={isPlayingFinale}
              whileHover={{ scale: isPlayingFinale ? 1 : 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`px-10 sm:px-14 py-5 rounded-full font-serif font-bold text-sm sm:text-lg tracking-widest uppercase shadow-2xl transition-all duration-300 flex items-center gap-3 ${
                isPlayingFinale
                  ? 'bg-gradient-to-r from-amber-500 via-pink-500 to-rose-600 text-white shadow-amber-500/40 animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 via-rose-500 to-rose-700 text-white shadow-rose-500/40 animate-pulse-glow hover:shadow-rose-600/50'
              }`}
            >
              <Sparkles size={22} className="animate-spin-slow text-yellow-200" />
              <span>{isPlayingFinale ? '✨ CELEBRATING NILU! ✨' : '✦ LAUNCH GRAND FINALE! ✦'}</span>
              <Sparkles size={22} className="animate-spin-slow text-yellow-200" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Romantic Footer */}
      <footer className="w-full py-10 text-center border-t border-rose-200/60 bg-white/40 backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 text-rose-500 mb-2">
          <Heart size={16} fill="currentColor" className="animate-pulse" />
          <span className="font-script text-2xl text-rose-600 font-bold">
            Happy Birthday, Nilu
          </span>
          <Heart size={16} fill="currentColor" className="animate-pulse" />
        </div>
        <p className="text-xs text-burgundy/60 tracking-wider uppercase font-serif">
          Forever & Always · Crafted With All My Heart
        </p>
      </footer>
    </div>
  );
};
