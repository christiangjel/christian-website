import type { UIMessage } from 'ai'
import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { getMessageText, isUIMessage } from '@/lib/assistant/messages'

export const CHAT_VALIDATION_ERRORS = {
  INVALID_MESSAGES: 'invalid_messages',
  MAX_MESSAGES: 'max_messages',
  MESSAGE_TOO_LONG: 'message_too_long',
  EMPTY_MESSAGE: 'empty_message',
} as const

export type ChatValidationError =
  (typeof CHAT_VALIDATION_ERRORS)[keyof typeof CHAT_VALIDATION_ERRORS]

export type ChatValidationResult =
  | { valid: true; messages: UIMessage[] }
  | { valid: false; error: ChatValidationError }

/**
 * Extracts the messages field from a parsed chat request body.
 */
export const getMessagesFromChatBody = (body: unknown): unknown => {
  if (typeof body !== 'object' || body === null || !('messages' in body)) {
    return undefined
  }

  return Reflect.get(body, 'messages')
}

/**
 * Validates incoming chat messages against assistant constraints.
 */
export const validateChatMessages = (
  messages: unknown
): ChatValidationResult => {
  if (!Array.isArray(messages)) {
    return {
      valid: false,
      error: CHAT_VALIDATION_ERRORS.INVALID_MESSAGES,
    }
  }

  if (messages.length === 0 || messages.length > ASSISTANT_CONFIG.MAX_MESSAGES) {
    return { valid: false, error: CHAT_VALIDATION_ERRORS.MAX_MESSAGES }
  }

  const validatedMessages: UIMessage[] = []

  for (const message of messages) {
    if (!isUIMessage(message)) {
      return {
        valid: false,
        error: CHAT_VALIDATION_ERRORS.INVALID_MESSAGES,
      }
    }

    const text = getMessageText(message).trim()

    if (message.role === 'user' && text.length === 0) {
      return { valid: false, error: CHAT_VALIDATION_ERRORS.EMPTY_MESSAGE }
    }

    if (text.length > ASSISTANT_CONFIG.MAX_MESSAGE_LENGTH) {
      return { valid: false, error: CHAT_VALIDATION_ERRORS.MESSAGE_TOO_LONG }
    }

    validatedMessages.push(message)
  }

  return { valid: true, messages: validatedMessages }
}
