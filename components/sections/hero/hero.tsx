'use client'

import { MoveRight, FileDown } from 'lucide-react'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import content from '@/data/content.json'

const scrollConfig = {
  smooth: true,
  duration: 800,
  offset: -80
}

export const Hero = () => {
  return (
    <section className='py-16 md:py-24 flex flex-col items-center text-center'>
      <Badge className='mb-4 bg-mint text-mint-foreground pointer-events-none'>
        {content.hero.badge}
      </Badge>
      <h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-6'>
        <span className='gradient-text'>
          {content.hero.title.split(' ')[0]}
        </span>{' '}
        {content.hero.title.split(' ').slice(1).join(' ')}
      </h1>
      <p className='text-xl md:text-2xl text-muted-foreground max-w-[750px] mb-8'>
        {content.hero.description}
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button
          size='lg'
          className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
          asChild
        >
          <ScrollLink to='contact' {...scrollConfig}>
            Get in Touch <MoveRight className='ml-2 h-4 w-4' />
          </ScrollLink>
        </Button>
        <Button size='lg' variant='outline' asChild>
          <ScrollLink to='projects' {...scrollConfig}>
            View My Work
          </ScrollLink>
        </Button>
        <Button
          size='lg'
          variant='outline'
          className='flex items-center gap-2'
          asChild
        >
          <Link href='/christian-gjelstrup-cv.pdf' target='_blank' download>
            <FileDown className='h-4 w-4 mr-2' />
            Download CV
          </Link>
        </Button>
      </div>
    </section>
  )
}
