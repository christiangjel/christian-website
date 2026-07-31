'use client'

import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useContent } from '@/components/layout/locale/locale-provider'
import { useHasScrolled } from '@/hooks/useHasScrolled'
import { useRevealMotion } from '@/hooks/useRevealMotion'
import { SECTIONS } from '@/constants'

export const About = () => {
  const content = useContent()
  const { fadeUpVariants } = useRevealMotion()
  const hasScrolled = useHasScrolled()

  const headingId = 'about-heading'

  return (
    <section id={SECTIONS.ABOUT} className='py-14' aria-labelledby={headingId}>
      <SectionReveal stagger ready={hasScrolled}>
        <motion.h2
          id={headingId}
          className='mb-6 text-3xl font-bold'
          variants={fadeUpVariants}
        >
          {content.about.title}
        </motion.h2>
        {content.about.paragraphs.map((paragraph, index) => (
          <motion.p
            key={`paragraph-${index}`}
            className={`text-muted-foreground${
              index === content.about.paragraphs.length - 1 ? '' : ' mb-4'
            }`}
            variants={fadeUpVariants}
          >
            {paragraph}
          </motion.p>
        ))}
      </SectionReveal>
    </section>
  )
}
