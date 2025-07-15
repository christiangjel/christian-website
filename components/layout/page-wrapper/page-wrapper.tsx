'use client'

import React, { useState, useEffect } from 'react'
import { WavesAnimation } from '@/components/layout/waves-animation/waves-animation'
import { Loader2 } from 'lucide-react'

interface PageWrapperProps {
  children: React.ReactNode
}

const WEBGL_LOAD_EVENT = 'webgl-load-complete'

const PageWrapper = React.memo<PageWrapperProps>(({ children }) => {
  const [isWebGLReady, setIsWebGLReady] = useState(false)

  useEffect(() => {
    const handleWebGLComplete = (): void => {
      setIsWebGLReady(true)
    }

    window.addEventListener(
      WEBGL_LOAD_EVENT,
      handleWebGLComplete as EventListener
    )

    return () => {
      window.removeEventListener(
        WEBGL_LOAD_EVENT,
        handleWebGLComplete as EventListener
      )
    }
  }, [])

  const preloaderStyle: React.CSSProperties = {
    pointerEvents: isWebGLReady ? 'none' : 'auto'
  }

  return (
    <div className='bg-background'>
      {/* preloader */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
          isWebGLReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={preloaderStyle}
        aria-hidden={isWebGLReady}
      >
        <Loader2 className='h-12 w-12 animate-spin text-mint' />
      </div>

      {/* page content */}
      <div
        className={`relative w-full min-h-screen transition-opacity duration-200 ${
          isWebGLReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <WavesAnimation />
        {children}
      </div>
    </div>
  )
})

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
