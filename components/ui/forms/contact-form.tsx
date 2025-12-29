'use client'

import React from 'react'
import { useForm as useFormspree } from '@formspree/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/forms/form-input'
import content from '@/data/content.json'

const FORMSPREE_FORM_ID = 'xgvaojga'

const VALIDATION_RULES = {
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

const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(
      VALIDATION_RULES.name.minLength,
      `Name must be at least ${VALIDATION_RULES.name.minLength} characters`
    )
    .max(
      VALIDATION_RULES.name.maxLength,
      `Name cannot exceed ${VALIDATION_RULES.name.maxLength} characters`
    )
    .regex(
      VALIDATION_RULES.name.pattern,
      'Name can only contain letters and spaces'
    ),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(
      VALIDATION_RULES.subject.minLength,
      `Subject must be at least ${VALIDATION_RULES.subject.minLength} characters`
    )
    .max(
      VALIDATION_RULES.subject.maxLength,
      `Subject cannot exceed ${VALIDATION_RULES.subject.maxLength} characters`
    ),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(
      VALIDATION_RULES.message.minLength,
      `Message must be at least ${VALIDATION_RULES.message.minLength} characters`
    )
    .max(
      VALIDATION_RULES.message.maxLength,
      `Message cannot exceed ${VALIDATION_RULES.message.maxLength} characters`
    )
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactForm = (): React.JSX.Element => {
  const [formspreeState, handleFormspreeSubmit] =
    useFormspree(FORMSPREE_FORM_ID)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await handleFormspreeSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  React.useEffect(() => {
    if (formspreeState.succeeded) {
      reset()
    }
  }, [formspreeState.succeeded, reset])

  React.useEffect(() => {
    if (formspreeState.errors) {
      console.error('Formspree submission errors:', formspreeState.errors)
    }
  }, [formspreeState.errors])

  if (formspreeState.succeeded) {
    return (
      <div className='bg-background'>
        <div
          className='p-3 rounded-md bg-mint/20 text-mint-dark border border-mint'
          role='alert'
        >
          {content.contact.form.success}
        </div>
      </div>
    )
  }

  const hasFormErrors = isSubmitted && !isValid && !formspreeState.succeeded
  const hasSubmissionErrors = formspreeState.errors && !formspreeState.succeeded
  const isFormSubmitting = formspreeState.submitting || isSubmitting

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
      {hasFormErrors && (
        <div className='bg-background'>
          <div
            className='p-3 rounded-md border bg-red-900/15 border-red-400 text-red-400'
            role='alert'
          >
            {content.contact.form.validationError}
          </div>
        </div>
      )}

      {hasSubmissionErrors && (
        <div className='bg-background'>
          <div
            className='p-3 rounded-md border bg-red-900/15 border-red-400 text-red-400'
            role='alert'
          >
            {content.contact.form.submissionError}
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <FormInput
          id='name'
          label='Name'
          type='text'
          placeholder='Your name'
          register={register}
          error={errors.name}
          required
          minLength={VALIDATION_RULES.name.minLength}
          maxLength={VALIDATION_RULES.name.maxLength}
          pattern='[A-Za-z\s]+'
          descriptionId='name-description'
        />
        <FormInput
          id='email'
          label='Email'
          type='email'
          placeholder='Your email'
          register={register}
          error={errors.email}
          required
          descriptionId='email-description'
        />
      </div>
      <FormInput
        id='subject'
        label='Subject'
        type='text'
        placeholder='Subject of your message'
        register={register}
        error={errors.subject}
        required
        minLength={VALIDATION_RULES.subject.minLength}
        maxLength={VALIDATION_RULES.subject.maxLength}
        descriptionId='subject-description'
      />
      <FormInput
        id='message'
        label='Message'
        placeholder='Your message'
        register={register}
        error={errors.message}
        isTextarea={true}
        required
        minLength={VALIDATION_RULES.message.minLength}
        maxLength={VALIDATION_RULES.message.maxLength}
        descriptionId='message-description'
      />

      <Button
        type='submit'
        className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
        disabled={isFormSubmitting}
        aria-label={
          isFormSubmitting ? 'Sending your message...' : 'Send message'
        }
      >
        {isFormSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

export default ContactForm
