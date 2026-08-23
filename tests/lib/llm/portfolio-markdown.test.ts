import { describe, it, expect } from 'vitest'
import { buildPortfolioMarkdown } from '@/lib/llm/portfolio-markdown'
import { buildLlmsTxt } from '@/lib/llm/llms-txt'
import { SITE_CONFIG } from '@/constants'

describe('buildPortfolioMarkdown', () => {
  it('includes core portfolio sections and contact details', () => {
    const markdown = buildPortfolioMarkdown()

    expect(markdown).toContain('# Christian Gjelstrup | Frontend Engineer')
    expect(markdown).toContain('## About Me')
    expect(markdown).toContain('## Core Expertise')
    expect(markdown).toContain('## Career Highlights')
    expect(markdown).toContain('## Featured Projects')
    expect(markdown).toContain('## Get in Touch')
    expect(markdown).toContain('hi@christian-gjelstrup.com')
    expect(markdown).toContain(SITE_CONFIG.BASE_URL)
    expect(markdown).toContain('## Professional profile')
  })
})

describe('buildLlmsTxt', () => {
  it('follows llms.txt structure with key links', () => {
    const llmsTxt = buildLlmsTxt()

    expect(llmsTxt.startsWith('# Christian Gjelstrup')).toBe(true)
    expect(llmsTxt).toContain('> Portfolio of Christian Gjelstrup')
    expect(llmsTxt).toContain(`${SITE_CONFIG.BASE_URL}/index.md`)
    expect(llmsTxt).toContain(`${SITE_CONFIG.BASE_URL}/llms-full.txt`)
    expect(llmsTxt).toContain('## Contact')
    expect(llmsTxt).toContain('hi@christian-gjelstrup.com')
  })
})
