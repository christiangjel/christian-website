import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SuggestedPrompts } from '@/components/ui/chat-widget/suggested-prompts'
import { content } from '@/lib/content'

describe('SuggestedPrompts', () => {
  const prompts = ['Recent React projects?', 'Available for freelance?']

  it('renders all prompts', () => {
    render(
      <SuggestedPrompts
        prompts={prompts}
        isDisabled={false}
        onSelect={() => {}}
      />
    )

    prompts.forEach((prompt) => {
      expect(screen.getByRole('button', { name: prompt })).toBeInTheDocument()
    })

    expect(
      screen.getByLabelText(content.assistant.ariaLabels.suggestedPrompts)
    ).toBeInTheDocument()
  })

  it('calls onSelect with the prompt label', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <SuggestedPrompts
        prompts={prompts}
        isDisabled={false}
        onSelect={onSelect}
      />
    )

    await user.click(screen.getByRole('button', { name: prompts[0] }))

    expect(onSelect).toHaveBeenCalledOnce()
    expect(onSelect).toHaveBeenCalledWith(prompts[0])
  })

  it('disables buttons when isDisabled is true', () => {
    render(
      <SuggestedPrompts prompts={prompts} isDisabled={true} onSelect={() => {}} />
    )

    prompts.forEach((prompt) => {
      expect(screen.getByRole('button', { name: prompt })).toBeDisabled()
    })
  })
})
