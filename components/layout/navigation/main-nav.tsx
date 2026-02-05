'use client'

import type { MouseEvent } from 'react'
import { NAVIGATION_ITEMS, SectionId } from '@/constants'
import { useNavigation } from '@/hooks/useNavigation'
import { content } from '@/lib/content'

export const MainNav = () => {
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
      {NAVIGATION_ITEMS.map((item) => (
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
    </nav>
  )
}
