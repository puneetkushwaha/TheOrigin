'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const currentYear = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new Date().getFullYear();
    }
    return 2025;
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubscribing(true);

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to subscribe");
    }

    alert("✅ Subscribed successfully!");
    setEmail("");
  } catch (error) {
    console.error("API Error Response:", error);
    alert(`❌ Error: ${error instanceof Error ? error.message : "Failed to subscribe. Please try again."}`);
  } finally {
    setIsSubscribing(false);
  }
};


  const socialLinks = [
    { icon: '🔗', name: 'Website', color: '#00e5ff' },
    { icon: '💼', name: 'LinkedIn', color: '#0077b5' },
    { icon: '🐦', name: 'Twitter', color: '#1da1f2' },
    { icon: '📱', name: 'Instagram', color: '#e4405f' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Vision', href: '#vision' },
    { name: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Sitemap', href: '#' },
  ];

  return (
    <footer 
      className="relative w-full py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 100%)',
      }}
    >
      {/* Animated Top Border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.6) 50%, transparent 100%)',
        }}
      />

      {/* Background Glows */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: isMobile ? '400px' : '800px',
          height: isMobile ? '200px' : '400px',
          background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-1/4"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.04, 0.06, 0.04],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '150px' : '300px',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Newsletter Section - PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(192, 132, 252, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 229, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h3 
                className="mb-3 font-bold text-2xl md:text-3xl tracking-tight"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Stay Connected to the Future
              </motion.h3>
              <p 
                className="text-sm md:text-base"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#a0a0a0',
                  fontWeight: 300,
                  lineHeight: '1.6',
                }}
              >
                Get exclusive updates on autonomous AI breakthroughs, new projects, and innovation insights.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="flex-1 px-5 py-3 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  background: 'rgba(20, 20, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 229, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0, 229, 255, 0.2)',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h3 
              className="mb-4 font-bold text-3xl tracking-tight"
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
                background: 'linear-gradient(90deg, #ffffff 0%, #00e5ff 50%, #c084fc 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              THE ORIGIN
            </motion.h3>
            <p 
              className="text-sm leading-relaxed mb-6"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#909090',
                fontWeight: 300,
              }}
            >
              Pioneering the next generation of autonomous intelligence systems across cybersecurity, research, and innovation.
            </p>
            
            {/* Stats */}
            <div className="space-y-3">
              {[
                { label: 'Active Projects', value: '8+' },
                { label: 'AI Systems', value: '∞' },
                { label: 'Uptime', value: '24/7' },
              ].map((stat) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between py-2 px-3 rounded-lg transition-all"
                  style={{
                    background: 'rgba(0, 229, 255, 0.03)',
                    border: '1px solid rgba(0, 229, 255, 0.08)',
                  }}
                >
                  <span 
                    className="text-xs"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#808080',
                    }}
                  >
                    {stat.label}
                  </span>
                  <span 
                    className="text-sm font-bold"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      color: '#00e5ff',
                    }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 
              className="mb-6 text-sm font-semibold uppercase tracking-wider"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#ffffff',
                letterSpacing: '0.15em',
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="group flex items-center text-sm transition-all"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#a0a0a0',
                      fontWeight: 400,
                    }}
                  >
                    <motion.span
                      className="mr-2 opacity-0 group-hover:opacity-100"
                      style={{ color: '#00e5ff' }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 
              className="mb-6 text-sm font-semibold uppercase tracking-wider"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#ffffff',
                letterSpacing: '0.15em',
              }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="group flex items-center text-sm transition-all"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#a0a0a0',
                      fontWeight: 400,
                    }}
                  >
                    <motion.span
                      className="mr-2 opacity-0 group-hover:opacity-100"
                      style={{ color: '#c084fc' }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 
              className="mb-6 text-sm font-semibold uppercase tracking-wider"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#ffffff',
                letterSpacing: '0.15em',
              }}
            >
              Connect
            </h4>
            
            {/* Email */}
            <motion.a
              href="mailto:contact@theorigin.ai"
              whileHover={{ x: 5 }}
              className="group inline-flex items-center mb-6 text-sm transition-all"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#a0a0a0',
                fontWeight: 400,
              }}
            >
              <span className="mr-2" style={{ color: '#00e5ff' }}>📧</span>
              contact@theorigin.ai
            </motion.a>

            {/* Social Links - PREMIUM DESIGN */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center h-14 rounded-xl text-2xl transition-all overflow-hidden"
                  style={{
                    background: 'rgba(20, 20, 30, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at center, ${social.color}15, transparent 70%)`,
                    }}
                  />
                  
                  {/* Icon */}
                  <span 
                    className="relative z-10"
                    style={{
                      filter: `drop-shadow(0 0 8px ${social.color}00)`,
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    {social.icon}
                  </span>
                  
                  {/* Bottom Accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: social.color,
                      transformOrigin: 'left',
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Location Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 px-4 py-3 rounded-lg text-center"
              style={{
                background: 'rgba(192, 132, 252, 0.05)',
                border: '1px solid rgba(192, 132, 252, 0.15)',
              }}
            >
              <p 
                className="text-xs"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#c084fc',
                  fontWeight: 500,
                }}
              >
                🌐 Global • Remote First
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
<motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="pt-8"
  style={{
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  }}
>
  <div className="flex justify-center items-center text-center">
    <p 
      className="text-xs font-bold"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#808080',
      }}
    >
      © {currentYear} The Origin. All rights reserved. • Built with ❤️ By Puneet Kushwaha
    </p>
  </div>
</motion.div>


        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-8 mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-all"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(192, 132, 252, 0.1) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.1em',
          }}
        >
          <motion.span
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↑
          </motion.span>
          Back to Top
        </motion.button>
      </div>

      {/* Floating Particles - Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#00e5ff' : '#c084fc',
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        a:hover {
          color: #00e5ff !important;
        }

        input::placeholder {
          color: #606060;
        }

        button[type="submit"]:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.25) 0%, rgba(192, 132, 252, 0.25) 100%) !important;
          border-color: rgba(0, 229, 255, 0.6) !important;
          box-shadow: 0 8px 32px rgba(0, 229, 255, 0.3) !important;
        }

        @media (max-width: 768px) {
          .grid {
            text-align: center;
          }
          
          ul {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}