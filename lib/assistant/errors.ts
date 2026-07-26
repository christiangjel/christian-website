import type { Content } from '@/types/content'
import { content as defaultContent } from '@/lib/content'

/**
 * Maps API and transport errors to user-facing assistant messages.
 *
 * @param error - Chat transport error
 * @param errors - Localised assistant error strings
 */
export const getAssistantErrorMessage = (
  error: Error | undefined,
  errors: Content['assistant']['errors'] = defaultContent.assistant.errors
): string | null => {
  if (!error) {
    return null
  }

  const message = error.message.toLowerCase()

  if (message.includes('rate_limit') || message.includes('429')) {
    return errors.rateLimit
  }

  if (
    message.includes('quota') ||
    message.includes('billing') ||
    message.includes('exceeded your current')
  ) {
    return errors.quotaExceeded
  }

  if (message.includes('unavailable') || message.includes('503')) {
    return errors.unavailable
  }

  if (message.includes('max_messages')) {
    return errors.maxMessages
  }

  return errors.generic
}
