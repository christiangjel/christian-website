import { content } from '@/lib/content'

/**
 * Maps API and transport errors to user-facing assistant messages.
 */
export const getAssistantErrorMessage = (
  error: Error | undefined
): string | null => {
  if (!error) {
    return null
  }

  const message = error.message.toLowerCase()

  if (message.includes('rate_limit') || message.includes('429')) {
    return content.assistant.errors.rateLimit
  }

  if (message.includes('unavailable') || message.includes('503')) {
    return content.assistant.errors.unavailable
  }

  if (message.includes('max_messages')) {
    return content.assistant.errors.maxMessages
  }

  return content.assistant.errors.generic
}
