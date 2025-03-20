'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  {
    title: 'About',
    href: '#about'
  },
  {
    title: 'Skills',
    href: '#skills'
  },
  {
    title: 'Projects',
    href: '#projects'
  },
  {
    title: 'Experience',
    href: '#experience'
  },
  {
    title: 'Contact',
    href: '#contact'
  }
]

export default function MainNav() {
  const pathname = usePathname()

  return (
    <nav className='hidden md:flex items-center gap-6'>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-mint',
            pathname === item.href ? 'text-mint' : 'text-muted-foreground'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
