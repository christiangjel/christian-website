'use client'

import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@/components/ui/project-card/project-card'
import { scrollToSection } from '@/lib/utils'
import { content } from '@/lib/content'
import { SECTIONS, TAB_ANIMATION } from '@/constants'
import { useTabAnimation } from '@/hooks/useTabAnimation'
import { cn } from '@/lib/utils'

// Animation variants
const slideVariants = {
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

/**
 * Projects section component with animated category tabs.
 * Displays projects organized by category with smooth transitions.
 */
export const Projects = () => {
  const {
    activeTabIndex,
    hoveredTabIndex,
    setHoveredTabIndex,
    direction,
    tabBounds,
    tabRefs,
    handleTabChange
  } = useTabAnimation(content.projects.categories.length)

  const handleViewMoreClick = useCallback(() => {
    scrollToSection(SECTIONS.PROJECTS)
  }, [])

  return (
    <section
      id={SECTIONS.PROJECTS}
      className='py-14'
      aria-labelledby='projects-heading'
    >
      <h2
        id='projects-heading'
        className='mb-12 text-3xl font-bold tracking-tight'
      >
        {content.projects.title}
      </h2>

      {/* Category Tabs */}
      <div
        className='relative grid w-full grid-cols-2 rounded-lg bg-transparent md:grid-cols-4'
        role='tablist'
        aria-orientation='horizontal'
      >
        {/* Sliding background for active tab */}
        <motion.div
          className='absolute z-10 rounded border border-mint bg-mint/5 shadow-md backdrop-blur'
          initial={false}
          animate={{
            left: tabBounds.left,
            top: tabBounds.top,
            width: tabBounds.width,
            height: tabBounds.height
          }}
          transition={{
            duration: TAB_ANIMATION.DURATION,
            ease: TAB_ANIMATION.EASING
          }}
          aria-hidden='true'
        />

        {/* Tab buttons */}
        {content.projects.categories.map((category, index) => {
          const isActive = activeTabIndex === index
          const isHovered = hoveredTabIndex === index

          return (
            <button
              key={category.name}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              className={cn(
                'relative z-20 flex min-h-[40px] items-center justify-center p-2 text-sm transition-colors',
                isActive || isHovered ? 'text-mint' : 'text-muted-foreground'
              )}
              onClick={() => handleTabChange(index)}
              onMouseEnter={() => setHoveredTabIndex(index)}
              onMouseLeave={() => setHoveredTabIndex(null)}
              role='tab'
              id={`tab-${index}`}
              aria-selected={activeTabIndex === index}
              aria-controls={`tabpanel-${index}`}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Project Content with sliding animation */}
      <div className='relative mb-6 mt-6 min-h-[200px] overflow-hidden'>
        <AnimatePresence initial={false} custom={direction} mode='popLayout'>
          <motion.div
            key={activeTabIndex}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: {
                type: 'tween',
                duration: TAB_ANIMATION.DURATION,
                ease: TAB_ANIMATION.EASING
              }
            }}
            className='w-full'
            role='tabpanel'
            id={`tabpanel-${activeTabIndex}`}
            aria-labelledby={`tab-${activeTabIndex}`}
          >
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {content.projects.categories[activeTabIndex].items.map(
                (project) => (
                  <ProjectCard key={project.title} {...project} />
                )
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleViewMoreClick}
        className='cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-mint'
        aria-label={content.projects.ariaLabels.viewMore}
      >
        {content.projects.viewMore} &#8594;
      </button>
    </section>
  )
}
