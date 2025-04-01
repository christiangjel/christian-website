'use client'

import { useState, useEffect } from 'react'
import { WavesAnimation } from '@/components/layout/wavesAnimation/wavesAnimation'
import { Loader2 } from 'lucide-react'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isAnimationReady, setIsAnimationReady] = useState(false)

  // Listen for webgl-load-complete event from animationUtils
  useEffect(() => {
    const handleWebGLComplete = () => {
      setIsAnimationReady(true)
    }
    // eslint-disable-next-line
    window.addEventListener('webgl-load-complete' as any, handleWebGLComplete)

    return () => {
      window.removeEventListener(
        // eslint-disable-next-line
        'webgl-load-complete' as any,
        handleWebGLComplete
      )
    }
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
          isAnimationReady ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Loader2 className='h-12 w-12 animate-spin text-[#64f2c2]' />
      </div>

      <div
        className={`relative min-h-screen bg-background transition-opacity duration-200 ${
          isAnimationReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <WavesAnimation />
        {children}
      </div>
    </>
  )
}

export default PageWrapper
