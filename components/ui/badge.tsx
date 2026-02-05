import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type BadgeProps = HTMLAttributes<HTMLDivElement>

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      {...props}
    >
      <span className='text-transparent bg-clip-text bg-background'>
        {props.children}
      </span>
    </div>
  )
}

export { Badge }
