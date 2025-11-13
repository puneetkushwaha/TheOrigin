'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshTransmissionMaterial, OrbitControls, Environment, Text } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

interface VisionSphereProps {
  isMobile: boolean;
}

interface OrbitingValuesProps {
  isMobile: boolean;
}

interface ResponsiveCameraProps {
  isMobile: boolean;
  isTablet: boolean;
}

// Elegant Glass Sphere for Vision
function VisionSphere({ isMobile }: VisionSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state: any) => {
  if (meshRef.current) {
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const sphereSize = isMobile ? 0.9 : 1.2;

  return (
    <Sphere ref={meshRef} args={[sphereSize, isMobile ? 64 : 128, isMobile ? 64 : 128]}>
      <MeshTransmissionMaterial
        backside
        samples={isMobile ? 6 : 16}
        resolution={isMobile ? 256 : 512}
        transmission={1}
        roughness={0.1}
        thickness={1.2}
        ior={1.5}
        chromaticAberration={0.05}
        anisotropy={0.3}
        distortion={0.15}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color="#c084fc"
      />
    </Sphere>
  );
}

// Orbiting Core Values
function OrbitingValues({ isMobile }: OrbitingValuesProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state: any) => {
  if (groupRef.current) {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const values = [
    { label: 'Innovation', angle: 0 },
    { label: 'Security', angle: Math.PI / 2 },
    { label: 'Autonomy', angle: Math.PI },
    { label: 'Impact', angle: (Math.PI * 3) / 2 },
  ];

  const radius = isMobile ? 1.8 : 2.5;
  const fontSize = isMobile ? 0.14 : 0.2;
  const orbSize = isMobile ? 0.07 : 0.1;

  return (
    <group ref={groupRef}>
      {values.map((value) => {
        const x = Math.cos(value.angle) * radius;
        const z = Math.sin(value.angle) * radius;
        
        return (
          <group key={value.label} position={[x, 0, z]}>
            {/* Label */}
            <Text
              position={[0, 0, 0]}
              fontSize={fontSize}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {value.label}
            </Text>

            {/* Connecting Line to Sphere - Hidden on mobile for performance */}
            {!isMobile && (
              <mesh position={[0, 0, 0]} rotation={[0, -value.angle, 0]}>
                <boxGeometry args={[0.02, 0.02, radius * 0.6]} />
                <meshBasicMaterial 
                  color="#00e5ff" 
                  transparent 
                  opacity={0.3}
                />
              </mesh>
            )}

            {/* Glowing Orb */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[orbSize, 16, 16]} />
              <meshStandardMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={isMobile ? 0.8 : 1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Responsive Camera Component - FIXED
function ResponsiveCamera({ isMobile, isTablet }: ResponsiveCameraProps) {
  const { camera } = useThree();
  
  useEffect(() => {
    // Check if camera is PerspectiveCamera before setting fov
    const isPerspectiveCamera = 'fov' in camera;
    
    if (isMobile) {
      camera.position.set(0, 0.5, 7);
      if (isPerspectiveCamera) {
        (camera as THREE.PerspectiveCamera).fov = 55;
      }
    } else if (isTablet) {
      camera.position.set(0, 0.8, 6.5);
      if (isPerspectiveCamera) {
        (camera as THREE.PerspectiveCamera).fov = 52;
      }
    } else {
      camera.position.set(0, 1, 6);
      if (isPerspectiveCamera) {
        (camera as THREE.PerspectiveCamera).fov = 50;
      }
    }
    camera.updateProjectionMatrix();
  }, [isMobile, isTablet, camera]);

  return null;
}

export default function Vision() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen w-full py-12 sm:py-16 md:py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      {/* Subtle Background Orb */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2"
        style={{
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
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
              background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
            }}
          >
            Vision & Mission
          </h2>
          <div 
            className="mx-auto h-px w-16 sm:w-20 md:w-24"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.6), transparent)',
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: 3D Globe with Core Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center order-2 lg:order-1"
          >
            <div 
              className="relative w-full"
              style={{
                height: isMobile ? '380px' : isTablet ? '450px' : '500px',
              }}
            >
              {/* Subtle Background Glow */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: isMobile ? '250px' : '400px',
                  height: isMobile ? '250px' : '400px',
                  background: 'radial-gradient(circle, rgba(192, 132, 252, 0.12) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                }}
              />

              {/* 3D Canvas */}
              <Canvas
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                performance={{ min: 0.5 }}
              >
                <Suspense fallback={null}>
                  <ResponsiveCamera isMobile={isMobile} isTablet={isTablet} />
                  
                  <ambientLight intensity={isMobile ? 0.4 : 0.3} />
                  <directionalLight 
                    position={[5, 5, 5]} 
                    intensity={isMobile ? 0.6 : 0.8} 
                    color="#ffffff" 
                  />
                  <pointLight 
                    position={[-5, 0, -5]} 
                    intensity={isMobile ? 0.3 : 0.5} 
                    color="#c084fc" 
                  />
                  <pointLight 
                    position={[0, 0, 0]} 
                    intensity={isMobile ? 0.6 : 0.8} 
                    color="#00e5ff" 
                  />
                  
                  <VisionSphere isMobile={isMobile} />
                  <OrbitingValues isMobile={isMobile} />
                  
                  {!isMobile && <Environment preset="city" />}
                  
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate 
                    autoRotateSpeed={0.3}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                    enableDamping
                    dampingFactor={0.05}
                    touches={{
                      ONE: THREE.TOUCH.ROTATE,
                      TWO: THREE.TOUCH.DOLLY_PAN
                    }}
                  />
                </Suspense>
              </Canvas>

              {/* Helper Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-center px-4"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#606060',
                }}
              >
                {isMobile ? 'Tap to explore' : 'Drag to explore'} • Auto-rotating
              </motion.p>
            </div>
          </motion.div>

          {/* Right: Vision & Mission Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl p-6 sm:p-8"
              style={{
                background: 'rgba(20, 20, 30, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3 
                className="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our Vision
              </h3>
              <p 
                className="text-sm sm:text-base leading-relaxed"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#c0c0c0',
                  fontWeight: 300,
                  lineHeight: '1.8',
                }}
              >
                To create a world where <span style={{ color: '#00e5ff', fontWeight: 500 }}>autonomous AI systems</span> work 
                alongside humanity, solving complex global challenges and unlocking unprecedented possibilities. We envision 
                a future where artificial intelligence doesn&apos;t just assist—it <span style={{ color: '#c084fc', fontWeight: 500 }}>innovates, 
                creates, and evolves</span> independently.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl p-6 sm:p-8"
              style={{
                background: 'rgba(20, 20, 30, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(192, 132, 252, 0.1)',
                boxShadow: '0 4px 16px rgba(192, 132, 252, 0.05)',
              }}
            >
              <h3 
                className="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our Mission
              </h3>
              <p 
                className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#c0c0c0',
                  fontWeight: 300,
                  lineHeight: '1.8',
                }}
              >
                We are on a mission to build <span style={{ color: '#c084fc', fontWeight: 500 }}>next-generation AI systems</span> that 
                operate autonomously across critical domains:
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  'Cybersecurity that never sleeps',
                  'Research that advances itself',
                  'Code that heals itself',
                  'Identity that can&apos;t be faked',
                  'Intelligence that serves humanity',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.5 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex items-start sm:items-center text-xs sm:text-sm"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#b0b0b0',
                      fontWeight: 300,
                    }}
                  >
                    <span 
                      className="mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0"
                      style={{ color: '#00e5ff' }}
                    >
                      →
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
