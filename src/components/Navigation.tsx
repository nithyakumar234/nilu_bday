import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'HOME', href: '#home' },
  { name: 'LETTER', href: '#letter' },
  { name: 'CHILDHOOD', href: '#childhood' },
  { name: 'WHY YOU', href: '#why-you' },
  { name: 'CELEBRATE', href: '#celebrate' },
];

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionElements = NAV_ITEMS.map((item) => ({
        id: item.href.replace('#', ''),
        element: document.getElementById(item.href.replace('#', '')),
      }));

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.element && item.element.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-300 ${
          scrolled
            ? 'bg-white/75 border-white/80 shadow-rose-900/10'
            : 'bg-white/45 border-white/60 shadow-pink-500/5'
        }`}
      >
        {/* Decorative Mini Heart Icon */}
        <span className="text-rose-500 mr-1 hidden sm:inline-block animate-pulse">
          <Heart size={15} fill="currentColor" />
        </span>

        {/* Links */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-200 rounded-full ${
                  isActive
                    ? 'text-burgundy font-bold'
                    : 'text-burgundy/70 hover:text-burgundy'
                }`}
              >
                {item.name}

                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-pink-100/70 border border-pink-200/60 rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Subtle Hover underline */}
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-rose-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </a>
            );
          })}
        </div>

        <span className="text-pink-400 ml-1 hidden sm:inline-block">
          <Sparkles size={14} />
        </span>
      </motion.nav>
    </header>
  );
};
