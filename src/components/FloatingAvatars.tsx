import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, MessageCircleHeart } from 'lucide-react';

interface AvatarBubble {
  id: number;
  name: string;
  avatar: string;
  secretMessage: string;
  duration: number;
  delay: number;
  yOffset: number;
}

const AVATARS: AvatarBubble[] = [
  {
    id: 1,
    name: "Her Smile",
    avatar: "/childhood/photo3.png",
    secretMessage: "Your smile has been the easiest thing in the world to fall in love with, since day one.",
    duration: 5.5,
    delay: 0,
    yOffset: -18,
  },
  {
    id: 2,
    name: "Baby Nilu",
    avatar: "/childhood/photo1.png",
    secretMessage: "The sweetest little soul who grew up to be the most wonderful person I know.",
    duration: 6.2,
    delay: 1.2,
    yOffset: -24,
  },
  {
    id: 3,
    name: "Curious Mind",
    avatar: "/childhood/photo2.png",
    secretMessage: "Even as a child reading on the stairs, your curiosity and bright heart shone through.",
    duration: 4.8,
    delay: 0.5,
    yOffset: -16,
  },
  {
    id: 4,
    name: "Cozy Winter",
    avatar: "/childhood/photo4.png",
    secretMessage: "That shy, beautiful smile in your red beanie that could warm anyone's world.",
    duration: 5.9,
    delay: 1.8,
    yOffset: -22,
  },
  {
    id: 5,
    name: "Dance Queen",
    avatar: "/childhood/photo5.png",
    secretMessage: "Born with grace, elegance, and a spirit full of joy and color.",
    duration: 6.5,
    delay: 0.8,
    yOffset: -20,
  },
];

export const FloatingAvatars: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-rose-200 text-xs font-serif uppercase tracking-widest text-burgundy mb-3 shadow-sm">
          <MessageCircleHeart size={14} className="text-rose-500" />
          <span>Interactive Memories</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy mb-3">
          Our Sweet Moments
        </h3>
        <p className="text-burgundy/70 text-sm sm:text-base font-light italic mb-14 max-w-md mx-auto">
          Hover over each sweet bubble to unlock a whispered secret message...
        </p>

        {/* Dynamic Floating Bubble Zone */}
        <div className="relative min-h-[300px] flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6">
          {AVATARS.map((bubble) => {
            const isHovered = hoveredId === bubble.id;

            return (
              <div
                key={bubble.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredId(bubble.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setHoveredId(isHovered ? null : bubble.id)}
              >
                {/* Floating Avatar Circle */}
                <motion.div
                  animate={
                    isHovered
                      ? { y: 0, scale: 1.15 }
                      : {
                          y: [0, bubble.yOffset, 0],
                          scale: 1,
                        }
                  }
                  transition={
                    isHovered
                      ? { type: 'spring', stiffness: 350, damping: 20 }
                      : {
                          duration: bubble.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: bubble.delay,
                        }
                  }
                  className="relative cursor-pointer p-1.5 rounded-full bg-gradient-to-tr from-pink-400 via-rose-400 to-rose-600 shadow-xl"
                  style={{
                    boxShadow: isHovered
                      ? '0 15px 35px -5px rgba(244, 63, 94, 0.5)'
                      : '0 8px 20px -3px rgba(122, 28, 48, 0.15)',
                  }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white bg-rose-100">
                    <img
                      src={bubble.avatar}
                      alt={bubble.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Little Heart Badge */}
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white text-rose-500 shadow flex items-center justify-center text-xs">
                    <Heart size={12} fill="currentColor" />
                  </span>
                </motion.div>

                {/* Avatar Label */}
                <span className="mt-3 text-xs font-serif tracking-wider uppercase text-burgundy font-semibold">
                  {bubble.name}
                </span>

                {/* Secret Message Floating Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute -top-28 sm:-top-24 left-1/2 transform -translate-x-1/2 w-56 sm:w-64 z-30 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-rose-300 text-center pointer-events-none"
                    >
                      <div className="flex items-center justify-center gap-1 text-rose-500 mb-1">
                        <Sparkles size={12} />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-burgundy/80">
                          Secret Note
                        </span>
                        <Sparkles size={12} />
                      </div>
                      <p className="text-xs text-burgundy/90 font-medium leading-relaxed">
                        &ldquo;{bubble.secretMessage}&rdquo;
                      </p>
                      {/* Tooltip arrow */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-rose-300 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
