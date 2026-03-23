'use client'
// components/landing/Navbar.tsx

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        zIndex:          50,
        padding:         '0 1.5rem',
        height:          '64px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        transition:      'all 0.3s',
        background:      scrolled ? 'rgba(13,14,26,0.9)' : 'transparent',
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        borderBottom:    scrolled ? '1px solid rgba(30,34,64,0.8)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Syne, sans-serif',
          fontWeight: '700',
          fontSize: '14px',
          color: 'white',
          letterSpacing: '-0.5px',
        }}>
          SNG
        </div>
        <span style={{
          fontFamily:  'Syne, sans-serif',
          fontWeight:  '600',
          fontSize:    '1rem',
          color:       '#f1f5f9',
          letterSpacing: '-0.2px',
        }}>
          SNG Advisors
        </span>
      </Link>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
        <NavLink href="#products">Products</NavLink>
        <NavLink href="#how-it-works">How it works</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
      </nav>

      {/* Desktop CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden-mobile">
        <Link href="/login" className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.875rem' }}>
          Sign in
        </Link>
        <Link href="/signup" className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.875rem' }}>
          Get started free
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#94a3b8',
          padding: '0.5rem',
          display: 'none',
        }}
        className="show-mobile"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position:   'absolute',
          top:        '64px',
          left:       0,
          right:      0,
          background: '#13162B',
          borderBottom: '1px solid #1E2240',
          padding:    '1rem 1.5rem 1.5rem',
          display:    'flex',
          flexDirection: 'column',
          gap:        '1rem',
        }}>
          <Link href="#products" onClick={() => setMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>Products</Link>
          <Link href="#how-it-works" onClick={() => setMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>How it works</Link>
          <Link href="/login"  style={{ color: '#f1f5f9', textDecoration: 'none', fontSize: '0.95rem' }}>Sign in</Link>
          <Link href="/signup" className="btn-primary" style={{ textAlign: 'center' }}>Get started free</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{
      color:          '#64748b',
      textDecoration: 'none',
      fontSize:       '0.9rem',
      fontWeight:     '400',
      padding:        '0.4rem 0.75rem',
      borderRadius:   '8px',
      transition:     'all 0.2s',
    }}
    onMouseEnter={(e) => {
      (e.target as HTMLElement).style.color = '#f1f5f9'
      ;(e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
    }}
    onMouseLeave={(e) => {
      (e.target as HTMLElement).style.color = '#64748b'
      ;(e.target as HTMLElement).style.background = 'transparent'
    }}
    >
      {children}
    </a>
  )
}
