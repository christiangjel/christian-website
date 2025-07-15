'use client'

import React from 'react'
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
  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      scrollToSection(href)
    }

  return (
    <nav
      className='hidden md:flex items-center gap-6'
      aria-label='Main navigation'
    >
      {NAVIGATION_ITEMS.map((item) => (
        <a
          key={item.href}
          onClick={handleNavClick(item.href)}
          href={`#${item.href}`}
          className='text-sm font-medium transition-colors hover:text-mint text-muted-foreground cursor-pointer'
          aria-label={`Navigate to ${item.title} section`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}

export default MainNav
