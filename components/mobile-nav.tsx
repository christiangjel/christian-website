'use client'

import type React from 'react'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'

interface NavItem {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' }
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  // Handle smooth scrolling
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    setOpen(false)

    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
        <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
        <SheetDescription className='sr-only'>
          Use this menu to navigate to different sections of the website
        </SheetDescription>
        <div className='flex flex-col h-full'>
          <nav className='flex flex-col gap-6'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-lg font-medium hover:text-primary transition-colors'
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className='mt-auto pt-8 pb-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Switch theme
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
