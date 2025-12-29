import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId)
  if (!section) {
    console.warn(`Section with id "${sectionId}" not found`)
    return
  }

  if (sectionId === 'hero') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    return
  }

  const SCROLL_OFFSET = 80
  const sectionTop = section.offsetTop

  window.scrollTo({
    top: sectionTop - SCROLL_OFFSET,
    behavior: 'smooth'
  })
}
