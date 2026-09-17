import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, X, Flower2, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

export const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSurprise = () => {
    setIsModalOpen(true);
    // Sweet celebratory burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#FDA4AF', '#F472B6', '#FBBF24', '#FFFFFF'],
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto flex flex-col items-center relative z-10"
      >
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-rose-200/80 shadow-sm mb-6 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-rose-500 animate-spin-slow" />
          <span className="font-serif text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-burgundy font-semibold">
            ✦ TODAY IS A VERY SPECIAL DAY ✦
          </span>
          <Sparkles size={14} className="text-rose-500 animate-spin-slow" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-burgundy text-glow leading-none mb-3"
        >
          Happy Birthday
        </motion.h1>

        {/* Sub-title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-2 text-2xl sm:text-4xl md:text-5xl font-script text-rose-600 font-bold mb-6 mt-1"
        >
          <span>Nilu Cutie</span>
          <span className="inline-block animate-bounce text-3xl sm:text-4xl">🌸</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="text-base sm:text-xl text-burgundy/80 font-light italic max-w-xl mx-auto leading-relaxed mb-10"
        >
          &ldquo;You light up every room you enter, bringing warmth, elegance, and pure magic wherever you go.&rdquo;
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wider uppercase shadow-xl animate-pulse-glow flex items-center gap-3 overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            <Gift size={20} className="animate-bounce group-hover:rotate-12 transition-transform" />
            <span className="relative z-10 font-bold tracking-widest drop-shadow-sm">
              OPEN YOUR SURPRISE 🎁
            </span>
          </motion.button>
        </motion.div>

        {/* Floating Mini Decorative Accents */}
        <div className="flex items-center justify-center gap-6 mt-12 text-rose-400">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-serif text-burgundy/60"
          >
            <Heart size={14} className="text-rose-500" fill="currentColor" />
            <span>Made with all my heart</span>
            <Heart size={14} className="text-rose-500" fill="currentColor" />
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with heavy blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-burgundy-deep/40 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border-2 border-rose-200/80 shadow-2xl text-center z-10 overflow-hidden"
            >
              {/* Subtle floral top corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-100 to-transparent rounded-bl-full pointer-events-none -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-100 to-transparent rounded-tr-full pointer-events-none -z-10" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-burgundy/60 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Gift Icon Badge */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 mb-4 transform -rotate-3">
                <Gift size={32} />
              </div>

              {/* Header */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 mb-2">
                <Stars size={14} className="text-rose-500" />
                <span className="text-xs font-serif uppercase tracking-widest text-burgundy font-semibold">
                  A Secret Message...
                </span>
                <Stars size={14} className="text-rose-500" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-burgundy font-bold mb-4">
                To My Dear Cutie,
              </h3>

              {/* Romantic Letter Body */}
              <div className="text-burgundy/85 text-sm sm:text-base leading-relaxed space-y-3 font-normal text-left px-2 sm:px-4 bg-rose-50/50 rounded-2xl p-4 border border-rose-100/60 max-h-60 overflow-y-auto">
                <p>
                  Today isn&apos;t just another calendar date; it&apos;s the celebration of my favorite human being in the universe.
                </p>
                <p>
                  Your laugh is my favorite melody, your smile is my brightest sunrise, and the warmth you carry touches every corner of my life.
                </p>
                <p>
                  I built this little digital sanctuary for you, hoping to bring even half the sparkle to your eyes that you effortlessly bring into my life every single day.
                </p>
                <p className="font-script text-xl text-rose-600 font-bold text-right pt-2">
                  Forever & always yours ❤️
                </p>
              </div>

              {/* Flower and Heart Footer Icons */}
              <div className="mt-6 flex items-center justify-center gap-4 text-rose-400 border-t border-rose-100 pt-4">
                <Flower2 size={20} className="text-pink-400 animate-spin-slow" />
                <Heart size={20} className="text-rose-500" fill="currentColor" />
                <span className="font-serif text-xs uppercase tracking-widest text-burgundy/70">
                  Happy Birthday Nilu
                </span>
                <Heart size={20} className="text-rose-500" fill="currentColor" />
                <Flower2 size={20} className="text-pink-400 animate-spin-slow" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
