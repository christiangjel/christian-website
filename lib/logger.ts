type LogLevel = 'error' | 'warn' | 'info' | 'debug'

type LogContext = {
  [key: string]: unknown
}

const isDevelopment = process.env.NODE_ENV === 'development'

const log = (level: LogLevel, message: string, context?: LogContext): void => {
  if (!isDevelopment && level === 'debug') {
    return // Skip debug logs in production
  }

  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

  if (context) {
    console[level](logMessage, context)
  } else {
    console[level](logMessage)
  }

  // In production, you could send to error tracking service
  // Example: Sentry, LogRocket, etc.
  if (!isDevelopment && level === 'error') {
    // sendToErrorTracking(message, context)
  }
}

export const logger = {
  error: (message: string, context?: LogContext): void => {
    log('error', message, context)
  },
  warn: (message: string, context?: LogContext): void => {
    log('warn', message, context)
  },
  info: (message: string, context?: LogContext): void => {
    log('info', message, context)
  },
  debug: (message: string, context?: LogContext): void => {
    log('debug', message, context)
  }
}
