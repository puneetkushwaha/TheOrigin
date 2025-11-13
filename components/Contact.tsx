'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const [isMobile, setIsMobile] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);  // ✅ ADDED for success state

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // ✅ OPTIMIZED: Handle submit with success modal (no alert)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Email sent successfully:', data);
        
        // Show success state
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
        
      } else {
        console.error('❌ API Error Response:', data);
        const errorMessage = data.error || 'Failed to send message';
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setIsSubmitting(false);
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Failed to send message. Please try again.'}`);
    }
  };

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen w-full py-12 sm:py-16 md:py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      {/* ✅ OPTIMIZED: Subtle Background Orbs - Reduced blur on mobile */}
      <div 
        className="absolute top-20 right-10"
        style={{
          width: isMobile ? '150px' : '400px',
          height: isMobile ? '150px' : '400px',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%)',
          filter: isMobile ? 'blur(40px)' : 'blur(80px)',  // ✅ REDUCED
          pointerEvents: 'none',
        }}
      />
      <div 
        className="absolute bottom-20 left-10"
        style={{
          width: isMobile ? '150px' : '400px',
          height: isMobile ? '150px' : '400px',
          background: 'radial-gradient(circle, rgba(155, 93, 229, 0.06) 0%, transparent 70%)',
          filter: isMobile ? 'blur(40px)' : 'blur(80px)',  // ✅ REDUCED
          pointerEvents: 'none',
        }}
      />

      {/* ✅ OPTIMIZED: Minimal Grid - Hidden on mobile */}
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

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <h2 
            className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight px-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
            }}
          >
            Get In Touch
          </h2>
          <div 
            className="mx-auto h-px w-16 sm:w-20 md:w-24"
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
            Connect with us to explore collaboration opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wider"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#00e5ff',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm sm:text-base transition-all focus:outline-none"
                    placeholder="Your name"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      background: 'rgba(20, 20, 30, 0.4)',
                      backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',  // ✅ REDUCED
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                      color: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 229, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                    }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wider"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#c084fc',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm sm:text-base transition-all focus:outline-none"
                    placeholder="your.email@example.com"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      background: 'rgba(20, 20, 30, 0.4)',
                      backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',  // ✅ REDUCED
                      border: '1px solid rgba(155, 93, 229, 0.15)',
                      color: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(155, 93, 229, 0.4)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(155, 93, 229, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(155, 93, 229, 0.15)';
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                    }}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wider"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#00e5ff',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full rounded-xl px-4 py-3 text-sm sm:text-base transition-all focus:outline-none resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      background: 'rgba(20, 20, 30, 0.4)',
                      backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',  // ✅ REDUCED
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                      color: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 229, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isMobile ? { y: -2 } : {}}  // ✅ DISABLED on mobile
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(155, 93, 229, 0.1) 100%)',
                    backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',  // ✅ REDUCED
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0, 229, 255, 0.2)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            ) : (
              /* ✅ SUCCESS STATE - Same as JoinUsModal */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 sm:py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mx-auto mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%)',
                    border: '2px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <svg
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="#00e5ff"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold mb-3"
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                >
                  Message Sent!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base"
                  style={{
                    color: '#a0a0a0',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  Thank you for reaching out. We&apos;ll be in touch soon!
                </motion.p>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Contact Info Cards */}
            {[
              {
                icon: '📧',
                title: 'Email',
                value: 'contact@theorigin.ai',
                color: '#00e5ff',
              },
              {
                icon: '🌐',
                title: 'Location',
                value: 'Global • Remote First',
                color: '#c084fc',
              },
              {
                icon: '⚡',
                title: 'Response Time',
                value: '24/7 AI-Powered Support',
                color: '#00e5ff',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={!isMobile ? { y: -4 } : {}}  // ✅ DISABLED on mobile
                className="rounded-xl p-5 sm:p-6 transition-all cursor-default"
                style={{
                  background: 'rgba(20, 20, 30, 0.4)',
                  backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',  // ✅ REDUCED
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="mr-3 sm:mr-4 text-2xl sm:text-3xl"
                    style={{
                      filter: `drop-shadow(0 0 8px ${item.color}40)`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      className="mb-1 text-sm sm:text-base font-semibold"
                      style={{ 
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: item.color,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className="text-xs sm:text-sm"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: '#c0c0c0',
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: 'rgba(15, 15, 25, 0.5)',
                backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',  // ✅ REDUCED
                border: '1px solid rgba(0, 229, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h4 
                className="mb-4 text-base sm:text-lg font-semibold"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#ffffff',
                }}
              >
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {['🔗', '💼', '🐦', '📱'].map((icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={!isMobile ? { scale: 1.1, y: -2 } : {}}  // ✅ DISABLED on mobile
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg text-xl sm:text-2xl transition-all"
                    style={{
                      background: 'rgba(20, 20, 30, 0.4)',
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                    }}
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ✅ OPTIMIZED: Styles - Only for desktop */}
      <style jsx>{`
        input::placeholder,
        textarea::placeholder {
          color: #606060;
        }
        ${!isMobile ? `
        button:hover:not(:disabled) {
          box-shadow: 0 8px 32px rgba(0, 229, 255, 0.3);
          border-color: rgba(0, 229, 255, 0.5);
        }
        ` : ''}
      `}</style>
    </section>
  );
}