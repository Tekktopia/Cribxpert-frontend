import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// How long the splash plays on every fresh app open (ms)
const SPLASH_DURATION = 2600;
// Start the fade-out this many ms before the end
const FADE_OUT_BEFORE = 400;

interface SplashScreenProps {
  onDone: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), SPLASH_DURATION - FADE_OUT_BEFORE);
    const doneTimer = setTimeout(onDone, SPLASH_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none"
        >
          {/* Logo — springs in from small */}
          <motion.img
            src="/CribXpert.svg"
            alt="CribXpert"
            draggable={false}
            className="w-24 h-24"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 180, delay: 0.1 }}
          />

          {/* App name */}
          <motion.h1
            className="mt-5 text-[28px] font-bold text-[#166773] tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.5 }}
          >
            CribXpert
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-1 text-sm text-gray-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.8 }}
          >
            Find your perfect stay
          </motion.p>

          {/* Teal progress bar that sweeps across the bottom */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-[#166773]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: SPLASH_DURATION / 1000 - 0.4, ease: 'easeInOut', delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
