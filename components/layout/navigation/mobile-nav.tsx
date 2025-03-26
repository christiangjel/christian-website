'use client'

import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const items = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
]

const scrollConfig = {
  smooth: true,
  duration: 800,
  offset: -80
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='md:hidden'>
      <Button
        variant='ghost'
        size='icon'
        className='md:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
      </Button>

      {isOpen && (
        <div className='absolute top-16 left-0 right-0 bg-background border-b p-4'>
          <nav className='flex flex-col gap-4'>
            {items.map((item) => (
              <ScrollLink
                key={item.href}
                to={item.href}
                {...scrollConfig}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-mint',
                  'text-muted-foreground cursor-pointer'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </ScrollLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
