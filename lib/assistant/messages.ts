import type { UIMessage } from 'ai'

/**
 * Narrows unknown message payloads to UIMessage shape.
 */
export const isUIMessage = (value: unknown): value is UIMessage => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  if (!('role' in value) || !('parts' in value)) {
    return false
  }

  const { role, parts } = value

  if (role !== 'user' && role !== 'assistant') {
    return false
  }

  return Array.isArray(parts)
}

/**
 * Extracts plain text from a UI message's text parts.
 */
export const getMessageText = (message: UIMessage): string => {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')
}
