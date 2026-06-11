'use client'

import { ChatWidget } from '@/components/ui/chat-widget/chat-widget'
import { ChatWidgetProvider } from '@/components/ui/chat-widget/chat-widget-context'

type ChatAssistantProps = {
  initialOpen?: boolean
  onReady?: () => void
}

/**
 * Self-contained portfolio assistant entry point.
 * Loaded client-only so it does not affect page SSR, theme, or layout.
 */
export const ChatAssistant = ({
  initialOpen = false,
  onReady,
}: ChatAssistantProps) => {
  return (
    <ChatWidgetProvider initialOpen={initialOpen}>
      <ChatWidget onReady={onReady} />
    </ChatWidgetProvider>
  )
}
