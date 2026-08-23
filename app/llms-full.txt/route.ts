import { buildPortfolioMarkdown } from '@/lib/llm/portfolio-markdown'
import { markdownResponse } from '@/lib/llm/markdown-response'

export const dynamic = 'force-static'

export const GET = (): Response => markdownResponse(buildPortfolioMarkdown())
