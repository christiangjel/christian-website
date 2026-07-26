'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  LOCALE_HTML_LANG,
  type Locale,
} from '@/constants/locales'
import { getContent } from '@/lib/content'
import type { Content } from '@/types/content'

type LocaleContextValue = {
  locale: Locale
  content: Content
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  content: getContent(DEFAULT_LOCALE),
})

/**
 * Provides the active locale and matching content tree.
 * Syncs `document.documentElement.lang` for accessibility.
 */
export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname ?? '/')
  const value: LocaleContextValue = {
    locale,
    content: getContent(locale),
  }

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale]
  }, [locale])

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

/**
 * Returns the active locale and localised content.
 */
export const useLocale = (): LocaleContextValue => useContext(LocaleContext)

/**
 * Returns localised site content for the active locale.
 */
export const useContent = (): Content => useLocale().content
