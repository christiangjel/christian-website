'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TimelineItem } from '@/components/ui/timeline-item/timeline-item'
import { BulletList } from '@/components/ui/bullet-list'
import { useContent } from '@/components/layout/locale/locale-provider'
import { SECTIONS, REVEAL_VIEWPORT } from '@/constants'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

export const Experience = () => {
  const content = useContent()

  const timelineRef = useRef(null)
  const languagesRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, REVEAL_VIEWPORT)
  const isLanguagesInView = useInView(languagesRef, REVEAL_VIEWPORT)
  const { revealListVariants } = useSectionAnimation()

  return (
    <section
      id={SECTIONS.EXPERIENCE}
      className='py-14'
      aria-labelledby='experience-heading'
    >
      <h2
        id='experience-heading'
        className='text-3xl font-bold tracking-tight mb-12'
      >
        {content.experience.title}
      </h2>

      <div ref={timelineRef} className='relative pl-8 ml-3'>
        <motion.div
          initial='hidden'
          animate={isTimelineInView ? 'visible' : 'hidden'}
          variants={revealListVariants}
          role='list'
          aria-label={content.experience.ariaLabels.timeline}
        >
          {content.experience.items.map((item, index) => (
            <TimelineItem
              key={`${item.title}-${item.date}`}
              {...item}
              isLast={index === content.experience.items.length - 1}
            />
          ))}
        </motion.div>
      </div>

      <div ref={languagesRef} className='mt-16'>
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
            animated
            isInView={isLanguagesInView}
          />
        </div>
      </div>
    </section>
  )
}
