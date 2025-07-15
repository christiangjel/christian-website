'use client'

import { MoveRight, FileDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { scrollToSection } from '@/lib/utils'
import content from '@/data/content.json'

export const Hero = (): React.JSX.Element => {
  const titleWords = content.hero.title.split(' ')
  const firstWord = titleWords[0]
  const restOfTitle = titleWords.slice(1).join(' ')

  return (
    <section
      id='hero'
      className='py-16 md:py-24 flex flex-col items-center text-center'
      aria-labelledby='hero-heading'
    >
      <Badge
        className='mb-4 bg-mint text-mint-foreground pointer-events-none'
        aria-hidden='true'
      >
        {content.hero.badge}
      </Badge>
      <h1
        id='hero-heading'
        className='text-4xl md:text-6xl font-bold tracking-tight mb-6'
      >
        <span className='gradient-text'>{firstWord}</span> {restOfTitle}
      </h1>
      <p className='text-xl md:text-2xl text-muted-foreground max-w-[750px] mb-8'>
        {content.hero.description}
      </p>
      <div
        className='flex flex-col sm:flex-row gap-4'
        role='navigation'
        aria-label='Main navigation'
      >
        <Button
          size='lg'
          className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
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
            <FileDown className='h-4 w-4 mr-2' aria-hidden='true' />
            Download CV
          </Link>
        </Button>
      </div>
    </section>
  )
}
