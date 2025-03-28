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
    <nav className='hidden md:flex items-center gap-6'>
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => scrollToSection(item.href)}
          className='text-sm font-medium transition-colors hover:text-mint text-muted-foreground cursor-pointer'
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}
