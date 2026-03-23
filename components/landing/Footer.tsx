'use client'
// components/landing/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{
      borderTop:  '1px solid #1E2240',
      padding:    '3rem 1.5rem',
      marginTop:  '2rem',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap:                 '2rem',
          marginBottom:        '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '28px', height: '28px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                borderRadius: '7px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '11px', color: 'white',
              }}>SNG</div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: '600', color: '#f1f5f9', fontSize: '0.95rem' }}>
                SNG Advisors
              </span>
            </div>
            <p style={{ color: '#334155', fontSize: '0.8rem', lineHeight: '1.6', maxWidth: '200px' }}>
              Building productivity tools for modern Indian businesses.
            </p>
          </div>

          {/* Products */}
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Products</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink href="https://tasks.sngadvisors.com">Planora</FooterLink>
              <FooterLink href="https://fms.sngadvisors.com">FlowOS</FooterLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Company</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Legal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Refund Policy</FooterLink>
            </div>
          </div>
        </div>

        <div style={{
          borderTop:    '1px solid #1E2240',
          paddingTop:   '1.5rem',
          display:      'flex',
          justifyContent: 'space-between',
          alignItems:   'center',
          flexWrap:     'wrap',
          gap:          '0.5rem',
        }}>
          <p style={{ color: '#1E3A5F', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} SNG Advisors. All rights reserved.
          </p>
          <p style={{ color: '#1E3A5F', fontSize: '0.8rem' }}>
            Made with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ color: '#334155', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
    >
      {children}
    </Link>
  )
}
