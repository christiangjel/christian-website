'use client'

import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/utils'
import { type SectionId } from '@/constants'

/**
 * Custom hook for handling navigation clicks to different sections of the page.
 * Updates the URL hash on click so deep links and share URLs work; smooth-scrolls to the section.
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

    // Update URL hash so link is shareable and matches section
    window.history.replaceState(null, '', `#${href}`)

    scrollToSection(href)
  }

  return { handleNavClick }
}
