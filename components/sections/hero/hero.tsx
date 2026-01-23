'use client'

import { FileDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
import { scrollToSection } from '@/lib/utils'
import { content } from '@/lib/content'
import { SECTIONS } from '@/constants'

export const Hero = () => {
  const titleWords = content.hero.title.split(' ')
  const firstWord = titleWords[0]
  const restOfTitle = titleWords.slice(1).join(' ')

  return (
    <section
      id={SECTIONS.HERO}
      className='mt-8 flex flex-col items-center py-16 text-center md:py-24'
      aria-labelledby='hero-heading'
    >
      {/* <Badge
        className='pointer-events-none mb-4 bg-mint'
        aria-hidden='true'
      >
        {content.hero.badge}
      </Badge> */}
      <h1
        id='hero-heading'
        className='mb-6 text-4xl font-bold tracking-tight md:text-6xl'
      >
        <span className='gradient-text'>{firstWord}</span> {restOfTitle}
      </h1>
      <p className='mb-8 max-w-[750px] text-xl text-muted-foreground md:text-2xl'>
        {content.hero.description}
      </p>
      <div
        className='flex flex-col gap-4 sm:flex-row'
        role='navigation'
        aria-label={content.hero.ariaLabels.navigation}
      >
        <Button
          size='lg'
          className='bg-mint text-mint-foreground transition-opacity hover:opacity-90'
          onClick={() => scrollToSection(SECTIONS.CONTACT)}
          aria-label={content.hero.buttons.getInTouch.ariaLabel}
        >
          {content.hero.buttons.getInTouch.label} &#8594;
        </Button>
        <Button
          size='lg'
          variant='outline'
          onClick={() => scrollToSection(SECTIONS.PROJECTS)}
          aria-label={content.hero.buttons.viewWork.ariaLabel}
        >
          {content.hero.buttons.viewWork.label}
        </Button>
        <Button
          size='lg'
          variant='outline'
          className='flex items-center gap-2'
          asChild
          aria-label={content.hero.buttons.downloadCV.ariaLabel}
        >
          <Link
            href='/christian-gjelstrup-cv.pdf'
            target='_blank'
            download
            rel='noopener noreferrer'
          >
            <FileDown className='mr-2 h-4 w-4' aria-hidden='true' />
            {content.hero.buttons.downloadCV.label}
          </Link>
        </Button>
      </div>
    </section>
  )
}
