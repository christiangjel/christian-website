import { content } from '@/lib/content'

type SuggestedPromptsProps = {
  prompts: string[]
  isDisabled: boolean
  onSelect: (prompt: string) => void
}

/**
 * Renders starter prompts inside the scrollable message list.
 */
export const SuggestedPrompts = ({
  prompts,
  isDisabled,
  onSelect,
}: SuggestedPromptsProps) => {
  return (
    <div
      className='flex flex-col gap-2 pb-2 pt-2'
      aria-label={content.assistant.ariaLabels.suggestedPrompts}
    >
      {prompts.map((prompt) => (
        <div key={prompt} className='flex justify-end'>
          <button
            type='button'
            className='w-fit max-w-full rounded-md bg-mint px-3 py-1.5 text-left text-sm leading-relaxed text-mint-foreground transition-opacity hover:opacity-90 whitespace-normal sm:max-w-none sm:whitespace-nowrap'
            onClick={() => onSelect(prompt)}
            disabled={isDisabled}
          >
            {prompt}
          </button>
        </div>
      ))}
    </div>
  )
}
