import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const refreshToken = request.cookies.get("sb-refresh-token")
  const accessToken = request.cookies.get("sb-access-token")

  if (refreshToken && accessToken)
    return response

  return NextResponse.redirect(new URL('/signin', request.url))
}

export const config = {
  matcher: '/notes/:path*',
}
