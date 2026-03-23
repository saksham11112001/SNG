'use client'
// components/landing/Products.tsx

import Link from 'next/link'
import { ArrowRight, CheckCircle2, LayoutDashboard, GitBranch } from 'lucide-react'

const PLANORA_FEATURES = [
  'Tasks, projects & sprints',
  'Team collaboration',
  'Timeline & Gantt view',
  'Progress analytics',
  'Workspace-level isolation per client',
]

const FLOWOS_FEATURES = [
  'Visual drag-drop flow builder',
  'SLA tracking with cascade logic',
  'Attachment checkpoints per stage',
  'Fair appraisal engine',
  'Client portal for order transparency',
]

export function Products() {
  return (
    <section id="products" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>
            Our Products
          </p>
          <h2 style={{
            fontFamily:   'Syne, sans-serif',
            fontWeight:   '700',
            fontSize:     'clamp(1.8rem, 3vw, 2.5rem)',
            color:        '#f8fafc',
            letterSpacing: '-1px',
            lineHeight:   '1.2',
          }}>
            Two tools. One login.
          </h2>
          <p style={{ color: '#475569', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0', fontSize: '1rem' }}>
            Sign up once and access both products. Each has its own plan so you only pay for what you use.
          </p>
        </div>

        {/* Product cards */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap:                 '1.5rem',
        }}>
          <ProductCard
            icon={<LayoutDashboard size={22} />}
            color="#6366f1"
            glowColor="rgba(99,102,241,0.15)"
            name="Planora"
            tagline="Project management, simplified"
            description="Replace scattered spreadsheets and WhatsApp threads with a clean, fast project tracker built for Indian SMB teams."
            features={PLANORA_FEATURES}
            url={process.env.NEXT_PUBLIC_PLANORA_URL ?? 'https://tasks.sngadvisors.com'}
            badge="Most popular"
            badgeColor="#6366f1"
          />
          <ProductCard
            icon={<GitBranch size={22} />}
            color="#f59e0b"
            glowColor="rgba(245,158,11,0.12)"
            name="FlowOS"
            tagline="End-to-end flow management"
            description="Track every step of your operations — from raw material procurement to delivery — with SLA enforcement and fair team appraisals."
            features={FLOWOS_FEATURES}
            url={process.env.NEXT_PUBLIC_FLOWOS_URL ?? 'https://fms.sngadvisors.com'}
            badge="Free trial"
            badgeColor="#f59e0b"
          />
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  icon, color, glowColor, name, tagline, description,
  features, url, badge, badgeColor,
}: {
  icon:       React.ReactNode
  color:      string
  glowColor:  string
  name:       string
  tagline:    string
  description: string
  features:   string[]
  url:        string
  badge:      string
  badgeColor: string
}) {
  return (
    <div className="card" style={{ padding: '2rem', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = `0 20px 60px ${glowColor}`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{
          width: '48px', height: '48px',
          background: `${glowColor}`,
          border: `1px solid ${color}33`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color,
        }}>
          {icon}
        </div>
        <span style={{
          background:   `${badgeColor}22`,
          border:       `1px solid ${badgeColor}44`,
          borderRadius: '100px',
          padding:      '0.2rem 0.75rem',
          fontSize:     '0.72rem',
          fontWeight:   '600',
          color:        badgeColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {badge}
        </span>
      </div>

      {/* Product name */}
      <h3 style={{
        fontFamily:   'Syne, sans-serif',
        fontWeight:   '700',
        fontSize:     '1.6rem',
        color:        '#f8fafc',
        letterSpacing: '-0.5px',
        marginBottom: '0.25rem',
      }}>
        {name}
      </h3>
      <p style={{ color, fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.75rem' }}>
        {tagline}
      </p>
      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
        {description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
        {features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle2 size={15} color={color} style={{ flexShrink: 0 }} />
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/signup" style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        width:          '100%',
        padding:        '0.85rem 1.25rem',
        background:     `${color}18`,
        border:         `1px solid ${color}33`,
        borderRadius:   '10px',
        color:          color,
        textDecoration: 'none',
        fontSize:       '0.9rem',
        fontWeight:     '500',
        transition:     'all 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = `${color}28`
        el.style.borderColor = `${color}66`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = `${color}18`
        el.style.borderColor = `${color}33`
      }}
      >
        <span>Get started with {name}</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
