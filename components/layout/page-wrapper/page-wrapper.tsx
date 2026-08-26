'use client'

import { useState, useEffect, lazy, Suspense, memo, startTransition } from 'react'
import type { ReactNode } from 'react'
import { useContent } from '@/components/layout/locale/locale-provider'
import { CometSpinner } from '@/components/ui/comet-spinner/comet-spinner'
import { CUSTOM_EVENTS, PRELOADER_CONFIG } from '@/constants'

const WavesAnimation = lazy(() =>
  import('@/components/layout/waves-animation/waves-animation').then((mod) => ({
    default: mod.WavesAnimation,
  }))
)

type PageWrapperProps = {
  children: ReactNode
}

const PageWrapper = memo<PageWrapperProps>(({ children }) => {
  const content = useContent()
  const [isWebGLReady, setIsWebGLReady] = useState(false)

  useEffect(() => {
    const startedAt = Date.now()
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const handleWebGLComplete = (): void => {
      const remaining = Math.max(
        0,
        PRELOADER_CONFIG.MIN_DISPLAY_MS - (Date.now() - startedAt)
      )

      const dismiss = (): void => {
        startTransition(() => setIsWebGLReady(true))
      }

      if (remaining === 0) {
        dismiss()
        return
      }

      timeoutId = setTimeout(dismiss, remaining)
    }

    window.addEventListener(
      CUSTOM_EVENTS.WEBGL_LOAD_COMPLETE,
      handleWebGLComplete as EventListener
    )

    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.WEBGL_LOAD_COMPLETE,
        handleWebGLComplete as EventListener
      )
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className='bg-background'>
      <div
        className={`fixed inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-200 ${
          isWebGLReady
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-100'
        }`}
        aria-hidden={isWebGLReady}
      >
        <CometSpinner
          className='h-7 w-7'
          label={content.preloader.loading}
        />
      </div>

      <div
        className={`relative w-full min-h-[100svh] transition-opacity duration-200 ${
          isWebGLReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Suspense fallback={null}>
          <WavesAnimation />
        </Suspense>
        {children}
      </div>
    </div>
  )
})

PageWrapper.displayName = 'PageWrapper'

export { PageWrapper }
