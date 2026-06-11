import { stripMarkdownAsterisks } from '@/lib/assistant/messages'
import { cn } from '@/lib/utils'

type ChatMessageProps = {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Renders a single chat message bubble in the portfolio assistant.
 */
export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === 'user'
  const displayContent = isUser ? content : stripMarkdownAsterisks(content)

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed',
          isUser
            ? 'bg-mint text-mint-foreground'
            : 'bg-secondary text-secondary-foreground'
        )}
      >
        {displayContent}
      </div>
    </div>
  )
}
