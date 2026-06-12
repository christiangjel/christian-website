'use client'

import { FileDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
import { SECTIONS, CUSTOM_EVENTS } from '@/constants'
import { content } from '@/lib/content'
import { scrollToSection } from '@/lib/utils'

export const Hero = () => {
  const titleWords = content.hero.title.split(' ')
  const firstWord = titleWords[0]
  const restOfTitle = titleWords.slice(1).join(' ')

  const handleAskAi = (): void => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.OPEN_ASSISTANT_CHAT))
  }

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
          <a
            href='/christian-gjelstrup-cv.pdf'
            target='_blank'
            download
            rel='noopener noreferrer'
          >
            <FileDown className='mr-2 h-4 w-4' aria-hidden='true' />
            {content.hero.buttons.downloadCV.label}
          </a>
        </Button>
        <Button
          size='lg'
          variant='outline'
          className='flex items-center gap-2'
          onClick={handleAskAi}
          aria-label={content.hero.buttons.askAi.ariaLabel}
        >
          <Sparkles className='mr-2 h-4 w-4' aria-hidden='true' />
          {content.hero.buttons.askAi.label}
        </Button>
      </div>
    </section>
  )
}
