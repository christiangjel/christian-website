import type { ReactNode } from 'react'
import '@/app/globals.css'
import { fontNormal, fontBold } from '@/app/fonts'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import PageWrapper from '@/components/layout/page-wrapper/page-wrapper'

export const metadata = {
  title: 'Christian Gjelstrup | Frontend Engineer',
  description:
    'Freelance Frontend Engineer based in Berlin. Expert in React, Next.js, Vue, Nuxt, TypeScript, and modern web technologies. Available for freelance projects.',
  keywords: [
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
  authors: [{ name: 'Christian Gjelstrup' }],
  creator: 'Christian Gjelstrup',
  icons: {
    icon: [{ url: './favicon.ico' }, { url: './icon.png', type: 'image/png' }],
    apple: [{ url: './apple-touch-icon.png' }]
  },
  metadataBase: new URL('https://christiangjel.github.io/christian-website'),
  alternates: {
    canonical: 'https://christiangjel.github.io/christian-website'
  },
  openGraph: {
    title: 'Christian Gjelstrup | Frontend Engineer',
    description:
      'Freelance Frontend Engineer based in Berlin. Expert in React, Next.js, Vue, Nuxt, TypeScript, and modern web technologies.',
    url: 'https://christiangjel.github.io/christian-website',
    siteName: 'Christian Gjelstrup',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/c7a5d26b-bfd5-4921-9fa6-d463478b61b2.png?token=4yzqYrWnbzPaPl21BINRTyB1cNcMKqReB1hNHZ2fk3s&height=581&width=1200&expires=33279446044',
        width: 1200,
        height: 581,
        alt: 'Christian Gjelstrup - Frontend Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Gjelstrup | Frontend Engineer',
    description:
      'Freelance Frontend Engineer based in Berlin. Expert in React, Next.js, Vue, Nuxt, TypeScript, and modern web technologies.',
    images: [
      'https://opengraph.b-cdn.net/production/images/c7a5d26b-bfd5-4921-9fa6-d463478b61b2.png?token=4yzqYrWnbzPaPl21BINRTyB1cNcMKqReB1hNHZ2fk3s&height=581&width=1200&expires=33279446044'
    ]
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Christian Gjelstrup',
    jobTitle: 'Frontend Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE'
    },
    email: 'gjelstrup78@protonmail.com',
    telephone: '+49 15787005997',
    url: 'https://christiangjel.github.io/christian-website',
    sameAs: [
      'https://www.linkedin.com/in/christiangjelstrup',
      'https://www.xing.com/profile/Christian_Gjelstrup',
      'https://github.com/christiangjel/christian-website'
    ],
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
