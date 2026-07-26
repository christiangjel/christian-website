import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { HomePage } from '@/components/layout/home-page/home-page'
import {
  DEFAULT_LOCALE,
  getLanguageAlternates,
  isLocale,
  LOCALES,
  localizePath,
  LOCALE_OG,
} from '@/constants/locales'
import { SITE_CONFIG } from '@/constants'
import { getContent } from '@/lib/content'

type LocalePageProps = {
  params: Promise<{ locale: string }>
}

export const generateStaticParams = () =>
  LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
    locale,
  }))

export const generateMetadata = async ({
  params,
}: LocalePageProps): Promise<Metadata> => {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam) || localeParam === DEFAULT_LOCALE) {
    return {}
  }

  const content = getContent(localeParam)
  const url = `${SITE_CONFIG.BASE_URL}${localizePath(localeParam)}`

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(SITE_CONFIG.BASE_URL),
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url,
      locale: LOCALE_OG[localeParam],
    },
  }
}

/**
 * Prefixed locale homes (`/da`, `/de`). `/en` redirects to `/`.
 */
export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params

  if (locale === DEFAULT_LOCALE) {
    redirect('/')
  }

  if (!isLocale(locale)) {
    notFound()
  }

  return <HomePage />
}
