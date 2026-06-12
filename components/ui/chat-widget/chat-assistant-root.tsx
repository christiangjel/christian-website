'use client'

import type { ReactNode } from 'react'
import { ChatAssistantLoader } from '@/components/ui/chat-widget/chat-assistant-loader'
import { ChatWidgetProvider } from '@/components/ui/chat-widget/chat-widget-context'

type ChatAssistantRootProps = {
  children: ReactNode
}

/**
 * Provides chat state app-wide and mounts the lazy-loaded assistant UI.
 */
export const ChatAssistantRoot = ({ children }: ChatAssistantRootProps) => {
  return (
    <ChatWidgetProvider>
      {children}
      <ChatAssistantLoader />
    </ChatWidgetProvider>
  )
}
