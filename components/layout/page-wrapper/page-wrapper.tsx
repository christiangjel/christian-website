'use client'

import { useState, useEffect, lazy, Suspense, memo, startTransition } from 'react'
import type { ReactNode } from 'react'
import { useContent } from '@/components/layout/locale/locale-provider'
import { CometSpinner } from '@/components/ui/comet-spinner/comet-spinner'
import { CUSTOM_EVENTS } from '@/constants/events'

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
    const handleWebGLComplete = (): void => {
      startTransition(() => {
        setIsWebGLReady(true)
      })
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
