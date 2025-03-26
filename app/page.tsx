'use client'

import { Element } from 'react-scroll'
import { useScrollUrlSync } from '@/app/hooks/useScrollUrlSync'
import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import { WavesAnimation } from '@/components/layout/wavesAnimation/wavesAnimation'
import { Hero } from '@/components/sections/hero/hero'
import { About } from '@/components/sections/about/about'
import { Skills } from '@/components/sections/skills/skills'
import { Projects } from '@/components/sections/projects/projects'
import { Experience } from '@/components/sections/experience/experience'
import { Education } from '@/components/sections/education/education'
import { Contact } from '@/components/sections/contact/contact'

export default function Home() {
  useScrollUrlSync()

  return (
    <div className='relative min-h-screen bg-background'>
      <WavesAnimation />

      <div className='relative z-10'>
        <Header />
        <main className='container py-10'>
          <Element name='home'>
            <Hero />
          </Element>
          <Element name='about'>
            <About />
          </Element>
          <Element name='skills'>
            <Skills />
          </Element>
          <Element name='projects'>
            <Projects />
          </Element>
          <Element name='experience'>
            <Experience />
          </Element>
          <Element name='education'>
            <Education />
          </Element>
          <Element name='contact'>
            <Contact />
          </Element>
        </main>
        <Footer />
      </div>
    </div>
  )
}
