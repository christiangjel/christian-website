'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/utils'

interface NavigationItem {
  title: string
  href: string
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
] as const

const MainNav = (): React.JSX.Element => {
  const pathname = usePathname()

  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      
      // If not on home page, navigate there first
      if (pathname !== '/') {
        window.location.href = `/#${href}`
        return
      }
      
      scrollToSection(href)
    }

  return (
    <nav
      className='hidden items-center gap-6 md:flex'
      aria-label='Main navigation'
    >
      {NAVIGATION_ITEMS.map((item) => (
        <a
          key={item.href}
          onClick={handleNavClick(item.href)}
          href={`#${item.href}`}
          className='cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-mint'
          aria-label={`Navigate to ${item.title} section`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}

export default MainNav
