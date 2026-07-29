'use client'

import { useInView } from 'framer-motion'
import type { RefObject } from 'react'
import { REVEAL_VIEWPORT } from '@/constants'
import { useWebGLReady } from '@/hooks/useWebGLReady'

/**
 * Scroll-triggered reveal that waits for the WebGL preloader to finish.
 * Without this gate, above-the-fold sections fire while the page is still
 * opacity-0 and the animation is already done when content becomes visible.
 */
export const useRevealInView = (
  ref: RefObject<Element | null>
): boolean => {
  const isInView = useInView(ref, REVEAL_VIEWPORT)
  const isWebGLReady = useWebGLReady()

  return isInView && isWebGLReady
}
