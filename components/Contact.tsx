'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // ✅ ADD MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to our custom API route (same as Hero and JoinUs)
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
        // Success
        console.log('✅ Email sent successfully:', data);
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        
        // Show success message
        alert('🎉 Message sent successfully! We will get back to you soon.');
        
      } else {
        // Error response from API
        console.error('❌ API Error Response:', data);
        const errorMessage = data.error || 'Failed to send message';
        const errorDetails = data.details ? `\n\nDetails: ${data.details}` : '';
        throw new Error(errorMessage + errorDetails);
      }
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setIsSubmitting(false);
      
      // Show error message
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Failed to send message. Please try again.'}`);
    }
  };

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen w-full py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      {/* ✅ FIXED: Subtle Background Orbs - NOW RESPONSIVE */}
      <div 
        className="absolute top-20 right-10"
        style={{
          width: isMobile ? '200px' : '400px',  // ✅ RESPONSIVE
          height: isMobile ? '200px' : '400px', // ✅ RESPONSIVE
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        className="absolute bottom-20 left-10"
        style={{
          width: isMobile ? '200px' : '400px',  // ✅ RESPONSIVE
          height: isMobile ? '200px' : '400px', // ✅ RESPONSIVE
          background: 'radial-gradient(circle, rgba(155, 93, 229, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
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

      <div className="relative z-10 mx-auto max-w-5xl">
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
            className="mx-auto h-px w-24"
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
            Connect with us to explore collaboration opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label 
                  htmlFor="name" 
                  className="mb-2 block text-sm font-medium uppercase tracking-wider"
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
                  className="w-full rounded-xl px-4 py-3 text-base transition-all focus:outline-none"
                  placeholder="Your name"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: 'rgba(20, 20, 30, 0.4)',
                    backdropFilter: 'blur(20px)',
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
                  className="mb-2 block text-sm font-medium uppercase tracking-wider"
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
                  className="w-full rounded-xl px-4 py-3 text-base transition-all focus:outline-none"
                  placeholder="your.email@example.com"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: 'rgba(20, 20, 30, 0.4)',
                    backdropFilter: 'blur(20px)',
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
                  className="mb-2 block text-sm font-medium uppercase tracking-wider"
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
                  className="w-full rounded-xl px-4 py-3 text-base transition-all focus:outline-none resize-none"
                  placeholder="Tell us about your project or inquiry..."
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: 'rgba(20, 20, 30, 0.4)',
                    backdropFilter: 'blur(20px)',
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
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl py-4 text-base font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(155, 93, 229, 0.1) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0, 229, 255, 0.2)',
                  letterSpacing: '0.1em',
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
          </motion.div>

          {/* Right: Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
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
                whileHover={{ y: -4 }}
                className="rounded-xl p-6 transition-all cursor-default"
                style={{
                  background: 'rgba(20, 20, 30, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="flex items-start">
                  <div 
                    className="mr-4 text-3xl"
                    style={{
                      filter: `drop-shadow(0 0 8px ${item.color}40)`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      className="mb-1 text-base font-semibold"
                      style={{ 
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: item.color,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className="text-sm"
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
              className="rounded-xl p-6"
              style={{
                background: 'rgba(15, 15, 25, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h4 
                className="mb-4 text-lg font-semibold"
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
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl transition-all"
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

      {/* Styles */}
      <style jsx>{`
        input::placeholder,
        textarea::placeholder {
          color: #606060;
        }
        button:hover:not(:disabled) {
          box-shadow: 0 8px 32px rgba(0, 229, 255, 0.3);
          border-color: rgba(0, 229, 255, 0.5);
        }
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}