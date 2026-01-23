'use client'

import { usePathname } from 'next/navigation'
import MainNav from '@/components/layout/navigation/main-nav'
import MobileNav from '@/components/layout/navigation/mobile-nav'
import { scrollToSection } from '@/lib/utils'
import { SECTIONS } from '@/constants'
import { content } from '@/lib/content'

export const Header = () => {
  const pathname = usePathname()

  const handleLogoClick = () => {
    // If not on home page, navigate there first
    if (pathname !== '/') {
      window.location.href = `/#${SECTIONS.HERO}`
      return
    }

    scrollToSection(SECTIONS.HERO)
  }

  return (
    <header
      className='fixed top-0 right-0 left-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      role='banner'
    >
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-mint focus:text-mint-foreground focus:rounded-md focus:font-medium'
      >
        {content.header.skipToContent}
      </a>
      <MobileNav>
        <div className='container'>
          <div className='flex h-16 items-center justify-between'>
            <button
              className='text-xl font-bold'
              onClick={handleLogoClick}
              aria-label={content.header.logoAriaLabel}
            >
              <span className='bg-gradient-to-r from-mint to-mint/70 bg-clip-text text-transparent'>
                {content.header.firstName}
              </span>{' '}
              {content.header.lastName}
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
