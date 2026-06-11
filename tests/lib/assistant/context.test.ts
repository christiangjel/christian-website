import { describe, expect, it } from 'vitest'
import { buildSystemPrompt } from '@/lib/assistant/context'
import { content } from '@/lib/content'

describe('buildSystemPrompt', () => {
  it('includes system instructions and portfolio context', () => {
    const prompt = buildSystemPrompt()

    expect(prompt).toContain('portfolio assistant for Christian Gjelstrup')
    expect(prompt).toContain('Portfolio context (JSON):')
    expect(prompt).toContain(content.about.title)
    expect(prompt).toContain(content.skills.title)
    expect(prompt).toContain(content.experience.title)
    expect(prompt).toContain(content.projects.title)
    expect(prompt).toContain(content.contact.email)
  })

  it('instructs the model to stay grounded in context', () => {
    const prompt = buildSystemPrompt()

    expect(prompt).toContain('Answer ONLY using the portfolio and supplementary context')
    expect(prompt).toContain('Do not invent projects')
  })

  it('includes supplementary CV and LinkedIn context', () => {
    const prompt = buildSystemPrompt()

    expect(prompt).toContain('Assistant context (JSON):')
    expect(prompt).toContain('Payload CMS')
    expect(prompt).toContain('McDonald\'s Schmecktakel 2013')
    expect(prompt).toContain('TanStack Query')
    expect(prompt).toContain('https://github.com/christiangjel')
    expect(prompt).toContain('Katharina Grujic')
    expect(prompt).toContain('MapTiler')
    expect(prompt).toContain('Next.js')
    expect(prompt).toContain('portfolioWebsite')
  })
})
