'use client'
// app/(auth)/signup/page.tsx

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [fullName,  setFullName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [showPass,  setShowPass]  = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password) return
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  const passwordStrength = (): { label: string; color: string; width: string } => {
    if (password.length === 0)  return { label: '',        color: '#1E2240', width: '0%'   }
    if (password.length < 6)   return { label: 'Weak',     color: '#ef4444', width: '25%'  }
    if (password.length < 8)   return { label: 'Fair',     color: '#f59e0b', width: '50%'  }
    if (password.length < 12)  return { label: 'Good',     color: '#6366f1', width: '75%'  }
    return                             { label: 'Strong',   color: '#10b981', width: '100%' }
  }

  const strength = passwordStrength()

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            borderRadius: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '13px', color: 'white',
          }}>SNG</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: '600', fontSize: '1.1rem', color: '#f1f5f9' }}>
            SNG Advisors
          </span>
        </Link>

        <div className="card" style={{ padding: '2rem' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '1.3rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
                Check your email
              </h2>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: '1.6' }}>
                We sent a confirmation link to <strong style={{ color: '#94a3b8' }}>{email}</strong>.
                Click it to activate your account.
              </p>
              <Link href="/login" className="btn-secondary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: '700',
                fontSize: '1.5rem', color: '#f8fafc',
                letterSpacing: '-0.5px', marginBottom: '0.35rem',
              }}>
                Create your account
              </h1>
              <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
                One account for Planora and FlowOS
              </p>

              <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '8px', padding: '0.75rem 1rem',
                    color: '#f87171', fontSize: '0.85rem',
                  }}>
                    {error}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Full name
                  </label>
                  <input
                    type="text" value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field" placeholder="Sachit Gupta"
                    required autoComplete="name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Work email
                  </label>
                  <input
                    type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field" placeholder="you@company.com"
                    required autoComplete="email"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      className="input-field" placeholder="Min 8 characters"
                      required autoComplete="new-password"
                      style={{ paddingRight: '2.5rem' }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{
                      position: 'absolute', right: '0.75rem', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
                    }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div style={{ marginTop: '0.4rem' }}>
                      <div style={{ height: '3px', background: '#1E2240', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s', borderRadius: '2px' }} />
                      </div>
                      <p style={{ fontSize: '0.72rem', color: strength.color, marginTop: '0.25rem' }}>{strength.label}</p>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '0.25rem' }}>
                  {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={16} />}
                  Create account
                </button>

                <p style={{ fontSize: '0.72rem', color: '#334155', textAlign: 'center', lineHeight: '1.5' }}>
                  By signing up you agree to our{' '}
                  <Link href="#" style={{ color: '#475569' }}>Terms</Link>
                  {' and '}
                  <Link href="#" style={{ color: '#475569' }}>Privacy Policy</Link>
                </p>
              </form>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', color: '#334155', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
