export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface ApiError {
  message: string
  status: number
  code: string
  originalError: unknown
}

export interface FetchOptions extends Omit<RequestInit, 'signal' | 'headers'> {
  signal?: AbortSignal
  headers?: Record<string, string>
  timeout?: number
  retries?: number
  retryDelay?: number
}
