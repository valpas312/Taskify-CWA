import { NextResponse } from 'next/server'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs/server'

export default authMiddleware({
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
    // Redirect signed in users to organization selection page if they are not active in an organization
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/select-org') {
      const orgSelection = new URL('/select-org', req.url)
      return NextResponse.redirect(orgSelection)
    }
    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }
    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}