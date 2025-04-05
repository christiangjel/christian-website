'use client'

import { useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, scrollToSection } from '@/lib/utils'
import { motion } from 'framer-motion'

const items = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleNavClick = (href: string) => {
    scrollToSection(href)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className='md:hidden'>
      <Button
        variant='ghost'
        size='icon'
        className='md:hidden'
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls='mobile-menu'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className='h-6 w-6' aria-hidden='true' />
        ) : (
          <Menu className='h-6 w-6' aria-hidden='true' />
        )}
      </Button>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.1 }}
          className='absolute top-16 left-0 right-0 bg-background border-b overflow-hidden z-50'
          id='mobile-menu'
          role='navigation'
          aria-label='Mobile navigation'
          ref={menuRef}
          onKeyDown={handleKeyDown}
        >
          <div className='m-8'>
            <nav className='flex flex-col gap-4'>
              {items.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-mint',
                    'text-muted-foreground cursor-pointer text-left'
                  )}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </div>
  )
}
