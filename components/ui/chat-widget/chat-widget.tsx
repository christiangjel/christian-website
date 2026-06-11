'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
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

const SM_MEDIA_QUERY = '(min-width: 640px)'

const isSmBreakpoint = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(SM_MEDIA_QUERY).matches

const getAssistantPlaceholder = (): string =>
  isSmBreakpoint()
    ? content.assistant.placeholder.desktop
    : content.assistant.placeholder.mobile

const getSuggestedPrompts = (): string[] =>
  isSmBreakpoint()
    ? content.assistant.suggestedPrompts
    : content.assistant.suggestedPromptsMobile

const subscribeToSmBreakpoint = (onStoreChange: () => void): (() => void) => {
  const mediaQuery = window.matchMedia(SM_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

type ChatWidgetProps = {
  onReady?: () => void
}

/**
 * Floating portfolio assistant chat widget with streaming responses.
 */
export const ChatWidget = ({ onReady }: ChatWidgetProps) => {
  const { isOpen, openChat, closeChat } = useChatWidget()
  const [input, setInput] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputPlaceholder = useSyncExternalStore(
    subscribeToSmBreakpoint,
    getAssistantPlaceholder,
    () => content.assistant.placeholder.mobile
  )
  const suggestedPrompts = useSyncExternalStore(
    subscribeToSmBreakpoint,
    getSuggestedPrompts,
    () => content.assistant.suggestedPromptsMobile
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !isOpen) {
      return
    }

    onReady?.()
  }, [isMounted, isOpen, onReady])

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
    const container = messagesContainerRef.current

    if (!container) {
      return
    }

    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!isOpen || (messages.length === 0 && !isLoading)) {
      return
    }

    scrollToBottom()
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
            className='relative flex h-[min(640px,calc(100dvh-2rem))] w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
            aria-label={content.assistant.ariaLabels.chatPanel}
          >
            <header className='flex items-center justify-between gap-4 px-6 pb-2 pt-6'>
              <h2 className='text-lg font-bold'>{content.assistant.title}</h2>
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
              ref={messagesContainerRef}
              className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6'
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
            </div>

            {!hasUserMessages && (
              <div
                className='flex flex-col gap-2 px-6 pb-2 pt-2'
                aria-label={content.assistant.ariaLabels.suggestedPrompts}
              >
                {suggestedPrompts.map((prompt) => (
                  <div key={prompt} className='flex justify-end'>
                    <button
                      type='button'
                      className='w-fit max-w-full rounded-md bg-mint px-3 py-1.5 text-left text-sm leading-relaxed text-mint-foreground transition-opacity hover:opacity-90 whitespace-normal sm:max-w-none sm:whitespace-nowrap'
                      onClick={() => handleSuggestedPrompt(prompt)}
                      disabled={isLoading || isAtMessageLimit}
                    >
                      {prompt}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className='mt-4 px-6 pb-6'>
              <div className='flex items-end gap-6'>
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={inputPlaceholder}
                  aria-label={content.assistant.ariaLabels.input}
                  rows={2}
                  maxLength={ASSISTANT_CONFIG.MAX_MESSAGE_LENGTH}
                  disabled={isLoading || isAtMessageLimit}
                  className={cn(
                    'flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm',
                    'ring-offset-background placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5',
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
