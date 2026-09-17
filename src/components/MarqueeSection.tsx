import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const MARQUEE_ITEMS = [
  "Radiant",
  "Forever Loved",
  "Beautiful Soul",
  "Light Of My Life",
  "Beautiful",
  "My Queen Nilu",
  "Endless Joy",
  "My Heart's Home",
];

export const MarqueeSection: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* 3D Typography Header */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 text-rose-500 mb-3">
            <Sparkles size={16} />
            <span className="font-serif text-xs uppercase tracking-[0.3em] font-semibold text-burgundy">
              A Birthday Celebration Of You
            </span>
            <Sparkles size={16} />
          </div>

          {/* 3D Pop Header */}
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white text-3d-romantic tracking-wide mb-6 uppercase">
            Happy Birthday, My Cutie
          </h2>

          {/* Text Stream: Soft romantic paragraphs */}
          <div className="max-w-2xl mx-auto space-y-4 text-burgundy/85 text-base sm:text-lg font-light leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every second spent knowing you feels like reading the most enchanting story ever penned.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-script text-2xl sm:text-3xl text-rose-600 font-bold"
            >
              You make my world soft, beautiful, and endlessly magical.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee Ribbon */}
      <div
        className="relative w-full overflow-hidden bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 py-4 shadow-xl -rotate-1 hover:rotate-0 transition-transform duration-500 cursor-pointer"
        onMouseEnter={() => setIsReversed(true)}
        onMouseLeave={() => setIsReversed(false)}
        title="Hover to reverse scroll direction"
      >
        <div className="flex select-none whitespace-nowrap">
          <motion.div
            className="flex items-center gap-8 shrink-0"
            animate={{
              x: isReversed ? ['-50%', '0%'] : ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 22,
                ease: 'linear',
              },
            }}
          >
            {/* Duplicated for seamless infinite loop */}
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-white uppercase drop-shadow-sm">
                  {item}
                </span>
                <Heart size={18} className="text-pink-200" fill="currentColor" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
