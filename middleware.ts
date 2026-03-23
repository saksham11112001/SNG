import { NextRequest, NextResponse } from 'next/server'

const PROTECTED  = ['/dashboard']
const AUTH_PAGES = ['/login', '/signup']

function getProjectRef(url: string) {
  return url.replace('https://', '').split('.')[0]
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const projectRef = getProjectRef(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  )

  const authCookie =
    request.cookies.get(`sb-${projectRef}-auth-token`) ??
    request.cookies.get(`sb-${projectRef}-auth-token.0`)

  const isLoggedIn = !!authCookie

  if (PROTECTED.some((p) => pathname.startsWith(p)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (AUTH_PAGES.some((p) => pathname.startsWith(p)) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
