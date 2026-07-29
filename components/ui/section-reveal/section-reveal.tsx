'use client'

import { motion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useRevealInView } from '@/hooks/useRevealInView'
import { useRevealMotion } from '@/hooks/useRevealMotion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  /** When true, children stagger in sequentially (each child needs variants). */
  stagger?: boolean
  /**
   * Extra gate on top of in-view + WebGL ready. Defaults to true.
   * Use to defer a section (e.g. until the hero finishes or the user scrolls).
   */
  ready?: boolean
}

/**
 * Scroll-triggered reveal wrapper. Fires once when the section enters the
 * viewport after the page preloader has finished, optionally staggering children.
 */
export const SectionReveal = ({
  children,
  className,
  stagger = false,
  ready = true
}: SectionRevealProps) => {
  const ref = useRef(null)
  const isReadyToReveal = useRevealInView(ref)
  const { initial, getAnimate, fadeUpVariants, listVariants } = useRevealMotion()

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={getAnimate(isReadyToReveal && ready)}
      variants={stagger ? listVariants : fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
