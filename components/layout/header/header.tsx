'use client'

import React from 'react'
import MainNav from '@/components/layout/navigation/main-nav'
import MobileNav from '@/components/layout/navigation/mobile-nav'
import { scrollToSection } from '@/lib/utils'

export const Header = (): React.JSX.Element => {
  const handleLogoClick = () => {
    scrollToSection('hero')
  }

  return (
    <header
      className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      role='banner'
    >
      <div className='container flex h-16 items-center justify-between'>
        <button
          className='font-bold text-xl'
          onClick={handleLogoClick}
          aria-label='Go to top of page'
        >
          <span className='bg-gradient-to-r from-mint to-mint/70 bg-clip-text text-transparent'>
            Christian
          </span>{' '}
          Gjelstrup
        </button>
        <div className='flex items-center gap-4'>
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
