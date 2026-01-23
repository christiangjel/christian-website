'use client'

import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/utils'
import { type SectionId } from '@/constants'

/**
 * Custom hook for handling navigation clicks to different sections of the page.
 * It ensures smooth scrolling and handles navigation to the home page if currently on a different route.
 * Updates URL immediately to prevent race conditions with scroll sync.
 *
 * @returns An object containing the `handleNavClick` function.
 */
export const useNavigation = () => {
  const pathname = usePathname()

  const handleNavClick = (href: SectionId) => {
    // If not on home page, navigate there first
    if (pathname !== '/') {
      window.location.href = `/#${href}`
      return
    }

    // Update URL immediately to prevent race condition
    window.history.replaceState(null, '', `#${href}`)

    // Signal that a programmatic scroll is starting
    window.dispatchEvent(
      new CustomEvent('programmatic-scroll-start', {
        detail: { targetSection: href }
      })
    )

    // Then perform the smooth scroll
    scrollToSection(href)
  }

  return { handleNavClick }
}
