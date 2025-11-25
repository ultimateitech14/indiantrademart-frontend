// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// subdomain -> path mapping
const SUBDOMAIN_MAP: Record<string, string> = {
  vendor: '/vendor',
  buyer: '/buyer',
  emp: '/employee',
  employee: '/employee',
  user: '/user',        // agar /user route hai
  dir: '/directory',
  man: '/management',
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // host: e.g. vendor.indiantrademart.com
  const host = req.headers.get('host') || ''
  const hostname = host.split(':')[0]      // dev mode :3000 hataane ke liye
  const subdomain = hostname.split('.')[0] // "vendor"

  const targetPath = SUBDOMAIN_MAP[subdomain]

  if (targetPath && !url.pathname.startsWith(targetPath)) {
    const extra = url.pathname === '/' ? '' : url.pathname
    url.pathname = targetPath + extra
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// static assets par middleware mat chalana
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
