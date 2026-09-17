import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, X, Heart, Eye, Baby, Camera } from 'lucide-react';

interface ChildhoodPhoto {
  id: number;
  title: string;
  eraBadge: string;
  location: string;
  image: string;
  caption: string;
  highlight?: boolean;
}

const CHILDHOOD_PHOTOS: ChildhoodPhoto[] = [
  {
    id: 1,
    title: "The Sweetest Wonder",
    eraBadge: "ANGEL YEARS",
    location: "Home Sweet Home",
    image: "/childhood/photo3.png",
    caption: "Those deep, soulful eyes holding an entire universe of innocence and wonder. Pure, gentle, and blessed from day one.",
  },
  {
    id: 2,
    title: "Little Birthday Princess",
    eraBadge: "FAIRYTALE DRESS",
    location: "First Celebrations",
    image: "/childhood/photo1.png",
    caption: "Dressed like a little angel in white ruffles, patiently waiting by her birthday plate. You were always meant to be celebrated, my love.",
  },
  {
    id: 3,
    title: "The Curious Scholar",
    eraBadge: "STORYTIME",
    location: "Staircase Adventures",
    image: "/childhood/photo2.png",
    caption: "Lost in pages and books with that mischievous smile, already cultivating the bright brilliance and gentle wisdom you radiate today.",
  },
  {
    id: 4,
    title: "Winter Warmth & Shy Smiles",
    eraBadge: "COZY MEMORIES",
    location: "Sunlit Balcony",
    image: "/childhood/photo4.png",
    caption: "That shy, darling smile in the red knit beanie. Proof that your warmth could brighten up any cloudy afternoon since the very beginning.",
  },
  {
    id: 5,
    title: "The Classical Dancing Queen",
    eraBadge: "FESTIVE GLORY",
    location: "Celebration Stage",
    image: "/childhood/photo5.png",
    caption: "Adorned in vibrant yellow and red with fresh floral garlands, striking a dancer's pose with poise, beauty, and unforgettable charm.",
    highlight: true,
  },
];

// Interactive 3D Tilt Card Component
const TiltCard: React.FC<{ photo: ChildhoodPhoto; onOpen: (photo: ChildhoodPhoto) => void; index: number }> = ({
  photo,
  onOpen,
  index,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -9; // tilt max 9 deg
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className={`perspective-1000 ${photo.highlight ? 'sm:col-span-2 lg:col-span-1' : ''}`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(photo)}
        animate={{
          rotateX,
          rotateY,
          scale: rotateX !== 0 || rotateY !== 0 ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="group relative cursor-pointer rounded-3xl overflow-hidden glass-card border-2 border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Photo Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-rose-100/60">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Era Badge */}
          <div className="absolute top-3.5 right-3.5 z-10 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/70 text-[11px] font-bold text-burgundy shadow-sm flex items-center gap-1">
            <Camera size={12} className="text-rose-500" />
            <span>{photo.eraBadge}</span>
          </div>

          {/* Hover Overlay with Romantic Caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
            <div className="flex items-center gap-1.5 text-xs text-rose-200 mb-1 font-medium">
              <MapPin size={13} />
              <span>{photo.location}</span>
            </div>
            <h4 className="font-serif text-xl font-bold drop-shadow">
              {photo.title}
            </h4>
            <p className="text-xs text-rose-100 line-clamp-3 mt-1.5 font-light leading-relaxed">
              {photo.caption}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-rose-200">
              <Eye size={14} />
              <span>Click to view memory</span>
            </div>
          </div>
        </div>

        {/* Card Bottom Meta */}
        <div className="p-4 sm:p-5 flex items-center justify-between bg-white/90">
          <div>
            <h4 className="font-serif text-base font-bold text-burgundy group-hover:text-rose-600 transition-colors">
              {photo.title}
            </h4>
            <p className="text-xs text-burgundy/60 flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-rose-400" />
              <span>{photo.location}</span>
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors shadow-sm">
            <Heart size={14} fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const MomentsGallery: React.FC = () => {
  const [activeModalPhoto, setActiveModalPhoto] = useState<ChildhoodPhoto | null>(null);

  return (
    <section id="childhood" className="relative py-24 px-4 overflow-hidden">
      {/* Anchor fallback for #moments */}
      <div id="moments" className="absolute -top-10 left-0" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-rose-200 shadow-sm text-xs font-serif uppercase tracking-[0.25em] text-burgundy font-semibold mb-3">
            <Baby size={15} className="text-rose-500" />
            <span>✦ GLIMPSES OF PURE MAGIC ✦</span>
            <Sparkles size={14} className="text-rose-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy">
            Little Nilu&apos;s Childhood Days
          </h2>
          <p className="text-burgundy/70 mt-3 text-sm sm:text-base font-light italic max-w-xl mx-auto leading-relaxed">
            Before the world knew what a masterpiece was being crafted, there was a little girl with dreams as wide as the ocean and a heart full of starlight.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Responsive Grid with 5 Childhood Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {CHILDHOOD_PHOTOS.map((photo, index) => (
            <TiltCard
              key={photo.id}
              photo={photo}
              index={index}
              onOpen={(p) => setActiveModalPhoto(p)}
            />
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {activeModalPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalPhoto(null)}
              className="absolute inset-0 bg-burgundy-deep/65 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border-2 border-rose-200/90 max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalPhoto(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              {/* Large Image */}
              <div className="relative max-h-[52vh] w-full overflow-hidden bg-rose-50 flex items-center justify-center">
                <img
                  src={activeModalPhoto.image}
                  alt={activeModalPhoto.title}
                  className="w-full h-full object-contain max-h-[52vh]"
                />

                {/* Era Badge */}
                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-xs font-bold text-burgundy shadow flex items-center gap-1.5">
                  <Calendar size={13} className="text-rose-500" />
                  <span>{activeModalPhoto.eraBadge}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-8 bg-white overflow-y-auto">
                <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold tracking-wide uppercase mb-1">
                  <MapPin size={14} />
                  <span>{activeModalPhoto.location}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy mb-3">
                  {activeModalPhoto.title}
                </h3>

                <p className="text-burgundy/85 text-sm sm:text-base leading-relaxed font-light bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
                  &ldquo;{activeModalPhoto.caption}&rdquo;
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-burgundy/60 border-t border-rose-100 pt-4">
                  <span className="font-script text-xl text-rose-600 font-bold">
                    Forever Little Nilu 🌸
                  </span>
                  <div className="flex items-center gap-1.5 text-rose-500">
                    <Heart size={14} fill="currentColor" />
                    <span className="font-serif tracking-widest uppercase">Priceless Treasure</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
