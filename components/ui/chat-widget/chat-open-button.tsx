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
    <div className={cn(ASSISTANT_CONFIG.LAUNCHER.BUTTON_POSITION_CLASS)}>
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
