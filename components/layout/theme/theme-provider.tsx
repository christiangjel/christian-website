'use client'

import React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps
} from 'next-themes'

type CustomThemeProviderProps = ThemeProviderProps & {
  children: React.ReactNode
}

export const ThemeProvider = React.memo<CustomThemeProviderProps>(
  ({ children, ...props }) => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    // Prevent hydration mismatch by rendering a consistent fallback
    if (!mounted) {
      return <div suppressHydrationWarning>{children}</div>
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }
)

ThemeProvider.displayName = 'ThemeProvider'
