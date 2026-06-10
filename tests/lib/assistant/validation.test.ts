import { describe, expect, it } from 'vitest'
import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { validateChatMessages } from '@/lib/assistant/validation'

const createUserMessage = (text: string) => ({
  id: '1',
  role: 'user' as const,
  parts: [{ type: 'text' as const, text }],
})

describe('validateChatMessages', () => {
  it('accepts valid user messages', () => {
    const result = validateChatMessages([createUserMessage('Tell me about React')])

    expect(result).toEqual({ valid: true })
  })

  it('rejects non-array input', () => {
    const result = validateChatMessages({ messages: [] })

    expect(result).toEqual({ valid: false, error: 'invalid_messages' })
  })

  it('rejects empty message arrays', () => {
    const result = validateChatMessages([])

    expect(result).toEqual({ valid: false, error: 'max_messages' })
  })

  it('rejects conversations that exceed the message limit', () => {
    const messages = Array.from(
      { length: ASSISTANT_CONFIG.MAX_MESSAGES + 1 },
      (_, index) => createUserMessage(`Message ${index}`)
    )

    const result = validateChatMessages(messages)

    expect(result).toEqual({ valid: false, error: 'max_messages' })
  })

  it('rejects messages that exceed the max length', () => {
    const longText = 'a'.repeat(ASSISTANT_CONFIG.MAX_MESSAGE_LENGTH + 1)
    const result = validateChatMessages([createUserMessage(longText)])

    expect(result).toEqual({ valid: false, error: 'message_too_long' })
  })

  it('rejects empty user messages', () => {
    const result = validateChatMessages([createUserMessage('   ')])

    expect(result).toEqual({ valid: false, error: 'empty_message' })
  })

  it('rejects malformed messages', () => {
    const result = validateChatMessages([{ role: 'user', parts: 'invalid' }])

    expect(result).toEqual({ valid: false, error: 'invalid_messages' })
  })
})
