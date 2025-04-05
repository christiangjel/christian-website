import type { ReactNode } from 'react'
import '@/app/globals.css'
import { fontNormal, fontBold } from '@/app/fonts'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import PageWrapper from '@/components/layout/page-wrapper/page-wrapper'

export const metadata = {
  title: 'Christian Gjelstrup | Frontend Engineer',
  description:
    'Portfolio of Christian Gjelstrup, a highly experienced freelance Frontend Engineer based in Berlin.',
  icons: {
    icon: [{ url: './favicon.ico' }, { url: './icon.png', type: 'image/png' }],
    apple: [{ url: './apple-touch-icon.png' }]
  },
  metadataBase: new URL('https://christiangjel.github.io/christian-website'),
  openGraph: {
    title: 'Christian Gjelstrup | Frontend Engineer',
    description:
      'Portfolio of Christian Gjelstrup, a highly experienced freelance Frontend Engineer based in Berlin.',
    url: 'https://christiangjel.github.io/christian-website',
    siteName: 'Christian Gjelstrup',
    type: 'website',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/c7a5d26b-bfd5-4921-9fa6-d463478b61b2.png?token=4yzqYrWnbzPaPl21BINRTyB1cNcMKqReB1hNHZ2fk3s&height=581&width=1200&expires=33279446044'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Gjelstrup | Frontend Engineer',
    description:
      'Portfolio of Christian Gjelstrup, a highly experienced freelance Frontend Engineer based in Berlin.',
    images: [
      'https://opengraph.b-cdn.net/production/images/c7a5d26b-bfd5-4921-9fa6-d463478b61b2.png?token=4yzqYrWnbzPaPl21BINRTyB1cNcMKqReB1hNHZ2fk3s&height=581&width=1200&expires=33279446044'
    ]
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={`${fontNormal.variable} ${fontBold.variable}`}
      suppressHydrationWarning
    >
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
