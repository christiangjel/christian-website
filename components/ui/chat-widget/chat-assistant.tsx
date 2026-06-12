'use client'

import { ChatWidget } from '@/components/ui/chat-widget/chat-widget'

type ChatAssistantProps = {
  onReady?: () => void
}

/**
 * Lazy-loaded portfolio assistant UI.
 * Expects ChatWidgetProvider from ChatAssistantRoot.
 */
export const ChatAssistant = ({ onReady }: ChatAssistantProps) => {
  return <ChatWidget onReady={onReady} />
}
