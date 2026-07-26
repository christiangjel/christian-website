'use client'

import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/utils'
import {
  isLocaleHomePath,
  localizePath,
  type SectionId,
} from '@/constants'
import { useLocale } from '@/components/layout/locale/locale-provider'

/**
 * Custom hook for handling navigation clicks to different sections of the page.
 * Updates the URL hash on click so deep links and share URLs work; smooth-scrolls to the section.
 *
 * @returns An object containing the `handleNavClick` function.
 */
export const useNavigation = () => {
  const pathname = usePathname()
  const { locale } = useLocale()

  const handleNavClick = (href: SectionId) => {
    if (!isLocaleHomePath(pathname)) {
      window.location.href = localizePath(locale, href)
      return
    }

    window.history.replaceState(null, '', localizePath(locale, href))
    scrollToSection(href)
  }

  return { handleNavClick }
}
