import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Palette, Zap, Flower2 } from 'lucide-react';

interface FeatureCard {
  title: string;
  emoji: string;
  icon: React.ReactNode;
  quote: string;
  gradient: string;
}

const CARDS: FeatureCard[] = [
  {
    title: "Your Spirit",
    emoji: "🌸",
    icon: <Flower2 size={24} className="text-pink-500" />,
    quote: "Even on the hardest days your spirit never loses bloom. You bring light into dark corners and remind everyone around you of the goodness in the world.",
    gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
  },
  {
    title: "Your Creativity",
    emoji: "🎨",
    icon: <Palette size={24} className="text-purple-500" />,
    quote: "You see beauty where others see ordinary. Your perspective turns everyday moments into vibrant poetry and cherished works of art.",
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    title: "Your Love",
    emoji: "❤️",
    icon: <Heart size={24} className="text-rose-500" fill="currentColor" />,
    quote: "Your affection is an endless sanctuary. The gentle way you care, listen, and hold space for those you treasure is rare, precious, and unforgettable.",
    gradient: "from-rose-500/10 via-red-500/5 to-transparent",
  },
  {
    title: "Your Strength",
    emoji: "⚡",
    icon: <Zap size={24} className="text-amber-500" />,
    quote: "Quiet, graceful, and deeply unshakeable. You conquer obstacles with such dignity and courage, inspiring me more than you will ever know.",
    gradient: "from-amber-500/10 via-rose-500/5 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 22,
    },
  },
};

export const WhyYouSection: React.FC = () => {
  return (
    <section id="why-you" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-rose-200 shadow-sm text-xs font-serif uppercase tracking-[0.25em] text-burgundy font-semibold mb-3">
            <Sparkles size={14} className="text-rose-500" />
            <span>✦ WHAT MAKES YOU SO SPECIAL ✦</span>
            <Sparkles size={14} className="text-rose-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy">
            Why You Are Extraordinary
          </h2>
          <p className="text-burgundy/70 mt-2 text-sm sm:text-base font-light italic max-w-lg mx-auto">
            Just a few of the million reasons why Nilu is celebrated today and every day.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Feature Cards Grid with Framer Motion stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-8 rounded-3xl glass-card border border-white/80 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Soft Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
              />

              {/* Decorative Glow Orb */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-200/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

              <div className="relative z-10">
                {/* Header Icon + Emoji */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center border border-rose-100 group-hover:rotate-6 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-3xl filter drop-shadow-sm group-hover:scale-125 transition-transform">
                    {card.emoji}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-2xl font-bold text-burgundy mb-3 group-hover:text-rose-600 transition-colors flex items-center gap-2">
                  <span>{card.title}</span>
                  <span className="text-lg">{card.emoji}</span>
                </h3>

                {/* Card Quote */}
                <p className="text-burgundy/85 text-sm sm:text-base leading-relaxed font-light">
                  &ldquo;{card.quote}&rdquo;
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
