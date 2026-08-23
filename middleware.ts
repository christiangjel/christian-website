import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MARKDOWN_LINK = '</index.md>; rel="alternate"; type="text/markdown"'

const shouldSkipMarkdownLink = (pathname: string): boolean =>
  pathname.startsWith('/api') ||
  pathname.startsWith('/_next') ||
  pathname === '/robots.txt' ||
  pathname === '/sitemap.xml' ||
  pathname === '/llms.txt' ||
  pathname === '/llms-full.txt' ||
  pathname === '/index.md' ||
  /\.[a-z0-9]+$/i.test(pathname)

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  if (shouldSkipMarkdownLink(pathname)) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  response.headers.set('Link', MARKDOWN_LINK)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
