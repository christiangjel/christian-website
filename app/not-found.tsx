'use client'

import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  const handleGoHome = () => {
    // Use hash in URL - home page will handle scrolling
    window.location.href = '/#hero'
  }

  const handleGoToContact = () => {
    // Use hash in URL - home page will handle scrolling
    window.location.href = '/#contact'
  }

  return (
    <div className='relative z-10'>
      <Header />
      <main className='container flex min-h-screen flex-col items-center justify-center pb-10 pt-16'>
        <div className='text-center'>
          <h1 className='mb-4 text-6xl font-bold tracking-tight md:text-8xl'>
            <span className='gradient-text'>404</span>
          </h1>
          <h2 className='mb-4 text-2xl font-bold md:text-3xl'>
            Page Not Found
          </h2>
          <p className='mb-8 max-w-md text-muted-foreground'>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button
              size='lg'
              className='bg-mint text-mint-foreground transition-opacity hover:opacity-90'
              onClick={handleGoHome}
              aria-label='Go to homepage'
            >
              <Home className='mr-2 h-4 w-4' aria-hidden='true' />
              Go Home
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={handleGoToContact}
              aria-label='Get in touch'
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

