'use client'

import { useState, useEffect } from 'react'
import { WavesAnimation } from '@/components/layout/waves-animation/waves-animation'
import { Loader2 } from 'lucide-react'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isWebGLReady, setIsWebGLReady] = useState(false)

  // Listen for webgl-load-complete event from animationUtils
  useEffect(() => {
    const handleWebGLComplete = () => {
      setIsWebGLReady(true)
    }

    window.addEventListener(
      'webgl-load-complete',
      handleWebGLComplete as EventListener
    )

    return () => {
      window.removeEventListener(
        'webgl-load-complete',
        handleWebGLComplete as EventListener
      )
    }
  }, [])

  return (
    <div className='bg-background'>
      {/* preloader */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
          isWebGLReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ pointerEvents: isWebGLReady ? 'none' : 'auto' }}
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
}

export default PageWrapper
