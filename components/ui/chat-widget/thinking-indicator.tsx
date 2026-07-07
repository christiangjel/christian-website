import { content } from '@/lib/content'

const DOT_DELAYS = ['0ms', '160ms', '320ms'] as const

/**
 * Animated three-dot "thinking" bubble shown while the assistant
 * prepares a response. Falls back to a static row when the user
 * prefers reduced motion.
 */
export const ThinkingIndicator = () => {
  return (
    <div className='flex justify-start'>
      <div
        className='flex items-center gap-1 rounded-lg bg-secondary px-3 py-3 text-secondary-foreground'
        role='status'
        aria-label={content.assistant.ariaLabels.thinking}
      >
        {DOT_DELAYS.map((delay) => (
          <span
            key={delay}
            className='h-1.5 w-1.5 rounded-full bg-current animate-thinking-bounce motion-reduce:animate-none'
            style={{ animationDelay: delay }}
            aria-hidden='true'
          />
        ))}
      </div>
    </div>
  )
}
