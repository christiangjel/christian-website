'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { useLocale } from '@/components/layout/locale/locale-provider'
import { LOCALES, localizePath, type Locale } from '@/constants/locales'
import { cn } from '@/lib/utils'

/**
 * Switches locale while keeping the current section hash.
 */
const switchLocale = (current: Locale, next: Locale) => {
  if (next === current) {
    return
  }

  const hash = window.location.hash.replace(/^#/, '')
  window.location.assign(localizePath(next, hash || undefined))
}

type LocaleToggleProps = {
  /** `desktop` sits in the header nav; `mobile` is the last hamburger item. */
  variant?: 'desktop' | 'mobile'
  /** Called after choosing a locale (e.g. close mobile menu). */
  onSelect?: () => void
}

/**
 * Globe language control with a dropdown of available locales.
 */
export const LocaleToggle = ({
  variant = 'desktop',
  onSelect,
}: LocaleToggleProps) => {
  const { locale, content } = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const labels = content.header.localeToggle
  const isMobile = variant === 'mobile'

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={cn('relative', isMobile ? 'w-full' : 'flex items-center')}
    >
      <button
        type='button'
        className={cn(
          'inline-flex items-center text-muted-foreground transition-colors hover:text-mint',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isMobile && 'gap-2 text-sm font-medium'
        )}
        aria-label={labels.ariaLabel}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Globe className='size-4 shrink-0' aria-hidden='true' />
        <span className={cn(!isMobile && 'sr-only')}>{labels.label}</span>
      </button>
      {isOpen ? (
        <ul
          id={menuId}
          role='menu'
          aria-label={labels.label}
          className={cn(
            'z-50 min-w-[8.5rem] overflow-hidden py-1',
            isMobile
              ? 'relative mt-3 flex flex-col gap-3 pl-6'
              : 'absolute right-0 top-full mt-2 rounded-md border border-border bg-background shadow-md'
          )}
        >
          {LOCALES.map((option) => (
            <li key={option} role='none'>
              <button
                type='button'
                role='menuitemradio'
                aria-checked={option === locale}
                className={cn(
                  'flex w-full text-left text-sm font-medium transition-colors',
                  'text-muted-foreground hover:text-mint',
                  !isMobile && 'px-3 py-2',
                  option === locale && 'text-mint'
                )}
                onClick={() => {
                  setIsOpen(false)
                  onSelect?.()
                  switchLocale(locale, option)
                }}
              >
                {labels.options[option]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
