// app/(auth)/callback/route.ts
// ─────────────────────────────────────────────────────────────
// Supabase calls this URL after magic link / OAuth login.
// It exchanges the code for a session, sets the shared cookie,
// then redirects the user to their dashboard.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code     = searchParams.get('code')
  const next     = searchParams.get('next') ?? '/dashboard'
  const errorMsg = searchParams.get('error_description')

  // If Supabase returned an error (e.g. expired link)
  if (errorMsg) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorMsg)}`)
  }

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to dashboard (or whatever ?next= says)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Something went wrong — send back to login
  return NextResponse.redirect(`${origin}/login?error=Auth+failed`)
}
