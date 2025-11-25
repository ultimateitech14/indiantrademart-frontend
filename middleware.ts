import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SUBDOMAIN_MAP: Record<string, string> = {
  vendor: '/vendor',
  buyer: '/buyer',
  emp: '/employee',
  employee: '/employee',
  user: '/user',
  dir: '/directory',
  man: '/management',
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const host = req.headers.get('host') || ''
  const hostname = host.split(':')[0]
  const subdomain = hostname.split('.')[0]

  const targetPath = SUBDOMAIN_MAP[subdomain]

  if (targetPath && !url.pathname.startsWith(targetPath)) {
    const extra = url.pathname === '/' ? '' : url.pathname
    url.pathname = targetPath + extra
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
