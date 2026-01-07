type BulletListItem = string | { name: string; level?: string }

interface BulletListProps {
  items: BulletListItem[]
  layout?: 'grid' | 'vertical' | 'horizontal' | 'grid-3'
  className?: string
  itemClassName?: string
  'aria-labelledby'?: string
}

export const BulletList = ({
  items,
  layout = 'vertical',
  className = '',
  itemClassName = '',
  'aria-labelledby': ariaLabelledBy
}: BulletListProps) => {
  const containerClass =
    layout === 'grid'
      ? 'grid grid-cols-2 gap-x-2 gap-y-3'
      : layout === 'grid-3'
      ? 'grid grid-cols-1 gap-2 md:grid-cols-3'
      : layout === 'horizontal'
      ? 'flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-2'
      : 'space-y-2'

  return (
    <div
      className={`${containerClass} ${className}`}
      role='list'
      aria-labelledby={ariaLabelledBy}
    >
      {items.map((item, index) => {
        const isString = typeof item === 'string'
        const name = isString ? item : item.name
        const level = isString ? undefined : item.level
        // Insert zero-width space after "/" to allow natural line breaks
        const processedName = name.replace(/\//g, '/\u200B')

        return (
          <div
            key={index}
            className={`flex items-center gap-2 ${itemClassName}`}
            role='listitem'
          >
            <span
              className='h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint'
              aria-hidden='true'
            />
            <span className='whitespace-pre-line text-muted-foreground'>
              {processedName}
              {level && ` (${level})`}
            </span>
          </div>
        )
      })}
    </div>
  )
}
