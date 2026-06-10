'use client'

import { memo } from 'react'
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
    return (
      <NextThemesProvider forcedTheme='dark' enableSystem={false} {...props}>
        {children}
      </NextThemesProvider>
    )
  }
)

ThemeProvider.displayName = 'ThemeProvider'
