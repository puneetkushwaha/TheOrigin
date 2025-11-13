'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CinematicLoaderProps {
  onLoadComplete?: () => void;
  duration?: number;
}

export default function CinematicLoader({ onLoadComplete, duration = 3000 }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mount detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Progress animation
  useEffect(() => {
    if (!isMounted) return;
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(progressValue);
      
      if (progressValue < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          onLoadComplete?.();
        }, 800);
      }
    };
    
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black" />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(20px)'
          }}
          transition={{ 
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)'
          }}
        >
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 224, 255, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 224, 255, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Ambient Glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 224, 255, 0.1) 0%, transparent 50%)'
            }}
          />

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-12">
            
            {/* Logo/Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: progress >= 95 ? [1, 0.8, 0.6, 0.3, 0] : 1,
                y: 0,
                scale: progress >= 95 ? [1, 1.05, 1.1] : 1
              }}
              transition={{ 
                duration: progress >= 95 ? 1.2 : 0.8,
                ease: progress >= 95 ? [0.22, 1, 0.36, 1] : [0.43, 0.13, 0.23, 0.96]
              }}
              className="text-center"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #00e0ff 0%, #ffffff 50%, #00e0ff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                THE ORIGIN
              </motion.h1>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 1,
                  delay: 0.3,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="h-[2px] w-48 mx-auto"
                style={{
                  background: 'linear-gradient(90deg, transparent, #00e0ff, transparent)'
                }}
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-4 text-sm tracking-[0.3em] text-gray-400 uppercase"
              >
                Pioneering Intelligence
              </motion.p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: progress >= 95 ? [1, 0.8, 0.5, 0.2, 0] : 1,
                scale: progress >= 95 ? [1, 0.95, 0.9] : 1
              }}
              transition={{ 
                duration: progress >= 95 ? 1.2 : 0.8,
                delay: progress >= 95 ? 0 : 0.6,
                ease: progress >= 95 ? [0.22, 1, 0.36, 1] : 'easeOut'
              }}
              className="flex flex-col items-center space-y-6 w-full max-w-md px-8"
            >
              
              {/* Circular Progress */}
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  {/* Background Circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="4"
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 364" }}
                    animate={{ 
                      strokeDasharray: `${(progress / 100) * 364} 364`
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(0, 224, 255, 0.6))'
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00e0ff" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#00e0ff" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className="text-3xl font-bold text-white"
                    key={Math.floor(progress)}
                  >
                    {Math.floor(progress)}%
                  </motion.span>
                </div>
              </div>

              {/* Status Text */}
              <motion.div
                className="text-center space-y-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <p className="text-sm text-gray-400 tracking-wider">
                  {progress < 25 && 'Initializing...'}
                  {progress >= 25 && progress < 50 && 'Loading Components...'}
                  {progress >= 50 && progress < 75 && 'Building Interface...'}
                  {progress >= 75 && progress < 95 && 'Almost Ready...'}
                  {progress >= 95 && 'Launching...'}
                </p>
              </motion.div>

              {/* Loading Dots */}
              <div className="flex items-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: '0 0 8px rgba(0, 224, 255, 0.8)'
                    }}
                  />
                ))}
              </div>
            </motion.div>

          </div>

          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, #00e0ff, transparent)',
              transformOrigin: 'center'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
