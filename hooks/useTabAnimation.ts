import { useState, useRef, useEffect, useCallback } from 'react'

type TabBounds = {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Custom hook that manages tab animation state and bounds calculation.
 * Handles sliding background animation for tab navigation.
 *
 * @param tabCount - Number of tabs
 * @returns Object with tab state and handlers
 */
export const useTabAnimation = (tabCount: number) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const [tabBounds, setTabBounds] = useState<TabBounds>({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Update tab bounds when active tab changes or on resize
  const updateTabBounds = useCallback(() => {
    const activeTabElement = tabRefs.current[activeTabIndex]
    if (!activeTabElement) return

    const rect = activeTabElement.getBoundingClientRect()
    const parentRect =
      activeTabElement.parentElement?.getBoundingClientRect() || {
        left: 0,
        top: 0
      }

    setTabBounds({
      left: rect.left - parentRect.left,
      top: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height
    })
  }, [activeTabIndex])

  useEffect(() => {
    updateTabBounds()
    window.addEventListener('resize', updateTabBounds)
    return () => window.removeEventListener('resize', updateTabBounds)
  }, [updateTabBounds])

  const handleTabChange = useCallback((index: number) => {
    setDirection(index > activeTabIndex ? 1 : -1)
    setActiveTabIndex(index)
  }, [activeTabIndex])

  return {
    activeTabIndex,
    hoveredTabIndex,
    setHoveredTabIndex,
    direction,
    tabBounds,
    tabRefs,
    handleTabChange
  }
}
