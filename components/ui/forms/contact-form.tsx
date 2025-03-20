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
    await handleSubmit(e)
  }

  if (state.succeeded) {
    return (
      <div className='p-3 rounded-md bg-mint/20 text-mint-dark border border-mint'>
        Thank you for your message! I&apos;ll get back to you soon.
      </div>
    )
  }

  return (
    <form className='space-y-6' onSubmit={handleFormSubmit}>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label
            htmlFor='name'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Your name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <ValidationError prefix='Name' field='name' errors={state.errors} />
        </div>
        <div className='space-y-2'>
          <label
            htmlFor='email'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <ValidationError prefix='Email' field='email' errors={state.errors} />
        </div>
      </div>
      <div className='space-y-2'>
        <label
          htmlFor='subject'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Subject
        </label>
        <input
          id='subject'
          name='subject'
          type='text'
          className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Subject of your message'
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <ValidationError
          prefix='Subject'
          field='subject'
          errors={state.errors}
        />
      </div>
      <div className='space-y-2'>
        <label
          htmlFor='message'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Message
        </label>
        <textarea
          id='message'
          name='message'
          className='flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Your message'
          value={formData.message}
          onChange={handleChange}
          required
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />
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
