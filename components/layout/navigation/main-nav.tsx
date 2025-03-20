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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.href
    const targetId = href.replace(/.*\#/, '')
    const elem = document.getElementById(targetId)
    if (elem) {
      const headerOffset = 80 // Adjust this value based on your header height
      const elementPosition = elem.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    window.history.pushState({}, '', href)
  }

  return (
    <nav className='hidden md:flex items-center gap-6'>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={handleClick}
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
