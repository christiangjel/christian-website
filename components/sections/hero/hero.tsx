'use client'

import { MoveRight, FileDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
import { scrollToSection } from '@/lib/utils'
import content from '@/data/content.json'

export const Hero = (): React.JSX.Element => {
  const titleWords = content.hero.title.split(' ')
  const firstWord = titleWords[0]
  const restOfTitle = titleWords.slice(1).join(' ')

  return (
    <section
      id='hero'
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
        aria-label='Main navigation'
      >
        <Button
          size='lg'
          className='bg-mint text-mint-foreground transition-opacity hover:opacity-90'
          onClick={() => scrollToSection('contact')}
          aria-label='Get in touch'
        >
          Get in Touch <MoveRight className='ml-2 h-4 w-4' aria-hidden='true' />
        </Button>
        <Button
          size='lg'
          variant='outline'
          onClick={() => scrollToSection('projects')}
          aria-label='View my work'
        >
          View My Work
        </Button>
        <Button
          size='lg'
          variant='outline'
          className='flex items-center gap-2'
          asChild
          aria-label='Download CV (opens in new tab)'
        >
          <Link
            href='/christian-gjelstrup-cv.pdf'
            target='_blank'
            download
            rel='noopener noreferrer'
          >
            <FileDown className='mr-2 h-4 w-4' aria-hidden='true' />
            Download CV
          </Link>
        </Button>
      </div>
    </section>
  )
}
