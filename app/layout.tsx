import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import '@/app/globals.css'
import { fontNormal, fontBold } from '@/app/fonts'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import PageWrapper from '@/components/layout/page-wrapper/page-wrapper'
import { SITE_CONFIG } from '@/constants'
import { SITE_METADATA } from '@/constants/metadata'
import { content } from '@/lib/content'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  icons: {
    icon: [{ url: './favicon.ico' }, { url: './icon.png', type: 'image/png' }],
    apple: [{ url: './apple-touch-icon.png' }]
  },
  metadataBase: new URL(SITE_CONFIG.BASE_URL),
  alternates: {
    canonical: SITE_CONFIG.BASE_URL
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_CONFIG.BASE_URL,
    siteName: SITE_METADATA.author,
    type: 'website',
    locale: 'en_US',
    images: [SITE_METADATA.openGraphImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.openGraphImage.url]
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_METADATA.author,
    jobTitle: SITE_METADATA.jobTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_METADATA.structuredData.address.locality,
      addressCountry: SITE_METADATA.structuredData.address.country
    },
    email: content.contact.email,
    telephone: content.contact.phone,
    url: SITE_CONFIG.BASE_URL,
    sameAs: content.contact.social.map((item) => item.url),
    knowsAbout: SITE_METADATA.structuredData.knowsAbout
  }

  return (
    <html lang='en' className={`${fontNormal.variable} ${fontBold.variable}`}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/*  ignore attribute mismatches caused by extensions */}
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          <PageWrapper>{children}</PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
