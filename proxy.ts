import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const session = req.auth
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (pathname === '/auth/signin' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
