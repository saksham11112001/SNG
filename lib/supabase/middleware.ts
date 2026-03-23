import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const SNG_LOGIN_URL = process.env.NEXT_PUBLIC_SNG_LOGIN_URL ?? 'http://localhost:3000/login'
const PLANORA_URL   = process.env.NEXT_PUBLIC_PLANORA_URL   ?? 'http://localhost:3001'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({ request })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(toSet) {
            toSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            toSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const loginUrl = new URL(SNG_LOGIN_URL)
      loginUrl.searchParams.set('redirect', `${PLANORA_URL}${pathname}`)
      return NextResponse.redirect(loginUrl)
    }
  } catch (e) {
    console.error('Middleware error:', e)
    return NextResponse.next()
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
