'use client'

import Link from 'next/link'

interface TimelineItemProps {
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
  return (
    <div
      className={`relative pb-10${
        isLast
          ? ''
          : ' before:absolute before:left-0 before:top-3 before:h-full before:w-[2px] before:bg-mint/30'
      }`}
      role='listitem'
    >
      <div
        className='absolute w-4 h-4 bg-mint rounded-full -left-[8px] top-2 border-2 border-background z-30'
        aria-hidden='true'
      ></div>
      <div className='pl-6'>
        <time className='text-sm text-muted-foreground mb-1'>{date}</time>
        <h3 className='font-bold text-lg'>{title}</h3>
        {company &&
          (companyLink ? (
            <Link
              href={companyLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-mint transition-colors'
              aria-label={`Company: ${company} (opens in new tab)`}
            >
              {company}
            </Link>
          ) : (
            <p className='text-muted-foreground'>{company}</p>
          ))}
        {description && <p className='mt-2'>{description}</p>}
      </div>
    </div>
  )
}
