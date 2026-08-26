import { SECTIONS, SITE_CONFIG } from '@/constants'
import { localizePath } from '@/constants/locales'
import { getContent } from '@/lib/content'

/**
 * Builds the `/llms.txt` index following the llmstxt.org format.
 */
export const buildLlmsTxt = (): string => {
  const content = getContent('en')
  const baseUrl = SITE_CONFIG.BASE_URL

  const sectionLinks = content.navigation.items
    .map((item) => `- [${item.title}](${baseUrl}/#${item.href})`)
    .join('\n')

  return [
    '# Christian Gjelstrup',
    '',
    `> ${content.meta.description}`,
    '',
    '## Portfolio',
    '',
    `- [Full portfolio (Markdown)](${baseUrl}/index.md): Complete profile, experience, projects, and contact details`,
    `- [Full portfolio (single file)](${baseUrl}/llms-full.txt): Same content as index.md for one-fetch ingestion`,
    `- [Homepage](${baseUrl}/): Interactive portfolio website with AI assistant`,
    `- [Danish homepage](${baseUrl}${localizePath('da')}): Localised portfolio (da)`,
    `- [German homepage](${baseUrl}${localizePath('de')}): Localised portfolio (de)`,
    `- [GitHub repository](${SITE_CONFIG.REPO_URL}): Source code for this site`,
    '',
    '## Sections',
    '',
    sectionLinks,
    '',
    '## Ecommerce platform',
    '',
    `- [Webshop section](${baseUrl}/#${SECTIONS.WEB_SHOP}): ${content.webShop.title} — multi-tenant ecommerce platform built with Payload CMS, Next.js, and Stripe`,
    `- [Product website](https://caravano.app/): Live demos and pricing for the ecommerce platform`,
    '',
    '## Contact',
    '',
    `- **Email:** ${content.contact.email}`,
    `- **Phone:** ${content.contact.phone}`,
    `- **Location:** ${content.contact.location}`,
    `- [Contact section](${baseUrl}/#${SECTIONS.CONTACT}): Contact form and social links`,
    '',
    '## Optional',
    '',
    `- [Sitemap](${baseUrl}/sitemap.xml): All public URLs`,
    `- [Robots](${baseUrl}/robots.txt): Crawler and content-use policy`,
  ].join('\n')
}
