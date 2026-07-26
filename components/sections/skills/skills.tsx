'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useContent } from '@/components/layout/locale/locale-provider'
import { BulletList } from '@/components/ui/bullet-list'
import { SECTIONS, REVEAL_VIEWPORT } from '@/constants'

export const Skills = () => {
  const content = useContent()

  const gridRef = useRef(null)
  const isInView = useInView(gridRef, REVEAL_VIEWPORT)

  const { categories } = content.skills
  const cascadeOffsets = categories.map((_, index) =>
    categories
      .slice(0, index)
      .reduce((total, category) => total + category.items.length, 0)
  )

  return (
    <section
      id={SECTIONS.SKILLS}
      className='pt-14 pb-8'
      aria-labelledby='skills-heading'
    >
      <h2
        id='skills-heading'
        className='mb-12 text-3xl font-bold tracking-tight'
      >
        {content.skills.title}
      </h2>

      <div
        ref={gridRef}
        className='grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3'
        role='list'
        aria-label={content.skills.ariaLabels.categories}
      >
        {categories.map((category, index) => (
          <div key={category.name} role='listitem'>
            <h3
              id={`category-heading-${index}`}
              className='mb-4 border-l-4 border-mint pl-4 text-xl font-bold'
            >
              {category.name}
            </h3>
            <div className='rounded-lg pt-6 px-6 pb-6'>
              <BulletList
                items={category.items}
                layout='grid'
                aria-labelledby={`category-heading-${index}`}
                animated
                isInView={isInView}
                indexOffset={cascadeOffsets[index]}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
