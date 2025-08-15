import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading?: boolean;
  minDisplayTime?: number;
  onFinished?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({
  isLoading = true,
  minDisplayTime = 1000,
  onFinished,
}) => {
  const [shouldDisplay, setShouldDisplay] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isLoading) {
      // Ensure the preloader displays for at least minDisplayTime milliseconds
      timer = setTimeout(() => {
        setShouldDisplay(false);
        if (onFinished) onFinished();
      }, minDisplayTime);
    } else {
      setShouldDisplay(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, minDisplayTime, onFinished]);

  return (
    <AnimatePresence>
      {shouldDisplay && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
        >
          <div className="relative w-24 h-24 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            >
              <div className="w-auto flex items-center justify-center">
                <img
                  src="/CribXpert.svg"
                  alt="cribxpert logo"
                  className="w-[50px] h-[50px] mr-[10px]"
                />
                <h1 className="font-bold text-[20px] text-[#1D5C5C]">
                  CribXpert
                </h1>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-[#1D5C5C]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{
                  duration: minDisplayTime / 1000,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Loading your perfect stay...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
