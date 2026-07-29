import { type Variants } from 'framer-motion'
import {
  FADE_UP_ANIMATION,
  HERO_ANIMATION,
  REVEAL_ANIMATION,
  TIMELINE_ANIMATION
} from '@/constants/animations'

/** Instant visibility — used when prefers-reduced-motion is active. */
export const noMotionVariants: Variants = {
  hidden: {},
  visible: {}
}

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

/** Experience timeline — same cadence as other list reveals. */
export const revealTimelineListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: REVEAL_ANIMATION.STAGGER_ITEMS,
      delayChildren: REVEAL_ANIMATION.DELAY_CHILDREN
    }
  }
}

/** Timeline item shell — receives list stagger, passes visible to track + content. */
export const revealItemVariants: Variants = {
  hidden: {},
  visible: {}
}

/**
 * Duration for one item's connector line — matches that item's text cascade
 * so the line reaches the next dot as the last line of text settles in.
 */
export const getTimelineLineDuration = (contentLineCount: number): number =>
  (contentLineCount - 1) * REVEAL_ANIMATION.STAGGER_LINES +
  REVEAL_ANIMATION.LINE_DURATION

/** Timeline dot — appears as the item's text cascade begins. */
export const timelineDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: TIMELINE_ANIMATION.DOT_DURATION,
      ease: TIMELINE_ANIMATION.EASING
    }
  }
}

/** Timeline connector — draws downward in sync with the item's text lines. */
export const createTimelineLineVariants = (contentLineCount: number): Variants => ({
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: getTimelineLineDuration(contentLineCount),
      ease: REVEAL_ANIMATION.EASING
    }
  }
})

/** Hero container — staggers title, subtitle, and CTA group on page load. */
export const heroStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: HERO_ANIMATION.STAGGER,
      delayChildren: HERO_ANIMATION.DELAY_CHILDREN
    }
  }
}

/** Single hero element: subtle upward fade. */
export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: HERO_ANIMATION.OFFSET_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: HERO_ANIMATION.DURATION,
      ease: HERO_ANIMATION.EASING
    }
  }
}

/** Scroll-triggered fade-up for section headings, paragraphs, and cards. */
export const revealFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: FADE_UP_ANIMATION.OFFSET_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: FADE_UP_ANIMATION.DURATION,
      ease: FADE_UP_ANIMATION.EASING
    }
  }
}
