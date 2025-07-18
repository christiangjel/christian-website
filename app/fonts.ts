import localFont from 'next/font/local'

export const fontNormal = localFont({
  src: './mono-normal.woff2',
  variable: '--font-normal',
  preload: true,
  display: 'swap'
})

export const fontBold = localFont({
  src: './mono-bold.woff2',
  variable: '--font-bold',
  preload: true,
  display: 'swap'
})
