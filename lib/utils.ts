import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SCROLL_CONFIG, SECTIONS } from '@/constants'
import { logger } from './logger'

/**
 * Utility function to merge Tailwind CSS classes with clsx and tailwind-merge.
 * Handles conflicts and ensures proper class ordering.
 *
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Sets up scroll completion detection using scrollend event or fallback timeout.
 * Dispatches 'programmatic-scroll-end' event when scroll animation completes.
 *
 * @param scrollTarget - The target scroll position (in pixels)
 * @param currentScrollY - The current scroll position before scrolling
 */
const setupScrollEndDetection = (
  scrollTarget: number,
  currentScrollY: number
): void => {
  const handleScrollEnd = (): void => {
    window.dispatchEvent(new CustomEvent('programmatic-scroll-end'))
  }

  if ('onscrollend' in window) {
    // scrollend is supported - use it for accurate detection
    ;(
      window as unknown as { addEventListener: typeof window.addEventListener }
    ).addEventListener('scrollend', handleScrollEnd, { once: true })
  } else {
    // Fallback: calculate timeout based on scroll distance
    // Roughly 1ms per 1px, with minimum of 600ms
    const scrollDistance = Math.abs(currentScrollY - scrollTarget)
    const timeout = Math.max(600, scrollDistance + 200)
    setTimeout(handleScrollEnd, timeout)
  }
}

/**
 * Smoothly scrolls to a section by its ID.
 * Uses a configurable offset to account for fixed header.
 * Signals scroll completion after animation to re-enable scroll sync.
 *
 * @param sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId)
  if (!section) {
    logger.warn('Section not found', { sectionId })
    return
  }

  const currentScrollY = window.scrollY
  let scrollTarget: number

  if (sectionId === SECTIONS.HERO) {
    scrollTarget = 0
  } else {
    scrollTarget = section.offsetTop - SCROLL_CONFIG.OFFSET
  }

  window.scrollTo({
    top: scrollTarget,
    behavior: 'smooth'
  })

  setupScrollEndDetection(scrollTarget, currentScrollY)
}

/**
 * Obfuscates email address to prevent spam bots.
 * Replaces @ with (at) and adds zero-width space.
 *
 * @param email - Email address to obfuscate
 * @returns Obfuscated email string
 */
export const obfuscateEmail = (email: string): string => {
  return email.replace('@', '(at)\u200B')
}

/**
 * Debounce function to limit how often a function can be called.
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}
