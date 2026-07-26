import enContent from '@/data/content/en.json'
import daContent from '@/data/content/da.json'
import deContent from '@/data/content/de.json'
import { DEFAULT_LOCALE, type Locale } from '@/constants/locales'
import type { Content } from '@/types/content'

/**
 * JSON imports widen string literals (e.g. icon unions), so `satisfies` cannot
 * validate the full Content shape here. Cast at this static-data boundary.
 */
const CONTENT_BY_LOCALE: Record<Locale, Content> = {
  en: enContent as Content,
  da: daContent as Content,
  de: deContent as Content,
}

/**
 * Returns localised site content for the given locale.
 *
 * @param locale - Active UI locale
 */
export const getContent = (locale: Locale = DEFAULT_LOCALE): Content =>
  CONTENT_BY_LOCALE[locale] ?? CONTENT_BY_LOCALE[DEFAULT_LOCALE]

/** Default (British English) content — prefer `getContent` / `useContent` when locale-aware. */
export const content: Content = getContent(DEFAULT_LOCALE)
