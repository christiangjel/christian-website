import { describe, expect, it } from 'vitest'
import { getAssistantErrorMessage } from '@/lib/assistant/errors'
import { content } from '@/lib/content'

describe('getAssistantErrorMessage', () => {
  it('returns null when there is no error', () => {
    expect(getAssistantErrorMessage(undefined)).toBeNull()
  })

  it('maps rate limit errors', () => {
    expect(
      getAssistantErrorMessage(new Error('rate_limit exceeded'))
    ).toBe(content.assistant.errors.rateLimit)
    expect(getAssistantErrorMessage(new Error('HTTP 429'))).toBe(
      content.assistant.errors.rateLimit
    )
  })

  it('maps Gemini quota errors', () => {
    expect(
      getAssistantErrorMessage(
        new Error(
          'You exceeded your current quota, please check your plan and billing details.'
        )
      )
    ).toBe(content.assistant.errors.quotaExceeded)
  })

  it('maps unavailable errors', () => {
    expect(
      getAssistantErrorMessage(new Error('Service unavailable'))
    ).toBe(content.assistant.errors.unavailable)
    expect(getAssistantErrorMessage(new Error('HTTP 503'))).toBe(
      content.assistant.errors.unavailable
    )
  })

  it('maps max message errors', () => {
    expect(getAssistantErrorMessage(new Error('max_messages'))).toBe(
      content.assistant.errors.maxMessages
    )
  })

  it('falls back to generic error message', () => {
    expect(getAssistantErrorMessage(new Error('Network failure'))).toBe(
      content.assistant.errors.generic
    )
  })
})
