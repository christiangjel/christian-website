import { SITE_CONFIG } from './config'
import { content } from '@/lib/content'

export const SITE_METADATA = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: [
    'Christian Gjelstrup',
    'Frontend Engineer',
    'React Developer',
    'Next.js Developer',
    'Vue Developer',
    'TypeScript Developer',
    'Freelance Developer',
    'Web Developer Berlin',
    'Frontend Developer Berlin',
    'React Consultant',
    'Vue Consultant'
  ],
  author: 'Christian Gjelstrup',
  jobTitle: content.hero.title,
  openGraphImage: {
    url: 'https://opengraph.b-cdn.net/production/images/c7a5d26b-bfd5-4921-9fa6-d463478b61b2.png?token=4yzqYrWnbzPaPl21BINRTyB1cNcMKqReB1hNHZ2fk3s&height=581&width=1200&expires=33279446044',
    width: 1200,
    height: 581,
    alt: 'Christian Gjelstrup - Frontend Engineer'
  },
  structuredData: {
    address: {
      locality: 'Berlin',
      country: 'DE'
    },
    knowsAbout: [
      'React',
      'Next.js',
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Web Development'
    ]
  }
}
