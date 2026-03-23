import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SNG Advisors — Build Smarter, Work Better',
  description: 'SNG Advisors builds productivity tools for modern teams. Planora for project management. FlowOS for process flow management.',
  metadataBase: new URL('https://sngadvisors.com'),
  openGraph: {
    title: 'SNG Advisors',
    description: 'Productivity tools for modern teams.',
    url: 'https://sngadvisors.com',
    siteName: 'SNG Advisors',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
