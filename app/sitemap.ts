import { MetadataRoute } from 'next'
import { SITE_CONFIG, SECTIONS, SECTION_IDS } from '@/constants'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.BASE_URL
  const lastModified = new Date()

  const sectionEntries = SECTION_IDS.filter(
    (id) => id !== SECTIONS.HERO && id !== SECTIONS.EDUCATION
  ).map((id) => ({
    url: `${baseUrl}/#${id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: id === SECTIONS.CONTACT ? 0.7 : 0.8
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1
    },
    ...sectionEntries
  ]
}
