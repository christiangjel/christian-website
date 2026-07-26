'use client'

import { useState, createContext, useContext } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type SectionId } from '@/constants'
import { useNavigation } from '@/hooks/useNavigation'
import { useContent } from '@/components/layout/locale/locale-provider'
import { LocaleToggle } from '@/components/layout/locale/locale-toggle'

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
  const content = useContent()
  const context = useContext(MobileNavContext)
  if (!context)
    throw new Error('MobileNav.Button must be used within MobileNav')

  const { isOpen, setIsOpen } = context

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      className='-mr-[7px] shrink-0 [&_svg]:!size-5 hover:bg-transparent hover:text-foreground active:bg-transparent'
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-controls='mobile-menu'
      aria-label={
        isOpen
          ? content.navigation.ariaLabels.closeMenu
          : content.navigation.ariaLabels.openMenu
      }
    >
      {isOpen ? <X aria-hidden='true' /> : <Menu aria-hidden='true' />}
    </Button>
  )
}

MobileNav.Menu = function MobileNavMenu() {
  const content = useContent()
  const context = useContext(MobileNavContext)
  if (!context) throw new Error('MobileNav.Menu must be used within MobileNav')

  const { isOpen, setIsOpen } = context
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

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key='mobile-menu'
          id='mobile-menu'
          role='navigation'
          aria-label={content.navigation.ariaLabels.mobile}
          initial={{ height: 0 }}
          animate={{ height: 'calc(100svh - 4rem)' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.25 }}
          className='relative w-full overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden'
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
              <LocaleToggle
                variant='mobile'
                onSelect={() => setIsOpen(false)}
              />
            </nav>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
