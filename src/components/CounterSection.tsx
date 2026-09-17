import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Heart, Infinity as InfinityIcon } from 'lucide-react';

interface CounterStat {
  target: number | 'infinity';
  suffix?: string;
  emoji: string;
  label: string;
  description: string;
}

const STATS: CounterStat[] = [
  {
    target: 328,
    suffix: '+',
    emoji: '🌸',
    label: 'Radiant Smiles',
    description: 'Days and moments of effortless joy you brought into my world.',
  },
  {
    target: 898,
    suffix: '+',
    emoji: '⭐',
    label: 'Cherished Memories',
    description: 'Conversations, laughs, and stargazed secrets we share.',
  },
  {
    target: 'infinity',
    suffix: '',
    emoji: '❤️',
    label: 'Infinite Love',
    description: 'Boundless adoration that only deepens with every sunrise.',
  },
  {
    target: 1,
    suffix: '',
    emoji: '✨',
    label: 'Only One You',
    description: 'The one and only Nilu—completely irreplaceable and magical.',
  },
];

const AnimatedCounterCard: React.FC<{ stat: CounterStat; index: number }> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || stat.target === 'infinity') return;

    const targetNum = stat.target as number;
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // easeOutExpo
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames));
      const currentVal = Math.floor(progress * targetNum);

      if (frame >= totalFrames) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(currentVal);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, stat.target]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative p-6 sm:p-8 rounded-3xl glass-card border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center justify-center group"
    >
      {/* Top Floating Emoji */}
      <span className="text-3xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
        {stat.emoji}
      </span>

      {/* Dynamic Count Number */}
      <div className="font-serif text-4xl sm:text-5xl font-extrabold text-burgundy mb-2 flex items-center justify-center min-h-[56px]">
        {stat.target === 'infinity' ? (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center text-rose-600 text-glow"
          >
            <InfinityIcon size={48} strokeWidth={2.5} />
          </motion.div>
        ) : (
          <span className="text-glow">
            {count}
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <h4 className="font-serif text-base sm:text-lg font-bold text-burgundy group-hover:text-rose-600 transition-colors mb-1">
        {stat.label}
      </h4>

      {/* Description */}
      <p className="text-xs text-burgundy/70 font-light leading-relaxed max-w-xs">
        {stat.description}
      </p>

      {/* Little bottom heart indicator */}
      <div className="mt-4 flex items-center gap-1 text-rose-300 group-hover:text-rose-500 transition-colors">
        <Heart size={12} fill="currentColor" />
      </div>
    </motion.div>
  );
};

export const CounterSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-rose-200 shadow-sm text-xs font-serif uppercase tracking-[0.25em] text-burgundy font-semibold mb-3">
            <Sparkles size={14} className="text-rose-500" />
            <span>✦ BY THE NUMBERS ✦</span>
            <Sparkles size={14} className="text-rose-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy">
            Love, Measured
          </h2>
          <p className="text-burgundy/70 mt-2 text-sm sm:text-base font-light italic max-w-lg mx-auto">
            Quantifying the infinite joy you bring into each and every day.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <AnimatedCounterCard key={idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
