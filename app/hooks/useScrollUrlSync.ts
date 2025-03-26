'use client'

import { useEffect } from 'react'
import { Events, scroller, scrollSpy } from 'react-scroll'

export const useScrollUrlSync = () => {
  useEffect(() => {
    // Consistent scroll configuration
    const scrollConfig = {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80 // Consistent offset matching menu navigation
    }

    // Function to handle URL update when scrolling ends
    const handleScroll = (to: string) => {
      // Update URL without page reload
      window.history.replaceState(null, '', `#${to}`)
    }

    // Register the scroll end event
    Events.scrollEvent.register('end', handleScroll)

    // Initialize scroll spy
    scrollSpy.update()

    // Check for initial hash on load
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      // Use scroller with consistent configuration
      scroller.scrollTo(hash, {
        ...scrollConfig
      })
    }

    // Cleanup function to remove event listeners
    return () => {
      Events.scrollEvent.remove('end')
    }
  }, [])
}
