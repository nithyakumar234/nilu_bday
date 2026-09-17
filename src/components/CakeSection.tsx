import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw } from 'lucide-react';

export const CakeSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    setCandlesLit(false);
    setWishMade(true);

    // Multi-stage confetti cannon explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#FBBF24', '#A855F7', '#38BDF8', '#FFFFFF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section id="celebrate" className="relative py-24 px-4 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-rose-200 shadow-sm text-xs font-serif uppercase tracking-[0.25em] text-burgundy font-semibold mb-3">
          <Sparkles size={14} className="text-rose-500" />
          <span>✦ MAKE A SACRED WISH ✦</span>
          <Sparkles size={14} className="text-rose-500" />
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-burgundy mb-3">
          Blow Out The Candles, Nilu!
        </h2>
        <p className="text-burgundy/80 text-sm sm:text-base font-light italic max-w-md mx-auto mb-12">
          Close your eyes, make the deepest wish of your heart, and blow out the birthday candles...
        </p>

        {/* Cake Container */}
        <div className="relative max-w-sm sm:max-w-md mx-auto my-6 flex flex-col items-center">
          {/* SVG Multi-Tier Birthday Cake */}
          <div className="relative w-72 sm:w-80 h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 300 320"
              className="w-full h-full drop-shadow-2xl overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cake Plate Stand */}
              <ellipse cx="150" cy="300" rx="130" ry="16" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
              <path d="M70 300 L95 315 L205 315 L230 300 Z" fill="#FBCFE8" />

              {/* Bottom Tier */}
              <rect x="55" y="220" width="190" height="75" rx="14" fill="url(#bottom-tier-grad)" />
              {/* Bottom Tier Frosting Swags */}
              <path
                d="M55 235 Q75 250 95 235 Q115 250 135 235 Q155 250 175 235 Q195 250 215 235 Q235 250 245 235"
                stroke="#FFF"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Pearl Decor */}
              <circle cx="95" cy="265" r="4" fill="#FFF" />
              <circle cx="125" cy="265" r="4" fill="#FFF" />
              <circle cx="155" cy="265" r="4" fill="#FFF" />
              <circle cx="185" cy="265" r="4" fill="#FFF" />
              <circle cx="215" cy="265" r="4" fill="#FFF" />

              {/* Middle Tier */}
              <rect x="85" y="160" width="130" height="65" rx="12" fill="url(#mid-tier-grad)" />
              {/* Middle Tier Drips */}
              <path
                d="M85 170 Q100 185 115 170 Q130 185 150 170 Q170 185 185 170 Q200 185 215 170"
                stroke="#FFF"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="115" cy="195" r="3.5" fill="#FFE4E6" />
              <circle cx="150" cy="195" r="3.5" fill="#FFE4E6" />
              <circle cx="185" cy="195" r="3.5" fill="#FFE4E6" />

              {/* Top Tier */}
              <rect x="110" y="110" width="80" height="52" rx="10" fill="url(#top-tier-grad)" />
              <path
                d="M110 118 Q125 128 140 118 Q160 128 175 118 Q185 125 190 118"
                stroke="#FFF"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Strawberries on Top */}
              <circle cx="125" cy="106" r="6" fill="#E11D48" />
              <circle cx="150" cy="104" r="7" fill="#E11D48" />
              <circle cx="175" cy="106" r="6" fill="#E11D48" />

              {/* Three Birthday Candles */}
              {/* Candle 1 (Left) */}
              <rect x="123" y="65" width="6" height="35" rx="2" fill="url(#candle-grad)" />
              <line x1="126" y1="65" x2="126" y2="58" stroke="#713F12" strokeWidth="1.5" />

              {/* Candle 2 (Center) */}
              <rect x="147" y="55" width="6" height="45" rx="2" fill="url(#candle-grad)" />
              <line x1="150" y1="55" x2="150" y2="48" stroke="#713F12" strokeWidth="1.5" />

              {/* Candle 3 (Right) */}
              <rect x="171" y="65" width="6" height="35" rx="2" fill="url(#candle-grad)" />
              <line x1="174" y1="65" x2="174" y2="58" stroke="#713F12" strokeWidth="1.5" />

              {/* Gradients */}
              <defs>
                <linearGradient id="bottom-tier-grad" x1="55" y1="220" x2="245" y2="295" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F472B6" />
                  <stop offset="1" stopColor="#E11D48" />
                </linearGradient>
                <linearGradient id="mid-tier-grad" x1="85" y1="160" x2="215" y2="225" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FB7185" />
                  <stop offset="1" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="top-tier-grad" x1="110" y1="110" x2="190" y2="162" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDA4AF" />
                  <stop offset="1" stopColor="#FB7185" />
                </linearGradient>
                <linearGradient id="candle-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#FEF08A" />
                  <stop offset="1" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Candle Flames (HTML/Framer Motion overlays positioned over wicks) */}
            <AnimatePresence>
              {candlesLit ? (
                <>
                  {/* Left Flame */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.15, 0.95, 1.1] }}
                    exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.3 } }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-[48px] left-[118px] sm:left-[147px] pointer-events-none"
                  >
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#F59E0B] animate-flame" />
                  </motion.div>

                  {/* Center Flame */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1.1, 0.95, 1.2, 1] }}
                    exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.3 } }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.1,
                    }}
                    className="absolute top-[38px] left-[142px] sm:left-[171px] pointer-events-none"
                  >
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_20px_#F59E0B] animate-flame" />
                  </motion.div>

                  {/* Right Flame */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0.95, 1.15, 1, 1.05] }}
                    exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.3 } }}
                    transition={{
                      duration: 0.75,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                    className="absolute top-[48px] left-[166px] sm:left-[195px] pointer-events-none"
                  >
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#F59E0B] animate-flame" />
                  </motion.div>
                </>
              ) : (
                /* Puff of smoke when extinguished */
                <motion.div
                  initial={{ opacity: 0.9, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -30, scale: 1.5 }}
                  transition={{ duration: 1.2 }}
                  className="absolute top-[30px] flex items-center gap-4 pointer-events-none text-stone-400 text-xs font-serif"
                >
                  <span>💨</span>
                  <span>✨</span>
                  <span>💨</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <motion.button
            onClick={handleBlowCandles}
            whileHover={{ scale: candlesLit ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase shadow-2xl transition-all duration-500 flex items-center gap-3 ${
              wishMade
                ? 'bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 text-white shadow-rose-400/50'
                : 'bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white shadow-rose-500/40 animate-pulse-glow'
            }`}
          >
            <AnimatePresence mode="wait">
              {wishMade ? (
                <motion.div
                  key="wish-made"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles size={20} className="animate-spin-slow text-yellow-200" />
                  <span>✨ WISH MADE! THE MAGIC IS REAL ✨</span>
                  <Sparkles size={20} className="animate-spin-slow text-yellow-200" />
                </motion.div>
              ) : (
                <motion.div
                  key="blow-candles"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <span>🎂 BLOW OUT THE CANDLES!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Relight button if candles are blown out */}
          {wishMade && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleRelight}
              className="inline-flex items-center gap-2 text-xs font-semibold text-burgundy/70 hover:text-burgundy bg-white/60 px-4 py-2 rounded-full border border-rose-200 shadow-sm hover:bg-white transition-all"
            >
              <RotateCcw size={13} />
              <span>Relight Candles 🕯️</span>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};
