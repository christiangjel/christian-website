export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.4,
  SLOWER: 0.6,
  SLOWEST: 0.8
} as const

export const ANIMATION_EASING = {
  EASE_OUT: [0, 0, 0.58, 1] as const,
  EASE_IN_OUT: [0.42, 0, 0.58, 1] as const,
  EASE_IN: [0.42, 0, 1, 1] as const
} as const

export const REVEAL_ANIMATION = {
  OFFSET_X: 28,
  LINE_DURATION: 0.55,
  STAGGER_LINES: 0.12,
  STAGGER_ITEMS: 0.22,
  DELAY_CHILDREN: 0.1,
  EASING: [0.22, 1, 0.36, 1] as const
} as const

/**
 * Shared `useInView` options so every scroll-triggered reveal fires at the
 * same point relative to the viewport. The negative bottom margin waits until
 * the content is genuinely on screen before the cascade begins.
 */
export const REVEAL_VIEWPORT = {
  once: true,
  margin: '0px 0px -15% 0px'
} as const

export const TAB_ANIMATION = {
  DURATION: ANIMATION_DURATION.SLOW,
  EASING: 'easeInOut' as const
} as const
