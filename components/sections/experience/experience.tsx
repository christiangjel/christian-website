'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { TimelineItem } from '@/components/ui/timeline-item/timeline-item'
import { BulletList } from '@/components/ui/bullet-list'
import content from '@/data/content.json'

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as const
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
        <div className='rounded-lg pt-6 px-6'>
          <BulletList
            items={content.experience.languages}
            layout='grid-3'
            aria-labelledby='languages-heading'
          />
        </div>
      </div>
    </section>
  )
}
