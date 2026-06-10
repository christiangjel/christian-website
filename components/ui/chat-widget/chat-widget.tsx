'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { FormEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatMessage } from '@/components/ui/chat-widget/chat-message'
import { ChatOpenButton } from '@/components/ui/chat-widget/chat-open-button'
import { useChatWidget } from '@/components/ui/chat-widget/chat-widget-context'
import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { getMessageText } from '@/lib/assistant/messages'
import { content } from '@/lib/content'
import { cn } from '@/lib/utils'

const getErrorMessage = (error: Error | undefined): string | null => {
  if (!error) {
    return null
  }

  const message = error.message.toLowerCase()

  if (message.includes('rate_limit') || message.includes('429')) {
    return content.assistant.errors.rateLimit
  }

  if (message.includes('unavailable') || message.includes('503')) {
    return content.assistant.errors.unavailable
  }

  if (message.includes('max_messages')) {
    return content.assistant.errors.maxMessages
  }

  return content.assistant.errors.generic
}

/**
 * Floating portfolio assistant chat widget with streaming responses.
 */
export const ChatWidget = () => {
  const { isOpen, openChat, closeChat } = useChatWidget()
  const [input, setInput] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat' }),
    []
  )

  const { messages, sendMessage, status, error } = useChat({
    transport,
  })

  const isAtMessageLimit = messages.length >= ASSISTANT_CONFIG.MAX_MESSAGES
  const isLoading = status === 'submitted' || status === 'streaming'
  const canSend =
    status === 'ready' &&
    !isAtMessageLimit &&
    input.trim().length > 0 &&
    input.trim().length <= ASSISTANT_CONFIG.MAX_MESSAGE_LENGTH

  const errorMessage = getErrorMessage(error)
  const hasUserMessages = messages.some((message) => message.role === 'user')

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, messages, isLoading, scrollToBottom])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const trimmedInput = input.trim()

      if (!canSend) {
        return
      }

      sendMessage({ text: trimmedInput })
      setInput('')
    },
    [canSend, input, sendMessage]
  )

  const handleSuggestedPrompt = useCallback(
    (prompt: string) => {
      if (status !== 'ready' || isAtMessageLimit) {
        return
      }

      sendMessage({ text: prompt })
    },
    [isAtMessageLimit, sendMessage, status]
  )

  if (!isMounted) {
    return null
  }

  return createPortal(
    <>
      {!isOpen && <ChatOpenButton onClick={openChat} />}

      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6'
          role='presentation'
        >
          <button
            type='button'
            className='absolute inset-0 bg-mint/5 backdrop-blur'
            onClick={closeChat}
            aria-label={content.assistant.closeButton.ariaLabel}
          />

          <section
            className='relative flex h-[min(640px,calc(100vh-2rem))] w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
            aria-label={content.assistant.ariaLabels.chatPanel}
          >
            <header className='flex items-center justify-between border-b border-border px-4 py-3'>
              <div>
                <h2 className='text-base font-semibold'>
                  {content.assistant.title}
                </h2>
                <p className='text-xs text-muted-foreground'>
                  {content.assistant.description}
                </p>
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='shrink-0 [&_svg]:!size-5 hover:bg-transparent hover:text-foreground active:bg-transparent'
                onClick={closeChat}
                aria-label={content.assistant.closeButton.ariaLabel}
              >
                <X aria-hidden='true' />
              </Button>
            </header>

            <div
              className='flex-1 space-y-4 overflow-y-auto px-4 py-4'
              aria-live='polite'
              aria-label={content.assistant.ariaLabels.messages}
            >
              <ChatMessage role='assistant' content={content.assistant.welcome} />

              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role === 'user' ? 'user' : 'assistant'}
                  content={getMessageText(message)}
                />
              ))}

              {isLoading && (
                <ChatMessage role='assistant' content={content.assistant.loading} />
              )}

              {errorMessage && (
                <p className='text-sm text-destructive' role='alert'>
                  {errorMessage}
                </p>
              )}

              {isAtMessageLimit && (
                <p className='text-sm text-muted-foreground' role='status'>
                  {content.assistant.errors.maxMessages}
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!hasUserMessages && (
              <div
                className='flex flex-wrap gap-2 border-t border-border px-4 py-3'
                aria-label={content.assistant.ariaLabels.suggestedPrompts}
              >
                {content.assistant.suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type='button'
                    className='rounded-full border border-border bg-secondary px-3 py-1.5 text-left text-xs text-secondary-foreground transition-colors hover:bg-secondary/80'
                    onClick={() => handleSuggestedPrompt(prompt)}
                    disabled={isLoading || isAtMessageLimit}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className='border-t border-border p-4'
            >
              <div className='flex items-end gap-2'>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={content.assistant.placeholder}
                  aria-label={content.assistant.ariaLabels.input}
                  rows={2}
                  maxLength={ASSISTANT_CONFIG.MAX_MESSAGE_LENGTH}
                  disabled={isLoading || isAtMessageLimit}
                  className={cn(
                    'flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm',
                    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      event.currentTarget.form?.requestSubmit()
                    }
                  }}
                />
                <Button
                  type='submit'
                  size='icon'
                  className='shrink-0 bg-mint text-mint-foreground hover:opacity-90'
                  disabled={!canSend}
                  aria-label={content.assistant.sendButton.ariaLabel}
                >
                  <Send className='h-4 w-4' aria-hidden='true' />
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>,
    document.body
  )
}
