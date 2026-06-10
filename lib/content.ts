import contentData from '@/data/content.json'
import type { Content } from '@/types/content'

/**
 * JSON imports widen string literals (e.g. icon unions), so `satisfies` cannot
 * validate the full Content shape here. Cast at this static-data boundary.
 */
export const content: Content = contentData as Content
