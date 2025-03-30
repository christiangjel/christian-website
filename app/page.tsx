'use client'

// import { useScrollUrlSync } from '@/app/hooks/useScrollUrlSync'
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
  // useScrollUrlSync()

  return (
    <div className='relative min-h-screen bg-background overflow-x-hidden'>
      <WavesAnimation />

      <div className='relative z-10'>
        <Header />
        <main className='container py-10'>
          <section id='home'>
            <Hero />
          </section>
          <section id='about'>
            <About />
          </section>
          <section id='skills'>
            <Skills />
          </section>
          <section id='projects'>
            <Projects />
          </section>
          <section id='experience'>
            <Experience />
          </section>
          <section id='education'>
            <Education />
          </section>
          <section id='contact'>
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
