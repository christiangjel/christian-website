'use client'

import { Link as ScrollLink } from 'react-scroll'
import { cn } from '@/lib/utils'

const items = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
]

const scrollConfig = {
  smooth: true,
  duration: 800,
  offset: -80
}

export default function MainNav() {
  return (
    <nav className='hidden md:flex items-center gap-6'>
      {items.map((item) => (
        <ScrollLink
          key={item.href}
          to={item.href}
          {...scrollConfig}
          className='text-sm font-medium transition-colors hover:text-mint text-muted-foreground cursor-pointer'
        >
          {item.title}
        </ScrollLink>
      ))}
    </nav>
  )
}
