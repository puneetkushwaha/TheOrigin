'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Project';
import Vision from '@/components/Vision';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CinematicLoader from '@/components/CinematicLoader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Cinematic Loader - Shows first on every page load/refresh */}
      {loading && (
        <CinematicLoader 
          onLoadComplete={() => setLoading(false)}
          duration={4000}
        />
      )}

      {/* Main Website Content - Shows after loader completes */}
      {!loading && (
        <div className="relative min-h-screen">
          <Navigation />
          
          <main id="home">
            <Hero />
            <div id="about">
              <About />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="vision">
              <Vision />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
}
