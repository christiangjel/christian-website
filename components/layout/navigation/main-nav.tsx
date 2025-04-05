'use client'

import { scrollToSection } from '@/lib/utils'

const items = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
]

export default function MainNav() {
  return (
    <nav
      className='hidden md:flex items-center gap-6'
      aria-label='Main navigation'
    >
      {items.map((item) => (
        <a
          key={item.href}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(item.href)
          }}
          href={`#${item.href}`} // Provides fallback for keyboard navigation
          className='text-sm font-medium transition-colors hover:text-mint text-muted-foreground cursor-pointer'
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}
