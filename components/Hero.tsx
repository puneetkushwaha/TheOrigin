'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sphere, 
  Torus,
  Icosahedron,
  MeshTransmissionMaterial,
  Float,
  Sparkles
} from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// ✅ TypeScript Interface
interface MobileProps {
  isMobile: boolean;
}

// Epic Technological Orb with Advanced Effects
function TechnologicalOrb({ isMobile }: MobileProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const energyRingsRef = useRef<THREE.Group>(null);
  
  // ✅ FIXED: Remove explicit type annotation
  useFrame((state: any) => {
  const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
    
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = time * 0.15;
      outerSphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -time * 0.25;
      innerCoreRef.current.rotation.z = time * 0.2;
    }
    
    if (energyRingsRef.current) {
      energyRingsRef.current.rotation.x = time * 0.4;
      energyRingsRef.current.rotation.z = Math.sin(time * 1.5) * 0.3;
    }
  });

  const orbSize = isMobile ? 0.8 : 1.2;

  return (
    <group ref={groupRef}>
      {/* Sparkles around the orb */}
      <Sparkles 
        count={isMobile ? 20 : 50}
        scale={orbSize * 3}
        size={2}
        speed={0.2}
        opacity={0.6}
        color="#00e5ff"
      />

      {/* Outer Energy Field */}
      <Sphere args={[orbSize * 1.6, 64, 64]}>
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Main Technological Sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={outerSphereRef} args={[orbSize, isMobile ? 64 : 128, isMobile ? 64 : 128]}>
          <MeshTransmissionMaterial
            backside
  samples={isMobile ? 4 : 8}
  resolution={isMobile ? 512 : 1024}

            transmission={0.95}
            roughness={0.02}
            thickness={3.5}
            ior={1.6}
            chromaticAberration={0.12}
            anisotropy={0.8}
            distortion={0.5}
            distortionScale={1.2}
            temporalDistortion={0.25}
            clearcoat={1}
            clearcoatRoughness={0}
            color="#00e5ff"
            attenuationColor="#c084fc"
            attenuationDistance={0.5}
          />
        </Sphere>
      </Float>

      {/* Inner Wireframe Core */}
      <Sphere ref={innerCoreRef} args={[orbSize * 0.4, 32, 32]}>
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={isMobile ? 1.2 : 1.8}
          transparent
          opacity={0.7}
          wireframe
          wireframeLinewidth={2}
        />
      </Sphere>

      {/* Central Energy Core */}
      <Sphere args={[orbSize * 0.15, 16, 16]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Multiple Energy Rings */}
      <group ref={energyRingsRef}>
        {/* Ring 1 */}
        <Torus args={[orbSize * 1.4, 0.03, 16, 100]} rotation={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={isMobile ? 0.8 : 1.2}
            transparent
            opacity={0.8}
          />
        </Torus>

        {/* Ring 2 */}
        <Torus args={[orbSize * 1.6, 0.025, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#c084fc"
            emissive="#c084fc"
            emissiveIntensity={isMobile ? 0.6 : 1.0}
            transparent
            opacity={0.6}
          />
        </Torus>

        {/* Ring 3 */}
        <Torus args={[orbSize * 1.8, 0.02, 16, 100]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={isMobile ? 0.4 : 0.8}
            transparent
            opacity={0.4}
          />
        </Torus>
      </group>

      {/* Orbital Data Streams */}
      {!isMobile && (
        <group>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = orbSize * 2.2;
            return (
              <Icosahedron 
                key={i}
                args={[0.08, 0]} 
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle * 2) * 0.5,
                  Math.sin(angle) * radius
                ]}
              >
                <meshStandardMaterial
                  color="#00e5ff"
                  emissive="#00e5ff"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.7}
                />
              </Icosahedron>
            );
          })}
        </group>
      )}
    </group>
  );
}

// Enhanced Minimal Wireframe Torus
function WireframeTorus({ isMobile }: MobileProps) {
  const torusRef = useRef<THREE.Mesh>(null);
  
  // ✅ FIXED: Remove explicit type annotation
  useFrame((state: any) => {
  if (torusRef.current) {
    torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    torusRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    }
  });

  const torusRadius = isMobile ? 1.8 : 2.4;

  return (
    <Torus ref={torusRef} args={[torusRadius, 0.08, 32, 100]}>
      <meshStandardMaterial
        color="#ffffff"
        wireframe={false}
        emissive="#00e5ff"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </Torus>
  );
}

// Enhanced Geometric Particles
function GeometricParticles({ isMobile }: MobileProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // ✅ FIXED: Remove explicit type annotation
  useFrame((state: any) => {
  if (groupRef.current) {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const positions: [number, number, number][] = isMobile 
    ? [
        [2.2, 0.5, 0],
        [-2.2, -0.5, 0],
        [0, 2, -1],
      ]
    : [
        [3.2, 1, 0],
        [-3.2, -1, 0],
        [0, 2.8, -2],
        [2.5, -2, 1],
        [-2.5, 1.8, -1],
      ];

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Icosahedron key={i} args={[0.18, 0]} position={pos}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#c084fc"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Icosahedron>
      ))}
    </group>
  );
}

