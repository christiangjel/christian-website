import localFont from 'next/font/local'

/**
 * Single monospace family with real weight faces.
 * `font-bold` (weight 700) selects mono-bold; regular text uses mono-normal.
 */
export const fontMono = localFont({
  src: [
    {
      path: './mono-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './mono-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  preload: true,
  display: 'swap',
})
