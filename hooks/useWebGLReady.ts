'use client'

import { startTransition, useEffect, useState } from 'react'
import { CUSTOM_EVENTS } from '@/constants/events'

let isWebGLReadyGlobal = false

/**
 * Tracks whether the WebGL background has finished loading.
 * Uses a module-level flag so late-mounting components (e.g. Hero) don't
 * miss the load event if it fired before their effect ran.
 */
export const useWebGLReady = (): boolean => {
  const [isReady, setIsReady] = useState(isWebGLReadyGlobal)

  useEffect(() => {
    if (isWebGLReadyGlobal) {
      return
    }

    const handleReady = (): void => {
      isWebGLReadyGlobal = true
      startTransition(() => {
        setIsReady(true)
      })
    }

    window.addEventListener(
      CUSTOM_EVENTS.WEBGL_LOAD_COMPLETE,
      handleReady as EventListener
    )

    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.WEBGL_LOAD_COMPLETE,
        handleReady as EventListener
      )
    }
  }, [])

  return isReady
}
