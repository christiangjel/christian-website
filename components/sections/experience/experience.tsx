'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { TimelineItem } from '@/components/ui/timeline-item/timeline-item'
import { BulletList } from '@/components/ui/bullet-list'
import { content } from '@/lib/content'
import { SECTIONS } from '@/constants'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

export const Experience = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { itemVariants, containerVariants } = useSectionAnimation()

  return (
    <section
      id={SECTIONS.EXPERIENCE}
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
            variants={containerVariants}
            role='list'
            aria-label={content.experience.ariaLabels.timeline}
          >
            {content.experience.items.map((item, index) => (
              <motion.div
                key={`${item.title}-${item.date}`}
                variants={itemVariants}
              >
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
          {content.experience.languagesHeading}
        </h3>
        <div className='rounded-lg pt-6 px-6'>
          <BulletList
            items={content.experience.languages || []}
            layout='grid-3'
            aria-labelledby='languages-heading'
          />
        </div>
      </div>
    </section>
  )
}
