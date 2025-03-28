'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ProjectCard } from '@/components/ui/project-card/project-card'
import content from '@/data/content.json'

export const Projects = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const [tabBounds, setTabBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })

  useEffect(() => {
    const updateTabBounds = () => {
      const activeTabElement = tabRefs.current[activeTabIndex]
      if (!activeTabElement) return

      const rect = activeTabElement.getBoundingClientRect()
      const parentRect = activeTabElement.parentElement!.getBoundingClientRect()

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

  const handleTabChange = (index: number) => setActiveTabIndex(index)

  return (
    <section id='projects' className='py-14'>
      <h2 className='text-3xl font-bold tracking-tight mb-12'>
        {content.projects.title}
      </h2>

      <div className='relative grid w-full bg-transparent rounded-lg overflow-hidden md:grid-cols-4 grid-cols-2'>
        {/* Sliding background */}
        <motion.div
          className='absolute z-0 rounded bg-secondary'
          initial={false}
          animate={{
            left: tabBounds.left,
            top: tabBounds.top,
            width: tabBounds.width,
            height: tabBounds.height
          }}
          transition={{ type: 'easeIn', duration: 0.1 }}
        />

        {/* Tab buttons */}
        {content.projects.categories.map((category, index) => (
          <button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el
            }}
            className='relative z-10 flex items-center justify-center p-2 text-sm min-h-[40px]'
            onClick={() => handleTabChange(index)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Project content */}
      <div className='mt-6'>
        {content.projects.categories.map((category, index) => (
          <div
            key={index}
            className={`${activeTabIndex === index ? 'block' : 'hidden'}`}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {category.items.map((project, projectIndex) => (
                <ProjectCard key={projectIndex} {...project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
