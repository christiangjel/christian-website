import type { ReactNode } from 'react'
import '@/app/globals.css'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import PageWrapper from '@/components/layout/pageWrapper/pageWrapper'

const fontNormal = localFont({
  src: './mono-normal.woff2',
  variable: '--font-normal'
})

const fontBold = localFont({
  src: './mono-bold.woff2',
  variable: '--font-bold'
})

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
      suppressHydrationWarning
      className={`${fontNormal.variable} ${fontBold.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <PageWrapper>{children}</PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
