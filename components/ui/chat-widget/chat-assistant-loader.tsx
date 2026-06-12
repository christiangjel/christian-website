'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChatOpenButton } from '@/components/ui/chat-widget/chat-open-button'
import { useChatWidget } from '@/components/ui/chat-widget/chat-widget-context'
import { ASSISTANT_CONFIG } from '@/constants/assistant'
import { CUSTOM_EVENTS } from '@/constants/events'

const ChatAssistant = dynamic(
  () =>
    import('@/components/ui/chat-widget/chat-assistant').then(
      (mod) => mod.ChatAssistant
    ),
  { ssr: false }
)

/**
 * Shows a lightweight chat launcher after WebGL is ready.
 * The AI bundle loads only when the user opens chat.
 */
export const ChatAssistantLoader = () => {
  const { isOpen, openChat } = useChatWidget()
  const [canShowLauncher, setCanShowLauncher] = useState(false)
  const [isChatLoaded, setIsChatLoaded] = useState(false)
  const [isChatPanelReady, setIsChatPanelReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleWebGLComplete = (): void => {
      setCanShowLauncher(true)
    }

    window.addEventListener(CUSTOM_EVENTS.WEBGL_LOAD_COMPLETE, handleWebGLComplete)

    const fallbackTimer = setTimeout(() => {
      setCanShowLauncher(true)
    }, ASSISTANT_CONFIG.LAUNCHER.FALLBACK_MS)

    return () => {
      window.removeEventListener(CUSTOM_EVENTS.WEBGL_LOAD_COMPLETE, handleWebGLComplete)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const handleOpenChat = useCallback(() => {
    setIsChatLoaded(true)
    openChat()
  }, [openChat])

  const handleChatReady = useCallback(() => {
    setIsChatPanelReady(true)
  }, [])

  useEffect(() => {
    const handleOpenAssistantChat = (): void => {
      handleOpenChat()
    }

    window.addEventListener(
      CUSTOM_EVENTS.OPEN_ASSISTANT_CHAT,
      handleOpenAssistantChat
    )

    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.OPEN_ASSISTANT_CHAT,
        handleOpenAssistantChat
      )
    }
  }, [handleOpenChat])

  if (!isMounted) {
    return null
  }

  return createPortal(
    <>
      {canShowLauncher && !isChatPanelReady && !isOpen && (
        <ChatOpenButton onClick={handleOpenChat} />
      )}

      {isChatLoaded && <ChatAssistant onReady={handleChatReady} />}
    </>,
    document.body
  )
}
