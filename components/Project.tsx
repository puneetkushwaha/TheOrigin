'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: 'Deepfake Detection SaaS',
    description: 'AI-powered content authenticity verification system that detects manipulated media in real-time.',
    icon: '🎭',
    tags: ['AI', 'Computer Vision', 'Security'],
    color: '#00e5ff',
  },
  {
    id: 2,
    title: 'AI Agents Marketplace',
    description: 'Decentralized freelance platform where autonomous AI agents bid and complete tasks.',
    icon: '🤖',
    tags: ['AI Agents', 'Blockchain', 'Automation'],
    color: '#c084fc',
  },
  {
    id: 3,
    title: 'Autonomous SOC Analyst',
    description: 'Self-operating cybersecurity system that detects, analyzes, and responds to threats 24/7.',
    icon: '🛡️',
    tags: ['Cybersecurity', 'AI', 'Automation'],
    color: '#00e5ff',
  },
  {
    id: 4,
    title: 'Self-Healing Codebase',
    description: 'Revolutionary platform that autonomously identifies bugs and deploys fixes without human intervention.',
    icon: '🔧',
    tags: ['DevOps', 'AI', 'Code Analysis'],
    color: '#c084fc',
  },
  {
    id: 5,
    title: 'Deepfake-Proof Identity',
    description: 'Quantum-resistant digital identity system that ensures authentic human presence online.',
    icon: '🔐',
    tags: ['Identity', 'Security', 'Blockchain'],
    color: '#00e5ff',
  },
  {
    id: 6,
    title: 'Autonomous AI Scientist',
    description: 'AI system that conducts original research, runs experiments, and publishes scientific papers.',
    icon: '🔬',
    tags: ['Research', 'AI', 'Innovation'],
    color: '#c084fc',
  },
  {
    id: 7,
    title: 'Global AI Crime Monitor',
    description: 'Real-time threat intelligence across dark web, surface web, and social media platforms.',
    icon: '🌐',
    tags: ['Security', 'Big Data', 'AI'],
    color: '#00e5ff',
  },
  {
    id: 8,
    title: 'India LLM Assistant',
    description: 'Localized AI that automates tasks across mobile and desktop with Indian context awareness.',
    icon: '🇮🇳',
    tags: ['LLM', 'Automation', 'Localization'],
    color: '#c084fc',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // ✅ Mobile Detection
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
      className="relative min-h-screen w-full py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      {/* ✅ FIXED: Animated Background Orbs - NOW RESPONSIVE */}
      <motion.div 
        className="absolute top-1/4 right-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.06, 0.04],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.06, 0.04, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(155, 93, 229, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Minimal Grid */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: 0.02,
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
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
          <motion.h2 
            className="mb-4 font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(90deg, #ffffff 0%, #00e5ff 25%, #c084fc 50%, #00e5ff 75%, #ffffff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
            }}
          >
            Our Projects
          </motion.h2>
          <motion.div 
            className="mx-auto h-px w-24"
            animate={{
              width: ['96px', '128px', '96px'],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.6), transparent)',
            }}
          />
          <p 
            className="mt-6 text-lg md:text-xl"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#a0a0a0',
              fontWeight: 300,
            }}
          >
            Pioneering the Next Generation of Autonomous Intelligence
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group cursor-pointer"
            >
              <div
                className="relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 ease-out"
                style={{
                  background: hoveredProject === project.id
                    ? 'rgba(25, 25, 35, 0.6)'
                    : 'rgba(20, 20, 30, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: hoveredProject === project.id
                    ? `1px solid ${project.color}30`
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: hoveredProject === project.id
                    ? `0 12px 40px ${project.color}20, 0 0 0 1px ${project.color}10`
                    : '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.color}08, transparent 70%)`,
                  }}
                />

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{
                    opacity: hoveredProject === project.id ? [0, 0.5, 0] : 0,
                    x: hoveredProject === project.id ? ['-100%', '200%'] : '-100%',
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredProject === project.id ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  {/* ✅ ICON - HOVER EFFECT REMOVED (NO ANIMATION) */}
                  <div 
                    className="mb-5 text-5xl"
                    style={{
                      filter: hoveredProject === project.id 
                        ? `drop-shadow(0 0 16px ${project.color}60)` 
                        : 'none',
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    {project.icon}
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="mb-3 text-xl font-semibold transition-colors duration-300"
                    animate={{
                      color: hoveredProject === project.id ? project.color : '#ffffff',
                    }}
                    style={{ 
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <p 
                    className="mb-5 flex-grow text-sm leading-relaxed transition-colors duration-300"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: hoveredProject === project.id ? '#c8c8c8' : '#b0b0b0',
                      fontWeight: 300,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.08 + tagIndex * 0.05 
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          background: hoveredProject === project.id
                            ? `${project.color}15`
                            : 'rgba(0, 229, 255, 0.08)',
                          color: hoveredProject === project.id ? project.color : '#00e5ff',
                          border: hoveredProject === project.id
                            ? `1px solid ${project.color}30`
                            : '1px solid rgba(0, 229, 255, 0.15)',
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1"
                  initial={{ width: '0%' }}
                  animate={{
                    width: hoveredProject === project.id ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                    boxShadow: hoveredProject === project.id ? `0 0 12px ${project.color}60` : 'none',
                  }}
                />

                {/* Corner Accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${project.color}, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-center"
        >
          <p 
            className="mb-8 text-base max-w-2xl mx-auto"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#909090',
              fontWeight: 300,
              lineHeight: '1.8',
            }}
          >
            Every project operates autonomously, pushing the boundaries of what AI can achieve
          </p>
          <motion.button
            whileHover={{ 
              y: -3, 
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-4 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-300 overflow-hidden"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(155, 93, 229, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: '#ffffff',
              boxShadow: '0 4px 24px rgba(0, 229, 255, 0.15)',
              letterSpacing: '0.15em',
            }}
          >
            {/* Button shimmer */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              }}
            />
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore All Projects
              <motion.span
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        button:hover {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(155, 93, 229, 0.15) 100%) !important;
          border-color: rgba(0, 229, 255, 0.5) !important;
          box-shadow: 0 8px 40px rgba(0, 229, 255, 0.25), 0 0 0 1px rgba(0, 229, 255, 0.2) !important;
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
        }

        @media (max-width: 1024px) {
          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}