import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { convertToModelMessages, streamText } from 'ai'
import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/constants/locales'
import { buildSystemPrompt } from '@/lib/assistant/context'
import { checkRateLimit, getClientIp } from '@/lib/assistant/rate-limit'
import {
  getMessagesFromChatBody,
  validateChatMessages,
} from '@/lib/assistant/validation'
import { logger } from '@/lib/logger'

const getGoogleModel = () => {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return null
  }

  const google = createGoogleGenerativeAI({ apiKey })

  return google(ASSISTANT_CONFIG.MODEL_ID)
}

/**
 * Extracts an optional locale from the chat request body.
 */
const getLocaleFromChatBody = (body: unknown): Locale => {
  if (typeof body !== 'object' || body === null || !('locale' in body)) {
    return DEFAULT_LOCALE
  }

  const locale = Reflect.get(body, 'locale')

  return isLocale(locale) ? locale : DEFAULT_LOCALE
}

export async function POST(request: Request): Promise<Response> {
  try {
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp)

    if (!rateLimitResult.success) {
      return Response.json({ error: 'rate_limit' }, { status: 429 })
    }

    const model = getGoogleModel()

    if (!model) {
      logger.warn('Portfolio assistant unavailable: missing GEMINI_API_KEY')
      return Response.json({ error: 'unavailable' }, { status: 503 })
    }

    const body: unknown = await request.json()
    const validation = validateChatMessages(getMessagesFromChatBody(body))

    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 400 })
    }

    const locale = getLocaleFromChatBody(body)

    const result = streamText({
      model,
      system: buildSystemPrompt(locale),
      messages: await convertToModelMessages(validation.messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    logger.error('Portfolio assistant chat request failed', { error })

    return Response.json({ error: 'generic' }, { status: 500 })
  }
}
