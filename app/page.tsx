'use client'
// app/page.tsx — Landing page
import { Navbar }   from '@/components/landing/Navbar'
import { Hero }     from '@/components/landing/Hero'
import { Products } from '@/components/landing/Products'
import { Footer }   from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '6rem 1.5rem', borderTop: '1px solid #1E2240' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '700',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: '#f8fafc', letterSpacing: '-1px', marginBottom: '4rem',
          }}>
            One login. Both tools.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up once at sngadvisors.com. One account for everything.' },
              { step: '02', title: 'Choose your products', desc: 'Pick Planora, FlowOS, or both. Start with a free trial.' },
              { step: '03', title: 'Open and go', desc: 'Click to open Planora or FlowOS. No separate login needed.' },
              { step: '04', title: 'Manage your team', desc: 'Invite team members. Assign tasks and stages. Track everything.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card" style={{ padding: '1.75rem', textAlign: 'left' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: '800', color: '#1E2240', marginBottom: '0.75rem' }}>
                  {step}
                </p>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: '600', fontSize: '1rem', color: '#f1f5f9', marginBottom: '0.5rem' }}>
                  {title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{
          maxWidth: '700px', margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04))',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '24px',
          padding: '4rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '700',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#f8fafc', letterSpacing: '-1px', marginBottom: '1rem',
            position: 'relative',
          }}>
            Ready to get started?
          </h2>
          <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '1rem', position: 'relative' }}>
            Join teams already using SNG Advisors tools to run their operations.
          </p>
          <a href="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem', position: 'relative' }}>
            Start for free
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
