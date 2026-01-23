'use client'

import { useEffect } from 'react'
import { SCROLL_CONFIG, SECTION_IDS, ANIMATION_CONFIG } from '@/constants'
import { debounce } from '@/lib/utils'

type ScrollSection = {
  id: string
  element: HTMLElement
  offsetTop: number
}

/**
 * Custom hook that synchronizes the URL hash with the current scroll position.
 * Updates the URL hash as the user scrolls through sections.
 * Uses throttling to optimize performance.
 * Temporarily disables during programmatic scrolls to prevent race conditions.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useScrollUrlSync()
 *   return <div>...</div>
 * }
 * ```
 */
export const useScrollUrlSync = (): void => {
  useEffect(() => {
    const sections: ScrollSection[] = []
    let throttleTimer: NodeJS.Timeout | null = null
    let isProgrammaticScroll = false // Flag to disable sync during programmatic scrolls
    let targetSectionId: string | null = null // Track target section from programmatic scroll

    // Initialize sections
    const initializeSections = (): void => {
      const sectionIds = SECTION_IDS

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
      // Skip URL updates during programmatic scrolls
      if (isProgrammaticScroll) {
        return
      }

      const scrollPosition = window.scrollY + SCROLL_CONFIG.OFFSET

      // Sort sections by offsetTop for proper order
      const sortedSections = [...sections].sort(
        (a, b) => a.offsetTop - b.offsetTop
      )

      // If we have a target section from programmatic scroll, prioritize it if close
      let currentSection: ScrollSection | undefined
      if (targetSectionId) {
        const targetSection = sortedSections.find(
          (s) => s.id === targetSectionId
        )
        if (targetSection) {
          const distanceToTarget = Math.abs(
            scrollPosition - targetSection.offsetTop
          )
          if (distanceToTarget <= 200) {
            currentSection = targetSection
          }
        }
      }

      // If no target section or not close enough, find the closest section
      if (!currentSection) {
        let closestSection: ScrollSection | undefined
        let minDistance = Infinity

        for (const section of sortedSections) {
          const distance = Math.abs(scrollPosition - section.offsetTop)
          if (distance < minDistance) {
            minDistance = distance
            closestSection = section
          }
        }

        currentSection = closestSection
      }

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

      throttleTimer = setTimeout(
        updateActiveSection,
        SCROLL_CONFIG.THROTTLE_DELAY
      )
    }

    // Listen for programmatic scroll events
    const handleProgrammaticScrollStart = (event: Event): void => {
      const customEvent = event as CustomEvent<{ targetSection: string }>
      const target = customEvent.detail?.targetSection || null
      isProgrammaticScroll = true
      targetSectionId = target
    }

    const handleProgrammaticScrollEnd = (): void => {
      // Re-enable after a short delay to ensure scroll animation completed
      setTimeout(() => {
        isProgrammaticScroll = false
        // Update URL once after scroll completes to ensure accuracy
        updateActiveSection()
        // Clear target section after detection
        targetSectionId = null
      }, 100)
    }

    // Initialize sections on mount
    initializeSections()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Listen for programmatic scroll events
    window.addEventListener(
      'programmatic-scroll-start',
      handleProgrammaticScrollStart
    )
    window.addEventListener(
      'programmatic-scroll-end',
      handleProgrammaticScrollEnd
    )

    // Update sections on resize (in case layout changes)
    // Debounce resize handler to avoid excessive recalculations
    const handleResize = debounce(() => {
      initializeSections()
    }, ANIMATION_CONFIG.RESIZE_DEBOUNCE_DELAY)

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (throttleTimer) {
        clearTimeout(throttleTimer)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener(
        'programmatic-scroll-start',
        handleProgrammaticScrollStart
      )
      window.removeEventListener(
        'programmatic-scroll-end',
        handleProgrammaticScrollEnd
      )
    }
  }, [])
}
