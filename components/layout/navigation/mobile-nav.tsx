'use client'

import { useState, useRef, createContext, useContext } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { type SectionId } from '@/constants'
import { useNavigation } from '@/hooks/useNavigation'
import { content } from '@/lib/content'

const MobileNavContext = createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export const MobileNav = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MobileNavContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileNavContext.Provider>
  )
}

MobileNav.Button = function MobileNavButton() {
  const context = useContext(MobileNavContext)
  if (!context)
    throw new Error('MobileNav.Button must be used within MobileNav')

  const { isOpen, setIsOpen } = context

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      className='shrink-0 [&_svg]:!size-5 hover:bg-transparent hover:text-foreground active:bg-transparent'
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-controls='mobile-menu'
      aria-label={
        isOpen
          ? content.navigation.ariaLabels.closeMenu
          : content.navigation.ariaLabels.openMenu
      }
    >
      {isOpen ? (
        <X aria-hidden='true' />
      ) : (
        <Menu aria-hidden='true' />
      )}
    </Button>
  )
}

MobileNav.Menu = function MobileNavMenu() {
  const context = useContext(MobileNavContext)
  if (!context) throw new Error('MobileNav.Menu must be used within MobileNav')

  const { isOpen, setIsOpen } = context
  const menuRef = useRef<HTMLDivElement>(null)
  const { handleNavClick } = useNavigation()

  const onNavClick = (href: SectionId) => {
    handleNavClick(href)
    setIsOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
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
      aria-label={content.navigation.ariaLabels.mobile}
      ref={menuRef}
      onKeyDown={handleKeyDown}
    >
      <div className='m-8'>
        <nav className='flex flex-col gap-4'>
          {content.navigation.items.map((item) => (
            <button
              key={item.href}
              type='button'
              onClick={() => onNavClick(item.href)}
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
