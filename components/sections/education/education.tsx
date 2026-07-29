'use client'

import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useContent } from '@/components/layout/locale/locale-provider'
import { useRevealMotion } from '@/hooks/useRevealMotion'
import { SECTIONS } from '@/constants'

export const Education = () => {
  const content = useContent()
  const { fadeUpVariants } = useRevealMotion()

  return (
    <section
      id={SECTIONS.EDUCATION}
      className='py-14'
      aria-labelledby='education-heading'
    >
      <SectionReveal stagger>
        <motion.h2
          id='education-heading'
          className='mb-12 text-3xl font-bold tracking-tight'
          variants={fadeUpVariants}
        >
          {content.education.title}
        </motion.h2>
        <div
          className='grid grid-cols-1 gap-8 md:grid-cols-2'
          role='list'
          aria-label={content.education.ariaLabels.history}
        >
          {content.education.items.map((item, index) => (
            <motion.a
              key={`${item.title}-${item.date}`}
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
              className='block'
              role='listitem'
              aria-labelledby={`education-title-${index}`}
              variants={fadeUpVariants}
            >
              <div className='h-full rounded-lg border border-mint/20 bg-background p-6 backdrop-blur transition-[filter,border-color,background-color] duration-300 hover:border-mint hover:bg-mint/5 hover:brightness-110 supports-[backdrop-filter]:bg-background/60'>
                <time className='mb-2 block text-muted-foreground'>
                  {item.date}
                </time>
                <h3
                  id={`education-title-${index}`}
                  className='mb-2 text-xl font-bold'
                >
                  {item.title}
                </h3>
                <p className='mb-2 text-muted-foreground'>{item.institution}</p>
                <p>{item.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
