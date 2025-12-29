'use client'

import React, { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, scrollToSection } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
]

const MobileNavContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export default function MobileNav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MobileNavContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileNavContext.Provider>
  )
}

MobileNav.Button = function MobileNavButton() {
  const context = React.useContext(MobileNavContext)
  if (!context)
    throw new Error('MobileNav.Button must be used within MobileNav')

  const { isOpen, setIsOpen } = context

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-controls='mobile-menu'
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className='inline-flex h-9 w-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
    >
      {isOpen ? (
        <X className='h-6 w-6' aria-hidden='true' />
      ) : (
        <Menu className='h-6 w-6' aria-hidden='true' />
      )}
    </button>
  )
}

MobileNav.Menu = function MobileNavMenu() {
  const context = React.useContext(MobileNavContext)
  if (!context) throw new Error('MobileNav.Menu must be used within MobileNav')

  const { isOpen, setIsOpen } = context
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (href: string) => {
    // If not on home page, navigate there first
    if (pathname !== '/') {
      window.location.href = `/#${href}`
      setIsOpen(false)
      return
    }
    
    scrollToSection(href)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='relative z-50 w-full overflow-hidden md:hidden'
      id='mobile-menu'
      role='navigation'
      aria-label='Mobile navigation'
      ref={menuRef}
      onKeyDown={handleKeyDown}
    >
      <div className='m-8'>
        <nav className='flex flex-col gap-4'>
          {items.map((item) => (
            <button
              key={item.href}
              type='button'
              onClick={() => handleNavClick(item.href)}
              className={cn(
                'cursor-pointer text-left text-sm font-medium text-muted-foreground transition-colors hover:text-mint'
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
