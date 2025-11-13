'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const techDomains = [
  { name: 'Artificial Intelligence', icon: '🧠', color: '#00FFFF' },
  { name: 'Machine Learning', icon: '⚡', color: '#9B5DE5' },
  { name: 'Blockchain', icon: '⛓️', color: '#FF00FF' },
  { name: 'Cybersecurity', icon: '🛡️', color: '#00FFAA' },
  { name: 'Quantum Computing', icon: '⚛️', color: '#00FFFF' },
  { name: 'Computer Vision', icon: '👁️', color: '#9B5DE5' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // ✅ ADD MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen w-full py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ✅ FIXED: Gradient Orbs - NOW RESPONSIVE */}
      <div 
        className="absolute top-20 left-10"
        style={{
          width: isMobile ? '250px' : '500px',  // ✅ RESPONSIVE
          height: isMobile ? '250px' : '500px', // ✅ RESPONSIVE
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        className="absolute bottom-20 right-10"
        style={{
          width: isMobile ? '250px' : '500px',  // ✅ RESPONSIVE
          height: isMobile ? '250px' : '500px', // ✅ RESPONSIVE
          background: 'radial-gradient(circle, rgba(155, 93, 229, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <h2 
            className="mb-4 font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0ff 50%, #00e5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
            }}
          >
            Who We Are
          </h2>
          <div 
            className="mx-auto h-px w-24"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(155, 93, 229, 0.6), transparent)',
            }}
          />
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 rounded-2xl p-10 md:p-14"
          style={{
            background: 'rgba(15, 15, 25, 0.6)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <p 
            className="mb-6 text-xl md:text-2xl leading-relaxed"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#e0e0e0',
              fontWeight: 300,
              lineHeight: '1.8',
            }}
          >
            <span 
              style={{
                color: '#00e5ff',
                fontWeight: 600,
              }}
            >
              The Origin
            </span> is a cutting-edge AI technology parent company 
            at the forefront of the autonomous intelligence revolution. We build groundbreaking systems that push 
            the boundaries of what's possible in the digital realm.
          </p>
          <p 
            className="text-xl md:text-2xl leading-relaxed"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#c0c0c0',
              fontWeight: 300,
              lineHeight: '1.8',
            }}
          >
            Our mission is to create <span 
              style={{
                color: '#c084fc',
                fontWeight: 600,
              }}
            >
              self-evolving AI systems
            </span> that don't just 
            respond to human input, but actively shape the future of technology across multiple domains.
          </p>
        </motion.div>

        {/* Tech Domains Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 
            className="mb-10 text-center text-3xl md:text-4xl font-semibold tracking-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            Our Technology Domains
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {techDomains.map((domain, index) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  y: -6,
                  transition: { duration: 0.2 }
                }}
                className="group relative overflow-hidden rounded-xl p-7"
                style={{
                  background: 'rgba(20, 20, 30, 0.4)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Subtle Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${domain.color}10, transparent 40%)`,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="mb-4 text-4xl"
                    style={{
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {domain.icon}
                  </div>
                  <h4
                    className="text-lg font-medium"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#ffffff',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {domain.name}
                  </h4>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)`,
                    transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            { value: '8+', label: 'Active Projects' },
            { value: '∞', label: 'Possibilities' },
            { value: '24/7', label: 'Autonomous Operation' },
          ].map((stat, idx) => (
            <motion.div 
              key={stat.label} 
              className="rounded-xl p-8 text-center group"
              whileHover={{
                y: -4,
                transition: { duration: 0.2 }
              }}
              style={{
                background: 'rgba(15, 15, 25, 0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'default',
              }}
            >
              <div 
                className="mb-3 text-5xl md:text-6xl font-bold"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  background: 'linear-gradient(135deg, #00e5ff 0%, #0099cc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div 
                className="text-base uppercase tracking-wider"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#a0a0a0',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Minimal Animations */}
      <style jsx>{`
        @media (hover: hover) {
          .group:hover .text-4xl {
            transform: scale(1.1);
          }
          
          .group:hover h4 {
            color: #00e5ff;
          }

          .group:hover[class*="grid"] > div {
            border-color: rgba(0, 229, 255, 0.25);
            box-shadow: 0 8px 32px rgba(0, 229, 255, 0.1);
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}