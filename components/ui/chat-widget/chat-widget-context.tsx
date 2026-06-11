'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ChatWidgetContextValue = {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
}

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null)

type ChatWidgetProviderProps = {
  children: ReactNode
  initialOpen?: boolean
}

/**
 * Provides open/close state for the portfolio assistant chat widget.
 */
export const ChatWidgetProvider = ({
  children,
  initialOpen = false,
}: ChatWidgetProviderProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({ isOpen, openChat, closeChat }),
    [isOpen, openChat, closeChat]
  )

  return (
    <ChatWidgetContext.Provider value={value}>
      {children}
    </ChatWidgetContext.Provider>
  )
}

/**
 * Access portfolio assistant chat widget state and controls.
 */
export const useChatWidget = (): ChatWidgetContextValue => {
  const context = useContext(ChatWidgetContext)

  if (!context) {
    throw new Error('useChatWidget must be used within ChatWidgetProvider')
  }

  return context
}
