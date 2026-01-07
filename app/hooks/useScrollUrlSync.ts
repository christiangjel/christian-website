'use client'

import { useEffect } from 'react'

interface ScrollSection {
  id: string
  element: HTMLElement
  offsetTop: number
}

const SCROLL_OFFSET = 100
const THROTTLE_DELAY = 100

export const useScrollUrlSync = (): void => {
  useEffect(() => {
    const sections: ScrollSection[] = []
    let throttleTimer: NodeJS.Timeout | null = null

    // Initialize sections
    const initializeSections = (): void => {
      const sectionIds = [
        'hero',
        'about',
        'skills',
        'projects',
        'experience',
        'education',
        'contact'
      ]

      sections.length = 0 // Clear existing sections

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          sections.push({
            id,
            element,
            offsetTop: element.offsetTop
          })
        }
      })
    }

    const updateActiveSection = (): void => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET

      // Find the current section
      const currentSection = sections
        .slice()
        .reverse()
        .find((section) => scrollPosition >= section.offsetTop)

      if (currentSection) {
        const newUrl = `#${currentSection.id}`
        if (window.location.hash !== newUrl) {
          window.history.replaceState(null, '', newUrl)
        }
      }
    }

    const handleScroll = (): void => {
      if (throttleTimer) {
        clearTimeout(throttleTimer)
      }

      throttleTimer = setTimeout(updateActiveSection, THROTTLE_DELAY)
    }

    // Initialize sections on mount
    initializeSections()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Update sections on resize (in case layout changes)
    const handleResize = (): void => {
      initializeSections()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (throttleTimer) {
        clearTimeout(throttleTimer)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}


