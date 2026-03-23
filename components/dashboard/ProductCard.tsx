'use client'
// components/dashboard/ProductCard.tsx

import Link from 'next/link'
import { ArrowRight, Clock, CheckCircle2, XCircle, Pause, ExternalLink } from 'lucide-react'

interface ProductCardProps {
  name:        string
  tagline:     string
  description: string
  icon:        React.ReactNode
  color:       string
  glowColor:   string
  url:         string
  plan:        string
  status:      'active' | 'cancelled' | 'expired' | 'paused' | null
  expiresAt:   string | null
  features:    string[]
}

export function ProductCard({
  name, tagline, description, icon, color, glowColor,
  url, plan, status, expiresAt, features,
}: ProductCardProps) {

  const isAccessible = status === 'active'

  const statusConfig = {
    active:    { icon: <CheckCircle2 size={13} />, label: 'Active',    bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', text: '#10b981' },
    trial:     { icon: <Clock size={13} />,        label: 'Trial',     bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
    expired:   { icon: <XCircle size={13} />,      label: 'Expired',   bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.25)',  text: '#ef4444' },
    cancelled: { icon: <XCircle size={13} />,      label: 'Cancelled', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.25)',  text: '#ef4444' },
    paused:    { icon: <Pause size={13} />,        label: 'Paused',    bg: 'rgba(100,116,139,0.12)',border: 'rgba(100,116,139,0.25)',text: '#64748b' },
    null:      { icon: <Clock size={13} />,        label: 'No plan',   bg: 'rgba(100,116,139,0.12)',border: 'rgba(100,116,139,0.25)',text: '#64748b' },
  }

  // Pick config — show trial badge if plan is 'trial' and status is 'active'
  const configKey = plan === 'trial' && status === 'active' ? 'trial'
    : (status ?? 'null')
  const sc = statusConfig[configKey as keyof typeof statusConfig] ?? statusConfig.null

  // Days remaining for trials
  const daysLeft = expiresAt
    ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000))
    : null

  return (
    <div
      className="card"
      style={{
        padding:    '2rem',
        opacity:    isAccessible ? 1 : 0.6,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!isAccessible) return
        const el = e.currentTarget as HTMLDivElement
        el.style.transform  = 'translateY(-3px)'
        el.style.boxShadow  = `0 16px 48px ${glowColor}`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform  = 'translateY(0)'
        el.style.boxShadow  = 'none'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{
          width: '44px', height: '44px',
          background: glowColor,
          border: `1px solid ${color}33`,
          borderRadius: '11px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color,
        }}>
          {icon}
        </div>

        {/* Status pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          background: sc.bg, border: `1px solid ${sc.border}`,
          borderRadius: '100px', padding: '0.25rem 0.65rem',
          color: sc.text, fontSize: '0.72rem', fontWeight: '600',
        }}>
          {sc.icon}
          {plan === 'trial' && status === 'active'
            ? `Trial · ${daysLeft}d left`
            : `${sc.label} · ${plan.charAt(0).toUpperCase() + plan.slice(1)}`
          }
        </div>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: '700',
        fontSize: '1.4rem', color: '#f8fafc',
        letterSpacing: '-0.5px', marginBottom: '0.2rem',
      }}>
        {name}
      </h3>
      <p style={{ color, fontSize: '0.8rem', fontWeight: '500', marginBottom: '0.6rem' }}>
        {tagline}
      </p>
      <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        {description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
        {features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isAccessible ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '0.8rem 1.1rem',
            background: `${color}18`, border: `1px solid ${color}33`,
            borderRadius: '10px', color, textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background   = `${color}28`
            el.style.borderColor  = `${color}66`
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background   = `${color}18`
            el.style.borderColor  = `${color}33`
          }}
        >
          <span>Open {name}</span>
          <ExternalLink size={15} />
        </a>
      ) : (
        <Link
          href="/upgrade"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '0.8rem 1.1rem',
            background: 'rgba(255,255,255,0.03)', border: '1px solid #1E2240',
            borderRadius: '10px', color: '#475569', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: '500',
          }}
        >
          <span>Upgrade to access</span>
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}
