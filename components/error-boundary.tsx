'use client'

import { Component, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { SECTIONS } from '@/constants'
import { logger } from '@/lib/logger'
import { content } from '@/lib/content'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch and handle React errors.
 * Wraps the application to prevent crashes and provides user-friendly error messages.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error using project's logger utility
    logger.error('Error caught by boundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })

    // In production, could send to error tracking service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null })
    window.location.href = `/#${SECTIONS.HERO}`
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='flex min-h-screen flex-col items-center justify-center p-4'>
          <div className='max-w-md text-center'>
            <AlertTriangle className='mx-auto mb-4 h-12 w-12 text-red-500' />
            <h1 className='mb-2 text-2xl font-bold'>
              {content.errorBoundary.heading}
            </h1>
            <p className='mb-6 text-muted-foreground'>
              {content.errorBoundary.description}
            </p>
            <div className='flex flex-col gap-2 sm:flex-row sm:justify-center'>
              <Button
                onClick={this.handleReset}
                variant='outline'
                aria-label={content.errorBoundary.ariaLabels.goHome}
              >
                {content.errorBoundary.goHome}
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className='bg-mint text-mint-foreground'
                aria-label={content.errorBoundary.ariaLabels.refreshPage}
              >
                {content.errorBoundary.refreshPage}
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-6 text-left'>
                <summary className='cursor-pointer text-sm text-muted-foreground'>
                  {content.errorBoundary.errorDetails}
                </summary>
                <pre className='mt-2 overflow-auto rounded bg-muted p-2 text-xs'>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
