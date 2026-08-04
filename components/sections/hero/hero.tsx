'use client'

import { motion } from 'framer-motion'
import { FileDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SECTIONS, CUSTOM_EVENTS } from '@/constants'
import { useContent } from '@/components/layout/locale/locale-provider'
import { useRevealMotion } from '@/hooks/useRevealMotion'
import { useWebGLReady } from '@/hooks/useWebGLReady'
import { scrollToSection } from '@/lib/utils'

export const Hero = () => {
  const content = useContent()
  const isWebGLReady = useWebGLReady()
  const {
    initial,
    getAnimate,
    heroStaggerVariants,
    heroItemVariants
  } = useRevealMotion()

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
      <motion.div
        className='flex flex-col items-center'
        initial={initial}
        animate={getAnimate(isWebGLReady)}
        variants={heroStaggerVariants}
      >
        <motion.h1
          id='hero-heading'
          className='mb-8 text-5xl font-bold leading-none tracking-tight md:text-6xl lg:text-7xl'
          variants={heroItemVariants}
        >
          <span className='gradient-text'>{firstWord}</span> {restOfTitle}
        </motion.h1>
        <motion.p
          className='mb-8 max-w-[750px] text-xl text-muted-foreground md:text-2xl'
          variants={heroItemVariants}
        >
          {content.hero.description}
        </motion.p>
        <motion.div
          className='flex w-fit flex-col gap-4 sm:grid sm:w-full sm:max-w-xl sm:grid-cols-2 lg:flex lg:w-auto lg:max-w-none lg:flex-row'
          role='navigation'
          aria-label={content.hero.ariaLabels.navigation}
          variants={heroItemVariants}
        >
          <Button
            size='lg'
            variant='hero'
            className='sm:w-full lg:w-auto'
            onClick={() => scrollToSection(SECTIONS.CONTACT)}
            aria-label={content.hero.buttons.getInTouch.ariaLabel}
          >
            {content.hero.buttons.getInTouch.label} &#8594;
          </Button>
          <Button
            size='lg'
            variant='heroOutline'
            className='sm:w-full lg:w-auto'
            onClick={() => scrollToSection(SECTIONS.PROJECTS)}
            aria-label={content.hero.buttons.viewWork.ariaLabel}
          >
            {content.hero.buttons.viewWork.label}
          </Button>
          <Button
            size='lg'
            variant='heroOutline'
            className='flex items-center justify-center gap-2 sm:w-full lg:w-auto'
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
            variant='heroOutline'
            className='flex items-center justify-center gap-2 sm:w-full lg:w-auto'
            onClick={handleAskAi}
            aria-label={content.hero.buttons.askAi.ariaLabel}
          >
            <Sparkles className='mr-2 h-4 w-4' aria-hidden='true' />
            {content.hero.buttons.askAi.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
