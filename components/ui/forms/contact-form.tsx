'use client'

import { useEffect } from 'react'
import { useForm as useFormspree } from '@formspree/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/forms/form-input'
import { content } from '@/lib/content'
import { FORMSPREE_CONFIG } from '@/constants'
import {
  contactFormSchema,
  VALIDATION_RULES,
  type ContactFormData
} from '@/lib/validations/contact'
import { logger } from '@/lib/logger'

const ContactForm = () => {
  const [formspreeState, handleFormspreeSubmit] = useFormspree(
    FORMSPREE_CONFIG.FORM_ID
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await handleFormspreeSubmit(data)
    } catch (error) {
      logger.error('Form submission error', { error })
    }
  }

  useEffect(() => {
    if (formspreeState.succeeded) {
      reset()
    }
  }, [formspreeState.succeeded, reset])

  useEffect(() => {
    if (formspreeState.errors) {
      logger.error('Formspree submission errors', {
        errors: formspreeState.errors
      })
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
        <FormInput<ContactFormData>
          id='name'
          label={content.contact.form.fields.name.label}
          type='text'
          placeholder={content.contact.form.fields.name.placeholder}
          register={register}
          error={errors.name}
          required
          minLength={VALIDATION_RULES.name.minLength}
          maxLength={VALIDATION_RULES.name.maxLength}
          pattern='[A-Za-z\s]+'
          descriptionId='name-description'
          autoComplete='name'
        />
        <FormInput<ContactFormData>
          id='email'
          label={content.contact.form.fields.email.label}
          type='email'
          placeholder={content.contact.form.fields.email.placeholder}
          register={register}
          error={errors.email}
          required
          descriptionId='email-description'
          autoComplete='email'
        />
      </div>
      <FormInput<ContactFormData>
        id='subject'
        label={content.contact.form.fields.subject.label}
        type='text'
        placeholder={content.contact.form.fields.subject.placeholder}
        register={register}
        error={errors.subject}
        required
        minLength={VALIDATION_RULES.subject.minLength}
        maxLength={VALIDATION_RULES.subject.maxLength}
        descriptionId='subject-description'
        autoComplete='off'
      />
      <FormInput<ContactFormData>
        id='message'
        label={content.contact.form.fields.message.label}
        placeholder={content.contact.form.fields.message.placeholder}
        register={register}
        error={errors.message}
        isTextarea={true}
        required
        minLength={VALIDATION_RULES.message.minLength}
        maxLength={VALIDATION_RULES.message.maxLength}
        descriptionId='message-description'
        autoComplete='off'
      />

      <Button
        type='submit'
        className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
        disabled={isFormSubmitting}
        aria-label={
          isFormSubmitting
            ? content.contact.form.submit.ariaLabelSending
            : content.contact.form.submit.ariaLabel
        }
      >
        {isFormSubmitting
          ? content.contact.form.submit.sending
          : content.contact.form.submit.label}
      </Button>
    </form>
  )
}

export { ContactForm }
