'use client'

import React from 'react'
import { useForm as useFormspree } from '@formspree/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/forms/form-input'

const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject cannot exceed 100 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [formspreeState, handleFormspreeSubmit] = useFormspree('xgvaojga')
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
    // Check if the errors object exists (is truthy)
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
          Thank you for your message! I&apos;ll get back to you soon.
        </div>
      </div>
    )
  }

  const nameDescriptionId = 'name-description'
  const emailDescriptionId = 'email-description'
  const subjectDescriptionId = 'subject-description'
  const messageDescriptionId = 'message-description'

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
      {isSubmitted && !isValid && !formspreeState.succeeded && (
        <div className='bg-background'>
          <div
            className='p-3 rounded-md bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
            role='alert'
          >
            Oops! There are a few things we need to adjust. Please check the
            fields below and try again.
          </div>
        </div>
      )}

      {/* Check if the errors object exists (is truthy) */}
      {formspreeState.errors && !formspreeState.succeeded && (
        <div className='bg-background'>
          <div
            className='p-3 rounded-md bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
            role='alert'
          >
            There was an error submitting the form. Please try again later.
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
          minLength={2}
          maxLength={50}
          pattern='[A-Za-z\s]+'
          descriptionId={nameDescriptionId}
        />
        <FormInput
          id='email'
          label='Email'
          type='email'
          placeholder='Your email'
          register={register}
          error={errors.email}
          required
          descriptionId={emailDescriptionId}
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
        minLength={3}
        maxLength={100}
        descriptionId={subjectDescriptionId}
      />
      <FormInput
        id='message'
        label='Message'
        placeholder='Your message'
        register={register}
        error={errors.message}
        isTextarea={true}
        required
        minLength={10}
        maxLength={1000}
        descriptionId={messageDescriptionId}
      />

      <Button
        type='submit'
        className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
        disabled={formspreeState.submitting || isSubmitting}
        aria-label={
          formspreeState.submitting || isSubmitting
            ? 'Sending your message...'
            : 'Send message'
        }
      >
        {formspreeState.submitting || isSubmitting
          ? 'Sending...'
          : 'Send Message'}
      </Button>
    </form>
  )
}
