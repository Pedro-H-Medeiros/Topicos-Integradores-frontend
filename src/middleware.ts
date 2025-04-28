import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = await cookies()
  const sessionToken = cookie.has('sessionId')
  const sessionTokenValue = cookie.get('sessionId')?.value

  if (!sessionTokenValue) {
    cookie.delete('sessionId')
  }

  const publicRoutes = ['/auth/sign-in', '/auth/sign-up']

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  const isAuthPage =
    request.nextUrl.pathname === '/auth/sign-in' ||
    request.nextUrl.pathname === '/auth/sign-up'

  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
