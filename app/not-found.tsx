'use client'

import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { SECTIONS, localizePath } from '@/constants'
import { useContent, useLocale } from '@/components/layout/locale/locale-provider'

export default function NotFound() {
  const content = useContent()
  const { locale } = useLocale()

  const handleGoHome = () => {
    window.location.href = localizePath(locale, SECTIONS.HERO)
  }

  const handleGoToContact = () => {
    window.location.href = localizePath(locale, SECTIONS.CONTACT)
  }

  return (
    <>
      <Header />
      <div className='relative z-10'>
        <main className='container flex min-h-screen flex-col items-center justify-center pb-10 pt-16'>
          <div className='text-center'>
            <h1 className='mb-4 text-6xl font-bold tracking-tight md:text-8xl'>
              <span className='gradient-text'>{content.notFound.title}</span>
            </h1>
            <h2 className='mb-4 text-2xl font-bold md:text-3xl'>
              {content.notFound.heading}
            </h2>
            <p className='mb-8 max-w-md text-muted-foreground'>
              {content.notFound.description}
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Button
                size='lg'
                className='bg-mint text-mint-foreground transition-opacity hover:opacity-90'
                onClick={handleGoHome}
                aria-label={content.notFound.ariaLabels.goHome}
              >
                <Home className='mr-2 h-4 w-4' aria-hidden='true' />
                {content.notFound.goHome}
              </Button>
              <Button
                size='lg'
                variant='outline'
                onClick={handleGoToContact}
                aria-label={content.notFound.ariaLabels.getInTouch}
              >
                {content.notFound.getInTouch}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
