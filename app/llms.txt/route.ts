import { buildLlmsTxt } from '@/lib/llm/llms-txt'
import { plainTextResponse } from '@/lib/llm/markdown-response'

export const dynamic = 'force-static'

export const GET = (): Response => plainTextResponse(buildLlmsTxt())
