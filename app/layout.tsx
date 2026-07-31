import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'
import { fontMono } from '@/app/fonts'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import { LocaleProvider } from '@/components/layout/locale/locale-provider'
import { PageWrapper } from '@/components/layout/page-wrapper/page-wrapper'
import { ChatAssistantRoot } from '@/components/ui/chat-widget/chat-assistant-root'
import { ErrorBoundary } from '@/components/error-boundary'
import { SITE_CONFIG } from '@/constants'
import { SITE_METADATA } from '@/constants/metadata'
import { getContent } from '@/lib/content'
import { getLanguageAlternates, LOCALE_HTML_LANG, LOCALE_OG } from '@/constants/locales'

const defaultContent = getContent('en')

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  icons: {
    icon: [{ url: './favicon.ico' }, { url: './icon.png', type: 'image/png' }],
    apple: [{ url: './apple-touch-icon.png' }],
  },
  metadataBase: new URL(SITE_CONFIG.BASE_URL),
  alternates: {
    canonical: SITE_CONFIG.BASE_URL,
    languages: getLanguageAlternates(SITE_CONFIG.BASE_URL),
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_CONFIG.BASE_URL,
    siteName: SITE_METADATA.author,
    type: 'website',
    locale: LOCALE_OG.en,
    images: [SITE_METADATA.openGraphImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.openGraphImage.url],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
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
      addressCountry: SITE_METADATA.structuredData.address.country,
    },
    email: defaultContent.contact.email,
    telephone: defaultContent.contact.phone,
    url: SITE_CONFIG.BASE_URL,
    sameAs: defaultContent.contact.social.map((item) => item.url),
    knowsAbout: SITE_METADATA.structuredData.knowsAbout,
  }

  return (
    <html
      lang={LOCALE_HTML_LANG.en}
      className={`dark ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/*  ignore attribute mismatches caused by extensions */}
      <body
        className='min-h-screen bg-background text-foreground antialiased'
        suppressHydrationWarning
      >
        <LocaleProvider>
          <ChatAssistantRoot>
            <ErrorBoundary>
              <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem={false}
              >
                <PageWrapper>{children}</PageWrapper>
              </ThemeProvider>
            </ErrorBoundary>
          </ChatAssistantRoot>
        </LocaleProvider>
      </body>
    </html>
  )
}
