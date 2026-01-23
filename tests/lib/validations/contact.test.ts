import { describe, it, expect } from 'vitest'
import { contactFormSchema, VALIDATION_RULES } from '@/lib/validations/contact'

describe('contactFormSchema', () => {
  describe('name validation', () => {
    it('should accept valid name', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message'
      })
      expect(result.success).toBe(true)
    })

    it('should reject name shorter than min length', () => {
      const result = contactFormSchema.safeParse({
        name: 'J',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message'
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameError = result.error.issues.find(issue => issue.path[0] === 'name')
        expect(nameError).toBeDefined()
        expect(nameError?.message).toContain(
          `at least ${VALIDATION_RULES.name.minLength} characters`
        )
      }
    })

    it('should reject name with invalid characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John123',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message'
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameError = result.error.issues.find(issue => issue.path[0] === 'name')
        expect(nameError).toBeDefined()
        expect(nameError?.message).toContain('letters and spaces')
      }
    })

    it('should reject empty name', () => {
      const result = contactFormSchema.safeParse({
        name: '',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('email validation', () => {
    it('should accept valid email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message'
      })
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test',
        message: 'Test message'
      })
      expect(result.success).toBe(false)
    })

    it('should reject empty email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: '',
        subject: 'Test',
        message: 'Test message'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('subject validation', () => {
    it('should accept valid subject', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Valid Subject',
        message: 'Test message'
      })
      expect(result.success).toBe(true)
    })

    it('should reject subject shorter than min length', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Te',
        message: 'Test message'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('message validation', () => {
    it('should accept valid message', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a valid message with enough characters'
      })
      expect(result.success).toBe(true)
    })

    it('should reject message shorter than min length', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Short'
      })
      expect(result.success).toBe(false)
    })
  })
})
