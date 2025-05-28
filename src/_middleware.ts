// import { cookies } from 'next/headers'
// import { NextRequest, NextResponse } from 'next/server'

// export async function middleware(request: NextRequest) {
//   const cookie = await cookies()
//   const sessionToken = cookie.has('sessionId')
//   const accessToken = cookie.has('accessToken')
//   const sessionTokenValue = cookie.get('sessionId')?.value

//   if (!sessionTokenValue) {
//     cookie.delete('sessionId')
//   }

//   const privateRoutes = ['/tasks']

//   const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname)

//   const isAuthPage =
//     request.nextUrl.pathname === '/auth/sign-in' ||
//     request.nextUrl.pathname === '/auth/sign-up'

//   if (sessionToken && isAuthPage) {
//     return NextResponse.redirect(new URL('/tasks', request.url))
//   }

//   if (isPrivateRoute && !sessionToken) {
//     return NextResponse.redirect(new URL('/auth/sign-in', request.url))
//   }

//   if (!accessToken && request.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/auth/sign-in', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }
