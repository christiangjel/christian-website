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
      className={`relative${
        isLast
          ? ''
          : ' pb-10 before:absolute before:left-0 before:top-3 before:h-full before:w-[2px] before:bg-mint/30 before:translate-x-0'
      }`}
      role='listitem'
    >
      <div
        className='absolute top-2 z-30 h-4 w-4 rounded-full border-2 border-background bg-mint'
        style={{ left: '1px', transform: 'translateX(-50%)' }}
        aria-hidden='true'
      ></div>
      <div className='pl-6'>
        <time className='mb-1 text-sm text-muted-foreground'>{date}</time>
        <h3 className='text-lg font-bold'>{title}</h3>
        {company &&
          (companyLink ? (
            <Link
              href={companyLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground transition-colors hover:text-mint'
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
