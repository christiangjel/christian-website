'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  createRevealCascade,
  revealLineVariants
} from '@/lib/animations/reveal-variants'

type BulletListItem = string | { name: string; level?: string }

type BulletListProps = {
  items: BulletListItem[]
  layout?: 'grid' | 'vertical' | 'horizontal' | 'grid-3'
  className?: string
  itemClassName?: string
  'aria-labelledby'?: string
  animated?: boolean
  isInView?: boolean
  /** Starting cascade index, so multiple lists animate as one continuous sequence. */
  indexOffset?: number
}

const getContainerClass = (layout: BulletListProps['layout']) => {
  switch (layout) {
    case 'grid':
      return 'grid grid-cols-1 gap-2'
    case 'grid-3':
      return 'grid grid-cols-1 gap-2 md:grid-cols-3'
    case 'horizontal':
      return 'flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-2'
    default:
      return 'space-y-2'
  }
}

const getItemKey = (item: BulletListItem, index: number) => {
  if (typeof item === 'string') {
    return item
  }

  return `${item.name}-${item.level || 'no-level'}-${index}`
}

const renderItemContent = (item: BulletListItem) => {
  const isString = typeof item === 'string'
  const name = isString ? item : item.name
  const level = isString ? undefined : item.level
  const processedName = name.replace(/\//g, '/\u200B')

  return (
    <>
      <span
        className='h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint'
        aria-hidden='true'
      />
      <span className='whitespace-pre-line text-muted-foreground'>
        {processedName}
        {level && ` (${level})`}
      </span>
    </>
  )
}

export const BulletList = ({
  items,
  layout = 'vertical',
  className = '',
  itemClassName = '',
  'aria-labelledby': ariaLabelledBy,
  animated = false,
  isInView = false,
  indexOffset = 0
}: BulletListProps) => {
  const containerClass = getContainerClass(layout)

  if (!animated) {
    return (
      <div
        className={cn(containerClass, className)}
        role='list'
        aria-labelledby={ariaLabelledBy}
      >
        {items.map((item, index) => (
          <div
            key={getItemKey(item, index)}
            className={cn('flex items-center gap-2', itemClassName)}
            role='listitem'
          >
            {renderItemContent(item)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(containerClass, className)}
      role='list'
      aria-labelledby={ariaLabelledBy}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={createRevealCascade(indexOffset)}
    >
      {items.map((item, index) => (
        <motion.div
          key={getItemKey(item, index)}
          className={cn('flex items-center gap-2', itemClassName)}
          role='listitem'
          variants={revealLineVariants}
        >
          {renderItemContent(item)}
        </motion.div>
      ))}
    </motion.div>
  )
}
