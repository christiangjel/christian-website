import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { getMessageText, isUIMessage } from '@/lib/assistant/messages'

export type ChatValidationError =
  | 'invalid_messages'
  | 'max_messages'
  | 'message_too_long'
  | 'empty_message'

export type ChatValidationResult =
  | { valid: true }
  | { valid: false; error: ChatValidationError }

/**
 * Validates incoming chat messages against assistant constraints.
 */
export const validateChatMessages = (
  messages: unknown
): ChatValidationResult => {
  if (!Array.isArray(messages)) {
    return { valid: false, error: 'invalid_messages' }
  }

  if (messages.length === 0 || messages.length > ASSISTANT_CONFIG.MAX_MESSAGES) {
    return { valid: false, error: 'max_messages' }
  }

  for (const message of messages) {
    if (!isUIMessage(message)) {
      return { valid: false, error: 'invalid_messages' }
    }

    const text = getMessageText(message).trim()

    if (message.role === 'user' && text.length === 0) {
      return { valid: false, error: 'empty_message' }
    }

    if (text.length > ASSISTANT_CONFIG.MAX_MESSAGE_LENGTH) {
      return { valid: false, error: 'message_too_long' }
    }
  }

  return { valid: true }
}
