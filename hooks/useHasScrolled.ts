'use client'

import { useEffect, useState } from 'react'

/**
 * Becomes true after the user scrolls (or if the page loads already scrolled).
 * Used to defer below-hero section reveals until intentional scroll.
 */
export const useHasScrolled = (): boolean => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
      return
    }

    const handleScroll = (): void => {
      setHasScrolled(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true, once: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return hasScrolled
}
