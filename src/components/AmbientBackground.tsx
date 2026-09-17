import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// SVG Petal component
const PetalSVG: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 2C12 10 6 22 14 34C22 36 34 30 36 18C38 6 26 2 20 2Z"
      fill="url(#petal-grad)"
      opacity="0.85"
    />
    <defs>
      <linearGradient id="petal-grad" x1="10" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FECDD3" />
        <stop offset="0.6" stopColor="#FDA4AF" />
        <stop offset="1" stopColor="#F43F5E" stopOpacity="0.8" />
      </linearGradient>
    </defs>
  </svg>
);

// SVG Bow Ribbon component
const BowSVG: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left Loop */}
    <path
      d="M25 20 C18 10 5 12 5 22 C5 29 18 25 25 20 Z"
      fill="url(#bow-grad)"
    />
    {/* Right Loop */}
    <path
      d="M25 20 C32 10 45 12 45 22 C45 29 32 25 25 20 Z"
      fill="url(#bow-grad)"
    />
    {/* Knot */}
    <circle cx="25" cy="20" r="4.5" fill="#BE123C" />
    {/* Tails */}
    <path
      d="M23 23 C18 29 14 36 11 38 C14 35 18 32 23 25 Z"
      fill="#BE123C"
      opacity="0.9"
    />
    <path
      d="M27 23 C32 29 36 36 39 38 C36 35 32 32 27 25 Z"
      fill="#BE123C"
      opacity="0.9"
    />
    <defs>
      <linearGradient id="bow-grad" x1="5" y1="12" x2="45" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.5" stopColor="#E11D48" />
        <stop offset="1" stopColor="#9F1239" />
      </linearGradient>
    </defs>
  </svg>
);

interface Particle {
  id: number;
  type: 'petal' | 'bow';
  xStart: number; // percentage (0 - 100)
  xSway: number; // horizontal sway px
  duration: number; // seconds
  delay: number;
  size: number;
  rotationSpeed: number;
}

export const AmbientBackground: React.FC = () => {
  // Generate random floating particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      type: i % 3 === 0 ? 'bow' : 'petal',
      xStart: Math.random() * 100,
      xSway: 30 + Math.random() * 60,
      duration: 12 + Math.random() * 14,
      delay: Math.random() * 10,
      size: i % 3 === 0 ? 24 + Math.random() * 12 : 20 + Math.random() * 16,
      rotationSpeed: (Math.random() - 0.5) * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Romantic Ambient Lighting Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-pink-200/35 rounded-full blur-3xl" />
      <div className="absolute top-2/3 left-1/4 w-[28rem] h-[28rem] bg-rose-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-red-100/40 rounded-full blur-3xl" />

      {/* Floating Petals and Bows Animation */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.xStart}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, p.xSway, -p.xSway, 0],
            rotate: [0, p.rotationSpeed, p.rotationSpeed * 2],
            rotateY: [0, 180, 360],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
            x: {
              duration: p.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotateY: {
              duration: p.duration / 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {p.type === 'petal' ? (
            <PetalSVG size={p.size} className="drop-shadow-sm filter" />
          ) : (
            <BowSVG size={p.size} className="drop-shadow-sm filter" />
          )}
        </motion.div>
      ))}
    </div>
  );
};
