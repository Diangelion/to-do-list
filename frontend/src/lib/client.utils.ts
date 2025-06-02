import type { ApiError } from '@/api/client.types'

export const createTimeoutSignal = (timeout: number): AbortSignal => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeout)
  return controller.signal
}

export const combineSignals = (
  ...signals: (AbortSignal | undefined)[]
): AbortSignal => {
  const controller = new AbortController()
  signals.filter(Boolean).forEach(signal => {
    if (signal && !signal.aborted) {
      signal.addEventListener('abort', () => controller.abort())
    }
  })

  return controller.signal
}

export const handleFetchError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return {
        message: 'Request was cancelled',
        status: 0,
        code: 'ABORTED',
        originalError: error,
      }
    }
    if (error.name === 'TypeError') {
      return {
        message: 'Network error occurred',
        status: 0,
        code: 'NETWORK_ERROR',
        originalError: error,
      }
    }
  }

  return {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    status: 0,
    code: 'UNKNOWN_ERROR',
    originalError: error,
  }
}
