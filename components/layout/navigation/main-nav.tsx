'use client'

import type { MouseEvent } from 'react'
import { type SectionId } from '@/constants'
import { useNavigation } from '@/hooks/useNavigation'
import { useContent } from '@/components/layout/locale/locale-provider'
import { LocaleToggle } from '@/components/layout/locale/locale-toggle'

export const MainNav = () => {
  const content = useContent()

  const { handleNavClick } = useNavigation()

  const onNavClick =
    (href: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      handleNavClick(href)
    }

  return (
    <nav
      className='hidden items-center gap-6 md:flex'
      aria-label={content.navigation.ariaLabels.main}
    >
      {content.navigation.items.map((item) => (
        <a
          key={item.href}
          onClick={onNavClick(item.href)}
          href={`#${item.href}`}
          className='cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-mint'
          aria-label={content.navigation.ariaLabels.navigateTo.replace(
            '{title}',
            item.title
          )}
        >
          {item.title}
        </a>
      ))}
      <LocaleToggle variant='desktop' />
    </nav>
  )
}
