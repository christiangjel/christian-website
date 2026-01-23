'use client'

import { useEffect } from 'react'
import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import { Hero } from '@/components/sections/hero/hero'
import { About } from '@/components/sections/about/about'
import { Skills } from '@/components/sections/skills/skills'
import { Projects } from '@/components/sections/projects/projects'
import { Experience } from '@/components/sections/experience/experience'
import { Education } from '@/components/sections/education/education'
import { Contact } from '@/components/sections/contact/contact'
import { scrollToSection } from '@/lib/utils'
import { useScrollUrlSync } from '@/hooks/useScrollUrlSync'
import { SCROLL_CONFIG } from '@/constants'

export default function Home() {
  // Sync URL hash with scroll position
  useScrollUrlSync()

  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash.slice(1) // Remove the # symbol
    if (hash) {
      const timer = setTimeout(() => {
        scrollToSection(hash)
      }, SCROLL_CONFIG.HASH_NAVIGATION_DELAY)
      
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className='relative z-10'>
      <Header />
      <main id='main-content' className='container pb-10 pt-16 md:pt-36'>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
