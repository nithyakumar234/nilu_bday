import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather } from 'lucide-react';

// Decorative Bow SVG
const DecorativeCornerBow: React.FC<{ className?: string; rotate?: string }> = ({ className = '', rotate = '0deg' }) => (
  <svg
    width="44"
    height="36"
    viewBox="0 0 50 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotate})` }}
    className={`drop-shadow-md ${className}`}
  >
    <path d="M25 20 C18 10 5 12 5 22 C5 29 18 25 25 20 Z" fill="url(#letter-bow-grad)" />
    <path d="M25 20 C32 10 45 12 45 22 C45 29 32 25 25 20 Z" fill="url(#letter-bow-grad)" />
    <circle cx="25" cy="20" r="4.5" fill="#9F1239" />
    <path d="M23 23 C18 29 14 36 11 38 C14 35 18 32 23 25 Z" fill="#9F1239" />
    <path d="M27 23 C32 29 36 36 39 38 C36 35 32 32 27 25 Z" fill="#9F1239" />
    <defs>
      <linearGradient id="letter-bow-grad" x1="5" y1="12" x2="45" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.6" stopColor="#E11D48" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
    </defs>
  </svg>
);

const letterParagraphs = [
  "On this extraordinary day that the universe chose to bring you into the world, I find myself completely overwhelmed by the beauty of your existence. Looking at you, I am constantly reminded how wonderfully sweet and gentle life can be.",
  "You carry constellations in your laughter. You paint sunrises with your smile. Every conversation with you feels like coming home to a place filled with unconditional warmth, gentle understanding, and everlasting peace.",
  "This birthday is not just another year on the calendar. It is a new chapter in which your dreams will take flight, your light will shine even brighter, and the world will witness all the magic that is Nilu.",
  "You deserve every flower, every star, every beautiful thing this world has to offer. May this year shower you with boundless joy, heartfelt peace, unforgettable memories, and dreams fulfilled.",
];

export const LoveLetterSection: React.FC = () => {
  return (
    <section id="letter" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-rose-200 text-xs font-serif uppercase tracking-widest text-burgundy/80 mb-3 shadow-sm">
            <Feather size={14} className="text-rose-500" />
            <span>Words Straight From My Heart</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy">
            A Letter To Nilu
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Ivory Envelope / Parchment Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-rose-100/90 overflow-hidden"
          style={{
            boxShadow: '0 25px 60px -15px rgba(122, 28, 48, 0.15), 0 0 0 1px rgba(253, 164, 175, 0.2)',
          }}
        >
          {/* Decorative Floating Bows on Corners */}
          <div className="absolute -top-3 -left-3 z-20">
            <DecorativeCornerBow rotate="-25deg" />
          </div>
          <div className="absolute -top-3 -right-3 z-20">
            <DecorativeCornerBow rotate="25deg" />
          </div>
          <div className="absolute -bottom-3 -left-3 z-20">
            <DecorativeCornerBow rotate="-65deg" />
          </div>
          <div className="absolute -bottom-3 -right-3 z-20">
            <DecorativeCornerBow rotate="65deg" />
          </div>

          {/* Parchment Inner Border Frame */}
          <div className="absolute inset-4 sm:inset-6 border border-rose-200/50 rounded-2xl pointer-events-none" />

          {/* Wax Seal / Heart Stamp in Top Corner */}
          <div className="flex items-center justify-between border-b border-rose-100 pb-5 mb-8">
            <div className="flex items-center gap-2 text-rose-500">
              <Sparkles size={16} />
              <span className="font-serif text-xs sm:text-sm tracking-widest uppercase text-burgundy/70">
                A Letter
              </span>
            </div>
            
            {/* Wax Seal badge */}
            <div className="flex items-center gap-2 bg-gradient-to-br from-rose-600 to-burgundy text-white px-3.5 py-1.5 rounded-full shadow-md text-xs font-serif tracking-wider">
              <Heart size={12} fill="currentColor" />
              <span>FOR MY CUTIE</span>
            </div>
          </div>

          {/* Salutation */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-xl sm:text-2xl font-bold text-burgundy mb-6 italic"
          >
            Dear Cutie,
          </motion.div>

          {/* Staggered Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-burgundy/85 leading-relaxed font-light">
            {letterParagraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-3 border-l-2 border-rose-200/70 hover:border-rose-400 transition-colors"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-burgundy/60 font-serif">
                With all my adoration,
              </p>
              <p className="font-script text-3xl sm:text-4xl text-rose-600 font-bold mt-1">
                Forever
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-rose-400">
              <Heart size={16} className="text-rose-500 animate-pulse" fill="currentColor" />
              <Heart size={20} className="text-rose-500 animate-bounce" fill="currentColor" />
              <Heart size={16} className="text-rose-500 animate-pulse" fill="currentColor" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
