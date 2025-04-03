'use client'
import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, render a minimal version that matches server rendering
  if (!mounted) {
    return <div className='dark'>{children}</div>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
