'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { content } from '@/lib/content'
import { cn } from '@/lib/utils'

type ChatOpenButtonProps = {
  onClick: () => void
  className?: string
}

/**
 * Icon launcher aligned with the chat panel send button position.
 */
export const ChatOpenButton = ({ onClick, className }: ChatOpenButtonProps) => {
  return (
    <div className={cn(ASSISTANT_CONFIG.LAUNCHER.BUTTON_POSITION_CLASS, 'group')}>
      <span
        role='tooltip'
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap',
          'rounded-md border border-border bg-card px-2 py-1 text-center text-xs text-foreground shadow-md',
          'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:block'
        )}
      >
        {content.assistant.openButton.tooltip}
      </span>
      <Button
        type='button'
        size='icon'
        className={cn(
          'shrink-0 p-0 bg-mint text-mint-foreground hover:opacity-90',
          className
        )}
        onClick={onClick}
        aria-label={content.assistant.openButton.ariaLabel}
      >
        <Sparkles className='h-4 w-4' aria-hidden='true' />
      </Button>
    </div>
  )
}
