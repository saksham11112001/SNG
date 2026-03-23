import { createServerClient } from '@supabase/ssr'
import type { NextRequest, NextResponse } from 'next/server'

const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN ?? 'localhost'

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: COOKIE_DOMAIN,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 60 * 60 * 24 * 7,
      },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(toSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          toSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              ...(options as Record<string, unknown>),
              domain: COOKIE_DOMAIN,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const,
            })
          )
        },
      },
    }
  )

  await supabase.auth.getUser()
  return response
}