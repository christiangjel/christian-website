import { MetadataRoute } from 'next'
import {
  SITE_CONFIG,
  SECTIONS,
  SECTION_IDS,
  LOCALES,
  localizePath,
} from '@/constants'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.BASE_URL
  const lastModified = new Date()

  const sectionIds = SECTION_IDS.filter(
    (id) => id !== SECTIONS.HERO && id !== SECTIONS.EDUCATION
  )

  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    const homePath = localizePath(locale)
    const homeUrl = homePath === '/' ? baseUrl : `${baseUrl}${homePath}`

    entries.push({
      url: homeUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: locale === 'en' ? 1 : 0.9,
    })

    for (const id of sectionIds) {
      entries.push({
        url: `${baseUrl}${localizePath(locale, id)}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: id === SECTIONS.CONTACT ? 0.7 : 0.8,
      })
    }
  }

  return entries
}
