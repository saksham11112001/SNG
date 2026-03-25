'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [showPass,  setShowPass]  = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [mode,      setMode]      = useState<'password' | 'magic'>('password')

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
  setError(error.message)
  setLoading(false)
  return
}
const handleForgotPassword = async () => {
  if (!email) { setError('Enter your email first'); return }
  setLoading(true)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/callback?next=/reset-password`,
  })
  setError(error ? error.message : '✓ Password reset email sent')
  setLoading(false)
}

const params = new URLSearchParams(window.location.search)
const redirectTo = params.get('redirect')
if (redirectTo) {
  window.location.href = redirectTo
} else {
  router.push('/dashboard')
  router.refresh()
}
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/callback` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setMagicSent(true)
    setLoading(false)
  }

const handleGoogleLogin = async () => {
  setGoogleLoading(true)
  const params    = new URLSearchParams(window.location.search)
  const redirectTo = params.get('redirect')
  const callbackUrl = redirectTo
    ? `${window.location.origin}/callback?redirect=${encodeURIComponent(redirectTo)}`
    : `${window.location.origin}/callback`

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })
  if (error) { setError(error.message); setGoogleLoading(false) }
}

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

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '13px', color: 'white',
          }}>SNG</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: '600', fontSize: '1.1rem', color: '#f1f5f9' }}>
            SNG Advisors
          </span>
        </Link>

        <div className="card" style={{ padding: '2rem' }}>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '700',
            fontSize: '1.5rem', color: '#f8fafc',
            letterSpacing: '-0.5px', marginBottom: '0.35rem',
          }}>
            Welcome back
          </h1>
          <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Sign in to access Planora and FlowOS
          </p>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', padding: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '10px', cursor: 'pointer',
              color: '#f1f5f9', fontSize: '0.9rem', fontWeight: '500',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.2s', marginBottom: '1.25rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.09)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            {googleLoading ? (
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#1E2240' }} />
            <span style={{ color: '#334155', fontSize: '0.75rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#1E2240' }} />
          </div>

          {/* Mode tabs */}
          <div style={{
            display: 'flex', gap: '0.25rem',
            background: 'rgba(255,255,255,0.03)', border: '1px solid #1E2240',
            borderRadius: '10px', padding: '0.25rem', marginBottom: '1.25rem',
          }}>
            {(['password', 'magic'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(null); setMagicSent(false) }}
                style={{
                  flex: 1, padding: '0.5rem', borderRadius: '8px',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: '500',
                  background: mode === m ? '#6366f1' : 'transparent',
                  color:      mode === m ? 'white'   : '#475569',
                  transition: 'all 0.2s',
                }}
              >
                {m === 'password' ? 'Password' : 'Magic link'}
              </button>
            ))}
          </div>

          {/* Magic link sent */}
          {magicSent ? (
            <div style={{
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '10px', padding: '1.25rem', textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📬</p>
              <p style={{ color: '#818cf8', fontWeight: '500', marginBottom: '0.25rem' }}>Check your inbox</p>
              <p style={{ color: '#475569', fontSize: '0.85rem' }}>
                We sent a magic link to <strong style={{ color: '#94a3b8' }}>{email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '8px', padding: '0.75rem 1rem', color: '#f87171', fontSize: '0.85rem',
                }}>
                  {error}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.4rem' }}>
                  Email address
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field" placeholder="you@company.com" required autoComplete="email"
                />
              </div>

              {mode === 'password' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPass ? 'text' : 'password'} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field" placeholder="••••••••" required
                      autoComplete="current-password" style={{ paddingRight: '2.5rem' }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{
                      position: 'absolute', right: '0.75rem', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
                    }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '0.35rem' }}>
                    <button onClick={handleForgotPassword} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'0.75rem', color:'#475569', fontFamily:'DM Sans, sans-serif' }}>
  Forgot password?
</button>
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '0.25rem' }}>
                {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={16} />}
                {mode === 'password' ? 'Sign in' : 'Send magic link'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', color: '#334155', fontSize: '0.875rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>
            Sign up free
          </Link>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
