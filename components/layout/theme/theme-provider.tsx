'use client'

import { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps
} from 'next-themes'

type CustomThemeProviderProps = ThemeProviderProps & {
  children: ReactNode
}

export const ThemeProvider = memo<CustomThemeProviderProps>(
  ({ children, ...props }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
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
