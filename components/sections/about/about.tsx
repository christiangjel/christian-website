'use client'

import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useContent } from '@/components/layout/locale/locale-provider'
import { useHasScrolled } from '@/hooks/useHasScrolled'
import { SECTIONS } from '@/constants'

export const About = () => {
  const content = useContent()
  const hasScrolled = useHasScrolled()

  const headingId = 'about-heading'

  return (
    <section id={SECTIONS.ABOUT} className='py-16 md:py-20' aria-labelledby={headingId}>
      <SectionReveal ready={hasScrolled}>
        <h2
          id={headingId}
          className='mb-10 text-3xl font-bold leading-tight tracking-tight md:mb-12 md:text-4xl'
        >
          {content.about.title}
        </h2>
        {content.about.paragraphs.map((paragraph, index) => (
          <p
            key={`paragraph-${index}`}
            className={`text-muted-foreground${
              index === content.about.paragraphs.length - 1 ? '' : ' mb-4'
            }`}
          >
            {paragraph}
          </p>
        ))}
      </SectionReveal>
    </section>
  )
}
