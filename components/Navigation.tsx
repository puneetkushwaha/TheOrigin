'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import JoinUsModal from './JoinUsModal';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinUsModalOpen, setJoinUsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Vision', href: '#vision' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonStyle = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(192, 132, 252, 0.15) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    color: '#ffffff',
    letterSpacing: '0.15em',
    boxShadow: '0 4px 24px rgba(0, 229, 255, 0.2)',
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled 
            ? 'rgba(10, 10, 15, 0.85)' 
            : 'rgba(10, 10, 15, 0.3)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
          borderBottom: scrolled 
            ? '1px solid rgba(255, 255, 255, 0.08)' 
            : '1px solid rgba(255, 255, 255, 0.03)',
          boxShadow: scrolled 
            ? '0 4px 24px rgba(0, 0, 0, 0.2)' 
            : 'none',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="font-bold text-lg sm:text-xl tracking-tight relative z-10"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.05em',
              }}
            >
              THE ORIGIN
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -2 }}
                  className="text-xs lg:text-sm font-medium uppercase tracking-wider transition-all relative group"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: '#a0a0a0',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{
                      background: 'linear-gradient(90deg, #00e5ff, #c084fc)',
                    }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA Button - Updated to match Join Us style */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setJoinUsModalOpen(true)}
              className="hidden md:block px-5 lg:px-6 py-2 lg:py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all"
              style={buttonStyle}
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all relative z-10"
              style={{
                background: 'rgba(20, 20, 30, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="#00e5ff"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="#00e5ff"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300
              }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 z-40 md:hidden overflow-y-auto"
              style={{
                background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(5, 5, 16, 0.98) 100%)',
                backdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                {/* Mobile Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.05
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block px-4 py-4 rounded-xl text-base font-medium uppercase tracking-wider transition-all"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: '#a0a0a0',
                        letterSpacing: '0.1em',
                        background: 'rgba(20, 20, 30, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {item.name}
                        <motion.span
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          style={{ color: '#00e5ff' }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile CTA Button - Updated to match Join Us style */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setJoinUsModalOpen(true)}
                  className="w-full px-6 py-4 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all mt-6"
                  style={buttonStyle}
                >
                  Join Us
                </motion.button>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-6 border-t"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <p 
                    className="text-xs text-center"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#606060',
                    }}
                  >
                    © 2024 The Origin. All rights reserved.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Join Us Modal */}
      <JoinUsModal 
        isOpen={joinUsModalOpen}
        onClose={() => setJoinUsModalOpen(false)}
      />
    </>
  );
}