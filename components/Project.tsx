'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const featuredProject = {
  id: 0,
  title: 'AryaVart',
  description: "India's first native AI LLM model with complete speech understanding, voice-based interactions, and intelligent task automation. Built for Bharat, powered by indigenous technology.",
  icon: '🇮🇳',
  tags: ['Native LLM', 'Voice AI', 'Task Automation', 'Speech Recognition'],
  color: '#ff6b35',
  gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%)',
};

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
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <section 
      id="projects"
      ref={ref} 
      className="relative min-h-screen w-full py-12 sm:py-16 md:py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      {/* Animated Background Orbs */}
      {!isMobile ? (
        <>
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
              width: '600px',
              height: '600px',
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
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(155, 93, 229, 0.04) 0%, transparent 70%)',
              filter: 'blur(100px)',
              pointerEvents: 'none',
            }}
          />
        </>
      ) : (
        <>
          <div 
            className="absolute top-1/4 right-5"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.04) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />
          <div 
            className="absolute bottom-1/4 left-5"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(155, 93, 229, 0.04) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Minimal Grid */}
      {!isMobile && (
        <div 
          className="absolute inset-0"
          style={{
            opacity: 0.02,
            backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <motion.h2 
            className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight px-4"
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={!isMobile ? {
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            } : {}}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(90deg, #ffffff 0%, #00e5ff 25%, #c084fc 50%, #00e5ff 75%, #ffffff 100%)',
              backgroundSize: isMobile ? '100% auto' : '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
            }}
          >
            Our Projects
          </motion.h2>
          
          <motion.div 
            className="mx-auto h-px w-16 sm:w-20 md:w-24"
            animate={!isMobile ? {
              width: ['96px', '128px', '96px'],
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={!isMobile ? {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.6), transparent)',
            }}
          />
          
          <p 
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl px-4"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#a0a0a0',
              fontWeight: 300,
            }}
          >
            Pioneering the Next Generation of Autonomous Intelligence
          </p>
        </motion.div>

        {/* Featured Project - AryaVart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12"
        >
          <motion.div
            whileHover={!isMobile ? {
              y: -8,
              scale: 1.01,
            } : {}}
            onHoverStart={() => !isMobile && setHoveredProject(featuredProject.id)}
            onHoverEnd={() => !isMobile && setHoveredProject(null)}
            className="group cursor-pointer"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-12 transition-all duration-500 ease-out"
              style={{
                background: hoveredProject === featuredProject.id
                  ? 'rgba(30, 25, 20, 0.6)'
                  : 'rgba(25, 20, 18, 0.5)',
                backdropFilter: isMobile ? 'blur(15px)' : 'blur(30px)',
                border: hoveredProject === featuredProject.id
                  ? `2px solid ${featuredProject.color}40`
                  : '2px solid rgba(255, 107, 53, 0.15)',
                boxShadow: hoveredProject === featuredProject.id
                  ? `0 20px 60px ${featuredProject.color}30, 0 0 0 1px ${featuredProject.color}20`
                  : '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Animated gradient background */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === featuredProject.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${featuredProject.color}12, transparent 60%)`,
                  }}
                />
              )}

              {/* Shimmer effect */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{
                    opacity: hoveredProject === featuredProject.id ? [0, 0.6, 0] : 0,
                    x: hoveredProject === featuredProject.id ? ['-100%', '200%'] : '-100%',
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredProject === featuredProject.id ? Infinity : 0,
                    repeatDelay: 1.5,
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  }}
                />
              )}

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - Content */}
                <div>
                  {/* Featured badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: `${featuredProject.color}20`,
                      color: featuredProject.color,
                      border: `1px solid ${featuredProject.color}40`,
                    }}
                  >
                    <span className="text-lg">⭐</span>
                    Featured Project
                  </motion.div>

                  {/* Icon */}
                  <div 
                    className="mb-6 text-6xl sm:text-7xl"
                    style={{
                      filter: hoveredProject === featuredProject.id 
                        ? `drop-shadow(0 0 24px ${featuredProject.color}80)` 
                        : `drop-shadow(0 0 12px ${featuredProject.color}40)`,
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    {featuredProject.icon}
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300"
                    animate={{
                      color: hoveredProject === featuredProject.id ? featuredProject.color : '#ffffff',
                    }}
                    style={{ 
                      fontFamily: 'Orbitron, sans-serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {featuredProject.title}
                  </motion.h3>

                  {/* Description */}
                  <p 
                    className="mb-6 text-base sm:text-lg leading-relaxed transition-colors duration-300"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: hoveredProject === featuredProject.id ? '#e0e0e0' : '#c0c0c0',
                      fontWeight: 300,
                    }}
                  >
                    {featuredProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {featuredProject.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.3 + tagIndex * 0.05 
                        }}
                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          background: hoveredProject === featuredProject.id
                            ? `${featuredProject.color}20`
                            : `${featuredProject.color}12`,
                          color: featuredProject.color,
                          border: `1px solid ${featuredProject.color}30`,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Right side - Visual element */}
                <div className="relative hidden md:flex items-center justify-center">
                  <motion.div
                    animate={!isMobile ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0],
                    } : {}}
                    transition={!isMobile ? {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : {}}
                    className="relative"
                  >
                    {/* Glowing orb */}
                    <div 
                      className="w-64 h-64 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${featuredProject.color}40 0%, ${featuredProject.color}10 50%, transparent 70%)`,
                        filter: 'blur(40px)',
                      }}
                    />
                    {/* Icon overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-8xl"
                      style={{
                        filter: `drop-shadow(0 0 30px ${featuredProject.color})`,
                      }}
                    >
                      🚀
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom accent line */}
              {!isMobile && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1"
                  initial={{ width: '0%' }}
                  animate={{
                    width: hoveredProject === featuredProject.id ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: featuredProject.gradient,
                    boxShadow: hoveredProject === featuredProject.id ? `0 0 20px ${featuredProject.color}80` : 'none',
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              whileHover={!isMobile ? {
                y: -8,
                scale: 1.02,
              } : {}}
              onHoverStart={() => !isMobile && setHoveredProject(project.id)}
              onHoverEnd={() => !isMobile && setHoveredProject(null)}
              className="group cursor-pointer"
            >
              <div
                className="relative h-full overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-500 ease-out"
                style={{
                  background: hoveredProject === project.id
                    ? 'rgba(25, 25, 35, 0.6)'
                    : 'rgba(20, 20, 30, 0.4)',
                  backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                  border: hoveredProject === project.id
                    ? `1px solid ${project.color}30`
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: hoveredProject === project.id
                    ? `0 12px 40px ${project.color}20, 0 0 0 1px ${project.color}10`
                    : '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Animated Gradient Background */}
                {!isMobile && (
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
                )}

                {/* Shimmer Effect */}
                {!isMobile && (
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
                )}

                <div className="relative z-10 flex h-full flex-col">
                  {/* Icon */}
                  <div 
                    className="mb-4 sm:mb-5 text-4xl sm:text-5xl"
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
                    className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold transition-colors duration-300"
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
                    className="mb-4 sm:mb-5 flex-grow text-xs sm:text-sm leading-relaxed transition-colors duration-300"
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
                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                        className="rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium transition-all duration-300"
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
                {!isMobile && (
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
                )}

                {/* Corner Accent */}
                {!isMobile && (
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${project.color}, transparent 70%)`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <p 
            className="mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto px-4"
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
            whileHover={!isMobile ? {
              y: -3, 
              scale: 1.02,
            } : {}}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 overflow-hidden"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(155, 93, 229, 0.1) 100%)',
              backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: '#ffffff',
              boxShadow: '0 4px 24px rgba(0, 229, 255, 0.15)',
              letterSpacing: '0.15em',
            }}
          >
            {/* Button shimmer */}
            {!isMobile && (
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
            )}
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore All Projects
              <motion.span
                animate={!isMobile ? {
                  x: [0, 4, 0],
                } : {}}
                transition={!isMobile ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
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

        ${!isMobile ? `
        button:hover {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(155, 93, 229, 0.15) 100%) !important;
          border-color: rgba(0, 229, 255, 0.5) !important;
          box-shadow: 0 8px 40px rgba(0, 229, 255, 0.25), 0 0 0 1px rgba(0, 229, 255, 0.2) !important;
        }
        ` : ''}
      `}</style>
    </section>
  );
}