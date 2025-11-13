'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Member {
  id: number;
  name: string;
  role: string;
  bio?: string;
  avatar?: string; // local / public path or external
  socials?: { type: 'github' | 'linkedin' | 'twitter' | 'website'; href: string }[];
}

const team: Member[] = [
  {
    id: 1,
    name: 'Sahil Kumar Shah',
    role: 'Founder & CEO',
    bio: 'Visionary founder building the autonomous AI startup "The Origin".',
    avatar: '/teams/team.png',
    socials: [
      { type: 'linkedin', href: 'https://www.linkedin.com/in/sahil' },
    ],
  },
  {
    id: 2,
    name: 'Saksham Gupta',
    role: 'Lead Frontend Engineer',
    bio: 'Built the site architecture, 3D scenes and UI interactions.',
    avatar: '/teams/team.png',
    socials: [
      { type: 'github', href: 'https://github.com/puneetkushwaha' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/puneetkushwaha' },
    ],
  },
  {
    id: 3,
    name: 'Ananya',
    role: 'ML Engineer',
    bio: 'Researching autonomous learning systems and model safety.',
    avatar: '/teams/team.png',
    socials: [
      { type: 'twitter', href: 'https://twitter.com/ananya' },
    ],
  },
  {
    id: 4,
    name: 'Rohit',
    role: 'Security Lead',
    bio: 'Designing resilient infrastructure and secure-by-default systems.',
    avatar: '/teams/team.png',
    socials: [],
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full py-12 sm:py-16 md:py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)',
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
              letterSpacing: '0.02em',
            }}
          >
            Our Team
          </h2>
          <div
            className="mx-auto h-px w-16 sm:w-20 md:w-24"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.6), transparent)' }}
          />
          <p className="mt-4 text-sm sm:text-base" style={{ color: '#a0a0a0' }}>
            Built by a small, focused team driving Autonomous AI innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-2xl p-5 sm:p-6"
              style={{
                background: 'rgba(20, 20, 30, 0.45)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.04)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Avatar: use provided path or fallback initials */}
                  {member.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span style={{ color: '#00e5ff', fontFamily: 'Orbitron, sans-serif' }}>{member.name.split(' ').map(n=>n[0]).join('')}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 style={{ color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }} className="font-semibold text-base sm:text-lg">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm mt-1" style={{ color: '#9b9b9b' }}>{member.role}</p>
                    </div>
                    <div className="text-right">
                      {/* small colored dot */}
                      <div style={{ width: 10, height: 10, borderRadius: 6, background: '#00e5ff', boxShadow: '0 0 8px #00e5ff33' }} />
                    </div>
                  </div>

                  {member.bio && (
                    <p className="mt-3 text-xs sm:text-sm" style={{ color: '#b0b0b0', lineHeight: 1.6 }}>
                      {member.bio}
                    </p>
                  )}

                  {member.socials && member.socials.length > 0 && (
                    <div className="mt-4 flex items-center gap-3">
                      {member.socials.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                          style={{
                            background: 'rgba(20,20,30,0.6)',
                            border: '1px solid rgba(255,255,255,0.04)',
                          }}
                        >
                          <span style={{ fontSize: 14 }}>{
                            s.type === 'github' ? '🐙' : s.type === 'linkedin' ? '🔗' : s.type === 'twitter' ? '🐦' : '🔗'
                          }</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ y: -3 }}
            className="px-6 py-3 rounded-xl font-semibold uppercase tracking-wider"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(192,132,252,0.12))',
              border: '1px solid rgba(0,229,255,0.25)',
              color: '#ffffff',
            }}
            onClick={() => {
              // default behaviour: scroll to contact
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join the Mission
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid { text-align: center; }
        }
      `}</style>
    </section>
  );
}
