import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([40, 65, 85, 50, 75, 45, 90, 60]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Romantic music chord progression notes (frequencies in Hz)
  // Chords: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 -> C
  const noteSequences = [
    // Cmaj9
    [261.63, 329.63, 392.00, 493.88, 587.33],
    // Am9
    [220.00, 261.63, 329.63, 392.00, 493.88],
    // Fmaj7
    [174.61, 261.63, 329.63, 349.23, 440.00],
    // Gsus4 / G7
    [196.00, 293.66, 392.00, 440.00, 523.25],
  ];

  let currentChordIndex = 0;
  let currentNoteIndex = 0;

  const playChime = (freq: number) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;

    // Dual oscillator for rich music box / electric piano chime
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(freq, ctx.currentTime);
    osc2.frequency.setValueAtTime(freq * 2.001, ctx.currentTime); // shimmering octave harmonic

    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(gainNodeRef.current);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.0);
    osc2.stop(now + 2.0);
  };

  const scheduleNextNote = () => {
    if (!isPlayingRef.current) return;

    const chord = noteSequences[currentChordIndex];
    const freq = chord[currentNoteIndex];
    playChime(freq);

    // Randomize visualizer bars on note hits
    setVisualizerHeights(
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 70) + 25)
    );

    currentNoteIndex++;
    if (currentNoteIndex >= chord.length) {
      currentNoteIndex = 0;
      currentChordIndex = (currentChordIndex + 1) % noteSequences.length;
    }

    timerRef.current = window.setTimeout(scheduleNextNote, 420);
  };

  const startMusic = async () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = masterGain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);
    scheduleNextNote();
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisualizerHeights([15, 20, 15, 25, 18, 15, 22, 16]);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    if (!gainNodeRef.current) return;
    if (isMuted) {
      gainNodeRef.current.gain.value = 0.5;
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.value = 0;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Visualizer & Status pill */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 shadow-lg border border-white/60 bg-white/70 backdrop-blur-md"
      >
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              isPlaying
                ? 'bg-rose-500 animate-ping'
                : 'bg-stone-300'
            }`}
          />
          <span className="text-xs font-semibold uppercase tracking-wider text-burgundy">
            {isPlaying ? 'Playing ♪' : 'Paused'}
          </span>
        </div>

        {/* Dynamic Visualizer Bars */}
        <div className="flex items-end gap-[3px] h-5 w-14 justify-center">
          {visualizerHeights.map((h, idx) => (
            <motion.span
              key={idx}
              animate={{
                height: isPlaying ? `${h}%` : '15%',
              }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
              className="w-[3px] bg-gradient-to-t from-pink-500 to-rose-500 rounded-full"
            />
          ))}
        </div>

        {/* Volume Mute Toggle */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="p-1 rounded-full text-burgundy hover:text-rose-600 transition-colors"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </motion.div>

      {/* Floating Vinyl Disc Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400"
        title={isPlaying ? 'Pause Melody' : 'Play Romantic Melody for Nilu'}
      >
        {/* Glowing Aura */}
        <div
          className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
            isPlaying
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 opacity-70 animate-pulse'
              : 'bg-rose-300/40 opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Vinyl Disc Container */}
        <div
          className={`relative w-14 h-14 rounded-full bg-gradient-to-br from-stone-900 via-zinc-800 to-black p-1 border-2 border-rose-300/80 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300 ${
            isPlaying ? 'animate-spin-disc' : ''
          }`}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-1 rounded-full border border-stone-700/60 pointer-events-none" />
          <div className="absolute inset-2.5 rounded-full border border-stone-700/40 pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-stone-600/50 pointer-events-none" />

          {/* Vinyl Label */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
          </div>

          {/* Center Play/Pause Overlay Icon */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            {isPlaying ? (
              <Pause size={18} className="text-white drop-shadow" />
            ) : (
              <Play size={18} className="text-white drop-shadow ml-0.5" />
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
};
