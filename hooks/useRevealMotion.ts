'use client'

import { useReducedMotion } from 'framer-motion'
import {
  heroItemVariants,
  heroStaggerVariants,
  noMotionVariants,
  revealFadeUpVariants,
  revealListVariants
} from '@/lib/animations/reveal-variants'

/**
 * Shared motion config that respects prefers-reduced-motion.
 * Returns variant sets and control props for scroll and load animations.
 */
export const useRevealMotion = () => {
  const shouldReduceMotion = useReducedMotion() ?? false

  return {
    shouldReduceMotion,
    initial: shouldReduceMotion ? false : ('hidden' as const),
    fadeUpVariants: shouldReduceMotion ? noMotionVariants : revealFadeUpVariants,
    listVariants: shouldReduceMotion ? noMotionVariants : revealListVariants,
    heroStaggerVariants: shouldReduceMotion
      ? noMotionVariants
      : heroStaggerVariants,
    heroItemVariants: shouldReduceMotion ? noMotionVariants : heroItemVariants,
    getAnimate: (isActive: boolean) =>
      shouldReduceMotion || isActive ? ('visible' as const) : ('hidden' as const)
  }
}
