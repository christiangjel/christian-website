import { describe, expect, it } from 'vitest'
import assistantContextData from '@/data/assistant-context.json'
import {
  assistantContextSchema,
  parseAssistantContext,
} from '@/lib/assistant/validate-context'

describe('parseAssistantContext', () => {
  it('parses the committed assistant context file', () => {
    const context = parseAssistantContext(assistantContextData)

    expect(context.profile.summary).toContain('Senior freelance frontend developer')
    expect(context.freelance.since).toBe('September 2014')
  })

  it('allows additional nested sections via passthrough', () => {
    const context = parseAssistantContext(assistantContextData)

    expect(context).toHaveProperty('portfolioWebsite')
    expect(context).toHaveProperty('employerReferences')
  })

  it('rejects invalid context shape', () => {
    expect(() =>
      parseAssistantContext({
        profile: { summary: 'Missing urls' },
        freelance: { since: '2014', availability: 'Open' },
      })
    ).toThrow()

    expect(assistantContextSchema.safeParse({}).success).toBe(false)
  })
})
