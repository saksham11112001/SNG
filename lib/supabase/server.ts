import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
        sameSite: 'lax' as const,
        maxAge:   60 * 60 * 24 * 7,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(toSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...(options as Record<string, unknown>),
                domain:   COOKIE_DOMAIN,
                secure:   process.env.NODE_ENV === 'production',
                sameSite: 'lax' as const,
              })
            )
          } catch {
            // Server Component — safe to ignore
          }
        },
      },
    }
  )
}

export async function getUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { user }
}
