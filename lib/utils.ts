import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    const offset = 80
    const sectionTop = section.offsetTop
    window.scrollTo({
      top: sectionTop - offset,
      behavior: 'smooth'
    })
  }
}
