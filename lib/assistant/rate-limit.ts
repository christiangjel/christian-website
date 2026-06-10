import { ASSISTANT_CONFIG } from '@/constants/assistant'

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export type RateLimitResult = {
  success: boolean
}

/**
 * Best-effort in-memory rate limiter for chat API requests.
 * Suitable for low-traffic portfolio sites on serverless platforms.
 */
export const checkRateLimit = (clientId: string): RateLimitResult => {
  const now = Date.now()
  const entry = rateLimitStore.get(clientId)
  const { MAX_REQUESTS, WINDOW_MS } = ASSISTANT_CONFIG.RATE_LIMIT

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + WINDOW_MS,
    })
    return { success: true }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false }
  }

  entry.count += 1
  return { success: true }
}

/**
 * Extracts a client identifier from request headers for rate limiting.
 */
export const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown'
  }

  return request.headers.get('x-real-ip') ?? 'unknown'
}
