'use client';

import { useState } from 'react';
import CinematicLoader from './CinematicLoader';

export default function LoaderDemo() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoadComplete = () => {
    console.log('Loader animation complete!');
    // You can navigate or show main content here
  };

  return (
    <div className="relative min-h-screen">
      {showLoader && (
        <CinematicLoader 
          onLoadComplete={handleLoadComplete}
          duration={4000}
        />
      )}
      
      {/* Your main content goes here */}
      {!showLoader && (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="neon-text-cyan mb-4 font-['Orbitron'] text-6xl font-bold">
              Welcome to TheOrigin
            </h1>
            <p className="font-['Rajdhani'] text-xl text-gray-300">
              The loader has finished!
            </p>
            <button
              onClick={() => setShowLoader(true)}
              className="neon-border-cyan glass-effect mt-8 px-8 py-4 font-['Orbitron'] text-lg font-semibold transition-all hover:scale-105"
            >
              Replay Loader
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
