'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { MoveRight } from 'lucide-react'
import { ProjectCard } from '@/components/ui/project-card/project-card'
import { scrollToSection } from '@/lib/utils'
import content from '@/data/content.json'

export const Projects = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Store tab bounds for animation
  const [tabBounds, setTabBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })

  // Update tab bounds when active tab changes or on resize
  useEffect(() => {
    const updateTabBounds = () => {
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
    }

    updateTabBounds()
    window.addEventListener('resize', updateTabBounds)
    return () => window.removeEventListener('resize', updateTabBounds)
  }, [activeTabIndex])

  const handleTabChange = (index: number) => {
    setDirection(index > activeTabIndex ? 1 : -1)
    setActiveTabIndex(index)
  }

  // Variants for animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%'
    }),
    center: {
      x: 0
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%'
    })
  }

  return (
    <section id='projects' className='py-14' aria-labelledby='projects-heading'>
      <h2
        id='projects-heading'
        className='text-3xl font-bold tracking-tight mb-12'
      >
        {content.projects.title}
      </h2>

      {/* Category Tabs */}
      <div
        className='relative grid w-full bg-transparent rounded-lg md:grid-cols-4 grid-cols-2'
        role='tablist'
        aria-orientation='horizontal'
      >
        {/* Sliding background for active tab */}
        <motion.div
          className='absolute z-10 rounded bg-secondary'
          initial={false}
          animate={{
            left: tabBounds.left,
            top: tabBounds.top,
            width: tabBounds.width,
            height: tabBounds.height
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut'
          }}
          aria-hidden='true'
        />

        {/* Tab buttons */}
        {content.projects.categories.map((category, index) => (
          <button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el
            }}
            className='relative z-20 flex items-center justify-center p-2 text-sm min-h-[40px]'
            onClick={() => handleTabChange(index)}
            role='tab'
            id={`tab-${index}`}
            aria-selected={activeTabIndex === index}
            aria-controls={`tabpanel-${index}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Project Content with sliding animation */}
      <div
        className='relative mt-6 mb-6 overflow-hidden'
        style={{ minHeight: '200px' }}
      >
        <AnimatePresence initial={false} custom={direction} mode='popLayout'>
          <motion.div
            key={activeTabIndex}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'tween', duration: 0.4, ease: 'easeInOut' }
            }}
            className='w-full'
            role='tabpanel'
            id={`tabpanel-${activeTabIndex}`}
            aria-labelledby={`tab-${activeTabIndex}`}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {content.projects.categories[activeTabIndex].items.map(
                (project, projectIndex) => (
                  <ProjectCard key={projectIndex} {...project} />
                )
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => scrollToSection('projects')}
        className='text-sm font-medium transition-colors hover:text-mint text-muted-foreground cursor-pointer'
        aria-label='View more projects'
      >
        More Projects
        <MoveRight className='inline-block ml-2 h-4 w-4' aria-hidden='true' />
      </button>
    </section>
  )
}
