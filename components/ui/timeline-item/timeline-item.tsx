'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContent } from '@/components/layout/locale/locale-provider'
import { cn } from '@/lib/utils'
import {
  revealGroupVariants,
  revealLineVariants
} from '@/lib/animations/reveal-variants'

type TimelineItemProps = {
  date: string
  title: string
  description?: string
  company?: string
  companyLink?: string
  isLast?: boolean
}

export const TimelineItem = ({
  date,
  title,
  description,
  company,
  companyLink,
  isLast
}: TimelineItemProps) => {
  const content = useContent()

  return (
    <motion.div
      className={cn(
        'relative',
        !isLast &&
          'pb-10 before:absolute before:left-0 before:top-3 before:h-full before:w-[2px] before:bg-mint/30 before:translate-x-0'
      )}
      role='listitem'
      variants={revealGroupVariants}
    >
      <div
        className='absolute left-[1px] top-2 z-30 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-mint'
        aria-hidden='true'
      />
      <div className='pl-6'>
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
      </div>
    </motion.div>
  )
}
