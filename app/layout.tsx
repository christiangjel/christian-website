import type React from 'react'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/layout/theme/theme-provider'
import { Mona_Sans as Mono_Sans } from 'next/font/google'

// Load Mona Sans font
const mono = Mono_Sans({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Christian Gjelstrup | Frontend Engineer',
  description:
    'Portfolio of Christian Gjelstrup, a highly experienced freelance Frontend Engineer based in Berlin.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang='en' suppressHydrationWarning className={mono.variable}>
    <html lang='en' className={mono.variable}>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
