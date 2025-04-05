'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TimelineItem } from '@/components/ui/timeline-item/timeline-item'
import content from '@/data/content.json'

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export const Experience = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id='experience'
      ref={sectionRef}
      className='py-14'
      aria-labelledby='experience-heading'
    >
      <h2
        id='experience-heading'
        className='text-3xl font-bold tracking-tight mb-12'
      >
        {content.experience.title}
      </h2>

      <div className='relative pl-8 ml-3'>
        <AnimatePresence>
          <motion.div
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2
                }
              }
            }}
            role='list'
            aria-label='Work experience timeline'
          >
            {content.experience.items.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TimelineItem
                  {...item}
                  isLast={index === content.experience.items.length - 1}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='mt-16'>
        <h3
          id='languages-heading'
          className='text-xl font-bold mb-6 border-l-4 border-mint pl-4'
        >
          Languages
        </h3>
        <Card className='border-mint/20 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <CardContent className='p-6'>
            <div
              className='space-y-2'
              role='list'
              aria-labelledby='languages-heading'
            >
              {content.experience.languages.map((language, index) => (
                <div
                  key={index}
                  className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1'
                  role='listitem'
                >
                  <span className='font-medium'>{language.name}</span>
                  <span className='text-muted-foreground'>
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
