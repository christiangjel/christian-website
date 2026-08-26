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

/** Right-to-left scroll reveals for timeline and list cascades. */
export const REVEAL_ANIMATION = {
  OFFSET_X: 12,
  LINE_DURATION: 0.6,
  STAGGER_LINES: 0.15,
  STAGGER_ITEMS: 0.2,
  DELAY_CHILDREN: 0.1,
  EASING: [0.22, 1, 0.36, 1] as const
} as const

/** Timeline graphic + item-to-item cadence (lines within an item share REVEAL_ANIMATION). */
export const TIMELINE_ANIMATION = {
  DOT_DURATION: 0.25,
  /** Gap between job entries — longer than STAGGER_ITEMS so cascades don't pile up. */
  STAGGER_ITEMS: 0.35,
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

/** Hero load sequence — subtle upward fade with staggered children. */
export const HERO_ANIMATION = {
  OFFSET_Y: 10,
  DURATION: 0.8,
  STAGGER: 0.2,
  DELAY_CHILDREN: 0.1,
  EASING: [0.22, 1, 0.36, 1] as const
} as const

/** Scroll-triggered fade-up — slightly larger offset than hero for section content. */
export const FADE_UP_ANIMATION = {
  OFFSET_Y: 20,
  DURATION: 0.8,
  EASING: [0.33, 1, 0.68, 1] as const
} as const
