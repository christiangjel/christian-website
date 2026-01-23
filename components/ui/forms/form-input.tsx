'use client'

import React from 'react'
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form'

type FormInputProps<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'id'
> & {
  id: Path<T>
  label: string
  register: UseFormRegister<T>
  error?: FieldError
  isTextarea?: boolean
  descriptionId?: string
}

export const FormInput = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  isTextarea = false,
  type = 'text',
  placeholder,
  required,
  minLength,
  maxLength,
  pattern,
  className,
  descriptionId,
  ...rest
}: FormInputProps<T>) => {
  const errorId = `${id}-error`
  const ariaDescribedBy = `${descriptionId ? descriptionId : ''} ${
    error ? errorId : ''
  }`.trim()

  const commonProps = {
    id: id,
    placeholder: placeholder,
    ...register(id),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': ariaDescribedBy || undefined,
    className: `flex ${
      isTextarea ? 'min-h-[120px]' : 'h-10'
    } w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-mint/5 disabled:cursor-not-allowed disabled:opacity-50 ${
      className || ''
    }`.trim(),
    required,
    minLength,
    maxLength,
    pattern,
    ...rest
  }

  return (
    <div className='space-y-2'>
      <label
        htmlFor={id}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
      <div className='bg-background rounded-md'>
        {isTextarea ? (
          <textarea {...commonProps} />
        ) : (
          <input type={type} {...commonProps} />
        )}
      </div>
      {error && (
        <p className='text-sm text-red-400 mt-1' id={errorId}>
          {error.message}
        </p>
      )}
    </div>
  )
}
