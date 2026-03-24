import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code       = searchParams.get('code')
  const next       = searchParams.get('next') ?? '/dashboard'
  const redirectTo = searchParams.get('redirect')
  const errorMsg   = searchParams.get('error_description')

  if (errorMsg) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorMsg)}`)
  }

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const destination = redirectTo ?? `${origin}${next}`
      return NextResponse.redirect(destination)
    }
  }

  return NextResponse.redirect(`${origin}/login`)
}