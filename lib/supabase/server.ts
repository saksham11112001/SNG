// lib/supabase/server.ts
// ─────────────────────────────────────────────────────────────
// Server-side Supabase client.
// Sets cookies on .sngadvisors.com so Planora and FlowOS
// (on their subdomains) automatically receive the session.
// ─────────────────────────────────────────────────────────────

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// COOKIE_DOMAIN:
//   Production → .sngadvisors.com  (the leading dot makes it apply to all subdomains)
//   Local dev  → localhost          (subdomains don't share cookies on localhost — see INSTALL.md)
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN ?? 'localhost'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain:   COOKIE_DOMAIN,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge:   60 * 60 * 24 * 7, // 7 days
      },
      cookies: {
        getAll()         { return cookieStore.getAll() },
        setAll(toSet)    {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                domain:   COOKIE_DOMAIN,
                secure:   process.env.NODE_ENV === 'production',
                sameSite: 'lax',
              })
            )
          } catch {
            // Server Component — cookie writes silently ignored here
          }
        },
      },
    }
  )
}

// Lightweight helper — returns { user } or { user: null }
export async function getUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { user }
}
