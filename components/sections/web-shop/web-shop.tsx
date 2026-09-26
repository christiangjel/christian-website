'use client'

import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentPanel } from '@/components/ui/content-panel/content-panel'
import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { scrollToSection } from '@/lib/utils'
import { useContent } from '@/components/layout/locale/locale-provider'
import { SECTIONS, TAB_ANIMATION } from '@/constants'
import { useTabAnimation } from '@/hooks/useTabAnimation'
import { cn } from '@/lib/utils'

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
 * Ecommerce section with animated tabs for overview, features, technology, and product.
 */
export const WebShop = () => {
  const content = useContent()

  const {
    activeTabIndex,
    hoveredTabIndex,
    setHoveredTabIndex,
    direction,
    tabBounds,
    tabRefs,
    handleTabChange
  } = useTabAnimation(content.webShop.categories.length)

  const handleContactClick = useCallback(() => {
    scrollToSection(SECTIONS.CONTACT)
  }, [])

  const activeCategory = content.webShop.categories[activeTabIndex]

  return (
    <section
      id={SECTIONS.ECOMMERCE}
      className='py-16 md:py-20'
      aria-labelledby='ecommerce-heading'
    >
      <SectionReveal>
        <h2
          id='ecommerce-heading'
          className='mb-14 text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl'
        >
          {content.webShop.title}
        </h2>

        <div
          className='relative grid w-full grid-cols-2 rounded-lg bg-transparent md:grid-cols-4'
          role='tablist'
          aria-orientation='horizontal'
        >
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

          {content.webShop.categories.map((category, index) => {
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
                id={`ecommerce-tab-${index}`}
                aria-selected={isActive}
                aria-controls={`ecommerce-tabpanel-${index}`}
              >
                {category.label}
              </button>
            )
          })}
        </div>

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
              id={`ecommerce-tabpanel-${activeTabIndex}`}
              aria-labelledby={`ecommerce-tab-${activeTabIndex}`}
            >
              {activeCategory && <ContentPanel category={activeCategory} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type='button'
          onClick={handleContactClick}
          className='cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-mint'
          aria-label={content.webShop.cta.contact.ariaLabel}
        >
          {content.webShop.cta.contact.label} &#8594;
        </button>
      </SectionReveal>
    </section>
  )
}
