import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')
    const isPhotographerRoute = req.nextUrl.pathname.startsWith('/photographer')
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Redirect unauthenticated users to sign in
    if (!isAuth && (isDashboard || isPhotographerRoute || isAdminRoute)) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${encodeURIComponent(from)}`, req.url)
      )
    }

    // Check email verification for protected routes
    if (isAuth && token && !token.isVerified && (isDashboard || isPhotographerRoute)) {
      return NextResponse.redirect(
        new URL(`/auth/verify-email?email=${encodeURIComponent(token.email || '')}`, req.url)
      )
    }

    // Role-based access control
    if (isAuth && token) {
      // Admin routes - only for admin users
      if (isAdminRoute && token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      // Photographer routes - only for photographers
      if (isPhotographerRoute && token.role !== 'PHOTOGRAPHER') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        const publicRoutes = [
          '/',
          '/about',
          '/contact',
          '/privacy',
          '/terms',
          '/photographers',
          '/how-it-works',
        ]

        const isPublicRoute = publicRoutes.some(route => 
          req.nextUrl.pathname === route || 
          req.nextUrl.pathname.startsWith('/photographers/')
        )

        if (isPublicRoute) {
          return true
        }

        // Allow access to auth pages
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return true
        }

        // Require authentication for protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
