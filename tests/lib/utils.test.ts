import { describe, it, expect, vi, beforeEach } from 'vitest'
import { scrollToSection } from '@/lib/utils'
import { SECTIONS } from '@/constants'
import { logger } from '@/lib/logger'

// Mock window.scrollTo with proper typing for both overloads
const mockScrollTo = vi.fn<[number | ScrollToOptions, number?], void>()
global.window.scrollTo = mockScrollTo as typeof window.scrollTo

describe('scrollToSection', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
    vi.spyOn(logger, 'warn').mockImplementation(() => {})
  })

  it('should scroll to hero section (top)', () => {
    // Create hero section element so function doesn't return early
    const heroSection = document.createElement('div')
    heroSection.id = SECTIONS.HERO
    document.body.appendChild(heroSection)

    scrollToSection(SECTIONS.HERO)
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('should scroll to section with offset', () => {
    const section = document.createElement('div')
    section.id = SECTIONS.ABOUT
    document.body.appendChild(section)

    // Mock offsetTop since it's 0 for elements not in document flow
    Object.defineProperty(section, 'offsetTop', {
      value: 1000,
      writable: false
    })

    scrollToSection(SECTIONS.ABOUT)
    expect(mockScrollTo).toHaveBeenCalled()
    const call = mockScrollTo.mock.calls[0][0] as ScrollToOptions
    expect(call.top).toBe(1000 - 80) // SCROLL_CONFIG.OFFSET is 80
    expect(call.behavior).toBe('smooth')
  })

  it('should handle missing section gracefully', () => {
    scrollToSection('non-existent')
    expect(logger.warn).toHaveBeenCalledWith('Section not found', {
      sectionId: 'non-existent'
    })
  })
})
