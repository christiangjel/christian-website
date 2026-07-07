import { type Variants } from 'framer-motion'
import { REVEAL_ANIMATION } from '@/constants/animations'

/**
 * Single line or list item: fades in while sliding from right to left.
 * Intentionally carries no `delay` so parent `staggerChildren` orchestration
 * (timeline, groups, cascading lists) stays in control of the timing.
 */
export const revealLineVariants: Variants = {
  hidden: { opacity: 0, x: REVEAL_ANIMATION.OFFSET_X },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: REVEAL_ANIMATION.LINE_DURATION,
      ease: REVEAL_ANIMATION.EASING
    }
  }
}

/** Groups staggered children (e.g. text lines within a timeline item). */
export const revealGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: REVEAL_ANIMATION.STAGGER_LINES
    }
  }
}

/**
 * Container variants that cascade their children one after another.
 * `startIndex` offsets the first child's delay so several separate lists can
 * chain into a single continuous sequence.
 */
export const createRevealCascade = (startIndex = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: startIndex * REVEAL_ANIMATION.STAGGER_LINES,
      staggerChildren: REVEAL_ANIMATION.STAGGER_LINES
    }
  }
})

/** Top-level list container that cascades child groups or items. */
export const revealListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: REVEAL_ANIMATION.STAGGER_ITEMS,
      delayChildren: REVEAL_ANIMATION.DELAY_CHILDREN
    }
  }
}
