import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/error-boundary'
import { logger } from '@/lib/logger'
import { content } from '@/lib/content'

const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(logger, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText(content.errorBoundary.heading)).toBeInTheDocument()
    expect(screen.getByText(content.errorBoundary.description)).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: content.errorBoundary.ariaLabels.goHome
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: content.errorBoundary.ariaLabels.refreshPage
      })
    ).toBeInTheDocument()
  })

  it('logs error when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(logger.error).toHaveBeenCalledWith('Error caught by boundary', expect.objectContaining({
      error: 'Test error'
    }))
  })

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
    expect(screen.queryByText(content.errorBoundary.heading)).not.toBeInTheDocument()
  })
})
