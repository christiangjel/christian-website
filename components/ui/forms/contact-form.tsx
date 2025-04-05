'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm, ValidationError } from '@formspree/react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showErrors, setShowErrors] = useState(false)
  const [state, handleSubmit] = useForm('xgvaojga')

  // Define IDs for error messages to use with aria-describedby
  const nameErrorId = 'name-error'
  const emailErrorId = 'email-error'
  const subjectErrorId = 'subject-error'
  const messageErrorId = 'message-error'

  // Define IDs for field descriptions
  const nameDescriptionId = 'name-description'
  const emailDescriptionId = 'email-description'
  const subjectDescriptionId = 'subject-description'
  const messageDescriptionId = 'message-description'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowErrors(true)

    if (Object.values(formData).some((value) => !value.trim())) {
      return // Prevent submission if any field is empty
    }

    try {
      await handleSubmit(e)
      if (state.succeeded) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setShowErrors(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  if (state.succeeded) {
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

  return (
    <form className='space-y-6' onSubmit={handleFormSubmit} noValidate>
      {state.errors && Object.keys(state.errors).length > 0 && (
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
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label
            htmlFor='name'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Name
          </label>
          <div className='bg-background rounded-md'>
            <input
              id='name'
              name='name'
              type='text'
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Your name'
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              pattern='[A-Za-z\s]+'
              aria-describedby={`${nameDescriptionId} ${
                formData.name === '' && showErrors ? nameErrorId : ''
              }`}
              aria-invalid={
                formData.name === '' && showErrors ? true : undefined
              }
            />
          </div>
          <ValidationError
            prefix='Name'
            field='name'
            errors={state.errors}
            className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
            id={nameErrorId}
          />
          {showErrors && formData.name === '' && (
            <p
              className='text-sm text-red-600 dark:text-red-400 mt-1'
              id={nameErrorId}
            >
              Name is required
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <label
            htmlFor='email'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Email
          </label>
          <div className='bg-background rounded-md'>
            <input
              id='email'
              name='email'
              type='email'
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Your email'
              value={formData.email}
              onChange={handleChange}
              required
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              aria-describedby={`${emailDescriptionId} ${
                formData.email === '' && showErrors ? emailErrorId : ''
              }`}
              aria-invalid={
                formData.email === '' && showErrors ? true : undefined
              }
            />
          </div>
          <ValidationError
            prefix='Email'
            field='email'
            errors={state.errors}
            className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
            id={emailErrorId}
          />
          {showErrors && formData.email === '' && (
            <p
              className='text-sm text-red-600 dark:text-red-400 mt-1'
              id={emailErrorId}
            >
              Email is required
            </p>
          )}
        </div>
      </div>
      <div className='space-y-2'>
        <label
          htmlFor='subject'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Subject
        </label>
        <div className='bg-background rounded-md'>
          <input
            id='subject'
            name='subject'
            type='text'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Subject of your message'
            value={formData.subject}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={100}
            aria-describedby={`${subjectDescriptionId} ${
              formData.subject === '' && showErrors ? subjectErrorId : ''
            }`}
            aria-invalid={
              formData.subject === '' && showErrors ? true : undefined
            }
          />
        </div>
        <ValidationError
          prefix='Subject'
          field='subject'
          errors={state.errors}
          className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
          id={subjectErrorId}
        />
        {showErrors && formData.subject === '' && (
          <p
            className='text-sm text-red-600 dark:text-red-400 mt-1'
            id={subjectErrorId}
          >
            Subject is required
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <label
          htmlFor='message'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Message
        </label>
        <div className='bg-background rounded-md'>
          <textarea
            id='message'
            name='message'
            className='flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Your message'
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={1000}
            aria-describedby={`${messageDescriptionId} ${
              formData.message === '' && showErrors ? messageErrorId : ''
            }`}
            aria-invalid={
              formData.message === '' && showErrors ? true : undefined
            }
          />
        </div>
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
          className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
          id={messageErrorId}
        />
        {showErrors && formData.message === '' && (
          <p
            className='text-sm text-red-600 dark:text-red-400 mt-1'
            id={messageErrorId}
          >
            Message is required
          </p>
        )}
      </div>
      <Button
        type='submit'
        className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
        disabled={state.submitting}
        aria-label={
          state.submitting ? 'Sending your message...' : 'Send message'
        }
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
