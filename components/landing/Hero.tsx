'use client'
// components/landing/Hero.tsx

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section
      className="bg-grid"
      style={{
        position:   'relative',
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:    '8rem 1.5rem 5rem',
        overflow:   'hidden',
        textAlign:  'center',
      }}
    >
      {/* Glow orbs */}
      <div className="glow-orb animate-glow-pulse" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -60%)',
      }} />
      <div className="glow-orb" style={{
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
        bottom: '10%', right: '10%',
        animation: 'glowPulse 4s ease-in-out infinite 1s',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>

        {/* Badge */}
        <div style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.4rem',
          background:     'rgba(99,102,241,0.1)',
          border:         '1px solid rgba(99,102,241,0.25)',
          borderRadius:   '100px',
          padding:        '0.35rem 1rem',
          marginBottom:   '2rem',
          fontSize:       '0.8rem',
          color:          '#818cf8',
          fontWeight:     '500',
          animation:      'fadeUp 0.6s ease forwards',
          opacity:        0,
        }}>
          <Sparkles size={12} />
          Productivity tools built for Indian businesses
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily:   'Syne, sans-serif',
          fontWeight:   '800',
          fontSize:     'clamp(2.4rem, 5vw, 4rem)',
          lineHeight:   '1.1',
          letterSpacing: '-2px',
          color:        '#f8fafc',
          marginBottom: '1.5rem',
          animation:    'fadeUp 0.6s ease forwards 0.1s',
          opacity:      0,
        }}>
          One platform.<br />
          <span style={{
            background: 'linear-gradient(135deg, #6366f1 30%, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Every workflow.
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize:     '1.15rem',
          color:        '#64748b',
          maxWidth:     '560px',
          margin:       '0 auto 2.5rem',
          lineHeight:   '1.7',
          fontWeight:   '300',
          animation:    'fadeUp 0.6s ease forwards 0.2s',
          opacity:      0,
        }}>
          SNG Advisors builds tools that replace spreadsheets and WhatsApp groups.
          Manage projects, track processes, and appraise teams — all in one place.
        </p>

        {/* CTAs */}
        <div style={{
          display:        'flex',
          gap:            '1rem',
          justifyContent: 'center',
          flexWrap:       'wrap',
          animation:      'fadeUp 0.6s ease forwards 0.3s',
          opacity:        0,
        }}>
          <Link href="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
            Start free trial
            <ArrowRight size={16} />
          </Link>
          <a href="#products" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
            See our products
          </a>
        </div>

        {/* Social proof */}
        <p style={{
          marginTop:  '2.5rem',
          fontSize:   '0.8rem',
          color:      '#334155',
          animation:  'fadeUp 0.6s ease forwards 0.4s',
          opacity:    0,
        }}>
          No credit card required · 14-day free trial · Cancel anytime
        </p>

        {/* Product preview strip */}
        <div style={{
          marginTop:    '4rem',
          display:      'flex',
          gap:          '1rem',
          justifyContent: 'center',
          animation:    'fadeUp 0.6s ease forwards 0.5s',
          opacity:      0,
        }}>
          <ProductPill color="#6366f1" name="Planora" desc="Project management" />
          <ProductPill color="#f59e0b" name="FlowOS" desc="Flow management" />
        </div>
      </div>
    </section>
  )
}

function ProductPill({ color, name, desc }: { color: string; name: string; desc: string }) {
  return (
    <div style={{
      display:      'flex',
      alignItems:   'center',
      gap:          '0.6rem',
      background:   'rgba(255,255,255,0.03)',
      border:       '1px solid rgba(255,255,255,0.07)',
      borderRadius: '100px',
      padding:      '0.4rem 1rem 0.4rem 0.5rem',
    }}>
      <div style={{
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }} />
      <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>{name}</span>
      <span style={{ fontSize: '0.75rem', color: '#334155' }}>·</span>
      <span style={{ fontSize: '0.75rem', color: '#475569' }}>{desc}</span>
    </div>
  )
}
