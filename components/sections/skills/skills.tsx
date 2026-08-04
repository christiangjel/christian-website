'use client'

import { useRef } from 'react'
import { useContent } from '@/components/layout/locale/locale-provider'
import { BulletList } from '@/components/ui/bullet-list'
import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useRevealInView } from '@/hooks/useRevealInView'
import { SECTIONS } from '@/constants'

export const Skills = () => {
  const content = useContent()

  const gridRef = useRef(null)
  const isReadyToReveal = useRevealInView(gridRef)

  const { categories } = content.skills
  // Each category contributes its heading (+1) plus its items to the cascade.
  const cascadeOffsets = categories.map((_, index) =>
    categories
      .slice(0, index)
      .reduce((total, category) => total + 1 + category.items.length, 0)
  )

  return (
    <section
      id={SECTIONS.SKILLS}
      className='pb-10 pt-16 md:pb-12 md:pt-20'
      aria-labelledby='skills-heading'
    >
      <SectionReveal>
        <h2
          id='skills-heading'
          className='mb-14 text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl'
        >
          {content.skills.title}
        </h2>
      </SectionReveal>

      <div
        ref={gridRef}
        className='grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3'
        role='list'
        aria-label={content.skills.ariaLabels.categories}
      >
        {categories.map((category, index) => (
          <div key={category.name} role='listitem'>
            <BulletList
              items={category.items}
              layout='grid'
              className='rounded-lg px-6 pb-6 pt-6'
              aria-labelledby={`category-heading-${index}`}
              animated
              isInView={isReadyToReveal}
              indexOffset={cascadeOffsets[index]}
              header={
                <h3
                  id={`category-heading-${index}`}
                  className='mb-4 border-l-4 border-mint pl-4 text-xl font-bold'
                >
                  {category.name}
                </h3>
              }
            />
          </div>
        ))}
      </div>
    </section>
  )
}
