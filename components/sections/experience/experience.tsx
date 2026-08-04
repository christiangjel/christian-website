'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { TimelineItem } from '@/components/ui/timeline-item/timeline-item'
import { BulletList } from '@/components/ui/bullet-list'
import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useContent } from '@/components/layout/locale/locale-provider'
import { SECTIONS } from '@/constants'
import { useRevealInView } from '@/hooks/useRevealInView'
import { useRevealMotion } from '@/hooks/useRevealMotion'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

export const Experience = () => {
  const content = useContent()

  const timelineRef = useRef(null)
  const languagesRef = useRef(null)
  const isTimelineReady = useRevealInView(timelineRef)
  const isLanguagesReady = useRevealInView(languagesRef)
  const {
    revealTimelineListVariants,
    revealItemVariants,
    initial,
    getAnimate
  } = useSectionAnimation()
  const { fadeUpVariants } = useRevealMotion()

  return (
    <section
      id={SECTIONS.EXPERIENCE}
      className='py-16 md:py-20'
      aria-labelledby='experience-heading'
    >
      <div ref={timelineRef}>
        <motion.div
          initial={initial}
          animate={getAnimate(isTimelineReady)}
          variants={revealItemVariants}
        >
          <motion.h2
            id='experience-heading'
            className='mb-14 text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl'
            variants={fadeUpVariants}
          >
            {content.experience.title}
          </motion.h2>

          <motion.div
            className='relative ml-3'
            variants={revealTimelineListVariants}
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
        </motion.div>
      </div>

      <div ref={languagesRef} className='mt-16'>
        <SectionReveal>
          <h3
            id='languages-heading'
            className='mb-6 border-l-4 border-mint pl-4 text-xl font-bold'
          >
            {content.experience.languagesHeading}
          </h3>
        </SectionReveal>
        <div className='rounded-lg px-6 pt-6'>
          <BulletList
            items={content.experience.languages || []}
            layout='grid-3'
            aria-labelledby='languages-heading'
            animated
            isInView={isLanguagesReady}
          />
        </div>
      </div>
    </section>
  )
}
