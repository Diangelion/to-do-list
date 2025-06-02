import type {
  ApiResponse,
  BackendCustomResponse,
  FetchOptions,
} from './client.types'
import {
  createTimeoutSignal,
  combineSignals,
  fetchWithRetry,
  handleFetchError,
} from '@/lib/client.utils'
import {
  get as getLocalForage,
  store as storeLocalForage,
} from '@/lib/localForage.utils'

const baseURL = import.meta.env.VITE_BASE_URL_API

const apiRequest = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<BackendCustomResponse<T>>> => {
  const {
    timeout = 10000,
    retries = 3,
    retryDelay = 1000,
    headers = {},
    signal,
    ...fetchOptions
  } = options

  const url = `${baseURL}${endpoint}`
  const timeoutSignal = createTimeoutSignal(timeout)
  const combinedSignal = combineSignals(signal, timeoutSignal)
  const accessToken = await getLocalForage(
    import.meta.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY
  )

  const requestOptions: RequestInit = {
    ...fetchOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    signal: combinedSignal,
  }

  try {
    const response = await fetchWithRetry(
      url,
      requestOptions,
      retries,
      retryDelay
    )

    const newAccessToken =
      response.headers.get('X-New-Access-Token') ||
      response.headers.get('x-new-access-token')
    if (newAccessToken) {
      await storeLocalForage(
        import.meta.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY,
        newAccessToken
      )
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    return {
      data,
      status: response.status,
      message: response.statusText,
    }
  } catch (error) {
    console.error(`apiRequest | Api request error ${error}`)
    throw handleFetchError(error)
  }
}

export const get = <T>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, { ...options, method: 'GET' })

export const post = <T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  })

export const put = <T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const del = <T>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, { ...options, method: 'DELETE' })
