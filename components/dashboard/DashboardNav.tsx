'use client'
// components/dashboard/DashboardNav.tsx

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { LogOut, ChevronDown, User, Settings } from 'lucide-react'

interface DashboardNavProps {
  fullName:  string | null
  email:     string | null
  avatarUrl: string | null
}

export function DashboardNav({ fullName, email, avatarUrl }: DashboardNavProps) {
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()
  const [open, setOpen] = useState(false)

  const initials = fullName
    ? fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : (email?.[0]?.toUpperCase() ?? 'U')

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header style={{
      position:      'sticky',
      top:           0,
      zIndex:        40,
      height:        '60px',
      display:       'flex',
      alignItems:    'center',
      justifyContent:'space-between',
      padding:       '0 1.5rem',
      background:    'rgba(13,14,26,0.85)',
      backdropFilter:'blur(12px)',
      borderBottom:  '1px solid #1E2240',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '10px', color: 'white',
        }}>SNG</div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: '600', fontSize: '0.95rem', color: '#f1f5f9' }}>
          SNG Advisors
        </span>
      </Link>

      {/* User menu */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid #1E2240',
            borderRadius: '10px',
            padding: '0.35rem 0.75rem 0.35rem 0.4rem',
            cursor: 'pointer', color: '#94a3b8',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.4)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#1E2240'
          }}
        >
          {/* Avatar */}
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={{ width: '26px', height: '26px', borderRadius: '50%' }} />
          ) : (
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: '600', color: 'white',
            }}>
              {initials}
            </div>
          )}
          <span style={{ fontSize: '0.85rem', color: '#f1f5f9', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fullName ?? email ?? 'Account'}
          </span>
          <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </button>

        {/* Dropdown */}
        {open && (
          <>
            {/* Backdrop */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />

            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 8px)',
              width: '200px',
              background: '#13162B',
              border: '1px solid #1E2240',
              borderRadius: '12px',
              padding: '0.4rem',
              zIndex: 20,
              boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            }}>
              {/* Email */}
              <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #1E2240', marginBottom: '0.4rem' }}>
                <p style={{ fontSize: '0.7rem', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {email}
                </p>
              </div>

              <DropdownItem icon={<User size={14} />} label="Profile" onClick={() => setOpen(false)} />
              <DropdownItem icon={<Settings size={14} />} label="Settings" onClick={() => setOpen(false)} />

              <div style={{ borderTop: '1px solid #1E2240', marginTop: '0.4rem', paddingTop: '0.4rem' }}>
                <DropdownItem
                  icon={<LogOut size={14} />}
                  label="Sign out"
                  onClick={handleSignOut}
                  danger
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

function DropdownItem({ icon, label, onClick, danger }: {
  icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean
}) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      width: '100%', padding: '0.55rem 0.75rem',
      background: 'transparent', border: 'none',
      borderRadius: '8px', cursor: 'pointer',
      color: danger ? '#ef4444' : '#64748b',
      fontSize: '0.85rem', fontWeight: '400',
      fontFamily: 'DM Sans, sans-serif',
      transition: 'all 0.15s', textAlign: 'left',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLButtonElement
      el.style.background = danger ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.04)'
      el.style.color      = danger ? '#f87171' : '#f1f5f9'
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLButtonElement
      el.style.background = 'transparent'
      el.style.color      = danger ? '#ef4444' : '#64748b'
    }}
    >
      {icon}
      {label}
    </button>
  )
}
