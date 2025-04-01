'use client'

import MainNav from '@/components/layout/navigation/main-nav'
import MobileNav from '@/components/layout/navigation/mobile-nav'
import { scrollToSection } from '@/lib/utils'
// import ThemeToggle from '@/components/layout/theme/theme-toggle'

export const Header = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <button
          className='font-bold text-xl'
          onClick={() => scrollToSection('hero')}
        >
          <span className='bg-gradient-to-r from-mint to-mint/70 bg-clip-text text-transparent'>
            Christian
          </span>{' '}
          Gjelstrup
        </button>
        <div className='flex items-center gap-4'>
          <MainNav />
          {/* <ThemeToggle className='hidden md:flex' /> */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
