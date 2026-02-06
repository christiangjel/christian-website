'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { use100vh } from 'react-div-100vh'
import { ANIMATION_CONFIG } from '@/constants'
import { debounce } from '@/lib/utils'

const VIEWPORT_HEIGHT_VAR = '--viewport-height'
const VIEWPORT_WIDTH_VAR = '--viewport-width'

const setViewportWidth = (): void => {
  const width =
    window.visualViewport?.width ?? window.innerWidth
  document.documentElement.style.setProperty(
    VIEWPORT_WIDTH_VAR,
    `${width}px`
  )
}

type ViewportHeightProviderProps = {
  children: ReactNode
}

/**
 * Sets --viewport-height (from react-div-100vh) and --viewport-width on the document root.
 * react-div-100vh provides a stable height that does not update when the mobile address bar
 * shows/hides during scroll, avoiding layout jump. Width is updated on load and resize.
 */
export const ViewportHeightProvider = ({
  children
}: ViewportHeightProviderProps) => {
  const height = use100vh()

  useEffect(() => {
    if (height !== null) {
      document.documentElement.style.setProperty(
        VIEWPORT_HEIGHT_VAR,
        `${height}px`
      )
    }
  }, [height])

  useEffect(() => {
    setViewportWidth()
    const handleResize = debounce(
      setViewportWidth,
      ANIMATION_CONFIG.RESIZE_DEBOUNCE_DELAY
    )
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <>{children}</>
}
