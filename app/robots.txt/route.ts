import { SITE_CONFIG } from '@/constants'
import { plainTextResponse } from '@/lib/llm/markdown-response'

export const dynamic = 'force-static'

export const GET = (): Response =>
  plainTextResponse(`User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=yes

Sitemap: ${SITE_CONFIG.BASE_URL}/sitemap.xml
`)
