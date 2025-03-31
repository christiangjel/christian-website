'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface PreloaderProps {
  onComplete?: () => void
  duration?: number
}

const Preloader = ({ onComplete, duration = 3000 }: PreloaderProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let animationFrameId: number
    let startTime: number

    // Smooth animation function using requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const elapsedTime = timestamp - startTime
      const progressPercent = Math.min((elapsedTime / duration) * 100, 100)

      setProgress(progressPercent)

      if (progressPercent < 100) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        // Reached 100%, trigger completion
        if (onComplete) {
          setTimeout(onComplete, 500) // Small delay to show 100% before transitioning
        }
      }
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [onComplete, duration])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      <Loader2 className='h-12 w-12 animate-spin text-[#64f2c2]' />
      <div className='mt-6 w-48 h-1 bg-gray-800 rounded-full overflow-hidden'>
        <div
          className='h-full bg-[#64f2c2] transition-all duration-100 ease-out'
          style={{ width: `${Math.round(progress)}%` }}
        />
      </div>
      <div className='mt-3 font-normal text-sm text-gray-400'>
        {Math.round(progress)}%
      </div>
    </div>
  )
}

export default Preloader
