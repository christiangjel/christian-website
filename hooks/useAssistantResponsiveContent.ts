'use client'

import { useSyncExternalStore } from 'react'
import { content } from '@/lib/content'

/** Matches Tailwind `sm` breakpoint (640px) */
const SM_MEDIA_QUERY = '(min-width: 640px)'

type AssistantResponsiveContent = {
  placeholder: string
  suggestedPrompts: string[]
}

const MOBILE_CONTENT: AssistantResponsiveContent = {
  placeholder: content.assistant.placeholder.mobile,
  suggestedPrompts: content.assistant.suggestedPromptsMobile,
}

const getResponsiveContent = (): AssistantResponsiveContent => {
  const isDesktop =
    typeof window !== 'undefined' &&
    window.matchMedia(SM_MEDIA_QUERY).matches

  if (isDesktop) {
    return {
      placeholder: content.assistant.placeholder.desktop,
      suggestedPrompts: content.assistant.suggestedPrompts,
    }
  }

  return MOBILE_CONTENT
}

const subscribeToSmBreakpoint = (onStoreChange: () => void): (() => void) => {
  const mediaQuery = window.matchMedia(SM_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

/**
 * Returns assistant copy that adapts to the Tailwind `sm` breakpoint.
 */
export const useAssistantResponsiveContent = (): AssistantResponsiveContent =>
  useSyncExternalStore(
    subscribeToSmBreakpoint,
    getResponsiveContent,
    () => MOBILE_CONTENT
  )
