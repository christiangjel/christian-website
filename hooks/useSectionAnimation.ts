'use client'

import { useRevealMotion } from '@/hooks/useRevealMotion'
import {
  createRevealCascade,
  createTimelineLineVariants,
  noMotionVariants,
  revealGroupVariants,
  revealItemVariants,
  revealLineVariants,
  revealListVariants,
  revealTimelineListVariants,
  timelineDotVariants
} from '@/lib/animations/reveal-variants'

/**
 * Provides shared Framer Motion variants for scroll-triggered reveal animations.
 * Text and list items slide in from right to left with a fade.
 */
export const useSectionAnimation = () => {
  const { shouldReduceMotion, initial, getAnimate } = useRevealMotion()

  return {
    initial,
    getAnimate,
    revealLineVariants: shouldReduceMotion ? noMotionVariants : revealLineVariants,
    revealGroupVariants: shouldReduceMotion
      ? noMotionVariants
      : revealGroupVariants,
    revealListVariants: shouldReduceMotion ? noMotionVariants : revealListVariants,
    revealTimelineListVariants: shouldReduceMotion
      ? noMotionVariants
      : revealTimelineListVariants,
    revealItemVariants: shouldReduceMotion ? noMotionVariants : revealItemVariants,
    timelineDotVariants: shouldReduceMotion ? noMotionVariants : timelineDotVariants,
    createTimelineLineVariants: (contentLineCount: number) =>
      shouldReduceMotion
        ? noMotionVariants
        : createTimelineLineVariants(contentLineCount),
    createRevealCascade: (startIndex = 0) =>
      shouldReduceMotion ? noMotionVariants : createRevealCascade(startIndex)
  }
}
