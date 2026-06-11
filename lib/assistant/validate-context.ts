import { z } from 'zod'

export const assistantContextSchema = z
  .object({
    profile: z.object({
      summary: z.string(),
      website: z.string().url(),
      github: z.string().url(),
      linkedin: z.string().url(),
    }),
    freelance: z.object({
      since: z.string(),
      availability: z.string(),
    }),
  })
  .passthrough()

export type AssistantContext = z.infer<typeof assistantContextSchema>

/**
 * Validates assistant context JSON shape at load time.
 * Uses passthrough so nested sections can grow without schema updates.
 */
export const parseAssistantContext = (data: unknown): AssistantContext => {
  return assistantContextSchema.parse(data)
}
