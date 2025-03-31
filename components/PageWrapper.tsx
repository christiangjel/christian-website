'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/ui/Preloader'
import { WavesAnimation } from '@/components/layout/wavesAnimation/wavesAnimation'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  //   const [isLoading, setIsLoading] = useState(true)
  const [isAnimationReady, setIsAnimationReady] = useState(false)

  // Handle loading complete
  //   const handleLoadComplete = () => {
  //     setIsLoading(false)
  //   }

  // Listen for webgl-load-complete event from WavesAnimation
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
      //   clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <>
      {/* {isLoading && (
        <Preloader onComplete={handleLoadComplete} duration={3500} />
      )} */}
      {!isAnimationReady && <Preloader duration={3000} />}
      <div
        className={`relative min-h-screen bg-background transition-opacity duration-500 ${
          isAnimationReady ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <WavesAnimation />
        {children}
      </div>
    </>
  )
}

export default PageWrapper
