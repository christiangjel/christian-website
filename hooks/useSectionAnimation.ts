import { Variants } from 'framer-motion'
import { TIMELINE_ANIMATION } from '@/constants/animations'

/**
 * Custom hook that provides animation variants for section components.
 * Returns item and container variants configured with consistent timing.
 *
 * @returns Object containing `itemVariants` and `containerVariants` for Framer Motion
 *
 * @example
 * ```tsx
 * const { itemVariants, containerVariants } = useSectionAnimation()
 * <motion.div variants={containerVariants}>
 *   <motion.div variants={itemVariants}>Item</motion.div>
 * </motion.div>
 * ```
 */
export const useSectionAnimation = () => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: TIMELINE_ANIMATION.ITEM_DURATION,
        ease: TIMELINE_ANIMATION.EASING
      }
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: TIMELINE_ANIMATION.STAGGER_CHILDREN,
        delayChildren: TIMELINE_ANIMATION.DELAY_CHILDREN
      }
    }
  }

  return { itemVariants, containerVariants }
}
