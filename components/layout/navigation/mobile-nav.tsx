'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, scrollToSection } from '@/lib/utils'

const items = [
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Projects', href: 'projects' },
  { title: 'Experience', href: 'experience' },
  { title: 'Contact', href: 'contact' }
]

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
              <button
                key={item.href}
                onClick={() => {
                  scrollToSection(item.href)
                  setIsOpen(false)
                }}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-mint',
                  'text-muted-foreground cursor-pointer text-left'
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
