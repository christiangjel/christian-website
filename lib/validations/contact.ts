import { z } from 'zod'
import { content } from '@/lib/content'

export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[A-Za-z\s]+$/
  },
  subject: {
    minLength: 3,
    maxLength: 100
  },
  message: {
    minLength: 10,
    maxLength: 1000
  }
} as const

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, content.contact.form.fields.name.errors.required)
    .min(
      VALIDATION_RULES.name.minLength,
      content.contact.form.fields.name.errors.minLength
    )
    .max(
      VALIDATION_RULES.name.maxLength,
      content.contact.form.fields.name.errors.maxLength
    )
    .regex(
      VALIDATION_RULES.name.pattern,
      content.contact.form.fields.name.errors.pattern || 'Invalid format'
    ),
  email: z
    .string()
    .min(1, content.contact.form.fields.email.errors.required)
    .email(content.contact.form.fields.email.errors.invalid || 'Invalid email'),
  subject: z
    .string()
    .min(1, content.contact.form.fields.subject.errors.required)
    .min(
      VALIDATION_RULES.subject.minLength,
      content.contact.form.fields.subject.errors.minLength
    )
    .max(
      VALIDATION_RULES.subject.maxLength,
      content.contact.form.fields.subject.errors.maxLength
    ),
  message: z
    .string()
    .min(1, content.contact.form.fields.message.errors.required)
    .min(
      VALIDATION_RULES.message.minLength,
      content.contact.form.fields.message.errors.minLength
    )
    .max(
      VALIDATION_RULES.message.maxLength,
      content.contact.form.fields.message.errors.maxLength
    )
})

export type ContactFormData = z.infer<typeof contactFormSchema>
