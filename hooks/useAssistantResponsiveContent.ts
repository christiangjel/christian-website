'use client'

import { useSyncExternalStore } from 'react'
import { useContent } from '@/components/layout/locale/locale-provider'

/** Matches Tailwind `sm` breakpoint (640px) */
const SM_MEDIA_QUERY = '(min-width: 640px)'

type AssistantResponsiveContent = {
  placeholder: string
  suggestedPrompts: string[]
}

const subscribeToSmBreakpoint = (onStoreChange: () => void): (() => void) => {
  const mediaQuery = window.matchMedia(SM_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

const getIsDesktop = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(SM_MEDIA_QUERY).matches

/**
 * Returns assistant copy that adapts to the Tailwind `sm` breakpoint.
 */
export const useAssistantResponsiveContent = (): AssistantResponsiveContent => {
  const content = useContent()
  const isDesktop = useSyncExternalStore(
    subscribeToSmBreakpoint,
    getIsDesktop,
    () => false
  )

  if (isDesktop) {
    return {
      placeholder: content.assistant.placeholder.desktop,
      suggestedPrompts: content.assistant.suggestedPrompts,
    }
  }

  return {
    placeholder: content.assistant.placeholder.mobile,
    suggestedPrompts: content.assistant.suggestedPromptsMobile,
  }
}
