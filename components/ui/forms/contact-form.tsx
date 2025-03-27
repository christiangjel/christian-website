'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm, ValidationError } from '@formspree/react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showErrors, setShowErrors] = useState(false)
  const [state, handleSubmit] = useForm('xgvaojga')

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
        <div className='p-3 rounded-md bg-mint/20 text-mint-dark border border-mint'>
          Thank you for your message! I&apos;ll get back to you soon.
        </div>
      </div>
    )
  }

  return (
    <form className='space-y-6' onSubmit={handleFormSubmit} noValidate>
      {state.errors && Object.keys(state.errors).length > 0 && (
        <div className='bg-background'>
          <div className='p-3 rounded-md bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'>
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
          <div className='bg-background'>
            <input
              id='name'
              name='name'
              type='text'
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Your name'
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              pattern='[A-Za-z\s]+'
              title='Please enter a valid name (letters and spaces only)'
            />
          </div>
          <ValidationError
            prefix='Name'
            field='name'
            errors={state.errors}
            className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
          />
          {showErrors && formData.name === '' && (
            <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
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
          <div className='bg-background'>
            <input
              id='email'
              name='email'
              type='email'
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Your email'
              value={formData.email}
              onChange={handleChange}
              required
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              title='Please enter a valid email address'
            />
          </div>
          <ValidationError
            prefix='Email'
            field='email'
            errors={state.errors}
            className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
          />
          {showErrors && formData.email === '' && (
            <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
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
        <div className='bg-background'>
          <input
            id='subject'
            name='subject'
            type='text'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Subject of your message'
            value={formData.subject}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={100}
            title='Please enter a subject (3-100 characters)'
          />
        </div>
        <ValidationError
          prefix='Subject'
          field='subject'
          errors={state.errors}
          className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
        />
        {showErrors && formData.subject === '' && (
          <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
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
        <div className='bg-background'>
          <textarea
            id='message'
            name='message'
            className='flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Your message'
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={1000}
            title='Please enter a message (10-1000 characters)'
          />
        </div>
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
          className='text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1'
        />
        {showErrors && formData.message === '' && (
          <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
            Message is required
          </p>
        )}
      </div>
      <Button
        type='submit'
        className='bg-mint hover:opacity-90 transition-opacity text-mint-foreground'
        disabled={state.submitting}
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
