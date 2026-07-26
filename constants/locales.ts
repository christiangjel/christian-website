export const LOCALES = ['en', 'da', 'de'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_HTML_LANG = {
  en: 'en-GB',
  da: 'da',
  de: 'de',
} as const satisfies Record<Locale, string>

export const LOCALE_OG = {
  en: 'en_GB',
  da: 'da_DK',
  de: 'de_DE',
} as const satisfies Record<Locale, string>

/**
 * Returns true when the value is a supported locale code.
 */
export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value)

/**
 * Resolves the active locale from a pathname (`/`, `/da`, `/de`).
 */
export const getLocaleFromPathname = (pathname: string): Locale => {
  const segment = pathname.split('/').filter(Boolean)[0]
  return segment && isLocale(segment) && segment !== DEFAULT_LOCALE
    ? segment
    : DEFAULT_LOCALE
}

/**
 * Locale home URL (`/` or `/da`) with optional section hash.
 */
export const localizePath = (locale: Locale, hash?: string): string => {
  const home = locale === DEFAULT_LOCALE ? '/' : `/${locale}`
  const section = hash?.replace(/^#/, '')
  return section ? `${home}#${section}` : home
}

/**
 * True when pathname is a locale home (`/`, `/da`, `/de`).
 */
export const isLocaleHomePath = (pathname: string): boolean => {
  const normalised = pathname.replace(/\/$/, '') || '/'
  return LOCALES.some((locale) => normalised === localizePath(locale))
}

/**
 * hreflang map for metadata alternates.
 */
export const getLanguageAlternates = (baseUrl: string) =>
  ({
    'en-GB': baseUrl,
    da: `${baseUrl}/da`,
    de: `${baseUrl}/de`,
    'x-default': baseUrl,
  }) as const
