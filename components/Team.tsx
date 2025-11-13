'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Member {
  id: number;
  name: string;
  role: string;
  bio?: string;
  avatar: string;
  blur: boolean;
  socials?: {
    type: string;
    href: string;
  }[];
}

const team: Member[] = [
  {
    id: 1,
    name: 'Sahil Kumar Sah',
    role: 'Founder & CEO',
    bio: 'Visionary founder leading the AI-driven startup "The Origin".',
    avatar: '/teams/sahil.png',
    blur: false,
    socials: [
      {
        type: 'linkedin',
        href: 'https://www.linkedin.com/in/sahil-kumar-sah', // actual link
      },
    ],
  },
  {
    id: 2,
    name: 'Coming Soon',
    role: 'Core Team Member',
    avatar: '/teams/team.png',
    blur: true,
  },
  {
    id: 3,
    name: 'Coming Soon',
    role: 'Core Team Member',
    avatar: '/teams/team.png',
    blur: true,
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full py-12 sm:py-16 md:py-20 px-4"
      style={{
        background:
          'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2
            className="mb-2 font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight px-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our Team
          </h2>
          <div
            className="mx-auto h-px w-16 sm:w-20 md:w-24"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.6), transparent)',
            }}
          />
          <p className="mt-4 text-sm sm:text-base" style={{ color: '#a0a0a0' }}>
            Built by a small, focused team driving Autonomous AI innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-2xl p-5 sm:p-6 text-center"
              style={{
                background: 'rgba(20, 20, 30, 0.45)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.04)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                filter: member.blur ? 'blur(2px) brightness(0.6)' : 'none',
                opacity: member.blur ? 0.5 : 1,
                transition: '0.3s ease',
              }}
            >
              <div className="flex flex-col items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3
                    style={{
                      color: member.blur ? '#808080' : '#ffffff',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                    className="font-semibold text-base sm:text-lg"
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mt-1"
                    style={{ color: member.blur ? '#666' : '#9b9b9b' }}
                  >
                    {member.role}
                  </p>
                </div>

                {!member.blur && member.bio && (
                  <p
                    className="mt-3 text-xs sm:text-sm px-2"
                    style={{ color: '#b0b0b0', lineHeight: 1.6 }}
                  >
                    {member.bio}
                  </p>
                )}

                {/* Social Icons */}
                {!member.blur && member.socials && (
                  <div className="flex justify-center gap-3 mt-3">
                    {member.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-[#c084fc] transition-colors"
                      >
                        {social.type === 'linkedin' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                          >
                            <path d="M19 0h-14c-2.761...Z" />
                          </svg>
                        ) : (
                          <span>{social.type}</span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
