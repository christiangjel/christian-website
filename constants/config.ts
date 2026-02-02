export const SCROLL_CONFIG = {
  OFFSET: 80,
  THROTTLE_DELAY: 30,
  HASH_NAVIGATION_DELAY: 100
} as const

export const FORMSPREE_CONFIG = {
  FORM_ID: 'xgvaojga'
} as const

export const SITE_CONFIG = {
  // Production domain: christian-gjelstrup.com
  // Priority: NEXT_PUBLIC_SITE_URL > VERCEL_URL > localhost
  // Set NEXT_PUBLIC_SITE_URL=https://christian-gjelstrup.com in Vercel environment variables
  BASE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'),
  REPO_URL: 'https://github.com/christiangjel/christian-website'
} as const

export const ANIMATION_CONFIG = {
  RESIZE_DEBOUNCE_DELAY: 150
} as const
