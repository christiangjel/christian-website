import type React from 'react'
import '@/app/globals.css'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'

const fontNormal = localFont({
  src: './mono-normal.woff2',
  variable: '--font-normal',
  display: 'swap'
})

const fontBold = localFont({
  src: './mono-bold.woff2',
  variable: '--font-bold',
  display: 'swap'
})

export const metadata = {
  title: 'Christian Gjelstrup | Frontend Engineer',
  description:
    'Portfolio of Christian Gjelstrup, a highly experienced freelance Frontend Engineer based in Berlin.',
  icons: {
    icon: [{ url: './favicon.ico' }, { url: './icon.png', type: 'image/png' }],
    apple: [{ url: './apple-touch-icon.png' }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
