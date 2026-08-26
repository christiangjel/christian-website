import type { ComponentProps, CSSProperties } from 'react'

import { cn } from '@/lib/utils'

type CometSpinnerProps = ComponentProps<'span'> & {
  /** Accessible loading label from content */
  label: string
  headScale?: number
  radiusScale?: number
}

/**
 * Clamps a numeric value between min and max inclusive.
 *
 * @param value - Input number
 * @param min - Lower bound
 * @param max - Upper bound
 */
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

/**
 * Orbital comet-style loading spinner. Trail color comes from `currentColor`
 * (default theme mint via `text-mint`).
 */
export const CometSpinner = ({
  className,
  style,
  label,
  headScale = 0.2,
  radiusScale = 0.83,
  ...props
}: CometSpinnerProps) => {
  const safeHeadScale = clamp(headScale, 0.08, 0.35)
  const safeRadiusScale = clamp(radiusScale, 0.3, 1.1)
  const cometStyle = {
    ...style,
    '--loading-ui-comet-head': `${(safeHeadScale * 100).toFixed(2)}cqmin`,
    '--loading-ui-comet-radius': `${(safeRadiusScale * 100).toFixed(2)}cqmin`,
  } as CSSProperties

  return (
    <span
      role='status'
      aria-label={label}
      className={cn(
        // Tailwind v3 does not emit `@container-[size]`; use arbitrary property
        '[container-type:size] relative inline-flex aspect-square items-center justify-center align-middle text-mint',
        className
      )}
      style={cometStyle}
      {...props}
    >
      <span
        aria-hidden='true'
        className='absolute inset-0 animate-comet-spin rounded-full'
      />
      <span className='sr-only'>{label}</span>
    </span>
  )
}
