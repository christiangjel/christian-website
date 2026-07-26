import { z } from 'zod'
import { content as defaultContent } from '@/lib/content'
import type { ContactForm } from '@/types/content'

export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[A-Za-zÀ-ÿ\s]+$/,
  },
  subject: {
    minLength: 3,
    maxLength: 100,
  },
  message: {
    minLength: 10,
    maxLength: 1000,
  },
} as const

/**
 * Builds a Zod schema for the contact form using localised error messages.
 *
 * @param form - Localised contact form content
 */
export const createContactFormSchema = (form: ContactForm = defaultContent.contact.form) =>
  z.object({
    name: z
      .string()
      .min(1, form.fields.name.errors.required)
      .min(
        VALIDATION_RULES.name.minLength,
        form.fields.name.errors.minLength
      )
      .max(
        VALIDATION_RULES.name.maxLength,
        form.fields.name.errors.maxLength
      )
      .regex(
        VALIDATION_RULES.name.pattern,
        form.fields.name.errors.pattern || 'Invalid format'
      ),
    email: z
      .string()
      .min(1, form.fields.email.errors.required)
      .email(form.fields.email.errors.invalid || 'Invalid email'),
    subject: z
      .string()
      .min(1, form.fields.subject.errors.required)
      .min(
        VALIDATION_RULES.subject.minLength,
        form.fields.subject.errors.minLength
      )
      .max(
        VALIDATION_RULES.subject.maxLength,
        form.fields.subject.errors.maxLength
      ),
    message: z
      .string()
      .min(1, form.fields.message.errors.required)
      .min(
        VALIDATION_RULES.message.minLength,
        form.fields.message.errors.minLength
      )
      .max(
        VALIDATION_RULES.message.maxLength,
        form.fields.message.errors.maxLength
      ),
  })

/** Default English schema for callers that do not pass localised form copy. */
export const contactFormSchema = createContactFormSchema()

export type ContactFormData = z.infer<typeof contactFormSchema>
