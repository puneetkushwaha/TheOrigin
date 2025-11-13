'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinUsModal({ isOpen, onClose }: JoinUsModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to our custom API route (same as Hero component)
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        console.log('✅ Email sent successfully:', data);
        
        // Reset form
        setFormData({ name: '', email: '', phone: '' });
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Close modal after showing success for 2 seconds
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2000);
        
      } else {
        // Error response from API
        console.error('❌ API Error Response:', data);
        const errorMessage = data.error || 'Failed to submit application';
        const errorDetails = data.details ? `\n\nDetails: ${data.details}` : '';
        throw new Error(errorMessage + errorDetails);
      }
      
    } catch (error) {
      console.error('❌ Error submitting application:', error);
      setIsSubmitting(false);
      
      // Show error message but keep modal open
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Failed to submit application. Please try again.'}`);
    }
  };

  const inputStyle = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: 'rgba(20, 20, 30, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    padding: '12px 16px',
    width: '100%',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(192, 132, 252, 0.15) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    color: '#ffffff',
    letterSpacing: '0.15em',
    boxShadow: '0 4px 24px rgba(0, 229, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
            onClick={onClose}
            style={{
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              className="w-full max-w-md mx-auto relative"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, rgba(5, 5, 16, 0.95) 100%)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                padding: '32px',
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full transition-all"
                style={{
                  background: 'rgba(20, 20, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="#00e5ff"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="mb-6 text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl font-bold mb-2"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Join The Origin
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm"
                      style={{
                        color: '#a0a0a0',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      Get in touch and become part of our community
                    </motion.p>
                  </div>

                  {/* Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label 
                        htmlFor="name"
                        className="block text-xs font-medium mb-2 uppercase tracking-wider"
                        style={{ 
                          color: '#a0a0a0',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                        placeholder="Your full name"
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(0, 229, 255, 0.5)';
                          e.target.style.boxShadow = '0 0 0 2px rgba(0, 229, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="email"
                        className="block text-xs font-medium mb-2 uppercase tracking-wider"
                        style={{ 
                          color: '#a0a0a0',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                        placeholder="your.email@example.com"
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(0, 229, 255, 0.5)';
                          e.target.style.boxShadow = '0 0 0 2px rgba(0, 229, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="phone"
                        className="block text-xs font-medium mb-2 uppercase tracking-wider"
                        style={{ 
                          color: '#a0a0a0',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                        placeholder="+91 12345 67890"
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(0, 229, 255, 0.5)';
                          e.target.style.boxShadow = '0 0 0 2px rgba(0, 229, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { y: -2, scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="w-full mt-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        ...buttonStyle,
                        opacity: isSubmitting ? 0.7 : 1,
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg 
                            className="animate-spin -ml-1 mr-3 h-4 w-4" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                          >
                            <circle 
                              className="opacity-25" 
                              cx="12" 
                              cy="12" 
                              r="10" 
                              stroke="currentColor" 
                              strokeWidth="4"
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
                  </motion.form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%)',
                      border: '2px solid rgba(0, 229, 255, 0.3)',
                    }}
                  >
                    <svg
                      className="h-8 w-8"
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
                    className="text-xl font-bold mb-2"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}