'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import ThemeToggle from '@/components/layout/theme/theme-toggle'
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

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

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
    setIsOpen(false)
  }

  return (
    <div className='md:hidden'>
      <Button
        variant='ghost'
        size='icon'
        className='md:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
      </Button>

      {isOpen && (
        <div className='absolute top-16 left-0 right-0 bg-background border-b p-4'>
          <nav className='flex flex-col gap-4'>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-mint',
                  'text-muted-foreground'
                )}
              >
                {item.title}
              </Link>
            ))}
            {/* <ThemeToggle className='' /> */}
          </nav>
        </div>
      )}
    </div>
  )
}
