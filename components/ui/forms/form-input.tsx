'use client'

import type { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form'
import { formFieldClasses } from '@/lib/form-field-classes'
import { cn } from '@/lib/utils'

type FormInputProps<T extends FieldValues> = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
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
    className: cn(
      'flex w-full',
      isTextarea ? 'min-h-[120px]' : 'h-10',
      formFieldClasses,
      !isTextarea &&
        'file:border-0 file:bg-background file:text-sm file:font-medium',
      className
    ),
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
