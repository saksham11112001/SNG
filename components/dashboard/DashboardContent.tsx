'use client'
// components/dashboard/DashboardContent.tsx
// Receives pre-fetched data from the server component and handles all UI

import { LayoutDashboard, GitBranch } from 'lucide-react'
import { ProductCard } from './ProductCard'

interface Sub {
  plan:       string
  status:     string
  expires_at: string | null
}

interface Props {
  firstName:   string
  email:       string
  fullName:    string | null
  avatarUrl:   string | null
  createdAt:   string
  planoraSub:  Sub | null
  flowOsSub:   Sub | null
  planoraUrl:  string
  flowOsUrl:   string
}

export function DashboardContent({
  firstName, email, createdAt,
  planoraSub, flowOsSub, planoraUrl, flowOsUrl,
}: Props) {

  const greeting = (() => {
    const h = new Date().getHours()
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  })()

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Welcome header */}
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: '#334155', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
          {greeting} 👋
        </p>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: '700',
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          color: '#f8fafc', letterSpacing: '-1px', lineHeight: '1.2',
        }}>
          Welcome back, {firstName}
        </h1>
        <p style={{ color: '#475569', marginTop: '0.5rem', fontSize: '0.95rem' }}>
          Your workspace is ready. Pick a product to get started.
        </p>
      </div>

      {/* Product cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '1.5rem', marginBottom: '3rem',
      }}>
        <ProductCard
          name="Planora"
          tagline="Project & task management"
          description="Plan sprints, assign tasks, and track your team's progress in one clean workspace."
          icon={<LayoutDashboard size={20} />}
          color="#6366f1"
          glowColor="rgba(99,102,241,0.14)"
          url={planoraUrl}
          plan={planoraSub?.plan ?? 'none'}
          status={planoraSub?.status as any ?? null}
          expiresAt={planoraSub?.expires_at ?? null}
          features={[
            'Projects, tasks & subtasks',
            'Sprint planning & backlogs',
            'Team collaboration & comments',
            'Timeline & Gantt views',
          ]}
        />
        <ProductCard
          name="FlowOS"
          tagline="End-to-end flow management"
          description="Map every stage of your operations — procurement to delivery — with SLA tracking and fair team appraisals."
          icon={<GitBranch size={20} />}
          color="#f59e0b"
          glowColor="rgba(245,158,11,0.12)"
          url={flowOsUrl}
          plan={flowOsSub?.plan ?? 'none'}
          status={flowOsSub?.status as any ?? null}
          expiresAt={flowOsSub?.expires_at ?? null}
          features={[
            'Visual drag-drop flow builder',
            'SLA & deadline tracking',
            'Attachment checkpoints',
            'Fair appraisal engine',
          ]}
        />
      </div>

      {/* Account strip */}
      <div style={{
        background: '#13162B', border: '1px solid #1E2240',
        borderRadius: '14px', padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <p style={{ color: '#f1f5f9', fontSize: '0.875rem', fontWeight: '500' }}>{email}</p>
          <p style={{ color: '#334155', fontSize: '0.75rem', marginTop: '0.15rem' }}>
            Member since {new Date(createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'Planora', plan: planoraSub?.plan ?? '—', color: '#6366f1' },
            { label: 'FlowOS',  plan: flowOsSub?.plan  ?? '—', color: '#f59e0b' },
          ].map(({ label, plan, color }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.03)', border: '1px solid #1E2240',
              borderRadius: '8px', padding: '0.4rem 0.75rem',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', textTransform: 'capitalize' }}>
                {plan}
              </span>
            </div>
          ))}
          <a href="#" style={{
            border: '1px solid #1E2240', borderRadius: '8px',
            padding: '0.4rem 0.75rem', fontSize: '0.8rem',
            color: '#475569', textDecoration: 'none',
          }}>
            Manage billing →
          </a>
        </div>
      </div>
    </main>
  )
}
