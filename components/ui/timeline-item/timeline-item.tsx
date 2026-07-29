'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContent } from '@/components/layout/locale/locale-provider'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

type TimelineItemProps = {
  date: string
  title: string
  description?: string
  company?: string
  companyLink?: string
  isLast?: boolean
}

const getContentLineCount = ({
  company,
  description
}: Pick<TimelineItemProps, 'company' | 'description'>): number =>
  2 + (company ? 1 : 0) + (description ? 1 : 0)

export const TimelineItem = ({
  date,
  title,
  description,
  company,
  companyLink,
  isLast
}: TimelineItemProps) => {
  const content = useContent()
  const {
    revealItemVariants,
    revealGroupVariants,
    revealLineVariants,
    timelineDotVariants,
    createTimelineLineVariants
  } = useSectionAnimation()

  const contentLineCount = getContentLineCount({ company, description })
  const timelineLineVariants = createTimelineLineVariants(contentLineCount)

  return (
    <motion.div className='flex gap-4' role='listitem' variants={revealItemVariants}>
      <div className='flex w-4 shrink-0 flex-col items-center'>
        <motion.div
          className='z-10 h-4 w-4 shrink-0 rounded-full border-2 border-background bg-mint'
          variants={timelineDotVariants}
          aria-hidden='true'
        />
        {!isLast && (
          <motion.div
            className='w-[2px] flex-1 origin-top bg-mint/30'
            variants={timelineLineVariants}
            aria-hidden='true'
          />
        )}
      </div>

      <motion.div
        className='min-w-0 flex-1 pb-10'
        variants={revealGroupVariants}
      >
        <motion.time
          className='mb-1 block text-sm text-muted-foreground'
          variants={revealLineVariants}
        >
          {date}
        </motion.time>
        <motion.h3 className='text-lg font-bold' variants={revealLineVariants}>
          {title}
        </motion.h3>
        {company &&
          (companyLink ? (
            <motion.div variants={revealLineVariants}>
              <Link
                href={companyLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground transition-colors hover:text-mint'
                aria-label={content.experience.ariaLabels.company.replace(
                  '{company}',
                  company
                )}
              >
                {company}
              </Link>
            </motion.div>
          ) : (
            <motion.p
              className='text-muted-foreground'
              variants={revealLineVariants}
            >
              {company}
            </motion.p>
          ))}
        {description && (
          <motion.p className='mt-2' variants={revealLineVariants}>
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
