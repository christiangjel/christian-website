import type React from 'react'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import { Mona_Sans as Mono_Sans } from 'next/font/google'

// Load Mona Sans font
const mono = Mono_Sans({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Christian Gjelstrup | Frontend Engineer',
  description:
    'Portfolio of Christian Gjelstrup, a highly experienced freelance Frontend Engineer based in Berlin.',
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png' }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning className={mono.variable}>
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
