import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import { Hero } from '@/components/sections/hero/hero'
import { About } from '@/components/sections/about/about'
import { Skills } from '@/components/sections/skills/skills'
import { Projects } from '@/components/sections/projects/projects'
import { Experience } from '@/components/sections/experience/experience'
import { Education } from '@/components/sections/education/education'
import { Contact } from '@/components/sections/contact/contact'

export default function Home() {
  return (
    <div className='relative z-10'>
      <Header />
      <main className='container py-10'>
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