// ✅ FIXED: Ambient Particles - No Hooks Order Error
function AmbientParticles({ isMobile }: MobileProps) {
  const points = useRef<THREE.Points>(null);
  
  // ✅ FIXED: Remove explicit type annotation
  useFrame((state: any) => {
  if (points.current) {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  // ✅ FIX: Move particleCount calculation inside useMemo
  const geometry = useMemo(() => {
    const particleCount = isMobile ? 80 : 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = (isMobile ? 6 : 10) + Math.random() * (isMobile ? 3 : 6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [isMobile]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.04}
        color="#00e5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  // ✅ Join Us Modal State
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // ✅ Smooth scroll to Projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ✅ Handle Join Us form submission with Nodemailer API
  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to our custom API route
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
        setShowJoinModal(false);
        
        // Show success message
        alert('🎉 Application submitted successfully! We will contact you soon.');
        
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

  // ✅ Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowJoinModal(false);
      }
    };

    if (showJoinModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showJoinModal]);

  const cameraPosition: [number, number, number] = isMobile ? [0, 0, 7] : isTablet ? [0, 0, 6.5] : [0, 0, 6];
  const cameraFov = isMobile ? 50 : isTablet ? 48 : 45;

  return (
    <>
      <section 
        className="relative w-full overflow-hidden"
        style={{
          height: isMobile ? 'calc(100vh - 60px)' : '100vh',
          minHeight: isMobile ? '600px' : '100vh',
          background: 'radial-gradient(ellipse at center, #0d0d15 0%, #050510 100%)',
        }}
      >
        {/* 3D Scene - FULLY INTERACTIVE & ROTATABLE */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            left: isMobile || isTablet ? '0' : '25%',
            cursor: isInteracting ? 'grabbing' : 'grab',
          }}
          onMouseDown={() => setIsInteracting(true)}
          onMouseUp={() => setIsInteracting(false)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
          <Canvas 
            camera={{ position: cameraPosition, fov: cameraFov }}
            gl={{ 
              antialias: !isMobile,
              alpha: true,
              powerPreference: isMobile ? "low-power" : "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.3,
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
          >
            <Suspense fallback={null}>
              <color attach="background" args={['#050510']} />
              
              {/* Enhanced Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
              <pointLight position={[-5, 0, -5]} intensity={0.6} color="#9B5DE5" />
              <pointLight position={[0, 0, 0]} intensity={0.8} color="#00e5ff" />
              
              {/* Enhanced 3D Elements */}
              <TechnologicalOrb isMobile={isMobile} />
              <AmbientParticles isMobile={isMobile} />
              
              {/* Orbit Controls */}
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate={!isInteracting}
                autoRotateSpeed={isMobile ? 0.2 : 0.3}
                enableDamping
                dampingFactor={0.05}
                rotateSpeed={isMobile ? 0.5 : 0.8}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                touches={{
                  ONE: THREE.TOUCH.ROTATE,
                  TWO: THREE.TOUCH.DOLLY_PAN
                }}
              />
            </Suspense>
          </Canvas>

          {/* Interactive Hint - Bouncing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: isInteracting ? 0 : 1,
              scale: isInteracting ? 0.9 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-4"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <p
                className="text-xs px-3 py-2 rounded-lg"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.7rem',
                  background: 'rgba(0, 229, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                }}
              >
                {isMobile ? '👆 Touch to rotate' : '🖱️ Drag to explore'}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient Vignette */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: isMobile 
              ? 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 16, 0.6) 70%, rgba(5, 5, 16, 0.9) 100%)'
              : 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 16, 0.3) 60%, rgba(5, 5, 16, 0.85) 100%)',
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 h-full flex items-center pointer-events-none">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pointer-events-auto">
            <div 
              className="max-w-7xl mx-auto"
              style={{
                paddingTop: isMobile ? '80px' : isTablet ? '60px' : '0',
              }}
            >
              <div className={`${isMobile || isTablet ? 'text-center' : 'max-w-2xl'}`}>
                {/* Enhanced Main Title */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile || isTablet ? 0 : -30, y: isMobile || isTablet ? -20 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.h1 
                    className="mb-6 sm:mb-8 font-bold tracking-tight leading-tight"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: isMobile ? 'clamp(2.5rem, 12vw, 3.8rem)' : isTablet ? 'clamp(3.5rem, 10vw, 5.5rem)' : 'clamp(4rem, 10vw, 6.5rem)',
                      background: 'conic-gradient(from 0deg, #ffffff 0%, #00e5ff 25%, #c084fc 50%, #ffffff 75%, #00e5ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: isMobile ? '0.04em' : '0.06em',
                      fontWeight: 700,
                      lineHeight: '0.9',
                    }}
                  >
                    THE
                    <br />
                    ORIGIN
                  </motion.h1>
                  <motion.div 
                    className={`h-px mb-4 sm:mb-6 ${isMobile || isTablet ? 'mx-auto' : ''}`}
                    animate={{
                      background: [
                        'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(0, 229, 255, 0.8) 50%, transparent 100%)',
                        'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(192, 132, 252, 0.8) 50%, transparent 100%)',
                        'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(0, 229, 255, 0.8) 50%, transparent 100%)'
                      ]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: isMobile ? '140px' : isTablet ? '200px' : 'clamp(140px, 50%, 280px)',
                      boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
                    }}
                  />
                </motion.div>

                {/* Enhanced Subtitle */}
                <motion.p
                  initial={{ opacity: 0, x: isMobile || isTablet ? 0 : -30, y: isMobile || isTablet ? -20 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`mb-6 sm:mb-8 ${isMobile || isTablet ? 'mx-auto max-w-md' : 'max-w-lg'}`}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.2rem)',
                    fontWeight: 300,
                    lineHeight: '1.9',
                    color: '#c0c0c0',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Building the Future of Intelligence
                  <br />
                  <span 
                    style={{
                      color: '#ffffff',
                      fontWeight: 500,
                      background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Beyond Human Limits — AI Innovation
                  </span>
                </motion.p>

                {/* Enhanced CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile || isTablet ? 0 : -30, y: isMobile || isTablet ? -20 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isMobile || isTablet ? 'justify-center items-center' : ''}`}
                >
                  {/* ✅ Explore Projects Button - Enhanced */}
                  <motion.button
                    onClick={scrollToProjects}
                    whileHover={{ x: isMobile ? 0 : 5, scale: isMobile ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all relative overflow-hidden"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      backdropFilter: 'blur(30px)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    <span className="relative z-10">Explore Projects</span>
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      whileHover={{ opacity: 1 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                      }}
                    />
                  </motion.button>
                  
                  {/* ✅ Join Us Button - Enhanced */}
                  <motion.button
                    onClick={() => setShowJoinModal(true)}
                    whileHover={{ x: isMobile ? 0 : 5, scale: isMobile ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all relative overflow-hidden"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(192, 132, 252, 0.12) 100%)',
                      backdropFilter: 'blur(30px)',
                      border: '2px solid rgba(0, 229, 255, 0.4)',
                      color: '#ffffff',
                      boxShadow: '0 8px 32px rgba(0, 229, 255, 0.25), inset 0 1px 0 rgba(0, 229, 255, 0.3)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    <span className="relative z-10">Join Us</span>
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      whileHover={{ opacity: 1 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%)',
                      }}
                    />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div 
              className="w-4 sm:w-5 h-6 sm:h-8 rounded-full border-2 flex items-start justify-center p-1"
              style={{
                borderColor: 'rgba(0, 229, 255, 0.5)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
              }}
            >
              <motion.div
                animate={{ y: [0, isMobile ? 8 : 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 sm:w-1 h-1.5 sm:h-2 rounded-full"
                style={{
                  background: 'rgba(0, 229, 255, 0.8)',
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
                }}
              />
            </div>
            <span 
              className="text-xs uppercase tracking-widest"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.2em',
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                textShadow: '0 0 10px rgba(0, 229, 255, 0.3)',
              }}
            >
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ✅ Join Us Modal/Popup */}
      <AnimatePresence>
        {showJoinModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
              onClick={() => setShowJoinModal(false)}
              style={{
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(180deg, rgba(15, 15, 25, 0.98) 0%, rgba(10, 10, 20, 0.98) 100%)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 229, 255, 0.1)',
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowJoinModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                >
                  ✕
                </motion.button>

                {/* Modal Header */}
                <motion.h2 
                  className="mb-2 font-bold text-2xl md:text-3xl tracking-tight"
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
                <p 
                  className="mb-6 text-sm"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: '#a0a0a0',
                    fontWeight: 300,
                  }}
                >
                  Become part of the autonomous intelligence revolution
                </p>

                {/* Form */}
                <form onSubmit={handleJoinSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label 
                      htmlFor="modal-name"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: '#00e5ff',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        background: 'rgba(20, 20, 30, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 229, 255, 0.15)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 229, 255, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label 
                      htmlFor="modal-email"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: '#c084fc',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        background: 'rgba(20, 20, 30, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(192, 132, 252, 0.15)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(192, 132, 252, 0.4)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(192, 132, 252, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(192, 132, 252, 0.15)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label 
                      htmlFor="modal-phone"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: '#00e5ff',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        background: 'rgba(20, 20, 30, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 229, 255, 0.15)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 229, 255, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(192, 132, 252, 0.15) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(0, 229, 255, 0.4)',
                      color: '#ffffff',
                      boxShadow: '0 4px 24px rgba(0, 229, 255, 0.2)',
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
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </motion.button>
                </form>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}