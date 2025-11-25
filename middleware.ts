// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // DEBUG: log to server console (Netlify logs)
  console.log('MIDDLEWARE HIT:', url.href)

  // Force EVERY request to /vendor
  url.pathname = '/vendor'
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
