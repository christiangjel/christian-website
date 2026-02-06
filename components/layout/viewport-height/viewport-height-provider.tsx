'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants'
import { debounce } from '@/lib/utils'

const VIEWPORT_HEIGHT_VAR = '--viewport-height'
const VIEWPORT_WIDTH_VAR = '--viewport-width'

const setViewportVariables = (): void => {
  const height =
    window.visualViewport?.height ?? window.innerHeight
  const width =
    window.visualViewport?.width ?? window.innerWidth
  document.documentElement.style.setProperty(
    VIEWPORT_HEIGHT_VAR,
    `${height}px`
  )
  document.documentElement.style.setProperty(
    VIEWPORT_WIDTH_VAR,
    `${width}px`
  )
}

type ViewportHeightProviderProps = {
  children: ReactNode
}

/**
 * Sets --viewport-height and --viewport-width on the document root.
 * Updated on load and on debounced window resize only (not on visualViewport.resize),
 * so layout stays stable when the mobile browser bar toggles during scroll.
 */
export const ViewportHeightProvider = ({
  children
}: ViewportHeightProviderProps) => {
  useEffect(() => {
    setViewportVariables()

    const handleResize = debounce(
      setViewportVariables,
      ANIMATION_CONFIG.RESIZE_DEBOUNCE_DELAY
    )

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>{children}</>
}
