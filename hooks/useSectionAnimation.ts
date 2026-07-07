import {
  revealGroupVariants,
  revealLineVariants,
  revealListVariants
} from '@/lib/animations/reveal-variants'

/**
 * Provides shared Framer Motion variants for scroll-triggered reveal animations.
 * Text and list items slide in from right to left with a fade.
 */
export const useSectionAnimation = () => ({
  revealLineVariants,
  revealGroupVariants,
  revealListVariants
})
