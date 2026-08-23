const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
} as const

/**
 * Returns a Markdown HTTP response with standard headers.
 */
export const markdownResponse = (body: string): Response =>
  new Response(body, { headers: MARKDOWN_HEADERS })

/**
 * Returns a plain-text HTTP response with standard headers.
 */
export const plainTextResponse = (body: string): Response =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
