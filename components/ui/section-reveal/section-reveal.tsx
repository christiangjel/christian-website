'use client'

import { motion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useRevealInView } from '@/hooks/useRevealInView'
import { useRevealMotion } from '@/hooks/useRevealMotion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  /**
   * Extra gate on top of in-view + WebGL ready. Defaults to true.
   * Use to defer a section (e.g. until the hero finishes or the user scrolls).
   */
  ready?: boolean
}

/**
 * Scroll-triggered reveal wrapper. Fades the section in as one unit when it
 * enters the viewport after the page preloader has finished.
 */
export const SectionReveal = ({
  children,
  className,
  ready = true
}: SectionRevealProps) => {
  const ref = useRef(null)
  const isReadyToReveal = useRevealInView(ref)
  const { initial, getAnimate, fadeUpVariants } = useRevealMotion()

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={getAnimate(isReadyToReveal && ready)}
      variants={fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
