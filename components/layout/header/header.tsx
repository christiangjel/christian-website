'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import MainNav from '@/components/layout/navigation/main-nav'
import MobileNav from '@/components/layout/navigation/mobile-nav'
import { scrollToSection } from '@/lib/utils'

export const Header = (): React.JSX.Element => {
  const pathname = usePathname()

  const handleLogoClick = () => {
    // If not on home page, navigate there first
    if (pathname !== '/') {
      window.location.href = '/#hero'
      return
    }
    
    scrollToSection('hero')
  }

  return (
    // <header
    //   className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    //   role='banner'
    // >
    <header
      className='fixed top-0 right-0 left-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      role='banner'
    >
      <MobileNav>
        <div className='container'>
          <div className='flex h-16 items-center justify-between'>
            <button
              className='text-xl font-bold'
              onClick={handleLogoClick}
              aria-label='Go to top of page'
            >
              <span className='bg-gradient-to-r from-mint to-mint/70 bg-clip-text text-transparent'>
                Christian
              </span>{' '}
              Gjelstrup
            </button>
            <div className='relative z-50 flex items-center gap-4'>
              <MainNav />
              <div className='relative z-50 md:hidden'>
                <MobileNav.Button />
              </div>
            </div>
          </div>
          <MobileNav.Menu />
        </div>
      </MobileNav>
    </header>
  )
}
